import React, { useMemo } from 'react';
import Layout from '@/Components/LayoutMaster';
import { useForm } from '@inertiajs/inertia-react';
import TextInput from '@/Components/TextInput';
import LoadingButton from '@/Components/LoadingButton';
import {
  CheckCircleIcon
} from '@heroicons/react/solid';

export default function Create() {
  const { data, setData, errors, post, processing } = useForm({
    nama: '',
    keterangan: '',
  });

  function handleSubmit(e) {
    e.preventDefault();
    post(route('master.bidang.store'));
  }

  return (
    <div className="py-6 px-4 sm:p-6 lg:pb-8">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div className="flex-1 min-w-0 py-2">
          <h2 className="text-lg leading-6 font-medium text-gray-900">
            Tambah Bidang
          </h2>
        </div>
      </div>

      <div className="mt-6 overflow-x-auto bg-white rounded shadow">
      <div className="mt-6 flex flex-col lg:flex-row">
        <div className="flex-grow space-y-6">
          <form name="createForm" onSubmit={handleSubmit} autoComplete="off">
            <div className="flex flex-wrap">
              <TextInput
                className="w-full pb-4 px-6 lg:w-1/2"
                label="Nama"
                name="nama"
                errors={errors.nama}
                value={data.nama}
                require={true}
                onChange={e => setData('nama', e.target.value)}
              />
              <TextInput
                className="w-full pb-4 px-6"
                label="Keterangan"
                name="keterangan"
                errors={errors.keterangan}
                value={data.keterangan}
                onChange={e => setData('keterangan', e.target.value)}
              />
            </div>
            <div className="mt-4 py-4 w-full flex justify-end sm:px-6 border-t bg-gray-50">
              <LoadingButton
                loading={processing}
                type="submit"
                className="px-4 py-2 btn-primary"
              >
                <CheckCircleIcon className="-ml-0.5 mr-2 h-5 w-5" aria-hidden="true" />
                Simpan
              </LoadingButton>
            </div>
          </form>
        </div>
      </div>
      </div>
    </div>
  );
}

Create.layout = page => <Layout title="Master Bidang" children={page} />;
