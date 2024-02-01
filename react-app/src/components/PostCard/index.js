import { useEffect, useState } from 'react'
import { addNewLike, deleteExistingLike, getAllPostLikesThunk } from '../../store/likes'
import './PostCard.css'
import { useDispatch, useSelector } from 'react-redux'

export default function PostCard({ post }) {
    const dispatch = useDispatch();
    const sessionUser = useSelector((store) => store.session.user);
    const postComments = post?.post_comments.length
    const likesData = useSelector((store) => store.likes)
    const likes = Object.values(likesData)
    const postLikes = likes.filter(like => like.post_id === post.id)
    const [upVoteStatus, setUpVoteStatus] = useState(null);
    const [downVoteStatus, setDownVoteStatus] = useState(null);
    let userVote = []


    async function handleLike(e) {
        e.preventDefault();
        e.stopPropagation();

        if (sessionUser) {
          userVote = postLikes.filter((like) => like.user_id === sessionUser.id);
          // console.log('userVote', userVote);
        }

        if (userVote.length > 0) {
          await dispatch(deleteExistingLike(userVote[0].id));
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
          userVote = postLikes.filter((like) => like.user_id === sessionUser.id);
          // console.log('userVote', userVote);
        }

        if (userVote.length > 0) {
          await dispatch(deleteExistingLike(userVote[0].id));
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
                await dispatch(getAllPostLikesThunk(post.id));
            }
            fetchData();
        }
    }, [dispatch]);

    useEffect(() => {
        // Update voteStatus when postLikes change
        if (sessionUser) {
            userVote = postLikes.filter(like => like.user_id === sessionUser.id)
            // console.log('user', userVote[0]?.vote)
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
      }, [dispatch, likesData, post.id, postLikes, sessionUser]);

    return (
        <div id='post-card-container'>
            <div id='post-card-image'>
                <img
                alt='post'
                src={post?.post_graphic[0]?.url}
                title={post.title}
                />
            </div>
            <div id='post-card-info'>
                <div id='post-card-title'>
                    {post.title}
                </div>
                <div id='post-card-votes-comments'>
                    <div id='post-card-votes-buttons'>
                        <button className={`vote-button-left ${upVoteStatus === 'upvote' ? 'upvoted' : ''}`} onClick={handleLike} disabled={!sessionUser}>
                            {/* <img src='https://aws-starter-bucket123.s3.amazonaws.com/jifucan-up-down-arrows/Upvote.svg'></img> */}
                            <i class="fa fa-solid fa-arrow-up"></i>
                        </button>
                        <span id='post-total-votes'>{totalVotes}</span>
                        <button className={`vote-button-right ${downVoteStatus === 'downvote' ? 'downvoted' : ''}`} onClick={handleDislike} disabled={!sessionUser}>
                            {/* <img src='https://aws-starter-bucket123.s3.amazonaws.com/jifucan-up-down-arrows/Downvote.svg'></img> */}
                            <i class="fa fa-solid fa-arrow-down"></i>
                        </button>
                    </div>
                    <div id='post-card-total-comments'>
                        <i class="fa fa-solid fa-comment fa-flip-horizontal" style={{ color: "#9c9c9c" }}></i>{postComments}
                    </div>

                </div>
            </div>
        </div>
    )
}
