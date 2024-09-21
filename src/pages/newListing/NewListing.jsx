import React, { useState, useRef } from 'react';
import InputComponent from '../../components/inputComponent/InputComponent';
import '../newListing/style.css';
import uploadIcon from '../../../public/photos/plus-circle.png'; // Adjust the path as needed
import { uploadListing } from '../../services/api.js'; // Import the API function

function NewListing() {
    // State for radio buttons
    const [isForRent, setIsForRent] = useState(0); // Initialize with 0 or 1

    // State for input fields
    const [address, setAddress] = useState('');
    const [postalIndex, setPostalIndex] = useState('');
    const [region, setRegion] = useState('');
    const [city, setCity] = useState('');
    const [price, setPrice] = useState('');
    const [area, setArea] = useState('');
    const [bedroomsNumber, setBedroomsNumber] = useState('');
    const [description, setDescription] = useState('');
    const [photo, setPhoto] = useState(null);
    const [agentID, setAgentID] = useState(1); // Default agent ID; change as needed

    // Reference for the hidden file input
    const fileInputRef = useRef(null);

    // Handler for property type radio buttons
    const handlePropertyTypeChange = (e) => {
        setIsForRent(Number(e.target.value));
    };

    // Handler for input changes
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        switch (id) {
            case 'address':
                setAddress(value);
                break;
            case 'postal-index':
                setPostalIndex(value);
                break;
            case 'region':
                setRegion(value);
                break;
            case 'city':
                setCity(value);
                break;
            case 'price':
                setPrice(value);
                break;
            case 'area':
                setArea(value);
                break;
            case 'bedrooms-amount':
                setBedroomsNumber(value);
                break;
            case 'description':
                setDescription(value);
                break;
            default:
                break;
        }
    };

    // Handler for file input change
    const handlePhotoChange = (e) => {
        setPhoto(e.target.files[0]);
    };

    // Trigger file input when the image is clicked
    const handleImageClick = () => {
        fileInputRef.current.click();
    };

    // Cancel button handler
    const cancel = () => {
        setIsForRent(0); // Reset to default value
        setAddress('');
        setPostalIndex('');
        setRegion('');
        setCity('');
        setPrice('');
        setArea('');
        setBedroomsNumber('');
        setDescription('');
        setPhoto(null);
        setAgentID(1); // Reset agent ID to default

        // Optionally, reset the file input value
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    // Submit button handler
    const submit = async () => {
        // Validate required fields
        if (!isForRent || !address || !postalIndex || !region || !city || !price || !area || !bedroomsNumber || !description || !photo || !agentID) {
            alert('Please fill out all required fields and upload a photo.');
            return;
        }

        // Prepare form data for submission
        const formData = new FormData();
        formData.append('is_rental', isForRent);
        formData.append('address', address);
        formData.append('zip_code', postalIndex);
        formData.append('region_id', region);
        formData.append('city_id', city);
        formData.append('price', price);
        formData.append('area', area);
        formData.append('bedrooms', bedroomsNumber);
        formData.append('description', description);
        formData.append('image', photo);
        formData.append('agent_id', agentID);

        // Submit form data to the server
        try {
            await uploadListing(formData);
            alert('Listing added successfully!');
            cancel(); // Clear form
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Failed to add listing. Please try again.');
        }
    };

    return (
        <div className="component-wrapper">
            <div className='newlisting-form'>
                <h1 className='size-28 w-80'>ლისტინგის დამატება</h1>
                
                {/* Deal Type Section */}
                <div className="container">
                    <h1>გარიგების ტიპი</h1>
                    <div className="deal-type">
                        <label>
                            <input
                                type="radio"
                                name="isForRent"
                                value="0"
                                checked={isForRent === 0}
                                onChange={handlePropertyTypeChange}
                            />
                            იყიდება
                        </label>

                        <br />
                        <label>
                            <input
                                type="radio"
                                name="isForRent"
                                value="1"
                                checked={isForRent === 1}
                                onChange={handlePropertyTypeChange}
                            />
                            ქირავდება
                        </label>
                    </div>
                </div>

                {/* Location Section */}
                <div className="container">
                    <h1>მდებარეობა</h1>
                    <div className="location">
                        <div className="location1">
                            <InputComponent
                                className='input'
                                label="მისამართი*"
                                id='address'
                                htmlFor='address'
                                type='text'
                                value={address}
                                onChange={handleInputChange}
                                required
                            />
                            <InputComponent
                                className='input'
                                label="საფოსტო ინდექსი*"
                                id='postal-index'
                                htmlFor='postal-index'
                                type='number'
                                value={postalIndex}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="location2">
                            <InputComponent
                                className='input'
                                label="რეგიონი*"
                                id='region'
                                htmlFor='region'
                                type='text'
                                value={region}
                                onChange={handleInputChange}
                                required
                            />
                            <InputComponent
                                className='input'
                                label="ქალაქი*"
                                id='city'
                                htmlFor='city'
                                type='text'
                                value={city}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>
                </div>

                {/* Flat Details Section */}
                <div className="container">
                    <h1 className="size-28 top-16 bottom-12">ბინის დეტალები</h1>

                    <div className="flat-details container">
                        <div className="details1">
                            <InputComponent
                                className="input"
                                label="ფასი*"
                                id="price"
                                htmlFor="price"
                                type="text"
                                value={price}
                                onChange={handleInputChange}
                                required
                            />
                            <InputComponent
                                className="input"
                                label="ფართობი*"
                                id="area"
                                htmlFor="area"
                                type="text"
                                value={area}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="details2">
                            <InputComponent
                                className="input"
                                label="საძინებლების რაოდენობა*"
                                id="bedrooms-amount"
                                htmlFor="bedrooms-amount"
                                type="text"
                                value={bedroomsNumber}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>
                </div>

                {/* Description Section */}
                <div className="description container">
                    <InputComponent
                        className='input'
                        label="აღწერა*"
                        id='description'
                        htmlFor='description'
                        type='text-area'
                        value={description}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                {/* Photo Upload Section */}
                <div className="upload-photos container">
                    <h1>ატვირთეთ ფოტო</h1>
                    <div className="upload-photos1">
                        {/* Hidden file input */}
                        <input
                            type="file"
                            id="photo"
                            accept="image/*"
                            onChange={handlePhotoChange}
                            style={{ display: 'none' }} // Hide the file input
                            ref={fileInputRef}
                            required
                        />
                        
                        {/* Image acting as upload button */}
                        <img
                            src={uploadIcon} // Path to your upload icon
                            alt="Upload"
                            onClick={handleImageClick}
                            className="upload-image"
                        />
                        
                        {/* Display uploaded photo name */}
                        {photo && <p>Uploaded file: {photo.name}</p>}
                    </div>
                </div>

                                {/* Agent Section */}
                                <div className="agent">
                    <h1>აგენტი</h1>
                    <p>აირჩიე</p>
                    <div className="dropdown dropdown-bottom">
                        <div tabIndex={0} role="button" className="btn m-1">Click</div>
                        <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                            {/* Sample agents; replace with real data */}
                            <li><a onClick={() => setAgentID(1)}>Agent 1</a></li>
                            <li><a onClick={() => setAgentID(2)}>Agent 2</a></li>
                            <li><a onClick={() => setAgentID(3)}>Agent 3</a></li>
                        </ul>
                    </div>
                    <p>Selected Agent ID: {agentID}</p> {/* Display selected agent ID */}
                </div>

                {/* Action Buttons */}
                <div className='addButtons flex'>
                    <div className="flex-1">
                        <a onClick={cancel} className="btn bg-white text-orange">გაუქმება</a>
                    </div>
                    <div className="flex-1">
                        <a onClick={submit} className="btn bg-orange text-white">დაამატე ლისტინგი</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NewListing;

