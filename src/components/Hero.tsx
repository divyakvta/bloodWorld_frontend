import heroImage from '/src/assets/hero.png'

function Hero() {
  return (
<div className="relative bg-white text-black  md:px-8 lg:px-16 xl:px-32 flex items-center">
      <div className="flex flex-col md:flex-row w-full  relative">
        <img
          src={heroImage}
          alt="Blood donation"
          className="absolute -left-96 -top-72  z-20"
         

          
        />
      </div>
      <div className="w-1/2  text-center">
        <h1 className="text-3xl md:text-5xl font-bold mt-10">Every Drop Saves Life</h1>
        <p className="text-lg md:text-xl mb-6">
          Blood brings oxygen and nutrients to all the parts of the body so they can keep working. Blood carries carbon dioxide and other waste materials to the lungs, kidneys, and digestive system to be removed from the body. Blood also fights infections, and carries hormones around the body.
        </p>
        <button className="bg-gradient-to-r from-red-700 via-red-600 to-red-500 text-white py-2 px-4 rounded">Get Blood Now</button>
      </div>
    </div>
  )
}

export default Hero