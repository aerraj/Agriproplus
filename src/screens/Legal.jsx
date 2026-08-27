import { Link } from "react-router-dom";

const privacySections = [
  ["Information we collect", "When you create an account, we receive your name, email address, profile image and authentication identifier from Firebase Authentication. Crop recommendations use the soil and climate values you submit. Support messages include the contact details and text you provide."],
  ["How we use information", "We use this information to operate accounts, generate crop recommendations, answer support requests, secure the service and improve AgriPro+. We do not sell personal information or use it for unrelated advertising."],
  ["Storage and service providers", "Account and application data may be processed by Google Firebase, Google Cloud and our hosting providers. These providers process data to deliver the service under their own security and privacy commitments."],
  ["Retention and control", "We keep data only while it is needed for the service, security or legal obligations. You may request access, correction or deletion by emailing agriproplus@gmail.com."],
  ["Agricultural data", "Field inputs are used as decision-support signals. Avoid submitting confidential land records or information that is not necessary for a recommendation."],
  ["Contact", "Questions or privacy requests can be sent to agriproplus@gmail.com. We may update this policy as the platform changes and will publish the effective date here."],
];

const termsSections = [
  ["Using AgriPro+", "You may use the platform for lawful agricultural learning and decision support. Keep your account secure, provide accurate information and do not interfere with the platform or attempt to access another user’s data."],
  ["Decision support", "Crop predictions, schemes and educational content are informational. Conditions vary by field and season; verify important decisions with local agronomists, official scheme portals and current government guidance."],
  ["Availability", "We work to keep AgriPro+ fast and reliable, but the service may change or occasionally be unavailable. We may improve, replace or discontinue features while protecting data under the Privacy Policy."],
  ["Content and links", "AgriPro+ content and branding remain the property of their respective owners. External government and information links are provided for convenience; their operators are responsible for their content."],
  ["Responsible use", "Do not abuse the prediction API, submit malicious content, scrape the service excessively or use it to mislead farmers. We may restrict access that threatens users or platform reliability."],
  ["Contact", "Questions about these terms can be sent to agriproplus@gmail.com. These terms are governed by applicable laws in India."],
];

export default function Legal({ type }) {
  const privacy = type === "privacy";
  const sections = privacy ? privacySections : termsSections;
  return (
    <main className="page legal-page">
      <section className="shell legal-layout">
        <header className="legal-hero">
          <span className="eyebrow"><span /> Trust &amp; transparency</span>
          <h1>{privacy ? "Privacy policy" : "Terms of use"}</h1>
          <p>Effective 27 August 2026 · AgriPro+, NIT Delhi, India</p>
        </header>
        <div className="legal-card">
          <p className="legal-summary">{privacy ? "Your field decisions deserve technology that respects your data." : "Clear rules for using AgriPro+ safely and responsibly."}</p>
          {sections.map(([title, text]) => <section key={title}><h2>{title}</h2><p>{text}</p></section>)}
          <div className="legal-links"><Link to={privacy ? "/terms" : "/privacy"}>{privacy ? "Read terms of use" : "Read privacy policy"}</Link><Link to="/support">Contact the team</Link></div>
        </div>
      </section>
    </main>
  );
}
