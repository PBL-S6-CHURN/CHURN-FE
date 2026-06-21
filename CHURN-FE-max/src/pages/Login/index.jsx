import { useState } from "react";
import AuthLayout from "../../layouts/AuthLayout";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logoChurn.png";
import { Icon } from "@iconify/react";
import "./style.css";
import { login } from "../../api/authApi";

function Login({ onForget, setAdminData, adminData }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Login Data:", { email, password });

    try {
      // Simulasi login berhasil (Opsional)
      const data = await login(email, password);

      const token = data.data.accessToken;
      const tokenRefresh = data.data.refreshToken;
      localStorage.setItem("token", token);
      localStorage.setItem("token-refresh", tokenRefresh);

      setAdminData(data.data);
      setError("");

      navigate("/dashboard");
    } catch (error) {
      setError("Terjadi kesalahan saat login. Silakan coba lagi.", error);
    }
  };

  return (
    <AuthLayout>
      <div className="login-card">
        <div className="logo-circle">
          <img src={logo} alt="Logo" />
        </div>

        <h2 className="signin-title">Sign in</h2>

        <form onSubmit={handleLogin}>
          {/* Input Email */}
          {error && <div className="error-message">{error}</div>}
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <div className="input-wrapper">
              <Icon
                icon="material-symbols:mail"
                width="25"
                height="25"
                color="#000000"
              />
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
              <Icon
                icon="material-symbols:lock"
                width="24"
                height="24"
                color="#000000"
              />
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
                  <Icon
                    icon="mdi:eye-outline"
                    width="20"
                    height="20"
                    color="#D1D1D1"
                  />
                ) : (
                  <Icon
                    icon="mdi:eye-off-outline"
                    width="20"
                    height="20"
                    color="#D1D1D1"
                  />
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
