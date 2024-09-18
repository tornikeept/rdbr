import React, { useContext, useState } from "react";
import { ProjectContext } from "../../../store/ProjectContext.jsx";
import UP_ARROW_ICON from "../../../../public/photos/up.png";
import DOWN_ARROW_ICON from "../../../../public/photos/down.png";
import CANCEL_ICON from '../../../../public/photos/x.png';
import './styles.css';

const regionArray = ["ქართლი", "კახეთი", "იმერეთი", "სამეგრელო", "გურია", "რაჭა", "ლეჩხუმი", "სამცხე-ჯავახეთი", "აჭარა", "სვანეთი", "მცხეთა-მთიანეთი", "თბილისი"];
const priceSuggestions = { min: [10, 20, 30, 40, 50], max: [60, 70, 80, 90, 100] };
const areaSuggestions = { min: [10, 20, 30, 40, 50], max: [50, 100, 150, 250, 300] };

// Helper function for range validation
const validateRange = (from, to, type) => {
  if (to && from && parseInt(to, 10) < parseInt(from, 10)) {
    console.log('range error detected');
    return type === 'price' ? 'გთხოვთ შეიყვანოთ ვალიდური ფასები' : 'გთხოვთ შეიყვანოთ ვალიდური ფართები'; // Validation error message
  }
  return '';
};

// Dropdown component
const Dropdown = ({ label, isOpen, toggleDropdown, children }) => (
  <div className="dropdown-menu">
    <div className="button-arrow-wrapper">
      <button onClick={toggleDropdown}>{label}</button>
      <img src={isOpen ? UP_ARROW_ICON : DOWN_ARROW_ICON} alt={isOpen ? "Collapse" : "Expand"} className="arrow-icon size-4" />
    </div>
    {isOpen && <div className="dropdown-content">{children}</div>}
  </div>
);

const Filters = () => {
  const {
    checkedCities = {},
    setCheckedCities,
    priceRange = {},
    setPriceRange,
    areaRange = {},
    setAreaRange,
    badroomsNumberValue = '',
    setBadroomsNumberValue,
    priceRangeError = '', // Separate state for price range error
    setPriceRangeError,
    areaRangeError = '', // Separate state for area range error
    setAreaRangeError,
    applyFilters,
    removeFilter,
    clearAllFilters,
  } = useContext(ProjectContext);

  const [openDropdown, setOpenDropdown] = useState(null);

  // Toggle dropdown menus
  const toggleDropdownMenu = (type) => {
    setOpenDropdown(openDropdown === type ? null : type);
  };

  // Handle checkbox change for regions
  const handleCheckboxChange = (region) => {
    setCheckedCities((prevState) => ({
      ...prevState,
      [region]: !prevState[region],
    }));
  };

  // Handle range input change
  const handleRangeInputChange = (e, type, rangeIndex) => {
    const value = e.target.value;
    const rangeUpdater = rangeIndex === 1 ? setPriceRange : setAreaRange;
    const errorUpdater = rangeIndex === 1 ? setPriceRangeError : setAreaRangeError;
    const newRange = { [type]: value };

    rangeUpdater((prev) => {
      const updatedRange = { ...prev, ...newRange };
      const errorMessage = validateRange(updatedRange.from, updatedRange.to, rangeIndex === 1 ? 'price' : 'area');
      errorUpdater(errorMessage); // Set the error message
      // console.log(errorMessage);
      return updatedRange;
    });
  };

  const handleNumberChange = (e) => {
    setBadroomsNumberValue(parseInt(e.target.value, 10) || '');
  };

  const handleClickApply = () => {
    console.log("Applied filters");
  };

  return (
    <div className="filter-section">
      {/* Region Dropdown */}
      <Dropdown
        label="რეგიონი"
        isOpen={openDropdown === 'region-category'}
        toggleDropdown={() => toggleDropdownMenu('region-category')}
      >
        <ul className="region-dropdown-menu-open">
          {regionArray.map((item, index) => (
            <li key={index} className="flex items-center p-2">
              <input
                id={`${item}-checkbox`}
                type="checkbox"
                checked={!!checkedCities[item]} // Boolean value to ensure it's true/false
                onChange={() => handleCheckboxChange(item)} // Toggle the checked state
                className="mr-2"
              />
              <label htmlFor={`${item}-checkbox`}>{item}</label>
            </li>
          ))}
          <button className="btn" onClick={handleClickApply}>არჩევა</button>
        </ul>
      </Dropdown>

      {/* Price Category Dropdown */}
      <Dropdown
        label="საფასო კატეგორია"
        isOpen={openDropdown === 'price-category'}
        toggleDropdown={() => toggleDropdownMenu('price-category')}
      >
        <div className="range-dropdown-open">
          <div className="price-inputs">
            <p className="bold">ფასის მიხედვით</p>
            <input
              type="number"
              placeholder="დან"
              value={priceRange.from || ''}
              onChange={(e) => handleRangeInputChange(e, "from", 1)}
            />
            <input
              type="number"
              placeholder="მდე"
              value={priceRange.to || ''}
              onChange={(e) => handleRangeInputChange(e, "to", 1)}
            />
          </div>
          {priceRangeError !== '' && <p className="error-message">{priceRangeError}</p>} {/* Display Price Range Error */}
          <div className="range-suggestions-list">
            <div className="range-suggestions-column">
              <p>მინ.ფასი</p>
              {priceSuggestions.min.map((suggestion, idx) => (
                <button key={idx} className="suggestion-button" onClick={() => setPriceRange((prev) => ({ ...prev, from: suggestion }))}>
                  {suggestion}
                </button>
              ))}
            </div>
            <div className="range-suggestions-column">
              <p>მაქს.ფასი</p>
              {priceSuggestions.max.map((suggestion, idx) => (
                <button key={idx} className="suggestion-button" onClick={() => setPriceRange((prev) => ({ ...prev, to: suggestion }))}>
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
          <button className="btn" onClick={handleClickApply}>არჩევა</button>
        </div>
      </Dropdown>

      {/* Area Category Dropdown */}
      <Dropdown
        label="ფართობის კატეგორია"
        isOpen={openDropdown === 'area-category'}
        toggleDropdown={() => toggleDropdownMenu('area-category')}
      >
        <div className="range-dropdown-open">
          <div className="area-inputs">
            <p className="bold">ფართობის მიხედვით</p>
            <input
              type="number"
              placeholder="დან"
              value={areaRange.from || ''}
              onChange={(e) => handleRangeInputChange(e, "from", 2)}
            />
            <input
              type="number"
              placeholder="მდე"
              value={areaRange.to || ''}
              onChange={(e) => handleRangeInputChange(e, "to", 2)}
            />
          </div>
          {areaRangeError !== '' && <p className="error-message">{areaRangeError}</p>} {/* Display Area Range Error */}
          <div className="range-suggestions-list">
            <div className="range-suggestions-column">
              <p>მინ.მ²</p>
              {areaSuggestions.min.map((suggestion, idx) => (
                <button key={idx} className="suggestion-button" onClick={() => setAreaRange((prev) => ({ ...prev, from: suggestion }))}>
                  {suggestion}
                </button>
              ))}
            </div>
            <div className="range-suggestions-column">
              <p>მაქს.მ²</p>
              {areaSuggestions.max.map((suggestion, idx) => (
                <button key={idx} className="suggestion-button" onClick={() => setAreaRange((prev) => ({ ...prev, to: suggestion }))}>
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
          <button className="btn" onClick={handleClickApply}>არჩევა</button>
        </div>
      </Dropdown>

            {/* Bedroom Category Dropdown */}
            <Dropdown
        label="საძინებლების რაოდენობა"
        isOpen={openDropdown === 'bedroom-category'}
        toggleDropdown={() => toggleDropdownMenu('bedroom-category')}
      >
        <div className="bedroom-inputs">
          <input
            type="number"
            placeholder="რაოდენობა"
            value={badroomsNumberValue || ''}
            onChange={handleNumberChange}
          />
          <button className="btn" onClick={handleClickApply}>არჩევა</button>
        </div>
      </Dropdown>

      {/* Clear All Filters Button */}
      <button className="btn clear-all-button" onClick={clearAllFilters}>
        ყველა ფილტრის გაწვდვა
      </button>

      {/* Applied Filters Display */}
      <div className="applied-filters">
        {Object.keys(checkedCities).filter(region => checkedCities[region]).map(region => (
          <div key={region} className="filter-item">
            {region}
            <button onClick={() => removeFilter(region)} className="remove-filter-btn">
              <img src={CANCEL_ICON} alt="Remove filter" />
            </button>
          </div>
        ))}
        {priceRange.from && priceRange.to && (
          <div className="filter-item">
            ფასის: {priceRange.from} - {priceRange.to}
            <button onClick={() => removeFilter('price')} className="remove-filter-btn">
              <img src={CANCEL_ICON} alt="Remove filter" />
            </button>
          </div>
        )}
        {areaRange.from && areaRange.to && (
          <div className="filter-item">
            ფართობის: {areaRange.from} - {areaRange.to}
            <button onClick={() => removeFilter('area')} className="remove-filter-btn">
              <img src={CANCEL_ICON} alt="Remove filter" />
            </button>
          </div>
        )}
        {badroomsNumberValue && (
          <div className="filter-item">
            ძინებლების რაოდენობა: {badroomsNumberValue}
            <button onClick={() => removeFilter('bedrooms')} className="remove-filter-btn">
              <img src={CANCEL_ICON} alt="Remove filter" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Filters;



// import React, { useContext, useState } from "react";
// import { ProjectContext } from "../../../store/ProjectContext.jsx";
// import UP_ARROW_ICON from "../../../../public/photos/up.png";
// import DOWN_ARROW_ICON from "../../../../public/photos/down.png";
// import CANCEL_ICON from '../../../../public/photos/x.png';
// import './styles.css';



// const regionArray = ["ქართლი", "კახეთი", "იმერეთი", "სამეგრელო", "გურია", "რაჭა", "ლეჩხუმი", "სამცხე-ჯავახეთი", "აჭარა", "სვანეთი", "მცხეთა-მთიანეთი", "თბილისი"]
// const priceSuggestions = {
//   min: [10, 20, 30, 40, 50],
//   max: [60, 70, 80, 90, 100]
// }

// const areaSuggestions = {
//   min: [10, 20, 30, 40, 50],
//   max: [50, 100, 150, 250, 300]
// }



// function Filters() {


//   const {
//     checkedCities = [],
//     setCheckedCities,
//     priceRange = {},
//     setPriceRange,
//     areaRange = {},
//     setAreaRange,
//     badroomsNumberValue = '',
//     setBadroomsNumberValue,
//     // activeButton,
//     // setActiveButton,
//     RangeError = '',
//     setRangeError,
//     applyFilters,
//     removeFilter,
//     clearAllFilters,
//   } = useContext(ProjectContext);



//   const [displayRegionDropdownMenu, setDisplayRegionDropdownMenu] = useState(false);
//   const [displayPriceRangeDropdownMenu, setDisplayPriceRangeDropdownMenu] = useState(false);
//   const [displayAreaRangeDropdownMenu, setDisplayAreaRangeDropdownMenu] = useState(false);
//   const [displaybadroomDropdownMenu, setDisplaybadroomDropdownMenu] = useState(false);




//   const handleClickDropDownButton = (type) => {
//     if (type === 'region-category') {
//       setDisplayRegionDropdownMenu(!displayRegionDropdownMenu);
//       setDisplayPriceRangeDropdownMenu(false);
//       setDisplayAreaRangeDropdownMenu(false);
//       setDisplaybadroomDropdownMenu(false); // Close bedroom dropdown
//     } else if (type === 'price-category') {
//       setDisplayPriceRangeDropdownMenu(!displayPriceRangeDropdownMenu);
//       setDisplayRegionDropdownMenu(false);
//       setDisplayAreaRangeDropdownMenu(false);
//       setDisplaybadroomDropdownMenu(false); // Close bedroom dropdown
//     } else if (type === 'area-category') {
//       setDisplayAreaRangeDropdownMenu(!displayAreaRangeDropdownMenu);
//       setDisplayRegionDropdownMenu(false);
//       setDisplayPriceRangeDropdownMenu(false);
//       setDisplaybadroomDropdownMenu(false); // Close bedroom dropdown
//     } else if (type === 'badroom-category') {
//       setDisplaybadroomDropdownMenu(!displaybadroomDropdownMenu);
//       setDisplayRegionDropdownMenu(false);
//       setDisplayPriceRangeDropdownMenu(false);
//       setDisplayAreaRangeDropdownMenu(false);
//     }
//   };

//   const handleCheckboxChange = (region) => {
//     setCheckedCities(prevState => ({
//       ...prevState,
//       [region]: !prevState[region]
//     }));
//     console.log(checkedCities);
//   };

//   const handleRangeInputChange = (e, type, rangeIndex) => {
//     const value = e.target.value;

//     if (rangeIndex === 1) {
//       setPriceRange(prev => {
//         const newRange = { ...prev, [type]: value };
//         if (newRange.to && newRange.from && parseInt(newRange.to, 10) < parseInt(newRange.from, 10)) {
//           setRangeError('გთხოვთ შეიყვანოთ ვალიდური რიცხვები');
//         } else {
//           setRangeError('');
//         }
//         return newRange;
//       });
//     }
//     else {
//       setAreaRange(prev => {
//         const newRange = { ...prev, [type]: value };
//         if (newRange.to && newRange.from && parseInt(newRange.to, 10) < parseInt(newRange.from, 10)) {
//           setRangeError('გთხოვთ შეიყვანოთ ვალიდური რიცხვები');
//         } else {
//           setRangeError('');
//         }
//         return newRange;
//       });
//     }
//   };

//   const handleNumberChange = (e) => {
//     setBadroomsNumberValue(parseInt(e.target.value, 10) || '');
//   };

//   const handleClickApply = () => {
//     console.log("Applied filters");
//   };

//   // const clearAllFilters = () => {
//   //   setSelectedItems([]);
//   //   setPriceRange({ from: '', to: '' });
//   //   setAreaRange ({ from: '', to: '' });
//   //   setNumberValue(null);
//   //   setRangeError('');
//   //   setFilteredProducts(products); // Reset to all products
//   // };

//   return (
//     <div className="filter-section">
//       {/* Region Dropdown */}
//       <div className="dropdown-menu-region-button">
//       <div className="button-arrow-wrapper">
//           <button onClick={() => handleClickDropDownButton('region-category')}>რეგიონი</button>
//           <img
//             src={displayRegionDropdownMenu ? UP_ARROW_ICON : DOWN_ARROW_ICON}
//             alt={displayRegionDropdownMenu ? "Collapse" : "Expand"}
//             className="arrow-icon size-4"
//           />
//         </div>

//         {displayRegionDropdownMenu && (
//           <ul className="region-dropdown-menu-open" onClick={(e) => e.stopPropagation()}>
//             {regionArray.map((item, index) => (
//               <li key={index} className="flex items-center p-2">
//                 <input
//                   id={`${item}-checkbox`}
//                   type="checkbox"
//                   checked={!!checkedCities[item]} // Boolean value to ensure it's true/false
//                   onChange={() => handleCheckboxChange(item)} // Toggle the checked state
//                   className="mr-2"
//                 />
//                 <label htmlFor={`${item}-checkbox`}>{item}</label>
//               </li>
//             ))}
//             <button className="btn" onClick={handleClickApply}>არჩევა</button>
//           </ul>
//         )}
//       </div>

//       {/* Price Category Dropdown */}
//       <div className="dropdown-menu-price-category-button">
//         <div className="button-arrow-wrapper">
//           <button onClick={() => handleClickDropDownButton('price-category')}>საფასო კატეგორია</button>
//           <img
//             src={displayPriceRangeDropdownMenu ? UP_ARROW_ICON : DOWN_ARROW_ICON}
//             alt={displayPriceRangeDropdownMenu ? "Collapse" : "Expand"}
//             className="arrow-icon size-4"
//           />
//         </div>
//         {displayPriceRangeDropdownMenu && (
//           <div className="range-dropdown-open" onClick={(e) => e.stopPropagation()}>
//             <div className="price-inputs">
//               <p className="bold">ფასის მიხედვით</p>
//               <input type="number" placeholder="დან" value={priceRange.from || ''}
//                 onChange={(e) => handleRangeInputChange(e, "from", 1)}
//               />
//               <input type="number" placeholder="მდე" value={priceRange.to || ''}
//                 onChange={(e) => handleRangeInputChange(e, "to", 1)}
//               />
//             </div>
//             <div className="range-suggestions-list">
//               <div className="range-suggestions-column">
//                 <p>მინ.ფასი</p>
//                 {priceSuggestions.min.map((suggestion, idx) => (
//                   <button
//                     key={idx}
//                     className="suggestion-button"
//                     onClick={() => setPriceRange(prev => ({ ...prev, from: suggestion }))}>
//                     {suggestion}
//                   </button>
//                 ))}
//               </div>
//               <div className="range-suggestions-column">
//                 <p>მაქს.ფასი</p>
//                 {priceSuggestions.max.map((suggestion, idx) => (
//                   <button
//                     key={idx}
//                     className="suggestion-button"
//                     onClick={() => setPriceRange(prev => ({ ...prev, to: suggestion }))}>
//                     {suggestion}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             <button className="btn" onClick={handleClickApply}>არჩევა</button>
//           </div>
//         )}
//       </div>

//       {/* area */}
//       <div className="dropdown-menu-area-category-button">
//         <div className="button-arrow-wrapper">
//           <button onClick={() => handleClickDropDownButton('area-category')}>საფასო კატეგორია</button>
//           <img
//             src={displayAreaRangeDropdownMenu ? UP_ARROW_ICON : DOWN_ARROW_ICON}
//             alt={displayAreaRangeDropdownMenu ? "Collapse" : "Expand"}
//             className="arrow-icon size-4"
//           />
//         </div>

//         {displayAreaRangeDropdownMenu && (
//           <div className="range-dropdown-open" onClick={(e) => e.stopPropagation()}>
//             <div className="area-inputs">
//               <p className="bold">ფასის მიხედვით</p>
//               <input type="number" placeholder="დან" value={areaRange.from || ''}
//                 onChange={(e) => handleRangeInputChange(e, "from", 2)}
//               />
//               <input type="number" placeholder="მდე" value={areaRange.to || ''}
//                 onChange={(e) => handleRangeInputChange(e, "to", 2)}
//               />
//             </div>
//             <div className="range-suggestions-list">
//               <div className="range-suggestions-column">
//                 <p>მინ.მ²</p>
//                 {areaSuggestions.min.map((suggestion, idx) => (
//                   <button
//                     key={idx}
//                     className="suggestion-button"
//                     onClick={() => setAreaRange(prev => ({ ...prev, from: suggestion }))}>
//                     {suggestion}
//                   </button>
//                 ))}
//               </div>
//               <div className="range-suggestions-column">
//                 <p>მაქს.მ</p>
//                 {areaSuggestions.max.map((suggestion, idx) => (
//                   <button
//                     key={idx}
//                     className="suggestion-button"
//                     onClick={() => setAreaRange(prev => ({ ...prev, to: suggestion }))}>
//                     {suggestion}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             <button className="btn" onClick={handleClickApply}>არჩევა</button>
//           </div>
//         )}
//       </div>

//       <div className="dropdown-menu-badroom-categort-button">
//         <div className="button-arrow-wrapper">
//           <button onClick={() => handleClickDropDownButton('badroom-category')}>საიძნებლების რაოდენობა</button>
//           <img
//             src={displaybadroomDropdownMenu ? UP_ARROW_ICON : DOWN_ARROW_ICON}
//             alt={displaybadroomDropdownMenu ? "Collapse" : "Expand"}
//             className="arrow-icon size-4 "
//           />
//         </div>

//         {displaybadroomDropdownMenu && (
//           <div className="range-dropdown-open" onClick={(e) => e.stopPropagation()}>
//             <p>საძინებლების რაოდენობა</p>
//             <input type="number" onChange={handleNumberChange} value={badroomsNumberValue} />

//             <button className="btn" onClick={handleClickApply}>არჩევა</button>
//           </div>
//         )}
//       </div>


//       <div className="selected-filters-bar">
//         {(checkedCities.length > 0 || priceRange.from || areaRange.from || badroomsNumberValue !== '') && (
//           <button onClick={clearAllFilters} className="clear-all-button">
//             Clear All
//           </button>
//         )}
//         {(priceRange.from || priceRange.to) && !RangeError && (
//           <div className="filter-tag">
//             {priceRange.from} Lar - {priceRange.to || 'To'} lari
//             <button onClick={() => removeFilter('range1')}><img src={CANCEL_ICON} alt="Cancel" className="cancel-icon" /></button>
//           </div>
//         )}

//         {(areaRange.from || areaRange.to) && !RangeError && (
//           <div className="filter-tag">
//             {areaRange.from} m2 - {areaRange.to || 'To'} m2
//             <button onClick={() => removeFilter('range2')}><img src={CANCEL_ICON} alt="Cancel" className="cancel-icon" /></button>
//           </div>
//         )}

//         {badroomsNumberValue !== '' && (
//           <div className="filter-tag">
//             otaxebis raodenoba{badroomsNumberValue}
//             <button onClick={() => removeFilter('number')}><img src={CANCEL_ICON} alt="Cancel" className="cancel-icon" /></button>
//           </div>
//         )}
//       </div>



//     </div>
//   );
// };
// export default Filters;

