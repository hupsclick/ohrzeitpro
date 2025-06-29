import React from 'react';
import { Settings } from 'lucide-react';

interface EqualizerProps {
  settings: Record<string, number>;
  onChange: (frequency: string, gain: number) => void;
  isDarkMode: boolean;
}

const Equalizer: React.FC<EqualizerProps> = ({ settings, onChange, isDarkMode }) => {
  const frequencies = [
    { key: '250', label: '250Hz' },
    { key: '500', label: '500Hz' },
    { key: '1000', label: '1kHz' },
    { key: '2000', label: '2kHz' },
    { key: '4000', label: '4kHz' },
    { key: '8000', label: '8kHz' }
  ];

  return (
    <div className={`${
      isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
    } rounded-xl border shadow-sm p-6`}>
      <div className="flex items-center space-x-3 mb-6">
        <div className={`p-2 rounded-lg ${
          isDarkMode ? 'bg-green-600' : 'bg-green-500'
        }`}>
          <Settings className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold">Equalizer</h3>
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Frequenz-Feinabstimmung
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {frequencies.map(({ key, label }) => {
          const gain = settings[key] || 0;
          return (
            <div key={key} className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium">{label}</label>
                <span className={`text-sm px-2 py-1 rounded ${
                  gain > 0 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-400'
                    : gain < 0
                    ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-400'
                    : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                }`}>
                  {gain > 0 ? '+' : ''}{gain}dB
                </span>
              </div>
              
              <div className="relative">
                <input
                  type="range"
                  min="-12"
                  max="12"
                  step="0.5"
                  value={gain}
                  onChange={(e) => onChange(key, Number(e.target.value))}
                  className={`w-full h-2 rounded-lg appearance-none cursor-pointer ${
                    isDarkMode 
                      ? 'bg-gray-700 slider-thumb-dark' 
                      : 'bg-gray-200 slider-thumb-light'
                  }`}
                  style={{
                    background: `linear-gradient(to right, ${
                      isDarkMode ? '#374151' : '#e5e7eb'
                    } 0%, ${
                      isDarkMode ? '#374151' : '#e5e7eb'
                    } ${((gain + 12) / 24) * 100}%, ${
                      gain > 0 ? '#10b981' : gain < 0 ? '#ef4444' : '#6b7280'
                    } ${((gain + 12) / 24) * 100}%, ${
                      gain > 0 ? '#10b981' : gain < 0 ? '#ef4444' : '#6b7280'
                    } ${((gain + 12) / 24) * 100}%, ${
                      isDarkMode ? '#374151' : '#e5e7eb'
                    } ${((gain + 12) / 24) * 100}%, ${
                      isDarkMode ? '#374151' : '#e5e7eb'
                    } 100%)`
                  }}
                />
                <div className="flex justify-between text-xs mt-1">
                  <span className={isDarkMode ? 'text-gray-500' : 'text-gray-400'}>-12dB</span>
                  <span className={isDarkMode ? 'text-gray-500' : 'text-gray-400'}>0dB</span>
                  <span className={isDarkMode ? 'text-gray-500' : 'text-gray-400'}>+12dB</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Equalizer;