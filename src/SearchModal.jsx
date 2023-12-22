
// Modal popup shows different ways to search locations
function SearchModal() {
    return (
        <div className="modal fade" id="formatModal">
            <div className="modal-dialog">
                <div className="modal-content">


                    <div className="modal-header">
                        <h4 className="modal-title">Available Location Types</h4>
                        <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                    </div>

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


                </div>
            </div>
        </div>


    )
}

export default SearchModal