import React, { useState } from "react";

export default function AuthMobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="nav-wrap auth-mobile-nav">
      <nav className="nav" aria-label="Main navigation">
        <a href="/" className="logo">
          <span className="logo__dot" /> ScanServe
        </a>
        <div className={`nav__links ${open ? "is-open" : ""}`}>
          <a href="/#how" onClick={() => setOpen(false)}>
            How it works
          </a>
          <a href="/#features" onClick={() => setOpen(false)}>
            Features
          </a>
          <a href="/#pricing" onClick={() => setOpen(false)}>
            Pricing
          </a>
          <a href="/#faq" onClick={() => setOpen(false)}>
            FAQ
          </a>
          <a href="/login" onClick={() => setOpen(false)}>
            Log in
          </a>
        </div>
        <a href="/signup" className="btn btn--dark">
          Get started
        </a>
        <button
          type="button"
          className="burger"
          aria-label="Menu"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          ☰
        </button>
      </nav>
    </header>
  );
}
