import CrystalScene from "./components/CrystalScene";
import AsciiSword from "./components/AsciiSword";
import Section from "./components/Section";

const projects = [
    {
        name: "IsnaOS",
        repo: "https://github.com/AidanRussellCR/IsnaOS",
        live: null,
        studio: null,
        description:
        "A custom hobby operating system project focused on low-level systems programming, process management, custom scripting, and custom tools.",
        images: [
            `${import.meta.env.BASE_URL}projects/isnaos-1.png`,
            `${import.meta.env.BASE_URL}projects/isnaos-2.png`,
            `${import.meta.env.BASE_URL}projects/isnaos-3.png`,
        ],
    },
    {
        name: "Spetra",
        repo: "https://github.com/AidanRussellCR/Spetra",
        live: null,
        studio: null,
        description:
        "A lightweight C++ SDL2 game engine project built around JRPG-style scenes, tilemaps, player movement, camera behavior, and collision systems.",
        images: [
            `${import.meta.env.BASE_URL}projects/spetra-1.png`,
            `${import.meta.env.BASE_URL}projects/spetra-2.png`,
            `${import.meta.env.BASE_URL}projects/spetra-3.png`,
        ],
    },
    {
        name: "Luzhanqi",
        repo: null,
        live: "https://store.steampowered.com/app/3485740/Luzhanqi/",
        studio: "Crystal Gnome",
        description:
        "A digital adaptation of Luzhanqi, featuring online multiplayer via Steamworks, AI opponents for solo play, and local cooperative modes. The project focuses on recreating the strategic depth of the original game while providing a modern, accessible experience across multiple play styles.",
        images: [
            `${import.meta.env.BASE_URL}projects/luzhanqi-1.png`,
            `${import.meta.env.BASE_URL}projects/luzhanqi-2.png`,
            `${import.meta.env.BASE_URL}projects/luzhanqi-3.png`,
        ],
    },
];

function TopBar() {
    return (
        <header className="top-bar">
        <a className="site-title" href="#home">
        AidanRussellCR
        </a>

        <nav>
        <a href="#home">Home</a>
        <a href="#projects">Projects</a>
        <a href="#studio">Studio</a>
        <a href="#blog">Blog</a>
        <a href="#contact">Contact</a>
        </nav>
        </header>
    );
}

function ProjectCard({ project }) {
    const primaryLink = project.live || project.repo;

    return (
        <article className="project-card">
            <div className="project-images">
                {project.images.map((src, index) => (
                    <img
                        key={index}
                        src={src}
                        alt={`${project.name} screenshot ${index + 1}`}
                    />
                ))}
            </div>

            <div className="project-info">
                <h2>
                    {primaryLink ? (
                        <a href={primaryLink} target="_blank" rel="noreferrer">
                            {project.name}
                        </a>
                    ) : (
                        project.name
                    )}
                </h2>

                {/* Studio */}
                {project.studio && (
                    <p className="project-meta">
                        Released under <strong>{project.studio}</strong>
                    </p>
                )}

                <p>{project.description}</p>

                <div className="project-links">
                    {project.repo && (
                        <a
                            className="project-link"
                            href={project.repo}
                            target="_blank"
                            rel="noreferrer"
                        >
                            View Repository
                        </a>
                    )}

                    {project.live && (
                        <a
                            className="project-link"
                            href={project.live}
                            target="_blank"
                            rel="noreferrer"
                        >
                            View Steam Page
                        </a>
                    )}
                </div>
            </div>
        </article>
    );
}

export default function App() {
    return (
        <main>
        <CrystalScene />
        <AsciiSword />
        <TopBar />

        <Section id="home" title="Welcome">
        <p>
        A personal portfolio for various systems programming, game development, and other technical projects. Blog coming soon as well!
        </p>
        </Section>

        <Section id="projects" title="Projects">
        <div className="projects-grid">
        {projects.map((project) => (
            <ProjectCard key={project.name} project={project} />
        ))}
        </div>
        </Section>

        <Section id="studio" title="Studio">
            <div className="studio-container">
                <div className="studio-main">
                    <div className="studio-image">
                        <img
                            src={`${import.meta.env.BASE_URL}studio/crystal-gnome-logo.png`}
                            alt="Crystal Gnome logo"
                        />
                    </div>

                    <div className="studio-info">
                        <p>
                            I develop and release games under <strong>Crystal Gnome</strong>.
                        </p>
                        <p>
                            Currently, I have developed and released <i>Luzhanqi</i>, with more projects underway.
                        </p>
                    </div>
                </div>

                <div className="contact-links">
                    <a href="https://store.steampowered.com/developer/crystalgnome" target="_blank" rel="noreferrer">
                    Visit Steam Page
                    </a>
                </div>
            </div>
        </Section>

        <Section id="contact" title="Contact">
        <div className="contact-links">
            <a href="https://github.com/AidanRussellCR" target="_blank" rel="noreferrer">
                GitHub
            </a>

            <a href="https://www.linkedin.com/in/aidan-l-russell/" target="_blank" rel="noreferrer">
                LinkedIn
            </a>
        </div>
        </Section>

        <footer className="site-footer">
        Made and designed by Aidan Russell © {new Date().getFullYear()}
        </footer>
        </main>
    );
}
