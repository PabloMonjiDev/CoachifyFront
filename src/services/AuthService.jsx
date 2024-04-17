import axios from './AxiosConfig';

const AuthService = {
  login: async (username, password) => {
    try {
      const response = await axios.post('/auth/login', { username, password });
      return response.data.token; // Retorna solo el token
    } catch (error) {
      throw error.response.data.message;
    }
  },
  register: async (formData) => {
    try {
      const response = await axios.post('/auth/register', formData);
      return response.data.jwtToken; // Retorna solo el token
    } catch (error) {
      throw error.response.data.message;
    }
  }
};

export default AuthService;
