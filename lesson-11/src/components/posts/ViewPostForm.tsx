'use client'
import React from "react";
import { Avatar, Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { format } from "date-fns";
import axiosInstance from "../../api/axiosInstance";

const ViewPostForm:  React.FC<any> = ({ user, createdAt, description, imageUrl }) => {
  return (
    <Card
      variant="outlined"
      sx={{
        minWidth: 300,
        maxWidth: 600,
        margin: "auto",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        overflow: "hidden",
        mb: 2,
      }}
    >
      <Box
        sx={{ display: "flex", alignItems: "center", gap: 2, padding: 2 }}
      >
        <Avatar
          sx={{
            bgcolor: "primary.main",
            width: 48,
            height: 48,
            fontSize: "1.2rem",
          }}
        >
          {user.username[0].toUpperCase()}
        </Avatar>
        <Box>
          <Typography variant="subtitle1" fontWeight="bold">
            {user.username}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {format(new Date(createdAt), "dd.MM.yyyy HH:mm:ss")}
          </Typography>
        </Box>
      </Box>

      <CardMedia
        component="img"
        image={axiosInstance.defaults.baseURL + imageUrl}
        alt={description}
        sx={{
          height: '400px',
          width: '100%',
          objectFit: "cover"
        }}
      />

      <CardContent sx={{ padding: 2 }}>

        <Typography variant="body1">
          {description}
        </Typography>


      </CardContent>
    </Card>
  )
}

export default ViewPostForm;