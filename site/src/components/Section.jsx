export default function Section({ id, title, children }) {
    return (
        <section id={id} className="page-section">
            <div className="section-card">
                <h1>{title}</h1>
                {children}
            </div>
        </section>
    );
}
