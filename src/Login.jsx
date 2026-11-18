import React, { useState } from "react";
import AuthMobileNav from "./AuthMobileNav.jsx";

function Login() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <AuthMobileNav />
      <div className="su">
        <aside className="su-side">
          <a className="su-logo" href="/" aria-label="ScanServe home">
            <span className="su-dot" /> ScanServe
          </a>
          <div className="su-side__body">
            <p className="su-kicker">Welcome back</p>
            <h2>Your business is just a sign-in away.</h2>
            <ul className="su-perks">
              <li>
                <i>✓</i>
                <span>Manage your business page and QR code.</span>
              </li>
              <li>
                <i>✓</i>
                <span>Keep orders and customer requests in view.</span>
              </li>
              <li>
                <i>✓</i>
                <span>Sign in with your email or staff ID.</span>
              </li>
            </ul>
          </div>
          <div className="su-side__foot">
            <a href="/">Back to ScanServe</a>
            <span>© {new Date().getFullYear()} ScanServe</span>
          </div>
        </aside>

        <main className="su-main">
          <div className="su-top">
            <a className="su-top__back" href="/">
              ← Back to homepage
            </a>
            <div className="su-top__account">
              <span>New to ScanServe?</span>
              <a href="/signup">Create an account</a>
            </div>
          </div>

          <form className="su-card login-card" onSubmit={handleLogin}>
            <p className="su-stepline">BUSINESS OWNER OR STAFF</p>
            <h1>Log in to ScanServe.</h1>
            <p className="su-sub">
              Enter your email or staff ID and password to continue.
            </p>

            <div className="su-field">
              <label htmlFor="login-identifier">Email or staff ID</label>
              <input
                id="login-identifier"
                type="text"
                autoComplete="username"
                value={identifier}
                onChange={(event) => setIdentifier(event.target.value)}
                placeholder="Enter your email or staff ID"
                required
              />
            </div>
            <div className="su-field">
              <label htmlFor="login-password">Password</label>
              <input
                id="login-password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>

            <div className="login-options">
              <button type="button" className="login-forgot">
                Forgot password?
              </button>
            </div>

            <div className="su-actions">
              <button className="su-btn su-btn--primary" type="submit">
                Log in
              </button>
            </div>
            <p className="login-signup">
              Don’t have an account? <a href="/signup">Get started</a>
            </p>
          </form>
        </main>
      </div>
    </>
  );
}

export default Login;
