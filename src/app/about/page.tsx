export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-[#F8F9FA] font-mono pt-24 pb-12 px-6">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12 border-b border-[#E50914]/30 pb-6">
          <h1 className="text-4xl font-bold text-[#E50914] tracking-widest mb-2">
            MISSION DIRECTIVE & LORE
          </h1>
          <p className="text-[#F8F9FA]/60 tracking-wider">
            CLASSIFIED DEBRIEF: THE G.A.I.A. UNIVERSE
          </p>
        </header>

        <main className="space-y-12">
          {/* Chapter 1 */}
          <section className="relative p-6 border border-[#E50914]/20 bg-[#111] shadow-[0_0_20px_rgba(229,9,20,0.05)]">
            <div className="absolute top-0 left-0 w-2 h-full bg-[#E50914]" />
            <h2 className="text-2xl font-bold text-[#E50914] mb-4 tracking-widest">
              01. THE GALACTIC ECONOMY
            </h2>
            <div className="text-[#F8F9FA]/80 space-y-4 leading-relaxed">
              <p>
                In this universe, space is not a vast, empty frontier, but a highly structured and fiercely competitive marketplace. Galaxies, star systems, and sectors are governed by ancient Empires and powerful extraterrestrial Kingdoms. However, the day-to-day administration of individual planets is franchised out to mega-corporations. Planets are treated as corporate assets—ruled, monetized, and defended by companies that hold exclusive planetary charters granted by the imperial courts.
              </p>
              <p className="italic text-[#E50914]/80 font-bold">
                Corporate espionage involves orbital strikes, "mergers" are military conquests, and hostile takeovers are literal planetary invasions.
              </p>
            </div>
          </section>

          {/* Chapter 2 */}
          <section className="relative p-6 border border-[#E50914]/20 bg-[#111] shadow-[0_0_20px_rgba(229,9,20,0.05)]">
            <div className="absolute top-0 left-0 w-2 h-full bg-[#E50914]" />
            <h2 className="text-2xl font-bold text-[#E50914] mb-4 tracking-widest">
              02. EARTH: A CORPORATE ASSET
            </h2>
            <div className="text-[#F8F9FA]/80 space-y-4 leading-relaxed">
              <p>
                For millennia, Earth was considered an uncontacted, primitive backwater planet, isolated from the galactic trade routes. That changed a little over twenty years ago when Earth was forcefully introduced to the wider extraterrestrial enterprise network.
              </p>
              <p>
                To prevent the planet from being immediately liquidated or strip-mined by aggressive alien conglomerates, a unified human coalition rapidly formed the <strong className="text-[#F8F9FA]">Global Anomaly Investigation Agency (G.A.I.A.)</strong>. Through cunning political maneuvering and sheer resourcefulness, G.A.I.A. managed to secure the exclusive planetary charter from the governing sector's Empire, effectively becoming the sovereign corporate ruler of Earth.
              </p>
              <p>
                Today, G.A.I.A. operates as the planet's mega-corporation. It maintains planetary order, regulates the influx of extraterrestrial commerce, reverse-engineers alien technology, and ensures Earth remains profitable enough to maintain its independence from rival companies.
              </p>
            </div>
          </section>

          {/* Chapter 3 */}
          <section className="relative p-6 border border-[#E50914]/20 bg-[#111] shadow-[0_0_20px_rgba(229,9,20,0.05)]">
            <div className="absolute top-0 left-0 w-2 h-full bg-[#E50914]" />
            <h2 className="text-2xl font-bold text-[#E50914] mb-4 tracking-widest">
              03. THE OPERATIVES (SUPERHEROES)
            </h2>
            <div className="text-[#F8F9FA]/80 space-y-4 leading-relaxed">
              <p>
                In a universe where rival planetary companies deploy armies of cybernetic mercenaries and alien warlords, traditional human militaries are entirely obsolete. To defend its most vital asset (Earth), G.A.I.A. employs a roster of elite "Operatives"—super-powered individuals who serve as the planet's ultimate defense force.
              </p>
              <p>
                These heroes are deployed to thwart rival corporate incursions, contain anomalous threats, and crush any disruptions to G.A.I.A.'s planetary operations. To the citizens of Earth, they are revered as protectors and champions. To the rest of the galaxy, they are recognized as G.A.I.A.'s deadliest corporate security enforcers.
              </p>
            </div>
          </section>

          {/* Chapter 4 */}
          <section className="relative p-6 border border-[#E50914]/20 bg-[#111] shadow-[0_0_20px_rgba(229,9,20,0.05)]">
            <div className="absolute top-0 left-0 w-2 h-full bg-[#E50914]" />
            <h2 className="text-2xl font-bold text-[#E50914] mb-4 tracking-widest">
              04. THE ELITE VANGUARD
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              
              <div className="p-4 border border-[#F8F9FA]/10 bg-[#050505]">
                <h3 className="text-[#E50914] font-bold tracking-widest mb-2">SPECTRE</h3>
                <p className="text-xs text-[#F8F9FA]/70 leading-relaxed">
                  A shadow-ops specialist handling off-the-books corporate sabotage. When a rival alien company tries to establish an illegal foothold on Earth, Spectre ensures their executives disappear.
                </p>
              </div>

              <div className="p-4 border border-[#F8F9FA]/10 bg-[#050505]">
                <h3 className="text-[#E50914] font-bold tracking-widest mb-2">NYMERIA</h3>
                <p className="text-xs text-[#F8F9FA]/70 leading-relaxed">
                  A chaos sorceress whose reality-bending magic is often deployed to counter hyper-advanced alien technologies and extraterrestrial psychic warfare.
                </p>
              </div>

              <div className="p-4 border border-[#F8F9FA]/10 bg-[#050505]">
                <h3 className="text-[#E50914] font-bold tracking-widest mb-2">ANGEL</h3>
                <p className="text-xs text-[#F8F9FA]/70 leading-relaxed">
                  A celestial powerhouse serving as both orbital defense and G.A.I.A.'s ultimate symbol of planetary security, intercepting threats before they even enter Earth's atmosphere.
                </p>
              </div>

              <div className="p-4 border border-[#F8F9FA]/10 bg-[#050505]">
                <h3 className="text-[#E50914] font-bold tracking-widest mb-2">ANDROID</h3>
                <p className="text-xs text-[#F8F9FA]/70 leading-relaxed">
                  The pinnacle of G.A.I.A.'s R&D—a fusion of cutting-edge Earth robotics and scavenged alien technology, designed to handle heavy combat and infiltrate extraterrestrial corporate mainframes.
                </p>
              </div>

            </div>
          </section>

        </main>
      </div>
    </div>
  );
}
