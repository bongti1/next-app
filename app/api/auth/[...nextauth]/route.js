import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import {ConnectDB} from "@/utils/mongoDB";
import User from "@/models/user.model";

const NextAuthOptions = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),

        // GithubProvider({
        //     clientId: process.env.GITHUB_ID,
        //     clientSecret: process.env.GITHUB_CLIENT_SECRET
        // })

    ],
    callbacks:{
        async session({session}){
            const getSession = await User.findOne({email:session?.user.email});
            session.user.id = getSession._id.toString();
            return session;
        },
    
        async signIn({profile}){
            try {
                await ConnectDB();
                const existUser = await User.findOne({email:profile?.email});
    
                if(!existUser){
                    await User.create({
                        email: profile.email,
                        username: profile.name,
                        image: profile.picture
                    });
                }
                return true;
            } catch (error) {
                console.log(error);
                return false;
            }
        }
    }
})

export {NextAuthOptions as GET, NextAuthOptions as POST} 