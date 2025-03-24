import axios from 'axios';

const API_URL = 'YOUR_API_URL'; // Replace with your actual API URL

export const authService = {
  async login(email: string, password: string) {
    try {
      const response = await axios.post(`${API_URL}/login`, {
        email,
        password,
      });
      return response.data.token;
    } catch (error) {
      throw new Error('Login failed');
    }
  },

  async register(email: string, password: string) {
    try {
      const response = await axios.post(`${API_URL}/register`, {
        email,
        password,
      });
      return response.data.token;
    } catch (error) {
      throw new Error('Registration failed');
    }
  },
};