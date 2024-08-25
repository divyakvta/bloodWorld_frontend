
import AdminHeader from '../components/admin/AdminHeader'
import Recipients from '../components/admin/Recipients'

function RecipientListPage() {
  return (
    <div className="flex min-h-screen">
        <AdminHeader />
        <Recipients />
    </div>
  )
}

export default RecipientListPage