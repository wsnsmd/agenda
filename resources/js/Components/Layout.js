import Helmet from 'react-helmet';
import Navbar from './Navbar';

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
        <main>{children}</main>
      </div>
    </>
  );
}
