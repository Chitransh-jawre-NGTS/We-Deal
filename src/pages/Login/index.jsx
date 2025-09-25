// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import toast, { Toaster } from "react-hot-toast";
// import { sendOtp, verifyOtp } from "../../redux/slices/authSlice";
// import { useNavigate } from "react-router-dom";

// const LoginPage = () => {
//   const [phone, setPhone] = useState("");
//   const [otp, setOtp] = useState("");
//   const [otpSent, setOtpSent] = useState(false);

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { loading, otpMessage, error, user } = useSelector(
//     (state) => state.auth
//   );

//   // Send OTP
//   const handleSendOtp = (e) => {
//     e.preventDefault();
//     if (!/^[6-9]\d{9}$/.test(phone)) {
//       toast.error("Please enter a valid 10-digit mobile number.");
//       return;
//     }

//     dispatch(sendOtp(phone)).then((res) => {
//       if (!res.error) {
//         setOtpSent(true);
//         // Show OTP in toast (for dev/testing only)
//         toast.success(`OTP sent: ${res.payload.otp}`);
//       } else {
//         toast.error(res.payload?.message || "Failed to send OTP");
//       }
//     });
//   };

//   // Verify OTP
//   const handleVerifyOtp = (e) => {
//     e.preventDefault();
//     if (!otp) {
//       toast.error("Please enter the OTP.");
//       return;
//     }

//     dispatch(verifyOtp({ phone, otp })).then((res) => {
//       if (!res.error) {
//         toast.success("✅ Login successful!");
//         // Redirect to homepage or dashboard
//         navigate("/");
//       } else {
//         toast.error(res.payload?.message || "Invalid OTP");
//       }
//     });
//   };

//   return (
//     <section className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-100 to-purple-200 px-4">
//       <Toaster position="top-center" reverseOrder={false} />

//       <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
//         <h2 className="text-3xl font-bold text-purple-700 text-center mb-6">
//           Welcome Back 👋
//         </h2>
//         <p className="text-gray-500 text-center mb-8">
//           Login with your mobile number
//         </p>

//         {user ? (
//           <p className="text-green-600 text-center font-medium">
//             ✅ Logged in as {user.phone}
//           </p>
//         ) : !otpSent ? (
//           <form onSubmit={handleSendOtp} className="space-y-5">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Mobile Number
//               </label>
//               <input
//                 type="tel"
//                 value={phone}
//                 onChange={(e) => setPhone(e.target.value)}
//                 placeholder="Enter 10-digit mobile number"
//                 maxLength={10}
//                 required
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
//               />
//             </div>

//             <button
//               type="submit"
//               className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition disabled:opacity-50 flex items-center justify-center"
//               disabled={loading}
//             >
//               {loading ? (
//                 <svg
//                   className="animate-spin h-5 w-5 mr-2 text-white"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                 >
//                   <circle
//                     className="opacity-25"
//                     cx="12"
//                     cy="12"
//                     r="10"
//                     stroke="currentColor"
//                     strokeWidth="4"
//                   ></circle>
//                   <path
//                     className="opacity-75"
//                     fill="currentColor"
//                     d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
//                   ></path>
//                 </svg>
//               ) : null}
//               {loading ? "Sending..." : "Get OTP"}
//             </button>
//           </form>
//         ) : (
//           <form onSubmit={handleVerifyOtp} className="space-y-5">
//             <p className="text-center text-sm text-gray-600">
//               OTP sent to <span className="font-medium">{phone}</span>
//             </p>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Enter OTP
//               </label>
//               <input
//                 type="text"
//                 value={otp}
//                 onChange={(e) => setOtp(e.target.value)}
//                 placeholder="Enter 6-digit OTP"
//                 maxLength={6}
//                 required
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
//               />
//             </div>

//             <button
//               type="submit"
//               className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition disabled:opacity-50 flex items-center justify-center"
//               disabled={loading}
//             >
//               {loading ? (
//                 <svg
//                   className="animate-spin h-5 w-5 mr-2 text-white"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                 >
//                   <circle
//                     className="opacity-25"
//                     cx="12"
//                     cy="12"
//                     r="10"
//                     stroke="currentColor"
//                     strokeWidth="4"
//                   ></circle>
//                   <path
//                     className="opacity-75"
//                     fill="currentColor"
//                     d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
//                   ></path>
//                 </svg>
//               ) : null}
//               {loading ? "Verifying..." : "Verify OTP"}
//             </button>
//           </form>
//         )}
//       </div>
//     </section>
//   );
// };

// export default LoginPage;
// src/pages/Login.jsx

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginWithEmail } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signInWithRedirect, 
  getRedirectResult 
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

  // Email/password login
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

  // Google login
  const handleGoogleLogin = async () => {
    try {
      await signInWithRedirect(auth, googleProvider);
    } catch (err) {
      console.error("Google login redirect error:", err);
    }
  };

  // Handle redirect result
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

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Navbar */}
      <nav className="w-full bg-white shadow-md py-4 px-8 flex items-center justify-center">
        <img
          src={companyLogo}
          alt="Company Logo"
          className="h-12 cursor-pointer hover:scale-105 transition"
          onClick={handleGoogleLogin}
        />
      </nav>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row flex-1">
        {/* Left Image */}
        <div className="hidden lg:block lg:w-1/2">
          <img src={sideImage} alt="Side Visual" className="w-full h-full object-cover" />
        </div>

        {/* Right Form */}
        <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8 bg-white">
          <div className="w-full max-w-md">

            {/* Google Login Button */}
            <div className="flex justify-center mb-6">
              <button
                onClick={handleGoogleLogin}
                className="flex items-center gap-2 border border-gray-300 py-2 px-4 hover:bg-gray-100 transition rounded-md w-full justify-center"
              >
                <FcGoogle size={24} />
                <span className="text-gray-700 font-medium">Sign in with Google</span>
              </button>
            </div>

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

            <p className="mt-6 text-center text-gray-600">
              {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
              <button
                onClick={() => setIsRegister(!isRegister)}
                className="text-gray-800 font-medium hover:underline"
              >
                {isRegister ? "Login" : "Register"}
              </button>
            </p>

            <div className="mt-6 text-center text-gray-400 text-sm">
              By continuing, you agree to our{" "}
              <span className="underline cursor-pointer">Terms</span> and{" "}
              <span className="underline cursor-pointer">Privacy Policy</span>.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
