import { useState,  } from "react";
import { useEffect } from "react";
import axios from "axios"
import Formtable from './Table.js';

function Form(){
  
 const [formData, setFormData] = useState({firstname: "", lastname: "",Email: "",phone: ""});
 const [items, setItems] = useState([]); 
 const [errors, setErrors] = useState({});

 const initialFormData = {
  firstname: "",
 lastname: "",Email: "",phone: ""};
  

const handleChange = (event) => {
    const { name, value } = event.target;
   setFormData((prevFormData) =>  ({ ...prevFormData, [name]: value }));

   const formErrors = validateForm({ ...formData, [name]: value });
   setErrors(formErrors);
  
   
  };

  const validateForm = (formDataToValidate) => {
    const newErrors = {};

    // Validate first name
    if (!formData.firstname) {
      newErrors.firstname = "First Name is required";
    }

    // Validate last name
    if (!formData.lastname) {
      newErrors.lastname = "Last Name is required";
    }

    // Validate email
    if (!formData.Email) {
      newErrors.Email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.Email)) {
      newErrors.Email = "Email address is invalid";
    }

    // Validate phone number (optional, assuming phone should have a length of 10)

    return newErrors;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm(formData);
    // If there are errors, set the errors state and do not proceed
     if (Object.keys(formErrors).length > 0) {
     setErrors(formErrors);
     window.alert("Please fill in the details!");
      return;
    }

    const response = await fetch('http://localhost:3001/api/items', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
      'Content-Type': 'application/json'
      }
    });
    const result = await response.json();
    axios.get("http://localhost:3001/api/items")
    .then((response) => {
    setItems(response.data);
    setFormData(initialFormData);
    })

    .catch(error => {
      console.error('Error fetching items:', error);
  })
}

return(
<div>
             
<form onSubmit={handleSubmit}>
          
              <label for="firstname">First Name</label>
              <input type="text" id="firstname" name="firstname" value={formData.firstname} onChange={handleChange}/>
              {errors.firstname && <p className="error-message">{errors.firstname}</p>}
          
              <label for="lastname">Last Name</label>
              <input type="text" id="lastname" name="lastname" value={formData.lastname} onChange={handleChange}/>
              {errors.lastname && <p className="error-message">{errors.lastname}</p>}

              <label for="Email">Email</label>
              <input type="Email" id="Email" name="Email" value={formData.Email} onChange={handleChange}/>
              {errors.Email && <p className="error-message">{errors.Email}</p>}
              
          
              <label for="phone">phone</label>
              <input type="phone" id="phone" name="phone" value={formData.phone} onChange={handleChange}/>
              {errors.phone && <p className="error-message">{errors.phone}</p>}
            
              <button type="submit"  id="submit-btn" class ="mybutton">Add</button>
             
            </form>
            
<Formtable data={items} />
</div>
);

}

export default Form;    
