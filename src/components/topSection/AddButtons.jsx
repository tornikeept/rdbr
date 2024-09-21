import React from 'react'

function AddButtons() {
    return (
        <div className='addButtons flex'>
            <div className="flex-1">
                <a href='/new-listing' className="btn bg-orange text-white ">+ ლისტინგის დამატება</a>
            </div>
            <div className="flex-1">
                <a className="btn bg-white text-orange">+ აგენტის დამატება</a>
            </div>

        </div>
    )
}

export default AddButtons