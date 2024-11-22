'use client'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { doLogin, getUserProfileData, doRegister} from '../../api/userActions';
import { setAuthToken, removeAuthToken } from '../../api/axiosInstance';
import { Login } from '../../interfaces/Login';

export enum UserState {
  loggedIn = 'loggedIn',
  loggedOut = 'loggedOut',
  tryingLogin = 'tryingLogin'
}

const saveToken = (token: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('token', token);
    setAuthToken(token);
  }
};

const removeToken = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token');
    removeAuthToken();
  }
};

const loadToken = () => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) setAuthToken(token);
    return token;
  }
  return null;
};

const initialState = {
  userName: null,
  userId: null,
  key: null,
  state: UserState.loggedOut,
};

export const loadUserProfileThunk = createAsyncThunk(
  'user/loadUserProfile',
  async (_, { rejectWithValue }) => {
    const token = loadToken();
    if (token) {
      try {
        const userProfile = await getUserProfileData();
        return {
          userName: userProfile.username,
          userId: userProfile.id,
          key: token,
        };
      } catch (error: any) {
        removeToken();
        return rejectWithValue('Failed to load user profile');
      }
    }
    return rejectWithValue('No token found');
  }
);
export const doLoginThunk = createAsyncThunk(
  'user/doLoginThunk',
  async (credentials : Login, { rejectWithValue }) => {
    try {
      const response = await doLogin(credentials);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Unknown error");  
    }
  }
);


export const doRegisterThunk = createAsyncThunk(
  'users/doRegister',
  async (userData: Login,  { rejectWithValue }) => {
    try{
      const response = await doRegister(userData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Unknown error");  
   }  
  }
);


export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout(state) {
      state.userName = null;
      state.userId = null;
      state.key = null;
      state.state = UserState.loggedOut;
      removeToken();
    },
  },

 extraReducers: (builder) => {
    builder
    .addCase(doLoginThunk.fulfilled, (state, action) => {
      state.key = action.payload.access_token;
      state.state = UserState.loggedIn;
      state.userId = action.payload.userId;
      state.userName = action.payload.userName;
      saveToken(action.payload.access_token);
    })
    .addCase(doLoginThunk.rejected, (state, action) => {
      state.key = null;
      state.state = UserState.loggedOut;
    })
    .addCase(doLoginThunk.pending, (state, action) => {
      state.key = null;
      state.state = UserState.tryingLogin;
    })

 }
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;

