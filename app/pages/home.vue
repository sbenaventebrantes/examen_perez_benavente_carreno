<script setup>
definePageMeta({
  layout: 'default'
})
</script>

<template>
  <div class="space-y-12">
    <section class="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 rounded-2xl p-8 sm:p-12 border border-gray-200 dark:border-gray-800 overflow-hidden relative" aria-label="Introducción a LicitaSeguro">
      <div class="absolute -top-40 -right-40 w-80 h-80 bg-primary-500/10 rounded-full blur-3xl" aria-hidden="true" />
      <div class="absolute -bottom-20 -left-20 w-60 h-60 bg-primary-400/10 rounded-full blur-3xl" aria-hidden="true" />
      
      <div class="relative z-10 max-w-3xl">
        <h1 class="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight text-gray-900 dark:text-white">
          Transparencia en <span class="text-primary-600 dark:text-primary-400">Licitaciones Públicas</span>
        </h1>
        <p class="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 font-light">
          LicitaSeguro te ayuda a consultar, buscar y analizar licitaciones públicas de Mercado Público en Chile de forma simple y rápida.
        </p>
        
        <div class="flex flex-col sm:flex-row gap-4">
          <NuxtLink to="/licitaciones" class="px-8 py-4 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-all text-center shadow-md hover:shadow-lg" aria-label="Ir al módulo para explorar licitaciones">
            Explorar Licitaciones
          </NuxtLink>
          <NuxtLink to="/proveedores" class="px-8 py-4 bg-white dark:bg-gray-800 text-primary-600 dark:text-primary-400 font-semibold rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all border-2 border-primary-600 dark:border-primary-500 text-center" aria-label="Ir al módulo para buscar proveedores por RUT">
            Buscar Proveedores
          </NuxtLink>
        </div>
      </div>
    </section>

    <section class="py-12" aria-label="Características principales">
      <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">
        Características Principales
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        <div class="bg-white dark:bg-gray-900 rounded-xl p-8 border border-gray-200 dark:border-gray-800 hover:shadow-lg transition-shadow">
          <div class="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-6" aria-hidden="true">
            <UIcon name="i-heroicons-document-magnifying-glass" class="w-7 h-7 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3">Búsqueda Avanzada</h3>
          <p class="text-gray-600 dark:text-gray-400">Filtra licitaciones por estado, fecha de publicación y términos de búsqueda personalizados.</p>
        </div>

        <div class="bg-white dark:bg-gray-900 rounded-xl p-8 border border-gray-200 dark:border-gray-800 hover:shadow-lg transition-shadow">
          <div class="w-14 h-14 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-6" aria-hidden="true">
            <UIcon name="i-heroicons-building-office-2" class="w-7 h-7 text-purple-600 dark:text-purple-400" />
          </div>
          <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3">Información de Proveedores</h3>
          <p class="text-gray-600 dark:text-gray-400">Consulta datos verificados de proveedores registrados usando su RUT.</p>
        </div>

        <div class="bg-white dark:bg-gray-900 rounded-xl p-8 border border-gray-200 dark:border-gray-800 hover:shadow-lg transition-shadow">
          <div class="w-14 h-14 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-6" aria-hidden="true">
            <UIcon name="i-heroicons-shield-check" class="w-7 h-7 text-green-600 dark:text-green-400" />
          </div>
          <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3">Datos Oficiales</h3>
          <p class="text-gray-600 dark:text-gray-400">Información en tiempo real desde la plataforma oficial de Mercado Público.</p>
        </div>
      </div>
    </section>

    <section class="bg-gradient-to-r from-primary-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 rounded-2xl p-8 sm:p-12 border border-primary-200 dark:border-gray-700" aria-label="Llamado a la acción">
      <div class="max-w-2xl mx-auto text-center">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          ¿Listo para comenzar?
        </h2>
        <p class="text-lg text-gray-600 dark:text-gray-300 mb-8">
          Explora miles de licitaciones públicas disponibles en Chile. Todo en un solo lugar.
        </p>
        
        <NuxtLink to="/licitaciones" class="inline-flex items-center gap-2 px-8 py-4 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors" aria-label="Ir directamente a la página de búsqueda de licitaciones">
          <UIcon name="i-heroicons-arrow-right" aria-hidden="true" />
          Ir a Licitaciones
        </NuxtLink>
      </div>
    </section>

    <section class="py-12" aria-label="Preguntas Frecuentes">
      <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
        Preguntas Frecuentes
      </h2>

      <div class="max-w-2xl mx-auto space-y-4">
        <UAccordion :items="[
          { label: '¿Cómo consulto una licitación?', content: 'Dirígete a la sección Licitaciones, usa los filtros disponibles (estado, fecha) y realiza tu búsqueda. Haz clic en cualquier licitación para ver detalles completos.' },
          { label: '¿Puedo validar a un proveedor?', content: 'Sí, en la sección Proveedores puedes ingresar el RUT de una empresa para validar su información registrada.' },
          { label: '¿Los datos están actualizados?', content: 'Nuestros datos se actualizan en tiempo real desde la API oficial de Mercado Público.' },
          { label: '¿Es accesible para personas con discapacidad?', content: 'Sí, nuestro portal cumple con estándares WCAG 2.1 AA de accesibilidad, incluyendo navegación por teclado.' }
        ]" />
      </div>
    </section>
  </div>
</template>

<style scoped>
/* Resaltado claro al navegar usando la tecla TAB */
a:focus-visible,
button:focus-visible {
  outline: 2px solid rgb(59, 130, 246); outline-offset: 2px;
}
</style>