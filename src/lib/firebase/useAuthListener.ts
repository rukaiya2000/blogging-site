import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "./firebase";

const useAuthListener = () => {

    let authUserString: string | null = null;
    if (typeof window !== 'undefined'){
        authUserString = localStorage.getItem('authUser')
    }
    
    const [user, setUser] = useState(authUserString !== null ? JSON.parse(authUserString) : null);

    useEffect(() => {
        const listener = onAuthStateChanged(firebaseAuth, (authUser) => {
            if (authUser) {
                localStorage.setItem('authUser', JSON.stringify(authUser));
                setUser(authUser);
            } else {
                localStorage.removeItem('authUser');
                setUser(null);
            }
        });

        return () => listener();
    }, [])
    return { user }
};

export default useAuthListener;