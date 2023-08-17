import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import './TagCard.css'

export default function TagCard({ tag }) {
    const postsData = useSelector((store) => store.posts)
    const posts = Object.values(postsData)
    const tagPosts = posts.filter((post) => post.tag_id === tag?.id)

    console.log(tag)
    console.log(tag.url)
    return (
        <Link to={`/tags/${tag.id}`}>

            <div id='tag-card-container'>
                <div id='tag-img-container'>
                    <img src={tag.url}/>
                </div>
                <div id='tag-info-container'>
                    <div id='tag-title'>
                        {tag.title}
                    </div>
                    <div id='tag-post-num'>
                        {tagPosts?.length} Posts
                    </div>
                </div>
            </div>
        </Link>
    )
}
