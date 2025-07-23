import React from 'react'
import Hero from './sections/Hero'
import NavBar from './components/NavBar'
import LogoSection from './components/LogoSection'
import AppShowcase from './sections/ShowCaseSection'
import FeatureCards from './sections/FeatureCards'
import Experience from './sections/Experience'

const App = () => {
  return (
    <>
      <NavBar/>
      <Hero/>
      <AppShowcase/>
      <LogoSection/>
      <FeatureCards/>
      <Experience/>
    </>
  )
}
export default App