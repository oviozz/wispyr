
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const getTitle = (pathname: string) => {
  if (pathname.includes('/messages')) {
    return 'Messages';
  } else if (pathname.includes('/friends')) {
    return 'Friends';
  } else if (pathname.includes('/requests')) {
    return 'Requests';
  } else if (pathname.includes('/settings')) {
    return 'Settings';
  } else {
    return 'Home';
  }
};

export const getInitials = (name: string) => {
  return name
      .split(" ")
      .map((n) => n[0])
      .join("");
}

export const formatTimeAgo = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

  if (diffInHours < 24) {
    return `${diffInHours} hours ago`;
  }
  const diffInDays = Math.floor(diffInHours / 24);
  return `${diffInDays} days ago`;
};

export const capitalizeFirst = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()


export function timeAgo(timestamp: string | number): string {
  let parsedTimestamp: number;

  // If timestamp is a string, parse it into a Date object
  if (typeof timestamp === "string") {
    parsedTimestamp = new Date(timestamp).getTime(); // Converts to Unix timestamp in milliseconds
  } else {
    parsedTimestamp = timestamp;
  }

  const now = Date.now();
  const diff = now - parsedTimestamp;

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

  if (seconds < 60) {
    return `${seconds} second${seconds === 1 ? '' : 's'} ago`;
  } else if (minutes < 60) {
    return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
  } else if (hours < 24) {
    return `${hours} hour${hours === 1 ? '' : 's'} ago`;
  } else if (days < 30) {
    return `${days} day${days === 1 ? '' : 's'} ago`;
  } else if (months < 12) {
    return `${months} month${months === 1 ? '' : 's'} ago`;
  } else if (years > 0) {
    return `${years} year${years === 1 ? '' : 's'} ago`;
  }

  return 'just now'; // for edge cases
}