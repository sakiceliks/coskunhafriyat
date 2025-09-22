"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface User {
  id: string
  username: string
  email: string
  role: 'admin' | 'editor'
}

interface AuthContextType {
  user: User | null
  login: (username: string, password: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Default admin credentials (in production, this should be stored securely)
const DEFAULT_ADMIN = {
  username: 'admin',
  password: 'sakibaba3446.*',
  user: {
    id: '1',
    username: 'admin',
    email: 'admin@coskunhafriyat.com',
    role: 'admin' as const
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing session in localStorage
    const checkAuth = () => {
      try {
        const storedUser = localStorage.getItem('admin_user')
        const storedTimestamp = localStorage.getItem('admin_session_timestamp')
        
        if (storedUser && storedTimestamp) {
          const sessionAge = Date.now() - parseInt(storedTimestamp)
          const maxAge = 24 * 60 * 60 * 1000 // 24 hours
          
          if (sessionAge < maxAge) {
            setUser(JSON.parse(storedUser))
          } else {
            // Session expired
            localStorage.removeItem('admin_user')
            localStorage.removeItem('admin_session_timestamp')
          }
        }
      } catch (error) {
        console.error('Error checking auth:', error)
        localStorage.removeItem('admin_user')
        localStorage.removeItem('admin_session_timestamp')
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      // Simple authentication (in production, this should be a proper API call)
      if (username === DEFAULT_ADMIN.username && password === DEFAULT_ADMIN.password) {
        const userData = DEFAULT_ADMIN.user
        setUser(userData)
        
        // Store in localStorage
        localStorage.setItem('admin_user', JSON.stringify(userData))
        localStorage.setItem('admin_session_timestamp', Date.now().toString())
        
        return true
      }
      return false
    } catch (error) {
      console.error('Login error:', error)
      return false
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('admin_user')
    localStorage.removeItem('admin_session_timestamp')
  }

  const value: AuthContextType = {
    user,
    login,
    logout,
    isLoading,
    isAuthenticated: !!user
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
