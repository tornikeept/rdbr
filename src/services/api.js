const API_BASE_URL = 'https://api.real-estate-manager.redberryinternship.ge/api';
const token = '9d0468c7-4ad9-4a20-9fdb-f1c582334721';

// Fetch products with Bearer token
export const fetchProducts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/real-estates`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const responseBody = await response.text(); // Get the raw response text
      throw new Error(`HTTP error! status: ${response.status}. Response: ${responseBody}`);
    }

    const data = await response.json();
    console.log('Fetched data:', data); // Log the data
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error; // Rethrow the error for further handling
  }
};


export const uploadListing = async (formData) => {
  const response = await fetch('http://localhost:3001/listings', {
      method: 'POST',
      body: formData
  });

  if (!response.ok) {
      throw new Error('Failed to upload listing');
  }

  return await response.json();
};


// Upload listing with Bearer token
// export const uploadListing = async (formData) => {
//   try {
//     const response = await fetch(`${API_BASE_URL}/real-estates`, { // Ensure this URL is correct
//       method: 'POST',
//       headers: {
//         'Authorization': `Bearer ${token}`,
//         // Content-Type is not needed for FormData
//       },
//       body: formData,
//     });

//     if (!response.ok) {
//       const responseBody = await response.text(); // Get the raw response text
//       throw new Error(`Failed to upload listing. HTTP status: ${response.status}. Response: ${responseBody}`);
//     }

//     return await response.json();
//   } catch (error) {
//     console.error('Error submitting form:', error);
//     throw error;
//   }
// };
