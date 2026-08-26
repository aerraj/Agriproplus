export const cropProfiles = {
  rice: { icon: "🌾", season: "Kharif", water: "High", window: "June–July", note: "Best with warm, humid conditions and reliable standing water." },
  maize: { icon: "🌽", season: "Kharif / Rabi", water: "Medium", window: "June–July", note: "Responds strongly to balanced nitrogen and well-drained soil." },
  chickpea: { icon: "🫘", season: "Rabi", water: "Low", window: "October–November", note: "A cool-season pulse that prefers well-drained, near-neutral soil." },
  kidneybeans: { icon: "🫘", season: "Kharif", water: "Medium", window: "June–July", note: "Performs in mild temperatures with consistent, moderate moisture." },
  pigeonpeas: { icon: "🌱", season: "Kharif", water: "Low", window: "June–July", note: "Deep-rooted pulse suited to warm conditions and variable rainfall." },
  mothbeans: { icon: "🌱", season: "Kharif", water: "Very low", window: "June–July", note: "A resilient dryland pulse for hot, low-rainfall regions." },
  mungbean: { icon: "🫛", season: "Kharif / Zaid", water: "Low", window: "March or July", note: "Short-duration pulse that improves soil nitrogen." },
  blackgram: { icon: "🫛", season: "Kharif", water: "Low", window: "June–July", note: "Thrives in warm weather with moderate humidity." },
  lentil: { icon: "🌱", season: "Rabi", water: "Low", window: "October–November", note: "Cool-season pulse suited to residual soil moisture." },
  pomegranate: { icon: "🔴", season: "Perennial", water: "Medium", window: "Monsoon / spring", note: "Needs well-drained soil and benefits from precise irrigation." },
  banana: { icon: "🍌", season: "Year-round", water: "High", window: "Region dependent", note: "A nutrient-demanding crop that prefers warm, humid conditions." },
  mango: { icon: "🥭", season: "Perennial", water: "Medium", window: "July–August", note: "Long-lived orchard crop suited to warm tropical and subtropical zones." },
  grapes: { icon: "🍇", season: "Perennial", water: "Medium", window: "Region dependent", note: "Requires careful canopy, moisture, and disease management." },
  watermelon: { icon: "🍉", season: "Zaid", water: "Medium", window: "January–March", note: "Warm-season crop that needs open sun and well-drained sandy loam." },
  muskmelon: { icon: "🍈", season: "Zaid", water: "Medium", window: "January–March", note: "Prefers hot, dry ripening weather and controlled irrigation." },
  apple: { icon: "🍎", season: "Perennial", water: "Medium", window: "December–February", note: "Temperate orchard crop with cultivar-specific chilling needs." },
  orange: { icon: "🍊", season: "Perennial", water: "Medium", window: "Monsoon / spring", note: "Citrus crop requiring good drainage and micronutrient monitoring." },
  papaya: { icon: "🟠", season: "Year-round", water: "Medium", window: "February–March", note: "Fast-growing tropical fruit sensitive to waterlogging and frost." },
  coconut: { icon: "🥥", season: "Perennial", water: "High", window: "Monsoon", note: "Tropical palm suited to humid coastal conditions and deep soils." },
  cotton: { icon: "☁️", season: "Kharif", water: "Medium", window: "April–June", note: "Warm-season fibre crop requiring close pest and moisture monitoring." },
  jute: { icon: "🌿", season: "Kharif", water: "High", window: "March–May", note: "Fibre crop favoured by warm, humid, high-rainfall conditions." },
  coffee: { icon: "☕", season: "Perennial", water: "Medium", window: "June–July", note: "Shade-grown plantation crop for humid highland microclimates." },
};

export const fallbackSchemes = [
  { _id: "pm-kisan", title: "PM-KISAN", ministry: "Ministry of Agriculture", description: "Income support for eligible landholding farmer families through direct benefit transfer.", tags: ["Income support", "All India"], applicationUrl: "https://pmkisan.gov.in/" },
  { _id: "pmfby", title: "Pradhan Mantri Fasal Bima Yojana", ministry: "Ministry of Agriculture", description: "Affordable crop insurance against non-preventable natural risks from pre-sowing through post-harvest.", tags: ["Insurance", "Risk"], applicationUrl: "https://pmfby.gov.in/" },
  { _id: "kcc", title: "Kisan Credit Card", ministry: "Department of Financial Services", description: "Timely, flexible credit for crop cultivation, post-harvest expenses and allied activities.", tags: ["Credit", "Finance"], applicationUrl: "https://www.myscheme.gov.in/schemes/kcc" },
  { _id: "soil-health", title: "Soil Health Card", ministry: "Ministry of Agriculture", description: "Soil nutrient status and fertiliser guidance for more efficient, sustainable input use.", tags: ["Soil", "Inputs"], applicationUrl: "https://soilhealth.dac.gov.in/" },
  { _id: "enam", title: "e-NAM", ministry: "Ministry of Agriculture", description: "A national electronic market connecting APMC mandis for transparent price discovery and trade.", tags: ["Market", "Prices"], applicationUrl: "https://www.enam.gov.in/" },
  { _id: "aif", title: "Agriculture Infrastructure Fund", ministry: "Ministry of Agriculture", description: "Financing support for farm-gate and community agriculture infrastructure projects.", tags: ["Infrastructure", "Finance"], applicationUrl: "https://agriinfra.dac.gov.in/" },
];

export const knowledgeCards = [
  { category: "Soil", readTime: "6 min", title: "Read your Soil Health Card like an agronomist", summary: "Turn NPK, pH and organic-carbon readings into a focused input plan instead of blanket fertiliser use.", href: "https://soilhealth.dac.gov.in/" },
  { category: "Water", readTime: "8 min", title: "Irrigation timing that follows the root zone", summary: "Use crop stage, soil texture and recent rainfall to decide when water will produce the most value.", href: "https://pmksy.gov.in/" },
  { category: "Market", readTime: "4 min", title: "Compare mandi prices before the vehicle leaves", summary: "Build a simple selling plan around grade, transport cost, local arrivals and live market prices.", href: "https://agmarknet.gov.in/" },
  { category: "Risk", readTime: "7 min", title: "Document crop loss for a faster insurance claim", summary: "A practical checklist for photos, notification windows, plot records and local verification.", href: "https://pmfby.gov.in/" },
  { category: "Climate", readTime: "5 min", title: "Turn a seven-day forecast into field actions", summary: "Connect rain probability, wind, humidity and temperature to spraying, irrigation and harvest timing.", href: "https://mausam.imd.gov.in/" },
  { category: "Learning", readTime: "Library", title: "ICAR farmer knowledge resources", summary: "Research-backed crop, livestock and natural-resource guidance from India’s agricultural research network.", href: "https://icar.gov.in/" },
];
