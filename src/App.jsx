import { ArrowUpRight, Menu, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { setupScrollReveal } from './scrollReveal'

const pages = ['Projects', 'Experience', 'Skills', 'Certifications']
const getCurrentPage = () => {
  const page = window.location.pathname.split('/').filter(Boolean)[0]
  return pages.some(label => label.toLowerCase() === page) ? page : 'home'
}

const contactEmail = 'tanabe.gab@gmail.com'
const roles = ['a software developer', 'a creative thinker']
const issuerLogos = {
  'CompTIA': '/images/certifications/comptia.svg',
  'Google': '/images/certifications/google.svg',
  'Lund University': '/images/certifications/lund.png',
  'Arizona State University': '/images/certifications/asu.svg',
}
const certifications = [
  { title: 'CompTIA Tech+', issuer: 'CompTIA', type: 'Professional certification' },
  { title: 'Conduct UX Research and Test Early Concepts', issuer: 'Google', completed: 'December 2025' },
  { title: 'Build Wireframes and Low-Fidelity Prototypes', issuer: 'Google', completed: 'December 2025' },
  { title: 'Start the UX Design Process: Empathize, Define, and Ideate', issuer: 'Google', completed: 'October 2025' },
  { title: 'Foundations of User Experience (UX) Design', issuer: 'Google' },
  { title: 'Artificial Intelligence: Ethics & Societal Challenges', issuer: 'Lund University' },
  { title: 'Care: The First Step in Tech Innovation for Entrepreneurs', issuer: 'Arizona State University' },
]

function TypingRole() {
  const [text, setText] = useState(roles[0])

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    let timer
    const start = () => {
      window.clearTimeout(timer)
      setText(roles[0])
      if (preference.matches) return
      let role = 0
      let length = roles[0].length
      let deleting = true
      const tick = () => {
        length += deleting ? -1 : 1
        setText(roles[role].slice(0, length))
        let delay = deleting ? 45 : 95
        if (length === 0) {
          role = (role + 1) % roles.length
          deleting = false
          delay = 350
        } else if (length === roles[role].length) {
          deleting = true
          delay = 2200
        }
        timer = window.setTimeout(tick, delay)
      }
      timer = window.setTimeout(tick, 2200)
    }
    start()
    preference.addEventListener('change', start)
    return () => {
      window.clearTimeout(timer)
      preference.removeEventListener('change', start)
    }
  }, [])

  return <p className="typing-role">
    <span className="sr-only">A software developer and a creative thinker.</span>
    <span aria-hidden="true">{text}<span className="typing-cursor" /></span>
  </p>
}

function ContactForm() {
  return <section className="home-contact section" id="contact" aria-labelledby="contact-title">
    <div className="contact-intro" data-reveal>
      <p className="section-label">Let’s connect</p><h2 id="contact-title">Have something<br />in mind?</h2>
      <p>Send me a message about a project, job opportunity, or question.</p>
      <a className="contact-email" href={`mailto:${contactEmail}`}>{contactEmail} <ArrowUpRight size={16} /></a>
    </div>
    <form className="contact-form" data-reveal style={{ '--reveal-delay': '180ms' }} action={`https://formsubmit.co/${contactEmail}`} method="POST">
      <input type="hidden" name="_template" value="table" />
      <div className="contact-field-row">
        <div className="contact-field"><label htmlFor="contact-name">Name</label><input id="contact-name" name="name" autoComplete="name" required maxLength={120} /></div>
        <div className="contact-field"><label htmlFor="contact-email">Email</label><input id="contact-email" name="email" type="email" autoComplete="email" required maxLength={254} /></div>
      </div>
      <div className="contact-field"><label htmlFor="contact-subject">Subject</label><input id="contact-subject" name="_subject" required maxLength={200} /></div>
      <div className="contact-field"><label htmlFor="contact-message">Message</label><textarea id="contact-message" name="message" rows={6} required maxLength={5000} /></div>
      <button className="send-message" type="submit">Send message <ArrowUpRight size={17} /></button>
    </form>
  </section>
}

const projects = [
  { number: '01', title: 'Daylight', subtitle: 'Weekly task planner.', description: 'A productivity app for organizing tasks and planning weekly schedules.', tags: ['React', 'TypeScript', 'Product Design'], theme: 'daylight' },
  { number: '02', title: 'After Hours', subtitle: 'Personal reading archive.', description: 'A reading app for saving and organizing articles in a personal archive.', tags: ['React', 'API', 'Editorial UI'], theme: 'afterhours' },
  { number: '03', title: 'Blue Room', subtitle: 'Music dashboard.', description: 'A music dashboard for browsing collections and controlling playback.', tags: ['Frontend', 'Motion', 'Accessibility'], theme: 'blueroom' },
  ...['04', '05', '06'].map(number => ({ number, title: `Project ${number}`, description: 'Project details have not been added yet.', tags: [], theme: 'placeholder', placeholder: true })),
]

function ProjectPreview({ project }) {
  if (project.placeholder) return <div className="project-visual project-placeholder" aria-hidden="true"><span>{project.number}</span><p>Project preview</p></div>
  return <div className={`project-visual ${project.theme}`} aria-hidden="true">
    <div className="preview">
      <div className="preview-nav"><span>{project.title.toLowerCase()}<i>.</i></span><span>STUDIO / 0{project.number.slice(-1)}</span></div>
      {project.theme === 'daylight' ? <><div className="preview-greeting">Weekly<br />planner</div><div className="planner"><span>MON <b>12</b></span><span>TUE <b>13</b></span><span>WED <b>14</b></span><span>THU <b>15</b></span></div><div className="task-line"><i /> Review weekly tasks <span>09:00</span></div></> : project.theme === 'afterhours' ? <><div className="editorial-label">READING ARCHIVE</div><div className="editorial-title">Saved<br />articles</div><div className="editorial-bottom">ARTICLES & ESSAYS <span>↗</span></div></> : <><div className="record"><div /></div><div className="record-caption"><span>Current playlist<small>Music collection</small></span><span>Ⅱ</span></div><div className="playback"><span /></div></>}
    </div>
  </div>
}

export default function App() {
  const [currentPage, setCurrentPage] = useState(getCurrentPage)
  const [menuOpen, setMenuOpen] = useState(false)
  const mainRef = useRef(null)
  const previousPage = useRef(currentPage)
  const closeMenu = () => setMenuOpen(false)

  useEffect(() => setupScrollReveal(mainRef.current), [currentPage])

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPage(getCurrentPage())
      setMenuOpen(false)
    }
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  useEffect(() => {
    document.title = `${pages.find(page => page.toLowerCase() === currentPage) || 'Home'} | Gab`
    if (previousPage.current !== currentPage) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
      mainRef.current?.focus({ preventScroll: true })
      previousPage.current = currentPage
    }
  }, [currentPage])

  const navigate = event => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    const link = event.target.closest('a[href]')
    if (!link || link.hasAttribute('download') || (link.target && link.target !== '_self')) return
    const url = new URL(link.href, window.location.href)
    if (url.origin !== window.location.origin || url.hash || url.search) return
    const nextPage = url.pathname.split('/').filter(Boolean)[0] || 'home'
    if (!['/', ...pages.map(page => `/${page.toLowerCase()}/`)].includes(url.pathname)) return
    event.preventDefault()
    closeMenu()
    if (nextPage === currentPage) return
    window.history.pushState(null, '', url.pathname)
    setCurrentPage(nextPage)
  }

  return <div className="app-shell" onClick={navigate}>
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="site-header" id="home">
      <a className="brand" href="/" aria-label="Gab, home">gab<span>.</span></a>
      <nav className={menuOpen ? 'navigation open' : 'navigation'} id="navigation" aria-label="Primary navigation">
        {pages.map(page => <a key={page} href={`/${page.toLowerCase()}/`} aria-current={currentPage === page.toLowerCase() ? 'page' : undefined} onClick={closeMenu}>{page}</a>)}
      </nav>
      <button className="menu-button" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} aria-controls="navigation" onClick={() => setMenuOpen(!menuOpen)} onKeyDown={event => { if (event.key === 'Escape') closeMenu() }}>{menuOpen ? <X /> : <Menu />}</button>
    </header>
    <main key={currentPage} ref={mainRef} tabIndex={-1} id="main" className={currentPage === 'home' ? 'home-page' : 'inner-page'}>
      {currentPage === 'home' && <section className="hero" aria-labelledby="hero-title">
        <div className="welcome-content">
          <p className="welcome-label">Welcome</p>
          <h1 id="hero-title">I’m Gab<span className="hero-period">.</span></h1>
          <TypingRole />
          <p className="home-description">I work in full-stack development, machine learning, and data.</p>
          <div className="hero-actions"><a className="primary-link" href="/projects/">Explore projects <ArrowUpRight size={17} /></a></div>
        </div>
      </section>}
      {currentPage === 'home' && <ContactForm />}
      {currentPage === 'projects' && <section className="work section" id="projects">
        <header className="page-heading"><h1>Projects</h1><p>Software projects, their features, and the technologies used to build them.</p></header>
        <div className="projects">{projects.map((project, index) => <article className="project" key={project.number} data-reveal style={{ '--reveal-delay': `${(index % 3) * 180}ms` }}><ProjectPreview project={project} /><div className="project-title"><h3>{project.title}</h3><span>{project.number}</span></div><p>{project.description}</p><ul className="tags">{project.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>{!project.placeholder && <a className="text-link project-link" href={`mailto:${contactEmail}?subject=${encodeURIComponent(`Tell me about ${project.title}`)}`}>Ask about this project <ArrowUpRight size={15} /></a>}</article>)}</div>
      </section>}
      {currentPage === 'experience' && <section className="profile-section section" id="experience" aria-labelledby="experience-title">
        <header className="page-heading"><h1 id="experience-title">Experience</h1><p>Professional roles, responsibilities, and contributions.</p></header>
        <p className="section-pending">Experience details have not been added yet.</p>
      </section>}
      {currentPage === 'skills' && <section className="profile-section section" id="skills" aria-labelledby="skills-title">
        <header className="page-heading"><h1 id="skills-title">Skills</h1><p>Technical skills and areas of software development.</p></header>
        <div className="capabilities"><span>Full-stack development</span><span>Machine learning</span><span>Data & interfaces</span></div>
      </section>}
      {currentPage === 'certifications' && <section className="profile-section section" id="certifications" aria-labelledby="certifications-title">
        <header className="page-heading"><h1 id="certifications-title">Certifications</h1><p>Professional certifications and completed training.</p></header>
        <div className="certification-list">{certifications.map((certificate, index) => <article className="certification-item" key={certificate.title} data-reveal style={{ '--reveal-delay': `${(index % 2) * 180}ms` }}>
          <div className="certificate-logo"><img src={issuerLogos[certificate.issuer]} alt={`${certificate.issuer} logo`} loading="lazy" /></div>
          <p className="certificate-issuer">{certificate.issuer}</p>
          <h3>{certificate.title}</h3>
          <p className="certificate-meta">{certificate.type || 'Course certificate'}{certificate.completed && <span>Completed {certificate.completed}</span>}</p>
        </article>)}</div>
      </section>}
    </main>
    <footer className="page-footer"><a href="/">Home</a><span>{new Date().getFullYear()} Gab</span><a href={`mailto:${contactEmail}`}>Contact <ArrowUpRight size={14} /></a></footer>
  </div>
}
