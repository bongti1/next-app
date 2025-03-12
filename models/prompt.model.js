import { model, models, Schema } from "mongoose";

const promptSchema = new Schema({
    creator:{
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    prompt:{
        type: String,
        required: [true, "Prompt is requires"]
    },
    tag:{
        type: String,
        required:[true, "Tag is required"]
    }
}, {timestamps: true});

const Prompt = models.Prompt || model("Prompt", promptSchema);
export default Prompt;