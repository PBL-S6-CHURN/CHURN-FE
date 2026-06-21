import { useState } from 'react';

function ForgetPassword({ onBack }) {
  const [email, setEmail] = useState('');

  const handleReset = (e) => {
    e.preventDefault();
    alert("Link reset telah dikirim ke: " + email);
    onBack(); 
  };

  return (
    <div className="login-card">
      <h2 className="signin-title" style={{ marginTop: '20px' }}>Reset Password</h2>
      <p style={{ fontSize: '0.8rem', marginBottom: '20px', color: '#ccc' }}>
        Enter your email to receive reset instructions.
      </p>
      
      <form onSubmit={handleReset}>
        <div className="input-group">
          <label>Email</label>
          <div className="input-wrapper">
            <span className="input-icon">📧</span>
            <input 
              type="email" 
              placeholder="Enter email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
        </div>
        <button type="submit" className="sign-in-btn">Send Reset Link</button>
      </form>

      <p className="footer-text">
        Remembered? <a href="#" onClick={(e) => { e.preventDefault(); onBack(); }}>Sign in</a>
      </p>
    </div>
  );
}

export default ForgetPassword;