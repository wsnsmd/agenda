import React, { useMemo } from "react";
import Layout from "@/Components/Layout";
import { useForm, usePage } from "@inertiajs/inertia-react";
import TextInput from "@/Components/TextInput";
import SelectInput from "@/Components/SelectInput";
import LoadingButton from "@/Components/LoadingButton";
import { CheckCircleIcon } from "@heroicons/react/solid";
import FileInput from "@/Components/FileInput";

export default function Edit() {
  const { foto } = usePage().props;
  const { data, setData, errors, post, processing } = useForm({
    title: foto.title || "",
    subtitle: foto.subtitle || "",
    tampil: foto.tampil || "",
    file: "",
    _method: "PUT"
  });

  function handleSubmit(e) {
    e.preventDefault();
    post(route("foto.update", foto.id));
  }

  return (
    <div className="max-w-screen-xl mx-auto pb-6 px-4 sm:px-6 lg:pb-16 lg:px-8 py-6">
      <div className="pt-6 px-4 sm:p-6 lg:pb-0 bg-white rounded-lg shadow overflow-hidden">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="flex-1 min-w-0 py-2">
            <h2 className="text-lg leading-6 font-medium text-gray-900">
              Edit Foto
            </h2>
          </div>
        </div>
        <div className="mt-4 flex flex-col lg:flex-row">
          <div className="flex-grow space-y-6">
            <form name="createForm" onSubmit={handleSubmit} autoComplete="off">
              <div className="flex flex-wrap">
              <TextInput
                  className="w-full pb-4 lg:pr-4 lg:w-5/6"
                  label="Title"
                  name="title"
                  errors={errors.title}
                  value={data.title}
                  autoFocus
                  onChange={(e) => setData("title", e.target.value)}
                />
                <SelectInput
                  className="w-full pb-4 lg:w-1/6"
                  label="Tampil"
                  name="tampil"
                  errors={errors.tampil}
                  value={data.tampil}
                  onChange={(e) => setData("tampil", e.target.value)}
                  require={true}
                >
                  <option value="0">Tidak</option>
                  <option value="1">Ya</option>
                </SelectInput>
                <TextInput
                  className="w-full pb-4"
                  label="Subitle"
                  name="subtitle"
                  errors={errors.subtitle}
                  value={data.subtitle}
                  onChange={(e) => setData("subtitle", e.target.value)}
                />
                <FileInput
                  className="w-full pb-4 lg:w-1/2"
                  label="File (Kosongkan jika tidak ingin mengganti file)"
                  name="file"
                  accept="image/png, image/jpeg"
                  errors={errors.file}
                  value={data.file}
                  require={true}
                  onChange={lampiran => setData('file', lampiran)}
                />
              </div>
              <div className="mt-4 py-4 w-full flex justify-end sm:pl-6 border-t">
                <button
                  type="button"
                  className="ml-auto mr-2 justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  onClick={() => window.history.back()}
                >
                  Kembali
                </button>
                <LoadingButton
                  loading={processing}
                  type="submit"
                  className="px-4 py-2 btn-primary"
                >
                  <CheckCircleIcon
                    className="-ml-0.5 mr-2 h-5 w-5"
                    aria-hidden="true"
                  />
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

Edit.layout = (page) => <Layout title="Foto" children={page} />;
