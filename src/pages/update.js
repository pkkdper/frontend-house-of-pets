module.exports = class ApiService {
  constructor() {
    this.api = axios.create({
      baseURL: `${process.env.REACT_APP_BACKEND_URL}/auth/login`,
    });
  }

  editEmail = (userId, userEmail) => {
    return this.api.put(`/profile/${userId}`, userEmail);
  };

  editUsername = (characterId, userUsername) => {
    return this.api.put(`/profile/${userId}`, userUsername);
  };
};
