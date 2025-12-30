
import { GhaligeTime } from '../types';

export const calculateGhaligeTime = (date: Date): GhaligeTime => {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  
  // Normalizing time relative to 6:00 AM for a 24-hour cycle
  let relativeHour = hours - 6;
  if (relativeHour < 0) {
    relativeHour += 24;
  }

  // Strictly applying the provided formula:
  // ghalige = (HOUR - 6) * 3 + QUOTIENT(MINUTE, 20)
  // minutesWithinSlot = MOD(MINUTE, 20)
  
  const ghalige = relativeHour * 3 + Math.floor(minutes / 20);
  const minutesWithinSlot = minutes % 20;
  
  // ShatGhaliga = (ghalige / 6) + 1
  // For ghalige 0-5, result is 1. For 6-11, result is 2, etc.
  const shatGhaliga = Math.floor(ghalige / 6) + 1;

  const normalTime = date.toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: false 
  });

  return {
    normalTime,
    ghalige,
    minutesWithinSlot,
    shatGhaliga,
    rawHours: hours,
    rawMinutes: minutes
  };
};
