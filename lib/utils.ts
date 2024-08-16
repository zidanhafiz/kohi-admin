import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatFullName = (firstName: string, lastName: string) => {
  const fnameCase = firstName.charAt(0).toUpperCase() + firstName.slice(1);
  const lNameCase = lastName.charAt(0).toUpperCase() + lastName.slice(1);
  return `${fnameCase} ${lNameCase}`;
}
