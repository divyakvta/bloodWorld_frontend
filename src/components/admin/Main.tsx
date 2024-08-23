import React from 'react';

function MainContent() {
  return (
    <main className="flex-1 p-20 bg-gray-100">
      <div className="flex flex-col lg:flex-row lg:justify-between space-y-4 lg:space-y-0 lg:space-x-20 text-white">
        <div className="bg-gradient-to-r from-red-700 via-red-600 to-red-500 text-w text-center p-6 rounded-lg flex-1">
          <h2 className="text-xl md:text-2xl font-semibold">Donors Registered</h2>
          <p className="text-2xl md:text-3xl">2000</p>
        </div>
        <div className="bg-gradient-to-r from-red-700 via-red-600 to-red-500 text-center p-6 rounded-md flex-1">
          <h2 className="text-xl md:text-2xl font-semibold">Recipients Registered</h2>
          <p className="text-2xl md:text-3xl">32000</p>
        </div>
      </div>
      <section className="mt-20 bg-red-100 p-6 rounded-md shadow-md">
        <h3 className="text-lg md:text-xl text-center font-semibold mb-4">Criteria for Blood Donation</h3>
        <ul className="list-disc list-inside space-y-5 text-sm md:text-base p-8">
          <li>Blood Donor should be in good health, mentally alert and physically fit.</li>
          <li>Any healthy adult donor between 18 (completed 18 years) and 60 years of age can donate blood.</li>
          <li>Blood donor above 45kg can safely donate 350 ml of blood. Those who are above 55 kg can donate 450 ml of whole blood.</li>
          <li>Women can donate at 4 months interval and men can donate at 3 months interval provided they qualify on medical grounds to donate.</li>
          <li>Pulse should be 50 to 100/min (manually) and blood pressure should not be higher than 170mm of Hg systolic and 100mm of Hg diastolic. Lower limit - systolic pressure should not be below 100mm. of Hg and diastolic should not be below 60mm of Hg.</li>
          <li>Hemoglobin should be equal to or more than 12.5gm %.</li>
          <li>Donor should have something to eat before donating blood.</li>
          <li>The skin at venepuncture site should be free from any lesion or scar of needle puncture and should not have any contagious skin diseases like eczema, etc.</li>
          <li>If any donor has to go for any sporting activity immediately after donation he should be advised not to donate blood.</li>
          <li>Doctor on drive site may defer a donor if any abnormality found in medical history of the donor.</li>
        </ul>
      </section>
    </main>
  );
}

export default MainContent;
