// use React Router to show this component when the page URL looks like /posts/123, 
// where the 123 part is ID of the post we want to show.
import { useSelector } from "react-redux"; // get post data from store
import { Link } from "react-router-dom";
import { PostAuthor } from "./PostAuthor";
import { ReactionButtons } from "./ReactionButtons";

export const SinglePostPage = ({ match }) => { // match object contains URL info we need
    const { postId } = match.params; // read value of postId

    const post = useSelector(state => state.posts.find(post => post.id === postId)) // find post object from store

    if (!post) { // if user types url directly and post doesnt exist
        return (
            <section>
                <h2>No Post Found</h2>
            </section>
        )
    }

    return (
        <section>
            <article>
                <h2>{post.title}</h2>

                <PostAuthor userId={post.user} />

                <p className="post-content">{post.content}</p>

                <ReactionButtons post={post} />
                
                <Link to={`/editPost/${post.id}`} className="button">Edit Post</Link>
            </article>
        </section>
    )
}