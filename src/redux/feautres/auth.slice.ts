import { createSlice ,createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message.slice";

import AuthService from "@/services/auth.service";

interface User {
    username: string;
    email?: string;
    password: string;
}

interface AuthState {
    isLoggedIn: boolean;
    user: User | null;
}

// const userString = localStorage.getItem("user");
const userString = typeof localStorage !== "undefined" ? localStorage.getItem("user") : null;

const user: User | null = userString ? JSON.parse(userString) : null;

export const registerUser = createAsyncThunk(
  "auth/register",
  async ({ username, email, password }: User, thunkAPI) => {
    try {
      const response = await AuthService.register({username, email, password });
      console.log("wlecom to register user: " , response);
      thunkAPI.dispatch(setMessage(response.data.message));
      if(response.data.message == "User registered successfully!"){
        thunkAPI.dispatch(login({username, password}));
      }
      return response.data;
    } catch (error) {
      const message =
      (error as { response: { data: { message: string } } }).response?.data?.message ||
      (error as Error).message ||
      (error as string);
    thunkAPI.dispatch(setMessage(message));
    return thunkAPI.rejectWithValue("");
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async ({ username, password }: User, thunkAPI) => {
    try {
      console.log("from the auth/login: ",username, password);
      const data = await AuthService.login({username, password});
      console.log(data);
      return { user: data };
    } catch (error) {
      const message =
        (error as { response: { data: { message: string } } }).response?.data?.message ||
        (error as Error).message ||
        (error as unknown as string);
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue("");
    }
  }
);

export const logout = createAsyncThunk<void, void, {}>("auth/logout", async () => {
  await AuthService.logout();
});

const initialState: AuthState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null };


const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoggedIn = false;
      })
      .addCase(registerUser.rejected, (state) => {
        state.isLoggedIn = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        console.log("this !!!: ", state, action);
        state.isLoggedIn = true;
        state.user = action.payload.user;
        console.log("than : ", state.isLoggedIn, state.user);

      })
      .addCase(login.rejected, (state) => {
        state.isLoggedIn = false;
        state.user = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoggedIn = false;
        state.user = null;
      });
  },
});
      
const { reducer } = authSlice;
export default reducer;