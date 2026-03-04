import { useState } from "react";
import { Heart, IndianRupee, CheckCircle2, Sparkles } from "lucide-react";
import "./DonationPage.css";

const presetAmounts = [101, 251, 501, 1001, 2501, 5001];
const goalAmount = 500000;
const collectedAmount = 327500;

function DonationPage() {
  const [selected, setSelected] = useState(501);
  const [custom, setCustom] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const amount = custom ? Number(custom) : selected || 0;
  const progress = Math.min((collectedAmount / goalAmount) * 100, 100);

  return (
    <div className="donation-container">

      {/* ===== HEADER ===== */}
      <div className="donation-header">
        <div className="icon-box">
          <Heart />
        </div>
        <h1> Donation</h1>
        <p>Support the temple and its divine mission</p>
      </div>

      {/* ===== PROGRESS BOX ===== */}
      <div className="progress-card">
        <div className="progress-title">
          <Sparkles />
          <span>Live Donation Progress</span>
        </div>

        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="progress-info">
          <div>
            <span className="raised">
              ₹{collectedAmount.toLocaleString("en-IN")}
            </span>
            <span className="small-text"> raised</span>
          </div>

          <div>
            <span className="small-text">Goal</span>
            <span className="goal">
              ₹{goalAmount.toLocaleString("en-IN")}
            </span>
          </div>
        </div>

        <div className="donor-count">
          <CheckCircle2 />
          <span>142 devotees have donated this month</span>
        </div>
      </div>

      {/* ===== FORM ===== */}
      <form className="donation-form" onSubmit={(e) => e.preventDefault()}>

        {/* ===== PRESET AMOUNTS ===== */}
        <div>
          <label className="section-label">Select Amount (₹)</label>

          <div className="amount-grid">
            {presetAmounts.map((a) => (
              <button
                key={a}
                type="button"
                className={`amount-btn ${
                  selected === a && !custom ? "active" : ""
                }`}
                onClick={() => {
                  setSelected(a);
                  setCustom("");
                }}
              >
                ₹{a.toLocaleString("en-IN")}
              </button>
            ))}
          </div>
        </div>

        {/* ===== CUSTOM AMOUNT ===== */}
        <div>
          <label className="section-label">
            Or Enter Custom Amount (₹)
          </label>

          <div className="input-wrapper">
            <IndianRupee />
            <input
              type="number"
              placeholder="e.g. 1100"
              value={custom}
              onChange={(e) => {
                setCustom(e.target.value);
                setSelected(null);
              }}
            />
          </div>
        </div>

        {/* ===== DIVIDER ===== */}
        <div className="divider">Your Details</div>

        {/* ===== USER INFO ===== */}
        <div className="form-group">
          <div>
            <label>Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="grid-two">
            <div>
              <label>Email</label>
              <input
                type="email"
                placeholder="you@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label>Phone</label>
              <input
                type="tel"
                placeholder="98XXXXXXXX"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* ===== BUTTON ===== */}
        <button
          className="donate-btn"
          disabled={!amount || amount <= 0}
        >
          <Heart />
          Donate {amount > 0 ? `₹${amount.toLocaleString("en-IN")}` : ""}
        </button>

        <p className="note">
          Your donation is tax-deductible under Section 80G.
          <br />
          A receipt will be emailed to you.
        </p>

      </form>
    </div>
  );
}

export default DonationPage;