import { Link } from "react-router-dom"
import './CommentCard.css'

export default function CommentCard({ posts, comment }) {
    const post = posts.find(post => post.id === comment.post_id);
    const photo = post.post_graphic[0].url
    const commentDate = new Date(comment?.created_date)
    const currentDate = new Date()
    const timeDifference = Math.floor(( currentDate - commentDate ) / 1000)
    const dayDiff = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    console.log(dayDiff)

    let timeAgo = "";
    if(timeDifference < 60) {
        timeAgo = 'Just now'
    } else if (timeDifference < 3600) {
        const mins = Math.floor(timeDifference / 60);
        timeAgo = `${mins} ${mins === 1 ? "minute" : "minutess"} ago`;
    } else if (timeDifference < 86400) {
        const hours = Math.floor(timeDifference / 3600);
        timeAgo = `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
    } else if (timeDifference < 2592000) {
        const days = Math.floor(timeDifference / 86400);
        timeAgo = `${days} ${days === 1 ? "day" : "days"} ago`;
    } else if (timeDifference < 31536000) {
        const months = Math.floor(timeDifference / 2592000);
        timeAgo = `${months} ${months === 1 ? "month" : "months"} ago`;
    } else {
        const years = Math.floor(timeDifference / 31536000);
        timeAgo = `${years} ${years === 1 ? "year" : "years"} ago`;
    }


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
                        {timeAgo}
                    </div>
                </div>
            </div>
        </Link>
    )
}
