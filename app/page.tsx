'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Search, 
  MapPin, 
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
  Navigation,
  Loader2,
  Activity,
  Eye,
  Gauge,
  Sunrise,
  Sunset
} from 'lucide-react';
import { WEATHER_INTERPRETATION, WeatherData, GeocodeResult } from '@/lib/weather';
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

interface AQIStatus {
  label: string;
  color: string;
  bg: string;
}

const getAQIStatus = (aqi: number): AQIStatus => {
  if (aqi <= 50) return { label: 'Good', color: 'text-green-400', bg: 'bg-green-400/10' };
  if (aqi <= 100) return { label: 'Moderate', color: 'text-yellow-400', bg: 'bg-yellow-400/10' };
  if (aqi <= 150) return { label: 'Unhealthy for Sensitive Groups', color: 'text-orange-400', bg: 'bg-orange-400/10' };
  if (aqi <= 200) return { label: 'Unhealthy', color: 'text-red-400', bg: 'bg-red-400/10' };
  if (aqi <= 300) return { label: 'Very Unhealthy', color: 'text-purple-400', bg: 'bg-purple-400/10' };
  return { label: 'Hazardous', color: 'text-gray-400', bg: 'bg-gray-400/10' };
};

interface WeatherIconProps {
  code: number;
  className?: string;
}

const WeatherIcon: React.FC<WeatherIconProps> = ({ code, className }) => {
  const info = WEATHER_INTERPRETATION[code] || { label: 'Unknown', icon: 'Cloud' };
  const IconComponent = ICONS[info.icon] || Cloud;
  return <IconComponent className={className} />;
};

export default function Home() {
  const [query, setQuery] = useState<string>('');
  const [suggestions, setSuggestions] = useState<GeocodeResult[]>([]);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [location, setLocation] = useState<{ name: string; lat: number; lon: number } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loadingMessage, setLoadingMessage] = useState<string>('Detecting location...');
  const [showAllCities, setShowAllCities] = useState(false);

  const fetchWeatherData = useCallback(async (lat: number, lon: number, name: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/weather?lat=${lat}&lon=${lon}`);
      const data: WeatherData = await response.json();
      if ((data as any).error) throw new Error((data as any).error);
      setWeather(data);
      
      let displayName = (name === 'Your Location' && data.resolved_name) ? data.resolved_name : name;
      
      // Ensure proper title casing just in case (e.g. bhawanipatna -> Bhawanipatna)
      displayName = displayName.split(', ').map(part => part.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ')).join(', ');
      
      setLocation({ name: displayName, lat, lon });
      setSuggestions([]);
      setQuery(displayName);
    } catch (err) {
      setError('Could not fetch weather data. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (query.length > 2) {
        try {
          const response = await fetch(`/api/geocode?q=${query}`);
          const data = await response.json();
          if (data.results && data.results.length > 0) {
            setSuggestions(data.results);
            setError(null);
          } else {
            setSuggestions([]);
          }
        } catch (err) {
          console.error('Search failed:', err);
        }
      } else {
        setSuggestions([]);
      }
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  const router = useRouter();

  const handleSearch = async (e?: React.FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault();
    if (!query.trim()) return;
    
    try {
      const response = await fetch(`/api/geocode?q=${query}`);
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        const top = data.results[0];
        router.push(`/${top.name.toLowerCase()}`);
      } else {
        setError('Location not found.');
      }
    } catch (err) {
      setError('Search failed. Please try again.');
    }
  };

  const handleUseLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        await fetchWeatherData(latitude, longitude, 'Your Location');
      },
      () => {
        setError('Unable to retrieve your location.');
        setLoading(false);
      }
    );
  };

  useEffect(() => {
    const initApp = () => {
      if (typeof window !== 'undefined' && navigator.geolocation) {
        setLoadingMessage('Locating your position...');
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            setLoadingMessage('Fetching local forecast...');
            await fetchWeatherData(latitude, longitude, 'Your Location');
          },
          async () => {
            setLoadingMessage('Using Delhi as default...');
            await fetchWeatherData(28.6139, 77.2090, 'Delhi, India');
          },
          { timeout: 5000, enableHighAccuracy: false }
        );
      } else {
        fetchWeatherData(28.6139, 77.2090, 'Delhi, India');
      }
    };

    const timer = setTimeout(initApp, 0);
    return () => clearTimeout(timer);
  }, [fetchWeatherData]);

  const aqiInfo = weather?.aqi?.current ? getAQIStatus(weather.aqi.current.us_aqi) : null;

  return (
    <main id="sky-cast-root" className="min-h-screen bg-[#020603] text-slate-100 font-sans p-4 md:p-8 flex flex-col items-center relative isolation-auto">
      {/* Liquid Background Blobs */}
      <div className="fixed inset-0 overflow-hidden -z-10">
        <div className="liquid-glow w-[500px] h-[500px] bg-emerald-600/20 -top-20 -left-20 animate-liquid" />
        <div className="liquid-glow w-[400px] h-[400px] bg-green-600/10 top-1/2 -right-20 animate-liquid [animation-delay:2s]" />
        <div className="liquid-glow w-[600px] h-[600px] bg-emerald-600/10 -bottom-40 left-1/3 animate-liquid [animation-delay:4s]" />
      </div>

      <Header />

      {/* Hero & Search Bar */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-5xl my-8 flex flex-col md:flex-row md:items-center justify-between gap-6"
      >

        <div className="relative w-full md:w-96 group">
          <form onSubmit={handleSearch} className="relative">
            <input 
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search city..."
              className="w-full liquid-glass rounded-2xl py-3.5 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 transition-all placeholder:text-slate-500"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-emerald-400 transition-colors" />
          </form>

          <AnimatePresence>
            {suggestions.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="absolute top-full left-0 w-full mt-2 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden z-50 text-slate-200"
              >
                {suggestions.map((s, idx) => {
                  const fullName = [s.name, s.admin1, s.country].filter(Boolean).join(', ');
                  const subText = [s.admin1, s.country].filter(Boolean).join(', ');
                  return (
                    <button
                      key={idx}
                      onClick={() => router.push(`/${s.name.toLowerCase()}`)}
                      className="w-full px-4 py-3.5 text-left hover:bg-slate-800 transition-colors border-b border-white/5 last:border-0 flex items-center gap-3"
                    >
                      <MapPin className="w-4 h-4 text-slate-500" />
                      <span>{s.name}{subText ? ', ' : ''}<span className="text-slate-400 text-sm">{subText}</span></span>
                    </button>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <button 
          onClick={handleUseLocation}
          className="flex items-center gap-2 px-6 py-3.5 liquid-glass-intense hover:bg-white/10 rounded-2xl font-semibold transition-all shadow-lg active:scale-95 group"
        >
          <Navigation className="w-4 h-4 text-emerald-400 group-hover:rotate-45 transition-transform" />
          Current Location
        </button>
      </motion.div>

      {/* Popular Regional Forecasts (SEO Internal Linking) */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full max-w-5xl mb-12"
      >
        <div className="flex items-center gap-2 text-emerald-400/50 mb-6 font-bold uppercase tracking-[0.2em] text-[10px]">
          <Activity size={12} />
          Popular Regional Forecasts
        </div>
        
        {(() => {
          const allCities = [
            'Delhi', 'Mumbai', 'Bengaluru', 'Chennai', 'Kolkata', 'Hyderabad', 'Pune', 'Ahmedabad', 'Jaipur', 'Lucknow',
            'Katni', 'Rewa', 'Satna', 'Sambalpur', 'Koraput', 'Dindigul', 'Kurnool', 'Nizamabad', 
            'Ujjain', 'Ratlam', 'Chhindwara', 'Balaghat', 'Jhansi', 'Alwar', 'Bharatpur', 'Silchar', 
            'Tezpur', 'Tura', 'Agartala', 'Aizawl', 'Dimapur', 'Imphal', 'Itanagar', 'Gangtok', 
            'Ooty', 'Coonoor', 'Madurai', 'Tirunelveli', 'Vellore', 'Salem', 'Hubli', 'Belgaum', 
            'Davanagere', 'Mysore', 'Gulbarga', 'Solapur', 'Kolhapur', 'Sangli', 'Akola', 'Amravati', 
            'Jalgaon', 'Bhusawal', 'Deoghar', 'Dhanbad', 'Ranchi', 'Bokaro', 'Gaya', 'Muzaffarpur', 
            'Darbhanga', 'Purnia'
          ];
          
          const visibleCities = showAllCities ? allCities : allCities.slice(0, 12);

          return (
            <div className="space-y-6">
              <div className="flex flex-wrap gap-3">
                {visibleCities.map((city) => (
                  <Link 
                    key={city} 
                    href={`/${city.toLowerCase()}`}
                    className="px-5 py-2.5 bg-white/[0.03] border border-white/5 rounded-full text-[11px] font-bold text-slate-400 hover:border-emerald-500/30 hover:text-emerald-400 transition-all hover:bg-emerald-500/5"
                  >
                    {city}
                  </Link>
                ))}
              </div>
              
              {!showAllCities && (
                <button 
                  onClick={() => setShowAllCities(true)}
                  className="text-emerald-400 hover:text-emerald-300 text-xs font-black uppercase tracking-widest flex items-center gap-2 group transition-all"
                >
                  View More Cities
                  <div className="w-1 h-1 rounded-full bg-emerald-400 group-hover:scale-150 transition-transform" />
                </button>
              )}
            </div>
          );
        })()}
      </motion.div>

      {/* Main Dashboard */}
      {loading && !weather ? (
        <div className="flex-1 flex flex-col items-center justify-center text-slate-400 gap-4">
          <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
          <p className="animate-pulse">{loadingMessage}</p>
        </div>
      ) : error ? (
        <div className="flex-1 flex flex-col items-center justify-center text-slate-400 gap-4">
          <p className="bg-red-500/10 text-red-400 px-6 py-3 rounded-2xl border border-red-500/20">{error}</p>
          <button onClick={() => fetchWeatherData(location?.lat || 28.6139, location?.lon || 77.2090, location?.name || 'Delhi')} className="text-blue-400 hover:underline">Try again</button>
        </div>
      ) : weather && (
        <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-4 gap-12 mt-12">
          {/* Current Weather Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="md:col-span-3 liquid-glass rounded-[3rem] p-10 md:p-12 relative overflow-hidden group shadow-2xl border-l-4 border-emerald-500"
          >
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none blur-3xl scale-150">
              <WeatherIcon code={weather.current.weather_code} className="w-80 h-80 text-emerald-500/30" />
            </div>

            <div className="relative z-10">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
                <div className="flex items-center gap-3 text-slate-400 font-medium">
                  <div className="p-2 bg-emerald-500/10 rounded-xl">
                    <MapPin className="w-5 h-5 text-emerald-500" />
                  </div>
                  <span className="text-xl">{location?.name}</span>
                </div>
                
                {aqiInfo && weather.aqi?.current && (
                  <div className={`px-4 py-2 rounded-2xl border border-white/5 flex items-center gap-3 ${aqiInfo.bg}`}>
                    <Activity className={`w-4 h-4 ${aqiInfo.color}`} />
                    <span className="text-sm font-semibold tracking-wide">AQI: {weather.aqi.current.us_aqi} — {aqiInfo.label}</span>
                  </div>
                )}
              </div>
              
              <div className="flex items-end gap-2 mb-2">
                <h2 className="text-8xl md:text-9xl font-bold tracking-tighter drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                  {Math.round(weather.current.temperature_2m)}°
                </h2>
                <span className="text-4xl text-slate-500 mb-6 font-light">C</span>
              </div>
              
              <p className="text-3xl font-medium text-slate-300 mb-12">
                {WEATHER_INTERPRETATION[weather.current.weather_code]?.label || 'Unknown'}
              </p>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-8 pt-10 border-t border-white/5">
                <div className="flex flex-col gap-1.5">
                  <span className="text-slate-500 text-xs flex items-center gap-2 uppercase tracking-widest font-bold">
                    <Droplets className="w-3.5 h-3.5" /> Humidity
                  </span>
                  <span className="text-2xl font-semibold">{weather.current.relative_humidity_2m}%</span>
                </div>
                <div className="flex flex-col gap-1.5">
                  <span className="text-slate-500 text-xs flex items-center gap-2 uppercase tracking-widest font-bold">
                    <Wind className="w-3.5 h-3.5" /> Wind
                  </span>
                  <span className="text-2xl font-semibold">{weather.current.wind_speed_10m} <span className="text-sm font-normal text-slate-500">km/h</span></span>
                </div>
                <div className="flex flex-col gap-1.5">
                  <span className="text-slate-500 text-xs flex items-center gap-3 uppercase tracking-widest font-bold">
                    <Sun className="w-3.5 h-3.5" /> UV Index
                  </span>
                  <span className="text-2xl font-semibold">{Math.round(weather.daily.uv_index_max[0])}</span>
                </div>
                <div className="flex flex-col gap-1.5">
                  <span className="text-slate-500 text-xs flex items-center gap-2 uppercase tracking-widest font-bold">
                    <Gauge className="w-3.5 h-3.5" /> Pressure
                  </span>
                  <span className="text-2xl font-semibold">{Math.round(weather.current.surface_pressure)} <span className="text-sm font-normal text-slate-500">hPa</span></span>
                </div>
                {weather.daily.sunrise && weather.daily.sunrise[0] && (
                  <div className="flex flex-col gap-1.5">
                    <span className="text-slate-500 text-xs flex items-center gap-2 uppercase tracking-widest font-bold">
                      <Sunrise className="w-3.5 h-3.5" /> Sunrise
                    </span>
                    <span className="text-2xl font-semibold">{new Date(weather.daily.sunrise[0]).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}</span>
                  </div>
                )}
                {weather.daily.sunset && weather.daily.sunset[0] && (
                  <div className="flex flex-col gap-1.5">
                    <span className="text-slate-500 text-xs flex items-center gap-2 uppercase tracking-widest font-bold">
                      <Sunset className="w-3.5 h-3.5" /> Sunset
                    </span>
                    <span className="text-2xl font-semibold">{new Date(weather.daily.sunset[0]).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}</span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Daily Forecast Sidebar */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="liquid-glass rounded-[3rem] p-8 flex flex-col shadow-xl border-t border-white/5"
          >
            <h3 className="text-lg font-bold px-2 mb-8 text-slate-400 tracking-tight flex items-center gap-2">
              <div className="w-1 h-4 bg-emerald-500 rounded-full" />
              Weekly Forecast
            </h3>
            <div className="flex flex-col gap-2">
              {weather.daily.time.map((time, idx) => (
                <div 
                  key={time} 
                  className="flex items-center justify-between p-4 rounded-2xl hover:bg-white/[0.03] transition-all border border-transparent hover:border-white/10 group"
                >
                  <span className="w-14 text-sm text-slate-400 font-bold uppercase tracking-tighter">
                    {idx === 0 ? 'Today' : new Date(time).toLocaleDateString('en-US', { weekday: 'short' })}
                  </span>
                  <WeatherIcon code={weather.daily.weather_code[idx]} className="w-6 h-6 text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]" />
                  <div className="flex items-center gap-3 w-16 justify-end">
                    <span className="font-bold text-slate-100">{Math.round(weather.daily.temperature_2m_max[idx])}°</span>
                    <span className="text-slate-500 text-sm font-medium">{Math.round(weather.daily.temperature_2m_min[idx])}°</span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 pt-6 border-t border-white/5">
              <div className="p-5 liquid-glass-intense rounded-3xl">
                <div className="flex items-center gap-2 mb-3 text-emerald-400">
                  <Eye className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-widest">Visibility</span>
                </div>
                <span className="text-2xl font-bold">{(weather.current.visibility / 1000).toFixed(1)} <span className="text-sm font-normal text-slate-500">km</span></span>
              </div>
            </div>
          </motion.div>

          {/* Hourly Timeline */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="md:col-span-4 liquid-glass rounded-[3rem] p-10 md:p-14 mt-12 mb-12 shadow-2xl"
          >
            <div className="flex items-center justify-between mb-10 px-4">
              <h3 className="text-xl font-bold text-slate-400 tracking-tight flex items-center gap-2">
                <div className="w-1.5 h-4 bg-emerald-500 rounded-full" />
                Hourly Forecast
              </h3>
              <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">Next 24 Hours</span>
            </div>
            
            <div className="flex overflow-x-auto gap-8 pb-4 scrollbar-hide no-scrollbar -mx-4 px-4">
              {(() => {
                const nowTime = new Date().getTime();
                let startIndex = weather.hourly.time.findIndex(t => new Date(t).getTime() > nowTime - 3600000);
                if (startIndex === -1) startIndex = 0;
                
                const next24 = weather.hourly.time.slice(startIndex, startIndex + 24);
                
                return next24.map((time, i) => {
                  const idx = startIndex + i;
                  const hour = new Date(time).getHours();
                  const isNow = i === 0;
                  
                  return (
                    <div 
                      key={time} 
                      className={`flex flex-col items-center gap-5 min-w-[6.5rem] p-8 rounded-[2.5rem] transition-all duration-500 ${isNow ? 'liquid-glass-intense ring-2 ring-emerald-500/40 relative before:absolute before:inset-0 before:bg-emerald-500/10 before:rounded-[2.5rem] before:blur-xl' : 'hover:bg-white/[0.03] border border-transparent hover:border-white/10 group-hover:scale-110'}`}
                    >
                      <span className={`text-[11px] font-black uppercase tracking-[0.2em] relative z-10 ${isNow ? 'text-emerald-400' : 'text-slate-600 group-hover:text-slate-400 transition-colors'}`}>
                        {isNow ? 'Now' : `${hour.toString().padStart(2, '0')}:00`}
                      </span>
                      <WeatherIcon code={weather.hourly.weather_code[idx]} className={`w-9 h-9 relative z-10 ${isNow ? 'text-emerald-400 drop-shadow-[0_0_12px_rgba(52,211,153,0.6)]' : 'text-slate-500 group-hover:text-emerald-400/80 transition-all'}`} />
                      <div className="flex flex-col items-center relative z-10">
                        <span className="font-bold text-2xl tracking-tighter">{Math.round(weather.hourly.temperature_2m[idx])}°</span>
                        <div className="flex items-center gap-1.5 mt-2">
                          <Sun className={`w-3 h-3 ${isNow ? 'text-emerald-400/60' : 'text-slate-600'}`} />
                          <span className={`text-[11px] font-bold ${isNow ? 'text-emerald-400/60' : 'text-slate-600'}`}>{Math.round(weather.hourly.uv_index[idx])}</span>
                        </div>
                      </div>
                    </div>
                  );
                });
              })()}
            </div>
          </motion.div>
        </div>
      )}

      {/* Homepage SEO Content */}
      <motion.article 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="w-full max-w-5xl mt-6 liquid-glass p-8 md:p-12 rounded-[3rem] shadow-2xl"
      >
        <h2 className="text-2xl font-black mb-6 bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent uppercase tracking-tight">
          SkyCast - Accurate Weather Forecast India & Worldwide
        </h2>
        <div className="prose prose-invert max-w-none text-slate-300 font-bold space-y-4 text-sm md:text-base leading-relaxed">
          <p>
            Welcome to SkyCast, your premier source for <strong>real-time weather</strong> intelligence. Whether you are checking the <strong>weather in Delhi today</strong>, the <strong>tomorrow weather Mumbai</strong>, or the <strong>7 day weather forecast</strong> for any city globally, our high-precision meteorological dashboard delivers.
          </p>
          <p>
            We process live atmospheric data to provide crucial metrics including temperature, humidity, wind speeds, and real-time Air Quality Index (AQI) updates. Get the latest <strong>hourly weather forecast</strong> and localized climate conditions instantly. From <strong>weather in Bengaluru today</strong> to <strong>weather in Chennai today</strong>, stay ahead of changing atmospheric conditions.
          </p>
          <p>
            Our minimalist weather app is optimized for speed and accuracy. Explore our Popular Regional Forecasts section to find detailed atmospheric analysis for cities like Kolkata, Hyderabad, Pune, Ahmedabad, Jaipur, and Lucknow. Experience meteorology reimagined with SkyCast.
          </p>
        </div>
      </motion.article>

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        ::selection {
          background-color: rgba(52, 211, 153, 0.3);
          color: white;
        }
      `}</style>
      
      <Footer />
    </main>
  );
}
