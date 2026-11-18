import React, { useMemo, useState } from "react";
import AuthMobileNav from "./AuthMobileNav.jsx";

const BUSINESS_TYPES = [
  { label: "Food and drink", icon: "🍲" },
  { label: "Shop or retail", icon: "🛍️" },
  { label: "Salon or spa", icon: "✂️" },
  { label: "Hotel or stays", icon: "🛏️" },
  { label: "Services or repairs", icon: "🛠️" },
  { label: "Events or other", icon: "✦" },
];

const STEPS = ["Choose your business type", "Add your details", "Review"];

function Signup() {
  const [step, setStep] = useState(0);
  const [businessType, setBusinessType] = useState("");
  const [businessName, setBusinessName] = useState(
    new URLSearchParams(window.location.search).get("business") || "",
  );
  const [ownerName, setOwnerName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notice, setNotice] = useState("");
  const [complete, setComplete] = useState(false);

  const progress = useMemo(
    () => (complete ? 100 : ((step + 1) / STEPS.length) * 100),
    [complete, step],
  );

  const goNext = () => {
    if (step === 0 && !businessType) {
      setNotice("Choose the type of business you run to continue.");
      return;
    }
    if (
      step === 1 &&
      (!businessName.trim() ||
        !ownerName.trim() ||
        !email.trim() ||
        !phone.trim())
    ) {
      setNotice("Fill in each field to review your details.");
      return;
    }
    setNotice("");
    setStep((current) => Math.min(current + 1, STEPS.length - 1));
  };

  const finishPreview = (event) => {
    event.preventDefault();
    setNotice("");
    setComplete(true);
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
            <p className="su-kicker">A simpler way to serve customers</p>
            <h2>One scan brings your business closer.</h2>
            <ol className="su-steps" aria-label="Signup steps">
              {STEPS.map((label, index) => (
                <li
                  key={label}
                  className={
                    index === step
                      ? "is-now"
                      : index < step || complete
                        ? "is-done"
                        : ""
                  }
                  aria-current={
                    index === step && !complete ? "step" : undefined
                  }
                >
                  <span className="su-steps__dot">
                    {index < step || complete ? "✓" : index + 1}
                  </span>
                  <span>
                    <b>{label}</b>
                    <small>
                      {index === 0 && "Tell us what kind of business you run."}
                      {index === 1 && "Add the details for your page."}
                      {index === 2 && "Check the preview before you finish."}
                    </small>
                  </span>
                </li>
              ))}
            </ol>
            <ul className="su-perks">
              <li>
                <i>✓</i>
                <span>Your page opens in a phone browser.</span>
              </li>
              <li>
                <i>✓</i>
                <span>Customers do not need an app or account.</span>
              </li>
              <li>
                <i>✓</i>
                <span>
                  Payments go directly to you via Paystack, Monnify, or your
                  preferred payment service.
                </span>
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
              <span>Already have an account?</span>
              <a href="/login">Log in</a>
            </div>
          </div>
          <div
            className="su-mobilebar"
            aria-label={`Signup progress ${Math.round(progress)} percent`}
          >
            <span style={{ width: `${progress}%` }} />
          </div>

          {!complete ? (
            <form className="su-card" onSubmit={finishPreview}>
              <p className="su-stepline">
                STEP {step + 1} OF {STEPS.length}
              </p>
              {step === 0 && (
                <>
                  <h1 tabIndex="-1">What kind of business do you run?</h1>
                  <p className="su-sub">
                    Choose the closest match. You can change this later.
                  </p>
                  <div
                    className="su-types"
                    role="group"
                    aria-label="Business type"
                  >
                    {BUSINESS_TYPES.map((type) => (
                      <button
                        type="button"
                        key={type.label}
                        className={`su-type ${businessType === type.label ? "is-on" : ""}`}
                        aria-pressed={businessType === type.label}
                        onClick={() => {
                          setBusinessType(type.label);
                          setNotice("");
                        }}
                      >
                        <span aria-hidden="true">{type.icon}</span>
                        {type.label}
                      </button>
                    ))}
                  </div>
                </>
              )}

              {step === 1 && (
                <>
                  <h1 tabIndex="-1">Add your business details.</h1>
                  <p className="su-sub">
                    These details are only kept in this page preview.
                  </p>
                  <div className="su-field">
                    <label htmlFor="business-name">Business name</label>
                    <input
                      id="business-name"
                      autoComplete="organization"
                      value={businessName}
                      onChange={(event) => setBusinessName(event.target.value)}
                      placeholder="For example, Kora Market"
                      required
                    />
                  </div>
                  <div className="su-field">
                    <label htmlFor="owner-name">Your name</label>
                    <input
                      id="owner-name"
                      autoComplete="name"
                      value={ownerName}
                      onChange={(event) => setOwnerName(event.target.value)}
                      placeholder="The business owner's name"
                      required
                    />
                  </div>
                  <div className="su-field">
                    <label htmlFor="signup-email">Email address</label>
                    <input
                      id="signup-email"
                      type="email"
                      autoComplete="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                  <div className="su-field">
                    <label htmlFor="signup-phone">Phone number</label>
                    <div className="su-phone">
                      <span aria-label="Country code Nigeria">+234</span>
                      <input
                        id="signup-phone"
                        type="tel"
                        autoComplete="tel-national"
                        value={phone}
                        onChange={(event) => setPhone(event.target.value)}
                        placeholder="800 000 0000"
                        required
                      />
                    </div>
                  </div>
                </>
              )}

              {step === 2 && (
                <>
                  <h1 tabIndex="-1">Review your details.</h1>
                  <p className="su-sub">
                    Make sure your information is correct.
                  </p>
                  <div className="su-review">
                    <div>
                      <small>Business type</small>
                      <b>{businessType}</b>
                    </div>
                    <div>
                      <small>Business name</small>
                      <b>{businessName}</b>
                    </div>
                    <div>
                      <small>Your name</small>
                      <b>{ownerName}</b>
                    </div>
                    <div>
                      <small>Email address</small>
                      <b>{email}</b>
                    </div>
                    <div>
                      <small>Phone number</small>
                      <b>+234 {phone}</b>
                    </div>
                  </div>
                </>
              )}

              {notice && (
                <p className="su-error--box" role="alert">
                  {notice}
                </p>
              )}
              <div className="su-actions">
                {step > 0 && (
                  <button
                    className="su-btn su-btn--ghost"
                    type="button"
                    onClick={() => {
                      setNotice("");
                      setStep((current) => current - 1);
                    }}
                  >
                    Back
                  </button>
                )}
                {step < STEPS.length - 1 ? (
                  <button
                    className="su-btn su-btn--primary"
                    type="button"
                    onClick={goNext}
                  >
                    Continue
                  </button>
                ) : (
                  <button className="su-btn su-btn--primary" type="submit">
                    Continue to account summary
                  </button>
                )}
              </div>
            </form>
          ) : (
            <section className="su-done" aria-live="polite">
              <h1>Review your information.</h1>
              <div className="su-review su-done__review">
                <div>
                  <small>Business type</small>
                  <b>{businessType}</b>
                </div>
                <div>
                  <small>Business name</small>
                  <b>{businessName}</b>
                </div>
                <div>
                  <small>Your name</small>
                  <b>{ownerName}</b>
                </div>
                <div>
                  <small>Email address</small>
                  <b>{email}</b>
                </div>
                <div>
                  <small>Phone number</small>
                  <b>+234 {phone}</b>
                </div>
              </div>
              <p>
                Check that everything looks right before creating your account.
              </p>
              <div className="su-done__actions">
                <button className="su-btn su-btn--primary" type="button">
                  Create account
                </button>
                <button
                  className="su-btn su-btn--ghost"
                  type="button"
                  onClick={() => {
                    setComplete(false);
                    setStep(STEPS.length - 1);
                  }}
                >
                  Edit details
                </button>
              </div>
              <a className="su-done__home" href="/">
                Back to homepage
              </a>
            </section>
          )}
        </main>
      </div>
    </>
  );
}

export default Signup;
