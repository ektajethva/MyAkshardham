import { useState } from "react";
import { Heart, IndianRupee, CheckCircle2, Sparkles } from "lucide-react";
import { Progress } from "../components/ui/progress";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import axios from "axios";

const presetAmounts = [101, 251, 501, 1001, 2501, 5001];
const goalAmount = 500000;
const collectedAmount = 327500;



export default function DonationPage() {
  const [selected, setSelected] = useState(501);
  const [custom, setCustom] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const amount = custom ? Number(custom) : selected || 0;
  const progress = Math.min((collectedAmount / goalAmount) * 100, 100);

  const handlePayment = async () => {

  const options = {
    key: import.meta.env.VITE_RAZORPAY_KEY_ID, 
    amount: amount * 100,
    currency: "INR",
    name: "Temple Donation",
    description: "Donation Payment",
    
    handler: async function (response) {
      try {
          const user = JSON.parse(localStorage.getItem("user"));

          console.log("Payment Success:", response);

          // ✅ Save donation in DB
          await axios.post("http://localhost:5000/payment/addDonation", {
            amount: amount,
            method: "Razorpay",
            date: new Date().toISOString(),
            user_id: user?.user_id || null,
            payment_id: response.razorpay_payment_id,
            donor_name: name,
            email: email,
            phone: phone
          });

          alert("✅ Payment Successful! Thank you for your donation ❤️");

        } catch (error) {
          console.log("Error saving donation:", error);
          alert("Payment successful but failed to save data.");
        }
    },

    prefill: {
      name: name,
      email: email,
      contact: phone
    },

    theme: {
      color: "#f97316"
    }
  };

  const rzp = new window.Razorpay(options);
  rzp.open();
};



  return (
    <div className="container mx-auto px-4 py-10 max-w-xl">
      {/* Header */}
      <div className="text-center mb-8 animate-fade-in">
        <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-primary/10 mb-4">
          <Heart className="h-7 w-7 text-primary" />
        </div>
        <h1 className="font-heading text-3xl font-bold text-foreground mb-2">Financial Donation</h1>
        <p className="text-muted-foreground">Support the temple and its divine mission</p>
      </div>

      {/* Live progress card */}
      <div className="bg-card rounded-2xl border border-border shadow-card p-6 mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="h-4 w-4 text-primary" />
          <span className="text-sm font-semibold text-foreground">Live Donation Progress</span>
        </div>
        <Progress value={progress} className="h-3 mb-3" />
        <div className="flex items-center justify-between">
          <div>
            <span className="text-primary font-bold text-xl">₹{collectedAmount.toLocaleString("en-IN")}</span>
            <span className="text-muted-foreground text-sm ml-1">raised</span>
          </div>
          <div className="text-right">
            <span className="text-muted-foreground text-xs">Goal</span>
            <span className="text-foreground font-semibold text-sm ml-1">₹{goalAmount.toLocaleString("en-IN")}</span>
          </div>
        </div>
        <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
          <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
          <span>142 devotees have donated this month</span>
        </div>
      </div>

      {/* Donation form */}
      <form
        className="bg-card rounded-2xl border border-border shadow-card p-6 space-y-6 animate-fade-in"
        style={{ animationDelay: "0.2s" }}
        onSubmit={(e) => e.preventDefault()}
      >
        {/* Preset amounts */}
        <div>
          <Label className="mb-3 block text-foreground font-semibold">Select Amount (₹)</Label>
          <div className="grid grid-cols-3 gap-2.5">
            {presetAmounts.map((a) => (
              <button
                key={a}
                type="button"
                onClick={() => { setSelected(a); setCustom(""); }}
                className={`rounded-xl border-2 py-3.5 text-sm font-bold transition-all duration-200 ${
                  selected === a && !custom
                    ? "bg-primary text-primary-foreground border-primary shadow-saffron scale-[1.03]"
                    : "bg-background text-foreground border-border hover:border-primary/50 hover:shadow-sm"
                }`}
              >
                ₹{a.toLocaleString("en-IN")}
              </button>
            ))}
          </div>
        </div>

        {/* Custom amount */}
        <div>
          <Label htmlFor="custom" className="text-foreground font-semibold">Or Enter Custom Amount (₹)</Label>
          <div className="relative mt-1.5">
            <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="custom"
              type="number"
              min={1}
              placeholder="e.g. 1100"
              value={custom}
              onChange={(e) => { setCustom(e.target.value); setSelected(null); }}
              className="pl-9"
            />
          </div>
        </div>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
          <div className="relative flex justify-center"><span className="bg-card px-3 text-xs text-muted-foreground">Your Details</span></div>
        </div>

        {/* User details */}
        <div className="space-y-4">
          <div>
            <Label htmlFor="name" className="text-foreground">Full Name</Label>
            <Input id="name" placeholder="Enter your full name" value={name} onChange={(e) => setName(e.target.value)} className="mt-1.5" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="email" className="text-foreground">Email</Label>
              <Input id="email" type="email" placeholder="you@email.com" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="phone" className="text-foreground">Phone</Label>
              <Input id="phone" type="tel" placeholder="98XXXXXXXX" value={phone} onChange={(e) => setPhone(e.target.value)} className="mt-1.5" />
            </div>
          </div>
        </div>

        {/* Pay button */}
        <Button className="w-full h-12 text-base font-semibold shadow-saffron" size="lg" disabled={!amount || amount <= 0} onClick={handlePayment}>
          <Heart className="h-5 w-5 mr-2" />
          Donate {amount > 0 ? `₹${amount.toLocaleString("en-IN")}` : ""}
        </Button>

        <p className="text-xs text-center text-muted-foreground leading-relaxed">
          Your donation is tax-deductible under Section 80G.<br />A receipt will be emailed to you.
        </p>
      </form>
    </div>
  );
}