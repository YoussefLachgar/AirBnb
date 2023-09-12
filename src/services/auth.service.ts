import axios from "axios"; 

const API_URL = "http://localhost:8085/api/auth/";

interface SignUpData {
    username: string;
    email?: string;
    password: string;
  }

const register = async (userData: SignUpData) => {
    const response = await axios.post(API_URL + "signup", { ...userData, lastname: userData.username, firstname: userData.username,role: ["admin","host"] });
    console.log("this from register : ", response);
    return response;
};

interface LoginData {
    username: string;
    password: string;
}


const login = async (loginData: LoginData) => {
    console.log("loginData");
    const response = await axios.post(API_URL + "signin", loginData);
    // console.log("cookie: ", response.data.jwtToken);
    if (response.data.jwtToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
};

const logout = () => {
    localStorage.removeItem("user");
};

const authService = {
    register,
    login,
    logout,
};

export default authService;