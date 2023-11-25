// createSlice function makes a reducer function that knows how to handle our posts data. 
import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "@reduxjs/toolkit"; // generates random ID

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
        // postAdded(state, action) { // state is the posts array, action is the new post entry
        //     state.push(action.payload) // add new post entry to posts array (push makes new copy)
        // },
        postAdded: {
            reducer(state, action) {
              state.push(action.payload)
            },
            prepare(title, content, userId) {
              return {
                payload: {
                  id: nanoid(),
                  title,
                  content,
                  user: userId
                }
              }
            }
        },
        postEdited(state, action) {
            const {id, title, content} = action.payload;
            const existingPost = state.find(post => post.id === id);
            if (existingPost) {
                existingPost.title = title;
                existingPost.content = content;
            }
        }
    } 
})

export const { postAdded, postEdited } = postsSlice.actions // export action creator for components to dispatch action when user clicks 'save post'

// export the posts reducer function createSlice generated
export default postsSlice.reducer