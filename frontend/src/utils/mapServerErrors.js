/**
 * Maps Laravel 422 validation error payloads onto react-hook-form fields.
 * Laravel shape: { message: string, errors: { field: string[] } }
 *
 * @param {import('axios').AxiosError} error
 * @param {import('react-hook-form').UseFormSetError} setError
 * @returns {string|null} A general/fallback error message, if any, that isn't tied to a specific field.
 */
export function mapServerErrors(error, setError) {
  const status = error?.response?.status;
  const data = error?.response?.data;

  if (status === 422 && data?.errors) {
    Object.entries(data.errors).forEach(([field, messages]) => {
      setError(field, { type: 'server', message: Array.isArray(messages) ? messages[0] : String(messages) });
    });
    return null;
  }

  return data?.message || 'Une erreur est survenue. Veuillez réessayer.';
}