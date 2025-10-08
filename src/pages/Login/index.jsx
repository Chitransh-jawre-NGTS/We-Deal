// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { loginWithEmail } from "../../redux/slices/authSlice";
// import { useNavigate } from "react-router-dom";
// import { 
//   getAuth, 
//   signInWithEmailAndPassword, 
//   createUserWithEmailAndPassword, 
//   signInWithRedirect, 
//   getRedirectResult 
// } from "firebase/auth";
// import { auth, googleProvider } from "../../utils/firebase";
// import "../../utils/firebase";
// import companyLogo from "../../assets/images/myweblogo/ChatGPT Image Sep 20, 2025, 11_04_57 PM.png";
// import sideImage from "../../assets/images/categoryimage/electronics.jpg";
// import { FcGoogle } from "react-icons/fc";

// const Login = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { loading, error } = useSelector((state) => state.auth);

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [isRegister, setIsRegister] = useState(false);

//   // Forgot password states
//   const [showForgot, setShowForgot] = useState(false);
//   const [forgotEmail, setForgotEmail] = useState("");
//   const [forgotMessage, setForgotMessage] = useState("");

//   // Email/password login
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const authInstance = getAuth();
//       let userCredential;

//       if (isRegister) {
//         userCredential = await createUserWithEmailAndPassword(authInstance, email, password);
//       } else {
//         userCredential = await signInWithEmailAndPassword(authInstance, email, password);
//       }

//       const firebaseToken = await userCredential.user.getIdToken();
//       await dispatch(loginWithEmail(firebaseToken)).unwrap();
//       navigate("/");
//     } catch (err) {
//       console.error("Auth error:", err);
//       alert(err.message);
//     }
//   };

//   // Google login
//   const handleGoogleLogin = async () => {
//     try {
//       await signInWithRedirect(auth, googleProvider);
//     } catch (err) {
//       console.error("Google login redirect error:", err);
//     }
//   };

//   // Handle redirect result
//   useEffect(() => {
//     getRedirectResult(auth)
//       .then(async (result) => {
//         if (result) {
//           const firebaseToken = await result.user.getIdToken();
//           await dispatch(loginWithEmail(firebaseToken)).unwrap();
//           navigate("/");
//         }
//       })
//       .catch((error) => {
//         console.error("Redirect result error:", error);
//       });
//   }, []);

//   // Forgot password handler
//   const handleForgotPassword = async () => {
//     if (!forgotEmail) {
//       alert("Please enter your email");
//       return;
//     }

//     try {
//       const res = await fetch("http://localhost:5000/api/auth/forgot-password", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email: forgotEmail }),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         setForgotMessage(data.message);
//       } else {
//         setForgotMessage(data.message || "Something went wrong");
//       }
//     } catch (err) {
//       console.error(err);
//       setForgotMessage("Failed to send reset email");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col">
//       {/* Navbar */}
//       <nav className="w-full bg-white shadow-md py-4 px-8 flex items-center justify-center">
//         <img
//           src={companyLogo}
//           alt="Company Logo"
//           className="h-12 cursor-pointer hover:scale-105 transition"
//           onClick={handleGoogleLogin}
//         />
//       </nav>

//       {/* Main Content */}
//       <div className="flex flex-col lg:flex-row flex-1">
//         {/* Left Image */}
//         <div className="hidden lg:block lg:w-1/2">
//           <img src={sideImage} alt="Side Visual" className="w-full h-full object-cover" />
//         </div>

//         {/* Right Form */}
//         <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8 bg-white">
//           <div className="w-full max-w-md">

//             {/* Google Login Button */}
//             <div className="flex justify-center mb-6">
//               <button
//                 onClick={handleGoogleLogin}
//                 className="flex items-center gap-2 border border-gray-300 py-2 px-4 hover:bg-gray-100 transition rounded-md w-full justify-center"
//               >
//                 <FcGoogle size={24} />
//                 <span className="text-gray-700 font-medium">Sign in with Google</span>
//               </button>
//             </div>

//             <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
//               {isRegister ? "Create Account" : "Welcome Back"}
//             </h2>

//             {error && <p className="text-red-500 mb-4 text-center">{error.message || error}</p>}

//             <form onSubmit={handleSubmit} className="space-y-5">
//               <div>
//                 <label className="block mb-2 font-medium text-gray-700">Email</label>
//                 <input
//                   type="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   required
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
//                 />
//               </div>
//               <div>
//                 <label className="block mb-2 font-medium text-gray-700">Password</label>
//                 <input
//                   type="password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   required
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
//                 />
//               </div>
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full bg-gray-800 text-white py-3 rounded-lg font-medium hover:bg-gray-900 transition disabled:opacity-50"
//               >
//                 {loading ? (isRegister ? "Registering..." : "Logging in...") : (isRegister ? "Register" : "Login")}
//               </button>
//             </form>

//             {/* Toggle register/login */}
//             <p className="mt-6 text-center text-gray-600">
//               {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
//               <button
//                 onClick={() => setIsRegister(!isRegister)}
//                 className="text-gray-800 font-medium hover:underline"
//               >
//                 {isRegister ? "Login" : "Register"}
//               </button>
//             </p>

//             {/* Forgot Password Section */}
//             <div className="mt-6 text-center">
//               {!showForgot ? (
//                 <button
//                   onClick={() => setShowForgot(true)}
//                   className="text-gray-800 font-medium hover:underline"
//                 >
//                   Forgot Password?
//                 </button>
//               ) : (
//                 <div className="flex flex-col gap-2 items-center">
//                   <input
//                     type="email"
//                     placeholder="Enter your email"
//                     value={forgotEmail}
//                     onChange={(e) => setForgotEmail(e.target.value)}
//                     className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
//                   />
//                   <button
//                     onClick={handleForgotPassword}
//                     className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition"
//                   >
//                     Send Reset Link
//                   </button>
//                   {forgotMessage && <p className="mt-2 text-sm text-green-600">{forgotMessage}</p>}
//                 </div>
//               )}
//             </div>

//             <div className="mt-6 text-center text-gray-400 text-sm">
//               By continuing, you agree to our{" "}
//               <span className="underline cursor-pointer">Terms</span> and{" "}
//               <span className="underline cursor-pointer">Privacy Policy</span>.
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;


import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginWithEmail } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithRedirect,
  getRedirectResult,
} from "firebase/auth";
import { auth, googleProvider } from "../../utils/firebase";
import "../../utils/firebase";
import companyLogo from "../../assets/images/myweblogo/ChatGPT Image Sep 20, 2025, 11_04_57 PM.png";
import sideImage from "../../assets/images/categoryimage/electronics.jpg";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);

  // 🔹 Forgot password flow states
  const [showForgot, setShowForgot] = useState(false);
  const [step, setStep] = useState(1); // 1: email, 2: verify OTP, 3: reset password
  const [forgotEmail, setForgotEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [message, setMessage] = useState("");

  // 🔹 Email/password login
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const authInstance = getAuth();
      let userCredential;

      if (isRegister) {
        userCredential = await createUserWithEmailAndPassword(authInstance, email, password);
      } else {
        userCredential = await signInWithEmailAndPassword(authInstance, email, password);
      }

      const firebaseToken = await userCredential.user.getIdToken();
      await dispatch(loginWithEmail(firebaseToken)).unwrap();
      navigate("/");
    } catch (err) {
      console.error("Auth error:", err);
      alert(err.message);
    }
  };

  // 🔹 Google login
  const handleGoogleLogin = async () => {
    try {
      await signInWithRedirect(auth, googleProvider);
    } catch (err) {
      console.error("Google login redirect error:", err);
    }
  };

  // 🔹 Handle redirect result
  useEffect(() => {
    getRedirectResult(auth)
      .then(async (result) => {
        if (result) {
          const firebaseToken = await result.user.getIdToken();
          await dispatch(loginWithEmail(firebaseToken)).unwrap();
          navigate("/");
        }
      })
      .catch((error) => {
        console.error("Redirect result error:", error);
      });
  }, []);

  // 🔹 Step 1 → Send OTP
  const handleSendOtp = async () => {
    if (!forgotEmail) return alert("Please enter your email");
    try {
      const res = await fetch("http://localhost:5000/api/auth/forgot-password/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: forgotEmail }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage(data.message);
        setStep(2);
      } else {
        setMessage(data.message || "Something went wrong");
      }
    } catch (err) {
      console.error(err);
      setMessage("Failed to send OTP");
    }
  };

  // 🔹 Step 2 → Verify OTP
  const handleVerifyOtp = async () => {
    if (!otp) return alert("Please enter OTP");
    try {
      const res = await fetch("http://localhost:5000/api/auth/forgot-password/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: forgotEmail, otp }),
      });
      const data = await res.json();
      if (res.ok) {
        setResetToken(data.token);
        setMessage(data.message);
        setStep(3);
      } else {
        setMessage(data.message || "Invalid OTP");
      }
    } catch (err) {
      console.error(err);
      setMessage("Failed to verify OTP");
    }
  };

  // 🔹 Step 3 → Reset Password
  const handleResetPassword = async () => {
    if (!newPassword) return alert("Please enter a new password");
    try {
      const res = await fetch("http://localhost:5000/api/auth/forgot-password/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: resetToken, newPassword }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage(data.message);
        setTimeout(() => {
          setShowForgot(false);
          setStep(1);
          setMessage("");
        }, 2000);
      } else {
        setMessage(data.message || "Something went wrong");
      }
    } catch (err) {
      console.error(err);
      setMessage("Failed to reset password");
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Navbar */}
      <nav className="w-full bg-white shadow-md py-4 px-8 flex items-center justify-center">
        <img
          src={companyLogo}
          alt="Company Logo"
          className="h-20 cursor-pointer hover:scale-105 transition"
        />
      </nav>


        {/* Right Form */}
        <div className="w-full mx-auto items-center justify-center p-8 bg-white">
          <div className="w-full max-w-md mx-auto">

            {/* Google Login */}
            {!showForgot && (
              <div className="flex justify-center mb-6">
                <button
                  onClick={handleGoogleLogin}
                  className="flex items-center gap-2 border border-gray-300 py-2 px-4 hover:bg-gray-100 transition rounded-md w-full justify-center"
                >
                  <FcGoogle size={24} />
                  <span className="text-gray-700 font-medium">Sign in with Google</span>
                </button>
              </div>
            )}

            {/* -------------------- NORMAL LOGIN FORM -------------------- */}
            {!showForgot ? (
              <>
                <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
                  {isRegister ? "Create Account" : "Welcome Back"}
                </h2>

                {error && <p className="text-red-500 mb-4 text-center">{error.message || error}</p>}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block mb-2 font-medium text-gray-700">Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 font-medium text-gray-700">Password</label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gray-800 text-white py-3 rounded-lg font-medium hover:bg-gray-900 transition disabled:opacity-50"
                  >
                    {loading ? (isRegister ? "Registering..." : "Logging in...") : (isRegister ? "Register" : "Login")}
                  </button>
                </form>

                {/* Forgot Password Button */}
                <div className="mt-6 text-center">
                  <button
                    onClick={() => setShowForgot(true)}
                    className="text-gray-800 font-medium hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>

                <p className="mt-6 text-center text-gray-600">
                  {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
                  <button
                    onClick={() => setIsRegister(!isRegister)}
                    className="text-gray-800 font-medium hover:underline"
                  >
                    {isRegister ? "Login" : "Register"}
                  </button>
                </p>
              </>
            ) : (
              /* -------------------- FORGOT PASSWORD FLOW -------------------- */
              <div className="space-y-5">
                <h2 className="text-2xl font-semibold text-center mb-4 text-gray-800">
                  {step === 1 ? "Forgot Password" : step === 2 ? "Verify OTP" : "Reset Password"}
                </h2>

                {step === 1 && (
                  <>
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                    />
                    <button
                      onClick={handleSendOtp}
                      className="w-full bg-gray-800 text-white py-3 rounded-lg hover:bg-gray-900 transition"
                    >
                      Send OTP
                    </button>
                  </>
                )}

                {step === 2 && (
                  <>
                    <input
                      type="text"
                      placeholder="Enter OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                    />
                    <button
                      onClick={handleVerifyOtp}
                      className="w-full bg-gray-800 text-white py-3 rounded-lg hover:bg-gray-900 transition"
                    >
                      Verify OTP
                    </button>
                  </>
                )}

                {step === 3 && (
                  <>
                    <input
                      type="password"
                      placeholder="Enter new password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                    />
                    <button
                      onClick={handleResetPassword}
                      className="w-full bg-gray-800 text-white py-3 rounded-lg hover:bg-gray-900 transition"
                    >
                      Reset Password
                    </button>
                  </>
                )}

                {message && (
                  <p className="text-center mt-4 text-green-600 font-medium">{message}</p>
                )}

                <button
                  onClick={() => {
                    setShowForgot(false);
                    setStep(1);
                    setMessage("");
                  }}
                  className="block text-center w-full text-gray-500 hover:text-gray-700 mt-4 underline"
                >
                  Back to Login
                </button>
              </div>
            )}
          </div>
        </div>

    </div>
  );
};

export default Login;
