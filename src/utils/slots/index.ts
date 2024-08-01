/**
 * @description
 * Create time slots to fill options.
 */
export function createTimeSlots(key?: string, maxInputHours?: number) {
    return Array.from({ length: maxInputHours ?? 24 }, (_, hour) => ({
      [key ?? "hour"]: hour.toString().padStart(2, "0") + ":00",
    }));
  }
  
  /**
   * @description
   * Create time slots with 30-minute intervals.
   */
  export function createHalfTimeSlots(key?: string, maxInputHours?: number) {
    return Array.from({ length: (maxInputHours ?? 24) * 2 }, (_, index) => {
      
      const hour = Math.floor(index / 2);
  
      const minute = (index % 2) * 30;
  
      const formattedHour = hour.toString().padStart(2, "0");
  
      const formattedMinute = minute === 0 ? "00" : minute.toString();
      return {
        [key ?? "hour"]: `${formattedHour}:${formattedMinute}`,
      };
    });
  }