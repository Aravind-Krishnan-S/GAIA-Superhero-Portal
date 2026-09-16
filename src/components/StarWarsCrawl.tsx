export default function StarWarsCrawl() {
  const chapters = [
    {
      chapter: "CHAPTER 0",
      title: "THE ANCIENT PACT",
      desc: "Eons ago, the late guardian god of Earth, GAIA, foresaw the inevitable cosmic threats that would one day target our fragile world. In a desperate bid to secure humanity's future, she formed a pact with a supreme, immortal entity—a pragmatic emperor of the cosmos. To fulfill a transactional vow, this emperor left behind a single shard of his immense existence on Earth before departing the universe. Kept in a highly secure, subterranean vault, this ultimate failsafe, known as Spectre, remains in a perpetual trance—awaiting the day humanity needs its ultimate protector."
    },
    {
      chapter: "CHAPTER I",
      title: "THE VANGUARD",
      desc: "Fast forward to the modern era. Earth was abruptly introduced to the extraterrestrial enterprise network, drawing the attention of aggressive alien conglomerates. Knowing that traditional militaries could not withstand interstellar forces, the Global Anomaly Investigation Agency (G.A.I.A.) was officially founded. We stepped out of the shadows not as conquerors, but as a unified shield for the human race. We acquired the technology, the resources, and the intelligence network necessary to stand on the galactic stage."
    },
    {
      chapter: "CHAPTER II",
      title: "THE CHARTER",
      desc: "Through unmatched diplomacy and strategic brilliance, G.A.I.A. secured the exclusive planetary charter in 2010. Earth was formally recognized as a sovereign entity under our protection, ensuring our world would never be liquidated by cosmic forces. We bear the tremendous burden of governance, ensuring peace, prosperity, and survival for all mankind. We are the architects of Earth's defense, the silent guardians who ensure tomorrow always comes."
    },
    {
      chapter: "CHAPTER III",
      title: "OUR ELITE ROSTER",
      desc: "To defend our world, G.A.I.A. has assembled an active roster of extraordinary individuals. While Spectre slumbers as our ultimate insurance, heroes like Dream Princess bring cosmic light and psychic shielding to the battlefield. Angel descends with divine swiftness, neutralizing threats before they touch the atmosphere. And Android, the pinnacle of our cybernetic division, manages our vast intelligence networks while coordinating field operations."
    },
    {
      chapter: "CHAPTER IV",
      title: "THE CALL TO ACTION",
      desc: "Today, we face new anomalies and incursions daily. But humanity need not fear the dark. G.A.I.A. stands vigilant, deploying our extraordinary operatives to safeguard our planet. We invite citizens to report anomalies and seek our assistance. As long as G.A.I.A. holds the line, Earth will remain free, independent, and secure. We are your shield. We are your future."
    }
  ];

  const contentBlock = (
    <div className="w-full flex flex-col items-center">
      <div className="mb-32 flex justify-center">
        <h1 className="text-7xl md:text-[10rem] mb-8 tracking-wider font-black leading-none drop-shadow-[0_0_20px_rgba(229,9,20,0.4)]" 
            style={{ 
              color: 'black', 
              WebkitTextStroke: '4px #E50914', 
              fontFamily: 'Impact, "Arial Black", sans-serif'
            }}>
          G.A.I.A
        </h1>
      </div>

      {chapters.map((ch, i) => (
        <div key={i} className="mb-24 w-full">
          <h2 className="text-2xl md:text-4xl mb-2 font-bold tracking-[0.3em] text-[#FF2A2A] drop-shadow-[0_0_8px_rgba(255,42,42,0.5)]" style={{ fontFamily: "'Univers Light Ultra Condensed', 'Univers', sans-serif" }}>{ch.chapter}</h2>
          <h3 className="text-xl md:text-3xl mb-8 font-bold tracking-[0.2em] text-[#FF2A2A]/80" style={{ fontFamily: "'Univers Light Ultra Condensed', 'Univers', sans-serif" }}>{ch.title}</h3>
          <p className="text-xl md:text-3xl leading-relaxed text-[#F8F9FA] tracking-[0.1em] font-bold text-justify" style={{ textAlignLast: 'center', fontFamily: "'News Gothic Bold', 'News Gothic', sans-serif" }}>
            {ch.desc}
          </p>
        </div>
      ))}
      
      {/* 8 lines of spacing: ~24rem */}
      <div className="h-96 w-full"></div>
    </div>
  );

  return (
    <div className="absolute inset-x-0 top-0 h-[80vh] overflow-hidden flex items-end justify-center pointer-events-none font-mono z-0">
      <style>{`
        .perspective-container {
          perspective: 600px;
          height: 100%;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: flex-end;
          position: absolute;
          inset: 0;
          overflow: hidden;
        }
        .crawl-plane {
          width: 100%;
          max-width: 48rem;
          height: 100%;
          transform-origin: 50% 100%;
          transform: rotateX(25deg);
          position: relative;
        }
        .crawl-text {
          width: 100%;
          position: absolute;
          left: 0;
          animation: crawl 100s linear infinite;
        }
        @keyframes crawl {
          0% {
            transform: translateY(80vh);
          }
          100% {
            transform: translateY(calc(-50% + 80vh));
          }
        }
      `}</style>

      {/* Fade at top */}
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-[#050505] via-[#050505]/80 to-transparent z-10 pointer-events-none" />

      <div className="perspective-container z-0">
        <div className="crawl-plane px-6">
          <div className="crawl-text">
            {contentBlock}
            {contentBlock}
          </div>
        </div>
      </div>
    </div>
  );
}
