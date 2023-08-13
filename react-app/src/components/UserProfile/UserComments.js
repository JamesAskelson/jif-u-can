
import CommentCard from "../CommentCard"

export default function UserComments({ posts, comments }){
    const commentsArr = Object.values(comments)
    return (
        <div id='user-comments-container'>
            {commentsArr.map((comment) =>(
                <CommentCard posts={posts} comment={comment} key={comment.id} />
            ))}
        </div>
    )
}
