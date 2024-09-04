"use client";

import React, { useEffect, useState } from 'react';
import PropertyCard from "@/app/components/properties/card";
import usePropertyResource from '@/app/customeHook/userResourceProperty';

export default function Properties() {
  const [properties, setProperties] = useState([]);
  const { fetchProperties } = usePropertyResource();

  useEffect(() => {
    const loadProperties = async () => {
      try {
        const fetchedProperties = await fetchProperties();
        // Check if fetchedProperties is an array
        if (Array.isArray(fetchedProperties)) {
          setProperties(fetchedProperties);
        } else {
          console.error('Fetched properties are not in expected format:', fetchedProperties);
        }
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    };

    loadProperties();
  }, [fetchProperties]);

  return (
    <div className="p-6 bg-bg-light dark:bg-bg-dark">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.length > 0 ? (
          properties.map((property) => (
            <PropertyCard
              key={property.id}
              title={property.title}
              imageUrl={property.imageUrl}
              description={property.description}
              link={`/property/${property.id}`}
            />
          ))
        ) : (
          <p>No properties available.</p>
        )}
      </div>
    </div>
  );
}
