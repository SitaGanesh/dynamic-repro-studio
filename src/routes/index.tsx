import { useEffect, useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Github,
  Hand,
  House,
  Linkedin,
  Mail,
  Menu,
  Moon,
  Sun,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kintan Jain | AI & Web Developer" },
      { name: "description", content: "Kintan Jain — AI and web developer, automation enthusiast, and community leader." },
    ],
  }),
  component: Portfolio,
});

const experiences = [
  ["HabileLabs Pvt Ltd (in partnership with AWS)", "AI Intern", "May 2024 - Jul 2024", ["AI/ML", "AWS", "Docker"]],
  ["Autonomous Initiative (Robotics & AI Club)", "General Secretary", "2023 - Present", ["Leadership", "Robotics", "AI"]],
  ["AI & ML Community", "Head of Events", "2023 - 2024", ["Event Management", "AI/ML", "Workshops"]],
  ["Manipal University Jaipur", "Student Placement Coordinator", "2023 - Present", ["Career Guidance", "Mentorship"]],
  ["Google Developer Student Clubs - MUJ", "Member", "2023 - Present", ["Web Development", "AI", "Workshops"]],
  ["AlgoUniversity (backed by Y-Combinator)", "Software Development Extern", "May 2024 - Jul 2024", ["Software", "Scalability", "Cloud"]],
] as const;

const projects = [
  ["SIH25170: Multimodal Earth Observation Assistant", "2024 - 2025", "project-earth"],
  ["GSoC ML Project (HumanAI)", "2024", "project-gsoc"],
  ["Error Vault & Screenshots", "2024", "project-error"],
  ["WebFlow-Gallery", "2024", "project-gallery"],
  ["Creator Scheduler", "2024", "project-scheduler"],
] as const;

const hackathons = [
  ["September 2025", "Xepher - Kissan Connect", "Jaipur, India", "Developed Kissan Connect, a platform to help farmers find buyers directly for their produce, cutting out middlemen and ensuring better prices. Built using React.js, Node.js, and MongoDB."],
  ["2024 - 2025", "Smart India Hackathon 2025", "India (National Level)", "Qualified for 2nd Round with 3 projects: JobZen (placement portal platform for colleges commissioned by Government of Rajasthan), ML model for air quality prediction, and more."],
  ["2024", "Meta AI Hacker Cup", "Online", "Ranked 39 out of 14,000+ participants in the Meta AI Hacker Cup."],
] as const;

const awards = [
  ["Dean's List - 4 Semesters", "Recognized for academic excellence and top performance across 4 semesters at Manipal University Jaipur"],
  ["Red Hat Certification - DB", "Certified in Database Management Systems, demonstrating proficiency in database concepts"],
  ["1st Place - Xepher", "Won first place at the Xepher hackathon with an innovative technology solution"],
  ["Smart India Hackathon", "Qualified for Round 2 at the national-level innovation challenge"],
] as const;

function useReveal() {
  const [visible, setVisible] = useState<Set<string>>(new Set());
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      setVisible((current) => {
        const next = new Set(current);
        entries.forEach((entry) => {
          const id = entry.target.getAttribute("data-reveal");
          if (entry.isIntersecting && id) next.add(id);
        });
        return next;
      });
    }, { threshold: 0.1 });
    document.querySelectorAll("[data-reveal]").forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
  return visible;
}

function Portfolio() {
  const [loaded, setLoaded] = useState(false);
  const [dark, setDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [awardIndex, setAwardIndex] = useState(0);
  const visible = useReveal();
  const meteors = useMemo(() => Array.from({ length: 28 }, (_, index) => index), []);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoaded(true), 1000);
    return () => window.clearTimeout(timer);
  }, []);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    return () => document.documentElement.classList.remove("dark");
  }, [dark]);

  const reveal = (id: string) => `reveal ${visible.has(id) ? "is-visible" : ""}`;
  const previousAward = () => setAwardIndex((index) => (index - 1 + awards.length) % awards.length);
  const nextAward = () => setAwardIndex((index) => (index + 1) % awards.length);

  return (
    <div className={`portfolio-shell ${loaded ? "is-loaded" : ""}`}>
      <div className="loader" aria-hidden={loaded}><strong>KJ<span>.</span></strong><small>Portfolio Loading...</small><div className="loader-progress"><i /></div></div>
      <div className="meteor-field" aria-hidden="true">{meteors.map((meteor) => <span className="meteor" key={meteor} style={{ left: `${(meteor * 37 + 8) % 100}%`, top: `${(meteor * 61) % 95}%`, animationDelay: `${(meteor % 9) * .45}s`, animationDuration: `${5 + (meteor % 5)}s` }} />)}</div>

      <header className="site-header">
        <a className="brand" href="#top">KJ<span>.</span></a>
        <button className="menu-toggle" onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? "Close menu" : "Open menu"}>{menuOpen ? <X /> : <Menu />}</button>
        <nav className={menuOpen ? "site-nav is-open" : "site-nav"} aria-label="Main navigation">
          <a href="#about" onClick={() => setMenuOpen(false)}>About</a><a href="#experience" onClick={() => setMenuOpen(false)}>Experience</a><a href="#projects" onClick={() => setMenuOpen(false)}>Projects</a><a href="#awards" onClick={() => setMenuOpen(false)}>Achievements</a><a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
        </nav>
      </header>

      <main id="top" className="page-wrap">
        <section className="hero" data-reveal="hero">
          <div><h1>Hi, I'm Kintan <Hand className="hero-hand" /></h1><p className="hero-role">AI &amp; Web Developer <span>|</span> Automation Enthusiast <span>|</span> Community Leader</p><a className="scroll-cue" href="#about">Scroll to explore <ArrowDown /></a></div>
          <div className="hero-avatar" aria-label="Kintan Jain profile illustration"><span>KJ</span></div>
        </section>

        <section id="about" className={reveal("about")} data-reveal="about"><SectionTitle title="About" /><div className="about-copy"><p>I'm a 3rd-year B.Tech CSE (AI &amp; ML) student passionate about applying artificial intelligence, automation, and web technologies to solve real-world challenges. I thrive on exploring cutting-edge AI tools, automating workflows, and experimenting with creative ideas that bridge innovation and impact.</p><p>Beyond coding, I explore art, music, and origami—all of which fuel my creative approach to problem-solving and ideation. My long-term goal is to lead impactful projects at the intersection of AI, automation, and product development, scaling open-source and commercial solutions that improve lives while shaping the future of intelligent systems.</p><p>I've won multiple hackathons, including 1st place at Xepher, qualified for Round 2 in Smart India Hackathon, and ranked 39 out of 14,000+ participants in the Meta AI Hacker Cup. Currently, I'm leading tech communities at my university while building innovative projects that push the boundaries of what's possible with AI and automation.</p></div></section>

        <section id="experience" className={reveal("experience")} data-reveal="experience"><SectionTitle title="Work Experience" /><div className="experience-list">{experiences.map(([company, role, date, tags], index) => <article className="experience-row" key={company}><div className={`experience-mark mark-${index}`}>{index === 0 ? "hP" : index === 4 ? "G" : index === 5 ? "A" : "AI"}</div><div className="experience-main"><h3>{company}</h3><div className="tag-row">{tags.map((tag) => <span key={tag}>{tag}</span>)}</div><p>{role}</p></div><time>{date}</time><ArrowRight className="row-arrow" /></article>)}</div></section>

        <section className={reveal("skills")} data-reveal="skills"><SectionTitle title="Technologies & Skills" /><div className="skill-cloud">{["Python", "JavaScript", "React.js", "Node.js", "MongoDB", "PostgreSQL", "Docker", "AWS", "TensorFlow", "OpenAI", "Git", "Figma"].map((skill) => <span key={skill}>{skill}</span>)}</div></section>

        <section id="projects" className={reveal("projects")} data-reveal="projects"><SectionTitle title="Check out my latest work" /><p className="section-intro">I've worked on a variety of projects, from simple websites to complex web applications. Here are a few of my favorites.</p><div className="projects-grid">{projects.map(([title, year, visual]) => <article className="project-card" key={title}><div className={`project-visual ${visual}`}><span className="project-open"><ArrowUpRight /></span><strong>{title}</strong><small>{year}</small></div><h3>{title}</h3></article>)}</div></section>

        <section id="awards" className={reveal("awards")} data-reveal="awards"><div className="center-title"><span className="section-pill">Achievements</span><h2>Awards &amp; Recognition</h2><p>Click on cards to view certificates. Use arrows to navigate.</p></div><div className="award-carousel"><button onClick={previousAward} aria-label="Previous certificate"><ArrowLeft /></button><article className="award-card"><h3>{awards[awardIndex][0]}</h3><p>{awards[awardIndex][1]}</p><div className="award-stars">★★★★★</div><small>Hover to view certificate</small></article><button onClick={nextAward} aria-label="Next certificate"><ArrowRight /></button></div></section>

        <section id="hackathons" className={reveal("hackathons")} data-reveal="hackathons"><div className="center-title"><span className="section-pill">Hackathons</span><h2>I like building things</h2><p>During my time in university, I attended 7+ hackathons. People from around the country would come together and build incredible things in 2–3 days. It was eye-opening to see the endless possibilities brought to life by motivated and passionate individuals.</p></div><div className="hackathon-list">{hackathons.map(([date, title, place, detail]) => <article className="hackathon-row" key={title}><div className="hackathon-dot" /><div><time>{date}</time><h3>{title}</h3><p>{place}</p><span>{detail}</span></div></article>)}</div></section>

        <section id="contact" className={reveal("contact")} data-reveal="contact"><div className="contact-card"><SectionTitle title="Let's connect" /><h2>Have an idea?<br /><span>Let's build it.</span></h2><a className="contact-email" href="mailto:kintanjain2004@gmail.com">kintanjain2004@gmail.com <ArrowUpRight /></a></div></section>
      </main>

      <div className="floating-dock" aria-label="Quick links"><a href="#top" aria-label="Home"><House /></a><a href="#experience" aria-label="Experience"><span className="dock-file">▤</span></a><a href="#contact" aria-label="GitHub"><Github /></a><a href="#contact" aria-label="LinkedIn"><Linkedin /></a><a href="mailto:kintanjain2004@gmail.com" aria-label="Email"><Mail /></a><button onClick={() => setDark((value) => !value)} aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}>{dark ? <Sun /> : <Moon />}</button></div>
    </div>
  );
}

function SectionTitle({ title }: { title: string }) { return <h2 className="section-title">{title}</h2>; }
