import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'H P',
    short_name: 'H P',
    description: "Texas Hold'em Game",
    start_url: '/',
    display: 'standalone',
    orientation: 'any',
    dir: 'auto',
    lang: 'ko-KR',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      {
        src: '/images/icons/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png'
      },
      {
        src: '/images/icons/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png'
      }
    ]
  };
}
