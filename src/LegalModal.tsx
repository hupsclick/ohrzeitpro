import React from 'react';
import { X } from 'lucide-react';

interface LegalModalProps {
  type: 'impressum' | 'datenschutz';
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
}

const LegalModal: React.FC<LegalModalProps> = ({ type, isOpen, onClose, isDarkMode }) => {
  if (!isOpen) return null;

  const content = {
    impressum: {
      title: 'Impressum',
      content: (
        <div className="space-y-4">
          <div>
		   <p>OhrzeitPro</p>
            <p>Professionelle Hörhilfe-Anwendung</p>
			</div>
			<div>
            <h4 className="font-semibold mb-2">Angaben gemäß § 5 TMG</h4>
            <p>
              Manfred Häcker<br />
              Feldstraße 6<br />
              17153 Stavenhagen<br />
              Deutschland
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2">Kontakt</h4>
            <p>E-Mail: regiemail@gmx..de</p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2">Haftungsausschluss</h4>
            <p className="text-sm">
              Diese Anwendung dient als Hörhilfe und ersetzt keine professionelle medizinische Beratung.
              Bei anhaltenden Hörproblemen konsultieren Sie bitte einen HNO-Arzt.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2">Urheberrecht</h4>
            <p className="text-sm">
              Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen
              dem deutschen Urheberrecht.
            </p>
          </div>
        </div>
      )
    },
    datenschutz: {
      title: 'Datenschutzerklärung',
      content: (
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Datenschutz auf einen Blick</h4>
            <p className="text-sm">
              Diese Anwendung verarbeitet Audiodaten lokal auf Ihrem Gerät. Es werden keine Daten
              an externe Server übertragen.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2">Mikrofonzugriff</h4>
            <p className="text-sm">
              Die Anwendung benötigt Zugriff auf Ihr Mikrofon, um Audiodaten in Echtzeit zu verarbeiten.
              Diese Daten werden nicht gespeichert oder übertragen.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2">Lokale Speicherung</h4>
            <p className="text-sm">
              Ihre Einstellungen (Lautstärke und Equalizer) werden lokal in Ihrem Browser gespeichert
              und können jederzeit gelöscht werden.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2">Keine Cookies</h4>
            <p className="text-sm">
              Diese Anwendung verwendet keine Cookies oder Tracking-Technologien.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2">Ihre Rechte</h4>
            <p className="text-sm">
              Da keine personenbezogenen Daten verarbeitet werden, entstehen keine datenschutzrechtlichen
              Verpflichtungen. Sie können die Anwendung jederzeit ohne Folgen verwenden oder beenden.
            </p>
          </div>
        </div>
      )
    }
  };

  const { title, content: modalContent } = content[type];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className={`${
        isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
      } rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto`}>
        <div className="sticky top-0 flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700 bg-inherit">
          <h2 className="text-2xl font-bold">{title}</h2>
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
        
        <div className="p-6">
          {modalContent}
        </div>
      </div>
    </div>
  );
};

export default LegalModal;