import React from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/inertia-react';

export default function Guest({ children }) {
  return (
    <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100 bg-fixed bg-center bg-cover bg-no-repeat px-4 lg:px-0" style={{backgroundImage: `url("/img/login7g.jpg")`}}>
      <div>
        <Link href="/">
          <img
            className="w-20 h-20 fill-current text-gray-500"
            src="/img/pemprov.png"
            alt="logo"
          />
        </Link>
      </div>

      <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden rounded-lg">
        {children}
      </div>
    </div>
  );
}
