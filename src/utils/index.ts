/**
 * @description
 * Capitalize the first letter of a string.
 * @param str - String to be capitalized.
 */
export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}


/**
 * @description
 * Formats strictly a hour time.
 * @param time - Formats the time.
 */
export function formatHourTime(time: string) {
  // Remove non-digit characters from input
  const format = time.replace(/\D/g, "");

  // If the input is empty or only contains a colon, allow deleting values
  if (format === "" || format === ":") {
    return format;
  }

  const hourPart = format.slice(0, 2);

  // If input length is 3 or 4, add a colon after the first two digits (hh:mm)
  if (format.length === 3 || format.length === 4) {
    const minutePart = format.slice(2);

    // If the minutePart is a single digit between 6 and 9, add a leading zero
    if (minutePart.length === 1 && /^[6-9]$/.test(minutePart)) {
      return `${hourPart}:0${minutePart}`;
    }

    return `${hourPart}:${minutePart}`;
  }

  // If hourPart is a single digit between 3 and 9, add a leading zero
  if (hourPart.length === 1 && /^[3-9]$/.test(hourPart)) {
    return `0${hourPart}:`;
  }

  // If the last character is a colon, return the input without the colon
  if (format.slice(-1) === ":" && format.length < 5) {
    return format.slice(0, -1);
  }

  // If input length is 2, check if hour is valid (between 0 and 23)
  if (format.length === 2) {
    if ( /^(0\d|1\d|2[0-3])$/.test(format)) {
      return format;
    }
    // For invalid input, return the original input
    return time;
  }

  // Return the original time if it doesn't match the formatting conditions
  return time;
}



export const removeHourFormat = (formattedHour: string) => {
 // Check if the formattedHour contains a colon (:) which indicates that it is in "hh:mm" format
 if (formattedHour && formattedHour.includes(":")) {
   // Remove the colon from the formattedHour
   return formattedHour.replace(":", "");
 }

 // If the formattedHour is not in "hh:mm" format, return it as is
 return formattedHour.replace(":", "");
};