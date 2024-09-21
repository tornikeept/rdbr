import React, { useContext, useState, useEffect } from "react";
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


  useEffect(() => {
    const savedFilters = JSON.parse(localStorage.getItem('filters')) || {};
    setCheckedCities(savedFilters.cities || {});
    setPriceRange(savedFilters.priceRange || {});
    setAreaRange(savedFilters.areaRange || {});
    setBadroomsNumberValue(savedFilters.badrooms || '');
  }, []);
  
  
  
  const {
    checkedCities = {},
    setCheckedCities,
    priceRange = {},
    setPriceRange,
    areaRange = {},
    setAreaRange,
    badroomsNumberValue = '',
    setBadroomsNumberValue,
    priceRangeError = '',
    setPriceRangeError,
    areaRangeError = '',
    setAreaRangeError,
    applyFilters,
    removeFilter,
    clearAllFilters,
  } = useContext(ProjectContext);

  const [openDropdown, setOpenDropdown] = useState(null);

  // Local state for editing filters
  const [localCheckedCities, setLocalCheckedCities] = useState(checkedCities);
  const [localPriceRange, setLocalPriceRange] = useState(priceRange);
  const [localAreaRange, setLocalAreaRange] = useState(areaRange);
  const [localBadroomsNumber, setLocalBadroomsNumber] = useState(badroomsNumberValue);

  // Local error states
  const [localPriceRangeError, setLocalPriceRangeError] = useState('');
  const [localAreaRangeError, setLocalAreaRangeError] = useState('');

  // Toggle dropdown menus
  const toggleDropdownMenu = (type) => {
    setOpenDropdown(openDropdown === type ? null : type);
  };

  // Handle checkbox change for regions
  const handleCheckboxChange = (region) => {
    setLocalCheckedCities((prevState) => ({
      ...prevState,
      [region]: !prevState[region],
    }));
  };

  // Handle range input change
  const handleRangeInputChange = (e, type, rangeIndex) => {
    const value = e.target.value;
    const rangeUpdater = rangeIndex === 1 ? setLocalPriceRange : setLocalAreaRange;
    const errorUpdater = rangeIndex === 1 ? setLocalPriceRangeError : setLocalAreaRangeError;
    const newRange = { [type]: value };

    rangeUpdater((prev) => {
      const updatedRange = { ...prev, ...newRange };
      const errorMessage = validateRange(updatedRange.from, updatedRange.to, rangeIndex === 1 ? 'price' : 'area');
      errorUpdater(errorMessage); // Set the error message
      return updatedRange;
    });
  };

  const handleNumberChange = (e) => {
    setLocalBadroomsNumber(parseInt(e.target.value, 10) || '');
  };

  const handleClickApply = () => {
    if (localPriceRangeError === '' && localAreaRangeError === '') {
      // Update local storage with current local state
      const filters = {
        cities: localCheckedCities,
        priceRange: localPriceRange,
        areaRange: localAreaRange,
        badrooms: localBadroomsNumber
      };
      localStorage.setItem("filters", JSON.stringify(filters));
  
      // Update context state
      setCheckedCities(localCheckedCities);
      setPriceRange(localPriceRange);
      setAreaRange(localAreaRange);
      setBadroomsNumberValue(localBadroomsNumber);
  
      // Close dropdown
      setOpenDropdown(null);
    }
  };
  
  
  const handleRemoveFilter = (filterType, filterValue) => {
    const savedFilters = JSON.parse(localStorage.getItem('filters')) || {};
  
    if (filterType === 'region') {
      setCheckedCities((prev) => {
        const newCheckedCities = { ...prev };
        delete newCheckedCities[filterValue];
        return newCheckedCities;
      });
      delete savedFilters.cities[filterValue];
    } else if (filterType === 'price') {
      setPriceRange({});
      delete savedFilters.priceRange;
    } else if (filterType === 'area') {
      setAreaRange({});
      delete savedFilters.areaRange;
    } else if (filterType === 'bedrooms') {
      setBadroomsNumberValue('');
      delete savedFilters.badrooms;
    }
  
    // Update localStorage after removing the filter
    localStorage.setItem('filters', JSON.stringify(savedFilters));
  
    // Update context state with new filters from local storage
    const updatedFilters = JSON.parse(localStorage.getItem('filters')) || {};
    setCheckedCities(updatedFilters.cities || {});
    setPriceRange(updatedFilters.priceRange || {});
    setAreaRange(updatedFilters.areaRange || {});
    setBadroomsNumberValue(updatedFilters.badrooms || '');
  };
  
 
  
  
  


  return (
    <div className="filter-section">
      {/* Region Dropdown */}
      <div className="filters">
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
                  checked={!!localCheckedCities[item]} // Boolean value to ensure it's true/false
                  onChange={() => handleCheckboxChange(item)} // Toggle the checked state
                  className="mr-2"
                />
                <label htmlFor={`${item}-checkbox`}>{item}</label>
              </li>
            ))}
            <button className="btn" onClick={handleClickApply}>Apply</button>
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
                value={localPriceRange.from || ''}
                onChange={(e) => handleRangeInputChange(e, "from", 1)}
              />
              <input
                type="number"
                placeholder="მდე"
                value={localPriceRange.to || ''}
                onChange={(e) => handleRangeInputChange(e, "to", 1)}
              />
            </div>
            {localPriceRangeError !== '' && <p className="error-message">{localPriceRangeError}</p>} {/* Display Price Range Error */}
            <div className="range-suggestions-list">
              <div className="range-suggestions-column">
                <p>მინ.ფასი</p>
                {priceSuggestions.min.map((suggestion, idx) => (
                  <button key={idx} className="suggestion-button" onClick={() => {
                    setLocalPriceRange((prev) => ({ ...prev, from: suggestion }));
                    setLocalPriceRangeError(validateRange(suggestion, localPriceRange.to, 'price')); // Validate on suggestion click
                  }}>
                    {suggestion}
                  </button>
                ))}
              </div>
              <div className="range-suggestions-column">
                <p>მაქს.ფასი</p>
                {priceSuggestions.max.map((suggestion, idx) => (
                  <button key={idx} className="suggestion-button" onClick={() => {

                    setLocalPriceRange((prev) => ({ ...prev, to: suggestion }));
                    setLocalPriceRangeError(validateRange(localPriceRange.from, suggestion, 'price')); // Validate on suggestion click
                  }}>
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
            <button className="btn" onClick={handleClickApply}>Apply</button>
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
                value={localAreaRange.from || ''}
                onChange={(e) => handleRangeInputChange(e, "from", 2)}
              />
              <input
                type="number"
                placeholder="მდე"
                value={localAreaRange.to || ''}
                onChange={(e) => handleRangeInputChange(e, "to", 2)}
              />
            </div>
            {localAreaRangeError !== '' && <p className="error-message">{localAreaRangeError}</p>} {/* Display Area Range Error */}
            <div className="range-suggestions-list">
              <div className="range-suggestions-column">
                <p>მინ.მ²</p>
                {areaSuggestions.min.map((suggestion, idx) => (
                  <button key={idx} className="suggestion-button" onClick={() => {
                    setLocalAreaRange((prev) => ({ ...prev, from: suggestion }));
                    setLocalAreaRangeError(validateRange(suggestion, localAreaRange.to, 'area')); // Validate on suggestion click
                  }}>
                    {suggestion}
                  </button>
                ))}
              </div>
              <div className="range-suggestions-column">
                <p>მაქს.მ²</p>
                {areaSuggestions.max.map((suggestion, idx) => (
                  <button key={idx} className="suggestion-button" onClick={() => {
                    setLocalAreaRange((prev) => ({ ...prev, to: suggestion }));
                    setLocalAreaRangeError(validateRange(localAreaRange.from, suggestion, 'area')); // Validate on suggestion click
                  }}>
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
            <button className="btn" onClick={handleClickApply}>Apply</button>
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
              value={localBadroomsNumber || ''}
              onChange={handleNumberChange}
            />
            <button className="btn" onClick={() => {
              // Only apply if there are no errors
              if (localPriceRangeError === '' && localAreaRangeError === '') {
                setBadroomsNumberValue(localBadroomsNumber);
                setOpenDropdown(null); // Close dropdown
                applyFilters(); // Ensure filters are applied
              }
            }}>Apply</button>
          </div>
        </Dropdown>
      </div>

      {/* Applied Filters Display */}
      <div className="applied-filters">
        {Object.keys(checkedCities).filter(region => checkedCities[region]).map(region => (
          <div key={region} className="filter-item">
            {region}
            <button onClick={() => handleRemoveFilter('region', region)}>
              <img src={CANCEL_ICON} alt="Remove filter" />
            </button>
          </div>
        ))}

        {priceRange.from && priceRange.to && (
          <div className="filter-item">
            ფასის: {priceRange.from} - {priceRange.to}
            <button onClick={() => handleRemoveFilter('price')}>
              <img src={CANCEL_ICON} alt="Remove filter" />
            </button>
          </div>
        )}
        {areaRange.from && areaRange.to && (
          <div className="filter-item">
            ფართობის: {areaRange.from} - {areaRange.to}
            <button onClick={() => handleRemoveFilter('area')}>
              <img src={CANCEL_ICON} alt="Remove filter" />
            </button>
          </div>
        )}
        {badroomsNumberValue && (
          <div className="filter-item">
            ძინებლების რაოდენობა: {badroomsNumberValue}
            <button onClick={() => handleRemoveFilter('bedrooms')}>
              <img src={CANCEL_ICON} alt="Remove filter" />
            </button>
          </div>
        )}

        {/* Clear All Filters Button */}
        <button className="btn clear-all-button" onClick={clearAllFilters}>
          გასუფთავება
        </button>
      </div>
    </div>
  );
};

export default Filters;
