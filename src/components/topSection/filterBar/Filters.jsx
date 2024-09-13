import React from 'react'
import AppliedFilters from './AppliedFilters'
import FilterDropdown from './FilterDropdown'

function Filter() {
    
    function chooseilters(){

    }
    return (
        <div>
            <div className='filters flex'>

                {/* <div className="dropdown dr">
                    <div tabIndex={0} role="button" className="btn m-1">საძინებლების რაოდენობა</div>
                    <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                        <li><a>Item 1</a></li>
                        <li><a>Item 2</a></li>
                    </ul>
                </div> */}
                <FilterDropdown filterName="რეგიონი" />
                <FilterDropdown filterName="საფასო კატეგორია" />
                <FilterDropdown filterName="ფართობი" />
                <FilterDropdown filterName="საძინებლების რაოდენობა"/>
            </div>
            <AppliedFilters />
        </div>
    )
}

export default Filter