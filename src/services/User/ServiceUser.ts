import { createUserWithEmailAndPassword,
    signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider ,signOut, sendEmailVerification,
    sendPasswordResetEmail } from "firebase/auth";
import { auth, database } from "../../utils/Firebase";
import { child, get, push, ref, set } from "firebase/database";
import {TABLE_SESSIONS, TABLE_USERS} from "../../utils/Constants";
import { User } from "../../entities/User";
import {cleanUndefinedField} from "../../utils/Functions";
import {Session} from "../../entities/Session";

export const signUp = (email: string, username: string, password: string) => {
    return new Promise((resolve, reject) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                const userToCreate = new User({
                    email: email,
                    username: username,
                    uid: user.uid
                });

                createUser(userToCreate).then(() => {
                    sendVerification().then(() => {
                        resolve(user);
                    }).catch((error) => {
                        reject(error);
                    })
                }).catch((error) => {
                    reject(error);
                })
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

                getUser(user.uid).then((gettedUser) => {
                    const userToCreate = new User({
                        email: email,
                        username: null,
                        uid: user.uid,
                        emailVerified: user.emailVerified
                    });

                    if (gettedUser === null) {
                        createUser(userToCreate).then(() => {
                            resolve(user);
                        }).catch((error) => {
                            reject(error);
                        })
                    } else {
                        resolve({...gettedUser , ...{emailVerified: user.emailVerified}});
                    }
                })
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
                const userToCreate = new User(user);

                createUser(userToCreate).then(() => {
                    resolve(user);
                }).catch(() => {
                    resolve(user);
                })
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

export const checkLinkedUsername = (user: any) => {
    return new Promise((resolve, reject) => {
        const user = auth.currentUser;

        if(user) {
            const dbRef = ref(database);

            try {
                get(child(dbRef, TABLE_USERS + '/' + user.uid)).then((snapshot) => {
                    if (snapshot.exists()) {
                        const _user = new User(snapshot.val());

                        if (_user.username){
                            resolve(true);
                        } else{
                            resolve(false);
                        }
                    } else {
                        reject('No user found');
                    }
                }).catch((error) => {
                    reject(error);
                });
            } catch (error) {
                reject(error);
            }
        } else {
            resolve('');
        }
    });
}

export const linkUsername = (user: User, username: string) => {
    return new Promise((resolve, reject) => {
        const dbRef = ref(database);

        user.username = username;
        getUser(user.uid).then((gettedUser) => {
            if (gettedUser) {
                set(child(dbRef, TABLE_USERS + "/" + user.uid), user).then(() => {
                    resolve(user);
                }).catch((error) => {
                    reject(error);
                });
            } else {
                reject({
                    message: 'User doesn\'t exist'
                });
            }
        });
    });
}

export const checkUsernameAvaibility = (username: string) => {
    return new Promise((resolve, reject) => {
        const dbRef = ref(database);

        try {
            get(child(dbRef, TABLE_USERS)).then((snapshot) => {
                if (snapshot.exists()) {
                    for (let key in snapshot.val()) {
                        const user = new User(snapshot.val()[key]);

                        if (user && user.username === username) {
                            reject('Username already exists');
                            return;
                        }
                    }
                    resolve(true);
                } else {
                    resolve(true);
                }
            }).catch((error) => {
                reject(error);
            });
        } catch (error) {
            reject(error);
        }
    });
}

export const resetPassword = (email: string) => {
    return new Promise((resolve, reject) => {
        try {
            sendPasswordResetEmail(auth, email).then(() => {
                resolve('OK');
            }).catch((error) => {
                reject(error);
            });
        } catch (error) {
            reject('error');
        }
    });
}

export const createUser = (user: User) => {
    return new Promise((resolve, reject) => {
        const dbRef = ref(database);
        user = cleanUndefinedField(user);

        try {
            getUser(user.uid).then((gettedUser) => {
                if (!gettedUser) {
                    set(child(dbRef, TABLE_USERS + "/" + user.uid), user).then((snapshot) => {
                        resolve(user);
                    }).catch((error) => {
                        reject(error);
                    });
                } else {
                    reject({
                        message: 'Username already existing'
                    });
                }
            });



        } catch (error) {
            reject(error);
        }
    });
}

export const getUser = (userID: string) => {
    return new Promise((resolve, reject) => {
        const dbRef = ref(database);

        try {
            get(child(dbRef, TABLE_USERS + '/' + userID)).then((snapshot) => {
                if (snapshot.exists()) {
                    resolve(new User(snapshot.val()));
                } else {
                    resolve(null);
                }
            }).catch((error) => {
                reject(error);
            });
        } catch (error) {
            reject(error);
        }
    });
}
