// import React, { useState } from 'react';

// const SearchForm = () => {
//   const [searchTerm, setSearchTerm] = useState('');

//   // Handle change in input field
//   const handleInputChange = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   // Handle form submission (optional)
//   const handleSearchSubmit = (e) => {
//     e.preventDefault(); // Prevent the form from refreshing the page
//     console.log('Search Term:', searchTerm); // You can replace this with your search logic
//   };

//   return (
//     <form className="search" style={{ maxWidth: '300px' }} onSubmit={handleSearchSubmit}>
//       <input
//         id="searchid"
//         type="text"
//         placeholder="Search Details"
//         value={searchTerm}  // Bind state to the input field
//         onChange={handleInputChange} // Handle input changes
//       />
//       <button id="search-button" type="submit">
//         <i className="fa fa-search"></i>
//         {/* You can use an image icon here if needed */}
//         {/* <img className="search-pic" src="Asserts/serachimage.png" alt="Search" /> */}
//       </button>
//     </form>
//   );
// };

// export default SearchForm;
