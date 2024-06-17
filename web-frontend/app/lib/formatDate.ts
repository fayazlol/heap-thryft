import { formatDistanceToNow } from 'date-fns';

/**
 * Calculate the difference from a given date to now
 * @param date - The date to compare
 * @returns A human-readable string representing the difference
 */
export const formatDate = (date: Date): string => {
  return formatDistanceToNow(date, { addSuffix: true });
};