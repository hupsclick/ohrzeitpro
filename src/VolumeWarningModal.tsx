import React, { useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';

interface VolumeWarningModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
}

const VolumeWarningModal: React.FC<VolumeWarningModalProps> = ({ isOpen, onClose, isDarkMode }) => {
  useEffect(() => {
    if (isOpen) {
      const timeout = setTimeout(() => {
        onClose();
      }, 5000); // Auto-close after 5 seconds

      return () => clearTimeout(timeout);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className={`${
        isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
      } rounded-xl shadow-xl max-w-md w-full`}>
        <div className="p-6">
          <div className="flex items-center space-x-4 mb-4">
            <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-full">
              <AlertTriangle className="w-8 h-8 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-red-600 dark:text-red-400">
                Warnung: Hohe Lautstärke
              </h3>
            </div>
          </div>
          
          <div className="mb-6">
            <p className={`text-lg ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
              Hohe Lautstärke kann Ihr Gehör schädigen. Bitte reduzieren Sie die Lautstärke.
            </p>
          </div>
          
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
            >
              Verstanden
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolumeWarningModal;