/* global React, PORTFOLIO_DATA */
// al-folio style portfolio with project detail pages modeled on
// ryanhlewis/serverlessportfolio. Variant: classic | warm | bold.

const { useState, useEffect, useMemo } = React;

// ─── Theme primitives ────────────────────────────────────────────────────────
const VARIANTS = {
  classic: {
    label: "Classic",
    bg: "#ffffff",
    surface: "#ffffff",
    ink: "#000000",
    ink2: "#828282",
    rule: "#e8e8e8",
    accent: "#b509ac",
    fontHead: "serif",
    photoShape: "rounded",
    heroLayout: "right",
  },
  warm: {
    label: "Warm",
    bg: "#faf6f0",
    surface: "#fffdf8",
    ink: "#1a1512",
    ink2: "#736a61",
    rule: "#e4ddd0",
    accent: "#c2410c",
    fontHead: "serif",
    photoShape: "circle",
    heroLayout: "right",
  },
  bold: {
    label: "Bold",
    bg: "#ffffff",
    surface: "#ffffff",
    ink: "#0a0a0a",
    ink2: "#6b6b6b",
    rule: "#111111",
    accent: "#ff3d2e",
    fontHead: "display",
    photoShape: "square",
    heroLayout: "stacked",
  },
};

const FONT_HEAD = {
  serif: `"Source Serif 4", "Source Serif Pro", Georgia, "Times New Roman", serif`,
  sans: `"Inter Tight", "Inter", -apple-system, system-ui, sans-serif`,
  display: `"Fraunces", "Source Serif 4", Georgia, serif`,
  mono: `"JetBrains Mono", "IBM Plex Mono", ui-monospace, monospace`,
};

const FONT_BODY = `"Source Sans 3", "Source Sans Pro", -apple-system, system-ui, "Segoe UI", Roboto, sans-serif`;

// ─── Little pieces ───────────────────────────────────────────────────────────
function SectionHeader({ children }) {
  return (
    <h2
      style={{
        fontFamily: "var(--font-head)",
        fontWeight: 400,
        fontSize: "1.8rem",
        color: "var(--ink)",
        margin: "0 0 1.2rem 0",
        paddingBottom: "0.55rem",
        borderBottom: "1px solid var(--rule)",
        letterSpacing: "-0.01em",
      }}
    >
      {children}
    </h2>
  );
}

function ProfilePhoto({ shape, size = 260 }) {
  const radius =
    shape === "circle" ? size / 2 : shape === "square" ? 0 : 14;
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: radius,
        overflow: "hidden",
        position: "relative",
        boxShadow:
          "0 1px 2px rgba(0,0,0,0.06), 0 8px 24px rgba(0,0,0,0.08)",
        flex: "none",
        background: "#d9d4cd",
      }}
    >
      <img
        src="assets/profile.png"
        alt="Samuel Duong"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
        }}
      />
    </div>
  );
}

function getComputedAccent() {
  try {
    return (
      getComputedStyle(document.documentElement)
        .getPropertyValue("--accent")
        .trim() || "#c2410c"
    );
  } catch {
    return "#c2410c";
  }
}

// ─── Project thumbnails (SVG) ────────────────────────────────────────────────
function ProjectThumb({ kind }) {
  const accent = getComputedAccent();
  const w = 520, h = 260;
  if (kind === "mapgrid") {
    return (
      <svg viewBox={`0 0 ${w} ${h}`} width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
        <rect width={w} height={h} fill="#f1ece4" />
        {[...Array(20)].map((_, i) => (
          <line key={"v"+i} x1={(i*w)/20} y1={0} x2={(i*w)/20} y2={h} stroke="#d8cfbc" strokeWidth="0.5" />
        ))}
        {[...Array(10)].map((_, i) => (
          <line key={"h"+i} y1={(i*h)/10} x1={0} y2={(i*h)/10} x2={w} stroke="#d8cfbc" strokeWidth="0.5" />
        ))}
        {[...Array(8)].map((_, i) => (
          <path key={"c"+i} d={`M 0 ${30+i*28} Q ${w/3} ${10+i*28} ${w*2/3} ${40+i*28} T ${w} ${25+i*28}`} fill="none" stroke={accent} strokeWidth="1.2" opacity={0.5} />
        ))}
        {[...Array(120)].map((_, i) => {
          const x = (i*37) % w, y = (i*53) % h, r = 1.5+((i*7)%3);
          const hot = (i*11)%5 === 0;
          return <circle key={i} cx={x} cy={y} r={r} fill={hot ? accent : "#7a8cad"} opacity={hot?0.85:0.5} />;
        })}
      </svg>
    );
  }
  if (kind === "nodes") {
    const nodes = [...Array(22)].map((_, i) => ({ x: 30 + ((i*97)%(w-60)), y: 20 + ((i*41)%(h-40)) }));
    return (
      <svg viewBox={`0 0 ${w} ${h}`} width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
        <rect width={w} height={h} fill="#fafafa" />
        {nodes.map((n,i) => nodes.slice(i+1).map((m,j) => {
          const d = Math.hypot(n.x-m.x, n.y-m.y);
          if (d > 100) return null;
          return <line key={`${i}-${j}`} x1={n.x} y1={n.y} x2={m.x} y2={m.y} stroke={accent} strokeWidth="0.6" opacity="0.4" />;
        }))}
        {nodes.map((n,i) => <circle key={i} cx={n.x} cy={n.y} r={i%3===0?6:3.5} fill={i%3===0?accent:"#333"} />)}
      </svg>
    );
  }
  if (kind === "transit") {
    return (
      <svg viewBox={`0 0 ${w} ${h}`} width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
        <rect width={w} height={h} fill="#eef2f6" />
        <path d={`M 20 ${h/2} L 200 ${h/2-40} L 320 ${h/2+20} L 500 ${h/2-10}`} fill="none" stroke={accent} strokeWidth="3" />
        <path d={`M 40 40 L 180 140 L 280 80 L 480 220`} fill="none" stroke="#2b3a55" strokeWidth="2.5" />
        <path d={`M 10 200 L 150 200 L 260 150 L 400 180 L 510 120`} fill="none" stroke="#2b3a55" strokeWidth="2.5" strokeDasharray="6 4" />
        {[...Array(30)].map((_,i) => {
          const x = 20 + ((i*29)%(w-40));
          const y = 20 + ((i*53)%(h-40));
          return <circle key={i} cx={x} cy={y} r="3" fill={i%4===0?accent:"#2b3a55"} />;
        })}
      </svg>
    );
  }
  if (kind === "gentrify") {
    return (
      <svg viewBox={`0 0 ${w} ${h}`} width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
        <rect width={w} height={h} fill="#f7f5f0" />
        {[...Array(8)].map((_, row) => [...Array(16)].map((__, col) => {
          const idx = row*16+col;
          const cats = [accent, "#9ca2ad", "#3d4f6b"];
          const fill = cats[idx%3];
          return <rect key={`${row}-${col}`} x={col*(w/16)} y={row*(h/8)} width={w/16-1} height={h/8-1} fill={fill} opacity={0.35+((idx*7)%5)*0.12} />;
        }))}
      </svg>
    );
  }
  if (kind === "heritage") {
    return (
      <svg viewBox={`0 0 ${w} ${h}`} width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="sky-h" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#f4c98a" />
            <stop offset="100%" stopColor="#c97a4a" />
          </linearGradient>
        </defs>
        <rect width={w} height={h} fill="url(#sky-h)" />
        <circle cx={w*0.75} cy={h*0.35} r="38" fill="#ffe9b0" opacity="0.9" />
        {/* ruins */}
        <g fill="#6b3b22">
          <rect x="40" y="160" width="18" height="80" />
          <rect x="80" y="140" width="18" height="100" />
          <rect x="120" y="150" width="18" height="90" />
          <rect x="180" y="120" width="22" height="120" />
          <rect x="220" y="145" width="18" height="95" />
          <rect x="260" y="165" width="18" height="75" />
          <rect x="320" y="135" width="22" height="105" />
          <rect x="360" y="170" width="18" height="70" />
          <rect x="400" y="150" width="18" height="90" />
          <path d={`M 30 240 L 500 240 L 500 260 L 30 260 Z`} fill="#4a2814" />
        </g>
      </svg>
    );
  }
  // dots default
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
      <rect width={w} height={h} fill="#f5f5f5" />
      {[...Array(280)].map((_, i) => {
        const x = (i*13)%w, y = (i*23)%h, hot = (i*7)%11===0;
        return <circle key={i} cx={x} cy={y} r={hot?3:1.3} fill={hot?accent:"#bbb"} />;
      })}
    </svg>
  );
}

// ─── Pages ───────────────────────────────────────────────────────────────────
function AboutPage({ data, variant, onOpenProject }) {
  const v = VARIANTS[variant];
  const stacked = v.heroLayout === "stacked";
  return (
    <div>
      <header style={{ display: "flex", flexDirection: stacked ? "column" : "row", alignItems: "flex-start", gap: stacked ? "2rem" : "3rem", marginBottom: "3rem" }}>
        <div style={{ flex: 1, minWidth: 0, order: stacked ? 2 : 1 }}>
          <h1 style={{ fontFamily: "var(--font-head)", fontWeight: variant === "bold" ? 600 : 300, fontSize: variant === "bold" ? "4.6rem" : "3.2rem", lineHeight: 1.02, letterSpacing: variant === "bold" ? "-0.035em" : "-0.015em", margin: "0 0 0.8rem 0", color: "var(--ink)" }}>
            {data.name}
          </h1>
          <p style={{ fontSize: "1.05rem", color: "var(--ink2)", margin: "0 0 1.4rem 0", lineHeight: 1.5 }}>
            {data.affiliation.role} at <a href="#" style={{ color: "var(--accent)" }}>{data.affiliation.lab}</a>, {data.affiliation.org}.
          </p>
          <div style={{ fontSize: "0.92rem", color: "var(--ink2)", display: "flex", flexWrap: "wrap", gap: "0.2rem 1.2rem", marginBottom: "1.8rem" }}>
            <span>📍 {data.location}</span>
            <a href={`tel:${data.phone}`} style={{ color: "inherit" }}>{data.phone}</a>
            <a href={`mailto:${data.email}`} style={{ color: "inherit" }}>{data.email}</a>
          </div>
          <p style={{ fontSize: "1rem", lineHeight: 1.7, color: "var(--ink)", margin: "0 0 1rem 0", maxWidth: "62ch" }}>{data.bio}</p>
          <p style={{ fontSize: "1rem", lineHeight: 1.7, color: "var(--ink)", margin: 0, maxWidth: "62ch" }}>{data.bioExtra}</p>
          <div style={{ marginTop: "1.6rem", display: "flex", gap: "1.1rem", fontSize: "1.2rem", color: "var(--ink2)" }}>
            <SocialIcon kind="email" href={`mailto:${data.email}`} />
            <SocialIcon kind="github" href={data.links.github} />
            <SocialIcon kind="linkedin" href={data.links.linkedin} />
            <SocialIcon kind="scholar" href={data.links.scholar} />
          </div>
        </div>
        <aside style={{ order: stacked ? 1 : 2, flex: "none" }}>
          <ProfilePhoto shape={v.photoShape} size={variant === "bold" ? 300 : 240} />
          <div style={{ fontSize: "0.82rem", color: "var(--ink2)", marginTop: "0.9rem", lineHeight: 1.55, fontFamily: FONT_HEAD.mono, maxWidth: variant === "bold" ? 300 : 240 }}>
            CURA Lab · Tech Square<br />Georgia Tech<br />Atlanta, GA 30332
          </div>
        </aside>
      </header>

      <section style={{ marginBottom: "3rem" }}>
        <SectionHeader>research interests</SectionHeader>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1.8rem 2.4rem" }}>
          {data.interests.map((it) => (
            <div key={it.title}>
              <div style={{ display: "flex", alignItems: "baseline", gap: "0.6rem", marginBottom: "0.35rem" }}>
                <span style={{ fontSize: "1.1rem" }}>{it.icon}</span>
                <h3 style={{ fontFamily: "var(--font-head)", fontWeight: 500, fontSize: "1.05rem", margin: 0, color: "var(--ink)" }}>{it.title}</h3>
              </div>
              <p style={{ margin: 0, fontSize: "0.92rem", lineHeight: 1.55, color: "var(--ink2)" }}>{it.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ marginBottom: "3rem" }}>
        <SectionHeader>selected projects</SectionHeader>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {data.projects.slice(0, 3).map((p, i) => (
            <button key={p.id} onClick={() => onOpenProject(p.id)}
              style={{ display: "grid", gridTemplateColumns: "90px 1fr auto", gap: "1.2rem", padding: "0.9rem 0", borderTop: i === 0 ? "none" : "1px solid var(--rule)", background: "none", border: "none", borderTopWidth: i===0?0:1, borderTopStyle: "solid", borderTopColor: "var(--rule)", textAlign: "left", cursor: "pointer", color: "inherit", fontFamily: "inherit", alignItems: "baseline" }}>
              <div style={{ fontFamily: FONT_HEAD.mono, fontSize: "0.78rem", color: "var(--ink2)", paddingTop: "0.2rem" }}>0{i + 1} ↗</div>
              <div>
                <div style={{ fontFamily: "var(--font-head)", fontWeight: 500, fontSize: "1.02rem", color: "var(--ink)", marginBottom: "0.25rem" }}>{p.title}</div>
                <div style={{ fontSize: "0.9rem", color: "var(--ink2)", lineHeight: 1.5 }}>{p.summary}</div>
              </div>
              <div style={{ fontSize: "0.8rem", color: "var(--accent)", whiteSpace: "nowrap" }}>read →</div>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}

function ProjectsPage({ data, onOpenProject }) {
  const [filter, setFilter] = useState("all");
  const categories = useMemo(() => ["all", ...new Set(data.projects.map(p => p.category))], [data]);
  const filtered = filter === "all" ? data.projects : data.projects.filter(p => p.category === filter);

  return (
    <div>
      <h1 style={{ fontFamily: "var(--font-head)", fontWeight: 300, fontSize: "2.6rem", margin: "0 0 0.4rem 0", color: "var(--ink)", letterSpacing: "-0.015em" }}>projects</h1>
      <p style={{ color: "var(--ink2)", fontSize: "1rem", margin: "0 0 1.6rem 0", maxWidth: "62ch" }}>
        A selection of recent research, coursework, and hackathon projects spanning spatial analytics, GeoAI, and urban policy. Click any card to read more.
      </p>

      {/* filter pills */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "2rem" }}>
        {categories.map(c => (
          <button key={c} onClick={() => setFilter(c)}
            style={{ fontFamily: FONT_HEAD.mono, fontSize: "0.75rem", padding: "0.3rem 0.7rem", borderRadius: 999, border: "1px solid var(--rule)", background: filter === c ? "var(--accent)" : "transparent", color: filter === c ? "#fff" : "var(--ink2)", cursor: "pointer", textTransform: "lowercase" }}>
            {c}
          </button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1.6rem" }}>
        {filtered.map((p) => (
          <button key={p.id} onClick={() => onOpenProject(p.id)}
            className="proj-card"
            style={{ border: "1px solid var(--rule)", borderRadius: 10, overflow: "hidden", background: "var(--surface)", display: "flex", flexDirection: "column", cursor: "pointer", textAlign: "left", padding: 0, color: "inherit", fontFamily: "inherit", transition: "transform 0.15s ease, box-shadow 0.15s ease" }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.08)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}>
            <div style={{ aspectRatio: "21/10", background: "#eee", position: "relative" }}>
              <ProjectThumb kind={p.accent} />
              <div style={{ position: "absolute", top: 8, left: 8, background: "rgba(0,0,0,0.55)", color: "#fff", fontSize: "0.72rem", padding: "0.2rem 0.6rem", borderRadius: 999, fontFamily: FONT_HEAD.mono }}>
                {p.category}
              </div>
            </div>
            <div style={{ padding: "1rem 1.1rem 1.2rem" }}>
              <h3 style={{ fontFamily: "var(--font-head)", fontWeight: 500, fontSize: "1.1rem", margin: "0 0 0.3rem 0", color: "var(--ink)" }}>{p.title}</h3>
              <div style={{ fontSize: "0.82rem", color: "var(--accent)", marginBottom: "0.5rem", fontStyle: "italic" }}>{p.subtitle}</div>
              <p style={{ margin: "0 0 0.8rem 0", fontSize: "0.88rem", lineHeight: 1.55, color: "var(--ink2)" }}>{p.summary}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                {p.tags.slice(0, 4).map((t) => (
                  <span key={t} style={{ fontFamily: FONT_HEAD.mono, fontSize: "0.7rem", padding: "0.15rem 0.5rem", border: "1px solid var(--rule)", borderRadius: 999, color: "var(--ink2)" }}>{t}</span>
                ))}
                {p.tags.length > 4 && <span style={{ fontFamily: FONT_HEAD.mono, fontSize: "0.7rem", color: "var(--ink2)" }}>+{p.tags.length - 4}</span>}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function ProjectDetailPage({ data, projectId, onBack }) {
  const project = data.projects.find((p) => p.id === projectId);
  if (!project) return <div>Project not found.</div>;

  return (
    <article>
      <button onClick={onBack} style={{ background: "none", border: "none", color: "var(--accent)", fontSize: "0.95rem", cursor: "pointer", padding: "0 0 1.2rem 0", fontFamily: "inherit" }}>
        ← Back to Projects
      </button>

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "1.8rem" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }}>
          <div>
            <div style={{ fontFamily: FONT_HEAD.mono, fontSize: "0.75rem", color: "var(--accent)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.5rem" }}>
              {project.category}
            </div>
            <h1 style={{ fontFamily: "var(--font-head)", fontWeight: 400, fontSize: "3rem", margin: "0 0 0.3rem 0", color: "var(--ink)", letterSpacing: "-0.02em", lineHeight: 1.05 }}>
              {project.title}
            </h1>
            <h2 style={{ fontFamily: "var(--font-head)", fontWeight: 400, fontSize: "1.25rem", margin: 0, color: "var(--ink2)", fontStyle: "italic" }}>
              {project.subtitle}
            </h2>
          </div>
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "var(--ink)", color: "var(--bg)", padding: "0.55rem 0.9rem", borderRadius: 6, fontSize: "0.9rem", fontWeight: 500, textDecoration: "none" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.09-.745.084-.73.084-.73 1.205.084 1.84 1.236 1.84 1.236 1.07 1.834 2.807 1.303 3.492.997.108-.775.417-1.303.76-1.603-2.665-.305-5.466-1.332-5.466-5.93 0-1.31.47-2.38 1.236-3.22-.124-.304-.536-1.527.117-3.176 0 0 1.01-.322 3.301 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.29-1.552 3.3-1.23 3.3-1.23 .653 1.649.242 2.872.118 3.176.767.84 1.235 1.91 1.235 3.22 0 4.61-2.807 5.62-5.479 5.92.43.37.81 1.102.81 2.222 0 1.604-.014 2.896-.014 3.286 0 .317.22.686.82.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
              View on GitHub
            </a>
          )}
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
          {project.tags.map((t) => (
            <span key={t} style={{ fontFamily: FONT_HEAD.mono, fontSize: "0.72rem", padding: "0.2rem 0.55rem", border: "1px solid var(--rule)", borderRadius: 4, color: "var(--ink2)" }}>{t}</span>
          ))}
        </div>
      </div>

      {/* hero image */}
      <div style={{ width: "100%", aspectRatio: "21/9", borderRadius: 10, overflow: "hidden", border: "1px solid var(--rule)", marginBottom: "1.8rem" }}>
        <ProjectThumb kind={project.accent} />
      </div>

      <p style={{ fontSize: "1.05rem", lineHeight: 1.7, color: "var(--ink)", marginTop: 0, maxWidth: "65ch" }}>
        {project.summary}
      </p>

      {project.sections.map((s, i) => (
        <section key={i} style={{ marginTop: "2rem" }}>
          <h3 style={{ fontFamily: "var(--font-head)", fontWeight: 500, fontSize: "1.4rem", margin: "0 0 0.7rem 0", color: "var(--ink)", letterSpacing: "-0.01em" }}>
            {s.heading}
          </h3>
          {s.body && (
            <p style={{ fontSize: "0.98rem", lineHeight: 1.7, color: "var(--ink)", margin: 0, maxWidth: "65ch" }}>{s.body}</p>
          )}
          {s.list && (
            <ul style={{ margin: "0.3rem 0 0 0", padding: 0, listStyle: "none" }}>
              {s.list.map((item, j) => (
                <li key={j} style={{ fontSize: "0.95rem", lineHeight: 1.6, color: "var(--ink)", paddingLeft: "1.2rem", position: "relative", marginBottom: "0.45rem", maxWidth: "65ch" }}>
                  <span style={{ position: "absolute", left: 0, color: "var(--accent)" }}>▸</span>
                  {item}
                </li>
              ))}
            </ul>
          )}
        </section>
      ))}
    </article>
  );
}

function CVPage({ data }) {
  return (
    <div>
      <h1 style={{ fontFamily: "var(--font-head)", fontWeight: 300, fontSize: "2.6rem", margin: "0 0 2.4rem 0", color: "var(--ink)", letterSpacing: "-0.015em" }}>curriculum vitae</h1>

      <section style={{ marginBottom: "2.6rem" }}>
        <SectionHeader>experience</SectionHeader>
        {data.experience.map((e, i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "180px 1fr", gap: "1.2rem", padding: "1rem 0", borderBottom: i === data.experience.length - 1 ? "none" : "1px solid var(--rule)" }}>
            <div style={{ fontFamily: FONT_HEAD.mono, fontSize: "0.78rem", color: "var(--ink2)", paddingTop: "0.2rem" }}>
              {e.dates}
              <div style={{ marginTop: "0.3rem", color: "var(--ink2)" }}>{e.location}</div>
            </div>
            <div>
              <div style={{ fontFamily: "var(--font-head)", fontWeight: 500, fontSize: "1.05rem", color: "var(--ink)" }}>{e.role}</div>
              <div style={{ fontSize: "0.92rem", color: "var(--ink2)", marginTop: "0.1rem", marginBottom: "0.6rem" }}>{e.org}</div>
              <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
                {e.bullets.map((b, j) => (
                  <li key={j} style={{ fontSize: "0.92rem", lineHeight: 1.6, color: "var(--ink)", paddingLeft: "1.1rem", position: "relative", marginBottom: "0.35rem" }}>
                    <span style={{ position: "absolute", left: 0, color: "var(--accent)" }}>▸</span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </section>

      <section style={{ marginBottom: "2.6rem" }}>
        <SectionHeader>education</SectionHeader>
        {data.education.map((e, i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "180px 1fr", gap: "1.2rem", padding: "0.9rem 0", borderBottom: i === data.education.length - 1 ? "none" : "1px solid var(--rule)" }}>
            <div style={{ fontFamily: FONT_HEAD.mono, fontSize: "0.78rem", color: "var(--ink2)", paddingTop: "0.2rem" }}>{e.dates}</div>
            <div>
              <div style={{ fontFamily: "var(--font-head)", fontWeight: 500, fontSize: "1.02rem", color: "var(--ink)" }}>{e.degree}</div>
              <div style={{ fontSize: "0.92rem", color: "var(--ink2)", marginTop: "0.1rem" }}>{e.school}{e.detail ? ` · ${e.detail}` : ""}</div>
              {e.courses && (
                <div style={{ fontSize: "0.85rem", color: "var(--ink2)", marginTop: "0.4rem", fontStyle: "italic" }}>Coursework: {e.courses}</div>
              )}
            </div>
          </div>
        ))}
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <SectionHeader>technical skills</SectionHeader>
        {data.skills.map((s, i) => (
          <div key={s.group} style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: "1.2rem", padding: "0.8rem 0", borderBottom: i === data.skills.length - 1 ? "none" : "1px solid var(--rule)", alignItems: "baseline" }}>
            <div style={{ fontFamily: "var(--font-head)", fontWeight: 500, fontSize: "0.98rem", color: "var(--ink)" }}>{s.group}</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem 0.5rem" }}>
              {s.items.map((it) => (
                <span key={it} style={{ fontFamily: FONT_HEAD.mono, fontSize: "0.78rem", padding: "0.2rem 0.55rem", background: "var(--chip)", border: "1px solid var(--rule)", borderRadius: 4, color: "var(--ink)" }}>{it}</span>
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

// ─── Icons ───────────────────────────────────────────────────────────────────
function SocialIcon({ kind, href }) {
  const paths = {
    email: <path d="M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zm0 2v.3l8 5 8-5V7H4zm16 2.3l-8 5-8-5V18h16V9.3z" />,
    github: <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.54 2.87 8.39 6.84 9.75.5.09.68-.22.68-.48v-1.68c-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.49-1.11-1.49-.91-.64.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.57 2.34 1.12 2.91.85.09-.67.35-1.12.63-1.38-2.22-.26-4.55-1.14-4.55-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.72 0 0 .84-.28 2.75 1.05A9.38 9.38 0 0 1 12 6.84a9.38 9.38 0 0 1 2.5.34c1.91-1.33 2.75-1.05 2.75-1.05.55 1.42.2 2.46.1 2.72.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.06.36.32.68.94.68 1.9v2.82c0 .27.18.58.69.48A10.02 10.02 0 0 0 22 12.26C22 6.58 17.52 2 12 2z" />,
    linkedin: <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.35V9h3.41v1.56h.05c.47-.9 1.64-1.85 3.38-1.85 3.61 0 4.28 2.38 4.28 5.47v6.27zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zm1.78 13.02H3.56V9h3.56v11.45z" />,
    scholar: <path d="M12 2L1 9l4 2.5V17l7 4 7-4v-5.5l2-1.25V16h2V9L12 2zm0 2.2L18.8 9 12 13.1 5.2 9 12 4.2zM7 13.2l5 3.05 5-3.05v2.5l-5 2.85-5-2.85v-2.5z" />,
  };
  return (
    <a href={href} style={{ color: "var(--ink2)", display: "inline-flex" }}
      onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
      onMouseLeave={(e) => (e.currentTarget.style.color = "var(--ink2)")}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">{paths[kind]}</svg>
    </a>
  );
}

// ─── Top nav ─────────────────────────────────────────────────────────────────
function TopNav({ page, setPage, name, dark, setDark }) {
  const items = [
    { id: "about", label: "about" },
    { id: "projects", label: "projects" },
    { id: "cv", label: "cv" },
  ];
  // "project-detail" is treated as still being on the projects tab
  const activeTab = page === "project-detail" ? "projects" : page;
  return (
    <nav style={{ position: "sticky", top: 0, zIndex: 10, background: "var(--surface)", borderBottom: "1px solid var(--rule)", padding: "0.8rem 1.2rem", display: "flex", alignItems: "center", justifyContent: "space-between", backdropFilter: "saturate(1.3) blur(6px)" }}>
      <button onClick={() => setPage("about")} style={{ background: "none", border: "none", fontFamily: "var(--font-head)", fontWeight: 500, fontSize: "1rem", color: "var(--ink)", cursor: "pointer", padding: 0, letterSpacing: "-0.01em" }}>
        {name}
      </button>
      <div style={{ display: "flex", gap: "0.3rem", alignItems: "center" }}>
        {items.map((it) => {
          const active = activeTab === it.id;
          return (
            <button key={it.id} onClick={() => setPage(it.id)} style={{ background: active ? "var(--chip)" : "none", border: "none", padding: "0.45rem 0.8rem", borderRadius: 6, fontSize: "0.92rem", color: active ? "var(--accent)" : "var(--ink)", fontWeight: active ? 500 : 400, cursor: "pointer", fontFamily: FONT_BODY }}>
              {it.label}
              {active && page !== "project-detail" && <span style={{ color: "var(--accent)", marginLeft: 2 }}> (current)</span>}
            </button>
          );
        })}
        <button onClick={() => setDark((d) => !d)} title="toggle theme" style={{ background: "none", border: "1px solid var(--rule)", padding: "0.35rem 0.5rem", borderRadius: 6, cursor: "pointer", marginLeft: "0.5rem", color: "var(--ink)", fontSize: "0.9rem" }}>
          {dark ? "☀" : "☾"}
        </button>
      </div>
    </nav>
  );
}

// ─── Root ────────────────────────────────────────────────────────────────────
function Portfolio({ variant = "warm", accent, fontHead, density = "comfortable", initialPage = "about" }) {
  const v = VARIANTS[variant];
  const [page, setPage] = useState(initialPage);
  const [detailId, setDetailId] = useState(null);
  const [dark, setDark] = useState(false);

  const effAccent = accent || v.accent;
  const effFontHead = FONT_HEAD[fontHead || v.fontHead];
  const pad = density === "compact" ? "1.4rem 1.4rem" : density === "airy" ? "3.2rem 3.2rem" : "2.2rem 2.4rem";

  const themeVars = dark
    ? { "--bg": "#0e1014", "--surface": "#14181f", "--ink": "#e8e6e3", "--ink2": "#8d8a85", "--rule": "#262b34", "--chip": "#1b2029", "--accent": effAccent, "--font-head": effFontHead }
    : { "--bg": v.bg, "--surface": v.surface, "--ink": v.ink, "--ink2": v.ink2, "--rule": v.rule, "--chip": "rgba(0,0,0,0.04)", "--accent": effAccent, "--font-head": effFontHead };

  const wrap = { background: "var(--bg)", color: "var(--ink)", fontFamily: FONT_BODY, minHeight: "100%", width: "100%", ...themeVars, display: "flex", flexDirection: "column" };

  const openProject = (id) => { setDetailId(id); setPage("project-detail"); };
  const backToProjects = () => { setDetailId(null); setPage("projects"); };

  return (
    <div style={wrap}>
      <TopNav page={page} setPage={(p) => { setDetailId(null); setPage(p); }} name={PORTFOLIO_DATA.shortName + " Duong"} dark={dark} setDark={setDark} />
      <main style={{ flex: 1, width: "100%", maxWidth: 880, margin: "0 auto", padding: pad, boxSizing: "border-box" }}>
        {page === "about" && <AboutPage data={PORTFOLIO_DATA} variant={variant} onOpenProject={openProject} />}
        {page === "projects" && <ProjectsPage data={PORTFOLIO_DATA} onOpenProject={openProject} />}
        {page === "project-detail" && <ProjectDetailPage data={PORTFOLIO_DATA} projectId={detailId} onBack={backToProjects} />}
        {page === "cv" && <CVPage data={PORTFOLIO_DATA} />}
      </main>
      <footer style={{ borderTop: "1px solid var(--rule)", padding: "1.2rem 1.5rem", fontSize: "0.82rem", color: "var(--ink2)", textAlign: "center", background: "var(--surface)" }}>
        © 2026 {PORTFOLIO_DATA.name}. Styled after <span style={{ color: "var(--accent)" }}>al-folio</span>. Last updated: April 2026.
      </footer>
    </div>
  );
}

Object.assign(window, { Portfolio, VARIANTS, FONT_HEAD });
