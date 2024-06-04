import { sequence } from "astro:middleware";
import { app } from "./firebase/server";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

async function auth ({locals, cookies}, next) {
  const auth = getAuth(app);
  const db = getFirestore(app);

  // Initialize context.locals.user to null
  locals.user = null;
  
  if (cookies.has("__session")) {
    const sessionCookie = cookies.get("__session").value;
    const decodedCookie = await auth.verifySessionCookie(sessionCookie);
    if (decodedCookie) {
      const user = await auth.getUser(decodedCookie.uid)
      if (user) {
        const userDoc = await db.collection('users').doc(decodedCookie.uid).get();
        if (userDoc.exists) {
          const userData = userDoc.data();
          locals.user = {
            ...user,
            ...userData,
          };
        }
      } else {
        console.error('No user is Authenticated!');
      }
    }
  }

  // return a Response or the result of calling `next()`
  return next();
};


export const onRequest = sequence(auth);