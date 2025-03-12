import Image from "next/image"
import tick from "@/public/assets/icons/tick.svg";
import copy from "@/public/assets/icons/copy.svg";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";


export const PromptCard = ({post}) => {
    const [isCopy, setIsCopy] = useState('');
    const {data:session} = useSession();
    const  pathName = usePathname();
    const router = useRouter();

    const handleCopy = (prompt) => {
        setIsCopy(prompt);
        navigator.clipboard.writeText(prompt);
        setTimeout(() => {
            setIsCopy("");
        }, 3000);
    }

    const handleDelete = async(id) => {
        const hasConfirm = confirm("Are you sure to delete prompt?");
        try {
            if(hasConfirm){
                const isDelete = await fetch(`/api/prompt/${id}`,{
                    method: 'DELETE'
                })
                if(!isDelete){
                    alert(`Fail to delete prompt which has id : ${id} `);
                }
                alert(`Delete prompt which has id : ${id} successfully. Hit refresh to see your new prompt!`);
                // const newPrompt = post.filter((post) => post._id !== id);
                // setPosts(newPrompt);
                // console.log(newPrompt);
            }
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <div className='prompt_card'>
        <div className="flex justify-between">
            <div className="flex items-center gap-7">
                <Image
                    src={post.creator?.image}
                    alt="user-image"
                    width={42}
                    height={42}
                    className="rounded-full">
                </Image>
                <div>
                    <h3 className="font-bold font-satoshi">{post.creator?.username}</h3>
                    <p className="font-normal font-satoshi text-gray-500">{post.creator?.email}</p>
                </div>
            </div>
            <div className="copy_btn cursor-pointer"
                onClick={() => handleCopy(post.prompt)}>
                <Image src={isCopy === post.prompt? tick:copy}
                    alt={isCopy === post.prompt? "tick":"copy"}
                    width={12}
                    height={12}
                    >
                </Image>
            </div>
        </div>
        <div>
            <p className="my-4  text-gray-700">{post.prompt}</p>
            <p><span className="text-blue-600 font-semibold">{post.tag}</span></p>
        </div>
        {
            session?.user.id === post.creator._id &&
            pathName === '/profile' &&(
                <div className="my-2 flex justify-around border-t">
                    <p 
                        onClick={() => router.push(`/update-prompt?id=${post._id}`)}
                        key={post._id}
                        className="font-bold text-yellow-500 cursor-pointer pt-3 ">
                        <span><FaRegEdit size={25}/></span>
                       </p>
                    <p 
                        onClick={() => {handleDelete(post._id)}}
                        className="font-bold text-red-500  cursor-pointer pt-3">
                        <span><MdDelete size={25} /></span></p>
                </div>
            )
        }
    </div>
  )
}
