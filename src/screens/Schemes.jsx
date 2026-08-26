import { useEffect, useMemo, useState } from "react";
import { LuArrowUpRight, LuBadgeIndianRupee, LuLandmark, LuLoaderCircle, LuSearch } from "react-icons/lu";
import { fallbackSchemes } from "../data/content";
import { api } from "../lib/api";

export default function Schemes() {
  const [query, setQuery] = useState("");
  const [schemes, setSchemes] = useState(fallbackSchemes);
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState("curated");

  useEffect(() => {
    let active = true;
    api.schemes().then((payload) => {
      const items = Array.isArray(payload) ? payload : payload.items;
      if (active && items?.length) { setSchemes(items); setSource("live"); }
    }).catch(() => {}).finally(() => active && setLoading(false));
    return () => { active = false; };
  }, []);

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return schemes;
    return schemes.filter((scheme) => [scheme.title, scheme.description, scheme.ministry, ...(scheme.tags || [])].join(" ").toLowerCase().includes(term));
  }, [query, schemes]);

  return (
    <main className="page schemes-page">
      <section className="page-banner page-banner--green">
        <div className="shell page-banner__inner"><div><span className="eyebrow eyebrow--light"><span /> Opportunity navigator</span><h1>Support built for<br /><em>your next move.</em></h1><p>Search agriculture schemes by the outcome you need—not by government department.</p></div><LuLandmark /></div>
      </section>
      <section className="shell schemes-content">
        <div className="scheme-toolbar">
          <label className="search-field"><LuSearch /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search insurance, credit, soil, market…" /><span>{filtered.length} found</span></label>
          <div className="source-chip">{loading ? <><LuLoaderCircle className="spin" /> Connecting</> : <><span className={source === "live" ? "is-live" : ""} /> {source === "live" ? "Live scheme database" : "Verified essentials"}</>}</div>
        </div>
        <div className="scheme-grid">
          {filtered.map((scheme, index) => (
            <article className="scheme-card" key={scheme._id || scheme.title}>
              <div className="scheme-card__top"><span>{String(index + 1).padStart(2, "0")}</span><LuBadgeIndianRupee /></div>
              <div className="scheme-card__ministry">{scheme.ministry}</div>
              <h2>{scheme.title}</h2><p>{scheme.description}</p>
              <div className="tag-row">{(scheme.tags || []).slice(0, 4).map((tag) => <span key={tag}>{tag}</span>)}</div>
              <a href={scheme.applicationUrl || "https://www.myscheme.gov.in/search/category/Agriculture,Rural%20&%20Environment"} target="_blank" rel="noreferrer">Check eligibility <LuArrowUpRight /></a>
            </article>
          ))}
        </div>
        {!filtered.length && <div className="empty-state"><LuSearch /><h2>No exact match</h2><p>Try a need such as “insurance”, “credit”, “soil”, or “market”.</p></div>}
      </section>
    </main>
  );
}
