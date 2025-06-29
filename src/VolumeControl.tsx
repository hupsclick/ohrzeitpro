import React from 'react';
import { Volume2 } from 'lucide-react';

interface VolumeControlProps {
  volume: number;
  onChange: (volume: number) => void;
  isDarkMode: boolean;
}

const VolumeControl: React.FC<VolumeControlProps> = ({ volume, onChange, isDarkMode }) => {
  return (
    <div className={`${
      isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
    } rounded-xl border shadow-sm p-6`}>
      <div className="flex items-center space-x-3 mb-6">
        <div className={`p-2 rounded-lg ${
          isDarkMode ? 'bg-blue-600' : 'bg-blue-500'
        }`}>
          <Volume2 className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold">Lautstärke</h3>
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Aktuelle Lautstärke: {volume}%
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="relative">
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => onChange(Number(e.target.value))}
            className={`w-full h-2 rounded-lg appearance-none cursor-pointer ${
              isDarkMode 
                ? 'bg-gray-700 slider-thumb-dark' 
                : 'bg-gray-200 slider-thumb-light'
            }`}
            style={{
              background: `linear-gradient(to right, ${
                volume > 90 ? '#ef4444' : '#3b82f6'
              } 0%, ${
                volume > 90 ? '#ef4444' : '#3b82f6'
              } ${volume}%, ${
                isDarkMode ? '#374151' : '#e5e7eb'
              } ${volume}%, ${
                isDarkMode ? '#374151' : '#e5e7eb'
              } 100%)`
            }}
          />
        </div>

        <div className="flex justify-between text-sm">
          <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>0%</span>
          <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>50%</span>
          <span className={volume > 90 ? 'text-red-500 font-medium' : (isDarkMode ? 'text-gray-400' : 'text-gray-500')}>
            100%
          </span>
        </div>

        {volume > 90 && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
            <p className="text-red-800 dark:text-red-400 text-sm">
              ⚠️ Hohe Lautstärke - Bitte vorsichtig verwenden
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VolumeControl;