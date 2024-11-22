"use client"

import React, { useState } from "react";
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Link from 'next/link'; 
import MuiLink from '@mui/joy/Link'; 
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import axiosInstance from '../../api/axiosInstance';
import ModeCommentOutlined from '@mui/icons-material/ModeCommentOutlined';
import { Badge, CardMedia } from "@mui/material";
import { format } from 'date-fns';
import CommentsList from "../comments/CommentsList";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

const UserCard: React.FC<any> = ({ isAuthor, id, imageUrl, description, user, createdAt, commentCount, deletePost }) => {
    const [showComments, setShowComments] = useState(false);
    

    const handleCommentClick = () => setShowComments(!showComments);
    const handleDeletePost = () => deletePost(id);
   

    return (
        <Box
            sx={{
              border: '1px solid #ddd',
              borderRadius: 2,
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              width: 600,
              justifyContent: 'center',
              alignItems: 'center',
              margin: '0 auto',
              mb: 6,
              mt: 6,
            }}>
        <Card
            variant="outlined"
            sx={{ minWidth: 300, '--Card-radius': (theme) => theme.vars.radius.xs }}
        >

            <CardContent orientation="horizontal" sx={{ alignItems: 'center', gap: 1 }}>
                <Box
                    sx={{
                        position: 'relative',
                        '&::before': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            bottom: 0,
                            right: 0,
                            m: '-2px',
                            borderRadius: '50%',
                            background:
                                'linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)',
                        },
                    }}
                >
                    <Avatar
                        size="sm"
                        sx={{ p: 0.5, border: '2px solid', borderColor: 'background.body', bgcolor: 'orange' }}>
                        {user.username[0].toUpperCase()} 
                    </Avatar>
                </Box>
                <Typography sx={{ fontWeight: 'lg' }}>
                    {user.username}
                </Typography>

            </CardContent>

            <Link href={`/exhibits/${id}`} >
                <Box sx={{ cursor: 'pointer' }}>
                    <CardMedia
                        component="img"
                        image={axiosInstance.defaults.baseURL + imageUrl}
                        alt={description}
                    />
                </Box>
            </Link>

            <CardContent orientation="horizontal" sx={{ alignItems: 'center', mx: -1 }}>
                <IconButton variant="plain" color="neutral" size="sm" sx={{ ml: 1 }} onClick={handleCommentClick}>
                    <Badge badgeContent={commentCount || '0'} color="secondary" >
                        <ModeCommentOutlined />
                    </Badge>
                </IconButton>

                {isAuthor && (
                    <IconButton variant="plain" color="neutral" onClick={handleDeletePost}>
                        <DeleteOutlineOutlinedIcon />
                    </IconButton>
                )}
            </CardContent>

            <CardContent>
                <Typography sx={{ fontSize: 'sm' }}>
                    <MuiLink
                        component="button"
                        color="neutral"
                        textColor="text.primary"
                        sx={{ fontWeight: 'lg' }}
                    >
                        {user.username}
                    </MuiLink>{' '}
                    {description}
                </Typography>

                <MuiLink
                    component="button"
                    underline="none"
                    sx={{ fontSize: '10px', color: 'text.tertiary', my: 0.5 }}
                >
                    {format(new Date(createdAt), 'dd.MM.yyyy HH:mm:ss')}
                </MuiLink>
            </CardContent>

            {showComments && (<CommentsList exhibitId={id} />)}

        </Card>
        </Box>
    );
}

export default UserCard;
