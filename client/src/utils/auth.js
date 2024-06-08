import decode from "jwt-decode";

class AuthService {
  // Get user data from the token
  getProfile() {
    const token = this.getToken();
    return token ? decode(token) : null;
  }

  // Check if user is logged in
  loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  // Check if the token is expired
  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      return decoded.exp < Date.now() / 1000;
    } catch (err) {
      return false; // Treat token as valid if there's an error decoding it
    }
  }

  // Get token from localStorage
  getToken() {
    return localStorage.getItem("id_token");
  }

  // Save token to localStorage and redirect to home
  login(idToken) {
    localStorage.setItem("id_token", idToken);
    window.location.assign("/");
  }

  // Remove token from localStorage and redirect to home
  logout() {
    localStorage.removeItem("id_token");
    window.location.assign("/");
  }
}

export default new AuthService();
