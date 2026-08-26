import { LuArrowRight, LuBrainCircuit, LuCloudSun, LuDatabase, LuScanLine, LuShieldCheck, LuSprout } from "react-icons/lu";
import { Link } from "react-router-dom";
import ParticleField from "../components/ParticleField";

const modules = [
  { icon: LuBrainCircuit, number: "01", title: "Crop intelligence", copy: "Seven field readings become a ranked crop recommendation in milliseconds—not a generic crop calendar.", link: "/crops", accent: "lime" },
  { icon: LuDatabase, number: "02", title: "Scheme navigator", copy: "Find support that matches the need: risk, soil, credit, infrastructure or market access.", link: "/schemes", accent: "amber" },
  { icon: LuCloudSun, number: "03", title: "Field knowledge", copy: "Turn soil, weather and market signals into a short list of practical decisions for this week.", link: "/knowledge", accent: "sky" },
];

export default function Home() {
  return (
    <main>
      <section className="hero">
        <div className="hero__backdrop" aria-hidden="true" />
        <ParticleField />
        <div className="shell hero__content">
          <div className="hero__copy">
            <div className="eyebrow eyebrow--light"><span /> Intelligence rooted in the field</div>
            <h1>Every field<br />has a <em>signal.</em></h1>
            <p>AgriPro+ turns soil, climate and opportunity into one clear next move—built for Indian agriculture, from the ground up.</p>
            <div className="hero__actions">
              <Link className="button button--lime" to="/crops">Run crop intelligence <LuArrowRight /></Link>
              <a className="button button--ghost" href="#platform">Explore the platform</a>
            </div>
            <div className="hero__trust">
              <div><strong>22</strong><span>crop classes</span></div>
              <div><strong>99.5%</strong><span>holdout accuracy</span></div>
              <div><strong>7</strong><span>field signals</span></div>
            </div>
          </div>
          <div className="hero__intelligence-card" aria-label="Example field intelligence">
            <div className="live-label"><span /> Field pulse · Live model</div>
            <div className="field-ring"><span>94</span><small>Field fit</small></div>
            <div className="field-readout"><span>Recommended today</span><strong>Rice</strong><small>High rainfall · Balanced NPK</small></div>
            <div className="mini-readings"><span><i>N</i> 90</span><span><i>pH</i> 6.5</span><span><i>RH</i> 82%</span></div>
          </div>
        </div>
        <div className="hero__edge"><span>Scroll to read the field</span><i /></div>
      </section>

      <section className="signal-strip">
        <div className="shell signal-strip__inner">
          <span>One connected decision layer</span>
          <div><LuScanLine /> Observe</div><i /><div><LuBrainCircuit /> Understand</div><i /><div><LuSprout /> Act</div>
        </div>
      </section>

      <section className="section platform" id="platform">
        <div className="shell">
          <div className="section-heading section-heading--split">
            <div><span className="eyebrow"><span /> The platform</span><h2>From readings to<br /><em>real decisions.</em></h2></div>
            <p>Agricultural technology earns trust when it makes the next step simpler. Every AgriPro+ module is designed around that standard.</p>
          </div>
          <div className="module-grid">
            {modules.map(({ icon: Icon, ...module }) => (
              <Link to={module.link} className={`module-card module-card--${module.accent}`} key={module.title}>
                <span className="module-card__number">{module.number}</span><Icon className="module-card__icon" />
                <div><h3>{module.title}</h3><p>{module.copy}</p></div>
                <span className="module-card__link">Open module <LuArrowRight /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section proof-section">
        <div className="shell proof-grid">
          <div className="proof-visual">
            <div className="proof-visual__image" />
            <div className="proof-badge"><LuShieldCheck /><span><strong>Transparent by design</strong>Confidence and alternatives included</span></div>
          </div>
          <div className="proof-copy">
            <span className="eyebrow"><span /> Built differently</span>
            <h2>AI should explain<br />its <em>confidence.</em></h2>
            <p>AgriPro+ never hides behind a magic answer. Crop intelligence shows ranked alternatives, model confidence and the context needed to make a grounded choice.</p>
            <ul className="check-list">
              <li><span>01</span><div><strong>Fast enough for the field</strong><small>A compact model avoids heavy AI cold starts.</small></div></li>
              <li><span>02</span><div><strong>Honest about uncertainty</strong><small>Alternatives remain visible when conditions overlap.</small></div></li>
              <li><span>03</span><div><strong>Built for imperfect networks</strong><small>Lightweight pages and resilient content fallbacks.</small></div></li>
            </ul>
            <Link to="/crops" className="inline-link">Try it with your readings <LuArrowRight /></Link>
          </div>
        </div>
      </section>

      <section className="section closing-cta">
        <ParticleField />
        <div className="shell closing-cta__inner">
          <div><span className="eyebrow eyebrow--light"><span /> Your next season starts here</span><h2>Read the field.<br /><em>Move with confidence.</em></h2></div>
          <Link className="button button--lime" to="/crops">Start a field analysis <LuArrowRight /></Link>
        </div>
      </section>
    </main>
  );
}
