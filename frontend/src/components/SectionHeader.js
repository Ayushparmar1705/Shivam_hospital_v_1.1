export default function SectionHeader({ eyebrow, title, subtitle, wide = false }) {
  return (
    <header className={`section-header${wide ? ' section-header--wide' : ''}`}>
      {eyebrow && <span className="section-eyebrow">{eyebrow}</span>}
      <h1 className="section-heading">{title}</h1>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
    </header>
  );
}
