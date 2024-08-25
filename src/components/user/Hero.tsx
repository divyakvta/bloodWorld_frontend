import heroImage from '/src/assets/hero2.jpeg'
import poster1 from '/src/assets/poster3.jpg'

function Hero() {
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

  <div className="w-full md:w-1/2 flex justify-center md:justify-end mt-10 md:mt-0">
    <img
      src={poster1}
      alt="poster"
      className="w-full md:w-auto h-auto max-w-full"
    />
  </div>
</div>

    </>
  )

}

export default Hero