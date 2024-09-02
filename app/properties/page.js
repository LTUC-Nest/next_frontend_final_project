import PropertyCard from "@/components/properties/card";

export default function Properties() {
  const properties = [
    {
      title: 'Modern Apartment in City Center',
      imageUrl: 'https://media.gemini.media/img/Original/2021/10/27/2021_10_27_21_14_6_563.jpg',
      description: 'A beautiful modern apartment located in the heart of the city.',
      link: '/property/1',
    },
    {
      title: 'Cozy Cottage Near the Lake',
      imageUrl: 'https://realestate.eg/ckfinder/userfiles/images/properties-for-sale-in-atika/property%20for%20sale%20in%20atika-new-capital.jpg',
      description: 'A charming cottage with stunning lake views.',
      link: '/property/2',
    },
    {
      title: 'Luxury Villa with Pool',
      imageUrl: 'https://aqaratturkey.net/ar/istanbul/wp-content/uploads/2017/05/%D8%B9%D9%82%D8%A7%D8%B1%D8%A7%D8%AA-6-1.jpg',
      description: 'An exquisite villa featuring a private pool and garden.',
      link: '/property/3',
    },
  ];

  return (
    <div className="p-6 bg-bg-light dark:bg-bg-dark">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property, index) => (
          <PropertyCard
            key={index}
            title={property.title}
            imageUrl={property.imageUrl}
            description={property.description}
            link={property.link}
          />
        ))}
      </div>
    </div>
  );
}
