import axios from "axios";

const SERVER_URL = "https://jmivoting.herokuapp.com"

const API_URL = `${SERVER_URL}/api/users/`;

const API_URL_VOTE = `${SERVER_URL}/api/votes/`;

// Register user
const register = async (userData) => {
  const response = await axios.post(API_URL, userData);

  // if (response.data) {
  //   localStorage.setItem("user", JSON.stringify(response.data));
  // }

  console.log(response.data);
  return response.data;
};

// Login user
const login = async (userData) => {
  const response = await axios.post(API_URL + "login", userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// Vote user
const voteUser = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL_VOTE + "voteUser", data, config);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// Logout user
const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  logout,
  login,
  voteUser,
};

export default authService;
