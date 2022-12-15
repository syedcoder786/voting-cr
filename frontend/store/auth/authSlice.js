import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

// Get user from localStorage
let user;
if (typeof window !== "undefined") {
  console.log("You are on the browser");
  // 👉️ can use localStorage here
  user = JSON.parse(localStorage.getItem("user"));
} else {
  console.log("You are on the server");
  // 👉️ can't use localStorage
}

const initialState = {
  user: user ? user : null,
  users: [],
  studentId: null,
  email: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Register user
export const register = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    try {
      return await authService.register(user);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Login user
export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  try {
    return await authService.login(user);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Vote user
export const voteUser = createAsyncThunk("auth/vote", async (data,thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await authService.voteUser(data, token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const logout = createAsyncThunk("auth/logout", async () => {
  await authService.logout();
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
    getUsers: (state, action) => {
      state.users = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.studentId = action.payload.studentId,
        state.email = action.payload.email,
        state.isLoading = false;
        state.isSuccess = true;
        // state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(voteUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(voteUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;

        //Find index of specific object using findIndex method.    
        const objIndex = state.users.findIndex((obj => obj._id == action.payload._id));

        // //Log object to Console.
        // console.log("Before update: ", state.users[objIndex])

        //Update object's name property.
        state.users[objIndex] = {...action.payload}

        // // //Log object to console again.
        // console.log("After update: ", state.users[objIndex])

      })
      .addCase(voteUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        // state.user = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        // localStorage.removeItem("user");
      });
  },
});

export const { reset, getUsers } = authSlice.actions;
export default authSlice.reducer;
