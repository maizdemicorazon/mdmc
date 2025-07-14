import React from 'react';
import { useBusinessHours } from '../hooks/useBusinessHours';

const BusinessStatusBanner = () => {
  const { isOpen, message, nextOpenTime, currentTime, todayHours } = useBusinessHours();

  return (
    <div className={`max-w-4xl mx-auto mb-6 px-4 ${isOpen ? 'animate-pulse' : ''}`}>
      <div className={`
        rounded-2xl p-4 shadow-lg border-2 transition-all duration-300
        ${isOpen
          ? 'bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900 dark:to-green-800 border-green-300 dark:border-green-600'
          : 'bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900 dark:to-red-800 border-red-300 dark:border-red-600'
        }
      `}>
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          {/* Estado principal */}
          <div className="flex items-center gap-3">
            <div className={`
              w-4 h-4 rounded-full animate-pulse
              ${isOpen ? 'bg-green-500' : 'bg-red-500'}
            `} />
            <div>
              <h3 className={`
                text-lg md:text-xl font-bold
                ${isOpen ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'}
              `}>
                {message}
              </h3>

              {/* Horarios del día */}
              {todayHours && (
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Horario de hoy: {todayHours}
                </p>
              )}

              {/* Próxima apertura si está cerrado */}
              {!isOpen && nextOpenTime && (
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {nextOpenTime}
                </p>
              )}
            </div>
          </div>

          {/* Hora actual */}
          <div className="flex flex-col items-center md:items-end">
            <span className="text-xs text-gray-500 dark:text-gray-400">Hora actual</span>
            <span className="text-lg font-bold text-gray-700 dark:text-gray-300">
              {currentTime}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessStatusBanner;