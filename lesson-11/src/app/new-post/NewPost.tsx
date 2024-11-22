'use client'

import React, { ChangeEvent } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    whiteSpace: 'nowrap',
    width: 1,
});

interface PostProps {
    description: string;
    handleImageChange: (e: ChangeEvent<HTMLInputElement>) => void;
    previewUrl: string | null;
    onSubmit: (values: { description: string, image: File | null }) => void;
}

const validationSchema = Yup.object({
    description: Yup.string()
        .max(2000, 'Description cannot exceed 2000 characters')
        .required('Required'),
});

const Post: React.FC<PostProps> = ({ description, handleImageChange, previewUrl, onSubmit }) => {
    return (
        <Box sx={{ maxWidth: 600, margin: '0 auto', p: 4 }}>
            <Formik
                initialValues={{ description: description, image: null }}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {({ values, setFieldValue, handleSubmit, errors, touched }) => (
                    <Form onSubmit={handleSubmit}>
                        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                            <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                                Upload Photo
                                <VisuallyHiddenInput
                                    type="file"
                                    onChange={(e) => {
                                        if (e.target.files) {
                                            setFieldValue('image', e.target.files[0]);
                                            handleImageChange(e);
                                        }
                                    }}
                                />
                            </Button>
                        </Box>
                        {previewUrl && (
                            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                                <img src={previewUrl} alt="Preview" style={{ maxWidth: '100%', borderRadius: 8 }} />
                            </Box>
                        )}
                        <Field
                            name="description"
                            as={TextField}
                            placeholder="Write description"
                            fullWidth
                            multiline
                            rows={4}
                            sx={{ mb: 3 }}
                            error={touched.description && Boolean(errors.description)}
                            helperText={touched.description && errors.description}
                        />
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Button type="submit" variant="contained" color="primary">
                                Add Post
                            </Button>
                        </Box>
                    </Form>
                )}
            </Formik>
        </Box>
    );
};

export default Post;
