/** Backend origin — works with CORS when the page is not served by Vite. */
export const API_BASE =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_API_URL) ||
  "http://localhost:4000";

/**
 * Read body once and parse JSON, with a clear error if the response is HTML or empty.
 */
export async function parseJsonResponse(response) {
  const text = await response.text();
  const trimmed = text.trim();
  if (!trimmed) {
    throw new Error(
      "Empty response from the API. Start the backend (port 4000) and try again."
    );
  }
  try {
    return JSON.parse(trimmed);
  } catch {
    throw new Error(
      "The API did not return JSON. Is the backend running on http://localhost:4000?"
    );
  }
}
