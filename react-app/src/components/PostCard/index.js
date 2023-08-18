import './PostCard.css'


export default function PostCard({ post }) {
    const postComments = post?.post_comments.length

    return (
        <div id='post-card-container'>
            <div id='post-card-image'>
                <img
                alt='post'
                src={post.post_graphic[0].url}
                title={post.title}
                />
            </div>
            <div id='post-card-info'>
                <div id='post-card-title'>
                    {post.title}
                </div>
                <div id='post-card-total-comments'>
                    <i class="fa fa-solid fa-comment fa-flip-horizontal" style={{ color: "#9c9c9c" }}></i>{postComments}
                </div>
            </div>
        </div>
    )
}
