import React, { useState, useEffect } from "react";
import { usePage, Link } from "@inertiajs/inertia-react";
import Pusher from "pusher-js";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, FreeMode, EffectFade } from "swiper";
import Marquee from "react-marquee-slider";
import moment from "moment";
import Clock from "react-live-clock";
import { useWindowDimensions } from "@/helpers";
import {
  ClockIcon,
  CalendarIcon,
  UserIcon,
  LocationMarkerIcon,
} from "@heroicons/react/outline";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import "swiper/css/effect-fade";

var pusher = new Pusher("9d204a3a74049db1b7f7", {
  cluster: "ap1",
});

var channel = pusher.subscribe("app-eagenda");
channel.bind("App\\Events\\Refresh", function (data) {
  if(data.page === 'foto' || data.page === 'ticker' || data.page === 'agenda')
    window.location.reload(false);
});

export default function Index() {
  const { agenda, foto, ticker } = usePage().props;
  const { height, width } = useWindowDimensions();
  const [divHeight, setDivHeight] = useState(0);

  var options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const [tgl, setTgl] = useState(
    new Date().toLocaleDateString("id-ID", options)
  );

  function getDayName(dateStr, locale = "id-ID") {
    var date = moment(dateStr, "DD-MM-YYYY").toDate();
    return date.toLocaleDateString(locale, { weekday: "long" });
  }

  useEffect(() => {
    setDivHeight(height - 200);
  }, [height]);

  const swipSlide = agenda.data.map((data) => (
    <SwiperSlide key={"agenda_" + data.id}>
      <div className="block bg-white rounded-lg shadow-md overflow-hidden h-max">
        <div className="flex w-full bg-green-900 p-2 text-white font-bold text-base">
          <span className="flex items-center mb-1">
            <CalendarIcon className="h-5 w-5 mr-2" />
            <span className="mr-2">
              {getDayName(data.tanggal)}, {data.tanggal}
            </span>
            {data.secara === "daring" ? (
              <span className="inline-block px-2 py-1 leading-none bg-green-600 text-white rounded-full font-semibold tracking-wide text-xs">
                {data.secara}
              </span>
            ) : (
              <span className="inline-block px-2 py-1 leading-none bg-red-600 text-white rounded-full font-semibold tracking-wide text-xs">
                {data.secara}
              </span>
            )}
          </span>
        </div>
        <div className="px-4 py-2">
          <h2 className="font-bold text-base">{data.title}</h2>
          <p className="text-xs">{data.keterangan}</p>
        </div>
        <div className="p-2 text-sm text-gray-700 font-bold">
          <span className="flex items-center mb-1">
            <LocationMarkerIcon className="h-4 w-4 mr-2" />
            {data.tempat}
          </span>
          <span className="flex items-center mb-1">
            <ClockIcon className="h-4 w-4 mr-2" />
            {data.jam_mulai}{" "}
            {data.jam_selesai ? "- " + data.jam_selesai : " - selesai"}
          </span>
          {data.pic && (
            <span className="flex items-center">
              <UserIcon className="h-4 w-4 mr-2" />
              {data.pic}
            </span>
          )}
        </div>
      </div>
    </SwiperSlide>
  ));

  function getSpv() {
    if (agenda.data.length >= 2) return "auto";
    else return 1;
  }

  return (
    <div className="min-h-screen min-w-screen flex flex-col justify-between">
      <header>
        <div className="grid grid-cols-5 gap-0 mb-0">
          <div className="flex w-full bg-green-800 justify-center p-2 lg:col-span-4 md:col-span-5 lg:mx-0">
            <div className="w-1/12 m-auto">
              <img
                className="w-20 h-20 fill-current text-gray-500"
                src="/img/pemprov.png"
                alt="logo"
              />
            </div>
            <div className="w-11/12 m-auto">
              <h1 className="text-3xl font-bold uppercase text-center text-white">
                Agenda Kegiatan
              </h1>
              <h1 className="text-3xl font-bold uppercase text-center text-white">
                Badan Pengembangan Sumber Daya Manusia
              </h1>
            </div>
          </div>
          <div className="hidden lg:flex justify-center p-2 bg-green-900">
            <div className="flex flex-col p-2 rounded-box text-neutral-content">
              <span className="font-mono font-extrabold text-5xl text-white">
                <Clock
                  format={"HH:mm:ss"}
                  ticking={true}
                  timezone={"Asia/Makassar"}
                />
              </span>
              <span className="text-center font-semibold text-lg text-white">
                {tgl}
              </span>
            </div>
          </div>
        </div>
      </header>
      <main className="relative flex flex-grow bg-green-600">
        <div className="grid grid-cols-5 gap-0">
          <div className="flex p-2 lg:col-span-4 md:col-span-5 bg-green-600 my-auto">
            <div className="bg-white p-2 w-full" style={{ height: divHeight }}>
              <Swiper
                modules={[Autoplay, EffectFade]}
                effect={"fade"}
                className="mySwiper"
                autoplay={{
                  delay: 5000,
                  disableOnInteraction: false,
                }}
                loop={true}
              >
                {foto.data.map((data) => (
                  <SwiperSlide key={"slide_" + data.id}>
                    <div className="relative overflow-hidden w-full h-full">
                      <img
                        src={data.file}
                        className="object-fill w-full h-full"
                      />
                      {data.title && (
                        <div className="absolute bottom-0 left-0 px-6 py-4 bg-gray-800 opacity-75 w-full">
                          <h4 className="text-lg font-bold uppercase tracking-tight text-white">
                            {data.title}
                          </h4>
                          {data.subtitle && (
                            <p className="leading-normal text-white">
                              {data.subtitle}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
          <div className="hidden lg:flex h-full p-4 bg-gray-200">
            <Swiper
              // centeredSlides={true}
              autoHeight={true}
              spaceBetween={20}
              slidesPerView="auto"
              freeMode={false}
              direction="vertical"
              modules={[Autoplay, Pagination, FreeMode]}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              loop={agenda.data.length > 3 ? true : false}
              loopedSlides={agenda.data.length > 3 ? agenda.data.length : null}
            >
              {swipSlide}
            </Swiper>
          </div>
        </div>
      </main>
      <footer className="">
        <div className="grid grid-cols-5 gap-0">
          <div className="flex overflow-x-hidden whitespace-no-wrap w-full px-2 py-2 lg:col-span-4 md:col-span-5 bg-gray-50 text-gray-800 font-bold text-2xl">
            <Marquee velocity={25}>
              {ticker.data.map((data) => (
                <span
                  key={"ticker_" + data.id}
                  className="flex align-middle mr-2"
                >
                  <img className="w-8 h-8 mr-2" src="/img/pemprov.png" />
                  {data.title}
                </span>
              ))}
            </Marquee>
          </div>
          <div className="hidden lg:flex overflow-x-hidden whitespace-no-wrap w-full px-2 py-2 bg-green-900 font-bold">
            <div className="flex items-center justify-center w-full">
              <div
                className="inline-flex shadow-md hover:shadow-lg focus:shadow-lg"
                role="group"
              >
                <Link
                  href="/"
                  method="get"
                  as="button"
                  type="button"
                  className="btn-group-fr"
                >
                  1
                </Link>
                <Link
                  href="/index/foto"
                  method="get"
                  as="button"
                  type="button"
                  className="btn-group-fr mx-2"
                >
                  2
                </Link>
                <Link
                  href="/index/video"
                  method="get"
                  as="button"
                  type="button"
                  className="btn-group-fr"
                >
                  3
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
