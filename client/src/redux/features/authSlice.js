import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mode: 'light',
  token: null,
  refreshToken: null,
  posts: [],
  user:{}
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    changeMode: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
    },

    setLogin: (state, action) => {
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
    },
    setUser: (state, action) => {
      state.user = action.payload.authUser;
    },

    setLogout: (state) => {
      state.token = null;
      state.refreshToken = null;
    },

    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.error('User does not exist!');
      }
    },

    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },

    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) =>
        post._id === action.payload.post_id ? action.payload.post : post
      );
      state.posts = updatedPosts;
    },
  },
});

export const { changeMode,setUser, setLogin, setLogout, setFriends, setPosts, setPost } = authSlice.actions;
export default authSlice.reducer;
