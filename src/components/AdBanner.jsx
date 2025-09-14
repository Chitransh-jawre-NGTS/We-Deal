import React, { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";

const GoogleAd = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Check if user has dismissed ad
    const dismissed = localStorage.getItem("googleAdDismissed");
    if (!dismissed) {
      setVisible(true);
    }

    // Load script only if ad is visible
    if (!dismissed) {
      const script = document.createElement("script");
      script.async = true;
      script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
      script.setAttribute("data-ad-client", "ca-pub-xxxxxxxxxxxxxxx"); // replace with your ID
      document.body.appendChild(script);

      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {}
    }
  }, []);

  const handleClose = () => {
    setVisible(false);
    localStorage.setItem("googleAdDismissed", "true"); // remember dismissal
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white shadow-lg border-t border-gray-200 z-50">
      {/* Close Button */}
      <button
        onClick={handleClose}
        className="absolute right-3 top-2 text-gray-500 hover:text-black"
      >
        <FaTimes size={18} />
      </button>

      {/* Google AdSense Ad */}
      <ins
        className="adsbygoogle block w-full"
        style={{ display: "block" }}
        data-ad-client="ca-pub-xxxxxxxxxxxxxxx"   // replace with your ID
        data-ad-slot="1234567890"                 // replace with your ad slot ID
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
};

export default GoogleAd;
