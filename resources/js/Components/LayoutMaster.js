import Helmet from 'react-helmet';
import Navbar from './Navbar';
import { Link } from '@inertiajs/inertia-react';
import {
  CogIcon,
  UserCircleIcon,
} from '@heroicons/react/outline';

const subNavigation = [
  { name: 'Bidang', href: '#', route: 'master.bidang.index', icon: UserCircleIcon, current: 'master.bidang' },
  { name: 'Pengguna', href: '#', route: 'master.pengguna.index', icon: CogIcon, current: 'master.pengguna' },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Layout({ title, children }) {
  return (
    <>
      <Helmet titleTemplate="%s | BPSDM Prov. Kaltim" title={title} />
      <div className="min-h-screen bg-fixed bg-center bg-cover bg-no-repeat scrollbar-thin scrollbar-thumb-green-600 scrollbar-track-gray-100 h-32 overflow-y-scroll" style={{backgroundImage: `url("/img/login7g.jpg")`}}>
        <Navbar />

        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
            <h1 className="text-lg leading-6 font-semibold text-gray-900">
              {title}
            </h1>
          </div>
        </header>
        <main>
          <div className="max-w-screen-xl mx-auto pb-6 px-4 sm:px-6 lg:pb-16 lg:px-8 py-6">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="divide-y divide-gray-200 lg:grid lg:grid-cols-12 lg:divide-y-0 lg:divide-x">
                <aside className="py-6 lg:col-span-2">
                  <nav>
                    {subNavigation.map(item => (
                      <Link
                        key={item.name}
                        href={route(item.route)}
                        className={classNames(
                          route().current(item.current + '*')
                            ? 'bg-green-50 border-green-500 text-green-700 hover:bg-green-50 hover:text-green-700'
                            : 'border-transparent text-gray-900 hover:bg-gray-50 hover:text-gray-900',
                          'group border-l-4 px-3 py-3 flex items-center text-sm font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        <item.icon
                          className={classNames(
                            route().current(item.current + '*')
                              ? 'text-green-500 group-hover:text-green-500'
                              : 'text-gray-400 group-hover:text-gray-500',
                            'flex-shrink-0 -ml-1 mr-3 h-6 w-6'
                          )}
                          aria-hidden="true"
                        />
                        <span className="truncate">{item.name}</span>
                      </Link>
                    ))}
                  </nav>
                </aside>

                <div className="divide-y divide-gray-200 lg:col-span-10">
                  {children}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
