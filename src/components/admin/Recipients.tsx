import axios from "axios";
import { useEffect, useState } from "react";

interface Recipients {
  _id: number;
  name: string;
  bloodGroup: string;
  city: string;
  createdAt: string;
  lastDonated: string;
}

function Recipients() {
  const [donors, setDonors] = useState<Recipients[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState<string>('');

  useEffect(() => {
    async function fetchRecipients() {
      try {
        const response = await axios.get<Recipients[]>('/api/admin/get_recipients');
        setDonors(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchRecipients();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const filteredRecipients = donors.filter(recipient =>
    recipient.name.toLowerCase().includes(search.toLowerCase()) ||
    recipient.bloodGroup.toLowerCase().includes(search.toLowerCase()) ||
    recipient.city.toLowerCase().includes(search.toLowerCase())
  );

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
                  <th className="px-4 py-2 w-1/6 border-b">Recipient ID</th>
                  <th className="px-4 py-2 w-1/6 border-b">Recipient Name</th>
                  <th className="px-4 py-2 w-1/6 border-b">Address</th>
                  <th className="px-4 py-2 w-1/6 border-b">Phone No</th>
                  <th className="px-4 py-2 w-1/6 border-b">Registered Date</th>
                  <th className="px-4 py-2 w-1/6 border-b">Blood Received Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredRecipients.length > 0 ? (
                  filteredRecipients.map(recipient => (
                    <tr key={recipient._id}>
                      <td className="px-4 py-2 border-b text-sm text-center">{recipient._id}</td>
                      <td className="px-4 py-2 border-b text-sm text-center">{recipient.name}</td>
                      <td className="px-4 py-2 border-b text-sm text-center">{recipient.bloodGroup}</td>
                      <td className="px-4 py-2 border-b text-sm text-center">{recipient.city}</td>
                      <td className="px-4 py-2 border-b text-sm text-center">{recipient.createdAt}</td>
                      <td className="px-4 py-2 border-b text-sm text-center">{recipient.lastDonated}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-4 py-2 text-center text-sm">No recipients found</td>
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

export default Recipients;
