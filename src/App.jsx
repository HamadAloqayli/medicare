import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import FormPage from './pages/FormPage';
import { ClinicProvider } from './contexts/ClinicContext';

function App() {
  return (
    <ClinicProvider>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-50">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/form" element={<FormPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </ClinicProvider>
  );
}

export default App;