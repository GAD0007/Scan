import React, { useEffect, useRef, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Icon } from "./Icons";
import jollofRiceImage from "./assets/menu/jollof-rice.jpg";
import grilledChickenImage from "./assets/menu/grilled-chicken.jpg";
import chapmanImage from "./assets/menu/chapman.jpg";
import zoboImage from "./assets/menu/zobo.jpg";
import puffPuffImage from "./assets/menu/puff-puff.jpg";
import "./BusinessDashboard.css";

const STATIONS = ["Kitchen", "Bar", "Counter"];
const NAV = [
  ["orders", "Live orders", "orders"],
  ["catalogue", "Catalogue", "catalogue"],
  ["qr", "QR codes", "qr"],
  ["payments", "Payments", "payments"],
  ["reports", "Reports", "reports"],
  ["team", "Team", "team"],
  ["settings", "Settings", "settings"],
];
const COLS = [
  ["new", "New"],
  ["preparing", "Preparing"],
  ["ready", "Ready"],
  ["done", "Done"],
];
const NEXT = {
  preparing: ["ready", "Mark ready"],
  ready: ["done", "Mark done"],
};
const naira = (amount) => `\u20A6${amount.toLocaleString("en-NG")}`;
const minutesAgo = (time) => Math.floor((Date.now() - time) / 60000);

const seedOrders = [
  {
    id: 1041,
    loc: "Table 5",
    items: ["2\u00D7 Jollof rice", "1\u00D7 Chapman"],
    station: "Kitchen",
    pay: "paid",
    method: "Paystack",
    status: "new",
    t: Date.now() - 2 * 60000,
    total: 7500,
  },
  {
    id: 1040,
    loc: "Counter",
    items: ["1\u00D7 Zobo", "1\u00D7 Puff puff"],
    station: "Bar",
    pay: "unpaid",
    method: "Cash",
    status: "preparing",
    t: Date.now() - 9 * 60000,
    total: 3200,
  },
  {
    id: 1039,
    loc: "Table 2",
    items: ["1\u00D7 Grilled chicken", "1\u00D7 Fries"],
    station: "Kitchen",
    pay: "paid",
    method: "Monnify",
    status: "ready",
    t: Date.now() - 14 * 60000,
    total: 6800,
  },
  {
    id: 1038,
    loc: "Table 8",
    items: ["3\u00D7 Suya"],
    station: "Kitchen",
    pay: "paid",
    method: "Paystack",
    status: "done",
    t: Date.now() - 32 * 60000,
    total: 9000,
  },
];
const sampleNewOrders = [
  {
    loc: "Table 3",
    items: ["1\u00D7 Fried rice", "2\u00D7 Malt"],
    station: "Kitchen",
    method: "POS",
    total: 5400,
  },
  {
    loc: "Room 4",
    items: ["2\u00D7 Chapman"],
    station: "Bar",
    method: "Paystack",
    total: 3000,
  },
  {
    loc: "Counter",
    items: ["1\u00D7 Meat pie"],
    station: "Counter",
    method: "Cash",
    total: 1200,
  },
];
const seedItems = [
  {
    id: 1,
    name: "Jollof rice",
    cat: "Meals",
    price: 2500,
    image: jollofRiceImage,
    sold: false,
    addons: ["Extra chicken", "Plantain"],
  },
  {
    id: 2,
    name: "Grilled chicken",
    cat: "Meals",
    price: 4000,
    image: grilledChickenImage,
    sold: false,
    addons: ["Pepper sauce"],
  },
  {
    id: 3,
    name: "Chapman",
    cat: "Drinks",
    price: 1500,
    image: chapmanImage,
    sold: false,
    addons: [],
  },
  {
    id: 4,
    name: "Zobo",
    cat: "Drinks",
    price: 1000,
    image: zoboImage,
    sold: true,
    addons: [],
  },
  {
    id: 5,
    name: "Puff puff",
    cat: "Sides",
    price: 700,
    image: puffPuffImage,
    sold: false,
    addons: [],
  },
];
const seedStaff = [
  { id: 1, name: "Amaka Obi", role: "Owner", station: "All" },
  { id: 2, name: "Tunde Bello", role: "Manager", station: "All" },
  { id: 3, name: "Ife Daniels", role: "Staff", station: "Kitchen" },
];

function Toggle({ on, onChange, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      className={`bd-toggle${on ? " is-on" : ""}`}
      onClick={() => onChange(!on)}
    >
      <i />
    </button>
  );
}

function Orders({ orders, setOrders, open, sound, setSound }) {
  const [station, setStation] = useState("All");
  const [activeStatus, setActiveStatus] = useState("new");
  const [, tick] = useState(0);
  const nextId = useRef(0);
  useEffect(() => {
    const timer = window.setInterval(() => tick((value) => value + 1), 30000);
    return () => window.clearInterval(timer);
  }, []);
  const move = (id, status) =>
    setOrders((current) =>
      current.map((order) => (order.id === id ? { ...order, status } : order)),
    );
  const reject = (id) =>
    setOrders((current) => current.filter((order) => order.id !== id));
  const markPaid = (id) =>
    setOrders((current) =>
      current.map((order) =>
        order.id === id ? { ...order, pay: "paid" } : order,
      ),
    );
  const addOrder = () => {
    const sample = sampleNewOrders[nextId.current++ % sampleNewOrders.length];
    setOrders((current) => [
      {
        ...sample,
        id: Math.max(0, ...current.map((order) => order.id)) + 1,
        pay:
          sample.method === "Cash" || sample.method === "POS"
            ? "unpaid"
            : "paid",
        status: "new",
        t: Date.now(),
      },
      ...current,
    ]);
    if (sound) playOrderSound();
  };
  const filteredOrders = orders.filter(
    (order) => station === "All" || order.station === station,
  );
  const statusCounts = Object.fromEntries(
    COLS.map(([key]) => [
      key,
      filteredOrders.filter((order) => order.status === key).length,
    ]),
  );

  return (
    <>
      <div className="bd-toolbar">
        <div className="bd-chips">
          {["All", ...STATIONS].map((item) => (
            <button
              type="button"
              key={item}
              className={`bd-chip${station === item ? " is-on" : ""}`}
              onClick={() => setStation(item)}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="bd-toolbar-actions">
          <button
            type="button"
            className="bd-ghost"
            onClick={() => setSound(!sound)}
          >
            <Icon name={sound ? "bell" : "bellOff"} size={16} />
            {sound ? "Sound on" : "Sound off"}
          </button>
          <button
            type="button"
            className="bd-button"
            onClick={addOrder}
            disabled={!open}
          >
            Add test order
          </button>
        </div>
      </div>
      {!open && (
        <p className="bd-note">
          Ordering is paused. Customers can&rsquo;t place new orders until you
          switch to Open.
        </p>
      )}
      <div className="bd-status-tabs" role="tablist" aria-label="Order status">
        {COLS.map(([key, title]) => (
          <button
            type="button"
            role="tab"
            aria-selected={activeStatus === key}
            key={key}
            className={`bd-status-tab status-${key}${activeStatus === key ? " is-on" : ""}`}
            onClick={() => setActiveStatus(key)}
          >
            <span>{title}</span>
            <b>{statusCounts[key]}</b>
          </button>
        ))}
      </div>
      <div className="bd-board">
        {COLS.map(([key, title]) => {
          const list = filteredOrders
            .filter((order) => order.status === key)
            .sort((a, b) => b.t - a.t);
          return (
            <section
              key={key}
              className={`bd-column status-${key}${activeStatus === key ? " is-mobile-active" : ""}`}
              aria-label={`${title} orders`}
            >
              <h3>
                <span className="bd-status-heading">
                  <i aria-hidden="true" />
                  {title}
                </span>
                <span className="bd-count">{list.length}</span>
              </h3>
              {list.length === 0 && (
                <p className="bd-empty">No {title.toLowerCase()} orders.</p>
              )}
              {list.map((order) => {
                const elapsed = minutesAgo(order.t);
                return (
                  <article
                    key={order.id}
                    className={`bd-order${key === "new" ? " is-fresh" : ""}`}
                  >
                    <header>
                      <b>#{order.id}</b>
                      <span className="bd-location">
                        <Icon name="pin" size={14} /> {order.loc}
                      </span>
                      <span
                        className={`bd-wait${elapsed >= 10 && key !== "done" ? " is-late" : ""}`}
                      >
                        {elapsed} min
                      </span>
                    </header>
                    <ul>
                      {order.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                    <footer>
                      <span className={`bd-pill ${order.pay}`}>
                        {order.pay === "paid"
                          ? `Paid \u00B7 ${order.method}`
                          : `Unpaid \u00B7 ${order.method}`}
                      </span>
                      <span className="bd-station">{order.station}</span>
                    </footer>
                    {key === "new" && (
                      <div className="bd-order-actions">
                        <button
                          type="button"
                          className="bd-button"
                          onClick={() => move(order.id, "preparing")}
                        >
                          Accept
                        </button>
                        <button
                          type="button"
                          className="bd-ghost"
                          onClick={() => reject(order.id)}
                        >
                          Reject
                        </button>
                      </div>
                    )}
                    {NEXT[key] && (
                      <div className="bd-order-actions">
                        <button
                          type="button"
                          className="bd-button"
                          onClick={() => move(order.id, NEXT[key][0])}
                        >
                          {NEXT[key][1]}
                        </button>
                        {order.pay === "unpaid" && (
                          <button
                            type="button"
                            className="bd-ghost"
                            onClick={() => markPaid(order.id)}
                          >
                            Mark paid
                          </button>
                        )}
                      </div>
                    )}
                  </article>
                );
              })}
            </section>
          );
        })}
      </div>
    </>
  );
}

function Catalogue({ items, setItems }) {
  const [category, setCategory] = useState("All");
  const [message, setMessage] = useState("");
  const categories = ["All", ...new Set(items.map((item) => item.cat))];
  const updateItem = (id, patch) =>
    setItems((current) =>
      current.map((item) => (item.id === id ? { ...item, ...patch } : item)),
    );
  const importPhoto = (event) => {
    if (!event.target.files?.[0]) return;
    setMessage("Reading your menu photo\u2026");
    window.setTimeout(() => {
      setItems((current) => [
        ...current,
        ...["Fried rice", "Suya", "Malt"].map((name, index) => ({
          id: Date.now() + index,
          name,
          cat: "Imported",
          price: 0,
          image: [jollofRiceImage, grilledChickenImage, chapmanImage][index],
          sold: false,
          addons: [],
          review: true,
        })),
      ]);
      setMessage("3 sample items added. Add prices to finish.");
    }, 500);
  };
  return (
    <>
      <div className="bd-toolbar">
        <div className="bd-chips">
          {categories.map((categoryName) => (
            <button
              type="button"
              key={categoryName}
              className={`bd-chip${category === categoryName ? " is-on" : ""}`}
              onClick={() => setCategory(categoryName)}
            >
              {categoryName}
            </button>
          ))}
        </div>
        <label className="bd-button">
          Import from photo
          <input type="file" accept="image/*" hidden onChange={importPhoto} />
        </label>
      </div>
      {message && (
        <p className="bd-note" role="status">
          {message}
        </p>
      )}
      <div className="bd-list">
        {items
          .filter((item) => category === "All" || item.cat === category)
          .map((item) => (
            <div
              key={item.id}
              className={`bd-item${item.sold ? " is-sold" : ""}`}
            >
              <div className="bd-product-icon">
                <img src={item.image} alt="" />
              </div>
              <div className="bd-grow">
                <b>{item.name}</b>
                <small>
                  {item.cat}
                  {item.addons.length
                    ? ` \u00B7 Add-ons: ${item.addons.join(", ")}`
                    : ""}
                </small>
                <label className="bd-price-label">
                  Price
                  <input
                    className="bd-price"
                    type="number"
                    min="0"
                    value={item.price}
                    onChange={(event) =>
                      updateItem(item.id, { price: Number(event.target.value) })
                    }
                  />
                </label>
              </div>
              <label className="bd-switch-row">
                <span>{item.sold ? "Sold out" : "Available"}</span>
                <Toggle
                  on={!item.sold}
                  onChange={(value) => updateItem(item.id, { sold: !value })}
                  label={`Availability of ${item.name}`}
                />
              </label>
            </div>
          ))}
      </div>
    </>
  );
}

function QRCodes({ codes, setCodes }) {
  const [label, setLabel] = useState("");
  const addCode = () => {
    if (label.trim()) {
      setCodes((current) => [
        ...current,
        { id: Date.now(), label: label.trim() },
      ]);
      setLabel("");
    }
  };
  return (
    <>
      <div className="bd-toolbar">
        <div className="bd-toolbar-row">
          <input
            value={label}
            onChange={(event) => setLabel(event.target.value)}
            onKeyDown={(event) => event.key === "Enter" && addCode()}
            placeholder="Label, for example Table 6 or Room 2"
          />
          <button type="button" className="bd-button" onClick={addCode}>
            Create code
          </button>
        </div>
        <button
          type="button"
          className="bd-ghost"
          onClick={() => window.print()}
        >
          Print QR codes
        </button>
      </div>
      <div className="bd-qr-grid">
        {codes.map((code) => (
          <figure key={code.id}>
            <QRCodeSVG
              value={`https://scanserve.app/m/your-business?c=${encodeURIComponent(code.label)}`}
              size={140}
            />
            <figcaption>{code.label}</figcaption>
            <button
              type="button"
              className="bd-remove"
              onClick={() =>
                setCodes((current) =>
                  current.filter((item) => item.id !== code.id),
                )
              }
              aria-label={`Remove ${code.label}`}
            >
              Remove
            </button>
          </figure>
        ))}
      </div>
    </>
  );
}

function Payments({ orders, setOrders }) {
  const [providers, setProviders] = useState({
    Paystack: true,
    Monnify: false,
  });
  return (
    <>
      <div className="bd-cards-two">
        {Object.keys(providers).map((provider) => (
          <div key={provider} className="bd-card">
            <b>{provider}</b>
            <small>
              {providers[provider]
                ? "Sample connected state. Configure this with your payment provider."
                : "Not connected in this demo."}
            </small>
            <button
              type="button"
              className={providers[provider] ? "bd-ghost" : "bd-button"}
              onClick={() =>
                setProviders((current) => ({
                  ...current,
                  [provider]: !current[provider],
                }))
              }
            >
              {providers[provider] ? "Disconnect" : `Connect ${provider}`}
            </button>
          </div>
        ))}
      </div>
      <h3 className="bd-section-title">Transactions</h3>
      <div className="bd-list">
        {orders.map((order) => (
          <div key={order.id} className="bd-item">
            <div className="bd-grow">
              <b>
                #{order.id} &middot; {order.loc}
              </b>
              <small>{order.method}</small>
            </div>
            <b>{naira(order.total)}</b>
            {order.pay === "paid" ? (
              <span className="bd-pill paid">Paid</span>
            ) : (
              <button
                type="button"
                className="bd-button"
                onClick={() =>
                  setOrders((current) =>
                    current.map((item) =>
                      item.id === order.id ? { ...item, pay: "paid" } : item,
                    ),
                  )
                }
              >
                Mark paid
              </button>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

function Reports({ orders }) {
  const sales = orders
    .filter((order) => order.pay === "paid")
    .reduce((sum, order) => sum + order.total, 0);
  const topItems = [
    ["Jollof rice", 18],
    ["Chapman", 14],
    ["Suya", 11],
    ["Puff puff", 9],
  ];
  const hours = [
    ["10", 3],
    ["11", 6],
    ["12", 14],
    ["13", 12],
    ["14", 7],
    ["15", 4],
    ["16", 5],
    ["17", 9],
    ["18", 13],
    ["19", 10],
  ];
  return (
    <>
      <div className="bd-cards-three">
        <div className="bd-card">
          <small>Today&rsquo;s sales</small>
          <strong>{naira(sales)}</strong>
        </div>
        <div className="bd-card">
          <small>Orders</small>
          <strong>{orders.length}</strong>
        </div>
        <div className="bd-card">
          <small>Average order</small>
          <strong>
            {naira(
              Math.round(
                orders.reduce((sum, order) => sum + order.total, 0) /
                  Math.max(orders.length, 1),
              ),
            )}
          </strong>
        </div>
      </div>
      <div className="bd-cards-two">
        <div className="bd-card">
          <h3 className="bd-section-title">Top items</h3>
          {topItems.map(([name, count]) => (
            <div key={name} className="bd-horizontal-bar">
              <span>{name}</span>
              <i style={{ width: `${count * 5}%` }} />
              <em>{count}</em>
            </div>
          ))}
        </div>
        <div className="bd-card">
          <h3 className="bd-section-title">Busy hours</h3>
          <div className="bd-vertical-bars">
            {hours.map(([hour, count]) => (
              <div key={hour}>
                <i style={{ height: count * 8 }} />
                <small>{hour}h</small>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

function Team({ staff, setStaff }) {
  const [name, setName] = useState("");
  const addStaff = () => {
    if (name.trim()) {
      setStaff((current) => [
        ...current,
        {
          id: Date.now(),
          name: name.trim(),
          role: "Staff",
          station: "Kitchen",
        },
      ]);
      setName("");
    }
  };
  return (
    <>
      <div className="bd-toolbar">
        <div className="bd-toolbar-row">
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            onKeyDown={(event) => event.key === "Enter" && addStaff()}
            placeholder="Name of new team member"
          />
          <button type="button" className="bd-button" onClick={addStaff}>
            Add member
          </button>
        </div>
      </div>
      <div className="bd-list">
        {staff.map((member) => (
          <div key={member.id} className="bd-item">
            <div className="bd-product-icon">{member.name[0]}</div>
            <div className="bd-grow">
              <b>{member.name}</b>
              <small>
                Access:{" "}
                {member.station === "All" ? "All stations" : member.station}
              </small>
            </div>
            <label className="bd-select-label">
              Role
              <select
                value={member.role}
                onChange={(event) =>
                  setStaff((current) =>
                    current.map((item) =>
                      item.id === member.id
                        ? { ...item, role: event.target.value }
                        : item,
                    ),
                  )
                }
              >
                {["Owner", "Manager", "Staff"].map((role) => (
                  <option key={role}>{role}</option>
                ))}
              </select>
            </label>
            <label className="bd-select-label">
              Station
              <select
                value={member.station}
                onChange={(event) =>
                  setStaff((current) =>
                    current.map((item) =>
                      item.id === member.id
                        ? { ...item, station: event.target.value }
                        : item,
                    ),
                  )
                }
              >
                {["All", ...STATIONS].map((station) => (
                  <option key={station}>{station}</option>
                ))}
              </select>
            </label>
          </div>
        ))}
      </div>
    </>
  );
}

function Settings({ name, setName, accent, setAccent }) {
  const [pickup, setPickup] = useState(true);
  const [delivery, setDelivery] = useState(false);
  return (
    <div className="bd-cards-two">
      <div className="bd-card bd-form">
        <h3 className="bd-section-title">Business profile</h3>
        <label>
          Business name
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </label>
        <label>
          Opens
          <input type="time" defaultValue="09:00" />
        </label>
        <label>
          Closes
          <input type="time" defaultValue="21:00" />
        </label>
        <label>
          Logo
          <input type="file" accept="image/*" />
        </label>
        <label>
          Customer page color
          <input
            type="color"
            value={accent}
            onChange={(event) => setAccent(event.target.value)}
          />
        </label>
        <label className="bd-switch-row">
          Pickup
          <Toggle on={pickup} onChange={setPickup} label="Pickup" />
        </label>
        <label className="bd-switch-row">
          Delivery
          <Toggle on={delivery} onChange={setDelivery} label="Delivery" />
        </label>
        <button
          type="button"
          className="bd-button"
          onClick={() => window.alert("Settings are a local demo right now.")}
        >
          Save changes
        </button>
      </div>
      <div className="bd-card">
        <h3 className="bd-section-title">Customer page preview</h3>
        <div className="bd-preview" style={{ background: accent }}>
          <b>{name}</b>
          <span>Scan, order, pay.</span>
          <button type="button">View page</button>
        </div>
      </div>
    </div>
  );
}

function playOrderSound() {
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    const context = new AudioContextClass();
    [660, 880].forEach((frequency, index) => {
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      const start = context.currentTime + index * 0.18;
      oscillator.frequency.value = frequency;
      oscillator.connect(gain);
      gain.connect(context.destination);
      gain.gain.setValueAtTime(0.2, start);
      gain.gain.exponentialRampToValueAtTime(0.001, start + 0.17);
      oscillator.start(start);
      oscillator.stop(start + 0.18);
    });
  } catch {
    // Browser audio may require a user gesture first.
  }
}

export default function BusinessDashboard() {
  const [page, setPage] = useState("orders");
  const [more, setMore] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [sound, setSound] = useState(true);
  const [name, setName] = useState("Mama Put Kitchen");
  const [accent, setAccent] = useState("#e8532b");
  const [orders, setOrders] = useState(seedOrders);
  const [items, setItems] = useState(seedItems);
  const [staff, setStaff] = useState(seedStaff);
  const [codes, setCodes] = useState([
    { id: 1, label: "Table 1" },
    { id: 2, label: "Table 5" },
    { id: 3, label: "Counter" },
  ]);
  const selectedNav = NAV.find((entry) => entry[0] === page);
  const title = selectedNav?.[1] ?? "Live orders";
  const newCount = orders.filter((order) => order.status === "new").length;
  const go = (id) => {
    setPage(id);
    setMore(false);
  };
  const logOut = () => {
    window.location.assign("/login");
  };

  return (
    <div className="bd">
      <aside className="bd-sidebar" aria-label="Business dashboard navigation">
        <a className="bd-logo" href="/">
          <i />
          ScanServe
        </a>
        <span className="bd-nav-label">Workspace</span>
        {NAV.map(([id, label, icon]) => (
          <button
            type="button"
            key={id}
            className={`bd-nav-item${page === id ? " is-on" : ""}`}
            onClick={() => go(id)}
          >
            <span>
              <Icon name={icon} />
            </span>
            {label}
            {id === "orders" && newCount > 0 && <em>{newCount}</em>}
          </button>
        ))}
        <button
          type="button"
          className="bd-nav-item bd-logout"
          onClick={logOut}
        >
          <span>
            <Icon name="logout" />
          </span>
          Log out
        </button>
        <div className="bd-sidebar-help">
          <span>Need a hand?</span>
          <b>Visit the help centre</b>
          <a href="mailto:hello@chopfast.co">Get support</a>
        </div>
      </aside>
      <div className="bd-main">
        <header className="bd-topbar">
          <div className="bd-top-copy">
            <b className="bd-business-name">{name}</b>
          </div>
          <div className="bd-top-actions">
            <button
              type="button"
              className="bd-icon-button"
              aria-label="Search"
            >
              <Icon name="search" size={18} />
            </button>
            <button
              type="button"
              className="bd-icon-button"
              aria-label="Notifications"
            >
              <Icon name="bell" size={18} />
            </button>
            <label className="bd-open-status">
              <span>{isOpen ? "Open" : "Closed"}</span>
              <Toggle
                on={isOpen}
                onChange={setIsOpen}
                label="Accepting orders"
              />
            </label>
            <span className="bd-avatar" aria-hidden="true">
              MP
            </span>
          </div>
        </header>
        <main className="bd-page">
          <h1>{title}</h1>
          {page === "orders" && (
            <Orders
              orders={orders}
              setOrders={setOrders}
              open={isOpen}
              sound={sound}
              setSound={setSound}
            />
          )}
          {page === "catalogue" && (
            <Catalogue items={items} setItems={setItems} />
          )}
          {page === "qr" && <QRCodes codes={codes} setCodes={setCodes} />}
          {page === "payments" && (
            <Payments orders={orders} setOrders={setOrders} />
          )}
          {page === "reports" && <Reports orders={orders} />}
          {page === "team" && <Team staff={staff} setStaff={setStaff} />}
          {page === "settings" && (
            <Settings
              name={name}
              setName={setName}
              accent={accent}
              setAccent={setAccent}
            />
          )}
        </main>
      </div>
      {more && (
        <div className="bd-more-sheet">
          {NAV.slice(4).map(([id, label, icon]) => (
            <button type="button" key={id} onClick={() => go(id)}>
              <span>
                <Icon name={icon} />
              </span>
              {label}
            </button>
          ))}
          <button type="button" className="bd-logout" onClick={logOut}>
            <span>
              <Icon name="logout" />
            </span>
            Log out
          </button>
        </div>
      )}
      <nav className="bd-mobile-tabs" aria-label="Dashboard sections">
        {NAV.slice(0, 4).map(([id, label, icon]) => (
          <button
            type="button"
            key={id}
            className={page === id ? "is-on" : ""}
            onClick={() => go(id)}
          >
            <span>
              <Icon name={icon} />
              {id === "orders" && newCount > 0 && <em>{newCount}</em>}
            </span>
            {label.replace("Live orders", "Orders")}
          </button>
        ))}
        <button
          type="button"
          className={
            NAV.slice(4).some((entry) => entry[0] === page) ? "is-on" : ""
          }
          onClick={() => setMore((value) => !value)}
        >
          <span>
            <Icon name="more" />
          </span>
          More
        </button>
      </nav>
    </div>
  );
}
