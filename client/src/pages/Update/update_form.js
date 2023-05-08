import { useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import petifyapi from '../../apis/petifyapi';
import { useNavigate } from 'react-router-dom';
import "./update.css"

const UpdateDataForm = () =>  {
  const{id = " "} = useParams();
  let navigate = useNavigate();

  const category_options = [
    {
      label: 'Select', 
      value: ''
    },
    {
    label: 'Dog', 
    value: 'Dog'
  },
  {
    label: 'Cat', 
    value: 'Cat'
  },
  {
    label: 'Others', 
    value: 'Others'
  }
];
const [category, setCategory] = useState(category_options[0].value);

  const [image, setImage] = useState(null);
  const [breed, setBreed] = useState(" ");
  const [age, setAge] = useState(" ");
  const vaccinated_options = [
    {
      label: 'Select', 
      value: ''
    },
    {
    label: 'Yes', 
    value: 'Yes'
  },
  {
    label: 'No', 
    value: 'No'
  }
];
const [vaccinated, setVaccinated] = useState(vaccinated_options[0].value);

const[location, setLocation] = useState(' ');

const status_options = [
  {
    label: 'Select', 
    value: ''
  },
  {
  label: 'Available', 
  value: 'Available'
},
{
  label: 'Booked', 
  value: 'Booked'
},
];
const [status, setStatus] = useState(status_options[0].value);

  const [price, setPrice] = useState(" ");
  const [name, setName] = useState(" ");
  const [number, setNumber] = useState(" ");

  useEffect(() => {
    const fetchData = async () => {
      const response = await petifyapi.get(`/${id}`)
      // console.log(response.data.data.pet)
      setCategory(response.data.data.pet.category);
      setImage(response.data.data.pet.image);
      setBreed(response.data.data.pet.breed);
      setAge(response.data.data.pet.age);
      setVaccinated(response.data.data.pet.vaccinated);
      setLocation(response.data.data.pet.location);
      setStatus(response.data.data.pet.status);
      setPrice(response.data.data.pet.price);
      setName(response.data.data.pet.name);
      setNumber(response.data.data.pet.number);
    };
    fetchData() 
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('category', category);
    formData.append('image', image);
    formData.append('breed', breed);
    formData.append('age', age);
    formData.append('vaccinated', vaccinated);
    formData.append('location', location);
    formData.append('status', status);
    formData.append('price', price);
    formData.append('name', name);
    formData.append('number', number);
    const updatedPet = await fetch(`http://localhost:8000/data/${id}`, {
      method:"PUT",
      body: formData
    });
    console.log(updatedPet)
    navigate('/homepage')
  };

  const handleCategory = (e) => {
    setCategory(e.target.value);
  };

  const handleVaccinated = (e) => {
    setVaccinated(e.target.value);
  };

  const handleStatus = (e) => {
    setStatus(e.target.value);
  };

  const handleImage = (e) => {
    setImage(e.target.files[0])
  };


    return (
<section className='form_container'>
<div className="wrapper">
  <form action="">
    <div className="title">
      Update Details
    </div>
    <div className="form">
      <div className="inputfield">
        <label>Category</label>
        <div className="custom_select">
          <select value={category} onChange={handleCategory} id="category">
          {category_options.map((category_options) => (
              <option key={category_options.value} value={category_options.value}>{category_options.label}</option>
              ))}
          </select>
        </div>
     </div> 
       <div className="inputfield">
          <label>Image</label>
          <input type="file" className="input" name='image' id='image' onChange={handleImage}/>
       </div>  
        <div className="inputfield">
          <label>Breed</label>
          <input type="text" className="input" value={breed} id="breed" onChange={e => setBreed(e.target.value)}/>
       </div>  
       <div className="inputfield">
          <label>Age</label>
          <input type="text" className="input" value={age} id="age" onChange={e => setAge(e.target.value)}/>
       </div> 
       <div className="inputfield">
        <label>Vaccinated</label>
        <div className="custom_select">
          <select value={vaccinated} onChange={handleVaccinated} id="vaccinated">
            {vaccinated_options.map((vaccinated_options) => (
              <option key={vaccinated_options.value} value={vaccinated_options.value}>{vaccinated_options.label}</option>
              ))}
          </select>
        </div>
     </div>
     <div className="inputfield">
          <label>Location</label>
          <input type="text" className="input" value={location} id="breed" onChange={e => setLocation(e.target.value)}/>
       </div> 
     <div className="inputfield">
      <label>Status</label>
      <div className="custom_select">
        <select value={status} onChange={handleStatus} id="status">
          {status_options.map((status_options) => (
              <option key={status_options.value} value={status_options.value}>{status_options.label}</option>
              ))}
        </select>
      </div>
   </div>
   <div className="inputfield">
    <label>Price</label>
    <input type="text" className="input" value={price} id="price" onChange={e => setPrice(e.target.value)}/>
 </div> 

   <div className="inputfield">
    <b>For Seller's Details</b>
   </div>
        <div className="inputfield">
          <label>Name</label>
          <input type="text" className="input" id="name" value={name} onChange={e => setName(e.target.value)}/>
       </div> 
      <div className="inputfield">
          <label>Phone Number</label>
          <input type="text" className="input" id="number" value={number} onChange={e => setNumber(e.target.value)}/>
       </div> 
      <div className="inputfield">
        <button 
        type="submit"
        className="btn" 
        onClick={handleSubmit}>Update</button>
      </div>
    </div>
    </form>
</div>
</section>
    );
  }
  export default UpdateDataForm;