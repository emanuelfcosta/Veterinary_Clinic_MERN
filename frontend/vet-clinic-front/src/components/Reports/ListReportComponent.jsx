import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ListReportComponent = () => {
  const [selectedReport, setSelectedReport] = useState("");
  const navigate = useNavigate();

  const handleRadioChange = (event) => {
    setSelectedReport(event.target.value);
  };

  const handleExibirClick = () => {
    if (selectedReport) {
      navigate(selectedReport);
    } else {
      alert("Please select a report type.");
    }
  };

  return (
    <div className="container">
      <h4 className="text-primary">Select a Report:</h4>

      <div>
        <label>
          <input
            type="radio"
            name="report"
            value="/reports/clientsreport"
            onChange={handleRadioChange}
          />
          Clients
        </label>

        <br />

        <label>
          <input
            type="radio"
            name="report"
            value="/reports/petsreport"
            onChange={handleRadioChange}
          />
          Pets
        </label>
        <br />

        <label>
          <input
            type="radio"
            name="report"
            value="/reports/vetsreport"
            onChange={handleRadioChange}
          />
          Vets
        </label>
        <br />

        <label>
          <input
            type="radio"
            name="report"
            value="/reports/proceduresreport"
            onChange={handleRadioChange}
          />
          Procedures
        </label>
        <br />

        <label>
          <input
            type="radio"
            name="report"
            value="/reports/consultationsreport"
            onChange={handleRadioChange}
          />
          Consultations
        </label>
      </div>

      <div className="mt-3">
        <button
          className="btn btn-primary"
          onClick={handleExibirClick}
          disabled={!selectedReport}
        >
          Exibir
        </button>
      </div>
    </div>
  );
};

export default ListReportComponent;
