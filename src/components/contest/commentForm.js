import React, { useEffect, useState, useContext } from 'react';
import axios from "axios";
import { DataContext } from "../../context/DatabaseContext";
import PaymentForm from '../account/payment-form';
import "../../css/contest/commentForm.css"

const CommentForm = ({ contestId }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [showPaymentForm, setShowPaymentForm] = useState(false);
    const { tokenInfor } = useContext(DataContext);
    const [roleUser, setRoleUser] = useState(tokenInfor);
    const [userLogged, setUserLogged] = useState([]);
    const statusUser = JSON.parse(tokenInfor.status.toLowerCase());

    useEffect(() => {
        console.log(tokenInfor)
        fetchComments();
        fetchUser();
    }, []);

    const fetchUser = async () => {
        try {
            const response = await axios.get(`http://localhost:5231/api/Account/${tokenInfor.email}`)
            if (response) {
                setUserLogged(response.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const fetchComments = async () => {
        try {
            const response = await axios.get(`http://localhost:5231/api/Contest/getComments`, {
                params: { contestId: contestId }
            });
            if (response.data && Array.isArray(response.data.$values)) {
                setComments(response.data.$values);
            } else {
                console.error("Unexpected response format");
                setComments([]);
            }
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };

    const handleSubmit = async () => {
        if (!newComment.trim()) return;

        try {
            await axios.post('/api/comments', {
                content: newComment,
                contestId,
                userId: userLogged.$id,
                parentCommentId: null,
            });
            setNewComment('');
            fetchComments();
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    const handleLike = async (commentId) => {
        try {
            await axios.post(`/api/comments/like/${commentId}`);
            fetchComments();
        } catch (error) {
            console.error('Error liking comment:', error);
        }
    };

    const renderComments = (commentList) => {
        return commentList.map(comment => (
            <div key={comment.idComment} className="cmtForm-box">
                <p className="cmtForm-content">{comment.content} - <strong>{comment.account.name}</strong></p>
                <button className="cmtForm-submit-button" onClick={() => handleLike(comment.idComment)}>Like ({comment.likes})</button>
            </div>
        ));
    };

    const handleCommentClick = () => {
        if (!roleUser) {
            alert('Please log in to comment.');
            return;
        }

        if (!statusUser) {
            setShowPaymentForm(true);
        } else {
            setShowPaymentForm(false);
        }
    };

    const handleClosePaymentForm = () => {
        setShowPaymentForm(false);
    };

    return (
        <div className="cmtForm-container">
            <h3 className="cmtForm-header">Comments</h3>
            <div className="cmtForm-list">{renderComments(comments)}</div>

            <textarea
                className="cmtForm-input"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                onClick={handleCommentClick}
                readOnly={!statusUser}
            />

            {newComment && <button className="cmtForm-submit-button" onClick={handleSubmit}>Submit</button>}

            {showPaymentForm && !statusUser && (
                <div className="cmtForm-overlay">
                    <div className="cmtForm-payment-box">
                        <button className="cmtForm-close-button" onClick={handleClosePaymentForm}>✖</button>
                        <h4 className="cmtForm-message">Your account is not active. Please subcribe to comment.</h4>
                        <PaymentForm user={userLogged} />
                    </div>
                </div>
            )}
        </div>
    );
};


export default CommentForm;