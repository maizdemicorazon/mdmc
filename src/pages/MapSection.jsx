import React from "react";

// Componente con múltiples opciones de mapa
function MapSection() {
  // Opción 1: Google Maps Embed (requiere URL de embed válida)
  const googleMapsEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3763.902841341209!2d-99.11227948753401!3d19.373359181817786!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1ff006b5f9ed1%3A0xea7220713b979e11!2zTWHDrXogZGUgbWkgY29yYXrDs24!5e0!3m2!1ses-419!2smx!4v1750818317582!5m2!1ses-419!2smx";
  
  // Coordenadas de ejemplo (Ciudad de México - reemplaza con las tuyas)
  const lat = 19.3733592;
  const lng = -99.1096992;
  
  return (
    <section className="max-w-4xl mx-auto py-8 px-4">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-red-600 dark:from-yellow-400 dark:to-red-400">
        📍 ¿Dónde estamos?
      </h2>

      {/* Información de ubicación */}
      <div className="mt-6 p-4 bg-yellow-50 dark:bg-zinc-700 rounded-xl">
        <h4 className="font-bold text-zinc-800 dark:text-white mb-2">📍 Dirección:</h4>
        <p className="text-zinc-700 dark:text-zinc-300">
          Laboratoristas 311, El Sifón, Iztapalapa, 09400 Ciudad de México, CDMX
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <span className="font-semibold text-zinc-800 dark:text-white">🕒 Horarios:</span>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Lun-Dom: 17:00 AM - 21:45 PM
            </p>
          </div>
          <div>
            <span className="font-semibold text-zinc-800 dark:text-white">📞 Teléfono:</span>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              55 9164 6649
            </p>
          </div>
        </div>
      </div>
      
      {/* Google Maps*/}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3 text-zinc-800 dark:text-white">Google Maps</h3>
        <div className="rounded-3xl overflow-hidden shadow-2xl border-2 border-yellow-300 dark:border-yellow-700">
          <iframe
            title="Ubicación Maíz de mi Corazón - Google Maps"
            src={googleMapsEmbedUrl}
            className="w-full h-64 md:h-80"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>

      {/*Botones de navegación */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3 text-zinc-800 dark:text-white">Trazar ruta</h3>
        <div className="bg-white dark:bg-zinc-800 rounded-2xl shadow-xl p-6 border border-yellow-200 dark:border-yellow-800">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a
              href="https://maps.app.goo.gl/TFodYU7ajWoxBeVT8"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
            >
              <span className="text-xl">🗺️</span>
              Ver en Google Maps
            </a>
            <a
              href={`https://www.waze.com/live-map/directions?to=ll.${lat}%2C${lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
            >
              <span className="text-xl">🚗</span>
              Abrir en Waze
            </a>
            <a
              href={`https://maps.apple.com/?q=${lat},${lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-gray-600 hover:bg-gray-700 text-white py-3 px-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
            >
              <span className="text-xl">🍎</span>
              Apple Maps
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MapSection;