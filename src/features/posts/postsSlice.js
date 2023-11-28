// createSlice function makes a reducer function that knows how to handle our posts data. 
import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit"; //nanoid makes random ID
import { client } from "../../api/client";

// initial posts array
const initialState = {
    posts: [],
    status: 'idle',
    error: null
}

// fetch data with createSyncThunk API
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const response = await client.get('/fakeApi/posts');
    return response.data;
})

export const addNewPost = createAsyncThunk(
    'posts/addNewPost',
    // The payload creator receives the partial `{title, content, user}` object
    async initialPost => {
        // send the initial data to the fake API server
        const response = await client.post('/fakeApi/posts', initialPost)
        // The response includes the complete post object, including unique ID
        return response.data
    }
)

// pass createSlice - lets us write "mutating" logic in our reducers
// Every time we create a new slice, we need to add its reducer function to our Redux store so go add that in store.js
const postsSlice = createSlice({
    name: 'posts', // reducer name
    initialState,
    reducers: { // to add posts, need reducer function inside this object
        reactionAdded(state, action) {
            const {postId, reaction} = action.payload;
            const existingPost = state.posts.find(post => post.id === postId);
            if (existingPost) {
                existingPost.reactions[reaction]++
            }
        },
        // postAdded(state, action) { // state is the posts array, action is the new post entry
        //     state.push(action.payload) // add new post entry to posts array (push makes new copy)
        // },
        postAdded: {
            reducer(state, action) {
              state.posts.push(action.payload)
            },
            prepare(title, content, userId) {
              return {
                payload: {
                  id: nanoid(),
                  date: new Date().toISOString(),
                  title,
                  content,
                  user: userId
                }
              }
            }
        },
        postEdited(state, action) {
            const {id, title, content} = action.payload;
            const existingPost = state.posts.find(post => post.id === id);
            if (existingPost) {
                existingPost.title = title;
                existingPost.content = content;
            }
        }
    },
    extraReducers(builder) { // builder object provides methods that let us define additional case reducers that will run in response to actions defined outside of the slice
        builder
            .addCase(fetchPosts.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = 'succeeded'
                // Add any fetched posts to the array
                state.posts = state.posts.concat(action.payload)
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
        builder.addCase(addNewPost.fulfilled, (state, action) => {
            // add the new post object to our posts array
            state.posts.push(action.payload)
        })
    } 
})

export const { postAdded, postEdited, reactionAdded } = postsSlice.actions // export action creator for components to dispatch action when user clicks 'save post'

// export the posts reducer function createSlice generated
export default postsSlice.reducer

export const selectAllPosts = state => state.posts.posts;

export const selectPostById = (state, postId) => state.posts.posts.find(post => post.id === postId);