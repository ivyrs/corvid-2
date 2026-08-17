export function formattedDate(input: Date | string, showTime = false): string {
	const date = checkDate(input);

	const options: Intl.DateTimeFormatOptions = {
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
	};

	if (showTime) {
		options.hour = "2-digit";
		options.minute = "2-digit";
		options.hour12 = false;
	}

	return date.toLocaleString("en-CA", options);
}

export function isoDate(input: Date | string): string {
	const date = checkDate(input);
	return date.toISOString();
}

// error prevention
function checkDate(input: string | Date): Date {
	if (typeof input === "string") {
		return convertStringToDate(input);
	} else {
		return input;
	}
}

export function convertStringToDate(input: string): Date {
	return new globalThis.Date(input);
}
