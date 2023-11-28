import { useState } from "react";
import { postAdded } from "./postsSlice";
import { useDispatch, useSelector } from "react-redux"; // update store
import { addNewPost } from './postsSlice'

export const AddNewPostForm = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [userId, setUserId] = useState('');
    const [addRequestStatus, setAddRequestStatus] = useState('idle')

    const dispatch = useDispatch();

    const users = useSelector(state => state.users);

    const onTitleChange = e => setTitle(e.target.value);
    const onContentChange = e => setContent(e.target.value);
    const onAuthorChanged = e => setUserId(e.target.value);

    // const onSavePostClicked = () => {
    //     if (title && content) {
    //         dispatch(postAdded(title, content, userId))
    //         setTitle('')
    //         setContent('')
    //     }
    // }

    const canSave = [title, content, userId].every(Boolean) && addRequestStatus === 'idle';

    const onSavePostClicked = async () => {
        if (canSave) {
            try {
                setAddRequestStatus('pending')
                await dispatch(addNewPost({title, content, user: userId})).unwrap()
                setTitle('')
                setContent('')
                setUserId('')
            } catch (err) {
                console.error('Failed to save the post: ', err)
            } finally {
                setAddRequestStatus('idle')
            }
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
                <label htmlFor="postAuthor">Author:</label>
                <select id="postAuthor" value={userId} onChange={onAuthorChanged}>
                    <option value=""></option>
                    {users.map(user => (
                        <option key={user.id} value={user.id}>
                            {user.name}
                        </option>
                    ))}
                </select>
                <label htmlFor="postContent">Post Content:</label>
                <input
                    type="text"
                    id="postContent"
                    value={content}
                    onChange={onContentChange}
                />
                <button onClick={onSavePostClicked} type="button" disabled={!title && !content && !userId}>Save Post</button>
            </form>
        </section>
    )
}