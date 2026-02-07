import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

// Random number generator untuk glitch effects
export function randomBetween(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

// Random item from array
export function randomItem<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)]
}

// Glitch text generator
export function glitchText(text: string): string {
    const glitchChars = '!<>-_\\/[]{}—=+*^?#________'
    return text
        .split('')
        .map(char => (Math.random() > 0.9 ? randomItem(glitchChars.split('')) : char))
        .join('')
}
