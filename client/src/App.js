import { useState } from 'react';
import './App.css';
import Axios from 'axios';

function App() {
  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState('');
  const [position, setPosition] = useState('');
  const [wage, setWage] = useState(0);
  const [newWage, setNewWage] = useState(0);
  const [newName, setNewName] = useState('');
  const [newCountry, setNewCountry] = useState('');
  const [newPosition, setNewPosition] = useState('');
  const [newAge, setNewAge] = useState(0);
  const [employeeList, setEmployeeList] = useState([]);
  

  const addEmployee = () => {
    Axios.post('https://basic-crud--app.herokuapp.com/create', {
      name: name, 
      age: age, 
      country: country, 
      position: position, 
      wage: wage,
    }).then(() => {
      setEmployeeList([...employeeList, {
        name: name, 
      age: age, 
      country: country, 
      position: position, 
      wage: wage,
      }])
    })
  }

  const getEmployees = () =>{
    Axios.get('https://basic-crud--app.herokuapp.com/employees').then((response) => {
      setEmployeeList(response.data);
    });
  }

  const updateEmployeeInfo = (id) => {
    Axios.put('https://basic-crud--app.herokuapp.com/update', {wage: newWage, age: newAge, position: newPosition, country: newCountry, name: newName, id: id}).then(
      (response) => {
      setEmployeeList(employeeList.map((val) => {
          return val.id == id ? {id: val.id, name: newName, age: newAge, country: newCountry, position: newPosition, wage: newWage}
          : val
      }));
    })
  }

  const displayInfo = () => {
    console.log(name + age + country + position + wage)
  }

  const deleteEmployee = (id) => {
    Axios.delete(`https://basic-crud--app.herokuapp.com/delete/${id}`).then((response) => {
      setEmployeeList(employeeList.filter((val) => {
          return val.id != id
      }))
    })
  }

  return (
    <div className="App">
      <div className='info'>
        <label>Name:</label>
          <input type="text"  onChange={(event) => {
            setName(event.target.value);
          }} />
        <label>Age:</label>
          <input type="number" onChange={(event) => {
            setAge(event.target.value);
          }} />
        <label>Country:</label>
          <input type="text" onChange={(event) => {
            setCountry(event.target.value);
          }} />
        <label>Position:</label>
          <input type="text" onChange={(event) => {
            setPosition(event.target.value);
          }} />
        <label>Wage (year):</label>
          <input type="text" onChange={(event) => {
            setWage(event.target.value);
          }} />
        <button onClick={addEmployee}>Add Employee</button>
      </div>
      <br  />
        <div className="employees">
          <button onClick={getEmployees}>Show Employees</button>

          {employeeList.map((val, key) => {
              return (
                <div className='employee'>
                <div>
                  <h3>Name: {val.name}</h3>
                  <h3>Age: {val.age}</h3>
                  <h3>Country: {val.country}</h3>
                  <h3>Position: {val.position}</h3>
                  <h3>Wage: {val.wage}</h3>
                  </div>
                  <div>
                  
                    <input 
                      type='text' 
                      placeholder='Update Name' 
                      onChange={(event) => {
                        setNewName(event.target.value);
                      }}
                      /> 
                    <input 
                      type='text' 
                      placeholder='Update Age' 
                      onChange={(event) => {
                        setNewAge(event.target.value);
                      }}
                      /> 
                    <input 
                      type='text' 
                      placeholder='Update Country' 
                      onChange={(event) => {
                        setNewCountry(event.target.value);
                      }}
                      /> 
                    <input 
                      type='text' 
                      placeholder='Update Position' 
                      onChange={(event) => {
                        setNewPosition(event.target.value);
                      }}
                      /> 
                    <input 
                      type='text' 
                      placeholder='Update Wage' 
                      onChange={(event) => {
                        setNewWage(event.target.value);
                      }}
                      /> 
                    <button onClick={() => {updateEmployeeInfo(val.id)}}>Update</button>
                    <button onClick={() => {deleteEmployee(val.id)}}>Delete</button>
                  </div>
                </div>
              );
          })}
        </div>
    </div>
  );
}

export default App;
