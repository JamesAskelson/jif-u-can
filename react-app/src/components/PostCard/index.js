
export default function PostCard({ post }) {
    return (
        <div id='post-card-container'>
            <div id='post-card-image-container'>
                <img
                alt='post'
                src={post.post_graphic[0].url}
                title={post.title}
                />
            </div>
            <div id='post-card-info-container'>
                {post.description}
            </div>
        </div>
    )
}
