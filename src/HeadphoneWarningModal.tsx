import React from 'react';
import { Headphones, AlertCircle } from 'lucide-react';

interface HeadphoneWarningModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  isDarkMode: boolean;
}

const HeadphoneWarningModal: React.FC<HeadphoneWarningModalProps> = ({ 
  isOpen, 
  onConfirm, 
  onCancel, 
  isDarkMode 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className={`${
        isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
      } rounded-xl shadow-xl max-w-md w-full`}>
        <div className="p-6">
          <div className="flex items-center space-x-4 mb-6">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
              <Headphones className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400">
                Wichtiger Hinweis
              </h3>
            </div>
          </div>
          
          <div className="mb-6">
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-4">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-red-800 dark:text-red-300 font-semibold">
                    Schließen Sie unbedingt Kopfhörer an, bevor Sie die Hörhilfe starten, um Rückkopplungen zu vermeiden!
                  </p>
                </div>
              </div>
            </div>
            
            <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Ohne Kopfhörer können laute Rückkopplungen entstehen, die Ihr Gehör schädigen können.
            </p>
          </div>
          
          <div className="flex space-x-3">
            <button
              onClick={onCancel}
              className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
                isDarkMode
                  ? 'bg-gray-700 hover:bg-gray-600 text-white'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              Abbrechen
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              Verstanden - Starten
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeadphoneWarningModal;