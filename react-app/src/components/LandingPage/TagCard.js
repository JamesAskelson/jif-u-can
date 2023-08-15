import { Link } from "react-router-dom"

export default function TagCard({ tag }) {

    console.log(tag)
    return (
        <Link to={`/tags/${tag.id}`}>
            <div id=''>
                <p>
                    {tag.title}
                </p>
            </div>
        </Link>
    )
}
