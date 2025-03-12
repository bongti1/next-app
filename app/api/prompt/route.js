import Prompt from "@/models/prompt.model";
import { ConnectDB } from "@/utils/mongoDB"

export const GET = async(request) => {
    try {
        await ConnectDB();
        const prompts = await Prompt.find({}).populate('creator');
        return new Response(JSON.stringify(prompts), {status: 200});
    } catch (error) {
        return new Response({message: error}, {status: 500});
    }
}