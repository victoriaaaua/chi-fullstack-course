import React, { useState } from "react";
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Link from '@mui/joy/Link';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import axiosInstance from '../../api/axiosInstance';
import ModeCommentOutlined from '@mui/icons-material/ModeCommentOutlined';
import { Badge, CardMedia } from "@mui/material";
import { format } from 'date-fns';
import CommentsList from "../comments/CommentsList";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useNavigate } from "react-router-dom";

const UserCard = ({ isAuthor, exhibitId, imageUrl, description, user, createdAt, commentCount, deletePost }) => {
    const [showComments, setShowComments] = useState(false);
    const navigate = useNavigate();

    const handleCommentClick = () => setShowComments(!showComments);

    const handleDeletePost = () => deletePost(exhibitId);

    const openPost = () => {
        navigate(`/view/${exhibitId}`);
    }

    return (
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
            <Box onClick={openPost} sx={{ cursor: 'pointer' }}>
                <CardMedia
                    component="img"
                    image={axiosInstance.defaults.baseURL + imageUrl}
                    alt={description}
                />
            </Box>
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
                    <Link
                        component="button"
                        color="neutral"
                        textColor="text.primary"
                        sx={{ fontWeight: 'lg' }}
                    >
                        {user.username}
                    </Link>{' '}
                    {description}
                </Typography>

                <Link
                    component="button"
                    underline="none"
                    sx={{ fontSize: '10px', color: 'text.tertiary', my: 0.5 }}
                >
                    {format(new Date(createdAt), 'dd.MM.yyyy HH:mm:ss')}

                </Link>

            </CardContent>
            {showComments && (<CommentsList exhibitId={exhibitId} />)}

        </Card>
    )
}

export default UserCard;