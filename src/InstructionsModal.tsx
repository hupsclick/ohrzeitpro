import React from 'react';
import { X, AlertCircle, Headphones, Mic, Volume2, Settings } from 'lucide-react';

interface InstructionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
}

const InstructionsModal: React.FC<InstructionsModalProps> = ({ isOpen, onClose, isDarkMode }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className={`${
        isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
      } rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto`}>
        <div className="sticky top-0 flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700 bg-inherit">
          <h2 className="text-2xl font-bold">Anleitung zur Verwendung</h2>
          <button
            onClick={onClose}
            className={`p-2 rounded-lg transition-colors ${
              isDarkMode 
                ? 'hover:bg-gray-700 text-gray-400 hover:text-white' 
                : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6 space-y-6">
          {/* Warning */}
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-red-800 dark:text-red-400 mb-2">
                  Wichtiger Sicherheitshinweis
                </h3>
                <p className="text-red-700 dark:text-red-300">
                  <strong>❗ Schließen Sie unbedingt Kopfhörer an Ihr Gerät an, um Rückkopplungen zu vermeiden</strong>
                </p>
              </div>
            </div>
          </div>

          {/* Steps */}
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <div className={`p-2 rounded-lg ${
                isDarkMode ? 'bg-blue-600' : 'bg-blue-500'
              } text-white flex-shrink-0`}>
                <Headphones className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold mb-1">1. Kopfhörer anschließen</h4>
                <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                  Schließen Sie unbedingt Kopfhörer an Ihr Gerät an, um Rückkopplungen zu vermeiden
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className={`p-2 rounded-lg ${
                isDarkMode ? 'bg-green-600' : 'bg-green-500'
              } text-white flex-shrink-0`}>
                <Mic className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold mb-1">2. Hörhilfe starten</h4>
                <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                  Klicken Sie auf "Hörhilfe starten" und erlauben Sie den Mikrofon-Zugriff
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className={`p-2 rounded-lg ${
                isDarkMode ? 'bg-purple-600' : 'bg-purple-500'
              } text-white flex-shrink-0`}>
                <Volume2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold mb-1">3. Lautstärke anpassen</h4>
                <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                  Passen Sie die Lautstärke nach Ihren Bedürfnissen an
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className={`p-2 rounded-lg ${
                isDarkMode ? 'bg-orange-600' : 'bg-orange-500'
              } text-white flex-shrink-0`}>
                <Settings className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold mb-1">4. Equalizer verwenden</h4>
                <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                  Nutzen Sie den Equalizer zur Feinabstimmung der Frequenzen
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className={`p-2 rounded-lg ${
                isDarkMode ? 'bg-teal-600' : 'bg-teal-500'
              } text-white flex-shrink-0`}>
                <span className="text-lg font-bold">🎧</span>
              </div>
              <div>
                <h4 className="font-semibold mb-1">5. Echtzeit-Übertragung</h4>
                <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                  Die App überträgt alle Umgebungsgeräusche in Echtzeit zu Ihren Kopfhörern
                </p>
              </div>
            </div>
          </div>

          {/* Additional Tips */}
          <div className={`${
            isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
          } rounded-lg p-4`}>
            <h4 className="font-semibold mb-3">Zusätzliche Tipps:</h4>
            <ul className="space-y-2 text-sm">
              <li className={`flex items-start space-x-2 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                <span className="text-blue-500 font-bold mt-0.5">•</span>
                <span>Verwenden Sie die "Speichern"-Funktion, um Ihre Einstellungen zu sichern</span>
              </li>
              <li className={`flex items-start space-x-2 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                <span className="text-blue-500 font-bold mt-0.5">•</span>
                <span>Bei Lautstärken über 90% erscheint eine Sicherheitswarnung</span>
              </li>
              <li className={`flex items-start space-x-2 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                <span className="text-blue-500 font-bold mt-0.5">•</span>
                <span>Der Equalizer hilft bei der Anpassung verschiedener Hörfrequenzen</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructionsModal;