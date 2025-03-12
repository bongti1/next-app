import Prompt from "@/models/prompt.model";
import { ConnectDB } from "@/utils/mongoDB";

export const GET = async(request, {params}) => {
    try {
        ConnectDB();
        const {id} = await params;
        const findPrompt = await Prompt.findById(id).populate('creator');
        if(!findPrompt){
            return new Response("Prompt Not Found.", {status:404});
        }
        return new Response(JSON.stringify(findPrompt), {status:200});
    } catch (error) {
        console.log(error);
        return new Response(error);
    }
}

export const PATCH = async(request, {params}) => {
    const {prompt, tag} = await request.json();
    try {
        ConnectDB();
        const {id} = await params;
        const updatePrompt = await Prompt.findById(id).populate('creator');
        if(!updatePrompt){
            return new Response("No Prompt Found.", {status:200});
        };

        updatePrompt.prompt=prompt;
        updatePrompt.tag=tag;

        await updatePrompt.save();

        return new Response("Updating is successfully.", {status:201});
    } catch (error) {

        return new Response(error);
    }
}

export const DELETE = async(request, {params}) => {
    try {
        ConnectDB();
        const {id} = await params;
        const deletePrompt = await Prompt.findByIdAndDelete(id).populate('creator');
        if(!deletePrompt){
            return new Response('Deleting Fails.', {status:200});
        }
        return new Response("Deleting successfully.", {status:201});
    } catch (error) {
        console.log(error);
        return new Response(error);
    }
}