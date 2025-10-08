import React from 'react';

interface InstallModalProps {
  isOpen: boolean;
  onInstall: () => void;
  onCancel: () => void;
}

const InstallModal: React.FC<InstallModalProps> = ({ isOpen, onInstall, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-sm w-full">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Install PhraseUp</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          Install this app on your device for a better experience and offline access.
        </p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-md bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-400 dark:hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onInstall}
            className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors"
          >
            Install
          </button>
        </div>
      </div>
    </div>
  );
};

export default InstallModal;
