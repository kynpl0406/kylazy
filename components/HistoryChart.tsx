import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { SensorData } from '../types';
import { SYSTEM_CONFIG } from '../constants';

interface HistoryChartProps {
  data: SensorData[];
  showF1: boolean;
  showR1: boolean;
  onToggleF1: (checked: boolean) => void;
  onToggleR1: (checked: boolean) => void;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-800 border border-slate-600 p-2 rounded-lg shadow-xl z-50">
        <p className="text-slate-400 text-[10px] mb-1">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} style={{ color: entry.color }} className="text-xs font-bold">
            {entry.name}: {Number(entry.value).toFixed(1)} cm
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const HistoryChart: React.FC<HistoryChartProps> = ({ 
  data, 
  showF1, 
  showR1,
  onToggleF1,
  onToggleR1
}) => {
  return (
    <div className="bg-slate-800 rounded-xl p-3 sm:p-6 border border-slate-700 shadow-md mt-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
        <h3 className="text-base sm:text-lg font-bold text-white">History (last points)</h3>
        
        {/* Chart Controls */}
        <div className="flex gap-4 self-end sm:self-auto">
           <label className="flex items-center gap-2 cursor-pointer select-none group">
            <div className="relative">
              <input 
                type="checkbox" 
                className="peer sr-only"
                checked={showF1}
                onChange={(e) => onToggleF1(e.target.checked)}
              />
              <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-yellow-500 rounded bg-slate-900 peer-checked:bg-yellow-500 transition-colors"></div>
              <svg className="absolute w-3 h-3 text-slate-900 top-0.5 sm:top-1 left-0.5 sm:left-1 opacity-0 peer-checked:opacity-100 pointer-events-none" viewBox="0 0 16 16" fill="currentColor">
                <path d="M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z"/>
              </svg>
            </div>
            <span className="text-slate-300 text-xs sm:text-sm font-medium group-hover:text-white">F1</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer select-none group">
            <div className="relative">
              <input 
                type="checkbox" 
                className="peer sr-only"
                checked={showR1}
                onChange={(e) => onToggleR1(e.target.checked)}
              />
               <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-green-500 rounded bg-slate-900 peer-checked:bg-green-500 transition-colors"></div>
               <svg className="absolute w-3 h-3 text-slate-900 top-0.5 sm:top-1 left-0.5 sm:left-1 opacity-0 peer-checked:opacity-100 pointer-events-none" viewBox="0 0 16 16" fill="currentColor">
                <path d="M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z"/>
              </svg>
            </div>
            <span className="text-slate-300 text-xs sm:text-sm font-medium group-hover:text-white">R1</span>
          </label>
        </div>
      </div>

      <div className="h-[250px] sm:h-[350px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 10,
              right: 10, // Added small margin for balance
              left: 10,  // Changed from -20 to 10 to prevent clipping and center it
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
            <XAxis 
              dataKey="time" 
              stroke="#64748b" 
              tick={{ fill: '#94a3b8', fontSize: 10 }} 
              tickMargin={8}
              minTickGap={30}
            />
            {/* Left Axis - F1 (Yellow) - Range 0 to Max (500) */}
            <YAxis 
                yAxisId="left" 
                domain={[0, SYSTEM_CONFIG.maxLevel]} 
                orientation="left"
                stroke="#fbbf24" // yellow
                tick={{ fill: '#fbbf24', fontSize: 10 }}
                width={35}
                tickFormatter={(val) => Math.round(val).toString()}
            />
            {/* Right Axis - R1 (Green) - Range 0 to Max (500) */}
            <YAxis 
                yAxisId="right" 
                domain={[0, SYSTEM_CONFIG.maxLevel]} 
                orientation="right"
                stroke="#4ade80" // green
                tick={{ fill: '#4ade80', fontSize: 10 }}
                width={35}
                tickFormatter={(val) => Math.round(val).toString()}
            />
            <Tooltip content={<CustomTooltip />} />
            
            {showF1 && (
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="f1"
                stroke="#fbbf24" // Yellow
                strokeWidth={2}
                dot={{ r: 3, fill: '#fbbf24', strokeWidth: 1, stroke: '#fff' }}
                activeDot={{ r: 5 }}
                isAnimationActive={false} 
              />
            )}
            
            {showR1 && (
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="r1"
                stroke="#4ade80" // Green
                strokeWidth={2}
                dot={{ r: 3, fill: '#4ade80', strokeWidth: 1, stroke: '#fff' }}
                activeDot={{ r: 5 }}
                isAnimationActive={false}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default HistoryChart;