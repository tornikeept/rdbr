// api.js

const API_BASE_URL = 'https://api.real-estate-manager.redberryinternship.ge/api';
const token = '9d0468c7-4ad9-4a20-9fdb-f1c582334721';

const fetchProducts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/real-estates`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Fetched data:', data); // Log the data
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error; // Rethrow the error for further handling
  }
};

// Export the function to be used in other parts of the application
export { fetchProducts };
