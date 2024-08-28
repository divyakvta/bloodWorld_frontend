import axios from "axios";
import React, { useEffect, useState } from "react";

interface Donor {
    _id: number;
    name: string;
    bloodGroup: string;
    city: string;
    createdAt: string;
    lastDonated: string;
    isActive: boolean;
  }

function Donors() {
   const [donors, setDonors] = useState<Donor[]>([]);
   const [loading, setLoading] = useState<boolean>(true);
   const [error, setError] = useState<string | null>(null);;
   const [search, setSearch] = useState<string>('')

   useEffect(() => {
    async function fetctDonors() {
        try {
            const response = await axios.get<Donor[]>('/api/admin/get_donors');
            setDonors(response.data);
        }catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occured')
        }finally {
            setLoading(false)
        }
    }

    fetctDonors();
   }, []);

   const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
   };

   const filteredDonors = donors.filter(donor =>
    donor.name.toLowerCase().includes(search.toLowerCase()) ||
    donor.bloodGroup.toLowerCase().includes(search.toLowerCase()) ||
    donor.city.toLowerCase().includes(search.toLowerCase())
  );

  const toggleActivation = async (donorId: number, isActive: boolean) => {
    try {

      await axios.post(`/api/admin/toggle_activation`, { donorId, isActive: !isActive });

      setDonors((prevDonors) => 
        prevDonors.map((donor) => 
          donor._id === donorId ? {...donor, isActive: !isActive} : donor
        )
      );
    }catch (err) {
      console.error("Failed to toggle activation status", err);
    }
  };

   if(loading) return <p>Loading...</p>;
   if(error) return <p>Error fetching data: {error}</p>

      return (
        <div className="container mx-auto p-4 w-full max-w-screen-lg">
      {/* Search Bar */}
      <div className="flex justify-center items-center mt-6">
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={handleSearch}
          className="w-full md:w-1/2 rounded-full border border-gray-300 py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Table Container */}
      <div className="flex justify-center mt-8">
        <div className="w-full">
          <div className="overflow-x-auto shadow-md rounded-lg">
            <table className="min-w-full bg-white border border-gray-300 text-left table-fixed">
              <thead>
                <tr className="bg-gradient-to-r from-red-700 via-red-600 to-red-500 text-sm font-medium text-white text-center">
                  <th className="px-4 py-2 w-1/6 border-b">Donor ID</th>
                  <th className="px-4 py-2 w-1/6 border-b">Donor Name</th>
                  <th className="px-4 py-2 w-1/6 border-b">Address</th>
                  <th className="px-4 py-2 w-1/6 border-b">Phone No</th>
                  <th className="px-4 py-2 w-1/6 border-b">Registered Date</th>
                  <th className="px-4 py-2 w-1/6 border-b">Last Donated Date</th>
                  <th className="px-4 py-2 w-1/6 border-b">Active/ Inactive</th>
                </tr>
              </thead>
              <tbody>
              {filteredDonors.length > 0 ? (
                  filteredDonors.map(donor => (
                    <tr key={donor._id}>
                      <td className="px-4 py-2 border-b text-sm text-center">{donor._id}</td>
                      <td className="px-4 py-2 border-b text-sm text-center">{donor.name}</td>
                      <td className="px-4 py-2 border-b text-sm text-center">{donor.bloodGroup}</td>
                      <td className="px-4 py-2 border-b text-sm text-center">{donor.city}</td>
                      <td className="px-4 py-2 border-b text-sm text-center">{new Date(donor.createdAt).toLocaleDateString() }</td>
                      <td className="px-4 py-2 border-b text-sm text-center">{new Date(donor.lastDonated).toLocaleDateString()}</td>
                      <td className="px-4 py-2 border-b text-sm text-center">
                        {donor.isActive ? (
                          <a
                            href="#"
                            className="text-red-500 hover:underline"
                            onClick={() => toggleActivation(donor._id, donor.isActive)}
                          >
                            Deactivate
                          </a>
                        ) : (
                          <a
                            href="#"
                            className="text-green-500 hover:underline"
                            onClick={() => toggleActivation(donor._id, donor.isActive)}
                          >
                            Activate
                          </a>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="px-4 py-2 text-center">No donors found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Donors;