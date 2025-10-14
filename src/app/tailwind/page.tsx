'use client'

import Link from 'next/link'

export default function TailwindPage() {
  const flexboxGridTopics = [
    {
      title: 'Flexbox y Grid Básico',
      description: 'Aprende los fundamentos de Flexbox y Grid',
      href: '/tailwind/flexbox_grid',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
        </svg>
      ),
      color: 'bg-blue-500'
    },
    {
      title: 'Espaciado y colores',
      description: 'Uso de espaciado y colores',
      href: '/tailwind/space_colors',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      color: 'bg-teal-500'
    },
    {
      title: 'Tipografía y diseño responsive',
      description: 'Uso de tipografía y diseño responsive',
      href: '/tailwind/typography_rdesing',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
      color: 'bg-red-500'
    }
  ]

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Tailwind CSS - Flexbox & Grid
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Aprende a dominar los sistemas de layout más poderosos de CSS con ejemplos prácticos
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {flexboxGridTopics.map((topic, index) => (
            <Link
              key={index}
              href={topic.href}
              className="group block"
            >
              <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg hover:shadow-black/5 transition-all duration-300 hover:-translate-y-1">
                {/* Icon */}
                <div className={`${topic.color} w-16 h-16 rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  {topic.icon}
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {topic.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {topic.description}
                  </p>
                </div>

                {/* Arrow */}
                <div className="flex justify-end mt-4">
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}


