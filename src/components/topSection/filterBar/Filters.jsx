import React, { useState } from "react";
import UP_ARROW_ICON from "../../../../public/photos/up.png";
import DOWN_ARROW_ICON from "../../../../public/photos/down.png";
import CANCEL_ICON from '../../../../public/photos/x.png';
import './styles.css';

const Filters = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [rangeValue1, setRangeValue1] = useState({ from: '', to: '' });
  const [rangeValue2, setRangeValue2] = useState({ from: '', to: '' });
  const [numberValue, setNumberValue] = useState(0);
  const [activeButton, setActiveButton] = useState(null);

  const toggleDropdown = (index) => {
    setOpenDropdown(prev => prev === index ? null : index);
    setActiveButton(prev => prev === index ? null : index); // Toggle active state
  };

  const handleCheckboxChange = (e) => {
    const value = e.target.value;
    setSelectedItems(prev =>
      prev.includes(value)
        ? prev.filter(item => item !== value)
        : [...prev, value]
    );
  };

  const handleRangeInputChange = (e, type, rangeIndex) => {
    if (rangeIndex === 1) {
      setRangeValue1(prev => ({
        ...prev,
        [type]: e.target.value
      }));
    } else {
      setRangeValue2(prev => ({
        ...prev,
        [type]: e.target.value
      }));
    }
  };

  const handleNumberChange = (e) => {
    setNumberValue(parseInt(e.target.value, 10));
  };

  const applyFilters = () => {
    console.log('Applying filters:', {
      selectedItems,
      rangeValue1,
      rangeValue2,
      numberValue
    });
    setOpenDropdown(null);
  };

  const removeFilter = (filterType, value) => {
    if (filterType === 'checkbox') {
      setSelectedItems(prev => prev.filter(item => item !== value));
    } else if (filterType === 'range1') {
      setRangeValue1({ from: '', to: '' });
    } else if (filterType === 'range2') {
      setRangeValue2({ from: '', to: '' });
    } else if (filterType === 'number') {
      setNumberValue(0);
    }
  };

  const rangeSuggestions = [
    [10, 20, 30, 40, 50],  // Min suggestions
    [60, 70, 80, 90, 100]  // Max suggestions
  ];

  return (
    <div className="filter-section">
      <div className="filter-dropdown-container">
        {[1, 2, 3, 4].map((index) => (
          <div key={index} className="dropdown-wrapper">
            <button
              onClick={() => toggleDropdown(index)}
              className={`dropdown-button ${activeButton === index ? 'active' : ''}`}
            >
              <span>{`Dropdown ${index}`}</span>
              <img
                src={openDropdown === index ? UP_ARROW_ICON : DOWN_ARROW_ICON}
                alt={openDropdown === index ? "Collapse" : "Expand"}
                className="arrow-icon"
              />
            </button>
            {openDropdown === index && (
              <div className="dropdown-menu">
                {index === 1 && (
                  <div className="checkbox-dropdown">
                    {['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5', 'Option 6', 'Option 7', 'Option 8', 'Option 9', 'Option 10', 'Option 11', 'Option 12'].map((option, idx) => (
                      <div key={idx} className="checkbox-item">
                        <input
                          type="checkbox"
                          id={`checkbox-${idx}`}
                          value={option}
                          onChange={handleCheckboxChange}
                          checked={selectedItems.includes(option)}
                        />
                        <label htmlFor={`checkbox-${idx}`}>{option}</label>
                      </div>
                    ))}
                    <button onClick={applyFilters} className="apply-button">Apply Filters</button>
                  </div>
                )}

                {index === 2 && (
                  <div className="range-dropdown">
                    <div className="range-title">
                      <span>Range Filter 1</span>
                    </div>
                    <div className="range-inputs">
                      <input
                        type="number"
                        value={rangeValue1.from}
                        onChange={(e) => handleRangeInputChange(e, "from", 1)}
                        placeholder="From"
                      />
                      <input
                        type="number"
                        value={rangeValue1.to}
                        onChange={(e) => handleRangeInputChange(e, "to", 1)}
                        placeholder="To"
                      />
                    </div>
                    <div className="range-suggestions">
                      <div className="range-suggestions-titles">
                        <span>Min</span>
                        <span>Max</span>
                      </div>
                      <div className="range-suggestions-list">
                        {rangeSuggestions[0].map((suggestion, idx) => (
                          <button
                            key={idx}
                            className="suggestion-button"
                            onClick={() => setRangeValue1(prev => ({ ...prev, from: suggestion }))}
                          >
                            {suggestion}
                          </button>
                        ))}
                        {rangeSuggestions[1].map((suggestion, idx) => (
                          <button
                            key={idx}
                            className="suggestion-button"
                            onClick={() => setRangeValue1(prev => ({ ...prev, to: suggestion }))}
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    </div>
                    <button onClick={applyFilters} className="apply-button">Apply Filters</button>
                  </div>
                )}

                {index === 3 && (
                  <div className="range-dropdown">
                    <div className="range-title">
                      <span>Range Filter 2</span>
                    </div>
                    <div className="range-inputs">
                      <input
                        type="number"
                        value={rangeValue2.from}
                        onChange={(e) => handleRangeInputChange(e, "from", 2)}
                        placeholder="From"
                      />
                      <input
                        type="number"
                        value={rangeValue2.to}
                        onChange={(e) => handleRangeInputChange(e, "to", 2)}
                        placeholder="To"
                      />
                    </div>
                    <div className="range-suggestions">
                      <div className="range-suggestions-titles">
                        <span>Min</span>
                        <span>Max</span>
                      </div>
                      <div className="range-suggestions-list">
                        {rangeSuggestions[0].map((suggestion, idx) => (
                          <button
                            key={idx}
                            className="suggestion-button"
                            onClick={() => setRangeValue2(prev => ({ ...prev, from: suggestion }))}
                          >
                            {suggestion}
                          </button>
                        ))}
                        {rangeSuggestions[1].map((suggestion, idx) => (
                          <button
                            key={idx}
                            className="suggestion-button"
                            onClick={() => setRangeValue2(prev => ({ ...prev, to: suggestion }))}
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    </div>
                    <button onClick={applyFilters} className="apply-button">Apply Filters</button>
                  </div>
                )}

                {index === 4 && (
                  <div className="number-dropdown">
                    <input
                      type="number"
                      value={numberValue}
                      onChange={handleNumberChange}
                    />
                    <button onClick={applyFilters} className="apply-button">Apply Filters</button>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* New bar for selected filters */}
      <div className="selected-filters-bar">
        {selectedItems.map((item, idx) => (
          <div key={idx} className="filter-tag">
            {item}
            <button onClick={() => removeFilter('checkbox', item)}><img src={CANCEL_ICON} alt="Cancel" className="cancel-icon" /></button>
          </div>
        ))}

        {(rangeValue1.from || rangeValue1.to) && (
          <div className="filter-tag">
            Range1: {rangeValue1.from || 'From'} - {rangeValue1.to || 'To'}
            <button onClick={() => removeFilter('range1')}><img src={CANCEL_ICON} alt="Cancel" className="cancel-icon" /></button>
          </div>
        )}

        {(rangeValue2.from || rangeValue2.to) && (
          <div className="filter-tag">
            Range2: {rangeValue2.from || 'From'} - {rangeValue2.to || 'To'}
            <button onClick={() => removeFilter('range2')}><img src={CANCEL_ICON} alt="Cancel" className="cancel-icon" /></button>
          </div>
        )}

        {numberValue !== 0 && (
          <div className="filter-tag">
            Number: {numberValue}
            <button onClick={() => removeFilter('number')}><img src={CANCEL_ICON} alt="Cancel" className="cancel-icon" /></button>
          </div>
        )}

        {(selectedItems.length || rangeValue1.from || rangeValue1.to || rangeValue2.from || rangeValue2.to || numberValue) && (
          <button className="clear-button" onClick={() => {
            setSelectedItems([]);
            setRangeValue1({ from: '', to: '' });
            setRangeValue2({ from: '', to: '' });
            setNumberValue(0);
          }}>
            Clear All
          </button>
        )}
      </div>
    </div>
  );
};

export default Filters;
