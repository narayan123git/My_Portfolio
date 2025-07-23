import React from 'react'
import TitleHeader from '../components/TitleHeader'
import {expCards} from '../constants/index'

const Experience = () => {
  return (
    <section id="experience" className='w-full md:mt-40 mt-20 section-padding xl:px-0'>
        <div className="w-full h-full md:px-20 px-5">
            <TitleHeader title="Professional Work Experience" sub="My career overview"/>
            <div className="mt-32 relative">
                <div className="relative z-50 xl:space-y-32 space-y-10">
                    {expCards.map((card, index) => (
                        <div key={index} className="exp-card-wrapper">
                           {card.title}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </section>
  )
}

export default Experience