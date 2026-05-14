import { useState } from "react";
import AuthLayout from "../../layouts/AuthLayout";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import './style.css';

function Login({ onForget, onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Login Data:", { email, password });

    // Simulasi login berhasil (Opsional)
    navigate("/dashboard");
  };

  return (
    <AuthLayout>
      <div className="login-card">
        <div className="logo-circle">
          <img src="/src/assets/logoChurn.png" alt="Logo" />
        </div>

        <h2 className="signin-title">Sign in</h2>

        <form onSubmit={handleLogin}>
          {/* Input Email */}
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <div className="input-wrapper">
              <Icon icon="material-symbols:mail" width="25" height="25" color="#000000" />
              <input
                type="email"
                id="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Input Password */}
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <div className="input-wrapper">
            <Icon icon="material-symbols:lock" width="24" height="24" color="#000000" />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                className="eye-icon"
                onClick={() => setShowPassword(!showPassword)}
                style={{ cursor: "pointer" }}
              >
                {showPassword ? (
                  <Icon icon="mdi:eye-outline" width="20" height="20" color="#D1D1D1" />
                ) : (
                  <Icon icon="mdi:eye-off-outline" width="20" height="20" color="#D1D1D1" />
                )}
              </span>
            </div>
            <a
              href="#"
              className="forgot-password"
              onClick={(e) => {
                e.preventDefault();
                onForget();
              }}
            >
              Forgot Password?
            </a>
          </div>
          <button type="submit" className="sign-in-btn">
            Sign in
          </button>
        </form>
        <p className="footer-text">
          Don't have account?{" "}
          <a
            href="#register"
            onClick={(e) => {
              e.preventDefault();
              navigate("/register");
            }}
          >
            Sign up
          </a>
        </p>
      </div>
    </AuthLayout>
  );
}

export default Login;
