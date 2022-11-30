import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Calendario from './pages/Calendario';
import Cadastro from './pages/Cadastro';
import Materias from './pages/Materias';
import Tarefas from './pages/Tarefas';
import Provas from './pages/Provas';
import Turmas from './pages/Turmas';
import Notas from './pages/Notas';
import Conta from './pages/Conta';
import Intro from './pages/Intro';
import Login from './pages/Login';
import Home from './pages/Home';

import React from 'react';
import RequireAuth from './auth';
import Pagina400 from './pages/Pagina400';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Intro />}/>
        <Route path='/login' element={<Login />} />
        <Route path='/cadastro' element={<Cadastro />} />
        <Route path='/calendario' element={<Calendario />} />
        <Route path='/home' element={<RequireAuth><Home /></RequireAuth>} />
        <Route path='/tarefas' element={<RequireAuth><Tarefas /></RequireAuth>} />
        <Route path='/provas' element={<RequireAuth><Provas /></RequireAuth>} />
        <Route path='/notas' element={<RequireAuth><Notas /></RequireAuth>} />
        <Route path='/materias' element={<RequireAuth><Materias /></RequireAuth>} />
        <Route path='/materias/:id' element={<RequireAuth><Login /></RequireAuth>} />
        <Route path='/turmas' element={<RequireAuth verifyProf={true} profFalse={<Pagina400 />} ><Turmas /></RequireAuth>} />
        <Route path='/config' element={<RequireAuth><Conta /></RequireAuth>} />
        <Route path='*' element={<Pagina400 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
