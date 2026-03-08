import React, { lazy, Suspense } from 'react'
import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Hero from './sections/Hero'
import NavBar from './components/NavBar'
import AppShowcase from './sections/ShowCaseSection'
import FeatureCards from './sections/FeatureCards'
import Experience from './sections/Experience'
import TechStack from './sections/TechStack'
import Social from './sections/Social'
import Projects from './sections/Projects'
import Education from './sections/Education';
import Skill from './sections/Skill'
import Footer from './sections/Footer'

const App = () => {
  return (
    <>
      <NavBar />
      <Routes>
        {/* Home Route */}
        <Route
          path="/"
          element={
            <>
              <section id="hero">
                <Hero />
              </section>

              <section id="work">
                <AppShowcase />
                <FeatureCards />
              </section>

              <section id="experience">
                <Experience />
              </section>

              <section id="education">
                <Education />
              </section>

              <section id="skills">
                <TechStack />
              </section>

              <section id="socialmedia">
                <Social />
              </section>
            </>
          }
        />

        {/* Projects Route */}
        <Route path="/project" element={<Projects />} />
        {/* Skills Route */}
        <Route path="/skills" element={<Skill />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
