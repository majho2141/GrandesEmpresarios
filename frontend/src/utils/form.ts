/**
 * Convierte un objeto en formato URLSearchParams para peticiones application/x-www-form-urlencoded
 */
export function objectToFormData(obj: Record<string, any>): URLSearchParams {
  const formData = new URLSearchParams();
  
  Object.entries(obj).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, value.toString());
    }
  });
  
  return formData;
} 