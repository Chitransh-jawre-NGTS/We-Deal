import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl p-8 md:p-12">
        <h1 className="text-3xl md:text-4xl font-bold text-purple-700 mb-6">
          Privacy Policy
        </h1>
        <p className="text-gray-600 mb-8">
          At <span className="font-semibold">NextGenOLX</span>, we respect your privacy and are
          committed to protecting your personal data. This Privacy Policy explains how we collect,
          use, and safeguard your information when you use our website and services.
        </p>

        <h2 className="text-xl font-semibold text-purple-600 mb-3">1. Information We Collect</h2>
        <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
          <li>Personal details like name, email, phone number when you register or post ads.</li>
          <li>Transaction details related to buying/selling activities.</li>
          <li>Device and usage data including IP address, browser type, and location.</li>
        </ul>

        <h2 className="text-xl font-semibold text-purple-600 mb-3">2. How We Use Your Information</h2>
        <p className="text-gray-600 mb-6">
          We use your data to provide, maintain, and improve our services. This includes verifying
          your identity, enabling secure transactions, sending notifications, and personalizing
          recommendations.
        </p>

        <h2 className="text-xl font-semibold text-purple-600 mb-3">3. Sharing of Information</h2>
        <p className="text-gray-600 mb-6">
          We do not sell your personal data. We may share limited information with trusted service
          providers, advertisers, or legal authorities when required by law.
        </p>

        <h2 className="text-xl font-semibold text-purple-600 mb-3">4. Cookies & Tracking</h2>
        <p className="text-gray-600 mb-6">
          Our website uses cookies to improve user experience, analyze traffic, and display relevant
          ads. You can disable cookies in your browser settings at any time.
        </p>

        <h2 className="text-xl font-semibold text-purple-600 mb-3">5. Your Rights</h2>
        <p className="text-gray-600 mb-6">
          You have the right to access, update, or delete your personal data. For any requests,
          please contact us at <span className="font-semibold">support@nextgenolx.com</span>.
        </p>

        <h2 className="text-xl font-semibold text-purple-600 mb-3">6. Updates to Policy</h2>
        <p className="text-gray-600 mb-6">
          We may update this Privacy Policy from time to time. Any changes will be posted on this
          page with a revised date.
        </p>

        <p className="text-gray-500 text-sm mt-8">
          Last Updated: September 2025
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
