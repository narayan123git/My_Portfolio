import React from 'react'
import TitleHeader from '../components/TitleHeader'
import { expCards } from '../constants/index'
import GlowCard from '../components/GlowCard'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
gsap.registerPlugin(ScrollTrigger)
const Experience = () => {

    useGSAP(() => {
        gsap.utils.toArray('.timeline-card').forEach((card) => {
            gsap.from(card, {
                xPercent: -100,
                opacity: 0,
                duration: 1,
                ease: 'power2.inOut',
                transformOrigin: 'left left',
                scrollTrigger: {
                    trigger: card,
                    start: 'top 80%',
                    // toggleActions: 'play none none reverse',
                    // markers: false,
                    // once: true
                }

            })
        })

        gsap.to('.timeline', {
            transformOrigin: 'bottom bottom',
            ease: 'power1.inOut',
            scrollTrigger: {
                trigger: '.timeline',
                start: 'top center',
                end: '70% center',
                onUpdate: (self) => {
                    gsap.to('.timeline', {
                        scaleY: 1 - self.progress,
                    })
                    // scrub: 1,
                    // markers: true,
                }
            }})

            gsap.utils.toArray('.expText').forEach((text) => {
                gsap.from(text, {
                    xPercent: 0,
                    opacity: 0,
                    duration: 1,
                    ease: 'power2.inOut',
                    scrollTrigger: {
                        trigger: text,
                        start: 'top 60%',
                        // toggleActions: 'play none none reverse',
                        // markers: false,
                        // once: true
                    }
    
                })
            })
    }, [])
    return (
        <section id="experience" className='w-full md:mt-40 mt-20 section-padding xl:px-0'>
            <div className="w-full h-full md:px-20 px-5">
                <TitleHeader title="Professional Work Experience" sub="My career overview" />
                <div className="mt-32 relative">
                    <div className="relative z-50 xl:space-y-32 space-y-10">
                        {expCards.map((card, index) => (
                            <div key={index} className="exp-card-wrapper">
                                <div className='xl:w-2/6'>
                                    <GlowCard card={card} index={index}>
                                        {/* <div>
                                            <img src={card.imgPath} alt={card.title} />
                                        </div> */}
                                    </GlowCard>
                                </div>
                                <div className='xl:w-4/6'>
                                    <div className='flex items-start'>
                                        <div className='timeline-wrapper'>
                                            <div className='timeline' />
                                            <div className='gradient-line w-1 h-full' />
                                        </div>
                                        <div className="expText flex xl:gap-20 md:gap-10 gap-5 relative z-10">
                                            <div className='timeline-logo'>
                                                <img src={card.imgPath} alt="logo" />
                                            </div>
                                            <div>
                                                <h1 className='font-semibold text-3xl'>{card.title}</h1>
                                                <p className='my-5 text-white-50'>📅{card.date}</p>
                                                <p className='text-[#839cb5] italic'>Responsibilities</p>
                                                <ul className='list-disc ms-5 mt-5 flex flex-col gap-5 text-white-50'>
                                                    {card.responsibilities.map((item, idx) => (
                                                        <li key={idx} className='text-lg'>{item}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Experience