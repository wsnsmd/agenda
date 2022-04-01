import React, { useState } from "react";
import { usePage } from "@inertiajs/inertia-react";
import Pusher from "pusher-js";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, FreeMode, EffectFade } from "swiper";
import Marquee from "react-marquee-slider";
import moment from "moment";
import Clock from "react-live-clock";
import {
  ClockIcon,
  CalendarIcon,
  UserIcon,
  LocationMarkerIcon,
} from "@heroicons/react/outline";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

// Pusher.logToConsole = true;

var pusher = new Pusher("9d204a3a74049db1b7f7", {
  cluster: "ap1",
});

var channel = pusher.subscribe("app-eagenda");
channel.bind("App\\Events\\Refresh", function (data) {
  // alert(JSON.stringify(data));
  window.location.reload(false);
});

export default function Index() {
  const { agenda, foto, ticker } = usePage().props;

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
    var date = new Date(moment(dateStr, "YYYY-mm-dd"));
    return date.toLocaleDateString(locale, { weekday: "long" });
  }

  const swipSlide = agenda.data.map((data) => (
    <SwiperSlide key={"agenda_" + data.id}>
      <div className="block bg-white rounded-lg shadow-md overflow-hidden h-max">
        <div className="flex w-full bg-gray-600 p-2 text-white font-bold text-xs">
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
          <h2 className="font-bold text-sm">{data.title}</h2>
          <p className="text-xs my-2">{data.keterangan}</p>
        </div>
        <div className="p-4 border-t text-xs text-gray-700">
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

  return (
    <div
      className="min-h-screen flex flex-col justify-center py-6 sm:px-6 lg:px-8 bg-fixed bg-center bg-cover bg-no-repeat"
      style={{ backgroundImage: `url("/img/login7g.jpg")` }}
    >
      <div className="container mx-auto">
        <div className="grid grid-cols-4 gap-0 mb-0">
          <div className="flex w-full bg-green-800 justify-center rounded-tl-lg p-2 col-span-3 lg:mx-0">
            <div className="w-1/12 m-auto">
              <img
                className="w-20 h-20 fill-current text-gray-500"
                src="/img/pemprov.png"
                alt="logo"
              />
            </div>
            <div className="w-11/12 m-auto">
              <h1 className="text-2xl font-bold uppercase text-center text-white">
                Agenda Kegiatan
              </h1>
              <h1 className="text-2xl font-bold uppercase text-center text-white">
                Badan Pengembangan Sumber Daya Manusia
              </h1>
            </div>
          </div>
          <div className="flex justify-center rounded-tr-lg p-2 bg-gray-800 lg:max-w-xs">
            <div className="flex flex-col p-2 rounded-box text-neutral-content">
              <span className="font-mono text-5xl text-white">
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
        <div className="grid grid-cols-4 gap-0">
          <div className="flex justify-center p-2 col-span-3 lg:mx-0 h-[36rem] bg-green-600">
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
                    <img src={data.file} className="object-cover" />
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
          <div className="flex justify-center p-4 bg-gray-200 lg:max-w-xs">
            <Swiper
              // centeredSlides={true}
              autoHeight={true}
              spaceBetween={20}
              slidesPerView="auto"
              freeMode={true}
              direction="vertical"
              modules={[Autoplay, Pagination, FreeMode]}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              loop={true}
            >
              {swipSlide}
            </Swiper>
          </div>
          <div className="flex overflow-x-hidden whitespace-no-wrap w-full px-2 py-2 col-span-3 bg-gray-50 text-gray-800 font-bold">
            <Marquee velocity={25}>
              {ticker.data.map((data) => (
                <span
                  key={"ticker_" + data.id}
                  className="flex align-middle mr-2"
                >
                  <img className="w-6 h-6 mr-2" src="/img/pemprov.png" />
                  {data.title}
                </span>
              ))}
            </Marquee>
          </div>
          <div className="flex overflow-x-hidden whitespace-no-wrap w-full px-2 py-2 bg-gray-600 font-bold lg:max-w-xs">
            {" "}
          </div>
        </div>
      </div>
    </div>
  );
}
