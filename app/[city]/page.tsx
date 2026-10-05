import React from 'react';
import { Metadata } from 'next';
import { fetchWeather, searchLocation, WEATHER_INTERPRETATION, WeatherData } from '@/lib/weather';
import { 
  Wind, 
  Droplets, 
  Sun, 
  Cloud, 
  CloudSun, 
  CloudFog, 
  CloudDrizzle, 
  CloudRain, 
  Snowflake, 
  CloudLightning,
  MapPin,
  ArrowLeft
} from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Sun,
  CloudSun,
  Cloud,
  CloudFog,
  CloudDrizzle,
  CloudRain,
  Snowflake,
  CloudLightning,
};

interface Props {
  params: Promise<{ city: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city } = await params;
  const decodedCity = decodeURIComponent(city);
  const capitalizedCity = decodedCity.charAt(0).toUpperCase() + decodedCity.slice(1).toLowerCase();

  return {
    title: `Weather in ${capitalizedCity} Today - SkyCast Real-Time Forecast`,
    description: `Get real-time weather updates, temperature, AQI, and 7-day forecast for ${capitalizedCity}. Stay updated with SkyCast's high-precision meteorological intelligence.`,
    keywords: [`weather in ${capitalizedCity}`, `${capitalizedCity} weather today`, `tomorrow weather ${capitalizedCity}`, `SkyCast ${capitalizedCity}`],
    alternates: {
      canonical: `/${city.toLowerCase()}`,
    },
  };
}

export default async function WeatherCityPage({ params }: Props) {
  const { city } = await params;
  const decodedCity = decodeURIComponent(city);
  
  let weather: WeatherData | null = null;
  let locationName = decodedCity;
  let error: string | null = null;

  try {
    const searchRes = await searchLocation(decodedCity);
    if (searchRes.results && searchRes.results.length > 0) {
      const loc = searchRes.results[0];
      weather = await fetchWeather(loc.latitude, loc.longitude);
      locationName = [loc.name, loc.admin1, loc.country].filter(Boolean).join(', ');
    } else {
      error = "Location not found";
    }
  } catch (e) {
    error = "Failed to load weather data";
  }

  if (error || !weather) {
    return (
      <div className="min-h-screen bg-[#020603] text-slate-100 flex flex-col items-center justify-center p-6">
        <h1 className="text-3xl font-black mb-4">Error</h1>
        <p className="text-slate-400 mb-8">{error || "Could not find weather data for this city."}</p>
        <Link href="/" className="bg-emerald-500 text-[#020603] px-6 py-3 rounded-full font-black">
          Back to Home
        </Link>
      </div>
    );
  }

  const currentIcon = WEATHER_INTERPRETATION[weather.current.weather_code] || { label: 'Unknown', icon: 'Cloud' };
  const tomorrowIcon = WEATHER_INTERPRETATION[weather.daily.weather_code[1]] || { label: 'Unknown', icon: 'Cloud' };
  const TomorrowIconComponent = ICONS[tomorrowIcon.icon] || Cloud;
  const IconComponent = ICONS[currentIcon.icon] || Cloud;

  const popularCities = [
    'Katni', 'Rewa', 'Satna', 'Sambalpur', 'Koraput', 'Dindigul', 'Kurnool', 'Nizamabad', 
    'Ujjain', 'Ratlam', 'Chhindwara', 'Balaghat', 'Jhansi', 'Alwar', 'Bharatpur', 'Silchar', 
    'Tezpur', 'Tura', 'Agartala', 'Aizawl', 'Dimapur', 'Imphal', 'Itanagar', 'Gangtok', 
    'Ooty', 'Coonoor', 'Madurai', 'Tirunelveli', 'Vellore', 'Salem', 'Hubli', 'Belgaum', 
    'Davanagere', 'Mysore', 'Gulbarga', 'Solapur', 'Kolhapur', 'Sangli', 'Akola', 'Amravati', 
    'Jalgaon', 'Bhusawal', 'Deoghar', 'Dhanbad', 'Ranchi', 'Bokaro', 'Gaya', 'Muzaffarpur', 
    'Darbhanga', 'Purnia'
  ];

  // Pick 8 cities for internal linking, excluding current, using deterministic slice
  const cityIndex = popularCities.findIndex(c => c.toLowerCase() === decodedCity.toLowerCase());
  const start = cityIndex === -1 ? 0 : (cityIndex + 1) % popularCities.length;
  const relatedCities = [...popularCities.slice(start), ...popularCities.slice(0, start)]
    .filter(c => c.toLowerCase() !== decodedCity.toLowerCase())
    .slice(0, 8);

  return (
    <main className="min-h-screen bg-[#020603] text-slate-100 font-sans p-4 md:p-8 flex flex-col items-center relative isolation-auto">
      {/* JSON-LD Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@context': 'https://schema.org',
                '@type': 'BreadcrumbList',
                'itemListElement': [
                  {
                    '@type': 'ListItem',
                    'position': 1,
                    'name': 'SkyCast Weather Dashboard',
                    'item': 'https://skycast-wd.vercel.app'
                  },
                  {
                    '@type': 'ListItem',
                    'position': 2,
                    'name': `${locationName} Weather Today`,
                    'item': `https://skycast-wd.vercel.app/${city.toLowerCase()}`
                  }
                ]
              },
              {
                '@context': 'https://schema.org',
                '@type': 'WebApplication',
                '@id': `https://skycast-wd.vercel.app/${city.toLowerCase()}#webapp`,
                'url': `https://skycast-wd.vercel.app/${city.toLowerCase()}`,
                'name': `Weather in ${locationName} Today - SkyCast`,
                'applicationCategory': 'WeatherApplication',
                'operatingSystem': 'All',
                'description': `Get real-time weather updates, temperature, AQI, and 7-day forecast for ${locationName}. Stay updated with SkyCast's high-precision meteorological intelligence.`,
                'browserRequirements': 'Requires HTML5 support',
                'offers': {
                  '@type': 'Offer',
                  'price': '0',
                  'priceCurrency': 'INR'
                }
              }
            ]
          })
        }}
      />

      {/* Background */}
      <div className="fixed inset-0 overflow-hidden -z-10">
        <div className="liquid-glow w-[500px] h-[500px] bg-emerald-600/10 -top-20 -left-20" />
      </div>

      <Header />

      <div className="w-full max-w-4xl my-6">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors font-bold mb-8 group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          Back to Dashboard
        </Link>

        <div className="mb-12">
          <div className="flex items-center gap-2 text-emerald-400 mb-2 font-bold uppercase tracking-widest text-sm">
            <MapPin size={16} />
            {locationName}
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter">
            Weather in {locationName} Today
          </h1>
        </div>

        {/* Current Weather Section */}
        <section className="liquid-glass p-8 md:p-12 rounded-[40px] mb-12 flex flex-col md:flex-row items-center justify-between gap-8 border-l-4 border-emerald-500">
          <div>
            <h2 className="text-xl font-black uppercase tracking-widest text-slate-500 mb-4">Current Weather</h2>
            <div className="text-7xl md:text-8xl font-black tracking-tighter mb-4">
              {Math.round(weather.current.temperature_2m)}°
            </div>
            <p className="text-2xl font-bold text-slate-300">{currentIcon.label}</p>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-emerald-500/20 blur-[80px] rounded-full" />
            <IconComponent className="w-32 h-32 md:w-48 md:h-48 text-emerald-400 relative z-10" />
          </div>
        </section>

        {/* Tomorrow Weather Section */}
        <section className="liquid-glass p-8 md:p-12 rounded-[40px] mb-12 border-l-4 border-blue-500">
          <h2 className="text-xl font-black uppercase tracking-widest text-slate-500 mb-6">Tomorrow Weather in {locationName}</h2>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <TomorrowIconComponent className="w-16 h-16 text-blue-400" />
              <div>
                <p className="text-3xl font-black">{Math.round(weather.daily.temperature_2m_max[1])}° / {Math.round(weather.daily.temperature_2m_min[1])}°</p>
                <p className="text-slate-400 font-bold">{tomorrowIcon.label}</p>
              </div>
            </div>
            <div className="hidden md:block text-right">
              <p className="text-slate-500 text-sm font-bold uppercase tracking-widest">Precipitation</p>
              <p className="text-xl font-black text-blue-400">{weather.daily.precipitation_probability_max[1]}%</p>
            </div>
          </div>
        </section>

        {/* 7-Day Forecast Section */}
        <section className="liquid-glass p-8 rounded-[40px] mb-12">
          <h2 className="text-xl font-black uppercase tracking-widest text-slate-500 mb-8 px-4">7-Day Forecast</h2>
          <div className="grid grid-cols-1 gap-2">
            {weather.daily.time.map((time, idx) => {
              const dayIcon = WEATHER_INTERPRETATION[weather.daily.weather_code[idx]] || { label: 'Unknown', icon: 'Cloud' };
              const DayIconComp = ICONS[dayIcon.icon] || Cloud;
              return (
                <div key={time} className="flex items-center justify-between p-4 rounded-2xl hover:bg-white/[0.03] transition-all border border-transparent hover:border-white/10 group">
                  <span className="w-24 text-sm text-slate-400 font-bold uppercase tracking-tighter">
                    {idx === 0 ? 'Today' : new Date(time).toLocaleDateString('en-US', { weekday: 'long' })}
                  </span>
                  <div className="flex items-center gap-4 flex-1 justify-center">
                    <DayIconComp className="w-6 h-6 text-emerald-400" />
                    <span className="text-xs font-bold text-slate-500 hidden md:block">{dayIcon.label}</span>
                  </div>
                  <div className="flex items-center gap-4 w-24 justify-end">
                    <span className="font-black text-slate-100">{Math.round(weather.daily.temperature_2m_max[idx])}°</span>
                    <span className="text-slate-500 text-sm font-bold">{Math.round(weather.daily.temperature_2m_min[idx])}°</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* SEO Content */}
        <article className="liquid-glass p-8 md:p-12 rounded-[40px] mb-12">
          <h2 className="text-2xl font-black mb-6 bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent uppercase tracking-tight">
            Comprehensive Weather Intelligence for {locationName}
          </h2>
          <div className="prose prose-invert max-w-none text-slate-300 font-bold space-y-4 text-sm md:text-base leading-relaxed">
            <p>
              Looking for the most accurate <strong>weather in {locationName} today</strong>? SkyCast provides real-time atmospheric data sourced from high-precision meteorological models. Currently, the temperature in {locationName} is approximately {Math.round(weather.current.temperature_2m)}°C with {currentIcon.label.toLowerCase()} conditions and {weather.current.relative_humidity_2m}% humidity.
            </p>
            <p>
              Our localized forecast for {locationName} includes critical metrics such as wind speed ({weather.current.wind_speed_10m} km/h), visibility ({weather.current.visibility / 1000} km), and precipitation levels. Whether you are planning a commute or an outdoor event, staying updated with the <strong>tomorrow weather {locationName}</strong> report is essential for seamless planning.
            </p>
            <p>
              The air quality (AQI) in the region is also monitored to ensure you have the latest information on atmospheric safety. SkyCast utilizes advanced data processing to interpret weather patterns, giving you a competitive edge in weather intelligence. Our 7-day forecast helps you stay ahead of changing conditions in {locationName}.
            </p>
            <p>
              SkyCast is committed to providing premium weather services without the clutter. Our interface is optimized for both mobile and desktop users, ensuring that you get the <strong>weather in {locationName}</strong> whenever and wherever you need it. Check back frequently for the latest meteorological updates and stay ahead of the sky.
            </p>
          </div>
        </article>

        {/* Related Cities Internal Linking */}
        <section className="mb-12">
          <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-600 mb-6 px-2">Weather in Nearby Cities</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {relatedCities.map((city) => (
              <Link 
                key={city} 
                href={`/${city.toLowerCase()}`}
                className="liquid-glass p-4 rounded-2xl text-center text-sm font-bold text-slate-400 hover:text-emerald-400 hover:border-emerald-500/30 transition-all"
              >
                {city}
              </Link>
            ))}
          </div>
        </section>

        {/* Basic Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { label: 'Wind', value: `${weather.current.wind_speed_10m} km/h`, icon: Wind },
            { label: 'Humidity', value: `${weather.current.relative_humidity_2m}%`, icon: Droplets },
            { label: 'Pressure', value: `${weather.current.surface_pressure} hPa`, icon: Sun },
            { label: 'Visibility', value: `${weather.current.visibility / 1000} km`, icon: Cloud },
          ].map((stat, i) => (
            <div key={i} className="liquid-glass p-6 rounded-3xl flex flex-col items-center text-center">
              <stat.icon className="text-emerald-400 mb-3" size={24} />
              <span className="text-slate-500 text-xs uppercase font-bold tracking-widest mb-1">{stat.label}</span>
              <span className="text-xl font-black">{stat.value}</span>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </main>
  );
}
