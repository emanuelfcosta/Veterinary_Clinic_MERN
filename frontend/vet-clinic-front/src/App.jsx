import ClientComponent from "./components/Clients/ClientComponent";
import ListClientComponent from "./components/Clients/ListClientComponent";
import HeaderComponent from "./components/HeaderComponent";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import IndexComponent from "./components/IndexComponent";
import ListPetComponent from "./components/Pets/ListPetComponent";
import PetComponent from "./components/Pets/PetComponent";
import ListVetComponent from "./components/Vets/ListVetComponent";
import VetComponent from "./components/Vets/VetComponent";
import ListProcedureComponent from "./components/Procedures/ListProcedureComponent";
import ProcedureComponent from "./components/Procedures/ProcedureComponent";
import ListConsultationComponent from "./components/Consultations/ListConsultationComponent";
import ConsultationComponent from "./components/Consultations/ConsultationComponent";
import ListReportComponent from "./components/Reports/ListReportComponent";
import ClientsReport from "./components/Reports/ClientsReport";
import VetsReport from "./components/Reports/VetsReport";
import PetsReport from "./components/Reports/PetsReport";
import ProceduresReport from "./components/Reports/ProceduresReport";
import ConsultationsReport from "./components/Reports/ConsultationsReport";

function App() {
  return (
    <>
      <BrowserRouter>
        <HeaderComponent />
        <Routes>
          {/*http://localhost:5173 */}
          <Route path="/" element={<IndexComponent />}></Route>
          {/*http://localhost:5173/clients */}
          <Route path="/clients" element={<ListClientComponent />}></Route>
          {/* http://localhost:5173/add-client */}
          <Route path="/add-client" element={<ClientComponent />}></Route>
          {/* //localhost:5173/edit-client/1 */}
          <Route path="/edit-client/:id" element={<ClientComponent />}></Route>
          {/*http://localhost:5173/pets */}
          <Route path="/pets" element={<ListPetComponent />}></Route>
          {/* http://localhost:5173/add-pet */}
          <Route path="/add-pet" element={<PetComponent />}></Route>
          {/* //localhost:5173/edit-pet/1 */}
          <Route path="/edit-pet/:id" element={<PetComponent />}></Route>
          {/*http://localhost:5173/vets */}
          <Route path="/vets" element={<ListVetComponent />}></Route>
          {/* http://localhost:5173/add-vet */}
          <Route path="/add-vet" element={<VetComponent />}></Route>
          {/* //localhost:5173/edit-vet/1 */}
          <Route path="/edit-vet/:id" element={<VetComponent />}></Route>
          {/*http://localhost:5173/procedures */}
          <Route
            path="/procedures"
            element={<ListProcedureComponent />}
          ></Route>
          {/* http://localhost:5173/add-procedure */}
          <Route path="/add-procedure" element={<ProcedureComponent />}></Route>
          {/* //localhost:5173/edit-procedure/1 */}
          <Route
            path="/edit-procedure/:id"
            element={<ProcedureComponent />}
          ></Route>
          {/*http://localhost:5173/consultations */}
          <Route
            path="/consultations"
            element={<ListConsultationComponent />}
          ></Route>
          {/* http://localhost:5173/add-consultation */}
          <Route
            path="/add-consultation"
            element={<ConsultationComponent />}
          ></Route>
          {/*http://localhost:5173/reports */}
          <Route path="/reports" element={<ListReportComponent />}></Route>

          {/*http://localhost:5173/reports/clientsreport */}
          <Route
            path="/reports/clientsreport"
            element={<ClientsReport />}
          ></Route>

          {/*http://localhost:5173/reports/vetsreport */}
          <Route path="/reports/vetsreport" element={<VetsReport />}></Route>

          {/*http://localhost:5173/reports/petsreport */}
          <Route path="/reports/petsreport" element={<PetsReport />}></Route>

          {/*http://localhost:5173/reports/proceduresreport */}
          <Route
            path="/reports/proceduresreport"
            element={<ProceduresReport />}
          ></Route>

          {/*http://localhost:5173/reports/consultationsreport */}
          <Route
            path="/reports/consultationsreport"
            element={<ConsultationsReport />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
