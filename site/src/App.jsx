import CrystalScene from "./components/CrystalScene";
import AsciiSword from "./components/AsciiSword";
import Section from "./components/Section";

const projects = [
    {
        name: "IsnaOS",
        repo: "https://github.com/AidanRussellCR/IsnaOS",
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
    description:
    "A lightweight C++ SDL2 game engine project built around JRPG-style scenes, tilemaps, player movement, camera behavior, and collision systems.",
    images: [
        `${import.meta.env.BASE_URL}projects/spetra-1.png`,
        `${import.meta.env.BASE_URL}projects/spetra-2.png`,
        `${import.meta.env.BASE_URL}projects/spetra-3.png`,
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
        <a href="#blog">Blog</a>
        <a href="#contact">Contact</a>
        </nav>
        </header>
    );
}

function ProjectCard({ project }) {
    return (
        <article className="project-card">
        <div className="project-images">
        {project.images.map((src, index) => (
            <img key={index} src={src} alt={`${project.name} screenshot ${index + 1}`} />
        ))}
        </div>

        <div className="project-info">
        <h2>
        <a href={project.repo} target="_blank" rel="noreferrer">
        {project.name}
        </a>
        </h2>

        <p>{project.description}</p>

        <a className="project-link" href={project.repo} target="_blank" rel="noreferrer">
        View Repository
        </a>
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
