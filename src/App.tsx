import React from "react";
import './App.css'
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
const url = "https://randomuser.me/api";
var allPersons : {first: string ,email:string}[]=[]
interface Provider {
  first: string;
  email: string;
}
// const [wearablesList, setWearablesList] = useState<Provider[]>([]);
const App = () => {
  const [persons, setPersons] = useState<Provider[]>([]);
  
  const [loading, setLoading] = useState(true);
  async function fetchData() {
    const response = await axios.get(url);
    const data = response.data.results[0];
    // console.log(data.name.first, data.name.last, data.email);
    const newPerson = {
      first:data.name.title+'. '+ data.name.first+' '+data.name.last,
      // last: ,
      email:data.email
    };
    // console.log(newPerson);
    allPersons.push(newPerson);
    // console.log(allPersons);
    localStorage.setItem("persons", JSON.stringify(allPersons));
    const storedData = (localStorage.getItem("persons"));
    // console.log(storedData);
  var items=[...allPersons];
  // console.log(items)
  setPersons(items)
    // console.log(persons);
    setLoading(false);
  }
  useEffect(() => {
    fetchData();
  }, []);
  console.log(persons)
  if (loading) {
    return <div>loading...</div>;
  } else {
    return (
      <>
      <table className="customers">
        <thead>
          <tr>
            <th>FULL NAME</th>
            <th>EMAIL</th>
          </tr>
        </thead>
        {persons.map((person,i) => {
          return (
            <tr key={i}>
            <td>{person.first}</td>
            <td> {person.email}</td>
          </tr>
          );
        })}</table>
        <button onClick={() => fetchData()}>REFRESH</button>
      </>
    );
  }
};
export default App;