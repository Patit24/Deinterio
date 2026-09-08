import React, { useEffect } from 'react';

interface SEOHeadProps {
  title: string;
  description: string;
  image?: string;
  type?: 'website' | 'article';
}

export const SEOHead: React.FC<SEOHeadProps> = ({ 
  title, 
  description, 
  image = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
  type = 'website'
}) => {
  useEffect(() => {
    const pageTitle = `${title} | Deinterio Group · Luxury Interior Design India`;
    document.title = pageTitle;
    
    // Meta Description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description);

    // OpenGraph Title
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement('meta');
      ogTitle.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitle);
    }
    ogTitle.setAttribute('content', pageTitle);

    // OpenGraph Description
    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (!ogDesc) {
      ogDesc = document.createElement('meta');
      ogDesc.setAttribute('property', 'og:description');
      document.head.appendChild(ogDesc);
    }
    ogDesc.setAttribute('content', description);

    // OpenGraph Image
    let ogImage = document.querySelector('meta[property="og:image"]');
    if (!ogImage) {
      ogImage = document.createElement('meta');
      ogImage.setAttribute('property', 'og:image');
      document.head.appendChild(ogImage);
    }
    ogImage.setAttribute('content', image);

    // LocalBusiness JSON-LD Schema (#19)
    let schemaScript = document.getElementById('deinterio-schema-jsonld') as HTMLScriptElement | null;
    if (!schemaScript) {
      schemaScript = document.createElement('script');
      schemaScript.id = 'deinterio-schema-jsonld';
      schemaScript.type = 'application/ld+json';
      document.head.appendChild(schemaScript);
    }

    const localBusinessSchema = {
      "@context": "https://schema.org",
      "@type": "HomeAndConstructionBusiness",
      "name": "Deinterio Interior Group",
      "image": image,
      "description": description,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Ballygunge Circular Road & New Town High-Street",
        "addressLocality": "Kolkata",
        "addressRegion": "West Bengal",
        "postalCode": "700019",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 22.5312,
        "longitude": 88.3619
      },
      "telephone": "+919830000000",
      "priceRange": "₹₹₹₹",
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          "opens": "09:30",
          "closes": "20:00"
        }
      ]
    };

    schemaScript.text = JSON.stringify(localBusinessSchema);
  }, [title, description, image, type]);

  return null;
};
