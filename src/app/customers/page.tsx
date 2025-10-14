'use client'

import { useState } from 'react'

// Datos de ejemplo para los clientes
const customers = [
  {
    id: 1,
    name: 'Juan Pérez',
    email: 'juan.perez@email.com',
    phone: '+1 (555) 123-4567',
    status: 'Activo',
    totalOrders: 24,
    lastOrder: '2024-01-15',
    avatar: 'JP'
  },
  {
    id: 2,
    name: 'María García',
    email: 'maria.garcia@email.com',
    phone: '+1 (555) 234-5678',
    status: 'Activo',
    totalOrders: 18,
    lastOrder: '2024-01-14',
    avatar: 'MG'
  },
  {
    id: 3,
    name: 'Carlos López',
    email: 'carlos.lopez@email.com',
    phone: '+1 (555) 345-6789',
    status: 'Inactivo',
    totalOrders: 5,
    lastOrder: '2023-12-20',
    avatar: 'CL'
  },
  {
    id: 4,
    name: 'Ana Martínez',
    email: 'ana.martinez@email.com',
    phone: '+1 (555) 456-7890',
    status: 'Activo',
    totalOrders: 32,
    lastOrder: '2024-01-16',
    avatar: 'AM'
  },
  {
    id: 5,
    name: 'Luis Rodríguez',
    email: 'luis.rodriguez@email.com',
    phone: '+1 (555) 567-8901',
    status: 'Activo',
    totalOrders: 12,
    lastOrder: '2024-01-13',
    avatar: 'LR'
  }
]

export default function Customers() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('todos')
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid')

  // Filtrar clientes
  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'todos' || customer.status.toLowerCase() === statusFilter.toLowerCase()
    return matchesSearch && matchesStatus
  })

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Clientes</h1>
              <p className="text-muted-foreground mt-1">
                Gestiona y visualiza la información de tus clientes
              </p>
            </div>
            <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors w-full sm:w-auto">
              Agregar Cliente
            </button>
          </div>
        </div>
      </div>

      {/* Filtros y controles */}
      <div className="px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          {/* Barra de búsqueda */}
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar clientes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
              />
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Filtro de estado */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="todos">Todos los estados</option>
            <option value="activo">Activo</option>
            <option value="inactivo">Inactivo</option>
          </select>

          {/* Botones de vista */}
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg border transition-colors ${
                viewMode === 'grid'
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-background text-foreground border-border hover:bg-muted'
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-2 rounded-lg border transition-colors ${
                viewMode === 'table'
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-background text-foreground border-border hover:bg-muted'
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Contenido principal */}
        {viewMode === 'grid' ? (
          /* Vista en Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {filteredCustomers.map((customer) => (
              <div key={customer.id} className="bg-card border border-border rounded-lg p-4 sm:p-6 hover:shadow-lg transition-shadow">
                <div className="mb-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold text-sm">
                      {customer.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground truncate">{customer.name}</h3>
                      <p className="text-sm text-muted-foreground truncate">{customer.email}</p>
                    </div>
                  </div>
                  <div className="flex justify-center sm:justify-start">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      customer.status === 'Activo'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
                    }`}>
                      {customer.status}
                    </span>
                  </div>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Teléfono:</span>
                    <span className="text-foreground">{customer.phone}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Pedidos:</span>
                    <span className="text-foreground font-medium">{customer.totalOrders}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Último pedido:</span>
                    <span className="text-foreground">{customer.lastOrder}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className="flex-1 bg-primary text-primary-foreground py-2 px-3 rounded-md text-sm hover:bg-primary/90 transition-colors">
                    Ver detalles
                  </button>
                  <button className="bg-secondary text-secondary-foreground py-2 px-3 rounded-md text-sm hover:bg-secondary/80 transition-colors">
                    Editar
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Vista en Tabla */
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted border-b border-border">
                  <tr>
                    <th className="text-left p-4 font-semibold text-foreground">Cliente</th>
                    <th className="text-left p-4 font-semibold text-foreground hidden sm:table-cell">Contacto</th>
                    <th className="text-left p-4 font-semibold text-foreground hidden md:table-cell">Pedidos</th>
                    <th className="text-left p-4 font-semibold text-foreground hidden lg:table-cell">Último pedido</th>
                    <th className="text-left p-4 font-semibold text-foreground">Estado</th>
                    <th className="text-right p-4 font-semibold text-foreground">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCustomers.map((customer) => (
                    <tr key={customer.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold text-xs">
                            {customer.avatar}
                          </div>
                          <div>
                            <div className="font-medium text-foreground">{customer.name}</div>
                            <div className="text-sm text-muted-foreground sm:hidden">{customer.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 hidden sm:table-cell">
                        <div className="text-sm">
                          <div className="text-foreground">{customer.email}</div>
                          <div className="text-muted-foreground">{customer.phone}</div>
                        </div>
                      </td>
                      <td className="p-4 hidden md:table-cell">
                        <span className="text-foreground font-medium">{customer.totalOrders}</span>
                      </td>
                      <td className="p-4 hidden lg:table-cell">
                        <span className="text-foreground">{customer.lastOrder}</span>
                      </td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          customer.status === 'Activo'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                            : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
                        }`}>
                          {customer.status}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex gap-2 justify-end">
                          <button className="bg-primary text-primary-foreground py-1 px-3 rounded-md text-sm hover:bg-primary/90 transition-colors">
                            Ver
                          </button>
                          <button className="bg-secondary text-secondary-foreground py-1 px-3 rounded-md text-sm hover:bg-secondary/80 transition-colors">
                            Editar
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Estado vacío */}
        {filteredCustomers.length === 0 && (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-foreground">No se encontraron clientes</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Intenta ajustar los filtros de búsqueda.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}