import React, { useEffect, useState } from "react";
import { getAllProcedures } from "../../services/ProcedureService";

const ProceduresReport = () => {
  const [procedures, setProcedures] = useState([]);

  useEffect(() => {
    listOfProcedures();
  }, []);

  function listOfProcedures() {
    getAllProcedures()
      .then((response) => {
        // console.log(response.data);
        setProcedures(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div className="container">
      <br />
      <h2 className="text-center">List of Procedures</h2>

      <table className="table">
        <thead>
          <tr>
            <th style={{ width: "250px" }}>Id</th>
            <th>name</th>
            <th>price</th>
          </tr>
        </thead>
        <tbody>
          {procedures.map((procedure) => (
            <tr key={procedure._id}>
              <td>{procedure._id}</td>
              <td>{procedure.name}</td>
              <td>{procedure.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProceduresReport;
