import { GoogleAuthProvider, createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { firebaseAuth } from "./firebase";
import { fetchQuery, saveUserDetails } from "./firebase-service";
import { getImageInBase64 } from "../axios";

export const handlePasswordReset = async(email: string) => {
    await sendPasswordResetEmail(firebaseAuth, email);
}

export const createUser = async (emailAddress: string, password: string, fullName: string) => {
    const createdUserResult = await createUserWithEmailAndPassword(firebaseAuth, emailAddress, password);

    const data = {
        userId: createdUserResult.user.uid,
        fullName,
        emailAddress: emailAddress.toLowerCase(),
        dataCreated: new Date()
    }

    await saveUserDetails(data)
}

export const signIn = async (emailAddress: string, password: string) => {
    await signInWithEmailAndPassword(firebaseAuth, emailAddress, password);
}
export const doesEmailExists = async (email: string) => {

    const users: any = await fetchQuery('emailAddress', email);
    return users.length >= 1;
}

export const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(firebaseAuth, provider);

    const user = result.user;

    if (user) {

        const existingUser = await fetchQuery("emailAddress", user.email?.toLowerCase() ?? "");

        if (existingUser.length) return;
        else {
            const data = {
                userId: user.uid,
                fullName: user.displayName,
                emailAddress: user.email?.toLowerCase(),
                dataCreated: new Date()
            }

            if (user.photoURL) {
                const image_base64 = await getImageInBase64(user.photoURL);
                Object.assign(data, {
                    image_base64
                })
            }

            await saveUserDetails(data);
        }
    }
}