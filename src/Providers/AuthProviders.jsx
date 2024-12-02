import Cookies from "js-cookie";
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
import axios from "axios";
import { app } from "../Firebase/firebase.config";

export const AuthContext = createContext(null);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProviders = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [productData, setProductData] = useState(null);

  // Store JWT token in cookie
  const storeJwtToken = (token) => {
    Cookies.set("jwt_token", token, { expires: 1 }); // Expires in 1 day
  };

  // Remove JWT token from cookie
  const removeJwtToken = () => {
    Cookies.remove("jwt_token");
  };

  // Create user account and generate JWT
  const createUser = async (name, email, password) => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(userCredential.user, { displayName: name });
      await sendEmailVerification(userCredential.user);

      const token = await userCredential.user.getIdToken();
      storeJwtToken(token);
      return userCredential;
    } finally {
      setLoading(false);
    }
  };

  // Sign in and generate JWT
  const signIn = async (email, password) => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const token = await userCredential.user.getIdToken();
      storeJwtToken(token);
      return userCredential;
    } finally {
      setLoading(false);
    }
  };

  // Sign in with Google and generate JWT
  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const token = await result.user.getIdToken();
      storeJwtToken(token);
      return result;
    } finally {
      setLoading(false);
    }
  };

  // Fetch user data
  const fetchUserData = async (uid) => {
    const token = Cookies.get("jwt_token");
    if (!token) return;

    try {
      const response = await axios.get(`http://localhost:5000/user/${uid}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserData(response.data);
    } catch (error) {
      if (error.response) {
        console.error("Error response:", error.response);
      } else {
        console.error("Error fetching user data:", error.message);
      }
    }
  };

  // Fetch product details
  const fetchProductDetails = async (productId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/make_order/${productId}`
      );
      setProductData(response.data);
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  // Handle authentication state change
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setLoading(true);
      setUser(currentUser);

      if (currentUser) {
        const token = await currentUser.getIdToken();
        storeJwtToken(token);
        await fetchUserData(currentUser.uid);
      } else {
        setUserData(null);
      }
      setLoading(false);
    });

    return () => unSubscribe();
  }, []);

  // Logout and remove token
  const logOut = () => {
    setLoading(true);
    return signOut(auth).finally(() => {
      removeJwtToken();
      setUserData(null);
      setLoading(false);
    });
  };

  const sendPasswordReset = (email) => {
    setLoading(true);
    return sendPasswordResetEmail(auth, email).finally(() => setLoading(false));
  };

  const authInfo = {
    user,
    userData,
    loading,
    createUser,
    signIn,
    signInWithGoogle,
    sendPasswordReset,
    logOut,
    productData,
    fetchProductDetails,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProviders;
