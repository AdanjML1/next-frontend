"use client";

import { useState } from "react";

export default function FlexboxGridPage() {
  const [selectedExample, setSelectedExample] =
    useState<keyof typeof examples>("flexbox-basic");

  const examples = {
    "flexbox-basic": {
      title: "Flexbox Básico",
      description: "Propiedades fundamentales de Flexbox",
      code: `flex flex-col gap-4
justify-center items-center
justify-between items-start
justify-around items-end`,
      component: (
        <div className="space-y-6">
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">flex flex-col gap-4</h4>
            <div className="flex flex-col gap-4 h-48 bg-white dark:bg-gray-700 p-4 rounded">
              <div className="bg-blue-500 text-white p-2 rounded text-center">
                Item 1
              </div>
              <div className="bg-green-500 text-white p-2 rounded text-center">
                Item 2
              </div>
              <div className="bg-purple-500 text-white p-2 rounded text-center">
                Item 3
              </div>
            </div>
          </div>

          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">justify-center items-center</h4>
            <div className="flex justify-center items-center h-32 bg-white dark:bg-gray-700 p-4 rounded">
              <div className="bg-blue-500 text-white p-2 rounded text-center">
                Centrado
              </div>
            </div>
          </div>

          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">justify-between items-start</h4>
            <div className="flex justify-between items-start h-32 bg-white dark:bg-gray-700 p-4 rounded">
              <div className="bg-red-500 text-white p-2 rounded text-center">
                Izquierda
              </div>
              <div className="bg-yellow-500 text-white p-2 rounded text-center">
                Derecha
              </div>
            </div>
          </div>
        </div>
      ),
    },
    "flexbox-advanced": {
      title: "Flexbox Avanzado",
      description: "Flexbox con wrap, grow, shrink y order",
      code: `flex flex-wrap gap-2
flex-1 grow shrink-0
order-2 order-1 order-3`,
      component: (
        <div className="space-y-6">
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">flex flex-wrap gap-2</h4>
            <div className="flex flex-wrap gap-2 h-32 bg-white dark:bg-gray-700 p-4 rounded">
              <div className="bg-blue-500 text-white p-2 rounded text-center min-w-[100px]">
                Item 1
              </div>
              <div className="bg-green-500 text-white p-2 rounded text-center min-w-[120px]">
                Item 2
              </div>
              <div className="bg-purple-500 text-white p-2 rounded text-center min-w-[80px]">
                Item 3
              </div>
              <div className="bg-orange-500 text-white p-2 rounded text-center min-w-[110px]">
                Item 4
              </div>
            </div>
          </div>

          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">flex-1 (grow) vs flex-none</h4>
            <div className="flex gap-2 h-20 bg-white dark:bg-gray-700 p-4 rounded">
              <div className="flex-none bg-red-500 text-white p-2 rounded text-center w-16">
                Fijo
              </div>
              <div className="flex-1 bg-blue-500 text-white p-2 rounded text-center">
                Crece
              </div>
              <div className="flex-none bg-green-500 text-white p-2 rounded text-center w-16">
                Fijo
              </div>
            </div>
          </div>

          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">order (orden personalizado)</h4>
            <div className="flex gap-2 h-20 bg-white dark:bg-gray-700 p-4 rounded">
              <div className="order-2 bg-red-500 text-white p-2 rounded text-center flex-1">
                Order 2
              </div>
              <div className="order-1 bg-blue-500 text-white p-2 rounded text-center flex-1">
                Order 1
              </div>
              <div className="order-3 bg-green-500 text-white p-2 rounded text-center flex-1">
                Order 3
              </div>
            </div>
          </div>
        </div>
      ),
    },
    "grid-basic": {
      title: "CSS Grid Básico",
      description: "Filas, columnas y áreas básicas",
      code: `grid grid-cols-3 gap-4
grid grid-rows-3 gap-2
grid grid-cols-2 grid-rows-2`,
      component: (
        <div className="space-y-6">
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">grid grid-cols-3 gap-4</h4>
            <div className="grid grid-cols-3 gap-4 h-32 bg-white dark:bg-gray-700 p-4 rounded">
              <div className="bg-blue-500 text-white p-2 rounded text-center flex items-center justify-center">
                1
              </div>
              <div className="bg-green-500 text-white p-2 rounded text-center flex items-center justify-center">
                2
              </div>
              <div className="bg-purple-500 text-white p-2 rounded text-center flex items-center justify-center">
                3
              </div>
              <div className="bg-red-500 text-white p-2 rounded text-center flex items-center justify-center">
                4
              </div>
              <div className="bg-yellow-500 text-white p-2 rounded text-center flex items-center justify-center">
                5
              </div>
              <div className="bg-pink-500 text-white p-2 rounded text-center flex items-center justify-center">
                6
              </div>
            </div>
          </div>

          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">grid grid-rows-3 gap-2</h4>
            <div className="grid grid-rows-3 gap-2 h-40 bg-white dark:bg-gray-700 p-4 rounded">
              <div className="bg-blue-500 text-white p-2 rounded text-center flex items-center justify-center">
                Fila 1
              </div>
              <div className="bg-green-500 text-white p-2 rounded text-center flex items-center justify-center">
                Fila 2
              </div>
              <div className="bg-purple-500 text-white p-2 rounded text-center flex items-center justify-center">
                Fila 3
              </div>
            </div>
          </div>

          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">grid grid-cols-2 grid-rows-2</h4>
            <div className="grid grid-cols-2 grid-rows-2 gap-3 h-32 bg-white dark:bg-gray-700 p-4 rounded">
              <div className="bg-red-500 text-white p-2 rounded text-center flex items-center justify-center">
                1,1
              </div>
              <div className="bg-blue-500 text-white p-2 rounded text-center flex items-center justify-center">
                1,2
              </div>
              <div className="bg-green-500 text-white p-2 rounded text-center flex items-center justify-center">
                2,1
              </div>
              <div className="bg-yellow-500 text-white p-2 rounded text-center flex items-center justify-center">
                2,2
              </div>
            </div>
          </div>
        </div>
      ),
    },
    "grid-advanced": {
      title: "CSS Grid Avanzado",
      description: "Span, template areas y responsive",
      code: `col-span-2 row-span-2
grid-cols-[200px_1fr_100px]
auto-fit minmax(150px, 1fr)`,
      component: (
        <div className="space-y-6">
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">col-span y row-span</h4>
            <div className="grid grid-cols-4 grid-rows-3 gap-2 h-40 bg-white dark:bg-gray-700 p-4 rounded">
              <div className="col-span-2 bg-blue-500 text-white p-2 rounded text-center flex items-center justify-center">
                Col 2
              </div>
              <div className="bg-green-500 text-white p-2 rounded text-center flex items-center justify-center">
                1
              </div>
              <div className="bg-purple-500 text-white p-2 rounded text-center flex items-center justify-center">
                1
              </div>
              <div className="row-span-2 bg-red-500 text-white p-2 rounded text-center flex items-center justify-center">
                Row 2
              </div>
              <div className="bg-yellow-500 text-white p-2 rounded text-center flex items-center justify-center">
                1
              </div>
              <div className="bg-pink-500 text-white p-2 rounded text-center flex items-center justify-center">
                1
              </div>
              <div className="col-span-2 bg-indigo-500 text-white p-2 rounded text-center flex items-center justify-center">
                Col 2
              </div>
            </div>
          </div>

          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">grid-cols-[200px_1fr_100px]</h4>
            <div className="grid grid-cols-[200px_1fr_100px] gap-4 h-20 bg-white dark:bg-gray-700 p-4 rounded">
              <div className="bg-blue-500 text-white p-2 rounded text-center flex items-center justify-center">
                200px
              </div>
              <div className="bg-green-500 text-white p-2 rounded text-center flex items-center justify-center">
                Flexible
              </div>
              <div className="bg-purple-500 text-white p-2 rounded text-center flex items-center justify-center">
                100px
              </div>
            </div>
          </div>

          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">auto-fit minmax(150px, 1fr)</h4>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-4 h-30 bg-white dark:bg-gray-700 p-4 rounded">
              <div className="bg-red-500 text-white p-2 rounded text-center flex items-center justify-center">
                Auto
              </div>
              <div className="bg-blue-500 text-white p-2 rounded text-center flex items-center justify-center">
                Fit
              </div>
              <div className="bg-green-500 text-white p-2 rounded text-center flex items-center justify-center">
                MinMax
              </div>
              <div className="bg-yellow-500 text-white p-2 rounded text-center flex items-center justify-center">
                Responsive
              </div>
            </div>
          </div>
        </div>
      ),
    },
    responsive: {
      title: "Diseño Responsive",
      description: "Breakpoints y adaptabilidad",
      code: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3
flex-col sm:flex-row
hidden md:block`,
      component: (
        <div className="space-y-6">
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">
              grid-cols-1 md:grid-cols-2 lg:grid-cols-3
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 h-32 bg-white dark:bg-gray-700 p-4 rounded">
              <div className="bg-blue-500 text-white p-2 rounded text-center flex items-center justify-center">
                1 col (móvil)
              </div>
              <div className="bg-green-500 text-white p-2 rounded text-center flex items-center justify-center">
                2 cols (tablet)
              </div>
              <div className="bg-purple-500 text-white p-2 rounded text-center flex items-center justify-center">
                3 cols (desktop)
              </div>
            </div>
          </div>

          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">flex-col sm:flex-row</h4>
            <div className="flex flex-col sm:flex-row gap-4 h-20 bg-white dark:bg-gray-700 p-4 rounded">
              <div className="bg-red-500 text-white p-2 rounded text-center flex-1 flex items-center justify-center">
                Columna → Fila
              </div>
              <div className="bg-yellow-500 text-white p-2 rounded text-center flex-1 flex items-center justify-center">
                Responsive
              </div>
            </div>
          </div>

          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">
              hidden md:block (elemento oculto en móvil)
            </h4>
            <div className="h-20 bg-white dark:bg-gray-700 p-4 rounded flex items-center justify-center">
              <div className="bg-blue-500 text-white p-2 rounded text-center">
                Siempre visible
              </div>
              <div className="hidden md:block bg-green-500 text-white p-2 rounded text-center ml-4">
                Solo desktop
              </div>
            </div>
          </div>
        </div>
      ),
    },
  };

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Flexbox y Grid - Ejemplos Interactivos
          </h1>
          <p className="text-xl text-muted-foreground">
            Aprende los fundamentos de los sistemas de layout más poderosos de
            CSS
          </p>
        </div>

        {/* Navigation */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {Object.entries(examples).map(([key, example]) => (
            <button
              key={key}
              onClick={() => setSelectedExample(key as keyof typeof examples)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedExample === key
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {example.title}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Code */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Código Tailwind CSS
            </h3>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
              <pre>{examples[selectedExample].code}</pre>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              {examples[selectedExample].description}
            </p>
          </div>

          {/* Preview */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Vista Previa
            </h3>
            <div className="space-y-4">
              {examples[selectedExample].component}
            </div>
          </div>
        </div>

        {/* Tips */}
        <div className="mt-12 bg-muted/50 border border-border rounded-xl p-6">
          <h3 className="text-xl font-semibold text-foreground mb-4">
            💡 Consejos Prácticos
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-foreground mb-2">
                Flexbox es ideal para:
              </h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Alinear elementos en una dimensión</li>
                <li>• Distribuir espacio entre elementos</li>
                <li>• Centrar contenido vertical/horizontalmente</li>
                <li>• Layouts de navegación y barras</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-2">
                CSS Grid es ideal para:
              </h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Layouts bidimensionales complejos</li>
                <li>• Diseños de página completos</li>
                <li>• Grids de contenido responsivos</li>
                <li>• Alineación precisa de elementos</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
