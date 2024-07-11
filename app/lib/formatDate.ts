import { formatDistanceToNow } from 'date-fns';

export const formatDate = (date: Date): string => {
  return formatDistanceToNow(date, { addSuffix: true });
};