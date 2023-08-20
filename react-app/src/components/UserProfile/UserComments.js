import CommentCard from "../CommentCard"
import './UserComments.css'

export default function UserComments({ user, posts, comments }){
    const userComments = []

    for(let i = 0; i < posts.length; i++) {
        const postComments = posts[i].post_comments
        for(let j = 0; j < postComments.length; j++) {
            const comment = postComments[j]
            console.log('comment', comment)
            if(comment.user_id === user.id) {
                userComments.push(comment)
            }
        }
    }
    console.log(userComments)
    return (
        <div id='user-comments-container'>
            {userComments.sort((a, b) => new Date(b.created_date).getTime() - new Date(a.created_date).getTime()).map((comment) =>(
                <CommentCard posts={posts} comment={comment} key={comment.id} />
            ))}
        </div>
    )
}
