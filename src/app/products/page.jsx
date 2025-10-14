'use client'
import { useState, useEffect } from "react"

export default function Products() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [searchTerm, setSearchTerm] = useState('')
    const [viewMode, setViewMode] = useState('grid')
    const [showModal, setShowModal] = useState(false)
    const [modalMode, setModalMode] = useState('create') // 'create' o 'edit'
    const [selectedProduct, setSelectedProduct] = useState(null)
    const [formData, setFormData] = useState({
        name: '',
        stock: ''
    })
    const [submitting, setSubmitting] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [productToDelete, setProductToDelete] = useState(null)
    const [deleting, setDeleting] = useState(false)

    // Filtrar productos
    const filteredProducts = Array.isArray(products) 
        ? products.filter(product => {
            const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
            return matchesSearch
        })
        : []

    useEffect(() => {
        fetchProducts()
    }, [])

    const fetchProducts = async () => {
        try {
            setLoading(true)
            setError(null)

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })

            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`)
            }

            const data = await response.json()
            console.log('Respuesta de la API:', data)
            
            // Tu API devuelve { products: [...] }
            if (data.products && Array.isArray(data.products)) {
                setProducts(data.products)
            } else if (Array.isArray(data)) {
                setProducts(data)
            } else {
                console.error('Formato de datos no reconocido:', data)
                setProducts([])
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error al cargar productos')
            console.error('Error fetching products:', err)
        } finally {
            setLoading(false)
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        try {
            setSubmitting(true)
            
            const url = modalMode === 'create' 
                ? `${process.env.NEXT_PUBLIC_API_URL}/products`
                : `${process.env.NEXT_PUBLIC_API_URL}/products/${selectedProduct.id}`
            
            const method = modalMode === 'create' ? 'POST' : 'PUT'
            
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    stock: parseInt(formData.stock)
                })
            })

            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`)
            }

            const data = await response.json()
            console.log(`Producto ${modalMode === 'create' ? 'creado' : 'actualizado'}:`, data)
            
            // Refresca la lista de productos
            await fetchProducts()
            
            // Limpia el formulario y cierra el modal
            handleCloseModal()
            
        } catch (err) {
            console.error(`Error ${modalMode === 'create' ? 'creando' : 'actualizando'} producto:`, err)
            alert(`Error al ${modalMode === 'create' ? 'crear' : 'actualizar'} el producto: ` + err.message)
        } finally {
            setSubmitting(false)
        }
    }

    const handleCloseModal = () => {
        setShowModal(false)
        setModalMode('create')
        setSelectedProduct(null)
        setFormData({ name: '', stock: '' })
    }

    const handleOpenCreateModal = () => {
        setModalMode('create')
        setFormData({ name: '', stock: '' })
        setShowModal(true)
    }

    const handleOpenEditModal = (product) => {
        setModalMode('edit')
        setSelectedProduct(product)
        setFormData({
            name: product.name,
            stock: product.stock.toString()
        })
        setShowModal(true)
    }

    const handleOpenDeleteModal = (product) => {
        setProductToDelete(product)
        setShowDeleteModal(true)
    }

    const handleCloseDeleteModal = () => {
        setShowDeleteModal(false)
        setProductToDelete(null)
    }

    const handleDeleteProduct = async () => {
        if (!productToDelete) return
        
        try {
            setDeleting(true)
            
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/products/${productToDelete.id}`,
                {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            )

            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`)
            }

            console.log('Producto eliminado:', productToDelete.id)
            
            // Refresca la lista de productos
            await fetchProducts()
            
            // Cierra el modal
            handleCloseDeleteModal()
            
        } catch (err) {
            console.error('Error eliminando producto:', err)
            alert('Error al eliminar el producto: ' + err.message)
        } finally {
            setDeleting(false)
        }
    }

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <div className="bg-card border-b border-border">
                <div className="px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Productos</h1>
                            <p className="text-muted-foreground mt-1">
                                Gestiona y visualiza la información de tus productos
                            </p>
                        </div>
                        <button 
                            onClick={handleOpenCreateModal}
                            className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors w-full sm:w-auto"
                        >
                            Agregar Producto
                        </button>
                    </div>
                </div>
            </div>

            {/* Contenedor principal con padding */}
            <div className="px-4 sm:px-6 lg:px-8 py-6">
                {/* Filtros y controles */}
                <div className="flex flex-col lg:flex-row gap-4 mb-6">
                    {/* Barra de búsqueda */}
                    <div className="flex-1">
                        <input
                            type="text"
                            placeholder="Buscar productos..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>

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

                {/* Estados de carga y error */}
                {loading && (
                    <div className="flex justify-center items-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                    </div>
                )}

                {error && (
                    <div className="bg-destructive/10 border border-destructive text-destructive px-4 py-3 rounded-lg mb-6">
                        <p className="font-semibold">Error al cargar productos</p>
                        <p className="text-sm mt-1">{error}</p>
                        <button 
                            onClick={fetchProducts}
                            className="mt-2 text-sm underline hover:no-underline"
                        >
                            Reintentar
                        </button>
                    </div>
                )}

                {!loading && !error && filteredProducts.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-muted-foreground text-lg">
                            {searchTerm ? 'No se encontraron productos' : 'No hay productos disponibles'}
                        </p>
                    </div>
                )}

                {/* Contenido principal */}
                {!loading && !error && filteredProducts.length > 0 && (
                    <>
                        {viewMode === 'grid' ? (
                            /* Vista en Grid */
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                                {filteredProducts.map((product) => (
                                    <div key={product.id} className="bg-card border border-border rounded-lg p-4 sm:p-6 hover:shadow-lg transition-shadow">
                                        <div className="mb-4">
                                            <div className="flex items-center gap-3 mb-3">
                                                <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold text-sm">
                                                    {product.name.charAt(0).toUpperCase()}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="font-semibold text-foreground truncate">{product.name}</h3>
                                                    <p className="text-sm text-muted-foreground truncate">ID: {product.id}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-2 mb-4">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-muted-foreground">Stock:</span>
                                                <span className="text-foreground font-medium">{product.stock}</span>
                                            </div>
                                        </div>

                                        <div className="flex gap-2">
                                            <button 
                                                onClick={() => handleOpenEditModal(product)}
                                                className="flex-1 bg-primary text-primary-foreground py-2 px-3 rounded-md text-sm hover:bg-primary/90 transition-colors"
                                            >
                                                Editar
                                            </button>
                                            <button 
                                                onClick={() => handleOpenDeleteModal(product)}
                                                className="bg-red-500 text-white py-2 px-3 rounded-md text-sm hover:bg-red-600 transition-colors"
                                            >
                                                Eliminar
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
                                                <th className="text-left p-4 font-semibold text-foreground">Producto</th>
                                                <th className="text-left p-4 font-semibold text-foreground hidden md:table-cell">ID</th>
                                                <th className="text-left p-4 font-semibold text-foreground">Stock</th>
                                                <th className="text-right p-4 font-semibold text-foreground">Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredProducts.map((product) => (
                                                <tr key={product.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                                                    <td className="p-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold text-xs">
                                                                {product.name.charAt(0).toUpperCase()}
                                                            </div>
                                                            <div>
                                                                <div className="font-medium text-foreground">{product.name}</div>
                                                                <div className="text-sm text-muted-foreground md:hidden">ID: {product.id}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="p-4 hidden md:table-cell">
                                                        <span className="text-foreground">{product.id}</span>
                                                    </td>
                                                    <td className="p-4">
                                                        <span className="text-foreground font-medium">{product.stock}</span>
                                                    </td>
                                                    <td className="p-4">
                                                        <div className="flex gap-2 justify-end">
                                                            <button 
                                                                onClick={() => handleOpenEditModal(product)}
                                                                className="bg-primary text-primary-foreground py-1 px-3 rounded-md text-sm hover:bg-primary/90 transition-colors"
                                                            >
                                                                Editar
                                                            </button>
                                                            <button 
                                                                onClick={() => handleOpenDeleteModal(product)}
                                                                className="bg-red-500 text-white py-1 px-3 rounded-md text-sm hover:bg-red-600 transition-colors"
                                                            >
                                                                Eliminar
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
                    </>
                )}
            </div>

            {/* Modal para agregar producto */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-card border border-border rounded-lg max-w-md w-full p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold text-foreground">
                                {modalMode === 'create' ? 'Agregar Producto' : 'Editar Producto'}
                            </h2>
                            <button 
                                onClick={handleCloseModal}
                                className="text-muted-foreground hover:text-foreground"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1">
                                        Nombre del producto
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                                        placeholder="Ej: Laptop Dell"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="stock" className="block text-sm font-medium text-foreground mb-1">
                                        Stock inicial
                                    </label>
                                    <input
                                        type="number"
                                        id="stock"
                                        name="stock"
                                        value={formData.stock}
                                        onChange={handleInputChange}
                                        required
                                        min="0"
                                        className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                                        placeholder="Ej: 10"
                                    />
                                </div>
                            </div>

                            <div className="flex gap-3 mt-6">
                                <button
                                    type="button"
                                    onClick={handleCloseModal}
                                    className="flex-1 px-4 py-2 border border-border rounded-lg text-foreground hover:bg-muted transition-colors"
                                    disabled={submitting}
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    disabled={submitting}
                                >
                                    {submitting 
                                        ? (modalMode === 'create' ? 'Guardando...' : 'Actualizando...') 
                                        : (modalMode === 'create' ? 'Guardar' : 'Actualizar')
                                    }
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal de confirmación para eliminar */}
            {showDeleteModal && productToDelete && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-card border border-border rounded-lg max-w-md w-full p-6">
                        <div className="flex items-start gap-4 mb-4">
                            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                            </div>
                            <div className="flex-1">
                                <h3 className="text-lg font-bold text-foreground mb-2">
                                    ¿Eliminar producto?
                                </h3>
                                <p className="text-muted-foreground text-sm mb-1">
                                    Estás a punto de eliminar el producto:
                                </p>
                                <p className="text-foreground font-medium">
                                    {productToDelete.name}
                                </p>
                                <p className="text-muted-foreground text-sm mt-2">
                                    Esta acción no se puede deshacer.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button
                                type="button"
                                onClick={handleCloseDeleteModal}
                                className="flex-1 px-4 py-2 border border-border rounded-lg text-foreground hover:bg-muted transition-colors"
                                disabled={deleting}
                            >
                                Cancelar
                            </button>
                            <button
                                type="button"
                                onClick={handleDeleteProduct}
                                className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={deleting}
                            >
                                {deleting ? 'Eliminando...' : 'Eliminar'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}