import { useEffect, useState } from "react"

function HeaderButtons({ light = false, imperial = false, updateSystem }) {
    let [lightMode, setMode] = useState(light)
    let [isImperial, setIsImperial] = useState(imperial)

    useEffect(() => {

        if (lightMode) {
            document.body.style.backgroundColor = 'rgb(118, 118, 212)'

        } else {
            document.body.style.backgroundColor = 'rgb(0, 0, 0)'

        }
    }, [lightMode])

    useEffect(() => {
        updateSystem(isImperial)
    }, [isImperial])


    return (

        <div className='row'>
            <div className='col mt-3'>
                <a href='https://github.com/RTaylorAshka/Capstone-2' target='_blank'>
                    <img className='icon-small' src="github-mark-white.png" alt="github link" />
                </a>
                <div className='btn-group'>
                    <button className='btn text-light ms-3 pt-3'>
                        <span className="material-symbols-outlined" onClick={() => setMode(!lightMode)}>
                            {lightMode ? "light_mode" : "dark_mode"}
                        </span>
                    </button>
                    <button className='btn text-light' onClick={() => setIsImperial(!isImperial)}>C | F</button>
                </div>


            </div>

        </div>

    )
}

export default HeaderButtons