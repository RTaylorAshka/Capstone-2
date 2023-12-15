import SearchModal from "./SearchModal"
import getCurrentLocation from "./helpers/locator"
import weatherAPI from "./helpers/api"

function SearchOptions() {
    function collapse() {
        setTimeout(() => {

            document.getElementById('search-toggle').dispatchEvent(new Event('click'))
        }, 1000)

    }


    return (
        <ul className="list-group list-group-horizontal clear sharp justify-content-end">

            <li className="list-group-item clear p-0 clamp-height">


                <button className="btn text-light" id='search-toggle' type="button" data-bs-toggle="collapse" data-bs-target="#search"  >
                    <span className="material-symbols-outlined">
                        search
                    </span>
                </button>
                <div className="collapse collapse-horizontal clp" id='search' >
                    <input type="text" className=' ' placeholder='Search Locations' onBlur={collapse} />

                    <a href="javascript:;" className='ms-2 text-info' data-bs-toggle="modal" data-bs-target="#formatModal">
                        <span className="material-symbols-outlined">
                            info
                        </span>
                    </a>
                </div>


                <div className="modal" id="formatModal">
                    <div className="modal-dialog">
                        <div className="modal-content">


                            <div className="modal-header">
                                <h4 className="modal-title">Available Location Types</h4>
                                <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                            </div>

                            <SearchModal />


                        </div>
                    </div>
                </div>




            </li>
            <li className="list-group-item clear p-0 ">
                <button className='btn text-light' onClick={() => weatherAPI.realtimeWeather()}>
                    <span className="material-symbols-outlined ">
                        my_location
                    </span>
                    <span className='align-top ps-1 '>My Location</span>
                </button>
            </li>
            <li className="list-group-item clear p-0 ">
                <button className='btn text-light' data-bs-toggle="dropdown">
                    <span className="material-symbols-outlined ">
                        history
                    </span>
                    <span className='align-top ps-1 '>Recent</span>
                </button>
                <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="#">Link 1</a></li>
                    <li><a className="dropdown-item" href="#">Link 2</a></li>
                    <li><a className="dropdown-item" href="#">Link 3</a></li>
                </ul>

            </li>
        </ul>
    )
}

export default SearchOptions