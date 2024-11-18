import React, { useState } from 'react';
import Post from '../components/posts/Post';
import ControlBar from '../components/ControlBar';
import { useRequest } from 'ahooks';
import { addPost } from '../api/exhibitActions';
import { Typography } from '@mui/material';

const PostPage = () => {
    const [image, setImage] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const { loading, error, run: handleSubmitRequest } = useRequest(addPost, {
        manual: true,
        onSuccess: () => {
            console.log('Post added successfully');
            setImage(null);
            setPreviewUrl(null);
        },
        onError: (err) => {
            console.error('Error adding post:', err);
        },
    });

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const file = event.target.files[0];
            setImage(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleFormSubmit = async (values: { description: string, image: File | null }) => {
        if (values.image && values.description) {
            const formData = new FormData();
            formData.append('image', values.image);
            formData.append('description', values.description);
            await handleSubmitRequest(formData);
        } else {
            console.log('Please upload an image and enter a description.');
        }
    };

    return (
        <>
            {loading ? (
                <Typography variant="body1">Loading...</Typography>
            ) : error ? (
                <Typography variant="body1" sx={{ color: 'red' }}>
                    Error!!! {error.message}
                </Typography>
            ) : (
                <Post
                    description=""
                    handleImageChange={handleImageChange}
                    previewUrl={previewUrl}
                    onSubmit={handleFormSubmit}
                />
            )}
        </>
    );
};

export default PostPage;
