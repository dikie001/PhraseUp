import React from 'react';
import { useNotification } from '../contexts/NotificationContext';

const Settings: React.FC = () => {
  const { frequency, setFrequency, permission } = useNotification();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Settings
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Customize your quote notification preferences
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            Notification Settings
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Quote Notification Frequency
              </label>
              <select
                value={frequency}
                onChange={(e) => setFrequency(e.target.value as 'off' | 'hourly' | 'daily')}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              >
                <option value="off">Off</option>
                <option value="hourly">Every Hour</option>
                <option value="daily">Daily</option>
              </select>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Receive random inspirational quotes as notifications based on your selected frequency.
              {permission === 'denied' && ' Notifications are blocked. Please enable them in your browser settings.'}
              {permission === 'default' && ' Allow notifications to receive quotes.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
