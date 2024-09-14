import React from 'react'
import Filters from './filterBar/Filters'
import AddButtons from './AddButtons'

function FilterNButtons() {
    return (
        <>
            <div className="filternaddbar flex">
                <Filters/>
                <AddButtons />
            </div>
        </>
    )
}

export default FilterNButtons