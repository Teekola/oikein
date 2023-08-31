import { withAuth } from "next-auth/middleware";

export default withAuth(
   // `withAuth` augments your `Request` with the user's token.
   function middleware(req) {
      console.log(req.nextauth.token);
   },
   {
      callbacks: {
         authorized: ({ token }) => {
            return true;
            console.log(token);
            if (token) return true;
            return false;
         },
      },
   }
);

export const config = { matcher: ["/admin", "/"] };
