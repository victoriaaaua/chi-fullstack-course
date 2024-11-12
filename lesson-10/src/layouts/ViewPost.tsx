import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ControlBar from "../components/ControlBar";
import { useRequest } from "ahooks";
import { fetchPostById } from "../api/exhibitActions";
import { Box, Typography } from "@mui/material";
import ViewPostForm from "../components/posts/ViewPostForm";
import { Post } from "../interfaces/Post";

const ViewPost = () => {
    const { id } = useParams<{ id: string }>();
    const [post, setPost] = useState<Post | null>(null);
    const { loading, error, run: fetchPost } = useRequest(fetchPostById, {
        manual: true,
        onSuccess: (data) => {
            setPost(data);
        },
        onError: (error) => {
            console.error('Error fetching post:', error);
        },
    });

    useEffect(() => {
        if (id) {
            const numericId = Number(id); 
            if (!isNaN(numericId)) {
                fetchPost(numericId); 
            } else {
                console.error('Invalid post id');
            }
        }
    }, [id, fetchPost]);
    if (loading) {
        return <Typography>Loading...</Typography>;
    }

    
    if (error) {
        return <Typography>Error fetching posts.</Typography>;
    }

    return (
        <>
            {loading && <Typography>Loading...</Typography>}
            {error && <Typography>Error fetching posts.</Typography>}
            <Box sx={{ width: "100%", padding: 2 }}>
                <ControlBar />
                {post ? (
                    <ViewPostForm
                        key={`one-post-${post.id}`}
                        user={post.user}
                        createdAt={post.createdAt}
                        description={post.description}
                        imageUrl={post.imageUrl} />
                ) : (
                    <Typography>No post found</Typography>
                )}
            </Box>

        </>
    );
};

export default ViewPost;
