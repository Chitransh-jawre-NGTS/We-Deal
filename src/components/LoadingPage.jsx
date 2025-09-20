import React from "react";
import { motion } from "framer-motion";

const LoadingPage = () => {
  const text = "WeDeals";

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #1a1a1a, #4b0082, #000000)",
      }}
    >
      <h1 style={{ fontSize: "5rem", color: "white", display: "flex" }}>
        {text.split("").map((char, idx) => (
        <motion.span
  key={idx}
  initial={{ opacity: 0, scale: 0.5 }}
  animate={{ opacity: 1, scale: [1, 1.3, 1] }}
  transition={{
    repeat: Infinity,
    duration: 0.8,
    delay: idx * 0.1,
  }}
  style={{ display: "inline-block", margin: "0 2px" }}
>
  {char}
</motion.span>

        ))}
      </h1>
    </div>
  );
};

export default LoadingPage;
