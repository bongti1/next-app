'use client';
import { From } from "@/components/From";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const CreatePrompt = () => {

  const {data:session} = useSession();
  const router = useRouter();

  const [post, setPost] = useState({prompt:"Hello Son!", tag:""});
  const [submitting, setSubmitting] = useState(false)

  const createPrompt = async(e) => {
    e.preventDefault
    setSubmitting(true)

    try {
      const responce = await fetch("/api/prompt/new", {
        method: "POST",
        body: JSON.stringify({
          userId: session?.user.id,
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
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
      >
    </From>
  )
}

export default CreatePrompt;
