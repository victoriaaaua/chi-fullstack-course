"use client"
import React from 'react';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Avatar from '@mui/joy/Avatar';
import { Box } from '@mui/joy';
import { format } from 'date-fns';
import { IconButton, Typography } from "@mui/material";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { User } from "../../interfaces/User";

interface CommentCardProps {
    commentID: number,
    text: string,
    createdAt: string,
    user: User,
    isAuthorComment: boolean,
    deleteComment: (commentId: number) => void
}

const CommentCard: React.FC<CommentCardProps> = ({ commentID, text, createdAt, user, isAuthorComment, deleteComment }) => {
    const handleDeleteComment = () => {
        deleteComment(commentID);
    }
    return (
        <Card
            variant="outlined"
            sx={{ width: '90%', borderRadius: 2 }}
        >
            <CardContent
                orientation="horizontal"
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                }}
            >
                <Avatar
                    size="sm"
                    sx={{
                        border: '2px solid',
                        borderColor: 'background.body',
                        bgcolor: 'orange',
                        fontWeight: 'bold',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: 40,
                        height: 40
                    }}
                >
                    {user.username[0].toUpperCase()}
                </Avatar>

                <Box sx={{ flex: 1 }}>
                    <Typography variant="body1" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                        {user.username}
                    </Typography>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ fontSize: '0.875rem' }}
                    >
                        {format(new Date(createdAt), 'dd.MM.yyyy HH:mm:ss')}
                    </Typography>
                </Box>

                {isAuthorComment && (
                    <IconButton
                        sx={{ position: 'absolute', top: 8, right: 8 }}
                        color="error"
                        onClick={handleDeleteComment}
                    >
                        <DeleteOutlineOutlinedIcon />
                    </IconButton>
                )}
            </CardContent>

            <CardContent sx={{ gap: 0.5, paddingTop: 1, ml: 7 }}>
                <Typography variant="body2" sx={{ color: 'text.primary' }}>
                    {text}
                </Typography>
            </CardContent>
        </Card>

    );
}

export default CommentCard;