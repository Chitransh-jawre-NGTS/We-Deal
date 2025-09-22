import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { sendOtp, verifyOtp } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, otpMessage, error, user } = useSelector(
    (state) => state.auth
  );

  // Send OTP
  const handleSendOtp = (e) => {
    e.preventDefault();
    if (!/^[6-9]\d{9}$/.test(phone)) {
      toast.error("Please enter a valid 10-digit mobile number.");
      return;
    }

    dispatch(sendOtp(phone)).then((res) => {
      if (!res.error) {
        setOtpSent(true);
        // Show OTP in toast (for dev/testing only)
        toast.success(`OTP sent: ${res.payload.otp}`);
      } else {
        toast.error(res.payload?.message || "Failed to send OTP");
      }
    });
  };

  // Verify OTP
  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (!otp) {
      toast.error("Please enter the OTP.");
      return;
    }

    dispatch(verifyOtp({ phone, otp })).then((res) => {
      if (!res.error) {
        toast.success("✅ Login successful!");
        // Redirect to homepage or dashboard
        navigate("/");
      } else {
        toast.error(res.payload?.message || "Invalid OTP");
      }
    });
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-100 to-purple-200 px-4">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-purple-700 text-center mb-6">
          Welcome Back 👋
        </h2>
        <p className="text-gray-500 text-center mb-8">
          Login with your mobile number
        </p>

        {user ? (
          <p className="text-green-600 text-center font-medium">
            ✅ Logged in as {user.phone}
          </p>
        ) : !otpSent ? (
          <form onSubmit={handleSendOtp} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mobile Number
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter 10-digit mobile number"
                maxLength={10}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition disabled:opacity-50 flex items-center justify-center"
              disabled={loading}
            >
              {loading ? (
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
              ) : null}
              {loading ? "Sending..." : "Get OTP"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-5">
            <p className="text-center text-sm text-gray-600">
              OTP sent to <span className="font-medium">{phone}</span>
            </p>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Enter OTP
              </label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter 6-digit OTP"
                maxLength={6}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition disabled:opacity-50 flex items-center justify-center"
              disabled={loading}
            >
              {loading ? (
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
              ) : null}
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default LoginPage;











// import React, { useState } from "react";
// import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
// import { auth } from "../../utils/firebase"; // your Firebase config file

// const PhoneLogin = () => {
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [otp, setOtp] = useState("");
//   const [confirmationResult, setConfirmationResult] = useState(null);

//   // Setup reCAPTCHA
//   const setupRecaptcha = () => {
//     if (!window.recaptchaVerifier) {
//       window.recaptchaVerifier = new RecaptchaVerifier(
//         auth,
//         "recaptcha-container",
//         {
//           size: "invisible",
//           callback: (response) => {
//             console.log("reCAPTCHA solved:", response);
//           },
//         }
//       );
//     }
//   };

//   // Request OTP
//   const requestOTP = async () => {
//     try {
//       if (!phoneNumber.startsWith("+")) {
//         alert("Please enter phone number in +91XXXXXXXXXX format");
//         return;
//       }

//       setupRecaptcha();
//       const appVerifier = window.recaptchaVerifier;

//       const result = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
//       setConfirmationResult(result);
//       console.log("OTP sent successfully");
//     } catch (error) {
//       console.error("Error sending OTP:", error);
//     }
//   };

//   // Verify OTP
//   const verifyOTP = async () => {
//     try {
//       if (confirmationResult) {
//         await confirmationResult.confirm(otp);
//         alert("Phone number verified!");
//       }
//     } catch (error) {
//       console.error("Error verifying OTP:", error);
//     }
//   };

//   return (
//     <div>
//       <h2>Phone Login</h2>
//       <input
//         type="tel"
//         placeholder="+91XXXXXXXXXX"
//         value={phoneNumber}
//         onChange={(e) => setPhoneNumber(e.target.value)}
//       />
//       <button onClick={requestOTP}>Send OTP</button>

//       <div id="recaptcha-container"></div>

//       <input
//         type="text"
//         placeholder="Enter OTP"
//         value={otp}
//         onChange={(e) => setOtp(e.target.value)}
//       />
//       <button onClick={verifyOTP}>Verify OTP</button>
//     </div>
//   );
// };

// export default PhoneLogin;
