import { Link } from "react-router-dom"
import './CommentCard.css'

export default function CommentCard({ posts, comment }) {
    const post = posts.find(post => post.id === comment.post_id);
    const photo = post.post_graphic[0].url
    const commentDate = new Date(comment?.created_date)
    const currentDate = new Date()
    const timeDifference = currentDate.getTime() - commentDate.getTime()
    const dayDiff = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    console.log(dayDiff)




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
                    <div id='comment-card-text'>
                        <span>{comment.text && comment.text}</span>
                    </div>
                    <div id='comment-card-img-container'>
                        {comment?.url && <img
                        className="comment-img"
                        src={comment.url}
                        />}
                    </div>
                    <div id='comment-card-date'>
                        {dayDiff === 0 ? "Today" : `${dayDiff} days ago`}
                    </div>
                </div>
            </div>
        </Link>
    )
}
