import React, { createContext, useState, useEffect } from "react";
import { fetchProducts } from '../services/api';

export const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [checkedCities, setCheckedCities] = useState({});
  const [priceRange, setPriceRange] = useState({ from: '', to: '' });
  const [areaRange, setAreaRange] = useState({ from: '', to: '' });
  const [badroomsNumberValue, setBadroomsNumberValue] = useState('');
  const [priceRangeError, setPriceRangeError] = useState('');
  const [areaRangeError, setAreaRangeError] = useState('');
  const [products, setProducts] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [error, setError] = useState(null);

  const fetchProductsData = async () => {
    try {
      const data = await fetchProducts();
      setProducts(data);
      setFilteredData(data); // Initially, show all products
    } catch (err) {
      setError(`Error fetching products: ${err.message}`);
    }
  };

  useEffect(() => {
    fetchProductsData();
  }, []);

  const clearAllFilters = () => {
    // Clear filters from local storage
    localStorage.removeItem("filters");
  
    // Clear state
    setCheckedCities({});
    setPriceRange({});
    setAreaRange({});
    setBadroomsNumberValue('');
  
    // Update context state
    setCheckedCities({});
    setPriceRange({});
    setAreaRange({});
    setBadroomsNumberValue('');
  };
  
  
  

  const removeFilter = (filterType, filterValue) => {
    switch (filterType) {
      case 'price':
        setPriceRange({ from: '', to: '' });
        break;
      case 'area':
        setAreaRange({ from: '', to: '' });
        break;
      case 'bedrooms':
        setBadroomsNumberValue('');
        break;
      case 'region':
        setCheckedCities((prev) => {
          const newCheckedCities = { ...prev };
          delete newCheckedCities[filterValue]; // Remove the region
          return newCheckedCities;
        });
        break;
      default:
        break;
    }
    // Debugging: Check the state before applying filters
    console.log('State after removing filter:', {
      checkedCities,
      priceRange,
      areaRange,
      badroomsNumberValue,
    });
    applyFilters(); // Reapply filters after removing one
  };

  const applyFilters = () => {
    // Get the existing filters from localStorage
    const savedFilters = JSON.parse(localStorage.getItem('filters')) || {};
  
    // Create new filters based on current state
    const newFilters = {
      cities: checkedCities,
      priceRange,
      areaRange,
      badrooms: badroomsNumberValue,
    };
  
    // Merge the new filters with the existing ones
    const updatedFilters = { 
      ...savedFilters, 
      ...newFilters 
    };
  
    // Update localStorage with merged filters
    localStorage.setItem('filters', JSON.stringify(updatedFilters));
  
    // Optionally update the state
    setCheckedCities(updatedFilters.cities);
    setPriceRange(updatedFilters.priceRange);
    setAreaRange(updatedFilters.areaRange);
    setBadroomsNumberValue(updatedFilters.badrooms);
  };
  
  
  

  return (
    <ProjectContext.Provider
      value={{
        openDropdown,
        setOpenDropdown,
        checkedCities,
        setCheckedCities,
        priceRange,
        setPriceRange,
        areaRange,
        setAreaRange,
        badroomsNumberValue,
        setBadroomsNumberValue,
        priceRangeError,
        setPriceRangeError,
        areaRangeError,
        setAreaRangeError,
        applyFilters,
        removeFilter,
        clearAllFilters,
        filteredData,
        setFilteredData,
        error,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};
