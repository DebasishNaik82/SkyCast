import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://skycast-wd.vercel.app'
  const popularCities = [
    'Delhi', 'Mumbai', 'Bengaluru', 'Chennai', 'Kolkata', 'Hyderabad', 'Pune', 'Ahmedabad', 'Jaipur', 'Lucknow',
    'Katni', 'Rewa', 'Satna', 'Sambalpur', 'Koraput', 'Dindigul', 'Kurnool', 'Nizamabad', 
    'Ujjain', 'Ratlam', 'Chhindwara', 'Balaghat', 'Jhansi', 'Alwar', 'Bharatpur', 'Silchar', 
    'Tezpur', 'Tura', 'Agartala', 'Aizawl', 'Dimapur', 'Imphal', 'Itanagar', 'Gangtok', 
    'Ooty', 'Coonoor', 'Madurai', 'Tirunelveli', 'Vellore', 'Salem', 'Hubli', 'Belgaum', 
    'Davanagere', 'Mysore', 'Gulbarga', 'Solapur', 'Kolhapur', 'Sangli', 'Akola', 'Amravati', 
    'Jalgaon', 'Bhusawal', 'Deoghar', 'Dhanbad', 'Ranchi', 'Bokaro', 'Gaya', 'Muzaffarpur', 
    'Darbhanga', 'Purnia'
  ];

  const cityUrls = popularCities.map((city) => ({
    url: `${baseUrl}/${city.toLowerCase()}`,
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
