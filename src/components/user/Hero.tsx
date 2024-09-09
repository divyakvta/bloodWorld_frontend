
import { useEffect, useState } from 'react';
import heroImage from '/src/assets/hero2.jpeg'
import { getDownloadURL, getMetadata, listAll, ListResult, ref } from 'firebase/storage';
import { Carousel } from 'react-responsive-carousel';
import { storage } from '../../firebase/firebase';
// import poster1 from '/src/assets/poster3.jpg'


interface Poster {
  title: string;
  url: string;
  fullPath: string;
}

function Hero() {

  const [posters, setPosters] = useState<Poster[]>([]);

  useEffect(() => {
    const fetchPosters = async () => {
      try {
        const postersRef = ref(storage, 'posters/');
        const result: ListResult = await listAll(postersRef);
        const fetchedPosters = await Promise.all(
          result.items.map(async (itemRef) => {
            const downloadURL = await getDownloadURL(itemRef);
            const metadata = await getMetadata(itemRef);
            const posterTitle = metadata.customMetadata?.title || 'Untitled';
            return { title: posterTitle, url: downloadURL, fullPath: itemRef.fullPath };
          })
        );
        setPosters(fetchedPosters);
      } catch (error) {
        console.error('Error fetching posters:', error);
      }
    };

    fetchPosters();
  }, []);

  

  return (
    <>
      <div className="container mx-5 relative bg-white text-black  md:px-8 lg:px-16 xl:px-32 flex items-center">
        <div className="flex flex-col md:flex-row w-full  relative">
          <img
            src={heroImage}
            alt="Blood donation"
            className="absolute -left-96 -top-96  z-50"



          />
        </div>
        <div className="w-1/2  text-center ">
          <h1 className="text-3xl md:text-5xl font-bold mt-10">Every Drop Saves Life</h1>
          <p className="text-lg md:text-xl text-left mb-6 mt-6">
            Blood brings oxygen and nutrients to all the parts of the body so they can keep working. Blood carries carbon dioxide and other waste materials to the lungs, kidneys, and digestive system to be removed from the body. Blood also fights infections, and carries hormones around the body.
          </p>
          <a href='/search_donor'>
            <button className="bg-gradient-to-r from-red-700 via-red-600 to-red-500 text-white py-2 px-4 rounded">Get Blood Now</button>
          </a>
        </div>
      </div>
      <div className="container mx-auto relative bg-white text-black md:px-8 lg:px-16 xl:px-32 flex flex-col md:flex-row items-center mt-10">
      <div className="w-full md:w-1/2 text-center md:text-left">
  <div className="flex flex-col items-center md:items-center">
    <h1 className="text-3xl md:text-5xl font-bold mt-10">
      Save Life Donate Blood
    </h1>
  </div>
  <p className="text-lg md:text-xl mb-6 mt-6">
    Blood brings oxygen and nutrients to all the parts of the body so they can keep working. Blood carries carbon dioxide and other waste materials to the lungs, kidneys, and digestive system to be removed from the body. Blood also fights infections, and carries hormones around the body.
  </p>
  <div className='flex justify-center'>
  <a href="/register">
      <button className="bg-gradient-to-r from-red-700 via-red-600 to-red-500 text-white py-2 px-4 rounded mt-6">
        Donate Blood
      </button>
    </a>
  </div>
  
</div>

<div className="w-1/3 md:w-1/3 flex justify-center md:justify-end ml-16 mt-10 md:mt-0">
  {posters.length > 0 ? (
    <Carousel 
      showThumbs={false} 
      showStatus={false} 
      autoPlay 
      infiniteLoop 
      className="rounded-lg shadow-lg overflow-hidden"
      interval={5000}  
      transitionTime={600} 
      showArrows={true} 
      stopOnHover={true}  
    >
      {posters.map((poster, index) => (
        <div key={index} className="relative h-64 flex items-center justify-center bg-black">
          <img 
            src={poster.url} 
            alt={poster.title} 
            className="object-cover h-full rounded-lg opacity-90 hover:opacity-100 transition-opacity duration-500 ease-in-out"
          />
        </div>
      ))}
    </Carousel>
  ) : (
    <p>No posters available</p>
  )}
</div>

</div>

    </>
  )

}

export default Hero