import React, { Suspense, lazy, useEffect } from 'react'
import { words } from '../constants'
const HeroExp = lazy(() => import('../components/models/HeroModel/HeroExp'))
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import AnimatedCounter from '../components/AnimatedCounter'
import Button from '../components/Button'

const Hero = () => {
    useGSAP(() => {
        gsap.fromTo(
            '.hero-text h1',
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.6, duration: 0.8, ease: 'power2.out' }
        )
    })

    // Gentle entrance for intro paragraph
    useEffect(() => {
        gsap.from('.hero-text p', { y: 12, opacity: 0, duration: 0.8, delay: 0.5 })
    }, [])

    return (
        <section id="hero" className="relative overflow-hidden">
            <div className="absolute top-0 left-0 z-10">
                {/* Decorative background - lazy loaded image for better LCP */}
                <img src="/images/bg.png" alt="Subtle decorative background" loading="lazy" width="1200" height="600" />
            </div>

            <div className="hero-layout">
                <header className="flex flex-col justify-center md:w-full w-screen md:px-20 px-5">
                    <div className="flex flex-col gap-7">
                        <div className="hero-text">
                            <h1>
                                Shaping
                                <span className="slide">
                                    <span className="wrapper">
                                        {words.map((word, index) => (
                                            <span key={index} className="flex items-center md:gap-3 gap-1 pb-2">
                                                <img
                                                    src={word.imgPath}
                                                    alt={word.text}
                                                    loading="lazy"
                                                    className="xl:size-12 md:size-10 size-7 md:p-2 p-1 rounded-full bg-white-50"
                                                />
                                                <span>{word.text}</span>
                                            </span>
                                        ))}
                                    </span>
                                </span>
                            </h1>
                            <h1>into real projects</h1>
                            <h1>that deliver results</h1>
                        </div>

                        <p className="text-white-50 md:text-xl relative z-10 pointer-events-none">
                            Hi, I'm Narayan, a developer based in India with a passion for building modern, fast web experiences.
                        </p>

                        <Button
                            className="md:w-80 md:h-16 w-60 ml-[-0.2%] h-12 bg-gradient-to-r from-orange-400 via-pink-500 to-red-500 text-white font-semibold rounded-xl shadow-lg hover:scale-105 hover:shadow-pink-400/40 transition-transform duration-300"
                            id="button"
                            text="See my work"
                        />

                        <a
                            href="/files/off_campus_2.pdf"
                            download="NarayanPaul_CV.pdf"
                            className="relative md:w-80 md:h-16 w-60 h-12 ml-[-0.2%] flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 via-cyan-500 to-indigo-600 text-white font-semibold tracking-wide transition-all duration-300 transform hover:scale-105 hover:rotate-1 shadow-lg hover:shadow-cyan-500/40 overflow-hidden group"
                        >
                            <span className="relative z-10 text-lg">Download CV</span>
                            <span
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"
                                aria-hidden="true"
                            />
                        </a>
                    </div>
                </header>

                <figure>
                    <div className="hero-3d-layout" aria-hidden="true">
                        <Suspense fallback={<div className="flex-center" style={{ height: 300 }}>Loading...</div>}>
                            <HeroExp />
                        </Suspense>
                    </div>
                </figure>
            </div>

            <AnimatedCounter />
        </section>
    )
}

export default Hero