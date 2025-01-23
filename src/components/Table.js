import React, { useState, useEffect } from 'react';
import Icon from '@mdi/react';
import { mdiTextBoxEdit, mdiTrashCan } from '@mdi/js';
import { Button } from 'antd';
import axios from 'axios';





const Formtable = ({data,updateData}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  // const[closeModal , setcloseModal ] = useState(false)
  const [Data, setData ] = useState(data);

 
   
  useEffect(() => {
     {
      setData(data);
      // If modalData is valid, initialize formData
    }
  }, [data]);
  const closeModal = () => {
  setIsModalOpen(false);

 }

  const openModal = (data) => {
    setModalData(data);
    setIsModalOpen(true);
  };
  

  // const closeModal = () => {
  //   setIsModalOpen(false);
  //   setModalData(null);
  // };

  const handleChange = (event, setFormData, formData) => {
  const { name, value } = event.target;
  setFormData((prevState) => ({
    ...prevState,
    [name]: value,
  }));
};

  const handleDelete = (data) => {
    console.log("i am")
  fetch(`http://localhost:3001/api/items/${data.id}`, {
    method: "DELETE",
  }) 

  
  setIsModalOpen(false);
  fetchdata();
  };

  const fetchdata = async() => {
    console.log("i am here")
    axios.get('http://localhost:3001/api/items')
  .then((response) => {
    // Log the fetched data
    // setData(response.data);
    data = response.data
    setData(data)
   // Log the fetched data
    
     // Store the fetched data in the state
  })
  .catch((error) => {
    console.error('Error fetching items:', error);
  });
  }


const handleSave = async (formData) => {
  try {
    // Update the data on the server
    await fetch(`http://localhost:3001/api/items/${formData.id}`, {
      method: 'PUT',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
       
    }
  );

  
  setIsModalOpen(false);
   fetchdata();

   } catch (error) {
    console.error("Error updating item:", error);
  }
};




const Modal = ({ isOpen,modalData, handleSave, }) => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    Email: '',
    phone: '',
    id: null, 
  });

  // Update formData whenever modalData changes (to ensure it updates for the right row)
  useEffect(() => {
    if (modalData) {
      setFormData(modalData);
      // If modalData is valid, initialize formData
    }
  }, [modalData]);

   if (!isOpen) return null;
 
  return (
    <div style={modalOverlayStyle}>
      <div style={modalStyle}>
        <h2>Edit Details</h2>
        <form>
          <label htmlFor="firstname">First Name</label>
          <input
            type="text"
            id="firstname"
            name="firstname"
            value={formData.firstname}
            onChange={(e) => handleChange(e, setFormData, formData)}
          />

          <label htmlFor="lastname">Last Name</label>
          <input
            type="text"
            id="lastname"
            name="lastname"
            value={formData.lastname}
            onChange={(e) => handleChange(e, setFormData, formData)}
          />

          <label htmlFor="email">Email</label>
          <input
            type="Email"
            id="Email"
            name="Email"
            value={formData.Email}
            onChange={(e) => handleChange(e, setFormData, formData)}
          />

          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={(e) => handleChange(e, setFormData, formData)}
          />

          <div>
            <Button onClick={() => handleSave(formData)}>Save</Button>
            <Button onClick={closeModal}>Close</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

const modalOverlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const modalStyle = {
  backgroundColor: 'white',
  padding: '20px',
  borderRadius: '5px',
  textAlign: 'center',
};



 



  return (
    <div className="App">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Data.map((val, key) => {
            return (
              <tr key={key}>
                <td>{val.id}</td>
                <td>{val.firstname}</td>
                <td>{val.lastname}</td>
                <td>{val.email}</td>
                <td>{val.phone}</td>
                <td>
                  {/* Edit Button */}
                  <Button onClick={() => openModal(val)}>
                    <Icon path={mdiTextBoxEdit} size={1} />
                  </Button>

                  {/* Delete Button */}
                  <Button onClick={() => handleDelete(val)}>
                    <Icon path={mdiTrashCan} size={1} />
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Modal
        isOpen={isModalOpen}
        modalData={modalData}
        handleSave={handleSave}
         updateData={updateData}
      />
    </div>
  );
};

export default Formtable;
