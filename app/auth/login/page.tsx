'use client'

import { useSession } from 'next-auth/react'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Login() {
  const { data: session } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (session) {
      if (session.user.role === 'ADMIN') {
        router.push('/admin/dashboard')
      } else {
        router.push('/dashboard')
      }
    }
  }, [session, router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100">
      <div className="flex flex-col items-center justify-center min-h-screen px-4">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-indigo-950 mb-2">Welcome Back</h1>
          <p className="text-indigo-600">Authentication temporarily disabled</p>
        </div>
      </div>
    </div>
  )
} 