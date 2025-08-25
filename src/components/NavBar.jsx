import React, { useEffect, useState, lazy, Suspense } from 'react'
import { HashLink } from 'react-router-hash-link'
import { navLinks } from '../constants/index.js'


const NavBar = () => {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`navbar ${scrolled ? 'scrolled' : 'not-scrolled'}`} role="banner">
      <div className="inner">
        {/* Logo — always go home top */}
        <HashLink smooth to="/#hero" className="logo" aria-label="Home">
          Narayan Paul
        </HashLink>

        {/* Desktop nav */}
        <nav className="desktop" role="navigation" aria-label="Primary">
          <ul>
            {navLinks.map(({ link, name }) => (
              <li key={name} className="group">
                <HashLink
                  smooth
                  to={link === 'project' ? '/project' : `/#${link}`}
                  className="nav-link"
                >
                  <span>{name}</span>
                  <span className="underline" />
                </HashLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contact btn */}
        <HashLink smooth to="/#contact" className="contact-btn group" aria-label="Contact">
          <div className="inner">
            <span>Contact Me</span>
          </div>
        </HashLink>

  {/* Chatbot is rendered at the app root for consistent visibility */}
      </div>
    </header>
  )
}

export default NavBar
