import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createPet, getPetById, updatePet } from "../../services/PetService";
import { getAllClients } from "../../services/ClientService";

const PetComponent = () => {
  const [name, setName] = useState("");
  const [specie, setSpecie] = useState("");
  const [breed, setBreed] = useState("");
  const [color, setColor] = useState("");
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [gender, setGender] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [father, setFather] = useState("");
  const [mother, setMother] = useState("");
  const [observations, setObservations] = useState("");

  // for clients

  const [client, setClient] = useState("");
  const [clients, setClients] = useState([]);

  useEffect(() => {
    getAllClients()
      .then((response) => {
        console.log(response.data);

        setClients(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getPetById(id)
        .then((response) => {
          console.log(response.data);
          setName(response.data.name);
          setSpecie(response.data.specie);
          setBreed(response.data.breed);
          setColor(response.data.color);
          setHeight(response.data.height);
          setWeight(response.data.weight);
          setGender(response.data.gender);

          setBirthDate(response.data.birthDate.split("T")[0]);

          setFather(response.data.father);
          setMother(response.data.mother);
          setObservations(response.data.observations);

          setClient(response.data.client._id);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [id]);

  const navigator = useNavigate();

  const [errors, setErrors] = useState({
    client: "",
    name: "",
    specie: "",
    breed: "",
    color: "",
    height: "",
    weight: "",
    gender: "",
    birthDate: "",
    father: "",
    mother: "",
    observations: "",
  });

  function pageTitle() {
    if (id) {
      return <h2 className="text-center">Update Pet</h2>;
    } else {
      return <h2 className="text-center">Add Pet</h2>;
    }
  }

  function saveOrUpdatePet(e) {
    e.preventDefault();

    if (validateForm()) {
      const pet = {
        client,
        name,
        specie,
        breed,
        color,
        height,
        weight,
        gender,
        birthDate,
        father,
        mother,
        observations,
      };

      // console.log(pet);

      if (id) {
        updatePet(id, pet)
          .then((response) => {
            console.log(response.data);
            navigator("/pets");
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        createPet(pet)
          .then((response) => {
            console.log(response.data);
            navigator("/pets");
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } //validate form
  }

  function validateForm() {
    let valid = true;

    const errorsCopy = { ...errors };

    if (client) {
      errorsCopy.client = "";
    } else {
      errorsCopy.client = "Select Client";
      valid = false;
    }

    if (name.trim()) {
      errorsCopy.name = "";
    } else {
      errorsCopy.name = "Name is required";
      valid = false;
    }

    if (specie.trim()) {
      errorsCopy.specie = "";
    } else {
      errorsCopy.specie = "Space is required";
      valid = false;
    }

    if (breed.trim()) {
      errorsCopy.breed = "";
    } else {
      errorsCopy.breed = "Breed is required";
      valid = false;
    }

    if (color.trim()) {
      errorsCopy.color = "";
    } else {
      errorsCopy.color = "Color is required";
      valid = false;
    }

    if (height && !isNaN(height) && height > 0) {
      errorsCopy.height = "";
    } else {
      errorsCopy.height = "Height is required and must be a positive number";
      valid = false;
    }

    if (weight && !isNaN(weight) && weight > 0) {
      errorsCopy.weight = "";
    } else {
      errorsCopy.weight = "Weight is required and must be a positive number";
      valid = false;
    }

    if (gender.trim()) {
      errorsCopy.gender = "";
    } else {
      errorsCopy.gender = "Gender is required";
      valid = false;
    }

    if (birthDate.trim()) {
      errorsCopy.birthDate = "";
    } else {
      errorsCopy.birthDate = "BirthDate is required";
      valid = false;
    }

    if (father.trim()) {
      errorsCopy.father = "";
    } else {
      errorsCopy.father = "Father is required";
      valid = false;
    }

    if (mother.trim()) {
      errorsCopy.mother = "";
    } else {
      errorsCopy.mother = "Mother is required";
      valid = false;
    }

    if (observations.trim()) {
      errorsCopy.observations = "";
    } else {
      errorsCopy.observations = "Observations is required";
      valid = false;
    }

    setErrors(errorsCopy);

    console.log(errorsCopy);

    return valid;
  } //validateForm

  return (
    <div className="container">
      <br /> <br />
      <div className="row">
        <div className="card col-md-10 offset-md-1 offset-md-1">
          {pageTitle()}
          <div className="card-body">
            <form>
              <div className="form-group mb-2">
                <label className="form-label">Select Client:</label>
                <select
                  className={`form-control ${
                    errors.client ? "is-invalid" : ""
                  }`}
                  value={client}
                  onChange={(e) => setClient(e.target.value)}
                >
                  <option value="Select Client">Select Client</option>
                  {clients.map((client) => (
                    <option key={client._id} value={client._id}>
                      {client.name}
                    </option>
                  ))}
                </select>

                {errors.client && (
                  <div className="invalid-feedback">{errors.client}</div>
                )}
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Name:</label>
                <input
                  type="text"
                  placeholder="name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`form-control ${errors.name ? "is-invalid" : ""}`}
                ></input>
                {errors.name && (
                  <div className="invalid-feedback">{errors.name} </div>
                )}
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Specie:</label>
                <input
                  type="text"
                  placeholder="specie"
                  name="text"
                  value={specie}
                  onChange={(e) => setSpecie(e.target.value)}
                  className={`form-control ${
                    errors.specie ? "is-invalid" : ""
                  }`}
                ></input>
                {errors.specie && (
                  <div className="invalid-feedback">{errors.specie} </div>
                )}
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Breed:</label>
                <input
                  type="text"
                  placeholder="breed"
                  name="breed"
                  value={breed}
                  onChange={(e) => setBreed(e.target.value)}
                  className={`form-control ${errors.breed ? "is-invalid" : ""}`}
                ></input>
                {errors.breed && (
                  <div className="invalid-feedback">{errors.breed} </div>
                )}
              </div>

              <div className="form-group mb-2">
                <label className="form-label">Color:</label>
                <input
                  type="text"
                  placeholder="color"
                  name="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className={`form-control ${errors.color ? "is-invalid" : ""}`}
                ></input>
                {errors.color && (
                  <div className="invalid-feedback">{errors.color} </div>
                )}
              </div>

              <div className="form-group mb-2">
                <label className="form-label">Height:</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  name="height"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className={`form-control ${
                    errors.height ? "is-invalid" : ""
                  }`}
                ></input>
                {errors.height && (
                  <div className="invalid-feedback">{errors.height} </div>
                )}
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Weight:</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  name="weight"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className={`form-control ${
                    errors.weight ? "is-invalid" : ""
                  }`}
                ></input>
                {errors.weight && (
                  <div className="invalid-feedback">{errors.weight} </div>
                )}
              </div>

              <div className="form-group mb-2">
                <label className="form-label">Gender:</label>
                <select
                  name="gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className={`form-control ${
                    errors.gender ? "is-invalid" : ""
                  }`}
                >
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
                {errors.gender && (
                  <div className="invalid-feedback">{errors.gender}</div>
                )}
              </div>

              <div className="form-group mb-2">
                <label className="form-label">Birthdate:</label>
                <input
                  type="date"
                  name="birthDate"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  className={`form-control ${
                    errors.birthDate ? "is-invalid" : ""
                  }`}
                ></input>
                {errors.birthDate && (
                  <div className="invalid-feedback">{errors.birthDate} </div>
                )}
              </div>

              <div className="form-group mb-2">
                <label className="form-label">Father:</label>
                <input
                  type="text"
                  placeholder="father"
                  name="father"
                  value={father}
                  onChange={(e) => setFather(e.target.value)}
                  className={`form-control ${
                    errors.father ? "is-invalid" : ""
                  }`}
                ></input>
                {errors.father && (
                  <div className="invalid-feedback">{errors.father} </div>
                )}
              </div>

              <div className="form-group mb-2">
                <label className="form-label">Mother:</label>
                <input
                  type="text"
                  placeholder="mother"
                  name="mother"
                  value={mother}
                  onChange={(e) => setMother(e.target.value)}
                  className={`form-control ${
                    errors.mother ? "is-invalid" : ""
                  }`}
                ></input>
                {errors.mother && (
                  <div className="invalid-feedback">{errors.mother} </div>
                )}
              </div>

              <div className="form-group mb-2">
                <label className="form-label">Observations:</label>
                <textarea
                  placeholder="observations"
                  name="observations"
                  rows="5"
                  value={observations}
                  onChange={(e) => setObservations(e.target.value)}
                  className={`form-control ${
                    errors.observations ? "is-invalid" : ""
                  }`}
                ></textarea>
                {errors.name && (
                  <div className="invalid-feedback">{errors.observations} </div>
                )}
              </div>

              <button className="btn btn-success" onClick={saveOrUpdatePet}>
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetComponent;
