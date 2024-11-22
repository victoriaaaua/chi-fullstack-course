import React from "react"
import PaginationComponent from "./PaginationComponent";
import UserCard from "../components/posts/UserCard"



const StripePosts : React.FC<any> = ({data, page, lastPage}) => (
    <>
         <PaginationComponent navigationPath='/exhibits/?page=' lastPage={lastPage} page={+page}  />
        {data.map((exhibit:any) => (
            <UserCard key={exhibit.id} {...exhibit}/>
        ))}
        <PaginationComponent navigationPath='/exhibits/?page=' lastPage={lastPage} page={+page}  />
    </>
)

export default StripePosts;