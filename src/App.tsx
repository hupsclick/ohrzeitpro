import React, { useState, useEffect, useRef } from 'react';
import { Volume2, Settings, BookOpen, Moon, Sun, Mic, MicOff, Save } from 'lucide-react';
import AudioProcessor from './AudioProcessor';
import VolumeControl from './VolumeControl';
import Equalizer from './Equalizer';
import InstructionsModal from './InstructionsModal';
import VolumeWarningModal from './VolumeWarningModal';
import HeadphoneWarningModal from './HeadphoneWarningModal';
import LegalModal from './LegalModal';
import { useLocalStorage } from './useLocalStorage';
import { useDarkMode } from './useDarkMode';

interface AudioSettings {
  volume: number;
  eqSettings: Record<string, number>;
}

const defaultEqSettings = {
  '250': 0,
  '500': 6,
  '1000': 0,
  '2000': 6,
  '4000': 0,
  '8000': 6
};

function App() {
  const [isActive, setIsActive] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [showVolumeWarning, setShowVolumeWarning] = useState(false);
  const [showHeadphoneWarning, setShowHeadphoneWarning] = useState(false);
  const [showLegal, setShowLegal] = useState<'impressum' | 'datenschutz' | null>(null);
  const [audioSettings, setAudioSettings] = useLocalStorage<AudioSettings>('ohrzeitpro-settings', {
    volume: 30, // Default to 30% instead of 100% for safety
    eqSettings: defaultEqSettings
  });
  
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const audioProcessorRef = useRef<AudioProcessor | null>(null);

  useEffect(() => {
    audioProcessorRef.current = new AudioProcessor();
    return () => {
      if (audioProcessorRef.current) {
        audioProcessorRef.current.stop();
      }
    };
  }, []);

  const handleStartClick = () => {
    setShowHeadphoneWarning(true);
  };

  const handleHeadphoneWarningConfirm = async () => {
    setShowHeadphoneWarning(false);
    
    if (audioProcessorRef.current) {
      try {
        await audioProcessorRef.current.start();
        audioProcessorRef.current.setVolume(audioSettings.volume);
        audioProcessorRef.current.setEqualizer(audioSettings.eqSettings);
        setIsActive(true);
      } catch (error) {
        console.error('Failed to start audio:', error);
        alert('Fehler beim Zugriff auf das Mikrofon. Stellen Sie sicher, dass Sie die Berechtigung erteilt haben.');
      }
    }
  };

  const handleHeadphoneWarningCancel = () => {
    setShowHeadphoneWarning(false);
  };

  const handleStop = () => {
    if (audioProcessorRef.current) {
      audioProcessorRef.current.stop();
      setIsActive(false);
    }
  };

  const handleVolumeChange = (volume: number) => {
    const newSettings = { ...audioSettings, volume };
    setAudioSettings(newSettings);
    
    if (audioProcessorRef.current) {
      audioProcessorRef.current.setVolume(volume);
    }

    if (volume > 90 && !showVolumeWarning) {
      setShowVolumeWarning(true);
    }
  };

  const handleEqChange = (frequency: string, gain: number) => {
    const newEqSettings = { ...audioSettings.eqSettings, [frequency]: gain };
    const newSettings = { ...audioSettings, eqSettings: newEqSettings };
    setAudioSettings(newSettings);
    
    if (audioProcessorRef.current) {
      audioProcessorRef.current.setEqualizer(newEqSettings);
    }
  };

  const handleSaveSettings = () => {
    // Settings are automatically saved via useLocalStorage
    alert('Einstellungen gespeichert!');
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
    }`}>
      {/* Header */}
      <header className={`${
        isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      } border-b shadow-sm`}>
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg ${
              isDarkMode ? 'bg-blue-600' : 'bg-blue-500'
            }`}>
              <Volume2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">OhrzeitPro</h1>
              <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Professionelle Hörhilfe
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-lg transition-colors ${
                isDarkMode 
                  ? 'bg-gray-700 hover:bg-gray-600 text-yellow-400' 
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
              }`}
              title={isDarkMode ? 'Heller Modus' : 'Dunkler Modus'}
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            
            <button
              onClick={() => setShowInstructions(true)}
              className={`p-2 rounded-lg transition-colors ${
                isDarkMode 
                  ? 'bg-gray-700 hover:bg-gray-600' 
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
              title="Anleitung"
            >
              <BookOpen className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Status Card */}
        <div className={`${
          isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        } rounded-xl border shadow-sm p-6 mb-8`}>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className={`p-3 rounded-full ${
                isActive 
                  ? 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400' 
                  : 'bg-gray-100 text-gray-400 dark:bg-gray-700 dark:text-gray-500'
              }`}>
                {isActive ? <Mic className="w-6 h-6" /> : <MicOff className="w-6 h-6" />}
              </div>
              <div>
                <h2 className="text-xl font-semibold">
                  {isActive ? 'Hörhilfe aktiv' : 'Hörhilfe inaktiv'}
                </h2>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {isActive 
                    ? 'Audio wird in Echtzeit übertragen' 
                    : 'Klicken Sie auf "Starten" um zu beginnen'
                  }
                </p>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={handleSaveSettings}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  isDarkMode
                    ? 'bg-gray-700 hover:bg-gray-600 text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                <Save className="w-4 h-4" />
                <span>Speichern</span>
              </button>
              
              {!isActive ? (
                <button
                  onClick={handleStartClick}
                  className="flex items-center space-x-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  <Mic className="w-4 h-4" />
                  <span>Hörhilfe starten</span>
                </button>
              ) : (
                <button
                  onClick={handleStop}
                  className="flex items-center space-x-2 px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                >
                  <MicOff className="w-4 h-4" />
                  <span>Stoppen</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Volume Control */}
          <VolumeControl
            volume={audioSettings.volume}
            onChange={handleVolumeChange}
            isDarkMode={isDarkMode}
          />

          {/* Equalizer */}
          <Equalizer
            settings={audioSettings.eqSettings}
            onChange={handleEqChange}
            isDarkMode={isDarkMode}
          />
        </div>
      </main>

      {/* Footer */}
      <footer className={`mt-16 ${
        isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      } border-t`}>
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex justify-center space-x-6 text-sm">
            <button
              onClick={() => setShowLegal('impressum')}
              className={`${
                isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
              } transition-colors`}
            >
              Impressum
            </button>
            <button
              onClick={() => setShowLegal('datenschutz')}
              className={`${
                isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
              } transition-colors`}
            >
              Datenschutz
            </button>
          </div>
          <div className="text-center mt-4">
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              © 2024 OhrzeitPro. Eine professionelle Hörhilfe-Anwendung.
            </p>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <InstructionsModal
        isOpen={showInstructions}
        onClose={() => setShowInstructions(false)}
        isDarkMode={isDarkMode}
      />
      
      <VolumeWarningModal
        isOpen={showVolumeWarning}
        onClose={() => setShowVolumeWarning(false)}
        isDarkMode={isDarkMode}
      />
      
      <HeadphoneWarningModal
        isOpen={showHeadphoneWarning}
        onConfirm={handleHeadphoneWarningConfirm}
        onCancel={handleHeadphoneWarningCancel}
        isDarkMode={isDarkMode}
      />
      
      {showLegal && (
        <LegalModal
          type={showLegal}
          isOpen={!!showLegal}
          onClose={() => setShowLegal(null)}
          isDarkMode={isDarkMode}
        />
      )}
    </div>
  );
}

export default App;