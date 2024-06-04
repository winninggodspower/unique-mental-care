import {
    getAuth,
    inMemoryPersistence,
    signInWithEmailAndPassword,
} from "firebase/auth";
import { app } from "../firebase/client";

const auth = getAuth(app);
// This will prevent the browser from storing session data
auth.setPersistence(inMemoryPersistence);
import { useState, useRef } from 'react';

function LoginForm({submitBtnText}) {
    let [error, setError] = useState(null);
    let [loading, setLoading] = useState(false);
    let formRef = useRef();

    let handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true);
        setError(false)

        const formData = new FormData(formRef.current);
        const email = formData.get("email")?.toString();
        const password = formData.get("password")?.toString();
    
        if (!email || !password) {
            setError("Email and password are required");
            setLoading(false);
            return;
        }
        
        try {
            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );
    
        
            if(!userCredential && !userCredential.user){
                // set error
                setError('invalid email or password')
            }
        
            const idToken = await userCredential.user.getIdToken();
            const response = await fetch("/api/auth/signin", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${idToken}`,
                },
            });
        
            if (response.redirected) {
                return window.location.assign(response.url);
            }
    
            if(!response.ok){
                let errorMessage =  await response.json();
                setError(errorMessage);
            }
        } catch (error) {
            setError(error.message || "Failed to sign in");
        }

        setLoading(false);
    };

    return (
        <form className="mt-4" action="" onSubmit={handleSubmit} ref={formRef}>
            {error && 
                <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                {error}
                </div>
            }
            <input className="w-full rounded-md h-11 bg-grey-2 mt-5" name="email" type="email" placeholder="Email address " required/>
            <input className="w-full rounded-md h-11 bg-grey-2 mt-5" name="password" type="password" placeholder="Password" required/>
            <button disabled={loading} className="w-full md:w-[min(24.7rem, 100%)] mt-9 rounded-md bg-primary-dark text-white py-2" type="submit">{submitBtnText}</button>
        </form>
    )
}

export default LoginForm;