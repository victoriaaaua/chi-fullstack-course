import React from "react"
import PaginationComponent from "../components/PaginationСomponent"
import UserCard from "../components/posts/UserCard"



const StripePosts : React.FC<any> = ({data, page, lastPage}) => (
    <>
         <PaginationComponent navigationPath='/?page=' lastPage={lastPage} page={+page}  />
        {data.map((exhibit:any) => (
            <UserCard key={exhibit.id} {...exhibit}/>
        ))}
        <PaginationComponent navigationPath='/?page=' lastPage={lastPage} page={+page}  />
    </>
)

export default StripePosts;