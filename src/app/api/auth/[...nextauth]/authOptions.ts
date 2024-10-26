import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import userLogin from "@/libs/userLogIn";
export const authOptions: AuthOptions = {
    // secret: process.env.NEXTAUTH_SECRET,
    providers: [
        // Authentication Provider, use Credentials Provider
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "Credentials",
            // `credentials` is used to generate a form on the sign in page.
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
              email: { label: "Email", type: "email", placeholder: "email" },
              password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
              // Add logic here to look up the user from the credentials supplied
              if(!credentials) return null
              const user = await userLogin(credentials.email, credentials.password)
        
              if (user) {
                // Any object returned will be saved in `user` property of the JWT
                return user
              } else {
                // If you return null then an error will be displayed advising the user to check their details.
                return null
        
                // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
              }
            }
          })
    ],
    session: { strategy: "jwt" },
    callbacks: { 
        async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
            return baseUrl
        },
        async jwt({ token, user }) {
            //ต่อเนื้อหาใน user object เข้ากับ token
            if (user) {
              token = { ...token, ...user }
            }
            return token
        },
        async session({ session, token, user }) {
            //เพิ่มข้อมูลจาก token ใน session.user
            session.user = token as any
            return session
        }
    }
    
}
