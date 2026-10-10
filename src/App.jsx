import { ChevronLeft, ChevronRight, Menu, X, Code2, Database, BrainCircuit, Layers, Trophy, GraduationCap } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { setupScrollReveal } from './scrollReveal'

const pages = ['Projects', 'Experience', 'Skills', 'Certifications', 'Achievements']
const getCurrentPage = () => {
  const page = window.location.pathname.split('/').filter(Boolean)[0]
  return pages.some(label => label.toLowerCase() === page) ? page : 'home'
}

const contactEmail = 'tanabe.gab@gmail.com'
const roles = ['a software developer', 'a creative thinker', 'a student leader', 'a lifelong learner']
const issuerLogos = {
  'CompTIA': '/images/certifications/comptia.svg',
  'Google': '/images/certifications/google.svg',
  'Lund University': '/images/certifications/lund.png',
  'Arizona State University': '/images/certifications/asu.svg',
}
const certifications = [
  { title: 'CompTIA Tech+', issuer: 'CompTIA', type: 'Professional certification', completed: 'June 28, 2026', file: 'tech-plus.png' },
  { title: 'Conduct UX Research and Test Early Concepts', issuer: 'Google', completed: 'December 18, 2025', file: 'conduct-ux.png' },
  { title: 'Build Wireframes and Low-Fidelity Prototypes', issuer: 'Google', completed: 'December 17, 2025', file: 'wireframes.png' },
  { title: 'Start the UX Design Process: Empathize, Define, and Ideate', issuer: 'Google', completed: 'October 24, 2025', file: 'start-ux.png' },
  { title: 'Foundations of User Experience (UX) Design', issuer: 'Google', completed: 'October 22, 2025', file: 'foundations.png' },
  { title: 'Artificial Intelligence: Ethics & Societal Challenges', issuer: 'Lund University', completed: 'October 10, 2025', file: 'ai-ethics.png' },
  { title: 'Care: The First Step in Tech Innovation for Entrepreneurs', issuer: 'Arizona State University', completed: 'April 3, 2025', file: 'tech-innovation.png' },
]

const eventGalleries = {
  "ict-ojt-workshop": [
  {
    "src": "/images/experience/ict-ojt-workshop/01.jpg",
    "caption": "Hands-on workshop activities"
  },
  {
    "src": "/images/experience/ict-ojt-workshop/02.jpg",
    "caption": "Programming demonstration"
  },
  {
    "src": "/images/experience/ict-ojt-workshop/03.jpg",
    "caption": "Workshop introduction"
  }
],
  "hour-code-2023": [
    {
      "src": "/images/experience/hour-code-2023/01.jpg",
      "caption": "Certificate presentation"
    },
    {
      "src": "/images/experience/hour-code-2023/02.jpg",
      "caption": "Hello Programming 2023"
    }
  ],
  "codex": [
    {
      "src": "/images/experience/codex/01.jpg",
      "caption": "Workshop group - March 16, 2024"
    },
    {
      "src": "/images/experience/codex/02.jpg",
      "caption": "Mentoring - March 16, 2024"
    },
    {
      "src": "/images/experience/codex/03.jpg",
      "caption": "Workshop group - April 6, 2024"
    },
    {
      "src": "/images/experience/codex/04.jpg",
      "caption": "Workshop - April 6, 2024"
    }
  ],
  "peer-mentoring": [
    {
      "src": "/images/experience/peer-mentoring/01.jpg",
      "caption": "Peer mentoring - November 9, 2024"
    },
    {
      "src": "/images/experience/peer-mentoring/02.jpg",
      "caption": "C++ session - November 8"
    },
    {
      "src": "/images/experience/peer-mentoring/03.jpg",
      "caption": "Python session - November 9"
    },
    {
      "src": "/images/experience/peer-mentoring/04.jpg",
      "caption": "Peer mentoring news"
    },
    {
      "src": "/images/experience/peer-mentoring/05.jpg",
      "caption": "Peer mentoring feature"
    }
  ],
  "code-clash": [
    {
      "src": "/images/experience/code-clash/01.jpg",
      "caption": "Code Clash - weekly coding challenge"
    },
    {
      "src": "/images/experience/code-clash/02.jpg",
      "caption": "Code Clash - competition mechanics"
    }
  ],
  "competitive-training": [
    {
      "src": "/images/experience/competitive-training/01.jpg",
      "caption": "Competitive programming training plan"
    },
    {
      "src": "/images/experience/competitive-training/02.jpg",
      "caption": "Fundamentals session - 25 participants"
    }
  ],
  "hour-code-2024": [
    {
      "src": "/images/experience/hour-code-2024/01.jpg",
      "caption": "Hands-on coding activity"
    },
    {
      "src": "/images/experience/hour-code-2024/02.jpg",
      "caption": "Participants and mentors"
    },
    {
      "src": "/images/experience/hour-code-2024/03.jpg",
      "caption": "Group photo"
    },
    {
      "src": "/images/experience/hour-code-2024/04.jpg",
      "caption": "Programming activity"
    },
    {
      "src": "/images/experience/hour-code-2024/05.jpg",
      "caption": "Classroom group"
    }
  ],
  "date-with-python": [
    {
      "src": "/images/experience/date-with-python/01.jpg",
      "caption": "Competition briefing"
    },
    {
      "src": "/images/experience/date-with-python/02.jpg",
      "caption": "Date with Python - event screen"
    }
  ],
  "hour-ai-2025": [
    {
      "src": "/images/experience/hour-ai-2025/01.jpg",
      "caption": "Participants and facilitators"
    },
    {
      "src": "/images/experience/hour-ai-2025/02.jpg",
      "caption": "Facilitating the AI activities"
    },
    {
      "src": "/images/experience/hour-ai-2025/03.jpg",
      "caption": "Unleashing AI: Code. Create. Play."
    }
  ]
}

const experience = [
  {
    organization: 'AMS Environmental Management Corporation',
    role: 'Software Developer', location: 'Santa Rosa, Laguna', dates: 'Jun 2026 – Dec 2026',
    details: [
      'Engineering a centralized HRIS for AMS and Milestone, connecting applicant intake, hiring, and deployment across two companies through self-service applications and unified personnel records to eliminate duplicate applicant encoding.',
      'Architecting a Django/Python and PostgreSQL platform with company- and client-scoped permissions and three-tier approval workflows to govern sensitive records, employee data changes, and separations.',
      'Automating attendance and overtime computation for an operation serving 50+ client companies, using GPS/geofencing, photo audit capture, and Timekeeper review to eliminate manual attendance re-encoding and standardize record validation.',
    ],
  },
  {
    organization: 'Mapúa MCL ACM Student Chapter',
    role: 'Research & Development Committee', location: 'Cabuyao, Laguna', dates: '2023 – 2026',
    terms: [
      { role: 'R&D Member', dates: 'Jun 2023 – Jun 2024' },
      { role: 'R&D Committee Chair', dates: 'Jun 2024 – Jun 2025' },
      { role: 'R&D Member', dates: 'Jun 2025 – Jun 2026' },
    ],
    details: [
      'Led peer mentoring, programming workshops, competitive training, and coding competitions as committee chair to strengthen technical and problem-solving skills.',
      'Oversaw the maintenance and development of the chapter website and mobile application during the chair term.',
    ],
    activities: [
      { title: 'Hour of Code', role: 'Mentor – R&D Member', dates: 'Dec 2023', gallery: 'hour-code-2023' },
      { title: 'Codex', role: 'Mentor – R&D Member', dates: 'Mar – Apr 2024', gallery: 'codex' },
      { title: 'Peer mentoring', role: 'Hosted six sessions – R&D Committee Chair', dates: 'Oct – Nov 2024', gallery: 'peer-mentoring' },
      { title: 'Competitive programming training', role: 'R&D Committee Chair', dates: 'Oct – Nov 2024', gallery: 'competitive-training' },
      { title: 'Hour of Code', role: 'Head Mentor – R&D Committee Chair', dates: 'Dec 2024', gallery: 'hour-code-2024' },
      { title: 'Mapúa MCL-SHS ICT OJT Workshop', role: 'Head Mentor – R&D Committee Chair', dates: 'Jan – Feb 2025', gallery: 'ict-ojt-workshop' },
      { title: 'Date with Python', role: 'Hosted a programming competition \u00b7 R&D Committee Chair', dates: 'Feb 2025', gallery: 'date-with-python' },
      { title: 'Code Clash', role: 'Hosted a seven-week programming competition open to all Mapúa-MCL students – R&D Committee Chair', dates: 'Feb – Mar 2025', gallery: 'code-clash' },
      { title: 'Hour of AI', role: 'Facilitator – R&D Member', dates: 'Dec 2025', gallery: 'hour-ai-2025' },
    ],
  },
  {
    organization: 'Mapúa MCL Student Council',
    role: 'Board of Directors', location: 'Cabuyao, Laguna', dates: 'Jun 2024 – Jun 2025',
    details: ['Led merchandise operations from product planning and supplier coordination to budgeting, promotion, and sales.'],
  },
]

function EventGallery({ activity }) {
  const photos = eventGalleries[activity.gallery] || []
  const [selected, setSelected] = useState(null)
  return <>
    {photos.length > 0 && <button className="event-gallery-link" type="button" aria-haspopup="dialog" aria-label={`View ${activity.title} gallery`} onClick={() => setSelected(0)}>View gallery</button>}
    {selected !== null && <EventPhotoDialog activity={activity} photos={photos} initialIndex={selected} onClose={() => setSelected(null)} />}
  </>
}

function EventPhotoDialog({ activity, photos, initialIndex, onClose }) {
  const dialogRef = useRef(null)
  const [selected, setSelected] = useState(initialIndex)
  const move = direction => setSelected(index => (index + direction + photos.length) % photos.length)
  useEffect(() => {
    const dialog = dialogRef.current
    const opener = document.activeElement
    const overflow = document.body.style.overflow
    dialog.showModal()
    document.body.style.overflow = 'hidden'
    return () => {
      dialog.close()
      document.body.style.overflow = overflow
      if (opener?.isConnected) opener.focus({ preventScroll: true })
    }
  }, [])
  return <dialog ref={dialogRef} className="project-dialog event-photo-dialog" aria-label={`${activity.title} photo gallery`} onCancel={onClose} onClick={event => { if (event.target === event.currentTarget) onClose() }} onKeyDown={event => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault()
      move(event.key === 'ArrowLeft' ? -1 : 1)
    }
  }}>
    <button type="button" className="detail-close" aria-label="Close event gallery" onClick={onClose}><X size={20} /></button>
    <div className="event-photo-heading"><h3>{activity.title}</h3><p>{activity.dates}</p></div>
    <img className="event-full-photo" src={photos[selected].src} alt={`${activity.title}: ${photos[selected].caption}`} />
    <div className="carousel-controls">
      <button type="button" aria-label="Previous photo" onClick={() => move(-1)}><ChevronLeft size={20} /></button>
      <p aria-live="polite" aria-atomic="true">{photos[selected].caption} <span>{selected + 1} / {photos.length}</span></p>
      <button type="button" aria-label="Next photo" onClick={() => move(1)}><ChevronRight size={20} /></button>
    </div>
  </dialog>
}

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
    <span className="sr-only">A software developer, a creative thinker, a student leader, and a lifelong learner.</span>
    <span aria-hidden="true">{text}<span className="typing-cursor" /></span>
  </p>
}

function ContactForm() {
  return <section className="home-contact section" id="contact" aria-labelledby="contact-title">
    <div className="contact-intro" data-reveal>
      <p className="section-label">Let’s connect</p><h2 id="contact-title">Have something<br />in mind?</h2>
      <p>Send me a message about a project, job opportunity, or question.</p>
      <a className="contact-email" href={`mailto:${contactEmail}`}>{contactEmail}</a>
    </div>
    <form className="contact-form" data-reveal style={{ '--reveal-delay': '180ms' }} action={`https://formsubmit.co/${contactEmail}`} method="POST">
      <input type="hidden" name="_template" value="table" />
      <div className="contact-field-row">
        <div className="contact-field"><label htmlFor="contact-name">Name</label><input id="contact-name" name="name" autoComplete="name" required maxLength={120} /></div>
        <div className="contact-field"><label htmlFor="contact-email">Email</label><input id="contact-email" name="email" type="email" autoComplete="email" required maxLength={254} /></div>
      </div>
      <div className="contact-field"><label htmlFor="contact-subject">Subject</label><input id="contact-subject" name="_subject" required maxLength={200} /></div>
      <div className="contact-field"><label htmlFor="contact-message">Message</label><textarea id="contact-message" name="message" rows={6} required maxLength={5000} /></div>
      <button className="send-message" type="submit">Send message</button>
    </form>
  </section>
}

const projects = [
  { number: '01', title: 'Cortex', subtitle: 'An EEG-Integrated Neuro-Adaptive Multimedia System', summary: 'An EEG-integrated learning system that adapts to student neural responses.', description: 'Developing a thesis-based neuro-adaptive learning system that analyzes brainwave/EEG signals to adapt stimulus-driven learning experiences for students with ADHD. Applies machine learning classification and clustering techniques to identify patterns in neural responses and support adaptive learning decisions.', tags: ['EEG Integration', 'Machine Learning', 'Adaptive Learning'], theme: 'cortex' },
  { number: '02', title: 'Flora Harmonization System', subtitle: "Co's Digital Flora of the Philippines", summary: 'Automated botanical record matching and validation using GBIF data.', description: "Developed a data-intensive flora harmonization system for Co's Digital Flora of the Philippines that automates cross-checking of botanical records retrieved from GBIF against existing flora data. Integrated a Naive Bayes machine learning model for record validation and matching, supported by a relational database architecture for managing interconnected taxonomic, author, collector, and specimen data.", tags: ['Naive Bayes', 'GBIF', 'Relational Databases'], theme: 'flora' },
  { number: '03', title: 'USO', subtitle: 'An AI-Powered Wardrobe Recommendation System', description: 'Developing an intelligent wardrobe application that generates personalized outfit recommendations using machine learning, computer vision, user preferences, wardrobe data, contextual information, and weather conditions. Designed a feedback-driven recommendation pipeline that learns from user interactions and incorporates AI-generated outfit visualization.', tags: ['Machine Learning', 'Computer Vision', 'Recommendation Systems'], theme: 'uso' },
  { number: '04', title: 'JeePS', subtitle: 'An Intelligent Commuter Navigation Application', summary: 'A mobile navigation app that makes jeepney commuting easier.', description: 'Developed a mobile navigation application designed for first-time and unfamiliar jeepney commuters, providing route guidance, jeepney signboard identification, and navigation information to help users determine appropriate transportation routes and destinations. Built as a hackathon solution focused on simplifying Philippine public transportation navigation.', tags: ['Mobile Navigation', 'Route Guidance', 'Hackathon'], theme: 'jeeps' },
  { number: '05', title: 'CCIS Merch Website', subtitle: 'A Campus Merchandise Storefront', summary: 'A campus merchandise website with product browsing, cart, and checkout.', description: 'Developed a merchandise website for the CCIS community, bringing campus apparel and accessories into one storefront. Designed a shopping experience with student account access, a searchable product catalog, category filtering, and product pages displaying prices, stock, and quantity selection. The website includes a shopping cart and checkout interface with customer information, order summaries, and GCash and Maya payment options.', tags: ['Web Development', 'E-commerce', 'UI Design'], theme: 'ccis' },
  { number: '06', title: 'Tenshi Management System', subtitle: 'A Database-Driven Business Operations System', summary: 'A MySQL-backed system connecting client records, orders, and financial documentation.', description: 'Developed a business management system backed by a MySQL database to organize client records, product and service quotations, purchase orders, and job orders. Structured related data across account managers, project heads, and finance personnel to support coordinated workflows. The system includes job order approval tracking, delivery and completion records, invoice management, and collection receipts, connecting customer transactions with project documentation and financial records.', tags: ['MySQL', 'Business Management', 'Database Design'], theme: 'tenshi' },
  { number: '07', title: 'Thesis Scheduler App', subtitle: 'A Unified Thesis Defense Management Platform', summary: 'An Android app for coordinating thesis defense schedules, groups, and updates.', description: 'Developed an Android thesis defense management app that brings students, advisers, and professors into one scheduling platform. Addresses the confusion of manual scheduling, room and panelist availability conflicts, and scattered updates across student groups. Professors can create and manage defense schedules and view their advisee groups, while students can check their schedules and recent notifications. Connected the app to a backend for managing users, groups, schedules, rooms, professors, and notifications, with reusable interface components, a dedicated layer for screen state and user actions, and navigation between screens.', tags: ['Android Development', 'Scheduling', 'Backend Integration'], theme: 'thesis-scheduler' },

  { number: '08', title: 'HappyTailz', subtitle: 'Pet Adoption Website · UI/UX Design', summary: 'A website design that helps people discover pets available for adoption.', description: 'Designed the interface and user experience for HappyTailz, a pet adoption website concept. Created pet browsing screens with filters for location, breed, age, size, and gender to help prospective adopters explore available pets. The designs also include a home page highlighting shelter support and medical care, community blogs for adoption stories and pet care, an organized navigation menu, and account access screens. Used an olive and neutral palette with prominent pet photography throughout the UI/UX design project.', tags: ['UI/UX Design', 'Web Design', 'Pet Adoption'], theme: 'happytailz' },

  { number: '09', title: 'Campus Shuttle Reservation', subtitle: 'Shuttle Reservation App · UI/UX Design', summary: 'A mobile app design for easier campus shuttle booking and access to trip information.', description: 'Created the UI/UX for a campus shuttle reservation application as part of a project management course at Mapúa Malayan Colleges Laguna. Designed the proposed application to make shuttle access more convenient and reservation steps easier to follow. The screens cover student login, email verification, a dashboard with ongoing trip information and a route map, and a booking flow for selecting travel direction, pickup location, and departure time. The concept brings reservations and shuttle information together in a simple mobile interface, with a restrained monochrome palette and clear navigation.', tags: ['UI/UX Design', 'Project Management', 'Mobile App Design'], theme: 'shuttle-reservation' },

  { number: '10', title: 'Meteor Blaster', subtitle: 'A Level-Based Desktop Arcade Game', summary: 'A rocket-shooting game with meteor targets, limited lives, and multiple levels.', description: 'Built Meteor Blaster, a Windows desktop arcade game in Visual Studio using a form-based interface. Players control a rocket and fire at incoming meteors while managing a limited number of lives. The game includes multiple selectable levels, score tracking, a pause control, and a mission success screen displaying scores and coin rewards before advancing to the next level. Created a pixel-art space interface with a main menu and level selection screens to connect the gameplay experience.', tags: ['Game Development', 'Visual Studio', 'Desktop Application'], theme: 'meteor-blaster' },

  { number: '11', title: 'Eldrow', subtitle: 'A Reverse Word-Guessing Game', summary: 'A Firebase-connected word game where players solve five-letter words in reverse.', description: 'Developed Eldrow, a Wordle-inspired web game connected to Firebase with a reversed-word twist. Players have six attempts to guess a five-letter word spelled backward: for example, TWEED becomes DEEWT. Color-coded tiles indicate correct letters, misplaced letters, and letters absent from the target. The interface includes an onscreen keyboard, login and guest play options, a win counter, leaderboard access, a player manual, and a result dialog revealing both the original and reversed word.', tags: ['Web Development', 'Firebase', 'Game Development'], theme: 'eldrow' },

  { number: '12', title: 'Intruder Detection Program', subtitle: 'A Face Recognition Desktop Application', summary: 'A camera-based program for registering faces and flagging unrecognized people.', description: 'Developed a desktop face recognition program that compares faces captured by a camera with registered user records. Users can register a face under a name, start detection, stop the camera, refresh the registered users list, and delete a selected record. The detection view identifies recognized users with a green name label and flags unrecognized faces with a red intruder label and status warning.', tags: ['Face Recognition', 'Computer Vision', 'Desktop Application'], theme: 'intruder-detection' },

]

const usoScreens = [
  { name: 'Outfits', file: 'outfits.png', alt: 'USO home screen with personalized outfit recommendations' },
  { name: 'Wardrobe', file: 'wardrobe.png', alt: 'USO digital wardrobe with clothing categories and collection' },
  { name: 'Welcome', file: 'onboarding.png', alt: 'USO onboarding introducing the digital wardrobe' },
  { name: 'Login', file: 'login.png', alt: 'USO login screen' },
]

const floraScreens = [
  { name: 'Flora data', file: 'flora-data.png', alt: 'Flora database showing botanical names, authorship, and conservation status' },
  { name: 'Retrieval logs', file: 'retrieval-logs.png', alt: 'GBIF record retrieval logs with timestamps and status' },
  { name: 'Verification logs', file: 'verification-logs.png', alt: 'Botanical record verification comparing CDFP and GBIF taxa' },
  { name: 'Verification details', file: 'verification-details.png', alt: 'Record matching details with similarity scores and Bayesian probabilities' },
  { name: 'Admin login', file: 'login.png', alt: "Co's Digital Flora of the Philippines admin login" },
]

const cortexScreens = [
  { name: 'Student home', file: 'student-home.png', alt: 'Cortex student dashboard with classes and learning session controls' },
  { name: 'Learning packages', file: 'learning-packages.png', alt: 'Cortex class learning packages covering care, life skills, and academics' },
  { name: 'Welcome', file: 'welcome.png', alt: 'Cortex welcome screen with the application logo' },
  { name: 'Analytics', file: 'analytics.png', alt: 'Cortex teacher analytics showing focus scores and cognitive-state distribution' },
  { name: 'Reports', file: 'reports.png', alt: 'Cortex class engagement report with session and cognitive-state summaries' },
  { name: 'EEG-integrated lesson', file: 'eeg-lesson.png', alt: 'Cortex interactive learning activity with connected EEG headband and brainwave readings' },
]
const jeepsScreens = [
  { name: 'Home', file: 'home.jpg', alt: 'JeePS home screen with a map of Calamba and detected location' },
  { name: 'Routes', file: 'routes.jpg', alt: 'JeePS jeepney route options with signboards, fares, distances, and stops' },
  { name: 'Terminals', file: 'terminals.jpg', alt: 'JeePS jeepney terminals from San Pedro to Calamba' },
]
const ccisScreens = [
  { name: 'Shop', file: 'shop.png', alt: 'CCIS merchandise catalog with search, category filtering, apparel, and accessories' },
  { name: 'Product details', file: 'product.png', alt: 'CCIS T-shirt product page with pricing, stock, and quantity selection' },
  { name: 'Shopping cart', file: 'cart.png', alt: 'CCIS shopping cart showing merchandise and an order summary' },
  { name: 'Checkout', file: 'checkout.png', alt: 'CCIS checkout interface with customer information and GCash and Maya payment options' },
  { name: 'Login', file: 'login.png', alt: 'CCIS merchandise student login screen' },
]
const tenshiScreens = [
  { name: 'Quotations', file: 'quotations.png', alt: 'Tenshi quotations table with client references, totals, and approval statuses' },
  { name: 'Client records', file: 'clients.png', alt: 'Tenshi form for adding client contact and address information' },
  { name: 'Purchase orders', file: 'purchase-orders.png', alt: 'Tenshi purchase order form linked to quotations and clients' },
  { name: 'Job orders', file: 'job-orders.png', alt: 'Tenshi job orders table with project heads and approval tracking' },
  { name: 'Collection receipts', file: 'collection-receipts.png', alt: 'Tenshi collection receipt form linked to invoices and payment details' },
  { name: 'Login', file: 'login.png', alt: 'Tenshi employee login screen' },
]
const thesisSchedulerScreens = [
  { name: 'Professor dashboard', file: 'professor.png', alt: 'Professor dashboard with defense schedule management and advisee groups' },
  { name: 'Student dashboard', file: 'student.png', alt: 'Student dashboard with upcoming thesis defense and recent schedule notifications' },
]
const happyTailzScreens = [
  {
    "name": "Home page",
    "file": "home.png",
    "alt": "HappyTailz home page design featuring shelter donations and pet medical care"
  },
  {
    "name": "Pets for adoption",
    "file": "adoption.png",
    "alt": "Pet adoption listing design with filters for location, breed, age, size, and gender"
  },
  {
    "name": "Community blogs",
    "file": "community.png",
    "alt": "Community blog design featuring adoption stories and pet care articles"
  },
  {
    "name": "Navigation menu",
    "file": "navigation.png",
    "alt": "Expanded navigation design for adoption, pet services, and the knowledge hub"
  },
  {
    "name": "Account access",
    "file": "login.png",
    "alt": "HappyTailz login and signup entry design with pet photography and olive accents"
  }
]
const shuttleReservationScreens = [
  {
    "name": "Dashboard",
    "file": "dashboard.png",
    "alt": "Campus shuttle dashboard design with ongoing trip information, reservation shortcuts, and route map"
  },
  {
    "name": "Shuttle reservation",
    "file": "reservation.png",
    "alt": "Shuttle booking design with travel direction, pickup location, and departure time"
  },
  {
    "name": "Welcome",
    "file": "welcome.png",
    "alt": "Shuttle app welcome design introducing seat reservations and trip tracking"
  },
  {
    "name": "Student login",
    "file": "login.png",
    "alt": "Student number and password login design"
  },
  {
    "name": "Account verification",
    "file": "verification.png",
    "alt": "Email verification code screen design for student accounts"
  }
]
const meteorBlasterScreens = [
  {
    "name": "Main menu",
    "file": "menu.png",
    "alt": "Meteor Blaster main menu with new game, continue, and settings"
  },
  {
    "name": "Gameplay",
    "file": "gameplay.png",
    "alt": "Rocket shooting meteors with score and three remaining lives"
  },
  {
    "name": "Level selection",
    "file": "levels.png",
    "alt": "Meteor Blaster level selection grid with unlocked and locked stages"
  },
  {
    "name": "Mission success",
    "file": "success.png",
    "alt": "Completed level showing score, coin rewards, and next level option"
  }
]
const eldrowScreens = [
  {
    "name": "Welcome",
    "file": "welcome.png",
    "alt": "Eldrow welcome page with login and guest play options"
  },
  {
    "name": "Gameplay",
    "file": "gameplay.png",
    "alt": "Eldrow guessing grid with colored letter feedback and an onscreen keyboard"
  },
  {
    "name": "Winning a round",
    "file": "win.png",
    "alt": "Eldrow win screen showing TWEED reversed as DEEWT"
  },
  {
    "name": "Player manual",
    "file": "manual.png",
    "alt": "Eldrow rules explaining six guesses and letter feedback colors"
  }
]
const intruderDetectionScreens = [
  {
    "name": "Program controls",
    "file": "controls.png",
    "alt": "Intruder detection controls for registration, detection, and deleting records"
  },
  {
    "name": "Intruder detection",
    "file": "intruder.png",
    "alt": "Unrecognized face flagged in red with the face blurred for privacy"
  },
  {
    "name": "Registered user",
    "file": "authorized.png",
    "alt": "Registered user recognized in green with the face blurred for privacy"
  },
  {
    "name": "Face registration",
    "file": "registration.png",
    "alt": "Camera capture during face registration with face blurred for privacy"
  },
  {
    "name": "Recognition result",
    "file": "recognition.png",
    "alt": "Authorized user recognition and registered user list with face blurred"
  }
]
const projectScreens = { "intruder-detection": intruderDetectionScreens, eldrow: eldrowScreens, "meteor-blaster": meteorBlasterScreens, "shuttle-reservation": shuttleReservationScreens, happytailz: happyTailzScreens, 'thesis-scheduler': thesisSchedulerScreens, cortex: cortexScreens, flora: floraScreens, uso: usoScreens, jeeps: jeepsScreens, ccis: ccisScreens, tenshi: tenshiScreens }

function ProjectDetails({ project, onClose }) {
  const dialogRef = useRef(null)
  const [selected, setSelected] = useState(0)
  const screens = projectScreens[project.theme] || []
  const screen = screens[selected]
  const move = direction => setSelected(index => (index + direction + screens.length) % screens.length)

  useEffect(() => {
    const dialog = dialogRef.current
    const opener = document.activeElement
    const previousOverflow = document.body.style.overflow
    dialog.showModal()
    document.body.style.overflow = 'hidden'
    return () => {
      dialog.close()
      document.body.style.overflow = previousOverflow
      if (opener?.isConnected) opener.focus({ preventScroll: true })
    }
  }, [])

  return <dialog ref={dialogRef} className={`project-dialog${['flora', 'cortex', 'ccis', 'tenshi', 'happytailz', 'eldrow', 'intruder-detection'].includes(project.theme) ? ` landscape-dialog ${project.theme}-dialog` : ''}`} aria-labelledby={`detail-title-${project.number}`} onCancel={onClose} onClick={event => { if (event.target === event.currentTarget) onClose() }} onKeyDown={event => {
    if (!screens.length) return
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault()
      move(event.key === 'ArrowLeft' ? -1 : 1)
    }
  }}>
    <div className="project-detail-panel">
      <button className="detail-close" type="button" aria-label="Close project details" onClick={onClose}><X size={20} /></button>
      <div className="detail-layout">
        {screens.length > 0 ? <div className="detail-gallery" role="region" aria-label={`${project.title} screenshot carousel`} aria-roledescription="carousel">
          <div className="detail-screenshot"><img key={screen.file} src={`/images/projects/${project.theme}/${screen.file}`} alt={screen.alt} /></div>
          <div className="carousel-controls">
            <button type="button" aria-label="Previous screenshot" onClick={() => move(-1)}><ChevronLeft size={20} /></button>
            <p aria-live="polite" aria-atomic="true">{screen.name} <span>{selected + 1} / {screens.length}</span></p>
            <button type="button" aria-label="Next screenshot" onClick={() => move(1)}><ChevronRight size={20} /></button>
          </div>
        </div> : <ProjectPreview project={project} />}
        <div className="detail-copy">
          <h2 id={`detail-title-${project.number}`}>{project.title}</h2>
          <p className="detail-subtitle">{project.subtitle}</p>
          <p className="detail-description">{project.description}</p>
          <ul className="tags">{project.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>
        </div>
      </div>
    </div>
  </dialog>
}

function ProjectCard({ project, index }) {
  const [open, setOpen] = useState(false)
  const content = <>
    <ProjectPreview project={project} />
    <div className="project-title"><h3>{project.title}</h3><span>{project.number}</span></div>
    <p className="project-summary">{project.theme === 'uso' ? 'An AI-powered wardrobe app for personalized outfit recommendations.' : (project.summary || project.description)}</p>
  </>
  return <article className="project" data-reveal style={{ '--reveal-delay': `${(index % 3) * 180}ms` }}>
    {project.placeholder ? content : <button className="project-card-button" type="button" aria-haspopup="dialog" onClick={() => setOpen(true)}>{content}</button>}
    {open && <ProjectDetails project={project} onClose={() => setOpen(false)} />}
  </article>
}

function ProjectPreview({ project }) {
  const screens = projectScreens[project.theme]
  if (screens) {
    const mobile = ['uso', 'jeeps', 'thesis-scheduler', 'shuttle-reservation'].includes(project.theme)
    return <div className={`project-visual project-cover ${mobile ? 'mobile-cover' : 'desktop-cover'} ${project.theme}-cover`} aria-hidden="true">
      {mobile ? <div className="cover-phones">{screens.slice(0, 2).map(screen => <img key={screen.file} src={`/images/projects/${project.theme}/${screen.file}`} alt="" loading="lazy" />)}</div> : <div className="cover-browser"><div className="cover-browser-bar"><i /><i /><i /><span>{project.title}</span></div><img src={`/images/projects/${project.theme}/${screens[0].file}`} alt="" loading="lazy" /></div>}
    </div>
  }
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
          <h1 id="hero-title">I’m Gab Tanabe<span className="hero-period">.</span></h1>
          <TypingRole />
          <p className="home-description">I work in full-stack development, machine learning, and data.</p>
          <div className="hero-actions"><a className="primary-link" href="/projects/">Explore projects</a></div>
        </div>
      </section>}
      {currentPage === 'home' && <section className="about-section section" aria-labelledby="about-title">
        <div className="about-heading" data-reveal><h2 id="about-title">About me</h2></div>
        <div className="about-copy" data-reveal>
          <p>I'm a fourth-year BS Computer Science student at Mapúa Malayan Colleges Laguna. I care a lot about my program and the things I create. I'm also a perfectionist: I work hard, revisit the small details, and keep pushing until my work goes beyond my own standards. That can make it hard to call something finished, but it comes from wanting to give my best.</p>
          <p>I've taken on leadership roles for most of my life, and I enjoy bringing people together and seeing an idea through. My interests go beyond coding, too. I write poetry, cook, edit videos and photos, and create posters and digital designs. I like having different ways to express myself and learning something new along the way.</p>
          <p>I love a good side quest. I make time for a social life, going out with friends, having a drink, and finding something good to eat. I'm outgoing, but I'm just as happy playing Mobile Legends or Valorant, or settling in for a movie. And music is a huge part of my life. It's one of the things I'm most passionate about.</p>
        </div>
      </section>}
      {currentPage === 'home' && <ContactForm />}
      {currentPage === 'projects' && <section className="work section" id="projects">
        <header className="page-heading"><h1>Projects</h1><p>Software projects, their features, and the technologies used to build them.</p></header>
        <div className="projects">{projects.map((project, index) => <ProjectCard key={project.number} project={project} index={index} />)}</div>
      </section>}
      {currentPage === 'experience' && <section className="profile-section section" id="experience" aria-labelledby="experience-title">
        <header className="page-heading"><h1 id="experience-title">Experience</h1><p>Professional roles, responsibilities, and contributions.</p></header>
        <div className="experience-list">{experience.map(item => <article className="experience-item" key={item.organization} data-reveal>
          <div className="experience-meta"><p>{item.dates}</p><p>{item.location}</p></div>
          <div className="experience-content">
            <h2>{item.organization}</h2>
            <p className="experience-role">{item.role}</p>
            {item.terms && <ul className="experience-terms">{item.terms.map(term => <li key={term.dates}><span>{term.role}</span><span>{term.dates}</span></li>)}</ul>}
            <ul className="experience-details">{item.details.map(detail => <li key={detail}>{detail}</li>)}</ul>
            {item.activities && <div className="experience-activities"><h3>Mentoring & events</h3>{item.activities.map(activity => <div className="experience-event" key={`${activity.title}-${activity.dates}`}><div className="experience-activity"><div><h4>{activity.title}</h4><p>{activity.role}</p></div><span>{activity.dates}</span></div><EventGallery activity={activity} /></div>)}</div>}
          </div>
        </article>)}</div>
      </section>}
      {currentPage === 'skills' && <section className="profile-section section" id="skills" aria-labelledby="skills-title">
        <header className="page-heading"><h1 id="skills-title">Skills</h1><p>Technical skills and areas of software development.</p></header>
        <div className="skills-grid">{[
          { title: 'Languages & frameworks', icon: Code2, items: ['Python', 'Django', 'React'] },
          { title: 'Databases', icon: Database, items: ['PostgreSQL', 'MySQL', 'Relational database design'] },
          { title: 'Machine learning & data', icon: BrainCircuit, items: ['Classification', 'Clustering', 'Naive Bayes', 'Recommendation systems', 'Computer vision', 'EEG signal analysis'] },
          { title: 'Software development', icon: Layers, items: ['Full-stack development', 'Mobile application development', 'API integration', 'Access control', 'Approval workflows'] },
        ].map((group, index) => <article className="skill-group" key={group.title} data-reveal style={{ '--reveal-delay': `${(index % 2) * 180}ms` }}>
          <div className="skill-heading"><span className="skill-icon"><group.icon size={23} strokeWidth={1.5} aria-hidden="true" /></span><h2>{group.title}</h2></div>
          <ul>{group.items.map(skill => <li key={skill}>{skill}</li>)}</ul>
        </article>)}</div>
      </section>}
      {currentPage === 'achievements' && <section className="profile-section section" id="achievements" aria-labelledby="achievements-title">
        <header className="page-heading"><h1 id="achievements-title">Achievements</h1><p>Awards, competition results, and recognitions.</p></header>
        <div className="achievement-groups">{[
          { title: 'Outside school', icon: Trophy, items: [
            { title: 'UPLB Code Wars', result: '2nd Place', dates: '2025', images: [{ file: 'uplb-enhanced.png', label: 'Certificate' }] },
            { title: 'CodeChum National Programming Competition', result: '5th Place ? Group stages 3 and 4', dates: '2024, 2025', images: [{ file: 'codechum-2024.png', label: '2024 certificate' }, { file: 'codechum-2025.png', label: '2025 certificate' }] },
            { title: 'ASEAN AI Hackathon', result: 'Qualifier', dates: '2026' },
            { title: 'InterCICSkwela Batang Techno Hackathon', result: '5th Place', dates: '2026', images: [{ file: 'batang-techno-personal.png', label: 'Individual certificate' }, { file: 'batang-techno-team.png', label: 'Team certificate' }] },
          ] },
          { title: 'In school', icon: GraduationCap, items: [
            { title: 'President’s List', result: 'Academic recognition', dates: '2023–2026' },
            { title: 'Dean’s List', result: 'Academic recognition', dates: '2023–2026' },
            { title: 'Full Academic Scholarship', result: '5 terms', dates: '2023–2025' },
          ] },
        ].map((group, index) => <div className="achievement-group" key={group.title} data-reveal style={{ '--reveal-delay': `${index * 180}ms` }}>
          <h2><group.icon size={21} strokeWidth={1.5} aria-hidden="true" />{group.title}</h2>
          <ul>{group.items.map(item => <li key={item.title}><div><p className="achievement-result">{item.result}</p><h3>{item.title}</h3>{item.images && <div className="achievement-certificates">{item.images.map(certificate => <a key={certificate.file} href={`/images/achievements/${certificate.file}`} target="_blank" rel="noreferrer"><img src={`/images/achievements/${certificate.file}`} alt={`${item.title}: ${certificate.label}`} loading="lazy" /><span>{certificate.label}</span></a>)}</div>}</div><span className="achievement-date">{item.dates}</span></li>)}</ul>
        </div>)}</div>
      </section>}
      {currentPage === 'certifications' && <section className="profile-section section" id="certifications" aria-labelledby="certifications-title">
        <header className="page-heading"><h1 id="certifications-title">Certifications</h1><p>Professional certifications and completed training.</p></header>
        <div className="certification-list">{certifications.map((certificate, index) => <article className="certification-item" key={certificate.title} data-reveal style={{ '--reveal-delay': `${(index % 2) * 180}ms` }}>
          <div className="certificate-logo"><img src={issuerLogos[certificate.issuer]} alt={`${certificate.issuer} logo`} loading="lazy" /></div>
          <p className="certificate-issuer">{certificate.issuer}</p>
          <h3>{certificate.title}</h3>
          <p className="certificate-meta">{certificate.type || 'Course certificate'}{certificate.completed && <span>Completed {certificate.completed}</span>}</p>
          <a className="certificate-view" href={`/images/certifications/certificates/${certificate.file}`} target="_blank" rel="noreferrer" aria-label={`View certificate: ${certificate.title}`}>View certificate</a>
        </article>)}</div>
      </section>}
    </main>
    <footer className="page-footer">
      <span>{new Date().getFullYear()} Gab</span>
      <nav className="footer-socials" aria-label="Social links">
        {[
          { label: 'Facebook', href: 'https://www.facebook.com/shiv.gab' },
          { label: 'LinkedIn', href: 'https://www.linkedin.com/in/gabriel-tanabe-4062012b7/' },
          { label: 'GitHub', href: 'https://github.com/zanshiv' },
        ].map(({ label, href }) => <a key={label} href={href} target="_blank" rel="noopener noreferrer">{label}</a>)}
      </nav>
      <a className="footer-resume" href="/documents/Resume-Tanabe.pdf" download="Resume - Tanabe.pdf">Download résumé</a>
    </footer>
  </div>
}
