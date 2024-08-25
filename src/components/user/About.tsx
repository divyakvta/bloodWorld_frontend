import workflow from '/src/assets/WF.png';
import poster6 from '/src/assets/poster6.png';
import bloodTypeChart from '/src/assets/bloodTypeChart.png'; // Assuming you have this image

function About() {
  return (
    <div className="container mx-auto flex flex-col items-center min-h-screen space-y-8 p-4">
      <div className="w-full max-w-4xl space-y-4">
        <h1 className="text-left font-medium text-2xl">How to get Blood</h1>
        
        <div className="flex flex-col items-center space-y-4">
          <div className="relative w-full max-w-4xl">
            <img 
              src={workflow} 
              className="w-full h-auto max-w-full object-cover" 
              alt="Workflow" 
            />
            <img 
              src={poster6} 
              className="absolute top-1/2 left-1/2 w-1/3 h-auto transform -translate-x-1/2 -translate-y-1/2" 
              alt="Poster" 
            />
          </div>
        </div>
        
        <div className="bg-white p-8 rounded-lg shadow-md space-y-4">
          <h2 className="text-2xl font-semibold">Our Mission</h2>
          <p className="text-gray-700">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
            when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
            It has survived not only five centuries, but also the leap into electronic typesetting, 
            remaining essentially unchanged.
          </p>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold">Blood Type Compatibility</h2>
          <div className="flex justify-center">
            <img 
              // src={bloodTypeChart} // Ensure this is the correct path to your chart image
              alt="Blood Type Compatibility" 
              className="w-full max-w-lg h-auto object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
