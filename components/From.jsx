import React from 'react'
import Link from 'next/link';

export const From = ({type, post, setPost, submitting, handleSubmit}) => {
  return (
    <section className='w-full max-w-full flex-start flex-col'>
        <h1 className='head_text text-left'>
            <span className='blue_gradient'>{type} Post</span>
        </h1>
        <p className='desc text-left max-w-full'>
            {type} and share amazing prompts with the world,
            and let your imagination run wild with any AI-powered platform.
        </p>

        <form 
            onSubmit={handleSubmit}
            className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism'>
            <label>
                <span className='font-satoshi font-semibold text-base'>
                    Your AI Prompt
                </span>

                <textarea 
                    value={post.prompt}
                    onChange={(e) => setPost({...post, prompt: e.target.value})}
                    required
                    placeholder='Write your prompt here...'
                    className='form_textarea'
                    >
                </textarea>
            </label>

            <label>
                <span className='font-satoshi font-semibold text-base text-left'>
                    Tag 
                    <span className='font-normal'> (#Product, #Webdevelopment, #Idea)</span>
                </span>

                <input
                    value={post.tag}
                    onChange={(e) => setPost({...post, tag: e.target.value})}
                    type="text" 
                    className='form_input'
                    placeholder='#Tage' />
            </label> 

            <div className='flex-end gap-4'>
                <Link 
                    href={"/"}
                    className='text-sm text-gray-500'>
                    Cancal
                </Link>

                <button
                    type='submit'
                    onClick={handleSubmit}
                    disabled={submitting}
                    className='bg-orange-400 px-3 py-1 rounded-md text-white hover:bg-orange-700'>
                    {submitting?`${type}ing...`:type}
                </button>

            </div>   
        </form>
    </section>
  )
}