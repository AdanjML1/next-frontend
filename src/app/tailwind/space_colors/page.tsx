"use client";

import { useState } from "react";
export default function SpaceColorsPage() {
  const [selectedExample, setSelectedExample] =
    useState<keyof typeof examples>("Padding");

  const examples = {
    "Padding": {
      title: "Paddings Básico",
      description: "Propiedades fundamentales de Paddings",
      code: `p-8 
      pt-6
      pb-6
      pl-6
      pr-6`,
      component: (
        <div className="space-y-6">
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Paddings Básico p-8</h4>
            <div className="flex flex-col gap-4 h-48 bg-white dark:bg-gray-700 p-4 rounded">
              <div className="bg-blue-500 text-white p-8 rounded text-center">
                Padding 8
              </div>
            </div>
          </div>

          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Añadir padding a los lados</h4>
            <div className="flex justify-center items-center h-32 bg-white dark:bg-gray-700 p-2 rounded gap-x-4">
              <div className="bg-blue-500 text-white pt-6 rounded text-center">
                Padding Top 6
              </div>
              <div className="bg-blue-500 text-white pb-6 rounded text-center">
                Padding Bottom 6
              </div>
              <div className="bg-blue-500 text-white pl-6 rounded text-center">
                Padding Left 6
              </div>
              <div className="bg-blue-500 text-white pr-6 rounded text-center">
                Padding Right 6
              </div>
            </div>
          </div>
        </div>
      ),
    },
    "Colores": {
      title: "Colores básico",
      description: "Colores",
      code: 
    `bg-blue-500
    bg-green-500
    bg-purple-500
    bg-red-500
    bg-yellow-500
    bg-pink-500`,
      component: (
        <div className="space-y-6">
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Algunos colores basicos</h4>
            <div className="grid gap-4 bg-white dark:bg-gray-700 p-4 rounded">
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
        </div>
      ),
    }
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
