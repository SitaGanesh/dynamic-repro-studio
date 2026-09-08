import { useEffect, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { MeteorBackground } from "@/components/meteors";
import AchievementsCarousel, { AchievementItem } from "@/components/achievements-carousel";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ChevronRight,
  Github,
  Globe,
  House,
  Linkedin,
  Mail,
  Moon,
  Sun,
} from "lucide-react";
import { ProjectFlipCard } from "@/components/project-flip-card";
import { projects } from "@/data/projects";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import AutoScroll from "embla-carousel-auto-scroll";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sita Ganesh | AI & Full Stack Developer" },
      { name: "description", content: "Sita Ganesh — AI and full stack developer focused on backend systems, automation, and hackathon-driven innovation." },
    ],
  }),
  component: Portfolio,
});

const experiences = [
  {
    company: "Freelancing",
    role: "Full Stack Developer",
    date: "Jan 2025 - Present",
    tags: ["AI", "Django", "Docker", "React.js", "SQL"],
    image: "/logos/freelancing-logo.png",
    link: null,
  },
  {
    company: "NullClass",
    role: "Data Science Internship",
    date: "Jun 2025 - Jul 2025",
    tags: ["Stable Diffusion", "Deep Learning", "Colorization"],
    image: "/logos/nullclass-logo.png",
    link: null,
  },
  {
    company: "OpenSource Contribution (OpenWisp,CodenStitches)",
    role: "Feature Creation, Testing",
    date: "Dec 2024 - April 2025",
    tags: ["Python", "Django", "JavaScript"],
    image: "/logos/opensource-logo.png",
    link: null,
  },
  {
    company: "Swami Vivekananda Institute of Technology",
    role: "Student Trainig and Placement Coordinator",
    date: "2023 - 2024",
    tags: ["Career Guidance", "Mentorship"],
    image: "/logos/svit-logo.png",
    link: null,
  },
  {
    company: "Street Cause",
    role: "Event & Ticketing Operations Support",
    date: "Mar 2023 - Apr 2023",
    tags: ["Event Operations", "Logistics", "Ticketing Systems"],
    image: "/logos/street-cause-logo.png",
    link: null,
  },
] as const;

const hackathons = [
  {
    date: "November 2025",
    title: "Winner – 1st Place among 1,600+ Participants- EcoGuard AI",
    organization: "NIAT x Base44",
    location: "Malla Reddy Institute of Technology",
    description: "Built EcoGuard AI, an intelligent environmental monitoring platform using OpenAI GPT-4, Whisper, and DALL·E for AI-powered threat analysis, multilingual environmental reporting, and automated community response.",
    image: "/hackathons/eco-guard.jpg",
    link: null,
  },
  {
    date: "April 2026",
    title: "Final Round - AgentIQ",
    organization: "CMR College of Engineering & Technology",
    location: "Hyderabad, India",
    description: "Developed a fully functional AI-powered Agentic RAG system for Salesforce sales teams to automate sales workflows, identify potential leads, and generate personalized proposals using LangGraph, LangChain, Groq, and Supabase Vector Database.",
    image: "/hackathons/agentiq.png",
    link: null,
  },
  {
    date: "October 2025",
    title: "Top 10 Finalist - PSQualcomm",
    organization: "Qualcomm – IIIT Hyderabad",
    location: "Hyderabad, India",
    description: "Developed an on-device artistic image generation system using Stable Diffusion, optimized for Qualcomm NPU acceleration, enabling efficient AI-powered image generation on edge devices.",
    image: "/hackathons/psqualcomm.png",
    link: "https://unstop.com/competitions/ps-qualcomm-qualcomm-iiit-hyderabad-1543000",
  },
  {
    date: "August 2025 – September 2025",
    title: "Top 3 – Institute-Level Hackathon - SafeSafar",
    organization: "Smart India Hackathon 2025 – Internal Round",
    location: "CMR College of Engineering & Technology",
    description: "Contributed to two Top 3 hackathon projects: an AI-powered tourist safety application and an AR/GIS-based platform for rooftop rainwater harvesting and artificial groundwater recharge.",
    image: "/hackathons/safe-safar.png",
    link: null,
  },
] as const;

const achievementsData: AchievementItem[] = [

  {
    id: "blog-designer",
    title: "Blog Designer – Second Semester Winner",
    description:
      "Designed and developed a responsive blog interface for the college website using HTML, CSS, JavaScript, and Bootstrap; secured 1st place in the Second Semester Blog Design Competition.",
    rating: 5,
    image: "/certificates/cert.jpeg",
  },

  {
    id: "motogp-datathon",
    title: "MotoGP Datathon 2025 – Certificate of Participation",
    description:
      "Participated in the 12-hour MotoGP Data Analytics Hackathon by IEEE CS, performing exploratory data analysis, developing machine learning models, and submitting predictions through Kaggle.",
    rating: 4,
    image: "/certificates/cert1.png",
  },

  {
    id: "hack-4-mini",
    title: "Hack-4-Mini 2.0 – Certificate of Participation",
    description:
      "Participated in Hack-4-Mini 2.0 by CMRCTC and Unstop, exploring emerging technologies including Web3, Generative AI, and Multimodal Intelligence through a hands-on hackathon experience.",
    rating: 4,
    image: "/certificates/cert2.png",
  },

  {
    id: "freecodecamp-js",
    title: "JavaScript Algorithms and Data Structures – freeCodeCamp",
    description:
      "Completed freeCodeCamp's JavaScript Algorithms and Data Structures curriculum, strengthening programming fundamentals through algorithmic problem solving, data structures, and hands-on coding projects.",
    rating: 5,
    image: "/certificates/cert3.png",
  },

  {
    id: "meta-frontend",
    title: "Meta Front-End Developer Professional Certificate – Coursera",
    description:
      "Completed Meta's Front-End Developer Professional Certificate, covering HTML, CSS, JavaScript, React, Git, UX/UI principles, front-end development, capstone development, and coding interview preparation.",
    rating: 5,
    image: "/certificates/cert4.png",
  },

  {
    id: "responsive-web-design",
    title: "Responsive Web Design – freeCodeCamp",
    description:
      "Completed freeCodeCamp's Responsive Web Design curriculum, building a strong foundation in semantic HTML, modern CSS, responsive layouts, accessibility, and mobile-first web development.",
    rating: 5,
    image: "/certificates/cert5.png",
  },


  {
    id: "emerging-technology-presentation",
    title: "Emerging Technology Evaluation – Best PPT Presentation Award",
    description:
      "Won the Best PPT Presentation Award for an Emerging Technology evaluation, presenting an innovative solution to the entire department and securing the top position among participants from the branch.",
    rating: 5,
    image: "/certificates/cert6.jpeg"
  },

  {
    id: "machine-learning-python",
    title: "Machine Learning Using Python – Self-Learning Course",
    description:
      "Completed 92% of the Machine Learning Using Python course through self-directed learning, developing foundational knowledge of machine learning concepts and Python-based ML workflows.",
    rating: 4,
    image: "/certificates/cert7.png"
  },

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
  const [hackathonProgress, setHackathonProgress] = useState(0);
  const hackathonSectionRef = useRef<HTMLElement | null>(null);
  const visible = useReveal();

  useEffect(() => {
    const timer = window.setTimeout(() => setLoaded(true), 1400);
    return () => window.clearTimeout(timer);
  }, []);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    return () => document.documentElement.classList.remove("dark");
  }, [dark]);
  useEffect(() => {
    let frame = 0;

    const updateProgress = () => {
      frame = 0;
      const section = hackathonSectionRef.current;
      if (!section) return;

      const { top, height } = section.getBoundingClientRect();
      const startPoint = window.innerHeight * 0.78;
      const endPoint = window.innerHeight * 0.2;
      const progress = (startPoint - top) / (height + startPoint - endPoint);
      setHackathonProgress(Math.min(1, Math.max(0, progress)));
    };

    const handleScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const reveal = (id: string) => `reveal ${visible.has(id) ? "is-visible" : ""}`;

  return (
    <div className={`portfolio-shell ${loaded ? "is-loaded" : ""}`}>
      <div className="loader" aria-hidden={loaded}>
        <div className="loader-field" aria-hidden="true">
          <div className="loader-grid" />
          <div className="loader-orbit loader-orbit-one" />
          <div className="loader-orbit loader-orbit-two" />
          <div className="loader-orbit loader-orbit-three" />
          <div className="loader-scan" />
        </div>
        <div className="loader-content">
          <strong>KJ<span>.</span></strong>
          <h2>Portfolio Loading...</h2>
          <div className="loader-progress"><i /></div>
        </div>
      </div>
      <MeteorBackground />



      <main id="top" className="page-wrap bg-transparent">
        <section id="hero" data-reveal="hero">
          <div className="mx-auto w-full max-w-2xl space-y-8">
            <div className="gap-2 flex justify-between">
              <div className="flex-col flex flex-1 space-y-1.5">
                <div className="flex">
                  <span className="inline-block text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none" style={{opacity: 1, filter: "blur(0px)", transform: "translateY(-8px)"}}>Hi, I'm Sita Ganesh</span>
                </div>
                <div className="flex">
                  <span className="inline-block max-w-[600px] md:text-xl" style={{opacity: 1, filter: "blur(0px)", transform: "translateY(-8px)"}}>Software Engineer | Building Backend Systems &amp; AI-Powered Applications</span>
                </div>
              </div>
              <div style={{opacity: 1, filter: "blur(0px)", transform: "translateY(-6px)"}}>
                <span className="relative flex shrink-0 overflow-hidden rounded-full size-28 border">
                  <img className="aspect-square h-full w-full object-cover" alt="Sita Ganesh" src="/profile-photo.png" />
                </span>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className={reveal("about")} data-reveal="about"><h2 className="text-lg sm:text-xl font-bold">About</h2><div className="about-copy"><p>I'm a B.Tech CSE (AI &amp; ML) graduate who enjoys turning ideas and real-world problems into practical, reliable software. My work spans backend systems, full-stack applications, APIs, intelligent workflows, and AI-powered solutions. I enjoy going deep into technologies through documentation, experimentation, and hands-on development, with a focus on maintainable code, engineering trade-offs, and building things the right way.</p><p>Problem-solving is central to how I grow as a developer. I practice DSA and LeetCode, participate in hackathons, and build projects that push me to learn unfamiliar technologies and turn ideas into working products under real constraints. I take ownership of my work, learn quickly, and focus on solving problems that create meaningful impact.</p><p>Beyond engineering, I explore art, music, and nature. Exploring new places and spending time away from screens helps me stay grounded, calm, and open to new perspectives and creative ideas. I bring that same curiosity into engineering as I continue growing into a well-rounded developer who can understand problems, design solutions, and build and ship software that people use.</p><p><strong>Curious developer. Problem solver. Builder.</strong> Always learning, exploring, and turning ideas into software.</p></div></section>

        <section id="experience" className={reveal("experience")} data-reveal="experience"><div className="experience-heading"><h2 className="text-xl font-bold">Work Experience</h2></div><div className="flex min-h-0 flex-col gap-y-3">{experiences.map((experience) => <a key={experience.company} className="block cursor-pointer" href={experience.link || "#"} onClick={(e) => !experience.link && e.preventDefault()}><div className="rounded-lg bg-card text-card-foreground flex p-3 sm:p-4"><div className="flex-none"><span className="experience-logo relative flex shrink-0 overflow-hidden rounded-full border size-10 sm:size-12 m-auto"><img className="aspect-square h-full w-full object-contain" alt={experience.company} src={experience.image} /></span></div><div className="flex-grow ml-3 sm:ml-4 items-center flex-col group"><div className="flex flex-col p-0"><div className="flex items-center justify-between gap-x-2 text-base"><h3 className="inline-flex items-center justify-center font-semibold leading-none text-xs sm:text-sm gap-1">{experience.company}<span className="inline-flex gap-x-1 flex-wrap">{experience.tags.map((tag) => <div key={tag} className="inline-flex items-center rounded-md border font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 align-middle text-[10px] sm:text-xs px-1.5 py-0.5">{tag}</div>)}</span><ChevronRight className="size-3 sm:size-4 translate-x-0 transform opacity-0 transition-all duration-300 ease-out group-hover:translate-x-1 group-hover:opacity-100 rotate-0" /></h3><div className="text-xs sm:text-sm tabular-nums text-muted-foreground text-right shrink-0">{experience.date}</div></div><div className="font-sans text-xs mt-1">{experience.role}</div></div></div></div></a>)}</div></section>

        <section id="skills" className={reveal("skills")} data-reveal="skills">
          <div className="w-full py-6 sm:py-12">
            <div className="container mx-auto px-2 sm:px-4">
              <div className="flex flex-col gap-6 sm:gap-10">
                <h2 className="text-xl md:text-3xl tracking-tighter font-bold text-center">Technologies & Skills</h2>
                <Carousel
                  plugins={[
                    AutoScroll({
                      speed: 1,
                      startDelay: 0,
                    }),
                  ]}
                  opts={{
                    loop: true,
                    align: "start",
                  }}
                  className="relative w-full"
                >
                  <CarouselContent className="-ml-2 sm:-ml-4">
                    {[
                      "Python","JavaScript","Java","Django", "FastAPI","Flask", "React.js",
                      "Tailwind CSS", "ShadCN UI", "MySQL", 
                      "PostgreSQL", "SQLite","API Integrations","JWT","OAuth2","pytest","Machine Learning", "NumPy", "Pandas", 
                      "Matplotlib", "Seaborn", "Scikit-learn", "PyTorch", 
                      "Deep Learning", "NLP", "n8n", "Agentic AI","LangGraph","LangChain","Retrieval-Augmented Generation (RAG)",
                      "AWS (EC2,Lambda)", "Vercel", 
                      "Render", "Docker", "Git & GitHub", "Postman", "Jupyter Notebooks", "Data Structures","Operating System","Computer Networks","Object Oriented Programming"
                    ].map((skill, i) => (
                      <CarouselItem
                        key={i}
                        className="basis-1/2 sm:basis-1/3 lg:basis-1/6 pl-2 sm:pl-4"
                      >
                        <div className="flex items-center justify-center p-2 sm:p-4 hover:bg-accent transition-colors rounded-md">
                          <span className="text-sm sm:text-base font-bold text-foreground whitespace-nowrap">
                            {skill}
                          </span>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                </Carousel>
              </div>
            </div>
          </div>
        </section>

        <section id="projects" className={reveal("projects")} data-reveal="projects">
          <div className="replica-section-heading"><div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">My Projects</div><h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Check out my latest work</h2><p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed max-w-[900px] mx-auto">I've worked on a variety of projects, from simple websites to complex web applications. Here are a few of my favorites.</p></div>
          <div className="projects-grid">
            {projects.map((project) => (
              <ProjectFlipCard key={project.title} project={project} />
            ))}
          </div>
        </section>

        <section id="hackathons" ref={hackathonSectionRef} className={reveal("hackathons")} data-reveal="hackathons"><div className="replica-section-heading"><div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">Hackathons</div><h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">I like building things</h2><p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">I have participated in 5+ hackathons, achieving strong positions and building high-impact solutions. Working through 24-hour hackathons and building with a motivated team has shown me the endless possibilities that focused collaboration can bring to life.</p></div><div className="relative"><div className="hackathon-progress-line absolute left-[16px] top-0 bottom-0 w-[4px] bg-black dark:bg-white rounded-full z-0 origin-top" style={{transform: `scaleY(${hackathonProgress})`}}></div><ul className="mb-4 ml-4 divide-y divide-dashed border-l border-border relative z-10">{hackathons.map((hackathon) => <li key={hackathon.title} className="relative ml-6 sm:ml-10 py-4"><div className="absolute -left-10 sm:-left-16 top-2 flex items-center justify-center bg-white dark:bg-gray-900 rounded-full"><span className="relative flex shrink-0 overflow-hidden rounded-full border size-10 sm:size-12 m-auto"><img className="aspect-square h-full w-full object-contain" alt={hackathon.title} src={hackathon.image} /></span></div><div className="flex flex-1 flex-col justify-start gap-1"><time className="text-xs text-muted-foreground">{hackathon.date}</time><h2 className="font-semibold leading-none text-sm sm:text-base">{hackathon.title}</h2><p className="text-xs sm:text-sm text-muted-foreground">{hackathon.organization}</p><span className="prose dark:prose-invert text-xs sm:text-sm text-muted-foreground">{hackathon.description}</span></div>{hackathon.link && <div className="mt-2 flex flex-row flex-wrap items-start gap-2"><a href={hackathon.link} target="_blank" rel="noopener noreferrer"><div className="items-center rounded-md border px-2.5 py-0.5 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80 flex gap-2 text-xs" title="Competition Page"><Globe className="h-4 w-4" /><span className="hidden sm:inline">Competition Page</span></div></a></div>}</li>)}</ul></div></section>

        <section id="awards" className={reveal("awards")} data-reveal="awards">
          <div className="replica-section-heading"><div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">Achievements</div><h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Awards &amp; Recognition</h2><p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">Click on cards to view certificates. Use arrows to navigate.</p></div>
          <AchievementsCarousel achievements={achievementsData} radius={420} />
        </section>

        <section id="contact" className={reveal("contact")} data-reveal="contact"><div className="contact-card"><div className="contact-heading"><div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">Contact</div><h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Get in Touch</h2><p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">Want to chat about AI, backend systems, automation, or full stack products? Reach out through <a className="text-blue-500 hover:underline" href="https://x.com/ganesh_sita07" target="_blank" rel="noopener noreferrer">Twitter</a> or send me an email. I enjoy solving real problems and building useful things.</p></div><a className="contact-email" href="mailto:sitaganesh07@gmail.com">sitaganesh07@gmail.com <ArrowUpRight /></a></div></section>
      </main>

      <div className="floating-dock" aria-label="Quick links"><a href="#top" aria-label="Home"><House /></a><a href="#experience" aria-label="Experience"><span className="dock-file">&#9776;</span></a><a href="https://github.com/SitaGanesh" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><Github /></a><a href="https://www.linkedin.com/in/sita-ganesh-96281b256/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Linkedin /></a><a href="mailto:sitaganesh07@gmail.com" aria-label="Email"><Mail /></a><button onClick={() => setDark((value) => !value)} aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}>{dark ? <Sun /> : <Moon />}</button></div>
    </div>
  );
}

function SectionTitle({ title }: { title: string }) { return <h2 className="section-title">{title}</h2>; }
