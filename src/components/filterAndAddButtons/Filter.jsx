import React from 'react'

function Filter() {
    return (
        <div>
            <div className='filters flex'>

                <div className="dropdown dr">
                    <div tabIndex={0} role="button" className="btn m-1">რეგიონი</div>
                    <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                        <li><a>Item 1</a></li>
                        <li><a>Item 2</a></li>
                    </ul>
                </div>

                <div className="dropdown dr">
                    <div tabIndex={0} role="button" className="btn m-1">საფასო კატეგორია</div>
                    <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                        <li><a>Item 1</a></li>
                        <li><a>Item 2</a></li>
                    </ul>
                </div>

                <div className="dropdown dr">
                    <div tabIndex={0} role="button" className="btn m-1">გართობი</div>
                    <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                        <li><a>Item 1</a></li>
                        <li><a>Item 2</a></li>
                    </ul>
                </div>

                <div className="dropdown dr">
                    <div tabIndex={0} role="button" className="btn m-1">საძინებლების რაოდენობა</div>
                    <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                        <li><a>Item 1</a></li>
                        <li><a>Item 2</a></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Filter