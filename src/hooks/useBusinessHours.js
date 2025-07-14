import { useState, useEffect } from 'react';

const BUSINESS_HOURS = {
  // Horarios: Cerrado lunes, Mar-Dom 17:00 - 21:45
  monday: null,
  tuesday: { open: '17:00', close: '21:45' },
  wednesday: { open: '17:00', close: '21:45' },
  thursday: { open: '17:00', close: '21:45' },
  friday: { open: '17:00', close: '21:45' },
  saturday: { open: '17:00', close: '21:45' },
  sunday: { open: '17:00', close: '21:45' },
};

const DAY_NAMES = {
  0: 'sunday',
  1: 'monday',
  2: 'tuesday',
  3: 'wednesday',
  4: 'thursday',
  5: 'friday',
  6: 'saturday'
};

const DAY_NAMES_ES = {
  0: 'Domingo',
  1: 'Lunes',
  2: 'Martes',
  3: 'Miércoles',
  4: 'Jueves',
  5: 'Viernes',
  6: 'Sábado'
};

export const useBusinessHours = () => {
  const [businessStatus, setBusinessStatus] = useState({
    isOpen: false,
    message: '',
    nextOpenTime: '',
    currentTime: '',
    todayHours: null
  });

  // Función para convertir tiempo "HH:MM" a minutos desde medianoche
  const timeToMinutes = (timeStr) => {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
  };

  // Función para convertir minutos a formato legible
  const minutesToTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    const period = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours;
    return `${displayHours}:${mins.toString().padStart(2, '0')} ${period}`;
  };

  // Función para obtener la próxima apertura
  const getNextOpenTime = (currentDay, currentMinutes) => {
    // Verificar si abriremos hoy
    const todaySchedule = BUSINESS_HOURS[DAY_NAMES[currentDay]];

    // ✅ Solo verificar horario de hoy si no está cerrado
    if (todaySchedule && todaySchedule !== null) {
      const todayOpenMinutes = timeToMinutes(todaySchedule.open);

      if (currentMinutes < todayOpenMinutes) {
        return {
          day: DAY_NAMES_ES[currentDay],
          time: minutesToTime(todayOpenMinutes),
          isToday: true
        };
      }
    }

    // Buscar el próximo día que abrimos
    for (let i = 1; i <= 7; i++) {
      const nextDay = (currentDay + i) % 7;
      const schedule = BUSINESS_HOURS[DAY_NAMES[nextDay]];

      // ✅ Verificar que el día no esté cerrado (null)
      if (schedule && schedule !== null) {
        return {
          day: DAY_NAMES_ES[nextDay],
          time: minutesToTime(timeToMinutes(schedule.open)),
          isToday: false
        };
      }
    }

    return null;
  };

  const checkBusinessHours = () => {
    // Obtener hora actual en zona horaria de México
    const now = new Date();
    const mexicoTime = new Date(now.toLocaleString("en-US", { timeZone: "America/Mexico_City" }));

    const currentDay = mexicoTime.getDay();
    const currentHours = mexicoTime.getHours();
    const currentMinutes = mexicoTime.getMinutes();
    const currentTotalMinutes = currentHours * 60 + currentMinutes;

    const currentTimeStr = mexicoTime.toLocaleTimeString('es-MX', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });

    const daySchedule = BUSINESS_HOURS[DAY_NAMES[currentDay]];

    // ✅ Verificar si el día está cerrado (null o undefined)
    if (!daySchedule || daySchedule === null) {
      const nextOpen = getNextOpenTime(currentDay, currentTotalMinutes);
      setBusinessStatus({
        isOpen: false,
        message: '🔒 Cerrado hoy',
        nextOpenTime: nextOpen ? `Abrimos ${nextOpen.isToday ? 'hoy' : nextOpen.day} a las ${nextOpen.time}` : '',
        currentTime: currentTimeStr,
        todayHours: 'Cerrado'
      });
      return;
    }

    const openMinutes = timeToMinutes(daySchedule.open);
    const closeMinutes = timeToMinutes(daySchedule.close);

    const todayHoursStr = `${minutesToTime(openMinutes)} - ${minutesToTime(closeMinutes)}`;

    if (currentTotalMinutes >= openMinutes && currentTotalMinutes <= closeMinutes) {
      // Abierto
      const minutesUntilClose = closeMinutes - currentTotalMinutes;
      const hoursUntilClose = Math.floor(minutesUntilClose / 60);
      const minsUntilClose = minutesUntilClose % 60;

      let closingMessage = '';
      if (minutesUntilClose <= 30) {
        closingMessage = ` (Cerramos en ${minutesUntilClose} minutos)`;
      } else if (hoursUntilClose < 2) {
        closingMessage = ` (Cerramos en ${hoursUntilClose}h ${minsUntilClose}m)`;
      }

      setBusinessStatus({
        isOpen: true,
        message: `🟢 ¡Estamos abiertos!${closingMessage}`,
        nextOpenTime: '',
        currentTime: currentTimeStr,
        todayHours: todayHoursStr
      });
    } else {
      // Cerrado
      const nextOpen = getNextOpenTime(currentDay, currentTotalMinutes);

      let message = '🔴 Estamos cerrados';
      if (currentTotalMinutes < openMinutes) {
        const minutesUntilOpen = openMinutes - currentTotalMinutes;
        const hoursUntilOpen = Math.floor(minutesUntilOpen / 60);
        const minsUntilOpen = minutesUntilOpen % 60;

        if (minutesUntilOpen <= 60) {
          message += ` (Abrimos en ${minutesUntilOpen} minutos)`;
        } else {
          message += ` (Abrimos en ${hoursUntilOpen}h ${minsUntilOpen}m)`;
        }
      }

      setBusinessStatus({
        isOpen: false,
        message,
        nextOpenTime: nextOpen ? `Próxima apertura: ${nextOpen.isToday ? 'Hoy' : nextOpen.day} a las ${nextOpen.time}` : '',
        currentTime: currentTimeStr,
        todayHours: todayHoursStr
      });
    }
  };

  useEffect(() => {
    // Verificar inmediatamente
    checkBusinessHours();

    // Actualizar cada minuto
    const interval = setInterval(checkBusinessHours, 60000);

    // Cleanup
    return () => clearInterval(interval);
  }, []);

  return businessStatus;
};