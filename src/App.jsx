import React, { useEffect, useRef, useState } from "react";

const BRAND = "ScanServe";
// Replace these example contact numbers with confirmed support numbers.
const SUPPORT_PHONE = "+234 800 000 0000";
const SUPPORT_WHATSAPP = "+234 800 000 0001";
const digits = (value) => value.replace(/[^\d+]/g, "");

const NAV = [
  { label: "How it works", href: "#how" },
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

const VENUES = [
  "Restaurants",
  "Cafés",
  "Bars",
  "Bakeries",
  "Food courts",
  "Street-food vendors",
  "Shops",
  "Boutiques",
  "Supermarkets",
  "Pharmacies",
  "Market stalls",
  "Salons",
  "Barbershops",
  "Spas",
  "Laundries",
  "Car washes",
  "Mechanics",
  "Clinics",
  "Hotels",
  "Guest houses",
  "Event venues",
  "Schools and canteens",
  "Gyms",
  "Pickup and delivery stores",
];

const STEPS = [
  {
    title: "Customer scans",
    text: "One scan opens your business page in their phone browser. No app or account needed.",
  },
  {
    title: "They browse or choose",
    text: "Customers choose items or services, then order or make a request in seconds.",
  },
  {
    title: "They pay your business",
    text: "Customers pay you directly. Payments go to your business, not to us.",
  },
  {
    title: "You receive it. They track it.",
    text: "You receive each order or request. Customers can follow its status on their phone.",
  },
];

const FEATURES = [
  {
    id: "route",
    size: "wide",
    title: "Requests reach the right team",
    text: "Orders and requests get to the right person, team or department in your business.",
  },
  {
    id: "pay",
    size: "narrow",
    title: "Your payments go to you",
    text: "Customers pay your business directly. You own the page and the customer relationship.",
  },
  {
    id: "ai",
    size: "third",
    title: "Photo-to-page",
    text: "Snap a price list, catalogue or service list and turn it into a digital page.",
  },
  {
    id: "hotel",
    size: "third",
    title: "Bookings and services",
    text: "Let customers request a service, book an appointment or place an order.",
  },
  {
    id: "delivery",
    size: "third",
    title: "Your own pickup and delivery page",
    text: "Take pickup and delivery orders through your own page, not a marketplace.",
  },
];

const BILLING_PLANS = [
  {
    name: "Starter",
    description: "For businesses putting their page and QR code to work.",
    monthlyPrice: 35000,
    features: [
      "Your own QR-linked business page",
      "Product, service and offer listings",
      "Orders and customer requests",
      "Direct payments to your business",
      "Customers can track order or request status",
    ],
  },
  {
    name: "Growth",
    description: "For growing businesses serving more customers.",
    monthlyPrice: 70000,
    popular: true,
    features: [
      "Everything in Starter",
      "Photo-to-page for price lists and catalogues",
      "Share a page for products, services or offers",
      "Receive orders or service requests online",
      "Keep customers updated as requests progress",
    ],
  },
  {
    name: "Multi-Branch",
    description:
      "For businesses serving customers from more than one location.",
    monthlyPrice: 130000,
    features: [
      "Everything in Growth",
      "A QR-linked page for each business location",
      "Customers reach the right location from its QR code",
    ],
  },
];

const BILLING_CYCLES = [
  { id: "monthly", label: "Monthly", discount: 0 },
  { id: "quarterly", label: "Quarterly", discount: 0.1, badge: "−10%" },
  { id: "annual", label: "Annual", discount: 0.3, badge: "−30%" },
];

const FOOTER_COLS = [
  {
    title: "Product",
    links: [
      ["How it works", "#how"],
      ["Features", "#features"],
      ["FAQ", "#faq"],
      ["Pricing", "#pricing"],
    ],
  },
  {
    title: "For business owners",
    links: [
      ["Get started", "/signup"],
      ["Staff sign-in", "/staff"],
      ["Find a business", "/discover"],
      ["Online store only", "/online-store"],
    ],
  },
  {
    title: `${BRAND} for`,
    links: [
      ["Food and drink", "#"],
      ["Shops and retail", "#"],
      ["Salons and spas", "#"],
      ["Hotels and stays", "#"],
      ["Events and ticketing", "#"],
      ["Services and repairs", "#"],
    ],
  },
  {
    title: "Company",
    links: [
      ["About", "/about"],
      ["User guide", "/guide"],
      ["Help centre", "/help"],
      ["Privacy", "/privacy"],
      ["Terms", "/terms"],
      ["Cookies", "/cookies"],
    ],
  },
];

const FAQ = [
  {
    q: "Do customers need to download an app or create an account?",
    a: "No. Scanning your QR code opens your business page in their phone browser.",
  },
  {
    q: "Can I use it if I sell products, not food?",
    a: "Yes. Your page can show products, services or offers so customers can order or make a request.",
  },
  {
    q: "Can customers request a service as well as place an order?",
    a: "Yes. Customers can request what your business offers and track its status on their phone.",
  },
  {
    q: "Who receives the payments?",
    a: "Payments go directly to your business. You own your page and customer relationship.",
  },
];

/* ---------- decorative QR pattern ---------- */
function FakeQR({ size = 21 }) {
  const cells = [];
  let seed = 11;
  const rand = () => (seed = (seed * 9301 + 49297) % 233280) / 233280;
  const finder = (x, y) =>
    (x < 7 && y < 7) || (x > size - 8 && y < 7) || (x < 7 && y > size - 8);
  for (let y = 0; y < size; y++)
    for (let x = 0; x < size; x++) {
      let on;
      if (finder(x, y)) {
        const fx = x > size - 8 ? x - (size - 7) : x;
        const fy = y > size - 8 ? y - (size - 7) : y;
        on =
          fx === 0 ||
          fx === 6 ||
          fy === 0 ||
          fy === 6 ||
          (fx > 1 && fx < 5 && fy > 1 && fy < 5);
      } else on = rand() > 0.5;
      if (on)
        cells.push(<rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" />);
    }
  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      className="qr"
      shapeRendering="crispEdges"
      aria-label="QR code"
    >
      {cells}
    </svg>
  );
}

/* ---------- phone with switchable screens ---------- */
function Phone({ screen = 1 }) {
  return (
    <div className="phone">
      <div className="phone__notch" />
      <div className="phone__screen">
        <div className="scr-anim" key={screen}>
          {screen === 0 && (
            <div className="scr scr--scan">
              <div className="viewfinder">
                <span />
                <span />
                <span />
                <span />
                <div className="viewfinder__qr">
                  <FakeQR />
                </div>
              </div>
              <p>Scan to open the business page</p>
              <b className="pill">No app needed</b>
            </div>
          )}
          {screen === 1 && (
            <div className="scr">
              <h4>Kora Market</h4>
              <div className="tabs">
                <b>Popular</b>
                <span>For home</span>
                <span>Services</span>
              </div>
              {[
                ["Woven tote", "View details", "#e8552d"],
                ["Home delivery", "Choose a time", "#f2b134"],
                ["Wash and fold", "Make a request", "#8a2b4a"],
              ].map(([n, p, c]) => (
                <div className="dish" key={n}>
                  <i style={{ background: c }} />
                  <div>
                    <b>{n}</b>
                    <small>{p}</small>
                  </div>
                  <button>+</button>
                </div>
              ))}
              <div className="cartbar">
                Your selections <span>Review request</span>
              </div>
            </div>
          )}
          {screen === 2 && (
            <div className="scr">
              <h4>Checkout</h4>
              <p className="total">Choose how to pay</p>
              {["Card", "Bank transfer", "Pay in person"].map((m, i) => (
                <div className={`method ${i === 1 ? "is-active" : ""}`} key={m}>
                  <i /> {m}
                </div>
              ))}
              <button className="confirm">Confirm order</button>
            </div>
          )}
          {screen === 3 && (
            <div className="scr">
              <h4>Request #1042</h4>
              <p className="eta">Status updates from the business</p>
              <div className="progress">
                <i style={{ width: "62%" }} />
              </div>
              <ul className="status">
                <li className="done">Request submitted</li>
                <li className="done">Received by the business</li>
                <li className="now">In progress</li>
                <li>Ready or on its way</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------- Nav ---------- */
function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="nav-wrap">
      <nav className="nav">
        <a href="#" className="logo">
          <span className="logo__dot" /> {BRAND}
        </a>
        <div className={`nav__links ${open ? "is-open" : ""}`}>
          {NAV.map((n) => (
            <a key={n.label} href={n.href} onClick={() => setOpen(false)}>
              {n.label}
            </a>
          ))}
          <a href="/login" className="nav__login">
            Log in
          </a>
        </div>
        <a href="/signup" className="btn btn--dark">
          Get started
        </a>
        <button
          className="burger"
          aria-label="Menu"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </nav>
    </header>
  );
}

/* ---------- Hero ---------- */
function Hero() {
  const [name, setName] = useState("");
  return (
    <section className="hero">
      <div className="wrap hero__grid">
        <div className="hero__copy">
          <span className="badge">✦ For businesses across Africa</span>
          <h1>
            Scan once,
            <br />
            <em>you're there.</em>
          </h1>
          <p>
            Customers scan once to land on your business page. They can browse,
            order or make a request, pay you directly and track what happens
            next.
          </p>
          <form
            className="signup"
            onSubmit={(e) => {
              e.preventDefault();
              window.location.href = `/signup?business=${encodeURIComponent(name)}`;
            }}
          >
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your business name"
              aria-label="Business name"
            />
            <button className="btn btn--tomato">Try it free</button>
          </form>
          <small className="hero__note">
            No app to download · No customer account needed
          </small>
        </div>

        <div className="hero__art" aria-hidden>
          <div className="blob" />
          <div className="tent">
            <small>{BRAND}</small>
            <div className="tent__qr">
              <FakeQR />
            </div>
            <b>Scan to order</b>
            <span>Your business page</span>
          </div>
          <Phone screen={1} />
          <div className="sticker">
            <span>
              No app
              <br />
              to download
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Marquee ---------- */
function Marquee() {
  const items = [...VENUES, ...VENUES];
  return (
    <div className="marquee" aria-hidden>
      <div className="marquee__track">
        {items.map((v, i) => (
          <span key={i}>
            {v} <i>✦</i>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ---------- How it works (interactive) ---------- */
const STEP_VH = 35;

function How() {
  const [active, setActive] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    let frame = null;

    const update = () => {
      if (frame !== null) return;
      frame = window.requestAnimationFrame(() => {
        frame = null;
        if (window.innerWidth < 760 || !sectionRef.current) return;

        const rect = sectionRef.current.getBoundingClientRect();
        const distanceScrolled = Math.max(0, -rect.top);
        const stepDistance = (STEP_VH / 100) * window.innerHeight;
        const stepIndex = Math.floor(distanceScrolled / stepDistance);
        setActive(Math.min(STEPS.length - 1, stepIndex));
      });
    };

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      if (frame !== null) window.cancelAnimationFrame(frame);
    };
  }, []);

  const selectStep = (index) => {
    setActive(index);
    if (window.innerWidth < 760 || !sectionRef.current) return;

    const rect = sectionRef.current.getBoundingClientRect();
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    window.scrollTo({
      top:
        rect.top +
        window.scrollY +
        index * (STEP_VH / 100) * window.innerHeight +
        1,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  };

  return (
    <section
      className="how-scroll"
      id="how"
      ref={sectionRef}
      style={{
        "--steps": STEPS.length,
        "--scroll-runway": `${STEP_VH * (STEPS.length - 1)}vh`,
      }}
    >
      <div className="how-scroll__sticky">
        <div className="wrap how">
          <div className="how__list">
            <p className="kicker">How it works</p>
            <h2>Four steps from scan to sorted.</h2>
            <ol>
              {STEPS.map((s, i) => (
                <li key={s.title}>
                  <button
                    type="button"
                    className={i === active ? "is-active" : ""}
                    aria-pressed={i === active}
                    onClick={() => selectStep(i)}
                  >
                    <span className="num">{i + 1}</span>
                    <span>
                      <b>{s.title}</b>
                      <small>{s.text}</small>
                    </span>
                  </button>
                </li>
              ))}
            </ol>
            <div
              className="how__progress"
              role="progressbar"
              aria-label="How it works progress"
              aria-valuemin={1}
              aria-valuemax={STEPS.length}
              aria-valuenow={active + 1}
            >
              <span
                style={{ width: `${((active + 1) / STEPS.length) * 100}%` }}
              />
            </div>
          </div>
          <div className="how__stage">
            <div className="stage__bg" />
            <Phone screen={active} />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Bento ---------- */
function Mini({ id }) {
  if (id === "route")
    return (
      <div className="mini mini--route">
        <div className="basket">
          Basket<b>4 items</b>
        </div>
        <span className="arrow">→</span>
        <div className="lanes">
          <span className="lane lane--k">Counter · 2</span>
          <span className="lane lane--g">Stylist · 1</span>
          <span className="lane lane--b">Service desk · 1</span>
        </div>
      </div>
    );
  if (id === "pay")
    return (
      <div className="mini mini--pay">
        <b>0%</b>
        <small>taken from your sales</small>
      </div>
    );
  if (id === "ai")
    return (
      <div className="mini mini--ai">
        <div className="paper">
          <i />
          <i />
          <i />
        </div>
        <span>→</span>
        <div className="digital">
          <i />
          <i />
          <i />
        </div>
      </div>
    );
  if (id === "hotel")
    return (
      <div className="mini mini--hotel">
        <span>Customer request</span>
        <b>In progress</b>
      </div>
    );
  return (
    <div className="mini mini--delivery">
      <span>🛵</span>
      <small>Your store link</small>
    </div>
  );
}

function Bento() {
  return (
    <section className="section section--dark" id="features">
      <div className="wrap feat">
        <div className="feat__intro">
          <p className="kicker kicker--light">Features</p>
          <h2>Everything your business needs to meet customers online.</h2>
          <p>
            Give customers one place to find what you offer, make a request and
            follow its progress.
          </p>
          <a className="btn btn--tomato" href="/signup">
            Get started
          </a>
        </div>
        <div className="feat__list">
          {FEATURES.map((feature, index) => (
            <article className="feat__row" key={feature.id}>
              <span className="feat__num">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="feat__text">
                <h3>{feature.title}</h3>
                <p>{feature.text}</p>
              </div>
              <div className="feat__visual">
                <Mini id={feature.id} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Numbers band ---------- */
function Band() {
  return (
    <section className="band">
      <div className="wrap band__grid">
        <div>
          <b>0</b>
          <span>apps for customers to download</span>
        </div>
        <div>
          <b>1</b>
          <span>scan to reach your business page</span>
        </div>
        <div>
          <b>100%</b>
          <span>of payments go to your business</span>
        </div>
      </div>
    </section>
  );
}

/* ---------- Pricing and billing ---------- */
function Pricing() {
  const [cycle, setCycle] = useState("monthly");
  const selectedCycle = BILLING_CYCLES.find((item) => item.id === cycle);
  const formatNaira = (amount) =>
    `₦${Math.round(amount).toLocaleString("en-NG")}`;

  return (
    <section className="section pricing" id="pricing">
      <div className="wrap">
        <div className="pricing__heading">
          <p className="kicker">Simple pricing</p>
          <h2>
            Start simple. Serve customers your way. Grow when you're ready.
          </h2>
          <p>
            14 days free with every feature, no card required. Cancel or switch
            plans any time.
          </p>
        </div>

        <div
          className="pricing__toggle"
          role="group"
          aria-label="Billing frequency"
        >
          {BILLING_CYCLES.map((item) => (
            <button
              key={item.id}
              type="button"
              className={cycle === item.id ? "is-active" : ""}
              aria-pressed={cycle === item.id}
              onClick={() => setCycle(item.id)}
            >
              {item.label}
              {item.badge && <span>{item.badge}</span>}
            </button>
          ))}
        </div>

        <div className="price-grid">
          {BILLING_PLANS.map((plan) => {
            const price = plan.monthlyPrice * (1 - selectedCycle.discount);
            return (
              <article
                className={`price-card ${plan.popular ? "price-card--popular" : ""}`}
                key={plan.name}
              >
                {plan.popular && (
                  <span className="popular-tag">Most popular</span>
                )}
                <h3>{plan.name}</h3>
                <p className="price-card__description">{plan.description}</p>
                <p className="price-amount">
                  {formatNaira(price)}
                  <span>/month</span>
                </p>
                <p className="price-save">
                  {selectedCycle.discount
                    ? `Save ${formatNaira(plan.monthlyPrice * selectedCycle.discount)} per month`
                    : "Billed monthly"}
                </p>
                <ul>
                  {plan.features.map((feature) => (
                    <li key={feature}>
                      <span className="price-check" aria-hidden="true">
                        ✓
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <a
                  href="/signup/"
                  className={`btn price-card__button ${plan.popular ? "btn--tomato" : "btn--outline"}`}
                >
                  Start free trial
                </a>
              </article>
            );
          })}
        </div>

        <div className="pricing-bands">
          <article className="pricing-band pricing-band--store">
            <div>
              <h3>Just need a simple business page?</h3>
              <p>
                For small businesses: your own page for products or services,
                with a simple way for customers to reach you. 14 days free, then
                ₦5,500 a month.
              </p>
            </div>
            <a className="btn btn--dark" href="/sell/">
              Create your page
            </a>
          </article>
          <article className="pricing-band pricing-band--enterprise">
            <div>
              <h3>Running a chain or need something custom?</h3>
              <p>
                Have a larger business or a specific setup in mind? Let's talk.
              </p>
            </div>
            <a
              className="btn pricing-band__contact"
              href="mailto:hello@chopfast.co?subject=ChopFast%20Enterprise"
            >
              Contact sales
            </a>
          </article>
        </div>
      </div>
    </section>
  );
}

/* ---------- FAQ ---------- */
function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section className="section" id="faq">
      <div className="wrap faq">
        <div>
          <p className="kicker">FAQ</p>
          <h2>Good questions, short answers.</h2>
        </div>
        <div className="faq__list">
          {FAQ.map((item, i) => (
            <div className={`qa ${open === i ? "is-open" : ""}`} key={item.q}>
              <button onClick={() => setOpen(open === i ? -1 : i)}>
                {item.q} <span>{open === i ? "–" : "+"}</span>
              </button>
              {open === i && <p>{item.a}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Cta() {
  return (
    <section className="wrap">
      <div className="cta">
        <h2>Put your business one scan away.</h2>
        <p>Give customers a direct way to find you, order or make a request.</p>
        <a href="/signup" className="btn btn--tomato btn--lg">
          Get your business page
        </a>
      </div>
    </section>
  );
}

function PhoneIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="22"
      height="22"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="22"
      height="22"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.5z" />
    </svg>
  );
}

function Support() {
  return (
    <section className="wrap" aria-labelledby="support-title">
      <div className="support">
        <div className="support__copy">
          <p className="kicker">Setup and support</p>
          <h3 id="support-title">Need a hand getting set up?</h3>
          <p>
            Talk to a real person about adding your items or services, creating
            your QR codes, taking payments, or anything that isn't working.
          </p>
        </div>
        <div className="support__actions">
          <a
            className="support__btn support__btn--call"
            href={`tel:${digits(SUPPORT_PHONE)}`}
          >
            <PhoneIcon />
            <span>
              <small>Call us</small>
              <b>{SUPPORT_PHONE}</b>
            </span>
          </a>
          <a
            className="support__btn support__btn--chat"
            href={`https://wa.me/${digits(SUPPORT_WHATSAPP).replace("+", "")}`}
            target="_blank"
            rel="noreferrer"
          >
            <ChatIcon />
            <span>
              <small>WhatsApp us</small>
              <b>{SUPPORT_WHATSAPP}</b>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer__top">
        <div className="footer__brand">
          <a href="#" className="logo">
            <span className="logo__dot" /> {BRAND}
          </a>
          <p>
            One QR code takes customers straight to your business to order, book
            and pay. No app to download.
          </p>
        </div>

        {FOOTER_COLS.map((col) => (
          <nav className="footer__col" key={col.title} aria-label={col.title}>
            <h4>{col.title}</h4>
            <ul>
              {col.links.map(([label, href]) => (
                <li key={label}>
                  <a href={href}>{label}</a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="wrap footer__bottom">
        <small>
          © {new Date().getFullYear()} {BRAND}. All rights reserved.
        </small>
        <small>Scan. Order. Done.</small>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <How />
        <Bento />
        <Band />
        <Pricing />
        <Faq />
        <Cta />
        <Support />
      </main>
      <Footer />
    </>
  );
}
