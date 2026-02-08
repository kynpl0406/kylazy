import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import Banner from './components/Banner';
import Sidebar from './components/Sidebar';
import StatusCard from './components/StatusCard';
import HistoryChart from './components/HistoryChart';
import Footer from './components/Footer';
import { SensorData } from './types';
import { MOCK_INTERVAL_MS, MAX_HISTORY_POINTS } from './constants';
import { database } from './firebase';
import { ref, onValue } from 'firebase/database';

const App: React.FC = () => {
  const [data, setData] = useState<SensorData[]>([]);
  const [showF1, setShowF1] = useState(true);
  const [showR1, setShowR1] = useState(true);
  const [currentF1, setCurrentF1] = useState<number>(0);
  const [currentR1, setCurrentR1] = useState<number>(0);
  
  // Connection status state
  const [isOnline, setIsOnline] = useState<boolean>(false);

  // Refs to hold the latest values for the interval to pick up
  const latestValues = useRef({ f1: 0, r1: 0 });
  // Ref for auto-incrementing ID for the chart x-axis
  const idCounter = useRef(0);
  // Ref to track last update time for watchdog
  const lastUpdateRef = useRef<number>(0);

  // 1. Listen to Firebase Realtime Database
  useEffect(() => {
    // Change reference to 'waterlevel' node as per the screenshot structure
    const dbRef = ref(database, 'waterlevel'); 
    
    const unsubscribe = onValue(dbRef, (snapshot) => {
      const val = snapshot.val();
      
      if (val) {
        // Data received, update timestamp and set online
        lastUpdateRef.current = Date.now();
        setIsOnline(true);

        // Log data for debugging
        console.log("Firebase Data:", val);

        // Parse data based on structure: 
        // waterlevel: { F1: { value: 120 }, R1: { value: 133.3 } }
        const f1Raw = val.F1?.value;
        const r1Raw = val.R1?.value;

        const f1Val = Number(f1Raw !== undefined ? f1Raw : 0);
        const r1Val = Number(r1Raw !== undefined ? r1Raw : 0);

        // Update current state for Cards (Realtime instant update)
        setCurrentF1(f1Val);
        setCurrentR1(r1Val);

        // Update ref for the chart interval
        latestValues.current = { f1: f1Val, r1: r1Val };
      }
    });

    return () => unsubscribe();
  }, []);

  // 2. Watchdog Timer (Check for Offline status)
  useEffect(() => {
    const watchdogInterval = setInterval(() => {
      // If more than 10 seconds have passed since last update, consider offline
      const TIMEOUT_MS = 10000;
      if (Date.now() - lastUpdateRef.current > TIMEOUT_MS && lastUpdateRef.current !== 0) {
        setIsOnline(false);
      }
    }, 1000);

    return () => clearInterval(watchdogInterval);
  }, []);

  // 3. Update Chart Interval
  // We use an interval to push data to the chart history so the X-axis keeps moving
  // even if the water level stays exactly the same (static line).
  // This simulates a "Strip Chart" recorder common in industrial monitoring.
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const timeString = now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
      
      idCounter.current += 1;

      const newDataPoint: SensorData = {
        id: idCounter.current,
        time: timeString,
        f1: latestValues.current.f1,
        r1: latestValues.current.r1,
      };

      setData(prevData => {
        const newData = [...prevData, newDataPoint];
        if (newData.length > MAX_HISTORY_POINTS) {
          newData.shift(); // Remove oldest
        }
        return newData;
      });
    }, MOCK_INTERVAL_MS); // Update chart every 2 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 font-sans selection:bg-blue-500 selection:text-white flex flex-col">
      <Header isOnline={isOnline} />
      
      <main className="max-w-7xl mx-auto p-4 lg:p-6 w-full flex-grow">
        <Banner />
        
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Sidebar */}
          <div className="flex-shrink-0">
            <Sidebar 
              showF1={showF1} 
              setShowF1={setShowF1}
              showR1={showR1}
              setShowR1={setShowR1}
            />
          </div>

          {/* Main Content Area */}
          <div className="flex-grow min-w-0">
            {/* Status Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <StatusCard 
                label="Cột F1" 
                subLabel="F1" 
                value={currentF1} 
              />
              <StatusCard 
                label="Cột R1" 
                subLabel="R1" 
                value={currentR1} 
              />
            </div>

            {/* Chart Section */}
            <HistoryChart 
              data={data}
              showF1={showF1}
              showR1={showR1}
              onToggleF1={setShowF1}
              onToggleR1={setShowR1}
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default App;