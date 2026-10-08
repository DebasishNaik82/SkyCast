import { redirect, notFound } from 'next/navigation';

interface Props {
  params: Promise<{ city: string }>;
}

const RESERVED_PATHS = ['about', 'contact', 'privacy-policy', 'terms', 'disclaimer', 'api', 'weather'];

export default async function LegacyCityRedirect({ params }: Props) {
  const { city } = await params;
  const decoded = decodeURIComponent(city).toLowerCase();

  if (RESERVED_PATHS.includes(decoded)) {
    notFound();
  }

  redirect(`/weather/${encodeURIComponent(decoded)}`);
}

