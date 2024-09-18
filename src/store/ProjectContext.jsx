import React, { createContext, useState, useEffect } from "react";
import { fetchProducts } from '../services/api';
// import daisyui from "daisyui";

export const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [checkedCities, setCheckedCities] = useState([]);
  const [priceRange, setPriceRange] = useState({ from: '', to: '' });
  const [areaRange, setAreaRange] = useState({ from: '', to: '' });
  const[badroomsNumberValue,setBadroomsNumberValue] = useState('');
  const [rangeError, setRangeError] = useState('');
  const [products, setProducts] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [error, setError] = useState(null);
  const [priceRangeError ,setPriceRangeError] = useState('');
  const [areaRangeError,setAreaRangeError]= useState('');

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
    setSelectedItems([]);
    setRangeValue1({ from: '', to: '' });
    setRangeValue2({ from: '', to: '' });
    setNumberValue('');
    rangeError('');
    setRangeError('');
    setFilteredData(products); // Reset to all products
  };

  const removeFilter = (filterType) => {
    switch (filterType) {
      case 'range1':
        setRangeValue1({ from: '', to: '' });
        break;
      case 'range2':
        setRangeValue2({ from: '', to: '' });
        break;
      case 'number':
        setNumberValue(null);
        break;
      default:
        break;
    }
    applyFilters(); // Reapply filters after removing one
  };

  const applyFilters = () => {
    let newFilteredProducts = [...products]; // Start with all products

    if (priceRange.from && priceRange.to) {
      if (parseInt(rangeValue1.from, 10) > parseInt(rangeValue1.to, 10)) {
        setRangeError('Invalid range');
      } else {
        setRangeError('');
        newFilteredProducts = newFilteredProducts.filter(product =>
          product.rangeValue >= rangeValue1.from && product.rangeValue <= rangeValue1.to
        );
      }
    }

    if (areaRange.from && areaRange.to) {
      if (parseInt(rangeValue2.from, 10) > parseInt(rangeValue2.to, 10)) {
        setRangeError('Invalid range');
      } else {
        setRangeError('');
        newFilteredProducts = newFilteredProducts.filter(product =>
          product.rangeValue >= rangeValue2.from && product.rangeValue <= rangeValue2.to
        );
      }
    }

    if (numberValue !== null) {
      newFilteredProducts = newFilteredProducts.filter(product =>
        product.numberValue === numberValue
      );
    }

    setFilteredData(newFilteredProducts);
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
        // activeButton,
        // setActiveButton,
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
