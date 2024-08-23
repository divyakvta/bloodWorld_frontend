import React from 'react';

const About: React.FC = () => {
  return (
    <div className="flex flex-col space-y-8">
  <div className="flex flex-col items-center justify-center bg-white rounded-lg p-6">
    <div className="text-3xl font-bold text-blue-500">Step 1</div>
    <div className="text-lg mt-4">
      Create an Account with necessary details
    </div>
    <div className="mt-4">
      <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
        Create Account
      </button>
    </div>
  </div>

  <div className="flex flex-col items-center justify-center bg-white rounded-lg p-6">
    <div className="text-3xl font-bold text-blue-500">Step 2</div>
    <div className="text-lg mt-4">
      Search for Donors of required Blood group
    </div>
    <div className="mt-4">
      <input
        type="text"
        placeholder="Enter blood group"
        className="border rounded-md px-3 py-2"
      />
      <button className="bg-blue-500 text-white px-4 py-2 rounded-md ml-2">
        Search
      </button>
    </div>
  </div>

  <div className="flex flex-col items-center justify-center bg-white rounded-lg p-6">
    <div className="text-3xl font-bold text-blue-500">Step 3</div>
    <div className="text-lg mt-4">
      Connect with Donors using chat or call
    </div>
    <div className="mt-4">
      <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
        Connect
      </button>
    </div>
  </div>
</div>
  );
}

export default About;
