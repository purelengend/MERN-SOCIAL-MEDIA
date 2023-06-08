import { PaletteMode } from '@mui/material';
import { Post } from './../models/Post';
import { User } from './../models/User';
import { createSlice } from '@reduxjs/toolkit'

export interface RootStateProps {
  mode: PaletteMode | undefined;
  user: User | null;
  token: string | null;
  posts: Post[]
}
const initialState: RootStateProps = {
  mode: 'light',
  user: null,
  token: null,
  posts: []
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === 'light' ? 'dark' as PaletteMode : 'light' as PaletteMode
    },
    setLogin: (state, action) => {
      state.user = action.payload.user
      state.token = action.payload.token
    },
    setLogout: (state) => {
      state.user = null
      state.token = null
    },
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends
      }
      else {
        console.error('user has no friends')
      }
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts
    },
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post
        return post
      })
      state.posts = updatedPosts
    }
  }
})

export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost } = authSlice.actions
export default authSlice.reducer
