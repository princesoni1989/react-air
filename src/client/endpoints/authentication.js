export default({
  login: {
    path: 'http://localhost:3000/api/auth/local/',
    method: 'POST',
  },
  signup: {
    path: 'http://localhost:3000/api/user/',
    method: 'POST',
  },
  loggedInUser: {
    path: 'http://localhost:3000/api/user/me',
    method: 'GET',
  }
});
