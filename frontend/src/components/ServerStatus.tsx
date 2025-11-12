'use client';

import { useEffect, useState } from 'react';
import { RefreshCw, CheckCircle2, XCircle } from 'lucide-react';

export default function ServerStatus() {
  const [status, setStatus] = useState<'checking' | 'online' | 'offline'>('checking');

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/health`
        );
        if (response.ok) {
          setStatus('online');
        } else {
          setStatus('offline');
        }
      } catch {
        setStatus('offline');
      }
    };

    checkStatus();
    const interval = setInterval(checkStatus, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, []);

  if (status === 'checking') {
    return (
      <div className="flex items-center space-x-2 text-xs">
        <RefreshCw className="w-3 h-3 text-gray-400 dark:text-gray-500 animate-spin" />
        <span className="text-gray-500 dark:text-gray-400">Checking</span>
      </div>
    );
  }

  if (status === 'online') {
    return (
      <div className="flex items-center space-x-2 text-xs">
        <CheckCircle2 className="w-3 h-3 text-green-500 dark:text-green-400" />
        <span className="text-green-600 dark:text-green-400 font-medium">API Online</span>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-2 text-xs">
      <XCircle className="w-3 h-3 text-red-500 dark:text-red-400" />
      <span className="text-red-600 dark:text-red-400 font-medium">API Offline</span>
    </div>
  );
}
