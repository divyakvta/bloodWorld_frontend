import React from 'react'

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-4">
      <div className="container mx-auto">
        <div className="flex justify-between">   

          <div>
            <p className="text-lg font-semibold">Ready to get started?</p>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Donate
            </button>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Help</h3>
            <p className="text-sm">info@example.com</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <p className="text-sm">Kakkanad</p>
            <p className="text-sm">Ernakulam-682101</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer;