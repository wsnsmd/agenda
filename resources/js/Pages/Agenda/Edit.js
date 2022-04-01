import React, { useMemo } from "react";
import Layout from "@/Components/Layout";
import { useForm, usePage } from "@inertiajs/inertia-react";
import TextInput from "@/Components/TextInput";
import TextAreaInput from "@/Components/TextAreaInput";
import SelectInput from "@/Components/SelectInput";
import LoadingButton from "@/Components/LoadingButton";
import { CheckCircleIcon } from "@heroicons/react/solid";

export default function Edit() {
  const { agenda, bidang } = usePage().props;
  const { data, setData, errors, post, processing } = useForm({
    bidang_id: agenda.bidang_id || "",
    title: agenda.title || "",
    tempat: agenda.tempat || "",
    tanggal: agenda.tanggal || "",
    jam_mulai: agenda.jam_mulai || "",
    jam_selesai: agenda.jam_selesai || "",
    secara: agenda.secara || "",
    pic: agenda.pic || "",
    keterangan: agenda.keterangan || "",
    _method: "PUT"
  });

  function handleSubmit(e) {
    e.preventDefault();
    post(route("agenda.update", agenda.id));
  }

  return (
    <div className="max-w-screen-xl mx-auto pb-6 px-4 sm:px-6 lg:pb-16 lg:px-8 py-6">
      <div className="pt-6 px-4 sm:p-6 lg:pb-0 bg-white rounded-lg shadow overflow-hidden">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="flex-1 min-w-0 py-2">
            <h2 className="text-lg leading-6 font-medium text-gray-900">
              Edit Agenda
            </h2>
          </div>
        </div>
        <div className="mt-4 flex flex-col lg:flex-row">
          <div className="flex-grow space-y-6">
            <form name="createForm" onSubmit={handleSubmit} autoComplete="off">
              <div className="flex flex-wrap">
                <TextInput
                  className="w-full pb-4 lg:pr-4 lg:w-4/6"
                  label="Title"
                  name="title"
                  errors={errors.title}
                  value={data.title}
                  require={true}
                  onChange={(e) => setData("title", e.target.value)}
                />
                <SelectInput
                  className="w-full pb-4 lg:w-2/6"
                  label="Bidang"
                  name="bidang"
                  errors={errors.bidang_id}
                  value={data.bidang_id}
                  onChange={(e) => setData("bidang_id", e.target.value)}
                  require={true}
                >
                  <option value="" disabled>
                    -- Pilih Bidang --
                  </option>
                  {bidang.map(({ id, nama }) => {
                    return (
                      <option value={id} key={id}>
                        {nama}
                      </option>
                    );
                  })}
                </SelectInput>
                <TextInput
                  className="w-full pb-4 lg:pr-4 lg:w-4/6"
                  label="Tempat"
                  name="tempat"
                  errors={errors.tempat}
                  value={data.tempat}
                  require={true}
                  onChange={(e) => setData("tempat", e.target.value)}
                />
                <SelectInput
                  className="w-full pb-4 lg:w-2/6"
                  label="Secara"
                  name="secara"
                  errors={errors.secara}
                  value={data.secara}
                  onChange={(e) => setData("secara", e.target.value)}
                  require={true}
                >
                  <option value="daring">Daring</option>
                  <option value="luring">Luring</option>
                </SelectInput>
                <TextInput
                  className="w-full pb-4 lg:pr-4 lg:w-2/6"
                  type="date"
                  label="Tanggal"
                  name="tanggal"
                  errors={errors.tanggal}
                  value={data.tanggal}
                  require={true}
                  onChange={(e) => setData("tanggal", e.target.value)}
                />
                <TextInput
                  className="w-full pb-4 lg:pr-4 lg:w-1/6"
                  type="time"
                  label="Jam Mulai"
                  name="jam_mulai"
                  errors={errors.jam_mulai}
                  value={data.jam_mulai}
                  require={true}
                  onChange={(e) => setData("jam_mulai", e.target.value)}
                />
                <TextInput
                  className="w-full pb-4 lg:pr-4 lg:w-1/6"
                  type="time"
                  label="Jam Selesai"
                  name="jam_selesai"
                  errors={errors.jam_selesai}
                  value={data.jam_selesai}
                  require={false}
                  onChange={(e) => setData("jam_selesai", e.target.value)}
                />
                <TextInput
                  className="w-full pb-4 lg:w-2/6"
                  label="PIC"
                  name="pic"
                  errors={errors.pic}
                  value={data.pic}
                  require={false}
                  onChange={(e) => setData("pic", e.target.value)}
                />
                <TextAreaInput
                  className="w-full pb-4"
                  label="Keterangan"
                  name="keterangan"
                  rows="4"
                  errors={errors.keterangan}
                  value={data.keterangan}
                  onChange={(e) => setData("keterangan", e.target.value)}
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

Edit.layout = (page) => <Layout title="Agenda" children={page} />;
