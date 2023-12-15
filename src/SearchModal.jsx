function SearchModal() {
    return (
        <div className="modal-body">
            <div className='container-fluid text-start'>
                <p></p>

                <dl>
                    <dt className='mb-1'>City</dt>
                    <dd className='ms-3'>
                        <span className="material-symbols-outlined">
                            search
                        </span>
                        <span className='align-top ps-2'>seattle</span>
                    </dd>

                    <dt className='mb-1'>Coordinates (latitude, longitude)</dt>
                    <dd className='ms-3'>
                        <span className="material-symbols-outlined">
                            search
                        </span>
                        <span className='align-top ps-2'>-33.918861, 18.423300</span>
                    </dd>

                    <dt className='mb-1'>US Zipcode</dt>
                    <dd className='ms-3'>
                        <span className="material-symbols-outlined">
                            search
                        </span>
                        <span className='align-top ps-2'>98117 US</span>
                    </dd>

                    <dt className='mb-1'>UK Postal</dt>
                    <dd className='ms-3'>
                        <span className="material-symbols-outlined">
                            search
                        </span>
                        <span className='align-top ps-2'>SW1A 0AA</span>
                    </dd>
                </dl>

            </div>
        </div>
    )
}

export default SearchModal