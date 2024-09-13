import React, { useState } from "react";
const cssstyles = `.dropdown-menu {
  width: Hug (199px)px;
  height: Hug (35px)px;
  padding: 8px 14px 8px 14px;
  gap: 4px;
  opacity: 0px;
}
  

ul {
  margin-top: 20px;
  list-style-type: none;
}

.selectButtonBar {
  width: Fill (683px)px;
  height: Hug (33px)px;
  gap: 10px;
  opacity: 0px;
}
.selectButton{
  width: Hug (77px)px;
  height: Hug (33px)px;
  padding: 8px 14px 8px 14px;
  gap: 2px;
  border-radius: 8px 0px 0px 0px;
  opacity: 0px;

}

`;
const FilterDropdown = ({filterName,filterIndicators}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  
  const items = ["Apple", "Banana", "Orange", "Mango", "Grapes", "Pineapple"];

  // Toggle the dropdown open/close
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Handle checkbox change
  const handleCheckboxChange = (e) => {
    const value = e.target.value;

    if (selectedItems.includes(value)) {
      setSelectedItems(selectedItems.filter(item => item !== value));
    } else {
      setSelectedItems([...selectedItems, value]);
    }
  };

  // Apply filters when button is clicked
  const applyFilters = () => {
    setFilteredItems(items.filter(item => selectedItems.includes(item)));
    setIsOpen(false); // Close dropdown after applying filters
  };

  return (
    <div>
      <style>{cssstyles}</style>
      {/* Filter dropdown */}
      <div>
        <button onClick={toggleDropdown}>
          {/* {isOpen ? "Close Filters" : filterName} */}
          {filterName}
        </button>
        {isOpen && (
          <div className="dropdown-menu">
            {items.map((item, index) => (
              <div key={index}>
                <input
                  type="checkbox"
                  value={item}
                  onChange={handleCheckboxChange}
                  checked={selectedItems.includes(item)}
                />
                <label>{item}</label>
              </div>
            ))}
            <div className="selectButtonBar">
              <button className=" bg-orange end-0 selectButton" onClick={applyFilters}>არჩევა</button>
            </div>
            
          </div>
        )}
      </div>

      {/* Filtered items */}
      <ul>
        {filteredItems.length > 0 ? (
          filteredItems.map((item, index) => <li key={index}>{item}</li>)
        ) : (
          <li>No items selected</li>
        )}
      </ul>
    </div>
  );
};

export default FilterDropdown;