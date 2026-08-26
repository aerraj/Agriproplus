import { useMemo, useState } from "react";
import { LuArrowRight, LuCheck, LuGauge, LuInfo, LuLoaderCircle, LuRotateCcw, LuSparkles } from "react-icons/lu";
import ParticleField from "../components/ParticleField";
import { useAuth } from "../context/AuthContext";
import { cropProfiles } from "../data/content";
import { api } from "../lib/api";

const fields = [
  { name: "N", label: "Nitrogen", unit: "kg/ha", min: 0, max: 200, hint: "Available nitrogen" },
  { name: "P", label: "Phosphorus", unit: "kg/ha", min: 0, max: 200, hint: "Available phosphorus" },
  { name: "K", label: "Potassium", unit: "kg/ha", min: 0, max: 250, hint: "Available potassium" },
  { name: "temperature", label: "Temperature", unit: "°C", min: -10, max: 60, step: 0.1, hint: "Recent field average" },
  { name: "humidity", label: "Humidity", unit: "%", min: 0, max: 100, hint: "Relative humidity" },
  { name: "pH", label: "Soil pH", unit: "pH", min: 0, max: 14, step: 0.1, hint: "From soil test" },
  { name: "rainfall", label: "Rainfall", unit: "mm", min: 0, max: 500, step: 0.1, hint: "Seasonal / recent" },
];
const emptyConditions = Object.fromEntries(fields.map(({ name }) => [name, ""]));
const sampleConditions = { N: 90, P: 42, K: 43, temperature: 20.9, humidity: 82, pH: 6.5, rainfall: 202.9 };

export default function CropRecommendation() {
  const { currentUser } = useAuth();
  const [conditions, setConditions] = useState(emptyConditions);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const completed = useMemo(() => Object.values(conditions).filter((value) => value !== "").length, [conditions]);

  function updateField(event) {
    setConditions((current) => ({ ...current, [event.target.name]: event.target.value }));
    setError("");
  }

  async function submit(event) {
    event.preventDefault();
    if (completed !== fields.length) return setError("Complete all seven readings to run the model.");
    setLoading(true); setError(""); setResult(null);
    try {
      setResult(await api.recommend(Object.fromEntries(Object.entries(conditions).map(([key, value]) => [key, Number(value)]))));
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  }

  const crop = result ? cropProfiles[result.recommended_crop] || { icon: "🌱", season: "Region dependent", water: "Check locally", window: "Check locally", note: "Validate this model result with local field conditions." } : null;
  const confidence = result ? Math.round(result.confidence * 100) : 0;

  return (
    <main className="page page--dark crop-page">
      <ParticleField />
      <section className="shell page-hero page-hero--compact">
        <div><span className="eyebrow eyebrow--light"><span /> Crop intelligence · Model 2026.1</span><h1>{currentUser ? `${currentUser.displayName?.split(" ")[0] || "Your"}, read` : "Read"} your field.<br /><em>Choose with evidence.</em></h1></div>
        <div className="page-hero__aside"><LuGauge /><p>Seven readings. Twenty-two crops. One ranked answer with confidence and alternatives.</p></div>
      </section>

      <section className="shell predictor-layout">
        <form className="predictor-panel glass-panel" onSubmit={submit}>
          <div className="panel-heading"><div><span>Field readings</span><h2>What is the soil telling us?</h2></div><div className="completion-ring" style={{ "--completion": `${(completed / fields.length) * 360}deg` }}><span>{completed}/7</span></div></div>
          <div className="form-tip"><LuInfo /><span>Use a recent soil test where possible. Weather values should represent the growing window, not one unusual day.</span></div>
          <div className="reading-grid">
            {fields.map((field, index) => (
              <label className="reading-field" key={field.name}>
                <span><i>{String(index + 1).padStart(2, "0")}</i>{field.label}<small>{field.unit}</small></span>
                <input type="number" inputMode="decimal" name={field.name} min={field.min} max={field.max} step={field.step || 1} value={conditions[field.name]} onChange={updateField} placeholder="—" required />
                <em>{field.hint} · {field.min}–{field.max}</em>
              </label>
            ))}
          </div>
          {error && <div className="form-message form-message--error" role="alert">{error}</div>}
          <div className="predictor-actions">
            <button type="button" className="text-button" onClick={() => { setConditions(sampleConditions); setResult(null); setError(""); }}><LuSparkles /> Load a sample field</button>
            <button className="button button--lime" disabled={loading} type="submit">{loading ? <><LuLoaderCircle className="spin" /> Reading the field</> : <>Run crop intelligence <LuArrowRight /></>}</button>
          </div>
        </form>

        <aside className={`result-panel ${result ? "has-result" : ""}`} aria-live="polite">
          {!result ? (
            <div className="result-empty"><div className="result-orb"><span /><i /></div><span className="eyebrow eyebrow--light"><span /> Awaiting readings</span><h2>Your recommendation will grow here.</h2><p>Complete the field profile and the model will compare it across 96 decision trees.</p></div>
          ) : (
            <div className="result-card">
              <div className="result-card__top"><span>Best field fit</span><span className="confidence-pill"><LuCheck /> {confidence}% confidence</span></div>
              <div className="result-crop"><span>{crop.icon}</span><div><small>Recommended crop</small><h2>{result.recommended_crop}</h2></div></div>
              <p className="result-note">{crop.note}</p>
              <div className="result-facts"><div><span>Season</span><strong>{crop.season}</strong></div><div><span>Water need</span><strong>{crop.water}</strong></div><div><span>Sowing window</span><strong>{crop.window}</strong></div></div>
              <div className="alternatives"><span>Alternative fits</span>{result.alternatives?.map((alternative) => <div key={alternative.crop}><strong>{alternative.crop}</strong><i><b style={{ width: `${Math.max(4, alternative.confidence * 100)}%` }} /></i><small>{Math.round(alternative.confidence * 100)}%</small></div>)}</div>
              <div className="model-meta"><span>Model {result.model_version}</span><span>{result.latency_ms} ms inference</span></div>
              <button className="text-button" onClick={() => { setResult(null); setConditions(emptyConditions); }}><LuRotateCcw /> Analyze another field</button>
            </div>
          )}
        </aside>
      </section>
      <section className="shell model-disclaimer"><LuInfo /><p><strong>Decision support, not a prescription.</strong> Validate crop choice against water availability, local demand, rotation, soil biology and an agronomist’s advice.</p></section>
    </main>
  );
}
