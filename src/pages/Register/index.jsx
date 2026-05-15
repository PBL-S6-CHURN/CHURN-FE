import { useState } from "react";
import "../Login/style.css";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../../layouts/AuthLayout";
import { Icon } from "@iconify/react";
import { register } from "../../api/authApi";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async(e) => {
    e.preventDefault();
    try {
      if (password !== confirmPassword) {
        alert("Password tidak cocok!");
        return;
      }

      // Simulasi register berhasil (Opsional)
      await register(username, email, password);

      alert("Akun berhasil dibuat! Silakan login kembali.");

      navigate("/login");

    } catch (err) {
      // Melempar error agar bisa ditangkap oleh komponen UI
      throw err.response?.data?.message || 'Terjadi kesalahan saat registrasi';
    }
    //Validasi Password

    console.log("Data Register Berhasil:", { username, email, password });

    // Notifikasi Berhasil (Opsional)
    alert("Akun berhasil dibuat! Silakan login kembali.");
    navigate("/login");
  };

  return (
    <AuthLayout>
      <div className="login-card">
        <h2 className="signin-title">Sign up</h2>

        <form onSubmit={handleRegister}>
          {/* Input Username */}
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <div className="input-wrapper">
              <Icon icon="majesticons:user" width="20" height="20" color="#000000" />
              <input
                type="text"
                id="username"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          </div>

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
              <Icon icon="material-symbols:lock" width="25" height="25" color="#000000" />
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
                  <Icon icon="material-symbols:visibility" width="15" height="15" color="#D1D1D1" />
                ) : (
                  <Icon icon="material-symbols:visibility-off" width="15" height="15" color="#D1D1D1" />
                )}
              </span>
            </div>
          </div>

          {/* Input Confirm Password */}
          <div className="input-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className="input-wrapper">
              <Icon icon="material-symbols:lock" width="25" height="25" color="#000000" />
              <input
                type={showPassword ? "text" : "password"}
                id="confirmPassword"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button type="submit" className="sign-in-btn">
            Sign up
          </button>
        </form>

        <p className="footer-text">
          Do you have account?{" "}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              navigate("/login");
            }}
          >
            Sign in
          </a>
        </p>
      </div>
    </AuthLayout>
  );
}

export default Register;
