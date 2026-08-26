import { LuArrowUpRight, LuBookOpen, LuCloudSun, LuRadio } from "react-icons/lu";
import { knowledgeCards } from "../data/content";

export default function Knowledge() {
  return (
    <main className="page knowledge-page">
      <section className="shell knowledge-hero">
        <div><span className="eyebrow"><span /> Field knowledge</span><h1>Learn what matters.<br /><em>Apply it this week.</em></h1></div>
        <p>Short, trusted pathways from signal to action—without the noise of an endless feed.</p>
      </section>
      <section className="shell featured-brief">
        <div className="featured-brief__visual"><span><LuCloudSun /> Weather → action</span><div><i>82%</i><small>relative humidity</small></div></div>
        <div><span className="content-kicker"><LuRadio /> This week’s field method</span><h2>Use the forecast as an operations plan, not a wallpaper.</h2><p>Map rain probability, wind and humidity to the work that is expensive to repeat: spraying, irrigation, drying and harvest.</p><a href="https://mausam.imd.gov.in/" target="_blank" rel="noreferrer">Open IMD weather services <LuArrowUpRight /></a></div>
      </section>
      <section className="shell knowledge-library">
        <div className="library-heading"><div><span className="eyebrow"><span /> Practical library</span><h2>Six signals worth following</h2></div><LuBookOpen /></div>
        <div className="knowledge-grid">
          {knowledgeCards.map((card, index) => (
            <a href={card.href} target="_blank" rel="noreferrer" className="knowledge-card" key={card.title}>
              <div><span>{card.category}</span><small>{card.readTime}</small></div><h3>{card.title}</h3><p>{card.summary}</p><span className="knowledge-card__index">{String(index + 1).padStart(2, "0")}</span><LuArrowUpRight />
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
