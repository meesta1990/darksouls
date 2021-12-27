import { createUserWithEmailAndPassword,
    signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider ,signOut, sendEmailVerification } from "firebase/auth";
import { auth } from "../../utils/Firebase";

export const signUp = (email: string, password: string) => {
    return new Promise((resolve, reject) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                resolve(user);
            })
            .catch((error) => {
                reject(error);
            });
    });
}


export const signIn = (email: string, password: string) => {
    return new Promise((resolve, reject) => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                resolve(user);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

export const signInWithGoogle = () => {
    return new Promise((resolve, reject) => {
        const provider = new GoogleAuthProvider();

        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                resolve(user);
            }).catch((error) => {
                reject(error);
            });
    });
}

export const sendVerification = () => {
    return new Promise((resolve, reject) => {
        const user = auth.currentUser;

        if(user) {
            sendEmailVerification(user)
                .then(() => {
                    resolve('');
                }).catch(reject)
        } else {
            resolve('');
        }
    });
};

export const logout = () => {
    signOut(auth).then(() => {
        // Sign-out successful.
    }).catch((error) => {
        // An error happened.
    });
}

