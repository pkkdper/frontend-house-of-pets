module.exports = class ApiService {
    constructor() {
      this.api = axios.create({
        baseURL: 'http://localhost:5005/auth/login'
      });
    }

  editEmail = (userId, userEmail) => {
    return this.api.put(`/profile/${userId}`, userEmail);
  }

  editUsername = (characterId, userUsername) => {
    return this.api.put(`/profile/${userId}`, userUsername);
  }
  }
