import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'SkyCast Weather Dashboard',
    short_name: 'SkyCast',
    description: 'High-precision real-time weather intelligence and forecasting.',
    start_url: '/',
    display: 'standalone',
    background_color: '#020603',
    theme_color: '#10B981',
    icons: [
      {
        src: '/logo.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'any',
      },
      {
        src: '/logo.svg',
        sizes: '512x512',
        type: 'image/svg+xml',
        purpose: 'maskable',
      },
    ],
  };
}
