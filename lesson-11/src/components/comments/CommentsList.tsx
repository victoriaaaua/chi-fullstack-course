'use client'
import React, { useState, useEffect } from "react";
import { useRequest } from "ahooks";
import { Typography } from "@mui/material";
import CommentCard from "./CommentCard";
import { useSelector } from 'react-redux';
import { RootState } from "../../store/store";
import { deleteMyComment, addMyComment, fetchAllComments } from "../../api/commentActions";
import CommentInput from "./CommentInput";
import { Comment } from "../../interfaces/Comment";

interface CommentsListProps {
    exhibitId: number;
}

const CommentsList: React.FC<CommentsListProps> = ({ exhibitId }) => {
    const [comments, setComments] = useState<Comment[]>([]);

    const currentUserId = useSelector((state: RootState) => state.user.userId);


    const { loading, error, run: fetchComments } = useRequest(() => fetchAllComments(exhibitId), {
        manual: true,
        onSuccess: (data) => {
            setComments(data.data);
        },
        onError: (error) => {
            console.error('Error fetching comments:', error);
        }
    });

    const { run: deleteComment } = useRequest((commentId: number) => deleteMyComment(exhibitId, commentId), {
        manual: true,
        onSuccess: () => {
            fetchComments();
        },
        onError: (error) => {
            console.error('Error deleting comment:', error);
        }
    })

    const { run: addComment } = useRequest((exhibitId: number, text: string) => addMyComment(exhibitId, text), {
        manual: true,
        onSuccess: () => {
            fetchComments();
        },
        onError: (error) => {
            console.error('Error deleting comment:', error);
        }

    })

    useEffect(() => {
        fetchComments()
    }, [exhibitId]);


    const handleDeleteComment = (commentId: number) => deleteComment(commentId);

    const handleAddComment = (text: string) => addComment(exhibitId, text);

    return (
        <>
            {loading && comments.length === 0 ? (
                <Typography variant='body1'>Loading...</Typography>
            ) : error ? (
                <Typography variant='body1' sx={{ color: 'red' }}>Error!!!</Typography>
            ) : (
                <>
                    {
                        comments.map((comment) => (
                            <CommentCard
                                key={`comment-${comment.id}`}
                                commentID={comment.id}
                                text={comment.text}
                                createdAt={comment.createdAt}
                                user={comment.user}
                                isAuthorComment={currentUserId === comment.user.id}
                                deleteComment={handleDeleteComment}
                            />
                        ))

                    }
                    <CommentInput addComment={handleAddComment} />
                </>
            )}
        </>
    )
}

export default CommentsList;