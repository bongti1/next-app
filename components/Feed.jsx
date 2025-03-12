'use client';
import React, { useEffect, useState } from 'react'
import { PromptCard } from './PromptCard';
const PromptCardList =({data, handleTagClick}) => {
    return(
        <div className='prompt_layout'>
           {data.map((post) => (
                <PromptCard
                    key={post._id}
                    post={post}
                    handleTagClick={handleTagClick} >
                </PromptCard>  
            ))}
        </div>
    )
}
export const Feed = () => {

   const [posts, setPosts] = useState([]);
   const [searchText, setSearchText] = useState('');



   const handleSearchChange = (e) =>{
        clearTimeout();
        setSearch(e.target.value);
   }

   const handleTagClick = () =>{

   }

   const fetchPosts = async() => {
        const response = await fetch('/api/prompt');
        const data = await response.json();
        setPosts(data);
    }


   useEffect(() => {
        fetchPosts();
   },[])
  return (
     <section className='feed'>
        <form className='relative flex w-full justify-center'>
            <input 
                type="text"
                placeholder='Search for a tag or user name'
                required
                value={searchText}
                onChange={handleSearchChange}
                className='search_input peer' />
        </form>

        <PromptCardList
            data={posts}
            handleTagClick={handleTagClick}>
        </PromptCardList>
     </section>
  )
}
