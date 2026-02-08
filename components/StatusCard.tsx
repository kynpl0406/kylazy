import React from 'react';
import { SYSTEM_CONFIG } from '../constants';
import { FloodStatus } from '../types';
import { AlertTriangle, CheckCircle, AlertOctagon } from 'lucide-react';

interface StatusCardProps {
  label: string;
  subLabel: string;
  value: number;
  unit?: string;
}

const StatusCard: React.FC<StatusCardProps> = ({ label, subLabel, value, unit = 'cm' }) => {
  // Determine Status
  let status = FloodStatus.SAFE;
  let colorClass = 'text-green-500';
  let bgClass = 'bg-green-500';
  let Icon = CheckCircle;

  if (value > SYSTEM_CONFIG.warningLimit) {
    status = FloodStatus.DANGER;
    colorClass = 'text-red-500';
    bgClass = 'bg-red-500';
    Icon = AlertOctagon;
  } else if (value >= SYSTEM_CONFIG.safeLimit) {
    status = FloodStatus.WARNING;
    colorClass = 'text-yellow-500';
    bgClass = 'bg-yellow-500';
    Icon = AlertTriangle;
  }

  // Calculate percentage for progress bar
  const percentage = Math.min((value / SYSTEM_CONFIG.maxLevel) * 100, 100);

  return (
    <div className="bg-slate-800 rounded-xl p-5 border border-slate-700 shadow-md flex flex-col justify-between hover:border-slate-600 transition-colors">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-slate-400 text-sm font-medium uppercase">{label}</h3>
          <p className="text-white font-bold text-lg">{subLabel}</p>
        </div>
        <div className={`flex items-center gap-1 px-2 py-1 rounded-md bg-slate-900/50 border border-slate-700 ${colorClass}`}>
          <Icon className="w-4 h-4" />
          <span className="text-xs font-bold uppercase">{status}</span>
        </div>
      </div>

      <div className="mt-auto">
        <div className="flex items-end gap-2 mb-2">
          <span className="text-4xl font-bold text-white tracking-tighter">
            {value.toFixed(1)}
          </span>
          <span className="text-slate-500 font-medium mb-1">{unit}</span>
        </div>

        {/* Progress Bar */}
        <div className="relative w-full h-3 bg-slate-700 rounded-full overflow-hidden">
          <div 
            className={`h-full rounded-full transition-all duration-700 ease-out bg-blue-500`}
            style={{ width: `${percentage}%` }}
          />
        </div>
        <div className="flex justify-between mt-1">
            <span className="text-xs text-slate-500">0</span>
            <span className="text-xs text-slate-500">{value.toFixed(1)} / {SYSTEM_CONFIG.maxLevel}</span>
        </div>
      </div>
    </div>
  );
};

export default StatusCard;