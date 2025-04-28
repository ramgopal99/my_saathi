'use client'

import { signOut, useSession } from "next-auth/react"
import { redirect } from "next/navigation"

export default function AccountPage() {
  const { data: session, status } = useSession()
  
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }
  
  if (!session?.user) {
    redirect('/')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-10 text-center">
            Account Settings
          </h1>
          
          <div className="space-y-8">
            <div className="bg-white shadow-sm rounded-xl p-6 border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Profile Information
              </h2>
              <div className="space-y-4">
                <div className="flex items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600 w-24">Name</span>
                  <span className="text-gray-900 font-medium">{session.user.name}</span>
                </div>
                <div className="flex items-center py-2">
                  <span className="text-gray-600 w-24">Email</span>
                  <span className="text-gray-900 font-medium">{session.user.email}</span>
                </div>
              </div>
            </div>
            
            <button
              onClick={() => signOut({ callbackUrl: '/' })}
              className="w-full bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg
                transition duration-200 ease-in-out transform hover:scale-[1.02]
                font-medium shadow-sm"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 