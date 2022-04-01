import { useState, useEffect } from "react";
import Swal from "sweetalert2";

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

export function delData() {
  const swalDelete = Swal.mixin({
    customClass: {
      confirmButton: "btn-primary px-4 py-2",
      cancelButton:
        "order-0 items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:order-1 sm:ml-3",
    },
    buttonsStyling: false,
  });

  return swalDelete.fire({
    title: "Apakah anda yakin??",
    text: "Anda tidak akan dapat mengembalikannya!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Ya, hapus!",
    cancelButtonText: "Batal",
    reverseButtons: false,
  });
}

export function filesize(size) {
  const i = Math.floor(Math.log(size) / Math.log(1024));
  return (
    (size / Math.pow(1024, i)).toFixed(2) * 1 +
    " " +
    ["B", "kB", "MB", "GB", "TB"][i]
  );
}

export function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
}
