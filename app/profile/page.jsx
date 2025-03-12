'use client';
import { Profile } from "@/components/Profile";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

const ProfilePage = () => {

const {data:session} = useSession();

const [posts, setPosts] = useState([]);

useEffect(() => {
    const fetchPosts = async () => {
      const responce = await fetch(`/api/user/${session?.user.id}/posts`);
      const data = await responce.json()
      setPosts(data);
    }
    if(session?.user.id){
      fetchPosts();
   }
},[session?.user.id]);

const handleEdit = () => {
  
}

const handleDelete = () => {

}
   
  return (
    <Profile
      name={"My"}
      desc={"Welcome To My Personal Profile Page"}
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    >
    </Profile>
  )
}
export default ProfilePage;
