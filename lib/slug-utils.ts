// Turkish character to English character mapping
const turkishToEnglish: { [key: string]: string } = {
  'ç': 'c',
  'ğ': 'g',
  'ı': 'i',
  'ö': 'o',
  'ş': 's',
  'ü': 'u',
  'Ç': 'C',
  'Ğ': 'G',
  'İ': 'I',
  'Ö': 'O',
  'Ş': 'S',
  'Ü': 'U'
}

/**
 * Converts Turkish characters to English characters
 */
export function convertTurkishToEnglish(text: string): string {
  return text.replace(/[çğıöşüÇĞİÖŞÜ]/g, (char) => turkishToEnglish[char] || char)
}

/**
 * Creates a URL-friendly slug from Turkish text
 */
export function createSlug(text: string): string {
  return convertTurkishToEnglish(text)
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters except spaces and hyphens
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .trim()
}

/**
 * Creates a region service slug
 */
export function createRegionServiceSlug(regionName: string, serviceName: string): string {
  const regionSlug = createSlug(regionName)
  const serviceSlug = createSlug(serviceName)
  return `${regionSlug}-${serviceSlug}`
}
