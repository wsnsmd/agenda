import Layout from '@/Components/Layout';
import {
  BellIcon,
  CogIcon,
  CreditCardIcon,
  KeyIcon,
  UserCircleIcon,
  ViewGridAddIcon,
} from '@heroicons/react/outline';

const subNavigation = [
  { name: 'Bidang', href: '#', icon: UserCircleIcon, current: true },
  { name: 'Pengguna', href: '#', icon: CogIcon, current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Master({children}) {
  return (
    <div className="max-w-screen-xl mx-auto pb-6 px-4 sm:px-6 lg:pb-16 lg:px-8 py-6">
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="divide-y divide-gray-200 lg:grid lg:grid-cols-12 lg:divide-y-0 lg:divide-x">
          <aside className="py-6 lg:col-span-3">
            <nav className="space-y-1">
              {subNavigation.map(item => (
                <a
                  key={item.name}
                  href={item.href}
                  className={classNames(
                    item.current
                      ? 'bg-teal-50 border-teal-500 text-teal-700 hover:bg-teal-50 hover:text-teal-700'
                      : 'border-transparent text-gray-900 hover:bg-gray-50 hover:text-gray-900',
                    'group border-l-4 px-3 py-2 flex items-center text-sm font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  <item.icon
                    className={classNames(
                      item.current
                        ? 'text-teal-500 group-hover:text-teal-500'
                        : 'text-gray-400 group-hover:text-gray-500',
                      'flex-shrink-0 -ml-1 mr-3 h-6 w-6'
                    )}
                    aria-hidden="true"
                  />
                  <span className="truncate">{item.name}</span>
                </a>
              ))}
            </nav>
          </aside>

          <div
            className="divide-y divide-gray-200 lg:col-span-9"
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

Master.layout = page => <Layout title="Master" children={page} />;
