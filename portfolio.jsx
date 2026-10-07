/* global React */
/*
 * Sam Duong — portfolio v2.
 *
 * Structural grammar borrowed from a reference portfolio Sam admires: oversized
 * condensed display type, numbered project cards with a synthetic "preview" panel,
 * a per-card accent rotation, pill navigation with one filled CTA. None of that
 * site's code, markup, classes or assets are used; this is original and carries
 * Sam's own content, typeface and palette.
 *
 * Two readers, one surface (plan D7): hiring managers scan Projects, admissions
 * readers scan Research. Research therefore sits ABOVE Projects.
 *
 * ARCHITECTURE NOTE: the browser loads the PRECOMPILED portfolio.js, never this
 * file. After editing, run `npm run build` or nothing changes on the live site.
 *
 * MOTION CONTRACT (motion.js): no CSS hides anything. Elements on screen use
 * gsap.from(); below-fold elements are pre-hidden with gsap.set() and restored by
 * teardown(). With scripts blocked or prefers-reduced-motion, the page renders
 * complete and static.
 */

const { useState, useEffect, useCallback } = React;

// ─── Tokens ──────────────────────────────────────────────────────────────────
// One source of truth for both themes. Light keeps a hint of the old warm cream
// so the site still reads as Sam's; dark supplies the contrast the layout needs.
const THEMES = {
  dark: {
    "--bg": "#0b0d0e",
    "--bg-2": "#101314",
    "--surface": "#15191b",
    "--ink": "#e9eef1",
    "--ink-2": "#9aa8b1",
    "--muted": "#6d7c85",
    "--line": "#242c31",
    "--line-2": "#1a2024",
    "--accent": "#f0631f",
    "--plate": "#0e1112",
  },
  light: {
    "--bg": "#fbfaf8",
    "--bg-2": "#f4f2ee",
    "--surface": "#ffffff",
    "--ink": "#15181a",
    "--ink-2": "#4d5a63",
    "--muted": "#76838c",
    "--line": "#e3e2de",
    "--line-2": "#eeedea",
    "--accent": "#c2410c",
    "--plate": "#f7f5f2",
  },
};

// Per-card accent ramp. Each project card carries its own hue on the status dot,
// the top hairline, the metric fills and the flow badges.
const RAMP = ["#f0631f", "#2a9d8f", "#4a8fe7", "#c77dff", "#e9b949", "#5ec28a"];

const FONT_DISPLAY = '"Archivo", Impact, "Arial Narrow", sans-serif';
// Condensed + heavy is what gives the display type its weight. Archivo's wdth
// axis supplies it from the same family the body never uses.
const DISPLAY = { fontFamily: FONT_DISPLAY, fontStretch: "75%", fontWeight: 800 };
// Chrome fill: the polish on the reference's headings. Falls back to solid --ink
// wherever background-clip:text is unsupported.
const CHROME = {
  background: "linear-gradient(172deg, var(--ink) 14%, var(--ink-2) 62%, var(--muted) 100%)",
  WebkitBackgroundClip: "text", backgroundClip: "text",
  WebkitTextFillColor: "transparent", color: "var(--ink)",
};
const FONT_BODY = '"Source Sans 3", -apple-system, system-ui, sans-serif';
const FONT_MONO = '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace';

// ─── Theme engine ────────────────────────────────────────────────────────────
function useTheme() {
  const read = () => {
    try {
      const saved = localStorage.getItem("sd-theme");
      if (saved === "light" || saved === "dark") return saved;
    } catch (e) {}
    try {
      return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
    } catch (e) {}
    return "dark";
  };
  const [theme, setTheme] = useState(read);
  useEffect(() => {
    const t = THEMES[theme] || THEMES.dark;
    const root = document.documentElement;
    Object.keys(t).forEach((k) => root.style.setProperty(k, t[k]));
    root.setAttribute("data-theme", theme);
    document.body.style.background = t["--bg"];
    document.body.style.color = t["--ink"];
    try { localStorage.setItem("sd-theme", theme); } catch (e) {}
  }, [theme]);
  const toggle = useCallback(() => setTheme((v) => (v === "dark" ? "light" : "dark")), []);
  return [theme, toggle];
}

// ─── Primitives ──────────────────────────────────────────────────────────────
function Pill({ href, children, filled, onClick, small }) {
  const base = {
    display: "inline-flex", alignItems: "center", gap: "0.45rem",
    padding: small ? "0.34rem 0.8rem" : "0.5rem 1rem",
    borderRadius: 999, fontFamily: FONT_MONO,
    fontSize: small ? "0.68rem" : "0.74rem",
    letterSpacing: "0.08em", textTransform: "uppercase",
    textDecoration: "none", cursor: "pointer",
    transition: "background 220ms ease, border-color 220ms ease, transform 220ms ease",
  };
  const style = filled
    ? { ...base, background: "var(--accent)", color: "#fff", border: "1px solid var(--accent)",
        boxShadow: "0 0 0 1px var(--accent), 0 6px 26px -6px var(--accent)" }
    : { ...base, background: "transparent", color: "var(--ink)", border: "1px solid var(--line)" };
  if (href) {
    const ext = href.indexOf("http") === 0;
    return (
      <a className="sd-pill" style={style} href={href}
         target={ext ? "_blank" : undefined} rel={ext ? "noopener noreferrer" : undefined}>
        {children}
      </a>
    );
  }
  return <button className="sd-pill" style={style} onClick={onClick} type="button">{children}</button>;
}

function Chip({ children }) {
  return (
    <span style={{
      fontFamily: FONT_MONO, fontSize: "0.64rem", letterSpacing: "0.06em",
      textTransform: "uppercase", padding: "0.22rem 0.55rem", borderRadius: 999,
      border: "1px solid var(--line)", color: "var(--ink-2)", whiteSpace: "nowrap",
    }}>{children}</span>
  );
}

function Eyebrow({ children, color }) {
  return (
    <div style={{
      fontFamily: FONT_MONO, fontSize: "0.68rem", letterSpacing: "0.18em",
      textTransform: "uppercase", color: color || "var(--accent)",
    }}>{children}</div>
  );
}

function SectionTitle({ children, kicker, intro }) {
  return (
    <div className="sd-sechead" style={{
      marginBottom: "2.2rem", display: "grid",
      gridTemplateColumns: intro ? "auto 1fr" : "1fr",
      gap: "2.2rem", alignItems: "end",
    }}>
      <div>
        {kicker && <div style={{ marginBottom: "0.7rem" }}><Eyebrow>{kicker}</Eyebrow></div>}
        <h2 style={{
          ...DISPLAY, fontWeight: 900,
          fontSize: "clamp(2rem, 5.6vw, 4rem)", lineHeight: 0.94,
          letterSpacing: "-0.035em", textTransform: "uppercase",
          margin: 0, ...CHROME,
        }}>{children}</h2>
      </div>
      {intro && (
        <p style={{ fontSize: "1rem", lineHeight: 1.6, color: "var(--ink-2)", margin: 0, maxWidth: "46ch", paddingBottom: "0.4rem" }}>
          {intro}
        </p>
      )}
    </div>
  );
}

// Low-opacity survey marks in the negative space. Decorative only.
function Decor() {
  return (
    <svg aria-hidden="true" width="100%" height="100%" style={{
      position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.55,
    }}>
      <defs>
        <pattern id="sd-dots" width="26" height="26" patternUnits="userSpaceOnUse">
          <circle cx="1.5" cy="1.5" r="1.1" fill="var(--line)" />
        </pattern>
      </defs>
      <rect x="64%" y="6%" width="34%" height="48%" fill="url(#sd-dots)" />
      <circle cx="88%" cy="24%" r="58" fill="none" stroke="var(--line)" strokeWidth="1" />
      <circle cx="88%" cy="24%" r="20" fill="none" stroke="var(--accent)" strokeWidth="1" opacity="0.5" />
    </svg>
  );
}

// ─── Hero ────────────────────────────────────────────────────────────────────
function Hero({ data }) {
  return (
    <header className="sd-hero" style={{
      position: "relative", paddingTop: "clamp(3rem, 9vh, 6rem)",
      paddingBottom: "clamp(2.5rem, 7vh, 4.5rem)", overflow: "hidden",
    }}>
      <Decor />
      <div style={{ position: "relative" }}>
        <div style={{ marginBottom: "1.4rem" }}>
          <Eyebrow>{data.tagline}</Eyebrow>
        </div>
        <h1 className="sd-hero-line" style={{
          ...DISPLAY, fontWeight: 900,
          fontSize: "clamp(2.8rem, 11vw, 9rem)", lineHeight: 0.86,
          letterSpacing: "-0.05em", textTransform: "uppercase",
          margin: "0 0 1.6rem 0", ...CHROME,
        }}>
          Explainable<br />geospatial AI.
        </h1>
        <p className="sd-hero-sub" style={{
          fontSize: "1.02rem", lineHeight: 1.65, color: "var(--ink-2)",
          maxWidth: "56ch", margin: "0 0 1.9rem 0",
        }}>
          {data.bio}
        </p>
        <div className="sd-hero-pills" style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem", alignItems: "center" }}>
          <Pill href="#research" filled>Research</Pill>
          <Pill href={data.links.github}>GitHub</Pill>
          <Pill href={data.links.linkedin}>LinkedIn</Pill>
          <Pill href={"mailto:" + data.email}>Email</Pill>
        </div>
      </div>
    </header>
  );
}

// ─── Research (above Projects — the admissions reader scans here first) ──────
const METHODS = [
  "Difference-in-differences", "Triple-difference", "Bunching / notch estimation",
  "Placebo design", "Bootstrap confidence intervals", "Spatial eigenvector filtering",
  "Retrieval benchmarking", "SHAP / GeoShapley",
];

function Research({ data }) {
  return (
    <section id="research" style={{ paddingTop: "clamp(3rem, 8vh, 5.5rem)" }}>
      <SectionTitle kicker="Peer-reviewed and in progress" intro="Papers, methods and the question underneath them. Artifacts are public where the venue allows.">Research</SectionTitle>

      <p style={{ fontSize: "1.06rem", lineHeight: 1.6, color: "var(--ink)", maxWidth: "62ch", margin: "0 0 1.6rem 0" }}>
        I study how regulatory thresholds and infrastructure rules reshape what gets built,
        and who carries the cost. The instruments I build are how I measure it.
      </p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "2.4rem" }}>
        {METHODS.map((m) => <Chip key={m}>{m}</Chip>)}
      </div>

      {data.publications.map((pub, i) => (
        <article key={i} className="sd-pub" style={{
          display: "grid", gridTemplateColumns: "150px 1fr", gap: "1.4rem",
          padding: "1.4rem 0", borderTop: "1px solid var(--line)",
        }}>
          <div>
            <div style={{ fontFamily: FONT_MONO, fontSize: "0.76rem", color: "var(--muted)" }}>{pub.year}</div>
            <div style={{ fontFamily: FONT_MONO, fontSize: "0.66rem", color: "var(--accent)", marginTop: "0.35rem", lineHeight: 1.45, textTransform: "uppercase", letterSpacing: "0.06em" }}>
              {pub.status}
            </div>
          </div>
          <div>
            <h3 style={{ fontFamily: FONT_BODY, fontWeight: 600, fontSize: "1.05rem", lineHeight: 1.35, margin: 0, color: "var(--ink)" }}>
              {pub.link
                ? <a href={pub.link} target="_blank" rel="noopener noreferrer" style={{ color: "inherit", borderBottom: "1px solid var(--line)", textDecoration: "none" }}>{pub.title}</a>
                : pub.title}
            </h3>
            <div style={{ fontSize: "0.92rem", color: "var(--ink-2)", marginTop: "0.3rem" }}>{pub.authors}</div>
            <div style={{ fontSize: "0.9rem", color: "var(--muted)", fontStyle: "italic", marginTop: "0.15rem" }}>{pub.venue}</div>
            {pub.note && <div style={{ fontSize: "0.86rem", color: "var(--muted)", marginTop: "0.4rem" }}>{pub.note}</div>}
          </div>
        </article>
      ))}
    </section>
  );
}

// ─── Project card: the signature device ──────────────────────────────────────
// Left column is a generated panel describing the system, not a screenshot.
// Metric bars render ONLY where real numbers exist in the data (plan D5):
// nothing here is invented to fill the pattern.
function PreviewPanel({ p, accent }) {
  const metrics = p.metrics || [];
  const flow = p.flow || [];
  return (
    <div style={{
      background: "var(--plate)", border: "1px solid var(--line)", borderRadius: 14,
      overflow: "hidden", display: "flex", flexDirection: "column",
    }}>
      <div style={{ height: 2, background: "linear-gradient(90deg, " + accent + ", transparent)" }} />
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0.6rem 0.8rem", borderBottom: "1px solid var(--line-2)",
      }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: "0.45rem", fontFamily: FONT_MONO, fontSize: "0.6rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ink-2)" }}>
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: accent, display: "inline-block" }} />
          {p.category}
        </span>
        <span style={{ fontFamily: FONT_MONO, fontSize: "0.56rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted)" }}>Preview</span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: metrics.length ? "1fr 1.15fr" : "1fr", gap: "0.7rem", padding: "0.8rem" }}>
        <div>
          <div style={{ fontFamily: FONT_MONO, fontSize: "0.54rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "0.4rem" }}>System</div>
          <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: "0.95rem", lineHeight: 1.1, textTransform: "uppercase", letterSpacing: "-0.01em", color: "var(--ink)", marginBottom: "0.7rem" }}>
            {p.title}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
            {(p.tags || []).slice(0, 4).map((t) => (
              <div key={t} style={{ fontFamily: FONT_MONO, fontSize: "0.56rem", letterSpacing: "0.05em", textTransform: "uppercase", color: "var(--ink-2)", border: "1px solid var(--line-2)", borderRadius: 5, padding: "0.26rem 0.4rem" }}>{t}</div>
            ))}
          </div>
        </div>

        {metrics.length > 0 && (
          <div>
            {metrics.map((m) => (
              <div key={m.label} style={{ marginBottom: "0.6rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: "0.4rem", fontFamily: FONT_MONO, fontSize: "0.54rem", letterSpacing: "0.05em", textTransform: "uppercase", color: "var(--ink-2)", marginBottom: "0.22rem" }}>
                  <span>{m.label}</span><span style={{ color: "var(--ink)" }}>{m.value}</span>
                </div>
                <div style={{ height: 3, background: "var(--line-2)", borderRadius: 2 }}>
                  <div style={{ height: 3, width: (m.pct || 100) + "%", background: accent, borderRadius: 2 }} />
                </div>
              </div>
            ))}
            {flow.length > 0 && (
              <div>
                <div style={{ fontFamily: FONT_MONO, fontSize: "0.54rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted)", margin: "0.7rem 0 0.4rem" }}>Flow</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(" + flow.length + ", 1fr)", gap: "0.35rem" }}>
                  {flow.map((f, i) => (
                    <div key={f} style={{ border: "1px solid var(--line-2)", borderRadius: 6, padding: "0.35rem 0.3rem", textAlign: "center" }}>
                      <div style={{ width: 15, height: 15, borderRadius: "50%", background: accent, color: "#fff", fontFamily: FONT_MONO, fontSize: "0.5rem", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 0.25rem" }}>{i + 1}</div>
                      <div style={{ fontFamily: FONT_MONO, fontSize: "0.5rem", lineHeight: 1.2, textTransform: "uppercase", color: "var(--ink-2)" }}>{f}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function ProjectCard({ p, index }) {
  const accent = RAMP[index % RAMP.length];
  const href = p.live || p.github || null;
  const support = [];
  (p.sections || []).forEach((sec) => {
    (sec.list || []).forEach((l) => { if (support.length < 3) support.push(l); });
  });
  return (
    <article className="sd-card" style={{
      border: "1px solid var(--line)", borderRadius: 22, padding: "clamp(1.1rem, 2.6vw, 1.9rem)",
      background: "var(--bg-2)", marginBottom: "1.5rem",
    }}>
      <div className="sd-card-head" style={{ display: "flex", alignItems: "flex-start", gap: "1.1rem", marginBottom: "1.3rem" }}>
        <div style={{
          ...DISPLAY, fontWeight: 900, fontSize: "clamp(2.4rem, 5.6vw, 3.8rem)",
          lineHeight: 0.82, letterSpacing: "-0.045em", flex: "none", ...CHROME,
        }}>{String(index + 1).length < 2 ? "0" + (index + 1) : String(index + 1)}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <Eyebrow color="var(--muted)">{p.category}</Eyebrow>
          <h3 style={{
            ...DISPLAY, fontWeight: 900, fontSize: "clamp(1.2rem, 3.2vw, 2rem)",
            lineHeight: 1.0, letterSpacing: "-0.025em", textTransform: "uppercase",
            margin: "0.3rem 0 0", color: "var(--ink)",
          }}>{p.title}</h3>
        </div>
        {href && <div style={{ flex: "none" }}><Pill href={href} small>Visit ↗</Pill></div>}
      </div>

      <div className="sd-card-body" style={{ display: "grid", gridTemplateColumns: "0.85fr 1fr", gap: "1.1rem" }}>
        <PreviewPanel p={p} accent={accent} />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <p style={{ fontSize: "1.02rem", lineHeight: 1.55, color: "var(--ink)", margin: "0 0 0.9rem 0" }}>{p.summary}</p>
          {support.length > 0 && (
            <div style={{ marginBottom: "0.9rem" }}>
              {support.map((line, i) => (
                <p key={i} style={{
                  fontSize: "0.87rem", lineHeight: 1.55, color: "var(--ink-2)",
                  margin: 0, padding: "0.6rem 0", borderTop: "1px solid var(--line-2)",
                }}>{line}</p>
              ))}
            </div>
          )}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem", marginTop: "auto" }}>
            {(p.tags || []).map((t) => <Chip key={t}>{t}</Chip>)}
          </div>
        </div>
      </div>
    </article>
  );
}

function Projects({ data }) {
  const [showAll, setShowAll] = useState(false);
  const featured = data.projects.filter((p) => p.featured);
  const rest = data.projects.filter((p) => !p.featured);
  return (
    <section id="projects" style={{ paddingTop: "clamp(3rem, 8vh, 5.5rem)" }}>
      <SectionTitle kicker="Selected work" intro="Systems I built or lead: agentic GeoAI, civic evidence platforms, spatial pipelines and on-device models.">Projects</SectionTitle>
      {featured.map((p, i) => <ProjectCard key={p.id} p={p} index={i} />)}
      {showAll && rest.map((p, i) => <ProjectCard key={p.id} p={p} index={featured.length + i} />)}
      {rest.length > 0 && (
        <div style={{ marginTop: "1rem" }}>
          <Pill onClick={() => setShowAll(!showAll)}>
            {showAll ? "Show less" : "All " + data.projects.length + " projects"}
          </Pill>
        </div>
      )}
    </section>
  );
}

// ─── Experience ──────────────────────────────────────────────────────────────
function Experience({ data }) {
  return (
    <section id="experience" style={{ paddingTop: "clamp(3rem, 8vh, 5.5rem)" }}>
      <SectionTitle kicker="Where the work happened" intro="Founding engineering, university research and the industry roles underneath them.">Experience</SectionTitle>
      {data.experience.map((e, i) => (
        <div key={i} className="sd-row" style={{
          display: "grid", gridTemplateColumns: "190px 1fr", gap: "1.4rem",
          padding: "1.4rem 0", borderTop: "1px solid var(--line)",
        }}>
          <div style={{ fontFamily: FONT_MONO, fontSize: "0.74rem", color: "var(--muted)", lineHeight: 1.6 }}>
            {e.dates}<br />{e.location}
          </div>
          <div>
            <h3 style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: "1.1rem", textTransform: "uppercase", letterSpacing: "-0.01em", margin: 0, color: "var(--ink)" }}>{e.role}</h3>
            <div style={{ fontSize: "0.93rem", color: "var(--accent)", margin: "0.15rem 0 0.7rem" }}>{e.org}</div>
            <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
              {e.bullets.map((b, j) => (
                <li key={j} style={{ fontSize: "0.93rem", lineHeight: 1.6, color: "var(--ink-2)", paddingLeft: "1rem", position: "relative", marginBottom: "0.4rem" }}>
                  <span style={{ position: "absolute", left: 0, color: "var(--accent)" }}>▸</span>{b}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </section>
  );
}

// ─── Education + skills ──────────────────────────────────────────────────────
function Credentials({ data }) {
  return (
    <section id="credentials" style={{ paddingTop: "clamp(3rem, 8vh, 5.5rem)" }}>
      <SectionTitle kicker="Training">Education</SectionTitle>
      {data.education.map((e, i) => (
        <div key={i} className="sd-row" style={{
          display: "grid", gridTemplateColumns: "190px 1fr", gap: "1.4rem",
          padding: "1.1rem 0", borderTop: "1px solid var(--line)",
        }}>
          <div style={{ fontFamily: FONT_MONO, fontSize: "0.74rem", color: "var(--muted)" }}>{e.dates}</div>
          <div>
            <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: "1.02rem", textTransform: "uppercase", color: "var(--ink)" }}>{e.degree}</div>
            {e.concentration && <div style={{ fontSize: "0.88rem", color: "var(--ink-2)", marginTop: "0.1rem" }}>Concentration: {e.concentration}</div>}
            <div style={{ fontSize: "0.9rem", color: "var(--ink-2)", marginTop: "0.1rem" }}>{e.school}{e.detail ? " · " + e.detail : ""}</div>
          </div>
        </div>
      ))}

      <div style={{ marginTop: "2.6rem" }}>
        <SectionTitle kicker="Tools">Skills</SectionTitle>
        {data.skills.map((s) => (
          <div key={s.group} className="sd-row" style={{
            display: "grid", gridTemplateColumns: "190px 1fr", gap: "1.4rem",
            padding: "0.9rem 0", borderTop: "1px solid var(--line)", alignItems: "baseline",
          }}>
            <div style={{ fontFamily: FONT_MONO, fontSize: "0.7rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--muted)" }}>{s.group}</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
              {s.items.map((it) => <Chip key={it}>{it}</Chip>)}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Resume ──────────────────────────────────────────────────────────────────
function Resume({ data }) {
  return (
    <section id="resume" style={{ paddingTop: "clamp(3rem, 8vh, 5.5rem)" }}>
      <SectionTitle kicker="One page" intro="The short version, kept current. Open it, download it, or go straight to the source.">Resume</SectionTitle>
      <div className="sd-resume" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.6rem", alignItems: "start" }}>
        <a href="assets/Sam_Duong_Resume.pdf" target="_blank" rel="noopener noreferrer"
           style={{ display: "block", border: "1px solid var(--line)", borderRadius: 16, overflow: "hidden", background: "var(--plate)" }}>
          <img src="assets/resume-preview.webp" alt="First page of Sam Duong's resume"
               style={{ width: "100%", height: "auto", display: "block" }} />
        </a>
        <div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem", marginBottom: "1.6rem" }}>
            <Pill href="assets/Sam_Duong_Resume.pdf" filled>Download resume ↗</Pill>
            <Pill href="assets/Sam_Duong_Resume.pdf">Open in new tab</Pill>
          </div>
          <div style={{ fontFamily: FONT_MONO, fontSize: "0.68rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "0.8rem" }}>Elsewhere</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            <Pill href={data.links.github} small>GitHub</Pill>
            <Pill href={data.links.linkedin} small>LinkedIn</Pill>
            <Pill href={"mailto:" + data.email} small>{data.email}</Pill>
            {data.links.scholar && <Pill href={data.links.scholar} small>Scholar</Pill>}
          </div>
          <p style={{ fontSize: "0.9rem", lineHeight: 1.6, color: "var(--muted)", marginTop: "1.6rem", maxWidth: "40ch" }}>
            Based in {data.location}. Open to research collaborations and engineering work on
            infrastructure, housing and energy systems.
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── Nav + footer ────────────────────────────────────────────────────────────
const NAV_ITEMS = [["research", "Research"], ["projects", "Projects"], ["experience", "Experience"], ["credentials", "Education"], ["resume", "Resume"]];

function Nav({ name, theme, toggle }) {
  return (
    <nav style={{
      position: "sticky", top: 0, zIndex: 20, background: "var(--bg)",
      borderBottom: "1px solid var(--line)", padding: "0.75rem 0",
      display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem",
    }}>
      <a href="#top" style={{
        fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: "0.86rem",
        letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ink)", textDecoration: "none",
      }}>{name}</a>
      <div className="sd-nav-links" style={{ display: "flex", alignItems: "center", gap: "0.2rem" }}>
        {NAV_ITEMS.map((it) => (
          <a key={it[0]} href={"#" + it[0]} style={{
            fontFamily: FONT_MONO, fontSize: "0.68rem", letterSpacing: "0.1em",
            textTransform: "uppercase", color: "var(--ink-2)", textDecoration: "none",
            padding: "0.4rem 0.55rem", borderRadius: 999,
          }}>{it[1]}</a>
        ))}
        <button onClick={toggle} title="Toggle theme" aria-label="Toggle colour theme" style={{
          background: "transparent", border: "1px solid var(--line)", borderRadius: 999,
          padding: "0.35rem 0.6rem", cursor: "pointer", color: "var(--ink)", fontSize: "0.8rem", marginLeft: "0.35rem",
        }}>{theme === "dark" ? "☀" : "☾"}</button>
      </div>
    </nav>
  );
}

function Footer({ data }) {
  return (
    <footer style={{ marginTop: "clamp(3rem, 9vh, 6rem)", borderTop: "1px solid var(--line)", paddingTop: "2rem", paddingBottom: "3rem" }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1.6rem", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: "0.86rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ink)" }}>{data.name}</div>
          <div style={{ fontSize: "0.88rem", color: "var(--ink-2)", marginTop: "0.5rem", maxWidth: "42ch" }}>
            {data.affiliation.role} at {data.affiliation.lab}, {data.affiliation.org}.
          </div>
          <div style={{ fontFamily: FONT_MONO, fontSize: "0.74rem", color: "var(--muted)", marginTop: "0.6rem" }}>{data.location} · {data.email}</div>
        </div>
        <div>
          <div style={{ fontFamily: FONT_MONO, fontSize: "0.66rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "0.9rem" }}>Elsewhere</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <a href={data.links.github} target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.9rem", color: "var(--ink-2)", textDecoration: "none" }}>GitHub ↗</a>
            <a href={data.links.linkedin} target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.9rem", color: "var(--ink-2)", textDecoration: "none" }}>LinkedIn ↗</a>
            <a href="assets/Sam_Duong_Resume.pdf" target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.9rem", color: "var(--ink-2)", textDecoration: "none" }}>Resume ↗</a>
            <a href={"mailto:" + data.email} style={{ fontSize: "0.9rem", color: "var(--ink-2)", textDecoration: "none" }}>Email ↗</a>
          </div>
        </div>
      </div>
      <div style={{ fontFamily: FONT_MONO, fontSize: "0.68rem", color: "var(--muted)", marginTop: "2rem" }}>
        © 2026 {data.name}. Built and maintained by hand.
      </div>
    </footer>
  );
}

// ─── Root ────────────────────────────────────────────────────────────────────
function Portfolio() {
  const data = window.PORTFOLIO_DATA;
  const themeState = useTheme();
  const theme = themeState[0], toggle = themeState[1];
  return (
    <div id="top" style={{
      background: "var(--bg)", color: "var(--ink)", fontFamily: FONT_BODY,
      minHeight: "100%", width: "100%",
    }}>
      <div style={{ maxWidth: 1080, margin: "0 auto", padding: "0 clamp(1rem, 4vw, 2.5rem)" }}>
        <Nav name={data.shortName + " Duong"} theme={theme} toggle={toggle} />
        <Hero data={data} />
        <Research data={data} />
        <Projects data={data} />
        <Experience data={data} />
        <Credentials data={data} />
        <Resume data={data} />
        <Footer data={data} />
      </div>
    </div>
  );
}

Object.assign(window, { Portfolio, THEMES, RAMP });
