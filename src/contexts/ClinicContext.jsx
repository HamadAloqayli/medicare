import React, { createContext, useState, useContext } from 'react';
import { clinics } from '../data/clinics';

const ClinicContext = createContext();

export const useClinic = () => {
  const context = useContext(ClinicContext);
  if (!context) {
    throw new Error('useClinic must be used within a ClinicProvider');
  }
  return context;
};

export const ClinicProvider = ({ children }) => {
  const [selectedClinic, setSelectedClinic] = useState(null);

  const value = {
    selectedClinic,
    setSelectedClinic,
    availableClinics: clinics,
  };

  return <ClinicContext.Provider value={value}>{children}</ClinicContext.Provider>;
};