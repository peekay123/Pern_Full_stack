import { useContext, useState, useEffect} from 'react';
import { PetifyContext } from '../../context/context';
import { toast } from 'react-toastify';
import "./data_form.css";

function DataForm () {
  const [isActive, setIsActive] = useState(false);

  const handleIcon = () => {
    setIsActive(!isActive);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsActive(false);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScroll = () => {
    setIsActive(false);
  };


  const {addPets} = useContext(PetifyContext);
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

const[location, setLocation] = useState(" ");

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
    try{
      const response = await fetch('http://localhost:8000/data', {
        method: "Post",
        body: formData
      })
      // addPets(response.data.data.pets)
      toast.success('Pet added Successfully')
      if (response.ok) {
        console.log('Pet uploaded successfully!');
      } else {
        console.error('Failed to upload pet.');
      }

    }catch (err){
      console.log(err)
    }
    setCategory('');
    setImage('')
    setAge('');
    setBreed('');
    setVaccinated('');
    setLocation(' ');
    setStatus('');
    setName('');
    setPrice('');
    setNumber('');
  };

  const handleCategory = (e) => {
    setCategory(e.target.value);
  };

  const handleImage = (e) => {
    setImage(e.target.files[0]);
   };

  const handleVaccinated = (e) => {
    setVaccinated(e.target.value);
  };

  const handleStatus = (e) => {
    setStatus(e.target.value);
  };

    return (
      <>
        <div className="wrapper">
          <form action="">
            <div className="title">
              Upload Pets
            </div>
            <div className="form">
              <div className="inputfield">
                <label>Category</label>
                <div className="custom_select">
                  <select value={category} onChange={handleCategory}>
                  {category_options.map((category_options) => (
                      <option key={category_options.value} value={category_options.value}>{category_options.label}</option>
                      ))}
                  </select>
                </div>
            </div> 
              <div className="inputfield">
                  <label>Image</label>
                  <input type="file" name='image' className="input" onChange={handleImage} />
              </div>  
                <div className="inputfield">
                  <label>Breed</label>
                  <input type="text" className="input" value={breed} onChange={e => setBreed(e.target.value)}/>
              </div>  
              <div className="inputfield">
                  <label>Age</label>
                  <input type="text" className="input" value={age} onChange={e => setAge(e.target.value)}/>
              </div> 
              <div className="inputfield">
                <label>Vaccinated</label>
                <div className="custom_select">
                  <select value={vaccinated} onChange={handleVaccinated}>
                    {vaccinated_options.map((vaccinated_options) => (
                      <option key={vaccinated_options.value} value={vaccinated_options.value}>{vaccinated_options.label}</option>
                      ))}
                  </select>
                </div>
            </div>
            <div className="inputfield">
                  <label>Location</label>
                  <input type="text" className="input" value={location} onChange={e => setLocation(e.target.value)}/>
              </div>
            <div className="inputfield">
              <label>Status</label>
              <div className="custom_select">
                <select value={status} onChange={handleStatus}>
                  {status_options.map((status_options) => (
                      <option key={status_options.value} value={status_options.value}>{status_options.label}</option>
                      ))}
                </select>
              </div>
          </div>
          <div className="inputfield">
            <label>Price</label>
            <input type="text" className="input" value={price} onChange={e => setPrice(e.target.value)}/>
        </div> 

          <div className="inputfield">
            <b>For Seller's Details</b>
          </div>
                <div className="inputfield">
                  <label>Name</label>
                  <input type="text" className="input" value={name} onChange={e => setName(e.target.value)}/>
              </div> 
              <div className="inputfield">
                  <label>Phone Number</label>
                  <input type="text" className="input" value={number} onChange={e => setNumber(e.target.value)}/>
              </div> 
              <div className="inputfield">
                <button 
                type="submit"
                className="btn" 
                onClick={handleSubmit}>Upload</button>
              </div>
            </div>
            </form>
        </div>
</>
    );
  }
  export default DataForm;