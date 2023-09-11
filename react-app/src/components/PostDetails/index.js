import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { getAllPostsThunk } from "../../store/posts";
import { useEffect, useState } from "react";
import OpenModalButton from '../OpenModalButton';
import EditPostModal from "../EditPostModal";
import DeletePostModal from "../DeletePostModal";
import AddCommentForm from "./addCommentForm";
import PostComments from "./postComments";
import './PostDetails.css'
import PostCard from "../PostCard";
import { Link } from "react-router-dom";
import { addNewLike, deleteExistingLike, getAllPostLikesThunk } from "../../store/likes";
import { addNewFav, deleteExistingFav, getAllUserFavs } from "../../store/favorites";

export default function PostDetails() {
    const history = useHistory();
    const dispatch = useDispatch();
    let { id } = useParams();
    id = parseInt(id);
    const sessionUser = useSelector((store) => store.session.user);
    const postsData = useSelector((store) => store.posts);
    const posts = Object.values(postsData)
    const publicPosts = posts.filter(post => post.hidden === false)
    const post = postsData[id];
    const userFavs = useSelector((store) => store.favorites);
    const userFavsArr = Object.values(userFavs)
    const userPostFav = userFavsArr.filter(fav => fav.post_id === post.id)
    console.log('does user have a fav for this post', userPostFav)
    // console.log('userFavs', userFavs)
    const photos = post?.post_graphic;
    const comments = post?.post_comments
    const likesData = useSelector((store) => store.likes)
    const likes = Object.values(likesData)
    const postLikes = likes.filter(like => like.post_id === post.id)
    const [upVoteStatus, setUpVoteStatus] = useState(null);
    const [downVoteStatus, setDownVoteStatus] = useState(null);
    const [favStatus, setFavStatus] = useState(null);
    let userVote2 = []

    const postDate = new Date(post?.created_date)
    const currentDate = new Date()
    const timeDifference = Math.floor(( currentDate - postDate ) / 1000)

    let timeAgo = "";
    if(timeDifference < 60) {
        timeAgo = 'Just now'
    } else if (timeDifference < 3600) {
        const mins = Math.floor(timeDifference / 60);
        timeAgo = `${mins} ${mins === 1 ? "minute" : "minutes"} ago`;
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

    const goToTop = () => {
        window.scrollTo({
            top: 0
        });
    }

    useEffect(() => {
        // MEGATHUNKADONK
        if (!Object.values(postsData).length || !Object.values(post).length || !Object.values(userFavs).length) {
          async function fetchData() {
            await dispatch(getAllPostsThunk());
            await dispatch(getAllUserFavs());
          }
          fetchData();
        }
      }, [dispatch]);


    async function handleFav(e) {
        e.preventDefault();
        e.stopPropagation();

        if(userPostFav.length > 0) {
            await dispatch(deleteExistingFav(userPostFav[0]?.id))
        } else {
            let data = {
                user_id: sessionUser.id,
                post_id: post.id,
            };
            await dispatch(addNewFav(data))
        }
    }

    let userVote = []

    async function handleLike(e) {
        e.preventDefault();
        e.stopPropagation();

        if (sessionUser) {
          userVote2 = postLikes.filter((like) => like.user_id === sessionUser.id);
          console.log('userVote', userVote);
        }

        if (userVote2.length > 0) {
          await dispatch(deleteExistingLike(userVote2[0].id));
        } else {
          let data = {
            user_id: sessionUser.id,
            post_id: post.id,
            vote: 1,
          };
          const newLike = await dispatch(addNewLike(data));
        }

        // Prevent the click event from propagating

      }

      async function handleDislike(e) {
        e.preventDefault();
        e.stopPropagation();

        if (sessionUser) {
          userVote2 = postLikes.filter((like) => like.user_id === sessionUser.id);
          console.log('userVote', userVote);
        }

        if (userVote2.length > 0) {
          await dispatch(deleteExistingLike(userVote2[0].id));
        } else {
          let data = {
            user_id: sessionUser.id,
            post_id: post.id,
            vote: -1,
          };
          const newLike = await dispatch(addNewLike(data));
        }

        // Prevent the click event from propagating
      }

    function calTotalVotes(arr) {
        return arr.reduce((totalVotes, like) => totalVotes + like.vote, 0);
    }

    const totalVotes = calTotalVotes(postLikes)

    useEffect(() => {
        if (!Object.values(likesData).length) {
            async function fetchData() {
                await dispatch(getAllPostLikesThunk(post?.id));
            }
            fetchData();
        }
    }, [dispatch]);

    useEffect(() => {
        // Update voteStatus when postLikes change
        if (sessionUser) {
            userVote = postLikes.filter(like => like.user_id === sessionUser.id)
            console.log('user', userVote[0]?.vote)
            if (userVote) {
              if(userVote[0]?.vote === 1){
                setUpVoteStatus("upvote")
              } else {
                setUpVoteStatus(null)
              }
              if(userVote[0]?.vote === -1){
                setDownVoteStatus("downvote")
              } else {
                setDownVoteStatus(null)
              }
            }
          }
      }, [dispatch, likesData, post?.id, postLikes, sessionUser]);

    useEffect(() => {
        if(userPostFav.length > 0) {
            setFavStatus("faved")
        } else {
            setFavStatus(null)
        }
    }, [dispatch, userFavs, post?.id, sessionUser])


    if (!post) return <></>;

    return (
        <div id='post-details-outer'>
            <div id='post-details-breadcrumb'>
                <h3 onClick={() => history.goBack()} id="breadcrumb">
                    {"< Go Back"}
                </h3>
            </div>
            <div id='post-details'>
            <div id='post-details-votes-container'>
                <div id='post-details-votes'>
                    <button className={`vote-button ${upVoteStatus === 'upvote' ? 'upvoted' : ''}`} onClick={handleLike} disabled={!sessionUser}>
                            <i class="fa fa-solid fa-arrow-up"></i>
                    </button>
                    <span id='post-total-votes'>{totalVotes}</span>
                    <button className={`vote-button ${downVoteStatus === 'downvote' ? 'downvoted' : ''}`} onClick={handleDislike} disabled={!sessionUser}>

                            <i class="fa fa-solid fa-arrow-down"></i>
                    </button>
                    <button className={`vote-button ${favStatus === 'faved' ? 'faved' : ''}`} onClick={handleFav} disabled={!sessionUser}>
                        <i class="fa fa-solid fa-heart"></i>
                    </button>
                </div>
            </div>
                <div id='post-details-main-container'>
                    <div id='post-details-title-user'>
                        <div id='post-details-title'>
                            <h2>
                                {post.title}
                            </h2>
                        </div>
                            <div id='post-detail-user'>
                                <span>{post?.user?.username}</span>
                                <div>
                                    {timeAgo}
                                </div>
                            </div>
                    </div>
                    <div id='post-details-img'>
                        <img
                        alt='post'
                        src={photos[0].url}
                        title={post.title}
                        />
                    </div>
                    <div id='post-description-container'>
                        <p>
                            {post.description}
                        </p>
                    </div>
                    <div id='edit-delete-post-container'>
                        {sessionUser && sessionUser.id === post.user_id &&
                        <div id='edit-button-container'>
                            <OpenModalButton
                               className="edit-modal-button"
                               buttonText="Edit Post"
                               modalComponent={<EditPostModal user={sessionUser} post={post}/>}
                           />
                        </div>}

                        {sessionUser && sessionUser.id === post.user_id &&
                        <div id='delete-button-container'>
                            <OpenModalButton
                                className="delete-modal-button"
                                buttonText="Delete Post"
                                modalComponent={<DeletePostModal post={post}/>}
                            />
                        </div>}
                    </div>
                </div>
                <div id='post-comments-whole-container'>
                    {sessionUser && <AddCommentForm user={sessionUser} post={post}/>}
                    <div id='post-num-comments'>
                        {comments?.length} Comments
                    </div>
                    <hr id='comments-hr'/>
                    <div id='post-comments-container'>
                        {comments.sort((a, b) => new Date(b.created_date).getTime() - new Date(a.created_date).getTime()).map((comment) => (
                            <PostComments comment={comment} post={post} sessionUser={sessionUser}/>
                        ))}
                    </div>
                </div>
            </div>
            <div id='explore-posts-text'>
                EXPLORE POSTS
            </div>
            <div id='posts-container'>
                {publicPosts?.sort((a, b) => new Date(b.created_date).getTime() - new Date(a.created_date).getTime()).map((post) => (
                    <Link onClick={goToTop} to={`/posts/${post.id}`} title={post.title}>
                        <PostCard post={post} key={post.id} />
                    </Link>
                ))}
            </div>
        </div>
    )
}
