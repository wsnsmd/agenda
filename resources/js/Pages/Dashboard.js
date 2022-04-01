import React from 'react';
import { usePage } from '@inertiajs/inertia-react';
import Layout from '@/Components/Layout';
import { DotsVerticalIcon } from '@heroicons/react/solid';
import classNames from 'classnames';


export default function Dashboard() {
  return (
    <div className="max-w-screen-xl mx-auto pb-6 px-4 sm:px-6 lg:pb-16 lg:px-8 py-6">
      <div className="bg-white rounded-lg shadow overflow-hidden p-6">
        <h2 className="text-gray-500 text-xs font-medium uppercase tracking-wide">Statistik</h2>
        <div className="lg:grid lg:grid-cols-1 lg:gap-6">
          <div className="mt-5 grid grid-cols-1 gap-5 lg:col-span-4">
            <div className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
              Dashboard
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Dashboard.layout = page => <Layout title="Dashboard" children={page} />;
