import React, { useMemo } from "react";
import Layout from "@/Components/Layout";
import { useForm, usePage } from "@inertiajs/inertia-react";
import TextInput from "@/Components/TextInput";
import TextAreaInput from "@/Components/TextAreaInput";
import SelectInput from "@/Components/SelectInput";
import LoadingButton from "@/Components/LoadingButton";
import { CheckCircleIcon } from "@heroicons/react/solid";

export default function Create() {
  const { data, setData, errors, post, processing } = useForm({
    title: "",
    url: "",
    tampil: "1",
  });

  function handleSubmit(e) {
    e.preventDefault();
    post(route("video.store"));
  }

  return (
    <div className="max-w-screen-xl mx-auto pb-6 px-4 sm:px-6 lg:pb-16 lg:px-8 py-6">
      <div className="pt-6 px-4 sm:p-6 lg:pb-0 bg-white rounded-lg shadow overflow-hidden">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="flex-1 min-w-0 py-2">
            <h2 className="text-lg leading-6 font-medium text-gray-900">
              Tambah Video
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
                  require={true}
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
                  label="URL"
                  name="url"
                  type="url"
                  errors={errors.url}
                  value={data.url}
                  require={true}
                  onChange={(e) => setData("url", e.target.value)}
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

Create.layout = (page) => <Layout title="Video" children={page} />;
