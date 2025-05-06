import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import FormInput from "../components/FormInput";
import { useClinic } from "../contexts/ClinicContext";
import { ArrowLeft, CheckCircle } from "lucide-react";

const FormPage = () => {
  const { selectedClinic } = useClinic();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isCameraMode, setIsCameraMode] = useState(false);

  const [formData, setFormData] = useState({
    modelType: "",
    symptomsDescription: "",
    clinic: selectedClinic?.name,
    file: null,
    picture: null,
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleFileChange = (e, fileType) => {
    if (e.target.files && e.target.files[0]) {
      fileType === "picture"
        ? setFormData({ ...formData, picture: e.target.files[0] })
        : setFormData({ ...formData, file: e.target.files[0] });
    }
  };

  const resetInput = (inputType) => {
    if (inputType === "file") {
      setFormData({ ...formData, file: null });
    }
    if (inputType === "picture") {
      setFormData({ ...formData, picture: null });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // setIsSubmitting(true);

    console.log(formData);

    // Simulate form submission
    // setTimeout(() => {
    //   setIsSubmitting(false);
    //   setIsSuccess(true);

    //   // Reset after showing success message
    //   setTimeout(() => {
    //     setIsSuccess(false);
    //     navigate("/");
    //   }, 3000);
    // }, 1500);
  };

  if (!selectedClinic) {
    return (window.location = "/");
  }

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center"
      >
        <div className="bg-white p-8 rounded-xl shadow-md">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
            <CheckCircle className="h-10 w-10 text-green-500" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Request Submitted!
          </h2>
          <p className="text-gray-600 mb-6">
            We've received your request for {selectedClinic.name}. Our team will
            contact you shortly to confirm your request details.
          </p>
          <p className="text-sm text-gray-500">Redirecting to home page...</p>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-md overflow-hidden"
      >
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-4">
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center text-white hover:underline mb-2"
          >
            <ArrowLeft className="w-4 h-4 mr-1" /> Back
          </button>
          <h1 className="text-2xl font-bold text-white">
            {selectedClinic.name} Analysis
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="flex sm:hidden items-center justify-center mb-4">
            <button
              type="button"
              className={`px-4 py-2 rounded-l-lg ${
                !isCameraMode
                  ? "bg-blue-500 text-white"
                  : "bg-blue-50 text-gray-700"
              }`}
              onClick={() => setIsCameraMode(false)}
            >
              Upload File
            </button>
            <button
              type="button"
              className={`px-4 py-2 rounded-r-lg ${
                isCameraMode
                  ? "bg-blue-500 text-white"
                  : "bg-blue-50 text-gray-700"
              }`}
              onClick={() => setIsCameraMode(true)}
            >
              Take Picture
            </button>
          </div>

          {isCameraMode ? (
            <FormInput
              label="Take a Picture"
              type="file"
              id="camera"
              accept="image/*"
              capture="camera"
              onChange={handleFileChange}
              value={formData.picture}
              resetInput={resetInput}
            />
          ) : (
            <FormInput
              label="Medical Record or Document"
              type="file"
              id="file"
              accept="*"
              onChange={handleFileChange}
              value={formData.file}
              resetInput={resetInput}
            />
          )}

          <div className="grid grid-cols-1">
            <FormInput
              label="Model Type"
              type="select"
              id="modelType"
              value={formData.modelType}
              onChange={handleInputChange}
              // required
              options={[
                { value: "MediCare", label: "MediCare (Fast Response)" },
                { value: "MediCarePro", label: "MediCare Pro (Secure Model)" },
              ]}
            />
          </div>

          <div className="mt-6">
            <label
              htmlFor="symptoms"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Symptoms Description{" "}
              {/* <span className="text-red-500">*</span> */}
            </label>
            <textarea
              id="symptomsDescription"
              rows={4}
              className="bg-white border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 transition-all duration-200"
              placeholder="Please describe your symptoms"
              // required
              value={formData.symptomsDescription}
              onChange={handleInputChange}
            ></textarea>
          </div>

          <div className="mt-8">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 px-4 ${
                isSubmitting
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              } text-white font-medium rounded-lg text-center transition-colors duration-200 flex items-center justify-center`}
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </>
              ) : (
                "Start Analysis"
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default FormPage;
