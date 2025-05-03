import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useClinic } from "../contexts/ClinicContext";
import {
  Heart,
  Eye,
  Droplet,
  Settings as Lungs,
  Brain,
  Bluetooth as Tooth,
  LucideKey as Kidney,
  Atom as Stomach,
} from "lucide-react";
import Cardiology from "../assets/images/Cardiology.png";
import Neurology from "../assets/images/Neurology.png";
import Pulmonology from "../assets/images/Pulmonology.png";
import Urology from "../assets/images/Urology.png";
import Gastroenterology from "../assets/images/Gastroenterology.png";
import InternalMedicine from "../assets/images/InternalMedicine.png";
import Doctor from "../assets/images/Doctor.png";

const iconMap = {
  "heart-pulse": <img src={Cardiology} alt="Cardiology" />,
  eye: <img src={Doctor} alt="Doctor" />,
  droplet: <img src={InternalMedicine} alt="InternalMedicine" />,
  lungs: <img src={Pulmonology} alt="Pulmonology" />,
  brain: <img src={Neurology} alt="Neurology" />,
  tooth: <Tooth className="h-12 w-12 text-blue-500" />,
  kidney: <img src={Urology} alt="Urology" />,
  stomach: <img src={Gastroenterology} alt="Gastroenterology" />,
};

const ClinicCard = ({ id, name, icon, description }) => {
  const navigate = useNavigate();
  const { setSelectedClinic } = useClinic();

  const handleClick = () => {
    setSelectedClinic({ id, name, icon, description });
    navigate("/form");
  };

  return (
    <motion.div
      className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer transform perspective-1000"
      whileHover={{
        scale: 1.03,
        rotateY: 5,
        boxShadow:
          "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300 }}
      onClick={handleClick}
    >
      <div className="p-8 flex flex-col items-center text-center">
        <motion.div
          className="mb-4 bg-blue-50 p-4 rounded-full"
          whileHover={{
            rotate: [0, -10, 10, -10, 0],
            transition: { duration: 0.5 },
          }}
        >
          {iconMap[icon]}
        </motion.div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{name}</h3>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
    </motion.div>
  );
};

export default ClinicCard;
