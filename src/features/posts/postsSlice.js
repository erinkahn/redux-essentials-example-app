// createSlice function makes a reducer function that knows how to handle our posts data. 
import { createSlice } from "@reduxjs/toolkit";

// initial posts array
const initialState = [
    { id: '1', title: 'First post!', content: 'hi, world!'},
    { id: '2', title: 'Second post!', content: 'hi again, world!'}
]

// pass createSlice 
// Every time we create a new slice, we need to add its reducer function to our Redux store so go add that in store.js
const postsSlice = createSlice({
    name: 'posts', // reducer name
    initialState,
    reducers: { // to add posts, need reducer function inside this object
        postAdded(state, action) { // state is the posts array, action is the new post entry
            state.push(action.payload) // add new post entry to posts array (push makes new copy)
        }
    } 
})

export const { postAdded } = postsSlice.actions // export action creator for components to dispatch action when user clicks 'save post'

// export the posts reducer function createSlice generated
export default postsSlice.reducer