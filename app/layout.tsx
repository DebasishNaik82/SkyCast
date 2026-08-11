import './globals.css';
import { Metadata } from 'next';
import Script from 'next/script';
import { Outfit } from 'next/font/google';

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800', '900'],
  variable: '--font-outfit',
});

export const metadata: Metadata = {
  title: 'SkyCast - Real-Time Weather Intelligence & Forecasts',
  description: 'SkyCast provides high-precision weather updates, real-time forecasts, and air quality index (AQI) reports using advanced meteorological data. Get accurate weather in Delhi, Mumbai, and worldwide.',
  keywords: [
    'weather forecast', 'real-time weather', 'SkyCast', 'meteorological intelligence', 'weather today', 'local weather', 'AQI updates',
    'weather in delhi today', 'tomorrow weather mumbai', 'weather in bengaluru today', 'weather in chennai today',
    'weather in kolkata', 'weather in hyderabad', 'weather in pune', 'weather in ahmedabad', 'weather in jaipur', 'weather in lucknow',
    'weather in india', 'current weather', '7 day weather forecast', 'hourly weather forecast', 'weather app'
  ],
  other: {
    'google-adsense-account': 'ca-pub-7850864713634423',
    '7da624aa55fbca8bd846346fe7de8b9802293d97': '7da624aa55fbca8bd846346fe7de8b9802293d97',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${outfit.variable}`}>
      <head>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-TFR2EZ6RX5"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-TFR2EZ6RX5');
          `}
        </Script>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7850864713634423"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <Script id="schema-website" type="application/ld+json" strategy="beforeInteractive">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            'name': 'SkyCast Weather Intelligence',
            'url': 'https://skycast-weather.vercel.app',
            'applicationCategory': 'WeatherApplication',
            'operatingSystem': 'All',
            'description': 'Real-time weather forecasts, air quality index reports, and meteorological data.',
            'publisher': {
              '@type': 'Organization',
              'name': 'SkyCast Weather',
              'url': 'https://skycast-weather.vercel.app',
            }
          })}
        </Script>
      </head>
      <body suppressHydrationWarning className="font-sans">{children}</body>
    </html>
  );
}
