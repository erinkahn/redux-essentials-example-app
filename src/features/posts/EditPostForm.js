import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom"; //switch to single post page and show that page
import { postEdited } from "./postsSlice";

export const EditPostForm = ({match}) => { // match object contains URL info we need
    const { postId } = match.params; // read value of postId

    const post = useSelector(state => state.posts.find(post => post.id === postId)) // find post object from store

    const [title, setTitle] = useState(post.title);
    const [content, setContent] = useState(post.content);

    const dispatch = useDispatch();
    const history = useHistory();

    const onTitleChanged = e => setTitle(e.target.value);
    const onContentChanged = e => setContent(e.target.value);

    const onSavePostClicked = () => {
        if (title && content) {
            dispatch(postEdited({
                id: postId,
                title,
                content
            }))
            history.push(`/posts/${postId}`)
        }
    }

    return (
        <section>
            <h2>Edit Post</h2>
            <form>
            <label htmlFor="postTitle">Post Title:</label>
                <input
                    type="text"
                    id="postTitle"
                    name="postTitle"
                    placeholder="What's on your mind?"
                    value={title}
                    onChange={onTitleChanged}
                />

                <label htmlFor="postContent">Post Content:</label>
                <input
                    type="text"
                    id="postContent"
                    name="postContent"
                    value={content}
                    onChange={onContentChanged}
                />
                <button onClick={onSavePostClicked} type="button">Save Post</button>
            </form>
        </section>
    )
}