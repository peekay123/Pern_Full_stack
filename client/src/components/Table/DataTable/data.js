import { useContext, useEffect, useState } from "react";
import petifyapi from "../../../apis/petifyapi";
import { PetifyContext } from "../../../context/context";
import {useNavigate} from 'react-router-dom';
import { toast } from 'react-toastify';
import "./DataTable.css";


const DataDetails = () => {
  const {pets, setPets} = useContext(PetifyContext);
  let navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try{
        const response = await fetch('http://localhost:8000/data', {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
          });
          const data = await response.json()
        setPets(data.data.pets)
 
      }catch(err) {
        console.log(err)
      }
    }
    fetchData();   
  },[]);

  const handleDelete = async(id) => {
    try{
      const response = await petifyapi.delete(`/${id}`)
      setPets(pets.filter(pet => {
        return pet.id !== id
      }));
      toast.success('Data Delete Successfully')
    }catch(err){
      console.error(err)
    }
  };

  const handleUpdate = (id) => {
    navigate(`/updatedataform/${id}`)
  };
 
    return (
  <>
    
    <table className="table">
        <thead>
            <tr>
                <th scope="col">Category</th>
                <th scope="col">Image</th>
                <th scope="col">Breed</th>
                <th scope="col">Age</th>
                <th scope="col">Vaccinated</th>
                <th scope="col">Location</th>
                <th scope="col">Status</th>
                <th scope="col">Price</th>
                <th scope="col">Name</th>
                <th scope="col">Number</th>
                <th scope="col">Edit</th>
                <th scope="col">Delete</th>
            </tr>
        </thead>
        <tbody>
          {pets && pets.map((pet) => {
            return (
              <tr key={pet.id}>
              <td data-label='Category'>{pet.category}</td>
              <td data-label='Image'><img src={`http://localhost:8000/images/${pet.image}`} alt="Pet" /></td>
              <td data-label='Breed'>{pet.breed}</td>
              <td data-label='Age'>{pet.age}</td>
              <td data-label='Vaccinated'>{pet.vaccinated}</td>
              <td data-label='Location'>{pet.location}</td>
              <td data-label='Status'>{pet.status}</td>
              <td data-label='Price'>{pet.price}</td>
              <td data-label='Name'>{pet.name}</td>
              <td data-label='number'>{pet.number}</td>
              <td data-label='Edit'><button className="edit_btn" onClick={() =>handleUpdate(pet.id)}>Edit</button></td>
              <td data-label='Delete'><button className="delete_btn" onClick={() => handleDelete(pet.id)}>Delete</button></td>
            </tr>
            )
            
          })}
            {/* <tr>
                <td>1</td>
                <td>Dog</td>
                <td><img src="./img/Dog.jpg" alt="Dog"/></td>
                <td>Huskey</td>
                <td>3 Years old</td>
                <td>Yes</td>
                <td>Available</td>
                <td>1999.00</td>
                <td>Sangay</td>
                <td>170000000</td>
                <td>
                  <button style={{backgroundColor: 'green'}}>Edit</button>
                </td>
                <td>
                  <button style={{backgroundColor: 'red'}}>Delete</button>
                </td>     
            </tr>
            <tr>
              <td>2</td>
              <td>Cat</td>
              <td><img src="./img/Cat.jpg" alt="Cat"/></td>
              <td>Giant Cat</td>
              <td>2 Years old</td>
              <td>Yes</td>
              <td>Booked</td>
              <td>1999.00</td>
              <td>Pema</td>
              <td>170000000</td>
              <td>
                  <button style={{backgroundColor: 'green'}}>Edit</button>
                </td>
                <td>
                  <button style={{backgroundColor: 'red'}}>Delete</button>
                </td>     
          </tr> */}
        </tbody>
    </table>
</>
    );
  }
  export default DataDetails;