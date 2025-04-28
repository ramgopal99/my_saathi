import { prisma } from '@/lib/prisma'

async function getUsers() {
  return await prisma.user.findMany({
    orderBy: {
      name: 'asc'
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      location: true,
      phone: true,
    }
  })
}

export default async function UsersPage() {
  const users = await getUsers()

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap">{user.name || '-'}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.email || '-'}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.role}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.location || '-'}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.phone || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
} 