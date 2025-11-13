import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "#000",
        color: "#fff",
        textAlign: "center",
        padding: "20px",
      }} 
    >
      {/* Glowing 404 */}
      <h1
        style={{
          fontSize: "100px",
          fontWeight: "900",
          marginBottom: "10px",
          textShadow: "0 0 20px #00eaff, 0 0 40px #00eaff",
          animation: "pulseGlow 2s infinite ease-in-out",
        }}
      >
        404
      </h1>

      {/* Subtitle */}
      <p
        style={{
          fontSize: "20px",
          opacity: 0.8,
          marginBottom: "30px",
        }}
      >
        Oops! The page you’re looking for doesn’t exist.
      </p>

      {/* Home Button */}
      <Link
        to="/"
        style={{
          background: "#bb00ffff",
          color: "#000",
          padding: "12px 30px",
          borderRadius: "30px",
          fontWeight: "bold",
          textDecoration: "none",
          boxShadow: "0 0 15px #ff0037ff",
          transition: "0.3s ease",
        }}
        onMouseOver={(e) => {
          e.target.style.boxShadow = "0 0 25px #bb00ffff";
          e.target.style.transform = "scale(1.05)";
        }}
        onMouseOut={(e) => {
          e.target.style.boxShadow = "0 0 15px #bb00ffff";
          e.target.style.transform = "scale(1)";
        }}
      >
        Go to Home
      </Link>

      {/* Inline Keyframes */}
      <style>
        {`
          @keyframes pulseGlow {
            0% {
              text-shadow: 0 0 20px #ea00fff7, 0 0 40px #ff0037ff;
            }
            50% {
              text-shadow: 0 0 40px #ea00fff7, 0 0 80px #ff0037ff;
            }
            100% {
              text-shadow: 0 0 20px #ea00fff7, 0 0 40px #ff0037ff;
            }
          }
        `}
      </style>
    </div>
  );
}  
 
