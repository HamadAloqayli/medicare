import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle, ArrowLeft, Home } from "lucide-react";
import { useClinic } from "../contexts/ClinicContext";

const SuccessPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedClinic } = useClinic();

  // Get clinic info from location state or context
  const clinicInfo = location.state?.clinicInfo || selectedClinic;

  useEffect(() => {
    // Auto redirect to home after 30 seconds
    const timer = setTimeout(() => {
      navigate("/");
    }, 30000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full"
      >
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-100 mb-6"
          >
            <CheckCircle className="h-12 w-12 text-green-500" />
          </motion.div>

          {/* Success Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h1 className="text-2xl font-bold text-gray-800 mb-3">
              شكراً لاهتمامك!
            </h1>

            <p className="text-gray-600 mb-6 leading-relaxed">
              بتجربة نظام رفيق الصحة. هذه نسخة تجريبية مخصصة للعرض فقط، وقد تم
              إيقاف الخدمات الخلفية (Backend) المرتبطة بواجهة البرمجة (API) بهدف
              تقليل استهلاك الموارد.
            </p>

            {/* Additional Info */}
            <div className="bg-blue-50 rounded-lg p-4 mb-6">
              <p className="text-sm text-blue-800">
                <span className="font-semibold">ملاحظة:</span> هذا عرض تجريبي
                للنظام. في النسخة الكاملة، سيتم معالجة طلبك وإرسال النتائج إليك.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={() => navigate("/")}
                className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <Home className="w-4 h-4" />
                العودة للصفحة الرئيسية
              </button>

              <button
                onClick={() => navigate("/form")}
                className="w-full py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                تجربة أخرى
              </button>
            </div>

            {/* Auto redirect notice */}
            <p className="text-xs text-gray-500 mt-4">
              سيتم توجيهك تلقائياً للصفحة الرئيسية خلال 30 ثانية
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default SuccessPage;
