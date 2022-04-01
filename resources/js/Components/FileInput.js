import React, { useState, useRef } from 'react';
import { filesize } from '@/helpers';

const Button = ({ text, onClick }) => (
  <button
    type="button"
    className="px-4 py-1 text-xs font-medium text-white bg-gray-600 rounded-sm focus:outline-none hover:bg-gray-700"
    onClick={onClick}
  >
    {text}
  </button>
);

export default ({ className, name, label, accept, errors = [], require = false, onChange }) => {
  const fileInput = useRef();
  const [file, setFile] = useState(null);

  function browse() {
    fileInput.current.click();
  }

  function remove() {
    setFile(null);
    onChange(null);
    fileInput.current.value = null;
  }

  function handleFileChange(e) {
    const file = e.target.files[0];
    setFile(file);
    onChange(file);
  }

  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-gray-700" htmlFor={name}>
          {label}
          {require && (
            <span className="text-red-500"> *</span>
          )}
        </label>
      )}
      <div className="mt-1">
        <div className={`form-input text-sm border-2 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm ${errors.length && 'error'}`}>
          <input
            id={name}
            ref={fileInput}
            accept={accept}
            type="file"
            className="hidden"
            onChange={handleFileChange}
          />
          {!file && (
            <div className="p-0">
              <Button text="Cari" onClick={browse} />
            </div>
          )}
          {file && (
            <div className="flex items-center justify-between p-0">
              <div className="flex-1 pr-1">
                {file.name}
                <span className="ml-1 text-xs text-gray-600">
                  ({filesize(file.size)})
                </span>
              </div>
              <Button text="Hapus" onClick={remove} />
            </div>
          )}
        </div>
        {errors.length > 0 && <div className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">{errors}</div>}
      </div>
    </div>
  );
};
