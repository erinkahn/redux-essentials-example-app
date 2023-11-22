import { useState } from "react";
import { postAdded } from "./postsSlice";
import { useDispatch } from "react-redux"; // update story 
import { nanoid } from "@reduxjs/toolkit"; // generates random ID

export const AddNewPostForm = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const onTitleChange = e => setTitle(e.target.value);
    const onContentChange = e => setContent(e.target.value);

    const dispatch = useDispatch();

    const onSavePostClicked = () => {
        if (title && content) {
            dispatch(postAdded({ // dispatch action - click/add post
                id: nanoid(),
                title,
                content
            }))

            setTitle('')
            setContent('')
        }
    }

    return (
        <section>
            <h2> Add new post</h2>
            <form>
                <label htmlFor="postTitle">Post Title:</label>
                <input
                    type="text"
                    id="postTitle"
                    value={title}
                    onChange={onTitleChange}
                />

                <label htmlFor="postContent">Post Content:</label>
                <input
                    type="text"
                    id="postContent"
                    value={content}
                    onChange={onContentChange}
                />
                <button onClick={onSavePostClicked} type="button">Save Post</button>
            </form>
        </section>
    )
}