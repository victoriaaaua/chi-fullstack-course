"use client"

import React from "react";
import { fetchPosts, fetchMyPosts, deleteMyPost } from "@/api/exhibitActions";
import { Typography, Box } from "@mui/material";
import UserCard from "@/components/posts/UserCard";
import PaginationComponent from "@/components/PaginationComponent";
import { useControlBar } from "@/contexts/ControlBarContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useSearchParams } from "next/navigation";
import { useRequest } from "ahooks";
import { useRefresh } from "@/contexts/RefreshPageContext";

const HomePage: React.FC = () => {
    const searchParams = useSearchParams();
    const page = parseInt(searchParams.get("page") || "1");
    const limit = 10;
    const { isSortedByDateDescending, isShowMyPosts } = useControlBar();
    const userState = useSelector((state: RootState) => state.user.state);
    const currentUserId = useSelector((state: RootState) => state.user.userId);
    const { change } = useRefresh();

    const { data, loading, error, run: fetchAllPosts } = useRequest(
        () =>
            isShowMyPosts
                ? fetchMyPosts(page, limit)
                : fetchPosts(page, limit),
        {
            refreshDeps: [page, isShowMyPosts, isSortedByDateDescending, change],

            onSuccess: (data) => {
                data.data.sort((a: any, b: any) => {
                    const dateA = new Date(a.createdAt).getTime();
                    const dateB = new Date(b.createdAt).getTime();
                    return isSortedByDateDescending ? dateB - dateA : dateA - dateB;
                });
            }

        }
    );


    const { run: deletePostRequest } = useRequest(deleteMyPost, {
        manual: true,
        onSuccess: () => {
            fetchAllPosts();
        },
        onError: (err) => {
            console.error('Error deleting post:', err);
        },
    });

    const handleDelete = (postId: number) => {
        deletePostRequest(postId);
    };

    return (
        <ProtectedRoute isAllowed={userState}>
            <Box sx={{ flexGrow: 1, m: 0, p: 0 }}>

                {loading && !data?.data.length ? (
                    <Typography>Loading...</Typography>
                ) : error ? (
                    <Typography>Error: {error.message}</Typography>
                ) : (
                    <>
                        <PaginationComponent navigationPath="/home?page=" lastPage={data.lastPage} page={+page} />
                        {data?.data.map((post: any) => (
                            <UserCard key={post.id} isAuthor={currentUserId === post.user.id} deletePost={handleDelete} {...post} />
                        ))}
                        <PaginationComponent navigationPath="/home?page=" lastPage={data.lastPage} page={+page} />
                    </>
                )}
            </Box>

        </ProtectedRoute>
    );
};

export default HomePage;
