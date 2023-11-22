import { configureStore } from '@reduxjs/toolkit';
import postsReducer from '../features/posts/postsSlice';

export default configureStore({
  reducer: {
    posts: postsReducer // reducer field named posts - posts data is now in our store
  }
})
