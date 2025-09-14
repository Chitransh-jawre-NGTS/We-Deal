import React from "react";

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl p-8 md:p-12">
        <h1 className="text-3xl md:text-4xl font-bold text-purple-700 mb-6">
          Terms & Conditions
        </h1>
        <p className="text-gray-600 mb-8">
          Welcome to <span className="font-semibold">NextGenOLX</span>. By accessing or using our
          platform, you agree to comply with the following terms and conditions. Please read them
          carefully.
        </p>

        <h2 className="text-xl font-semibold text-purple-600 mb-3">1. User Eligibility</h2>
        <p className="text-gray-600 mb-6">
          You must be at least 18 years old to create an account and use our services. By registering,
          you confirm that you meet this requirement.
        </p>

        <h2 className="text-xl font-semibold text-purple-600 mb-3">2. Posting Ads</h2>
        <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
          <li>All ads must comply with local laws and regulations.</li>
          <li>Users are responsible for the accuracy of the information they provide.</li>
          <li>Prohibited items include illegal goods, counterfeit products, and restricted services.</li>
        </ul>

        <h2 className="text-xl font-semibold text-purple-600 mb-3">3. Transactions</h2>
        <p className="text-gray-600 mb-6">
          NextGenOLX acts as a platform only. We are not responsible for the quality, safety, or
          legality of items listed, or the truth of ad content. Buyers and sellers must exercise due
          diligence before completing transactions.
        </p>

        <h2 className="text-xl font-semibold text-purple-600 mb-3">4. User Responsibilities</h2>
        <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
          <li>Keep your account information secure and confidential.</li>
          <li>Do not engage in fraudulent, abusive, or illegal activities.</li>
          <li>Respect other users and maintain ethical communication.</li>
        </ul>

        <h2 className="text-xl font-semibold text-purple-600 mb-3">5. Limitation of Liability</h2>
        <p className="text-gray-600 mb-6">
          We do not guarantee uninterrupted service or the accuracy of listings. NextGenOLX shall not
          be held liable for any direct, indirect, or consequential damages arising from the use of
          our platform.
        </p>

        <h2 className="text-xl font-semibold text-purple-600 mb-3">6. Termination of Use</h2>
        <p className="text-gray-600 mb-6">
          We reserve the right to suspend or terminate any account that violates our terms or engages
          in harmful activities.
        </p>

        <h2 className="text-xl font-semibold text-purple-600 mb-3">7. Governing Law</h2>
        <p className="text-gray-600 mb-6">
          These Terms & Conditions are governed by the laws of India. Any disputes shall be subject to
          the jurisdiction of courts in Madhya Pradesh.
        </p>

        <p className="text-gray-500 text-sm mt-8">
          Last Updated: September 2025
        </p>
      </div>
    </div>
  );
};

export default TermsAndConditions;
