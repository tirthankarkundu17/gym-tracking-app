/**
 * Resolves the full URL for a given asset path, taking into account the base URL.
 * If the path is already an absolute URL (starts with http:// or https://), it returns it as is.
 * Otherwise, it prepends the import.meta.env.BASE_URL.
 * 
 * @param path - The relative path to the asset (e.g., "thumbnails/image.jpg")
 * @returns The resolved absolute URL
 */
export const getAssetUrl = (path: string): string => {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  
  // Remove leading slash if present to avoid double slashes with BASE_URL
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  return `${import.meta.env.BASE_URL}${cleanPath}`;
};
