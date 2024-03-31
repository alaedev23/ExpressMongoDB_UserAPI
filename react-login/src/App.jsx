import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainContent from './pages/MainContent.jsx';
import Login from './pages/Login.jsx';
import Error_404 from './pages/Error_404.jsx';
import Register from './pages/Register.jsx';
import Header from './components/Header.jsx';
import Profile from './pages/Profile.jsx';
import UserContext from './context/UserContext.jsx';
import Notes from './pages/Notes.jsx';
import './App.css';

function App() {
  const { user } = useContext(UserContext);

  return (
    <>
      <Header />
      {/* HashRouter es fa servir en servidors compartits, quan no es pot enviar la URL al servidor, en casos
      com servidors compartits. Per aixó no es recomanable fer-la servir en altres casos. En el nostra cas no es necessaria. */}
      <div className="bg-dark-custom">
        <Routes>
          <Route path="/" element={<MainContent />} />
          {!user && (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </>
          )}
          {user && (
            <>
              <Route path="/profile" element={<Profile />} />
              <Route path="/notes" element={<Notes />} />
              <Route path="/login" element={<Navigate to="/profile" />} />
              <Route path="/register" element={<Navigate to="/profile" />} />
            </>
          )}
          <Route path="*" element={<Error_404 />} />
        </Routes>
      </div>
    </>
  );
}

export default App;