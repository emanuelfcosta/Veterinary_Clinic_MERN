import React, { useEffect, useState } from "react";
import { getAllVets } from "../../services/VetService";

const VetsReport = () => {
  const [vets, setVets] = useState([]);

  useEffect(() => {
    listOfVets();
  }, []);

  function listOfVets() {
    getAllVets()
      .then((response) => {
        setVets(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div className="container">
      <br />
      <h2 className="text-center"> List of Vets</h2>
      <br />
      <table className="table ">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>CellPhone</th>
            <th>Address</th>
            <th>State</th>
          </tr>
        </thead>
        <tbody>
          {vets.map((vet) => (
            <tr key={vet._id}>
              <td>{vet._id}</td>
              <td>{vet.name}</td>
              <td>{vet.email}</td>
              <td>{vet.cellPhone}</td>
              <td>{vet.address}</td>
              <td>{vet.state}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VetsReport;
