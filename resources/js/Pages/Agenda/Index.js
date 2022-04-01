import React, { useMemo, FC } from "react";
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

const ExpandedComponent = ({ data }) => (
  <>
    <p className="pl-4 py-2 text-sm">
      <span className="font-bold text-sm">PIC: </span>
      {data.pic}
    </p>
    <p className="pl-4 pb-2 text-sm">
      <span className="font-bold text-sm">Keterangan: </span>
      {data.keterangan}
    </p>
  </>
);

export default function Index() {
  const { agenda } = usePage().props;
  let rowt = 1;

  const columns = useMemo(() => [
    {
      name: "#",
      cell: (id) => <span>{getRows()}</span>,
      width: "70px",
    },
    {
      name: "Tanggal",
      selector: (row) => row.tanggal,
      width: "120px",
    },
    {
      name: "jam",
      cell: (row) => (
        <>
          <span>
            {row.jam_mulai} {row.jam_selesai && "- " + row.jam_selesai}
          </span>
        </>
      ),
      width: "130px",
    },
    {
      name: "Title",
      selector: (row) => row.title,
      wrap: true,
    },
    {
      name: "Bidang",
      selector: (row) => row.bidang.nama,
      wrap: true,
    },
    {
      cell: (row) => (
        <>
          <span
            tabIndex="-1"
            className="flex items-center px-6 py-3 focus:text-yellow focus:outline-none"
          >
            {row.secara==="daring" ? (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Daring
              </span>
            ) : (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                Luring
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
    if (rowt > agenda.length) rowt = 1;

    return rowt++;
  };

  const edit = (id) => {
    Inertia.get(route("agenda.edit", id));
  };

  const destroy = (id) => {
    delData().then((result) => {
      if (result.isConfirmed) {
        Inertia.delete(route("agenda.destroy", id));
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
              href={route("agenda.create")}
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
            data={agenda.data}
            paginationComponentOptions={paginationComponentOptions}
            paginationPerPage={15}
            pagination
            highlightOnHover
            noDataComponent={<NoDataComp />}
            expandableRows
            expandOnRowClicked={true}
            expandableRowsHideExpander={true}
            expandableRowsComponent={ExpandedComponent}
          />
        </div>
      </div>
    </div>
  );
}

Index.layout = (page) => <Layout title="Agenda" children={page} />;
