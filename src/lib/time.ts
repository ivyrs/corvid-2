/**
 * Checks if input is a string or Date object. If it's a string, it gets converted.
 * @param {string | date} input - date to check
 * @returns {Date}
 */
export function checkDate(input: string | Date): Date {
  if (typeof input === "string") {
    return stringToDate(input);
  } else {
    return input;
  }
}

/**
 * Converts a date string into a Date.
 * @param {string} input
 * @returns {Date}
 */
export function stringToDate(input: string): Date {
  return new globalThis.Date(input);
}

export function formattedDate(
  input: Date | string,
  showTime: boolean = false
): string {
  const date = checkDate(input);

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "2-digit",
  };

  if (showTime) {
    options.hour = "2-digit";
    options.minute = "2-digit";
  }

  return date.toLocaleString("en-GB", options);
}

export function isoDate(input: Date | string): string {
  const date = checkDate(input);
  return date.toISOString();
}
