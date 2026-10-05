export function setupScrollReveal(root) {
  if (!root) return () => {}
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
  if (preference.matches || !('IntersectionObserver' in window)) return () => {}

  const elements = [...root.querySelectorAll('[data-reveal]')]
  const reveal = element => {
    element.classList.remove('reveal-pending')
    observer.unobserve(element)
  }
  const observer = new window.IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) reveal(entry.target)
    })
  }, { threshold: 0.08 })

  elements.forEach(element => {
    // Already visible content stays visible when entering a page.
    if (element.getBoundingClientRect().top < window.innerHeight) return
    element.classList.add('reveal-pending')
    observer.observe(element)
  })

  const onFocus = event => {
    const element = event.target.closest('[data-reveal]')
    if (element) reveal(element)
  }
  const onPreferenceChange = () => {
    if (preference.matches) elements.forEach(reveal)
  }
  root.addEventListener('focusin', onFocus)
  preference.addEventListener('change', onPreferenceChange)

  return () => {
    observer.disconnect()
    root.removeEventListener('focusin', onFocus)
    preference.removeEventListener('change', onPreferenceChange)
    elements.forEach(element => element.classList.remove('reveal-pending'))
  }
}
