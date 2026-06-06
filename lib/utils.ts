import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { PatientLocationSchema } from "./data/patients/types"
import type { PatientLocation } from "./data/patients/types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Parses a "ROOM:BED" string into a PatientLocation.
 * Uses `lastIndexOf` so room IDs containing ":" remain valid.
 * Validates the result through {@link PatientLocationSchema}.
 */
export function parseLocation(value: string | null): PatientLocation | null {
  if (!value) return null
  const sep = value.lastIndexOf(":")
  if (sep === -1) return null
  const room = value.slice(0, sep)
  const bed = parseInt(value.slice(sep + 1), 10)
  const result = PatientLocationSchema.safeParse({ room, bed })
  return result.success ? result.data : null
}

/** Serialises a PatientLocation back to the "ROOM:BED" select-value format. */
export function locationToValue(
  location: PatientLocation | null,
): string | undefined {
  if (!location) return undefined
  return `${location.room}:${location.bed}`
}

/** Calculates age in full years from a normalised YYYYMMDD-XXXX personal number. */
export function calculateAge(personalNumber: string | null): number | null {
  if (!personalNumber) return null
  const year = parseInt(personalNumber.substring(0, 4), 10)
  const month = parseInt(personalNumber.substring(4, 6), 10) - 1
  const day = parseInt(personalNumber.substring(6, 8), 10)
  const birth = new Date(year, month, day)
  const today = new Date()
  let age = today.getFullYear() - birth.getFullYear()
  const m = today.getMonth() - birth.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--
  return age
}
