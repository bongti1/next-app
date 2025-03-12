'use client'

import React from 'react'
import { PromptCard } from './PromptCard'


export const Profile = ({name, desc, data ,handleEdit, handleDelete}) => {

  const handleTagClick = async () => {

  }

  return (
    <section className='w-full'>
      <div className='head_text text-left blue_gradient'>{name} Profile</div>
      <p>{desc}</p>
        <div className='prompt_layout'>
          {data.map((post) => (
              <PromptCard
                key={post._id}
                post={post}
                handleTagClick={handleTagClick}
                handleEdit={handleEdit}
                handleDelete={handleDelete}>
              </PromptCard>  
          ))}
        </div>
    </section>
  )
}
