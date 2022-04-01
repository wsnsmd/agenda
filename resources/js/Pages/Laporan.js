import React from 'react';
import { usePage } from '@inertiajs/inertia-react';
import Layout from '@/Components/Layout';

export default function Laporan() {
  return (
    <div className="max-w-screen-xl mx-auto pb-6 px-4 sm:px-6 lg:pb-16 lg:px-8 py-6">
      <div className="bg-white rounded-lg shadow overflow-hidden p-6">
        <div className="lg:grid lg:grid-cols-1 lg:gap-6">
          <div className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
            Laporan
          </div>
        </div>
      </div>
    </div>
  );
}

Laporan.layout = page => <Layout title="Laporan" children={page} />;
