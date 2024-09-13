import React from 'react'
import Filter from './Filter'
import AddButtons from './AddButtons'

function FilterNButtons() {
    return (
        <>
            <div className="filternaddbar flex">
                <Filter/>

                <AddButtons />
            </div>
        </>
    )
}

export default FilterNButtons