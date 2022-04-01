import React, { useMemo } from 'react';
import Layout from '@/Components/LayoutMaster';
import { Link, usePage } from '@inertiajs/inertia-react';
import DataTable from 'react-data-table-component';
import NoDataComp from '@/Components/NoDataComp';
import { delData } from '@/helpers';
import {
  PencilAltIcon,
  TrashIcon,
  PlusCircleIcon
} from '@heroicons/react/solid';
import { Inertia } from '@inertiajs/inertia';

const paginationComponentOptions = {
  noRowsPerPage: true
};

export default function Index() {
  const { pengguna } = usePage().props;
  let rowt = 1;

  const columns = useMemo(() => [
    {
      name: '#',
      cell: (id) =>
        <span>{getRows()}</span>,
      width: '70px'
    }, 
    {
      name: 'Nama',
      selector: row => row.name
    },
    {
      name: 'Username',
      selector: row => row.username
    },
    {
      cell: (row) =>
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
        </>,
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    }
  ])

  const getRows = () => {
    if(rowt > pengguna.length)
      rowt = 1;

    return rowt++;
  }

  const edit = (id) => {
    Inertia.get(route('master.pengguna.edit', id));
  }

  const destroy = (id) => {
    delData().then((result) => {
      if (result.isConfirmed) {
        Inertia.delete(route('master.pengguna.destroy', id));
      }
    })
  }

  return (
    <div className="py-6 px-4 sm:p-6 lg:pb-8">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div className="flex-1 min-w-0 py-2">
          <h2 className="text-lg leading-6 font-medium text-gray-900">
            Pengguna
          </h2>
        </div>
        <div className="mt-4 flex sm:mt-0 sm:ml-4">
          <Link
            className="px-4 py-2 sm:order-1 sm:ml-3 btn-primary"
            href={route('master.pengguna.create')}
          >
            <PlusCircleIcon className="-ml-0.5 mr-2 h-5 w-5" aria-hidden="true" />
            <span>Tambah</span>
          </Link>
        </div>
      </div>

      <div className="mt-6 overflow-x-auto bg-white rounded shadow">
        <DataTable 
          persistTableHead={true}
          columns={columns}
          data={pengguna}
          paginationComponentOptions={paginationComponentOptions}
          paginationPerPage={15}
          pagination
          highlightOnHover
          noDataComponent={<NoDataComp />}
        />
      </div>
    </div>
  );
}

Index.layout = page => <Layout title="Master Pengguna" children={page} />;
