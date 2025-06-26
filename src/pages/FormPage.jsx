import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import FormInput from "../components/FormInput";
import { useClinic } from "../contexts/ClinicContext";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Camera,
  Upload,
  File,
  SwitchCamera,
  Aperture,
  RotateCw,
  X,
} from "lucide-react";
import Cardiology from "../assets/images/Cardiology.png";
import Neurology from "../assets/images/Neurology.png";
import Pulmonology from "../assets/images/Pulmonology.png";
import Urology from "../assets/images/Urology.png";
import Gastroenterology from "../assets/images/Gastroenterology.png";
import InternalMedicine from "../assets/images/InternalMedicine.png";
import GeneralPractitioner from "../assets/images/GeneralPractitioner.png";

const FormPage = () => {
  const { selectedClinic } = useClinic();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCameraMode, setIsCameraMode] = useState(false);
  const [facingMode, setFacingMode] = useState("environment"); // 'user' for front, 'environment' for back
  const videoRef = useRef(null);
  const [stream, setStream] = useState(null);

  const [formData, setFormData] = useState({
    modelType: "",
    symptomsDescription: "",
    clinic: selectedClinic?.name,
    file: null,
    picture: null,
  });

  const clinicIcon = {
    Cardiology: Cardiology,
    "General Practitioner": GeneralPractitioner,
    "Internal Medicine": InternalMedicine,
    Pulmonology: Pulmonology,
    Neurology: Neurology,
    Nephrology: Urology,
    Gastroenterology: Gastroenterology,
  };

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [stream]);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode },
        audio: false,
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      setIsCameraMode(false);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  };

  const flipCamera = async () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());

      const newFacingMode = facingMode === "user" ? "environment" : "user";
      setFacingMode(newFacingMode);

      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: newFacingMode },
          audio: false,
        });
        setStream(mediaStream);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      } catch (err) {
        console.error("Error flipping camera:", err);
      }
    }
  };

  const toggleCameraMode = (mode) => {
    if (mode === isCameraMode) return;

    if (mode) {
      startCamera();
    } else {
      stopCamera();
    }
    setIsCameraMode(mode);
  };

  const captureImage = async () => {
    if (!videoRef.current) return null;

    try {
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

      const blob = await new Promise((resolve) =>
        canvas.toBlob(resolve, "image/jpeg", 0.95)
      );

      if (!blob) throw new Error("Failed to create blob");

      const file = new (window.File || File)(
        [blob],
        `captured-${Date.now()}.jpg`,
        { type: "image/jpeg", lastModified: Date.now() }
      );

      setFormData({ ...formData, picture: file });
      stopCamera();
      return file;
    } catch (error) {
      console.error("Capture failed:", error);
      stopCamera();
      return null;
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleFileChange = (e, fileType) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (fileType === "picture") {
        setFormData({ ...formData, picture: file });
      } else {
        setFormData({ ...formData, file: file });
      }
    }
  };

  const resetInput = (inputType) => {
    if (inputType === "file") {
      setFormData({ ...formData, file: null });
    }
    if (inputType === "picture") {
      setFormData({ ...formData, picture: null });
      if (isCameraMode) startCamera();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    console.log(formData);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      // Navigate to success page with clinic info
      navigate("/success", {
        state: {
          clinicInfo: selectedClinic,
        },
      });
    }, 1500);
  };

  if (!selectedClinic) {
    return (window.location = "/");
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
            <ArrowRight className="w-4 h-4 ml-1" /> العودة
          </button>
          <div className="flex items-center gap-4">
            <div
              className={`bg-white bg-opacity-20 ${
                selectedClinic.name === "General Practitioner" ? "p-0" : "p-1"
              } rounded-lg`}
            >
              <img
                src={`${clinicIcon[selectedClinic.name]}`}
                width={
                  selectedClinic.name === "General Practitioner" ? 230 : 50
                }
                height={
                  selectedClinic.name === "General Practitioner" ? 230 : 50
                }
                alt=""
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">
                تشخيص {selectedClinic.nameAR}
              </h1>
              <p className="mt-1 text-sm font-medium text-gray-200">
                {selectedClinic.descriptionAR}
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-2 gap-4 mb-4">
            {/* Upload File Card */}
            <button
              type="button"
              onClick={() => toggleCameraMode(false)}
              className={`p-4 rounded-lg flex flex-col items-center justify-center gap-2 ${
                !isCameraMode
                  ? "bg-blue-600 text-white"
                  : "bg-blue-50 text-gray-700 hover:bg-blue-100"
              } transition-colors border border-gray-200`}
            >
              <File className="w-8 h-8" />
              <span className="font-medium">رفع ملف</span>
            </button>

            {/* Take Picture Card */}
            <button
              type="button"
              onClick={() => toggleCameraMode(true)}
              className={`p-4 rounded-lg flex flex-col items-center justify-center gap-2 ${
                isCameraMode
                  ? "bg-blue-600 text-white"
                  : "bg-blue-50 text-gray-700 hover:bg-blue-100"
              } transition-colors border border-gray-200`}
            >
              <Camera className="w-8 h-8" />
              <span className="font-medium">أخذ صورة</span>
            </button>
          </div>

          {isCameraMode ? (
            formData.picture ? (
              <div className="mb-4">
                <div className="relative bg-gray-100 rounded-lg overflow-hidden mb-2">
                  <img
                    src={URL.createObjectURL(formData.picture)}
                    alt="Captured"
                    className="w-full h-auto max-h-64 object-contain"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setFormData({ ...formData, picture: null });
                      startCamera();
                    }}
                    className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
                  >
                    <RotateCw className="w-4 h-4" />
                    إعادة
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      stopCamera();
                      setIsCameraMode(false);
                    }}
                    className="py-2 px-4 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 flex items-center justify-center gap-2"
                  >
                    <X className="w-4 h-4" />
                    الغاء
                  </button>
                </div>
              </div>
            ) : (
              <div className="mb-4">
                <div className="relative bg-gray-100 rounded-lg overflow-hidden mb-4">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-auto max-h-64 object-contain"
                  />
                  <div className="absolute top-2 right-2">
                    <button
                      type="button"
                      onClick={flipCamera}
                      className="p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70 transition-all"
                      title="Flip camera"
                    >
                      <SwitchCamera className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-2 mb-4">
                  <span className="text-red-500 ml-1">*</span>
                  يمكنك أخذ صورة للمشكلة الصحية التي تواجهك
                </p>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={captureImage}
                    className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
                  >
                    <Aperture className="w-4 h-4" />
                    تصوير
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      stopCamera();
                      setIsCameraMode(false);
                    }}
                    className="py-2 px-4 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 flex items-center justify-center gap-2"
                  >
                    <X className="w-4 h-4" />
                    الغاء
                  </button>
                </div>
              </div>
            )
          ) : (
            <FormInput
              label="التقرير الصحي"
              type="file"
              id="file"
              accept="*"
              onChange={(e) => handleFileChange(e, "file")}
              value={formData.file}
              resetInput={resetInput}
            />
          )}

          <div className="grid grid-cols-1">
            <FormInput
              label="نوع النموذج"
              type="select"
              id="modelType"
              value={formData.modelType}
              onChange={handleInputChange}
              options={[
                { value: "MediCare", label: "رفيق الصحة (استجابة سريعة)" },
                {
                  value: "MediCarePro",
                  label: "رفيق الصحة المتقدم (نموذج آمن)",
                },
              ]}
            />
          </div>

          <div>
            <label
              htmlFor="symptoms"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              وصف الأعراض
            </label>
            <textarea
              id="symptomsDescription"
              rows={4}
              className="bg-white border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 transition-all duration-200"
              placeholder="قم بوصف الأعراض الصحية (اختياري)"
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
              } text-white font-medium rounded-lg text-center transition-colors duration-200 flex gap-4 items-center justify-center`}
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
                  جاري التشخيص...
                </>
              ) : (
                "تشخيص الحالة"
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default FormPage;
