export const getImageUrl = (path: string | null | undefined): string => {
  if (!path) return "";
  
  // 1. If it's already a full URL, return it
  if (path.startsWith("http")) return path;
  
  // 2. Get the base API URL (e.g., https://domain.com/api/)
  const baseUrl = import.meta.env.VITE_BANK_API_URL || "";
  
  // 3. Remove trailing slash from baseUrl
  const normalizedBase = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
  
  // 4. Ensure path starts with a slash
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  
  // 5. If path already starts with /api/, we need to avoid doubling it
  // Example: base=.../api, path=/api/uploads -> we want .../api/uploads
  if (cleanPath.startsWith("/api/")) {
    const host = normalizedBase.replace(/\/api$/, "");
    return encodeURI(`${host}${cleanPath}`);
  }
  
  // Example: base=.../api, path=/uploads -> we want .../api/uploads
  return encodeURI(`${normalizedBase}${cleanPath}`);
};
