import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://skycast-wd.vercel.app'
  const popularCities = [
    'Delhi',
    'Mumbai',
    'Kolkata',
    'Chennai',
    'Bengaluru',
    'Hyderabad',
    'Pune',
    'Bhubaneswar',
    'Jaipur',
    'Lucknow'
  ];

  const cityUrls = popularCities.map((city) => ({
    url: `${baseUrl}/weather/${city.toLowerCase()}`,
    lastModified: new Date(),
    changeFrequency: 'hourly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'hourly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/disclaimer`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    ...cityUrls,
  ]
}
