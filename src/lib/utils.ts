import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const formatDate = (date: Date): string => {
	if (!date) return 'Unknown Date';
	date = new Date(date);
	const day = date.getDate();
	const dayString = day < 10 ? '0' + day : day;

	const month = date.getMonth() + 1;
	const monthString = month < 10 ? '0' + month : month;

	return monthString + '/' + dayString + '/' + date.getFullYear();
};
