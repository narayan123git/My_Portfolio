import React from 'react'
import Hero from './sections/Hero'
import NavBar from './components/NavBar'
import LogoSection from './components/LogoSection'
import AppShowcase from './sections/ShowCaseSection'
import FeatureCards from './sections/FeatureCards'
import Experience from './sections/Experience'
import TechStack from './sections/TechStack'
import Contact from './sections/Contact'
import Social from './sections/Social'

const App = () => {
  return (
    <>
      <NavBar/>
      <Hero/>
      <AppShowcase/>
      {/* <LogoSection/> */}
      <FeatureCards/>
      <Experience/>
      <TechStack/>
      <Social/>
      <Contact/>
    </>
  )
}
export default App