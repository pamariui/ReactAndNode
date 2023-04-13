import React from 'react';
import { Route, Routes} from 'react-router-dom';


import Homepage from './pages/Homepage';
import Departaments from './pages/Departaments';
import Projects from './pages/Projects';
import CreateDepartment from './pages/CreateDepartment';
import EditDepartment from './pages/EditDepartment';
import CreateEmployee from './pages/CreateEmployee';

const App = () => {
  return (
    <>
      <Routes>
          <Route exact path='/' element={<Homepage/>} />
          <Route path='/employees/create' element = {<CreateEmployee/>} />
          <Route path='/departaments' element={<Departaments/>} />
          <Route path='/departments/create' element={<CreateDepartment/>} />
          <Route path="/departments/:id/edit" element={<EditDepartment />} />
          <Route path='/projects' element={<Projects/>} />
      </Routes>
    </>
  )
}

export default App;