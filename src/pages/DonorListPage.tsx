
import Donors from '../components/admin/Donors'
import AdminHeader from '../components/admin/AdminHeader'

function DonorListPage() {
  return (
    <div className="flex min-h-screen">
        <AdminHeader />
        <Donors />
    </div>
  )
}

export default DonorListPage