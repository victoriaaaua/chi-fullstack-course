import React from "react";
import ViewPostForm from "@/components/posts/ViewPostForm";
import { fetchPostById } from "@/api/exhibitActions";
import { Box, Typography } from "@mui/material";

const UserInfo: React.FC<{ params: { id: string } }> = async ({ params }) => {
    const userId = parseInt(params.id);

    try {
        const data = await fetchPostById(userId);
        console.log(data);

        return (
            <Box sx={{ width: "100%", padding: 2 }}>
                <ViewPostForm
                    key={`one-post-${data.id}`}
                    user={data.user}
                    createdAt={data.createdAt}
                    description={data.description}
                    imageUrl={data.imageUrl}
                />
            </Box>
        );
    } catch (error: any) {
        return <Typography>Error: {error.message}</Typography>;
    }
};

export default UserInfo;
