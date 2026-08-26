import { useState } from "react";
import { LuArrowRight, LuCheck, LuLoaderCircle, LuMail, LuMapPin, LuMessageCircle } from "react-icons/lu";
import { useAuth } from "../context/AuthContext";
import { api } from "../lib/api";

export default function Support() {
  const { currentUser } = useAuth();
  const [form, setForm] = useState({ name: currentUser?.displayName || "", email: currentUser?.email || "", subject: "", message: "", website: "" });
  const [status, setStatus] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);

  async function submit(event) {
    event.preventDefault(); setLoading(true); setStatus({ type: "", message: "" });
    try {
      const result = await api.contact(form);
      setStatus({ type: "success", message: result.message || "Your message has been received." });
      setForm((current) => ({ ...current, subject: "", message: "" }));
    } catch (error) { setStatus({ type: "error", message: error.message }); } finally { setLoading(false); }
  }

  return (
    <main className="page support-page">
      <section className="shell support-layout">
        <div className="support-intro"><span className="eyebrow"><span /> Farmer support</span><h1>Bring us the<br /><em>hard question.</em></h1><p>Tell us what you are trying to decide, where you are farming and what you have already observed. Good support begins with context.</p>
          <div className="contact-list"><a href="mailto:agriproplus@gmail.com"><LuMail /><span><small>Email</small>agriproplus@gmail.com</span></a><div><LuMapPin /><span><small>Based at</small>NIT Delhi, India</span></div><div><LuMessageCircle /><span><small>Best for</small>Product, data and field feedback</span></div></div>
        </div>
        <form className="support-form" onSubmit={submit}>
          <div><span>Write to the team</span><h2>What can we solve together?</h2></div>
          <div className="two-fields"><label><span>Name</span><input value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} required /></label><label><span>Email</span><input type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} required /></label></div>
          <label><span>Subject</span><input value={form.subject} minLength="3" maxLength="140" onChange={(event) => setForm({ ...form, subject: event.target.value })} placeholder="Crop recommendation, scheme data, partnership…" required /></label>
          <label><span>Your message</span><textarea value={form.message} minLength="10" maxLength="3000" onChange={(event) => setForm({ ...form, message: event.target.value })} placeholder="Share the field context and the outcome you need." required /></label>
          <input className="honeypot" tabIndex="-1" autoComplete="off" value={form.website} onChange={(event) => setForm({ ...form, website: event.target.value })} aria-hidden="true" />
          {status.message && <div className={`form-message form-message--${status.type}`} role="status">{status.type === "success" && <LuCheck />}{status.message}</div>}
          <button className="button button--lime" disabled={loading}>{loading ? <><LuLoaderCircle className="spin" /> Sending</> : <>Send message <LuArrowRight /></>}</button>
        </form>
      </section>
    </main>
  );
}
