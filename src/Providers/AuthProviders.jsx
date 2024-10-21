import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  sendEmailVerification,
  sendPasswordResetEmail,
} from "firebase/auth";
import { useEffect, useState, createContext } from "react";
import axios from "axios"; // For making HTTP requests
import app from "../Firebase/firebase.config";

export const AuthContext = createContext(null);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProviders = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null); // Add userData state to store backend data

  const createUser = async (name, email, password) => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(userCredential.user, {
        displayName: name,
      });
      await sendEmailVerification(userCredential.user);
      return userCredential;
    } finally {
      setLoading(false);
    }
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password).finally(() =>
      setLoading(false)
    );
  };

  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider).finally(() =>
      setLoading(false)
    );
  };

  const sendPasswordReset = (email) => {
    const auth = getAuth();
    return sendPasswordResetEmail(auth, email);
  };

  const fetchUserData = async (uid, token) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/user/${uid}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUserData(response.data); // Store the fetched user data
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setLoading(true);
      if (currentUser) {
        // User is signed in, get the token and fetch additional user data
        const token = await currentUser.getIdToken();
        await fetchUserData(currentUser.uid, token); // Fetch user data from backend
      } else {
        setUserData(null);
      }
      setUser(currentUser);
      setLoading(false);
    });

    return () => unSubscribe();
  }, []);

  const logOut = () => {
    setLoading(true);
    return signOut(auth).finally(() => setLoading(false));
  };

  const authInfo = {
    user,
    userData, // Include fetched user data in context
    loading,
    createUser,
    signIn,
    signInWithGoogle,
    sendPasswordReset,
    logOut,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProviders;
