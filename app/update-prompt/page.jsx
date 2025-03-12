'use client';
import { From } from "@/components/From";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const UpdatePrompt = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const paramsId = searchParams.get("id");
  const [post, setPost] = useState({prompt:"Hello Son!", tag:""});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const getPrompt = async () => {
      const responce = await fetch(`/api/prompt/${paramsId}`);
      const data = await responce.json();
      setPost({
        prompt: data.prompt,
        tag: data.tag
      });
    }
    if(paramsId){
      getPrompt();
    }

  },[paramsId])

  const updatePrompt = async(e) => {
    e.preventDefault
    setSubmitting(true)

    try {
      const responce = await fetch(`/api/prompt/${paramsId}`, {
        method: "PATCH",
        body:JSON.stringify({
          prompt: post.prompt,
          tag: post.tag
        })
      });

      if(responce.ok){
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }finally{
      setSubmitting(false);
    }
  }
  return (
    <From 
      type="Update "
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
      >
    </From>
  )
}

export default UpdatePrompt;