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
  metadataBase: new URL('https://skycast-wd.vercel.app'),
  title: 'SkyCast Weather Dashboard - Real-Time Intelligence & Forecasts',
  description: 'SkyCast Weather Dashboard provides high-precision weather updates, real-time forecasts, and air quality index (AQI) reports using advanced meteorological data.',
  applicationName: 'SkyCast Weather Dashboard',
  keywords: [
    'SkyCast', 'Weather Dashboard', 'weather forecast', 'real-time weather', 'meteorological intelligence', 'weather today', 'local weather', 'AQI updates',
    'weather in delhi today', 'tomorrow weather mumbai', 'weather in bengaluru today', 'weather in chennai today',
    'weather in kolkata', 'weather in hyderabad', 'weather in pune', 'weather in ahmedabad', 'weather in jaipur', 'weather in lucknow',
    'weather in india', 'current weather', '7 day weather forecast', 'hourly weather forecast', 'weather app'
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    siteName: 'SkyCast Weather Dashboard',
    title: 'SkyCast Weather Dashboard - Real-Time Intelligence & Forecasts',
    description: 'High-precision weather updates, real-time forecasts, and air quality index (AQI) reports.',
    url: 'https://skycast-wd.vercel.app',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SkyCast Weather Dashboard - Real-Time Intelligence & Forecasts',
    description: 'High-precision weather updates, real-time forecasts, and air quality index (AQI) reports.',
  },
  icons: {
    icon: [
      { url: '/logo.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/logo.svg', type: 'image/svg+xml' },
    ],
  },
  other: {
    'google-adsense-account': 'ca-pub-5165373830014732',
    '7da624aa55fbca8bd846346fe7de8b9802293d97': '7da624aa55fbca8bd846346fe7de8b9802293d97',
  },
  verification: {
    google: '9jZDM8686DPhJ6g41RMg1_wh90fp_fPl08gN23BQIOw',
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
        <meta name="google-site-verification" content="9jZDM8686DPhJ6g41RMg1_wh90fp_fPl08gN23BQIOw" />
        <meta name="google-adsense-account" content="ca-pub-5165373830014732" />
        <Script
          id="google-adsense"
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5165373830014732"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
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
        <Script id="schema-website" type="application/ld+json" strategy="beforeInteractive">
          {JSON.stringify([
            {
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              'name': 'SkyCast Weather Dashboard',
              'alternateName': ['SkyCast', 'SkyCast Weather'],
              'url': 'https://skycast-wd.vercel.app',
            },
            {
              '@context': 'https://schema.org',
              '@type': 'WebApplication',
              'name': 'SkyCast Weather Dashboard',
              'url': 'https://skycast-wd.vercel.app',
              'applicationCategory': 'WeatherApplication',
              'operatingSystem': 'All',
              'description': 'Real-time weather forecasts, air quality index reports, and meteorological data.',
              'publisher': {
                '@type': 'Organization',
                'name': 'SkyCast Weather',
                'url': 'https://skycast-wd.vercel.app',
              }
            }
          ])}
        </Script>
      </head>
      <body suppressHydrationWarning className="font-sans">{children}</body>
    </html>
  );
}
