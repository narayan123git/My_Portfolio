import React from 'react'

const Button = ({ text, className, id }) => {
    const handleClick = (e) => {
        e.preventDefault()
        const target = document.getElementById('counter')
        if (target && id) {
            const offset = Math.round(window.innerHeight * 0.15)
            const top = target.getBoundingClientRect().top + window.scrollY - offset
            window.scrollTo({ top, behavior: 'smooth' })
        }
    }

    return (
        <div className="cta-wrapper">
            <button
                type="button"
                aria-label={text}
                onClick={handleClick}
                className={`cta-button group ${className ?? ''}`}
                id={id}
            >
                <div className="bg-circle" aria-hidden="true" />
                <span className="text">{text}</span>
                <div className="arrow-wrapper" aria-hidden="true">
                    <img src="/images/arrow-down.svg" alt="" />
                </div>
            </button>
        </div>
    )
}

export default Button