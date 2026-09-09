import { useEffect, useState } from "react";
import { ArrowRight, ExternalLink, Github, Repeat2 } from "lucide-react";
import type { PortfolioProject } from "@/data/projects";

type ProjectFlipCardProps = {
  project: PortfolioProject;
};

export function ProjectFlipCard({ project }: ProjectFlipCardProps) {
  const [flipped, setFlipped] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [tapToFlip, setTapToFlip] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => setTapToFlip(!media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  return (
    <article
      className={`project-card project-theme-${project.theme} ${project.wide ? "project-card-featured" : ""} ${flipped ? "is-flipped" : ""}`}
      onClick={() => {
        if (tapToFlip) setFlipped((open) => !open);
      }}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          setFlipped((open) => !open);
        }
      }}
      role="button"
      tabIndex={0}
      aria-pressed={flipped}
      aria-label={`${project.title}. Hover or tap to flip for details.`}
    >
      <div className="project-flip">
        <div className="project-flip-inner">
          <div className="project-flip-face project-flip-front">
            <div className="project-flip-media">
              {videoReady ? null : <ProjectVideoFallback />}
              <video
                src={project.videoSrc}
                autoPlay
                loop
                muted
                playsInline
                className={`project-flip-video ${videoReady ? "is-ready" : ""}`}
                onCanPlay={() => setVideoReady(true)}
                onError={() => setVideoReady(false)}
              />
              <div className="project-flip-scrim" />
            </div>
            <div className="project-flip-front-copy">
              <div className="project-flip-heading">
                <div>
                  <div className="project-flip-title-row">
                    <h3>{project.title}</h3>
                    {project.live ? <span className="project-live-dot" aria-hidden="true" /> : null}
                  </div>
                  <p>{project.year}</p>
                </div>
                <span className="project-flip-hint" aria-hidden="true">
                  <Repeat2 />
                </span>
              </div>
            </div>
          </div>

          <div className="project-flip-face project-flip-back">
            <div className="project-flip-back-body">
              <div className="project-flip-title-row">
                <h3>{project.title}</h3>
                {project.live ? <span className="project-live-dot" aria-hidden="true" /> : null}
              </div>
              <p className="project-flip-year">{project.year}</p>
              <p className="project-flip-copy">{project.description}</p>
              <h4>Technologies</h4>
              <div className="project-tech-row">
                {project.technologies.map((tech, index) => (
                  <span key={tech} style={{ transitionDelay: `${200 + index * 50}ms` }}>
                    <ArrowRight />
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <div className="project-flip-actions">
              {project.links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(event) => event.stopPropagation()}
                >
                  {link.label.toLowerCase().includes("git") ? <Github /> : <ExternalLink />}
                  <span>{link.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

function ProjectVideoFallback() {
  return (
    <div className="project-video-fallback" aria-hidden="true">
      <span className="project-video-grid" />
      <span className="project-video-sweep" />
      <span className="project-video-orbit" />
      <span className="project-video-pulse" />
    </div>
  );
}
