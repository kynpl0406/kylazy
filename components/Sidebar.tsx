import React from 'react';
import { Settings, Info } from 'lucide-react';

interface SidebarProps {
  showF1: boolean;
  setShowF1: (val: boolean) => void;
  showR1: boolean;
  setShowR1: (val: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ showF1, setShowF1, showR1, setShowR1 }) => {
  return (
    <aside className="w-full lg:w-72 flex flex-col gap-6">
      {/* Controls Section */}
      <div className="bg-slate-800 rounded-xl p-5 border border-slate-700 shadow-md">
        <div className="flex items-center gap-2 mb-4 text-blue-400 border-b border-slate-700 pb-2">
          <Settings className="w-5 h-5" />
          <h3 className="font-bold text-lg">Controls</h3>
        </div>
        
        <div className="space-y-3">
          <label className="flex items-center space-x-3 cursor-pointer p-2 hover:bg-slate-700/50 rounded-lg transition-colors">
            <input 
              type="checkbox" 
              checked={showF1} 
              onChange={(e) => setShowF1(e.target.checked)}
              className="w-5 h-5 text-blue-600 rounded focus:ring-blue-600 bg-slate-700 border-gray-600 accent-blue-500" 
            />
            <span className="text-slate-200 font-medium">Cột F1 (F1)</span>
          </label>
          <label className="flex items-center space-x-3 cursor-pointer p-2 hover:bg-slate-700/50 rounded-lg transition-colors">
            <input 
              type="checkbox" 
              checked={showR1} 
              onChange={(e) => setShowR1(e.target.checked)}
              className="w-5 h-5 text-blue-600 rounded focus:ring-blue-600 bg-slate-700 border-gray-600 accent-blue-500" 
            />
            <span className="text-slate-200 font-medium">Cột R1 (R1)</span>
          </label>
        </div>
      </div>

      {/* Legend Section */}
      <div className="bg-slate-800 rounded-xl p-5 border border-slate-700 shadow-md">
         <div className="flex items-center gap-2 mb-4 text-slate-300 border-b border-slate-700 pb-2">
          <Info className="w-5 h-5" />
          <h3 className="font-bold text-lg">Legend</h3>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
            <span className="text-slate-300">Safe &lt; 200 cm</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-full bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.5)]"></div>
            <span className="text-slate-300">Warning 200-300 cm</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]"></div>
            <span className="text-slate-300">Danger &gt; 300 cm</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;