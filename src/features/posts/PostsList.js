// get posts data by using useSelector which can read data frmo redux store
// "selector functions" that you write will be called with the entire Redux state object as a parameter, and should return the specific data that this component needs from the store.
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { PostAuthor } from "./PostAuthor";
import { TimeAgo } from "./TimeAgo";
import { ReactionButtons } from "./ReactionButtons";

export const PostsList = () => {
    // read data from store with useSelector hook
    const posts = useSelector(state => state.posts); // state.posts from redux store

    // sort posts in reverse chronological order by datetime
    const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))

    const renderedPosts = orderedPosts.map(post => {
        return (
            <article className="post-excerpt" key={post.id}>
                <h3>{post.title}</h3>

                <div>
                    <PostAuthor userId={post.user} />
                    <TimeAgo timestamp={post.date} />
                </div>

                <p className="post-content">{post.content.substring(0, 100)}</p>

                <ReactionButtons post={post} />
                
                <Link to={`/posts/${post.id}`} className="button muted-button">View Post</Link>
            </article>
        )
    })

    return (
        <section className="posts-list">
            <h2>Posts</h2>
            {renderedPosts}
        </section>
    )
}