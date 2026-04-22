// Check if the user is logged in, if not then show them the guest page

/**
 * Verifies authentication status with the backend.
 * @returns {Promise<boolean>}
 */

export const checkAuthStatus = async () => {
  try {
    const response = await fetch("/auth/homepage", {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      console.warn(`Auth check failed with status: ${response.status}`);
      return false;
    }

    const result = await response.json();

    if (result.message === "load home page") {
      return true;
    }
    return false;
  } catch (error) {
    console.error("Network error during auth checkL ", error);
    return false;
  }
};
