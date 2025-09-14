import React, { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, User, Phone, Briefcase, Shield } from "lucide-react";

const steps = [
  { id: 1, title: "Basic Info", icon: User },
  { id: 2, title: "Contact Info", icon: Phone },
  { id: 3, title: "Business Details", icon: Briefcase },
  { id: 4, title: "Verification", icon: Shield },
];

const ProfileVerification = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    shopName: "",
    document: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => {
    if (currentStep < steps.length) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const isComplete = currentStep > steps.length;

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10 md:px-10 flex flex-col items-center">
      {/* Progress Bar */}
      <div className="w-full max-w-2xl mb-10">
        <div className="flex justify-between items-center mb-2">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={step.id}
                className={`flex flex-col items-center text-sm ${
                  currentStep > step.id || isComplete
                    ? "text-green-600"
                    : currentStep === step.id
                    ? "text-blue-600"
                    : "text-gray-400"
                }`}
              >
                <Icon className="w-6 h-6" />
                <span>{step.title}</span>
              </div>
            );
          })}
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            className="h-2 bg-blue-600"
            initial={{ width: 0 }}
            animate={{
              width: isComplete
                ? "100%"
                : `${((currentStep - 1) / steps.length) * 100}%`,
            }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Step Form */}
      {!isComplete ? (
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white shadow-lg rounded-xl p-6 w-full max-w-lg"
        >
          {currentStep === 1 && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Basic Info</h2>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg mb-3"
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg"
              />
            </div>
          )}

          {currentStep === 2 && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Contact Info</h2>
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg"
              />
            </div>
          )}

          {currentStep === 3 && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Business Details</h2>
              <input
                type="text"
                name="shopName"
                placeholder="Shop/Business Name"
                value={formData.shopName}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg"
              />
            </div>
          )}

          {currentStep === 4 && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Upload Verification</h2>
              <input
                type="file"
                name="document"
                onChange={(e) =>
                  setFormData({ ...formData, document: e.target.files[0] })
                }
                className="w-full p-3 border rounded-lg"
              />
            </div>
          )}

          {/* Buttons */}
          <div className="flex justify-between mt-6">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className="px-4 py-2 rounded-md border text-gray-700 hover:bg-gray-100 disabled:opacity-50"
            >
              Back
            </button>
            <button
              onClick={nextStep}
              className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              {currentStep === steps.length ? "Finish" : "Next"}
            </button>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white p-10 rounded-xl shadow-lg text-center max-w-md"
        >
          <CheckCircle className="w-14 h-14 text-green-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Profile Verified
          </h2>
          <p className="text-gray-600">You’ve successfully completed your profile!</p>
          <span className="inline-block mt-4 px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium">
            ✅ Verified Badge Granted
          </span>
        </motion.div>
      )}
    </div>
  );
};

export default ProfileVerification;
