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
  const [rangeError1, setRangeError1] = useState('');
  const [rangeError2, setRangeError2] = useState('');

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
    const value = e.target.value;

    if (rangeIndex === 1) {
      setRangeValue1(prev => {
        const newRange = { ...prev, [type]: value };
        if (newRange.to && newRange.from && parseInt(newRange.to, 10) < parseInt(newRange.from, 10)) {
          setRangeError1('გთხოვთ შეიყვანოთ ვალიდური რიცხვები');
        } else {
          setRangeError1('');
        }
        return newRange;
      });
    } else {
      setRangeValue2(prev => {
        const newRange = { ...prev, [type]: value };
        if (newRange.to && newRange.from && parseInt(newRange.to, 10) < parseInt(newRange.from, 10)) {
          setRangeError2('გთხოვთ შეიყვანოთ ვალიდური რიცხვები');
        } else {
          setRangeError2('');
        }
        return newRange;
      });
    }
  };

  const handleNumberChange = (e) => {
    setNumberValue(parseInt(e.target.value, 10));
  };

  const applyFilters = (dropdownIndex) => {
    if (dropdownIndex === 1 && rangeError1) {
      return; // Do not apply filters if there's an error in dropdown 1
    }
    if (dropdownIndex === 2 && rangeError2) {
      return; // Do not apply filters if there's an error in dropdown 2
    }

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

  const rangeSuggestions = {
    min: [10, 20, 30, 40, 50], // Min suggestions
    max: [60, 70, 80, 90, 100] // Max suggestions
  };

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
                          value={option}
                          onChange={handleCheckboxChange}
                          checked={selectedItems.includes(option)}
                        />
                        <span onClick={() => handleCheckboxChange({ target: { value: option } })}>{option}</span>
                      </div>
                    ))}
                    <button onClick={() => applyFilters(1)} className="apply-button">Apply Filters</button>
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
                    {rangeError1 && <div className="error-message">{rangeError1}</div>}
                    <div className="range-suggestions">
                      <div className="range-suggestions-titles">
                        <span>Min</span>
                        <span>Max</span>
                      </div>
                      <div className="range-suggestions-list">
                        <div className="range-suggestions-column">
                          {rangeSuggestions.min.map((suggestion, idx) => (
                            <button
                              key={idx}
                              className="suggestion-button"
                              onClick={() => setRangeValue1(prev => ({ ...prev, from: suggestion }))}
                            >
                              {suggestion}
                            </button>
                          ))}
                        </div>
                        <div className="range-suggestions-column">
                          {rangeSuggestions.max.map((suggestion, idx) => (
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
                    </div>
                    <button onClick={() => applyFilters(1)} className="apply-button">Apply Filters</button>
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
                    {rangeError2 && <div className="error-message">{rangeError2}</div>}
                    <div className="range-suggestions">
                    <div className="range-suggestions-titles">
                        <span>Min</span>
                        <span>Max</span>
                      </div>
                      <div className="range-suggestions-list">
                        <div className="range-suggestions-column">
                          {rangeSuggestions.min.map((suggestion, idx) => (
                            <button
                              key={idx}
                              className="suggestion-button"
                              onClick={() => setRangeValue2(prev => ({ ...prev, from: suggestion }))}
                            >
                              {suggestion}
                            </button>
                          ))}
                        </div>
                        <div className="range-suggestions-column">
                          {rangeSuggestions.max.map((suggestion, idx) => (
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
                    </div>
                    <button onClick={() => applyFilters(2)} className="apply-button">Apply Filters</button>
                  </div>
                )}

                {index === 4 && (
                  <div className="number-dropdown">
                    <input
                      type="number"
                      value={numberValue}
                      onChange={handleNumberChange}
                    />
                    <button onClick={() => applyFilters(4)} className="apply-button">Apply Filters</button>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* New bar for selected filters */}
      <div className="selected-filters-bar">
        {selectedItems.length > 0 && selectedItems.map((item, idx) => (
          <div key={idx} className="filter-tag">
            {item}
            <button onClick={() => removeFilter('checkbox', item)}><img src={CANCEL_ICON} alt="Cancel" className="cancel-icon" /></button>
          </div>
        ))}

        {(rangeValue1.from || rangeValue1.to) && !rangeError1 && (
          <div className="filter-tag">
            Range1: {rangeValue1.from || 'From'} - {rangeValue1.to || 'To'}
            <button onClick={() => removeFilter('range1')}><img src={CANCEL_ICON} alt="Cancel" className="cancel-icon" /></button>
          </div>
        )}

        {(rangeValue2.from || rangeValue2.to) && !rangeError2 && (
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
        )|| "" }

        {/* Clear All button only if there's something to clear */}
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

