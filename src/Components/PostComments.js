import React, {useState, useEffect} from 'react'
import axios from 'axios';

export default function PostComments(props) {
    const [showComments, setShowComments] = useState(false);
    const [newCommentContent, setNewCommentContent] = useState('');
    const [postComments, setPostComments] = useState([])

    const demoComments = [
        {
            authorName: 'Ricardo',
            authorId:12,
            postId:10,
            content: 'Whats up',
            date: "Today at 15:03"
        },
        {
            authorName: 'Ricardo2',
            authorId:12,
            postId:10,
            content: 'Whats up',
            date: "Today at 15:03"
        },
        {
            authorName: 'Ricardo3',
            authorId:12,
            postId:10,
            content: 'Whats up',
            date: "Today at 15:03"
        },
        {
            authorName: 'Ricardo4',
            authorId:12,
            postId:10,
            content: 'Whats up5',
            date: "Today at 15:03"
        },
        {
            authorName: 'Ricardo6',
            authorId:12,
            postId:10,
            content: 'Whats up',
            date: "Today at 15:03"
        }
    ]

    useEffect(() => {
        console.log("rendered " + props.postId)
        const url = `api/posts/${props.postId}/comments`;
        axios.get(url).then(res => {
            console.log(res)
            let allComments = []
            res.data.map(comment => {
                axios.get(`api/users/${comment.author_id}`).then(user => {
                    allComments.push({...comment, username: user.data.username})
                })
            })
            console.log("ALL COMMENTS ", allComments)
            setPostComments(allComments);
        })
        .catch(err => console.log("Error fetching comments ", err));
    }, [])


    const onShowComments = () => {
        setShowComments(true);
    }

    const onHideComments = () => {
        setShowComments(false);
    }

    const handleNewCommentChange = (event) => {
        setNewCommentContent(event.target.value)
    }

    const submitNewComment = () => {
        const url = `api/posts/${props.postId}/comments`;
        const data = {
            author_id:props.authorId,
            content:newCommentContent
        }
        axios.get(`api/users/${props.authorId}`).then(user => {
            axios.post(url, data).then(res => {

                setPostComments([...postComments, {
                    comment_id: res.data.author_id,
                    author_id: res.data.author_id,
                    post_id: res.data.post_id,
                    content: res.data.content,
                    username: user.data.username
                }])
                setNewCommentContent('')
            }).catch(err => console.log("Error adding new comment: ", err));
        })
        
    }

    const Comments = postComments.map(comment => 
         (<div  className="comment">
             <div className="user-avatar">
                    <img src="https://assets.atdw-online.com.au/images/9a9e6bc10a768c84cb66b7fda9149e2a.jpeg?rect=0,1071,3672,2754&w=745&h=559&&rot=360" alt="" />
                </div>
            <div className="comment-details">
                <div className="comment-author-date">
                    <p className="comment-author-name">{comment.username}</p>
                    <p className="comment-date">Today at 15:05</p>
                </div>
                
                <p className="comment-content">{comment.content}</p>
            </div>
            
        </div>)
    ) 
    
    const showCommentsButton = <a className="show-hide-comments" onClick={onShowComments}>Show Comments</a>;
    const hideCommentsButton = <a className="show-hide-comments" onClick={onHideComments}>Hide Comments</a>;

    return (


        <div className="post-comments">
            
            {showComments ? hideCommentsButton : showCommentsButton}
            {showComments ? Comments : '' }
            <div className="user-comment">
                <div className="user-avatar">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR06esYfQM8YO9mUMLqyA3hGkivXdCdry8I_Q&usqp=CAU" alt="" />
                </div>
                <div className="user-comment-input">
                    <input type="text" onChange={handleNewCommentChange} value={newCommentContent} placeholder="Say something smart please..." />
                    <button onClick={submitNewComment} className="send-comment" >Send</button>
                </div>

            </div>
        </div>
    )
}
