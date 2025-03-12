import mongoose from "mongoose";
let isConnected = false;
export const ConnectDB = async () => {
    mongoose.set("strictQuery", true);

    if(isConnected){
        console.log("Already connected to MongoDb Database ");
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URL, {
            dbName: "share_prompt",
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        isConnected = true;

        console.log("Connect To MongoDB Database");

    } catch (error) {
        console.log(error);
    }
}