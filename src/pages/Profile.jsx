import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  User,
  Calendar,
  Activity,
  AlertTriangle,
  File,
  FileText,
  Heart,
  Ambulance,
  ArrowLeft,
  TrendingUp,
  BarChart3,
} from "lucide-react";
import Cardiology from "../assets/images/Cardiology.png";
import Neurology from "../assets/images/Neurology.png";
import Pulmonology from "../assets/images/Pulmonology.png";
import Urology from "../assets/images/Urology.png";
import Gastroenterology from "../assets/images/Gastroenterology.png";
import InternalMedicine from "../assets/images/InternalMedicine.png";
import GeneralPractitioner from "../assets/images/GeneralPractitioner.png";
import UserProfile from "../assets/images/userProfile.png";
import kpi from "../assets/images/kpi.png";
import { ActivitySquare } from "lucide-react";

const Profile = () => {
  // Mock data
  const [userData] = useState({
    name: "خالد عبدالعزيز",
    email: "khalid@example.com",
    phone: "0501234567",
    gender: "ذكر",
    sehatyStatus: "تم الربط",
    bloodType: "O+",
    height: "175 سم",
    weight: "70 كغ",
    allergies: ["حساسية القمح", "حساسية البنسلين"],
  });

  const [requests] = useState([
    {
      id: 1,
      model: "رفيق الصحة",
      title: "تحليل تقرير فحص الدم",
      description: "تحليل نتائج فحص الدم الشهري",
      date: "10/04/2025",
      image: "heart-pulse",
    },
    {
      id: 2,
      model: "رفيق الصحة المتطور",
      title: "تشخيص أشعة الصدر",
      description: "تحليل صورة الأشعة السينية للصدر",
      date: "02/04/2025",
      image: "heart-pulse",
    },
    {
      id: 3,
      model: "رفيق الصحة",
      title: "تحليل نتائج ضغط الدم",
      description: "متابعة قياسات ضغط الدم الأسبوعية",
      date: "28/03/2025",
      image: "heart-pulse",
    },
  ]);

  // Health data for charts
  const healthData = {
    bloodPressure: [
      { name: "الأحد", systolic: 120, diastolic: 80 },
      { name: "الإثنين", systolic: 122, diastolic: 78 },
      { name: "الثلاثاء", systolic: 125, diastolic: 82 },
      { name: "الأربعاء", systolic: 118, diastolic: 76 },
      { name: "الخميس", systolic: 121, diastolic: 79 },
      { name: "الجمعة", systolic: 123, diastolic: 81 },
      { name: "السبت", systolic: 119, diastolic: 77 },
    ],
    heartRate: [
      { name: "صباحاً", value: 65 },
      { name: "ظهراً", value: 72 },
      { name: "مساءً", value: 68 },
    ],
    sleepQuality: [
      { name: "نوم عميق", value: 25 },
      { name: "نوم خفيف", value: 45 },
      { name: "استيقاظ", value: 30 },
    ],
  };

  // Colors for pie chart
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

  // Animation variants
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

  // Icons for request types
  const requestIconMap = {
    "heart-pulse": <img width={50} src={Cardiology} alt="Cardiology" />,
    stethoscope: (
      <img width={50} src={GeneralPractitioner} alt="GeneralPractitioner" />
    ),
    droplet: <img width={50} src={InternalMedicine} alt="InternalMedicine" />,
    lungs: <img width={50} src={Pulmonology} alt="Pulmonology" />,
    brain: <img width={50} src={Neurology} alt="Neurology" />,
    // tooth: <Tooth className="h-12 w-12 text-blue-500" />,
    kidney: <img width={50} src={Urology} alt="Urology" />,
    stomach: <img width={50} src={Gastroenterology} alt="Gastroenterology" />,
  };

  // Mock emergency status
  const emergencyStatus = {
    level: "منخفض",
    message: "الحالة الصحية مستقرة",
    needDoctor: false,
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-10"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          الملف الشخصي
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl">
          مراجعة المعلومات الشخصية والحالة الصحية
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        {/* User Image & Details */}
        <motion.div
          variants={itemVariants}
          className="bg-white rounded-xl shadow-md overflow-hidden"
        >
          <div className="p-8 flex flex-col items-center text-center">
            <div className="mb-4 bg-blue-50 rounded-xl p-1 pt-3 pb-1 w-40 h-40 flex items-center justify-center">
              {/* <User className="h-24 w-24 text-blue-500" /> */}
              <img className=" w-full" src={UserProfile} alt="UserProfile" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              {userData.name}
            </h2>

            <div className="w-full space-y-4">
              <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                <Mail className="h-5 w-5 text-blue-500 ml-3" />
                <span className="text-gray-700">{userData.email}</span>
              </div>

              <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                <Phone className="h-5 w-5 text-blue-500 ml-3" />
                <span className="text-gray-700">{userData.phone}</span>
              </div>

              <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                <User className="h-5 w-5 text-blue-500 ml-3" />
                <span className="text-gray-700">{userData.gender}</span>
              </div>

              <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                <Activity className="h-5 w-5 text-blue-500 ml-3" />
                <div className="flex justify-between w-full">
                  <span className="text-gray-700">تطبيق صحتي</span>
                  <span className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full">
                    {userData.sehatyStatus}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 w-full">
              <h3 className="text-lg font-medium text-gray-800 mb-3 text-right">
                معلومات صحية
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-blue-50 rounded-lg text-right">
                  <p className="text-sm text-gray-500">الطول</p>
                  <p className="font-medium">{userData.height}</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg text-right">
                  <p className="text-sm text-gray-500">فصيلة الدم</p>
                  <p className="font-medium">{userData.bloodType}</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg text-right">
                  <p className="text-sm text-gray-500">الوزن</p>
                  <p className="font-medium">{userData.weight}</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg text-right">
                  <p className="text-sm text-gray-500">الحساسية</p>
                  <p className="font-medium">{userData.allergies[0]}</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Health Charts */}
        <motion.div
          variants={itemVariants}
          className="bg-white rounded-xl shadow-md overflow-hidden md:col-span-2"
        >
          <div className="p-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 text-right">
              الحالة الصحية
            </h2>

            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-700 mb-3 text-right">
                ضغط الدم الأسبوعي
              </h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-blue-500 ml-2"></div>
                    <span className="text-sm text-gray-600">الانقباضي</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-green-500 ml-2"></div>
                    <span className="text-sm text-gray-600">الانبساطي</span>
                  </div>
                </div>
                <div className="h-40 relative flex items-end">
                  {healthData.bloodPressure.map((day, index) => (
                    <div
                      key={index}
                      className="flex-1 flex flex-col items-center"
                    >
                      <div className="flex flex-col items-center space-y-1">
                        <div
                          className="w-2 bg-blue-500 rounded-t"
                          style={{ height: `${day.systolic / 2}px` }}
                        ></div>
                        <div
                          className="w-2 bg-green-500 rounded-t"
                          style={{ height: `${day.diastolic / 2}px` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-500 mt-2">
                        {day.name}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mt-2">
                  <TrendingUp className="h-5 w-5 text-blue-500" />
                  <span className="text-sm text-gray-600">
                    التغيرات الأسبوعية
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-medium text-gray-700 mb-3 text-right">
                  معدل ضربات القلب
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg h-48 flex flex-col">
                  <div className="flex-1 flex items-end justify-around">
                    {healthData.heartRate.map((item, index) => (
                      <div key={index} className="flex flex-col items-center">
                        <div
                          className="w-10 bg-indigo-500 rounded-t"
                          style={{ height: `${item.value * 2}px` }}
                        ></div>
                        <span className="text-xs text-gray-500 mt-2">
                          {item.name}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between mt-4">
                    <BarChart3 className="h-5 w-5 text-indigo-500" />
                    <span className="text-sm text-gray-600">
                      {healthData.heartRate[0].value} -{" "}
                      {healthData.heartRate[1].value} نبضة/دقيقة
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-700 mb-3 text-right">
                  جودة النوم
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg h-48 flex flex-col items-center justify-center">
                  <div className="relative w-32 h-32 mb-4">
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                      {
                        healthData.sleepQuality.reduce(
                          (acc, item, index, arr) => {
                            const prevAngle = acc.angle;
                            const angle = prevAngle + (item.value / 100) * 360;
                            const largeArcFlag = item.value > 50 ? 1 : 0;

                            // Calculate coordinates on the circle
                            const startX =
                              50 +
                              40 * Math.cos(((prevAngle - 90) * Math.PI) / 180);
                            const startY =
                              50 +
                              40 * Math.sin(((prevAngle - 90) * Math.PI) / 180);
                            const endX =
                              50 +
                              40 * Math.cos(((angle - 90) * Math.PI) / 180);
                            const endY =
                              50 +
                              40 * Math.sin(((angle - 90) * Math.PI) / 180);

                            const color = COLORS[index % COLORS.length];

                            acc.paths.push(
                              <path
                                key={index}
                                d={`M 50 50 L ${startX} ${startY} A 40 40 0 ${largeArcFlag} 1 ${endX} ${endY} Z`}
                                fill={color}
                              />
                            );

                            acc.angle = angle;
                            return acc;
                          },
                          { paths: [], angle: 0 }
                        ).paths
                      }
                    </svg>
                  </div>
                  <div className="grid grid-cols-3 gap-2 w-full">
                    {healthData.sleepQuality.map((item, index) => (
                      <div key={index} className="flex items-center">
                        <div
                          className="w-3 h-3 rounded-full ml-1"
                          style={{
                            backgroundColor: COLORS[index % COLORS.length],
                          }}
                        ></div>
                        <span className="text-xs">
                          {item.name} {item.value}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Emergency Status */}
        <motion.div
          variants={itemVariants}
          className="bg-white rounded-xl shadow-md overflow-hidden md:col-span-3"
        >
          <div className="p-4 sm:p-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 text-right">
              حالة الطوارئ
            </h2>

            <div className="flex flex-col sm:flex-row items-center justify-between bg-blue-50 p-4 sm:p-6 rounded-xl gap-4 sm:gap-0">
              <div className="flex flex-col sm:flex-row items-center text-center sm:text-right gap-4 sm:gap-0">
                <img width={80} className="sm:ml-6" src={kpi} alt="kpi" />
                <div>
                  <h3 className="text-lg font-medium text-gray-800">
                    {emergencyStatus.level} المخاطر
                  </h3>
                  <p className="text-gray-600">{emergencyStatus.message}</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
                <button className="bg-red-500 text-white px-4 py-2 rounded-lg flex items-center justify-center sm:justify-start w-full sm:w-auto">
                  <Ambulance className="h-5 w-5 ml-2" />
                  <a
                    href="tel:937"
                    target="_blank"
                    className="w-full text-center sm:text-right"
                  >
                    اتصل بالطوارئ
                  </a>
                </button>
                <button className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center justify-center sm:justify-start w-full sm:w-auto">
                  <Activity className="h-5 w-5 ml-2" />
                  <a
                    href="https://www.seha.sa/"
                    target="_blank"
                    className="w-full text-center sm:text-right"
                  >
                    تطبيق صحتي
                  </a>
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Requests History */}
        <motion.div
          variants={itemVariants}
          className="bg-white rounded-xl shadow-md overflow-hidden md:col-span-3"
        >
          <div className="p-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 text-right">
              سجل الطلبات
            </h2>

            <div className="space-y-4">
              {requests.map((request) => (
                <motion.div
                  key={request.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-xl transition-all duration-200 cursor-pointer"
                  whileHover={{ scale: 1.01 }}
                >
                  <div className="flex items-center">
                    <div className="bg-blue-100 p-3 rounded-full ml-4">
                      {requestIconMap[request.image]}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800">
                        {request.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {request.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="ml-6 text-center w-32">
                      <span className="bg-blue-100 text-blue-600 text-xs w-full block px-3 py-1 rounded-full">
                        {request.model}
                      </span>
                      <p className="text-sm text-gray-500 mt-1">
                        {request.date}
                      </p>
                    </div>
                    <button className="bg-gray-200 p-2 rounded-full">
                      <ArrowLeft className="h-5 w-5 text-gray-600" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Profile;
