import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const app = firebase.initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID
})

export const auth = app.auth()
export const db = app.firestore()

// export const createUserDocument = async (user) => {
//     if (!user) return;

//     const userRef = db.doc(`users/${user.uid}`);
//     const snapShot = await userRef.get();

//     if (!snapShot.exists){
//         const {email} = user;

//         try{
//             userRef.set({
//                 email,
//                 created_at: new Date()
//             })
//         }catch(e){
//             console.log(e)
//         }
//     }
// }


export default app