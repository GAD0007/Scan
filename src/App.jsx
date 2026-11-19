import React, { useEffect, useRef, useState } from "react";
import cafeHeroImage from "./assets/hero/cafe-barista.jpg";
import restaurantHeroImage from "./assets/hero/restaurant.jpg";
import hotelHeroImage from "./assets/hero/hotel.jpg";
import retailHeroImage from "./assets/hero/retail.jpg";

const BRAND = "ScanServe";
// Replace these example contact numbers with confirmed support numbers.
const SUPPORT_PHONE = "+234 800 000 0000";
const SUPPORT_WHATSAPP = "+234 800 000 0001";
const digits = (value) => value.replace(/[^\d+]/g, "");

const NAV = [
  { label: "Industries", href: "#industries" },
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

const HERO_SLIDES = [
  {
    image: cafeHeroImage,
    category: "Cafés",
    name: "Sunday Coffee",
    alt: "Barista preparing coffee in a modern café",
  },
  {
    image: restaurantHeroImage,
    category: "Restaurants",
    name: "Pepper & Palm",
    alt: "Chef plating a meal in a welcoming restaurant",
  },
  {
    image: hotelHeroImage,
    category: "Hotels",
    name: "Azure Palm Hotel",
    alt: "Guest being welcomed at a boutique hotel reception",
  },
  {
    image: retailHeroImage,
    category: "Shops & retail",
    name: "Mode & Co.",
    alt: "Shop owner arranging products in a modern boutique",
  },
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
  const [activeSlide, setActiveSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  const slide = HERO_SLIDES[activeSlide];

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (paused || reduceMotion) return undefined;

    const timer = window.setInterval(
      () => setActiveSlide((current) => (current + 1) % HERO_SLIDES.length),
      5500,
    );
    return () => window.clearInterval(timer);
  }, [paused]);

  return (
    <section className="hero">
      <div className="wrap hero-showcase">
        <div className="hero-showcase__slides">
          {HERO_SLIDES.map((item, index) => (
            <img
              className="hero-showcase__image"
              data-active={activeSlide === index}
              src={item.image}
              alt={activeSlide === index ? item.alt : ""}
              fetchPriority={index === 0 ? "high" : "low"}
              key={item.name}
            />
          ))}
        </div>
        <div className="hero-showcase__shade" aria-hidden="true" />
        <div className="hero-showcase__copy">
          <h1>
            Your business,
            <br />
            <em>one scan away.</em>
          </h1>
          <p>
            Menus, products and services on one page. Let customers scan to
            browse, order or make a request.
          </p>
          <div className="hero-showcase__actions">
            <a className="hero-showcase__primary" href="/signup">
              Create your page <span aria-hidden="true">↗</span>
            </a>
            <a className="hero-showcase__secondary" href="/dashboard">
              Try the demo <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
        <div className="hero-showcase__business" aria-live="polite">
          <span>{slide.category}</span>
          <strong>{slide.name}</strong>
          <small>Sample business</small>
        </div>
        <button
          type="button"
          className="hero-showcase__pause"
          onClick={() => setPaused((value) => !value)}
          aria-label={paused ? "Play hero slideshow" : "Pause hero slideshow"}
        >
          {paused ? "▶" : "Ⅱ"}
        </button>
        <div className="hero-showcase__dots" aria-label="Business examples">
          {HERO_SLIDES.map((item, index) => (
            <button
              type="button"
              key={item.name}
              className={activeSlide === index ? "is-on" : ""}
              onClick={() => setActiveSlide(index)}
              aria-label={`Show ${item.category}`}
              aria-current={activeSlide === index ? "true" : undefined}
            />
          ))}
        </div>
      </div>
    </section>
  );
}



/* ---------- interactive industry previews ---------- */
const INDUSTRIES = [
  { id:"hotels", label:"Hotels", eyebrow:"Hotels", title:"Room services", name:"Azure Palm Hotel", demo:"Guest services", image:hotelHeroImage, text:"Let guests scan from their room to order food, request housekeeping or arrange transport.", action:"Review request", items:[["Breakfast in bed","Delivered to your room"],["Fresh towels","Housekeeping request"],["Airport transfer","Book a pickup"]] },
  { id:"restaurants", label:"Restaurants", eyebrow:"Restaurants", title:"Table menu", name:"Pepper & Palm", demo:"Table 04", image:restaurantHeroImage, text:"Show diners what’s cooking, with prices in one place. Guests can choose dishes and review the table’s order.", action:"Review order", items:[["Smoky jollof & chicken","₦6,500"],["Golden plantain","₦2,000"],["House zobo","₦1,500"]] },
  { id:"cafes", label:"Cafés", eyebrow:"Cafés", title:"Coffee menu", name:"Sunday Coffee", demo:"Counter menu", image:cafeHeroImage, text:"Customers can scan, choose a drink and prepare their pickup order before reaching the counter.", action:"Review order", items:[["Flat white","₦2,800"],["Cold brew","₦3,200"],["Banana loaf","₦2,100"]] },
  { id:"shops", label:"Shops", eyebrow:"Shops & retail", title:"Product catalogue", name:"Mode & Co.", demo:"Shop collection", image:retailHeroImage, text:"Turn shelves and displays into browsable product pages customers can scan, save and order from.", action:"Review basket", items:[["Leather carry bag","₦62,000"],["Everyday runners","₦39,500"],["Wireless headphones","₦48,500"]] },
  { id:"services", label:"Service businesses", eyebrow:"Service businesses", title:"Salon services", name:"June Hair Studio", demo:"Service directory", image:retailHeroImage, text:"Show clients the services you offer. They can choose what they need and prepare an enquiry before discussing dates and availability.", action:"Review enquiry", items:[["Styling consultation","30 minutes"],["Braiding appointment","Protective styling"],["Colour consultation","By appointment"]] },
];

function How() {
  const [industryId, setIndustryId] = useState("services");
  const [selected, setSelected] = useState([]);
  const [customItems, setCustomItems] = useState({});
  const industry = INDUSTRIES.find((item) => item.id === industryId);
  const listings = [...industry.items, ...(customItems[industryId] || [])];
  const chooseIndustry = (id) => { setIndustryId(id); setSelected([]); };
  const toggleItem = (name) => setSelected((current) => current.includes(name) ? current.filter((item) => item !== name) : [...current, name]);
  const addListing = (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = form.get("item").trim();
    const detail = form.get("detail").trim();
    if (!name || !detail) return;
    setCustomItems((current) => ({ ...current, [industryId]: [...(current[industryId] || []), [name, detail]] }));
    event.currentTarget.reset();
  };

  return (
    <section className="industries" id="industries">
      <div className="wrap">
        <header className="industries__heading">
          <h2>See it in <em>your business.</em></h2>
          <p>Choose your industry to try the page your customers would see.</p>
        </header>
        <div className="industries__tabs" role="group" aria-label="Choose a business type">
          {INDUSTRIES.map((item) => <button type="button" key={item.id} aria-pressed={industryId===item.id} onClick={()=>chooseIndustry(item.id)}>{item.label}</button>)}
        </div>
        <div className="industries__panel">
          <div className="industries__copy">
            <small>{industry.eyebrow}</small><h3>{industry.title}</h3><p>{industry.text}</p>
            <a href="/signup">Open customer demo <span aria-hidden="true">↗</span></a>
            <details className="industries__details">
              <summary>Try adding your own listing</summary>
              <form onSubmit={addListing}>
                <label>Business name<input maxLength="80" defaultValue={industry.name} name="businessName" /></label>
                <label>Product or service<input required maxLength="80" placeholder="e.g. Airport transfer" name="item" /></label>
                <label>Service details<input required maxLength="100" placeholder="e.g. 30 minutes or ₦5,000" name="detail" /></label>
                <button type="submit">Add to preview</button>
                <small role="status">Changes last until you refresh.</small>
              </form>
            </details>
          </div>
          <div className="industries__preview-wrap">
            <div className="customer-preview">
              <div className="customer-preview__cover" style={{backgroundImage:`linear-gradient(0deg,rgba(8,29,22,.88),transparent),url(${industry.image})`}}>
                <small>Demo · {industry.demo}</small><strong>{industry.name}</strong>
              </div>
              <div className="customer-preview__body"><h3>{industry.title}</h3>{listings.map(([name,detail])=><div className="customer-preview__item" key={name}><div><b>{name}</b><small>{detail}</small></div><button type="button" className={selected.includes(name)?"is-on":""} onClick={()=>toggleItem(name)} aria-label={`${selected.includes(name)?"Remove":"Select"} ${name}`}>{selected.includes(name)?"✓":"+"}</button></div>)}<button className="customer-preview__review">{industry.action}<span>{selected.length} selected</span></button></div>
            </div>
          </div>
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
       
        <How />
      
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
