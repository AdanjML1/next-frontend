'use client'

import { useState } from 'react'
import {Sidebar} from '@/components/layout/Sidebar'
import {Header} from '@/components/layout/Header'
import { usePathname } from 'next/navigation'

interface AppLayoutProps {
  children: React.ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  // Determinar si la página actual necesita el layout completo
  const isFullLayout = !pathname.includes('/auth') && pathname !== '/'

  return (
    <div className="min-h-screen bg-background">
      {isFullLayout ? (
        <div className="flex h-screen">
          {/* Sidebar */}
          <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
          
          {/* Main Content */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Header */}
            <Header onMenuClick={() => setSidebarOpen(true)} />
            
            {/* Page Content */}
            <main className="flex-1 overflow-auto">
              {children}
            </main>
          </div>
        </div>
      ) : (
        // Layout simple para páginas de auth o landing
        <div className="min-h-screen">
          {children}
        </div>
      )}
    </div>
  )
}
