import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import quotes from '../assets/jsons/quotes.json';

type Frequency = 'off' | 'hourly' | 'daily';

interface NotificationContextType {
  frequency: Frequency;
  setFrequency: (freq: Frequency) => void;
  permission: NotificationPermission;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [frequency, setFrequencyState] = useState<Frequency>('off');
  const [permission, setPermission] = useState<NotificationPermission>('default');

  useEffect(() => {
    // Request permission
    if ('Notification' in window) {
      Notification.requestPermission().then(perm => {
        setPermission(perm);
      });
    }

    // Load saved frequency
    const saved = localStorage.getItem('notificationFrequency') as Frequency;
    if (saved) setFrequencyState(saved);
  }, []);

  const setFrequency = (freq: Frequency) => {
    setFrequencyState(freq);
    localStorage.setItem('notificationFrequency', freq);
    scheduleNotification(freq);
  };

  const scheduleNotification = (freq: Frequency) => {
    // Clear any existing timeouts
    if ((window as any).notificationTimeout) {
      clearTimeout((window as any).notificationTimeout);
    }

    if (freq === 'off' || permission !== 'granted') return;

    const now = new Date();
    let delay: number;

    if (freq === 'hourly') {
      const nextHour = new Date(now);
      nextHour.setHours(now.getHours() + 1, 0, 0, 0);
      delay = nextHour.getTime() - now.getTime();
    } else if (freq === 'daily') {
      const nextDay = new Date(now);
      nextDay.setDate(now.getDate() + 1);
      nextDay.setHours(9, 0, 0, 0); // 9 AM next day
      delay = nextDay.getTime() - now.getTime();
    } else {
      return;
    }

    (window as any).notificationTimeout = setTimeout(() => {
      sendNotification();
      // Reschedule for next interval
      scheduleNotification(freq);
    }, delay);
  };

  const sendNotification = () => {
    if (permission !== 'granted') return;

    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    new Notification('Inspirational Quote', {
      body: `"${randomQuote.text}" - ${randomQuote.author}`,
      icon: '/vite.svg', // or some icon
    });
  };

  useEffect(() => {
    scheduleNotification(frequency);
  }, [frequency, permission]);

  return (
    <NotificationContext.Provider value={{ frequency, setFrequency, permission }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};
