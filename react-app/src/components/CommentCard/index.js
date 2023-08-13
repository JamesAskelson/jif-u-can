import { Link } from "react-router-dom"
import './CommentCard.css'

export default function CommentCard({ posts, comment }) {
    const post = posts.find(post => post.id === comment.post_id);
    const photo = post.post_graphic[0].url
    return (
        <Link to={`/posts/${post.id}`} title={post.title}>
            <div id='comment-card-container'>
                <div id='comment-card-image-container'>
                    <img
                        classname='user-profile-comments-img'
                        src={photo}
                    />
                </div>
                <div id='comment-card-info-container'>
                    {comment.text}
                </div>
            </div>
        </Link>
    )
}
