import { useEffect } from "react";
// get posts data by using useSelector which can read data frmo redux store
// "selector functions" that you write will be called with the entire Redux state object as a parameter, and should return the specific data that this component needs from the store.
import { useSelector, useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import { PostAuthor } from "./PostAuthor";
import { TimeAgo } from "./TimeAgo";
import { ReactionButtons } from "./ReactionButtons";
import { selectAllPosts, fetchPosts } from "./postsSlice";
import { Spinner } from '../../components/Spinner';

const PostExcerpt = ({ post }) => {
    return (
        <article className="post-excerpt">
            <h3>{post.title}</h3>
            <div>
                <PostAuthor userId={post.user}/>
                <TimeAgo timestamp={post.date}/>
            </div>
            <p className="post-content">{post.content.substring(0, 100)}</p>

            <ReactionButtons post={post} />
            <Link to={`/posts/${post.id}`} className="button muted-button">
                View Post
            </Link>
        </article>
    )
}

export const PostsList = () => {
    const dispatch = useDispatch();
    
    // read data from store with useSelector hook
    const posts = useSelector(selectAllPosts); // state.posts from redux store
    const postStatus = useSelector(state => state.posts.status);
    const error = useSelector(state => state.posts.error);

    useEffect(() => {
        if (postStatus === 'idle') {
            dispatch(fetchPosts())
        }
    }, [postStatus, dispatch]) // only fetch posts once and NOT every time PostsList rendered

    let content;

    if (postStatus === 'loading') {
        content = <Spinner text='loading...' />
    } else if (postStatus === 'succeeded') {
        // sort posts in reverse chronological order by datetime
        const orderedPosts = posts
            .slice()
            .sort((a, b) => b.date.localeCompare(a.date))

        content = orderedPosts.map(post => (
            <PostExcerpt key={post.id} post={post} />
        ))
    } else if (postStatus === 'failed') {
        content = <div>{error}</div>
    }

    return (
        <section className="posts-list">
            <h2>Posts</h2>
            {content}
        </section>
    )
}