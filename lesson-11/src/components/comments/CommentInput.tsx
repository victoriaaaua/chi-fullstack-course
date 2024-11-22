'use client'
import { Face } from '@mui/icons-material';
import { CardContent, IconButton, Input, Link } from '@mui/material';
import React, { ChangeEvent, FC, useState } from 'react';

interface CommentInputProps {
    addComment: (commentText: string) => void;
}

const CommentInput: FC<CommentInputProps> = ({ addComment }) => {

    const [commentText, setCommentText] = useState<string>('');

    const handleTextChange = (event: ChangeEvent<HTMLInputElement>) => {
        setCommentText(event.target.value);
    }

    const handleAddComment = () => {
        addComment(commentText);
        setCommentText('');
    }

    return (
        <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton size="small" sx={{ ml: -1 }}>
                <Face />
            </IconButton>
            <Input
                size="small"
                placeholder="Add a comment…"
                sx={{ flexGrow: 1, px: 0, '--Input-focusedThickness': '0px' }}
                value={commentText}
                onChange={handleTextChange}
                fullWidth
            />
            <Link underline="none" role="button" sx={{ cursor: 'pointer' }} onClick={handleAddComment}>
                Post
            </Link>
        </CardContent>
    );
}

export default CommentInput;
