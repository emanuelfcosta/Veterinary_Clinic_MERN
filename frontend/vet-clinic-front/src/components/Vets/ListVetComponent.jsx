import React, { useEffect, useState } from "react";
import { deleteVet, getAllVets } from "../../services/VetService";
import { useNavigate } from "react-router-dom";

const ListVetComponent = () => {
  const [vets, setVets] = useState([]);

  const navigator = useNavigate();

  useEffect(() => {
    listOfVets();
  }, []);

  function listOfVets() {
    getAllVets()
      .then((response) => {
        // console.log(response.data);
        setVets(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function addNewVet() {
    navigator("/add-vet");
  }

  function updateVet(id) {
    navigator(`/edit-vet/${id}`);
  }

  function removeVet(id) {
    deleteVet(id)
      .then((response) => {
        console.log(response.data);
        listOfVets();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div className="container">
      <br />
      <h2 className="text-center">List of Clients</h2>
      <button className="btn btn-success" onClick={addNewVet}>
        Add Vet
      </button>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Id</th>
            <th>Email</th>
            <th>CellPhone</th>
            <th>Address</th>
            <th>State</th>
            <th>Actions</th>
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
              <td>
                <button
                  onClick={() => updateVet(vet._id)}
                  className="btn btn-info"
                >
                  Update
                </button>
                <button
                  onClick={() => removeVet(vet._id)}
                  className="btn btn-danger"
                  style={{ marginLeft: "10px" }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListVetComponent;
