import React from "react";
import { motion } from "framer-motion";
import ClinicCard from "../components/ClinicCard";
import { useClinic } from "../contexts/ClinicContext";

const HomePage = () => {
  const { availableClinics } = useClinic();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 80,
      },
    },
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          مرحبا خالد 👋
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl">
          تطمن على صحتك باستخدام الذكاء الاصطناعي لتحليل التقارير الطبية وتشخيص
          الحالات
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 grid-rows-2"
      >
        {availableClinics.map((clinic) => (
          <motion.div
            key={clinic.id}
            variants={itemVariants}
            className={
              clinic.id === "stethoscope"
                ? "row-span-2 lg:order-none order-1"
                : ""
            }
          >
            <ClinicCard
              id={clinic.id}
              name={clinic.name}
              icon={clinic.icon}
              description={clinic.description}
              nameAR={clinic.nameAR}
              descriptionAR={clinic.descriptionAR}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default HomePage;
