// Nombre único de la memoria caché. Cambiar el número de versión obliga a los teléfonos a actualizarse
const CACHE_NAME = 'casj-cotizador-v1';

// Listado de recursos críticos que la aplicación necesita para funcionar de forma autónoma
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './app.js',
  './manifest.json',
  './icon.png'
];

// Evento de Instalación: Se ejecuta la primera vez que se visita la web
self.addEventListener('install', evento => {
  evento.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Abriendo caché y almacenando la interfaz del cotizador...');
      return cache.addAll(ASSETS_TO_CACHE);
    }).then(() => self.skipWaiting()) // Fuerza al Service Worker a activarse de inmediato
  );
});

// Evento de Activación: Limpia memorias cachés viejas si se actualizó el sistema
self.addEventListener('activate', evento => {
  evento.waitUntil(
    caches.keys().then(clavesCache => {
      return Promise.all(
        clavesCache.map(clave => {
          if (clave !== CACHE_NAME) {
            console.log('Eliminando caché antiguo obsoleto:', clave);
            return caches.delete(clave);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Evento Fetch: Intercepta las peticiones. Si el archivo está en caché, lo sirve al instante sin usar internet
self.addEventListener('fetch', evento => {
  evento.respondWith(
    caches.match(evento.request).then(respuestaCacheada => {
      // Retorna el archivo de la memoria si existe, sino va a la red de GitHub
      return respuestaCacheada || fetch(evento.request);
    })
  );
});
