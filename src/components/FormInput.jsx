import React from "react";
import { IoMdClose } from "react-icons/io";

const FormInput = ({
  label,
  type,
  id,
  value,
  onChange,
  placeholder,
  required = false,
  options = [],
  accept,
  resetInput,
}) => {
  return (
    <div className="mb-6">
      <label
        htmlFor={id}
        className="block mb-2 text-sm font-medium text-gray-700"
      >
        {label}
        {/* {required && <span className="text-red-500">*</span>} */}
      </label>

      {type === "select" ? (
        <select
          id={id}
          className="bg-white border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 transition-all duration-200"
          value={value}
          onChange={onChange}
          required={required}
        >
          <option value="" disabled>
            {placeholder || "Select an option"}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : type === "file" ? (
        <div className="flex items-center justify-center w-full">
          <label
            htmlFor={id}
            className={`flex flex-col items-center justify-center w-full ${
              value ? "h-16" : "h-32"
            } border-2 border-blue-300 border-dashed rounded-lg cursor-pointer bg-blue-50 hover:bg-blue-100 transition-all duration-200`}
          >
            {value ? (
              <button
                className="flex gap-2"
                onClick={() =>
                  id === "camera" ? resetInput("picture") : resetInput("file")
                }
              >
                {" "}
                <div className="rounded bg-red-100 text-red-500 grid place-content-center p-1">
                  <IoMdClose />
                </div>{" "}
                {value.name}
              </button>
            ) : (
              <>
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    className="w-10 h-10 mb-3 text-blue-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    ></path>
                  </svg>
                  <p className="mb-1 text-sm text-gray-500">
                    <span className="font-semibold">
                      {id === "camera" ? "Upload picture" : "Upload file"}
                    </span>
                  </p>
                  <p className="text-xs text-gray-500">
                    {id === "camera"
                      ? "Medical issue image"
                      : "Medical file or document"}
                  </p>
                </div>
                <input
                  id={id}
                  type="file"
                  accept={accept}
                  className="hidden"
                  required={required}
                  onChange={(e) =>
                    id === "camera"
                      ? onChange(e, "picture")
                      : onChange(e, "file")
                  }
                />
              </>
            )}
          </label>
        </div>
      ) : (
        <input
          type={type}
          id={id}
          className="bg-white border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 transition-all duration-200"
          placeholder={placeholder}
          required={required}
          value={value}
          onChange={onChange}
        />
      )}
    </div>
  );
};

export default FormInput;
