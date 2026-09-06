import { useEffect, useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpRight,
  BriefcaseBusiness,
  CalendarDays,
  Check,
  ChevronDown,
  Code2,
  Download,
  Github,
  Globe2,
  Layers3,
  Linkedin,
  Mail,
  Menu,
  Moon,
  MoveRight,
  NotebookTabs,
  Sparkles,
  Star,
  Sun,
  Trophy,
  X,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Your Name — Creative Developer Portfolio" },
      {
        name: "description",
        content:
          "A creative developer portfolio for thoughtful digital products, experiments, and community-led work.",
      },
      { property: "og:title", content: "Your Name — Creative Developer Portfolio" },
      {
        property: "og:description",
        content: "A creative developer portfolio for thoughtful digital products and experiments.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Portfolio,
});

const navItems = [
  ["About", "about"],
  ["Experience", "experience"],
  ["Projects", "projects"],
  ["Contact", "contact"],
] as const;

const experiences = [
  {
    company: "Your Company",
    role: "Product Engineer",
    date: "2024 — Present",
    detail: "Building useful tools where thoughtful interaction design meets dependable engineering.",
    tags: ["Product", "React", "Systems"],
    mark: "YC",
  },
  {
    company: "Independent Studio",
    role: "Creative Developer",
    date: "2023 — 2024",
    detail: "Partnered with people and teams to turn ambitious ideas into expressive digital experiences.",
    tags: ["Web", "Motion", "Design"],
    mark: "IS",
  },
  {
    company: "Community Lab",
    role: "Community Lead",
    date: "2022 — 2023",
    detail: "Organised workshops and gatherings that helped curious people learn, build, and ship together.",
    tags: ["Leadership", "Events", "Mentoring"],
    mark: "CL",
  },
];

const projects = [
  {
    number: "01",
    title: "Signal / Studio",
    type: "Creative platform",
    year: "2025",
    description: "A calm workspace for collecting ideas, shaping direction, and making work visible.",
    tags: ["React", "Motion", "Product"],
    tone: "project-signal",
    visual: "signal",
  },
  {
    number: "02",
    title: "Field Notes",
    type: "Research journal",
    year: "2024",
    description: "A visual archive for the small observations that become better questions and better work.",
    tags: ["Next.js", "Editorial", "CMS"],
    tone: "project-field",
    visual: "field",
  },
  {
    number: "03",
    title: "Orbit OS",
    type: "Product system",
    year: "2024",
    description: "A flexible operating layer for teams who want clarity without losing their creative edge.",
    tags: ["TypeScript", "Systems", "UX"],
    tone: "project-orbit",
    visual: "orbit",
  },
];

const hackathons = [
  { year: "2025", title: "Build for tomorrow", note: "Built a community-first tool in 48 hours.", accent: "Mint" },
  { year: "2024", title: "Open source sprint", note: "Shipped a small idea that found a real audience.", accent: "Sun" },
  { year: "2023", title: "Design in public", note: "Learned faster by making the process visible.", accent: "Sky" },
];

const awards = [
  { title: "Best in craft", issuer: "Independent Design Review", year: "2025" },
  { title: "Community builder", issuer: "Local Tech Collective", year: "2024" },
  { title: "People's choice", issuer: "Open Product Showcase", year: "2023" },
];

function useReveal() {
  const [visible, setVisible] = useState<Set<string>>(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        setVisible((current) => {
          const next = new Set(current);
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const id = entry.target.getAttribute("data-reveal");
              if (id) next.add(id);
            }
          });
          return next;
        });
      },
      { threshold: 0.12 },
    );
    document.querySelectorAll("[data-reveal]").forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return visible;
}

function Portfolio() {
  const [loaded, setLoaded] = useState(false);
  const [dark, setDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeProject, setActiveProject] = useState(0);
  const visible = useReveal();
  const meteors = useMemo(() => Array.from({ length: 26 }, (_, index) => index), []);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoaded(true), 1250);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    return () => document.documentElement.classList.remove("dark");
  }, [dark]);

  const revealClass = (id: string) => `reveal ${visible.has(id) ? "is-visible" : ""}`;

  return (
    <div className={`portfolio-shell ${loaded ? "is-loaded" : ""}`}>
      <div className="loader" aria-hidden={loaded}>
        <div className="loader-mark">YN<span>.</span></div>
        <div className="loader-bottom">
          <span>Portfolio / 2025</span>
          <span>Loading experience</span>
        </div>
        <div className="loader-progress"><span /></div>
      </div>

      <div className="meteor-field" aria-hidden="true">
        {meteors.map((meteor) => (
          <span
            className="meteor"
            key={meteor}
            style={{
              left: `${(meteor * 37 + 11) % 100}%`,
              top: `${(meteor * 61) % 90}%`,
              animationDelay: `${(meteor % 7) * 0.55}s`,
              animationDuration: `${5 + (meteor % 5)}s`,
            }}
          />
        ))}
      </div>

      <header className="site-header">
        <a href="#top" className="brand" aria-label="Back to top"><span>YN</span><i>.</i></a>
        <nav className={`site-nav ${menuOpen ? "is-open" : ""}`} aria-label="Main navigation">
          {navItems.map(([label, id], index) => (
            <a href={`#${id}`} key={id} onClick={() => setMenuOpen(false)}>
              <small>0{index + 1}</small>{label}
            </a>
          ))}
        </nav>
        <div className="header-actions">
          <Button className="theme-toggle" variant="ghost" size="icon" onClick={() => setDark((value) => !value)} aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}>
            {dark ? <Sun /> : <Moon />}
          </Button>
          <Button className="menu-toggle" variant="ghost" size="icon" onClick={() => setMenuOpen((value) => !value)} aria-label={menuOpen ? "Close menu" : "Open menu"}>
            {menuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </header>

      <main id="top">
        <section className="hero section-wrap">
          <div className="hero-copy">
            <p className="eyebrow"><span className="status-dot" /> Available for selected work</p>
            <h1>Hi, I’m<br /><em>Your Name</em><span className="wave">✦</span></h1>
            <p className="hero-role">Creative developer <span>/</span> product thinker <span>/</span> curious human</p>
            <p className="hero-intro">I turn rough ideas into clear, expressive digital experiences that feel good to use and even better to remember.</p>
            <div className="hero-actions">
              <Button asChild className="button-primary"><a href="#projects">Explore my work <MoveRight /></a></Button>
              <Button asChild variant="outline" className="button-secondary"><a href="#contact">Let’s talk <Mail /></a></Button>
            </div>
          </div>
          <div className="hero-art" aria-label="Abstract portrait placeholder">
            <div className="portrait-orbit orbit-one" />
            <div className="portrait-orbit orbit-two" />
            <div className="portrait-disc"><span>YN</span></div>
            <div className="hero-sticker sticker-top"><Sparkles /><span>Make it<br />meaningful.</span></div>
            <div className="hero-sticker sticker-bottom"><span>Based in<br /><strong>Your City</strong></span><ArrowUpRight /></div>
          </div>
          <a href="#about" className="scroll-cue"><span>Scroll to explore</span><ArrowDown /></a>
        </section>

        <section id="about" className={`${revealClass("about")} section-wrap about-section`} data-reveal="about">
          <SectionLabel number="01" title="A little about me" />
          <div className="about-grid">
            <h2>Making useful things<br /><span>with a little soul.</span></h2>
            <div className="about-copy">
              <p>I’m a developer who cares about the space between an idea and the moment it becomes real. I like systems that are considered, interfaces that feel alive, and teams that stay curious.</p>
              <p>When I’m not building, you’ll find me collecting references, learning something new, or helping other people find the confidence to start.</p>
              <div className="mini-facts"><span><strong>3+</strong> years building</span><span><strong>20</strong> curious projects</span><span><strong>∞</strong> tabs open</span></div>
            </div>
          </div>
        </section>

        <section id="experience" className={`${revealClass("experience")} section-wrap experience-section`} data-reveal="experience">
          <SectionLabel number="02" title="Where I’ve been" />
          <div className="experience-list">
            {experiences.map((experience, index) => (
              <article className="experience-row" key={experience.company}>
                <div className="experience-mark">{experience.mark}</div>
                <div className="experience-main"><h3>{experience.company}</h3><p>{experience.role}</p><div className="tag-row">{experience.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div>
                <div className="experience-detail"><time>{experience.date}</time><p>{experience.detail}</p></div>
                <span className="experience-index">0{index + 1}</span>
              </article>
            ))}
          </div>
        </section>

        <section className={`${revealClass("skills")} section-wrap skills-section`} data-reveal="skills">
          <div className="skills-heading"><SectionLabel number="03" title="Things I use" /><p>Tools are just tools. The fun is figuring out what they can become.</p></div>
          <div className="skill-cloud"><span>React</span><span>TypeScript</span><span>Next.js</span><span>Node.js</span><span>Figma</span><span>Motion</span><span>Postgres</span><span>Git & GitHub</span><span>CSS</span><span>Storybook</span><span>Notion</span><span>Curiosity</span></div>
        </section>

        <section id="projects" className={`${revealClass("projects")} section-wrap projects-section`} data-reveal="projects">
          <div className="section-heading-row"><SectionLabel number="04" title="Selected work" /><a href="#contact" className="text-link">Have a project in mind? <ArrowUpRight /></a></div>
          <div className="projects-grid">
            {projects.map((project, index) => (
              <article className={`project-card ${project.tone} ${activeProject === index ? "is-active" : ""}`} key={project.title} onMouseEnter={() => setActiveProject(index)}>
                <div className="project-visual"><ProjectVisual type={project.visual} /><span className="project-number">{project.number}</span><span className="project-link"><ArrowUpRight /></span></div>
                <div className="project-meta"><div><p className="project-type">{project.type} · {project.year}</p><h3>{project.title}</h3></div><p className="project-description">{project.description}</p></div>
                <div className="tag-row project-tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
              </article>
            ))}
          </div>
        </section>

        <section className={`${revealClass("hackathons")} section-wrap hackathons-section`} data-reveal="hackathons">
          <SectionLabel number="05" title="Built under pressure" />
          <div className="hackathon-intro"><h2>Small teams.<br /><span>Big energy.</span></h2><p>Hackathons remind me that momentum is a superpower. Here are a few moments that made me want to keep going.</p></div>
          <div className="hackathon-list">{hackathons.map((item, index) => <article key={item.title} className="hackathon-row"><div className={`hackathon-badge badge-${item.accent.toLowerCase()}`}><Zap /></div><div><time>{item.year}</time><h3>{item.title}</h3><p>{item.note}</p></div><span className="hackathon-arrow"><ArrowUpRight /></span><span className="hackathon-count">0{index + 1}</span></article>)}</div>
        </section>

        <section className={`${revealClass("awards")} section-wrap awards-section`} data-reveal="awards">
          <div className="awards-heading"><SectionLabel number="06" title="A few good moments" /><Trophy className="awards-icon" /></div>
          <div className="awards-grid">{awards.map((award) => <article className="award-card" key={award.title}><div className="award-stars">{[1, 2, 3, 4, 5].map((star) => <Star key={star} />)}</div><h3>{award.title}</h3><p>{award.issuer}</p><time>{award.year}</time></article>)}</div>
        </section>

        <section id="contact" className={`${revealClass("contact")} contact-section section-wrap`} data-reveal="contact">
          <div className="contact-note">Have a good idea?<span>Let’s make it real.</span></div>
          <div className="contact-main"><p className="eyebrow"><span className="status-dot" /> Always open to a good conversation</p><h2>Say hello<span>.</span></h2><a className="contact-email" href="mailto:hello@yourname.dev">hello@yourname.dev <ArrowUpRight /></a></div>
          <div className="contact-footer"><span>© 2025 Your Name</span><div><a href="#top">Back to top <ArrowUp /></a><a href="#top">Built with care <HeartMark /></a></div></div>
        </section>
      </main>
    </div>
  );
}

function SectionLabel({ number, title }: { number: string; title: string }) {
  return <div className="section-label"><span>{number}</span><h2>{title}</h2></div>;
}

function ProjectVisual({ type }: { type: string }) {
  if (type === "field") return <div className="visual-field"><div className="field-top"><span>FIELD / 01</span><span>Notes from the edge</span></div><div className="field-lines"><i /><i /><i /><i /></div><strong>observe<br />closely.</strong><div className="field-foot">A collection of useful questions</div></div>;
  if (type === "orbit") return <div className="visual-orbit"><div className="orbit-grid" /><div className="orbit-circle"><span>ORBIT</span></div><div className="orbit-label label-one">01 / focus</div><div className="orbit-label label-two">03 / flow</div><div className="orbit-label label-three">04 / repeat</div></div>;
  return <div className="visual-signal"><div className="signal-top"><span>signal / studio</span><span>● live</span></div><div className="signal-bars"><i /><i /><i /><i /><i /><i /><i /></div><div className="signal-caption"><span>shape the<br /><strong>signal.</strong></span><ArrowUpRight /></div><div className="signal-bottom"><span>clarity</span><span>01 — 04</span></div></div>;
}

function HeartMark() { return <span className="heart-mark">✦</span>; }