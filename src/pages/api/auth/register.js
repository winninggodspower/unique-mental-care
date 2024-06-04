import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { app } from "../../../firebase/server";

const db = getFirestore(app);

export const POST = async ({ request, redirect }) => {
  const auth = getAuth(app);

  /* Get form data */
  const formData = await request.formData();
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const name = formData.get("name")?.toString();
  const userType = formData.get('userType').toString();

  if (!email || !password || !name) {
    return new Response(
      "Missing form data",
      { status: 400 }
    );
  }

  /* Create user */
  try {
    const userRecord = await auth.createUser({
      email,
      password,
      displayName: name,
    }); 

     /* Store additional user data in Firestore */
     await db.collection('users').doc(userRecord.uid).set({
      name,
      email,
      userType,
    });
  } catch (error) {
    const errorMessage = error.message || 'Something went wrong';
    return new Response(
      errorMessage,
      { status: 400 }
    );
  }
  return redirect("/login");
};
