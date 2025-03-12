
import Prompt from "@/models/prompt.model";
import { ConnectDB } from "@/utils/mongoDB";
export const GET = async(request, {params}) => {
    try {
        await ConnectDB();
        const {id} = await params;
        const prompt = await Prompt.find({creator:id}).populate('creator');
        
        return new Response(JSON.stringify(prompt), {status:200});
    } catch (error) {
        return new Response(error, {status:500});
    }
}