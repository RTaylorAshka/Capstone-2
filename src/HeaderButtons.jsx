import { useEffect, useState } from "react"

function HeaderButtons({ light = false, system, updateSystem }) {
    // Stores if using light/dark mode
    let [lightMode, setMode] = useState(light)


    // When switching light/dark mode, change background color.
    useEffect(() => {

        if (lightMode) {
            document.body.style.backgroundColor = 'rgb(118, 118, 212)'

        } else {
            document.body.style.backgroundColor = 'rgb(0, 0, 0)'

        }
    }, [lightMode])



    return (

        <div className='row'>
            <div className='col mt-3'>
                {/* Github link */}
                <a href='https://github.com/RTaylorAshka/Capstone-2' target='_blank'>
                    <img className='icon-small' src="github-mark-white.png" alt="github link" />
                </a>
                <div className='btn-group'>
                    {/* light/dark mode toggle */}
                    <button className='btn text-light ms-3 pt-3'>
                        <span className="material-symbols-outlined" onClick={() => setMode(!lightMode)}>
                            {lightMode ? "light_mode" : "dark_mode"}
                        </span>
                    </button>
                    {/* metric/imperial system toggle */}
                    <button className='btn text-light' onClick={() => updateSystem()}>
                        <span className={system == 'metric' ? 'bolder' : 'lighter'}>C</span>
                        <span className="m-1"> | </span>
                        <span className={system == 'imperial' ? 'bolder' : 'lighter'}>F</span>
                    </button>
                </div>


            </div>

        </div>

    )
}

export default HeaderButtons