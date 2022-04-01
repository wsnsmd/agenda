import React, { useMemo } from "react";
import Layout from "@/Components/Layout";
import { Link, usePage } from "@inertiajs/inertia-react";
import DataTable from "react-data-table-component";
import NoDataComp from "@/Components/NoDataComp";
import { delData } from "@/helpers";
import {
  PencilAltIcon,
  TrashIcon,
  PlusCircleIcon,
} from "@heroicons/react/solid";
import { Inertia } from "@inertiajs/inertia";

const paginationComponentOptions = {
  noRowsPerPage: true,
};

export default function Index() {
  const { foto } = usePage().props;
  let rowt = 1;

  const columns = useMemo(() => [
    {
      name: "#",
      cell: () => <span>{getRows()}</span>,
      width: "70px",
    },
    {
      name: 'File',
      grow: 0,
      cell: row => <img className="w-20" alt={row.title} src={row.file} />,
    },
    {
      name: "Title",
      selector: (row) => row.title,
      wrap: true,
    },
    {
      name: "Subtitle",
      selector: (row) => row.subtitle,
      wrap: true,
    },
    {
      name: "Tampil",
      cell: (row) => (
        <>
          <span
            tabIndex="-1"
            className="flex px-6 py-3"
          >
            {row.tampil ? (
              <span className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Ya
              </span>
            ) : (
              <span className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                Tidak
              </span>
            )}
          </span>
        </>
      ),
      width: "150px",
    },
    {
      cell: (row) => (
        <>
          <button
            className="flex items-center focus:outline-none"
            title="Edit"
            onClick={() => edit(row.id)}
          >
            <PencilAltIcon
              className="mr-2 h-5 w-5 text-green-500 hover:text-green-600"
              aria-hidden="true"
            />
          </button>
          <button
            className="flex items-center focus:outline-none"
            title="Delete"
            onClick={() => destroy(row.id)}
          >
            <TrashIcon
              className="mr-2 h-5 w-5 text-red-500 hover:text-red-600"
              aria-hidden="true"
            />
          </button>
        </>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ]);

  const getRows = () => {
    if (rowt > foto.length) rowt = 1;

    return rowt++;
  };

  const edit = (id) => {
    Inertia.get(route("foto.edit", id));
  };

  const destroy = (id) => {
    delData().then((result) => {
      if (result.isConfirmed) {
        Inertia.delete(route("foto.destroy", id));
      }
    });
  };

  return (
    <div className="max-w-screen-xl mx-auto pb-6 px-4 sm:px-6 lg:pb-16 lg:px-8 py-6">
      <div className="py-6 px-4 sm:p-6 lg:pb-8 bg-white rounded-lg shadow overflow-hidden">
        <div className="sm:flex sm:items-center sm:justify-start">
          <div className="mt-4 flex sm:mt-0">
            <Link
              className="px-4 py-2 sm:order-1 btn-primary"
              href={route("foto.create")}
            >
              <PlusCircleIcon
                className="-ml-0.5 mr-2 h-5 w-5"
                aria-hidden="true"
              />
              <span>Tambah</span>
            </Link>
          </div>
        </div>

        <div className="mt-6 overflow-x-auto bg-white rounded shadow">
          <DataTable
            persistTableHead={true}
            columns={columns}
            data={foto.data}
            paginationComponentOptions={paginationComponentOptions}
            paginationPerPage={15}
            pagination
            highlightOnHover
            noDataComponent={<NoDataComp />}
          />
        </div>
      </div>
    </div>
  );
}

Index.layout = (page) => <Layout title="Foto" children={page} />;
