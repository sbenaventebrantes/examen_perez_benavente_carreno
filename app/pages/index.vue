<script setup>
definePageMeta({
  layout: 'default'
})
</script>

<template>
  <div class="space-y-8 sm:space-y-12">
    <!-- Hero Section -->
    <section
      class="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 dark:from-primary-900 dark:via-primary-950 dark:to-black rounded-2xl p-8 sm:p-12 lg:p-16 text-white overflow-hidden relative shadow-2xl border border-primary-500/20"
      aria-label="Introducción a LicitaSeguro">

      <div class="absolute -top-20 -right-20 w-96 h-96 bg-primary-400/20 rounded-full blur-3xl" aria-hidden="true" />
      <div class="absolute -bottom-20 -left-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" aria-hidden="true" />

      <div class="relative z-10 max-w-3xl">
        <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 leading-[1.1] tracking-tight">
          Transparencia en <span class="text-primary-300">Licitaciones Públicas</span>
        </h1>
        <p class="text-lg sm:text-xl md:text-2xl text-primary-100/90 mb-10 font-light">
          LicitaSeguro te ayuda a consultar, buscar y analizar licitaciones públicas de Mercado Público en Chile de
          forma simple y profesional.
        </p>

        <div class="flex flex-col sm:flex-row gap-4">
          <NuxtLink to="/licitaciones"
            class="px-8 py-4 bg-white text-primary-800 font-bold rounded-xl hover:bg-primary-50 transition-all text-center shadow-lg hover:shadow-primary-500/20">
            Explorar Licitaciones
          </NuxtLink>
          <NuxtLink to="/proveedores"
            class="px-8 py-4 bg-primary-800/50 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-primary-800 transition-all border border-primary-400/50 text-center">
            Buscar Proveedores
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Features Grid -->
    <section class="py-6 sm:py-12">
      <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6 sm:mb-12 text-center">
        Características
      </h2>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        <!-- Feature 1 -->
        <div
          class="bg-white dark:bg-gray-900 rounded-lg sm:rounded-xl p-6 border border-gray-200 dark:border-gray-800 hover:shadow-lg transition-shadow">
          <div
            class="w-12 h-12 sm:w-14 sm:h-14 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4 sm:mb-6">
            <UIcon name="i-heroicons-document-magnifying-glass"
              class="w-6 h-6 sm:w-7 sm:h-7 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 class="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3">
            Búsqueda Avanzada
          </h3>
          <p class="text-sm sm:text-base text-gray-600 dark:text-gray-400">
            Filtra licitaciones por estado y fecha.
          </p>
        </div>

        <!-- Feature 2 -->
        <div
          class="bg-white dark:bg-gray-900 rounded-lg sm:rounded-xl p-6 border border-gray-200 dark:border-gray-800 hover:shadow-lg transition-shadow">
          <div
            class="w-12 h-12 sm:w-14 sm:h-14 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-4 sm:mb-6">
            <UIcon name="i-heroicons-building-office-2"
              class="w-6 h-6 sm:w-7 sm:h-7 text-purple-600 dark:text-purple-400" />
          </div>
          <h3 class="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3">
            Proveedores
          </h3>
          <p class="text-sm sm:text-base text-gray-600 dark:text-gray-400">
            Consulta datos verificados con RUT.
          </p>
        </div>

        <!-- Feature 3 -->
        <div
          class="bg-white dark:bg-gray-900 rounded-lg sm:rounded-xl p-6 border border-gray-200 dark:border-gray-800 hover:shadow-lg transition-shadow">
          <div
            class="w-12 h-12 sm:w-14 sm:h-14 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-4 sm:mb-6">
            <UIcon name="i-heroicons-shield-check" class="w-6 h-6 sm:w-7 sm:h-7 text-green-600 dark:text-green-400" />
          </div>
          <h3 class="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3">
            Datos Oficiales
          </h3>
          <p class="text-sm sm:text-base text-gray-600 dark:text-gray-400">
            Información en tiempo real desde Mercado Público.
          </p>
        </div>

        <!-- Feature 4 -->
        <div
          class="bg-white dark:bg-gray-900 rounded-lg sm:rounded-xl p-6 border border-gray-200 dark:border-gray-800 hover:shadow-lg transition-shadow">
          <div
            class="w-12 h-12 sm:w-14 sm:h-14 bg-amber-100 dark:bg-amber-900/30 rounded-lg flex items-center justify-center mb-4 sm:mb-6">
            <UIcon name="i-heroicons-chart-bar" class="w-6 h-6 sm:w-7 sm:h-7 text-amber-600 dark:text-amber-400" />
          </div>
          <h3 class="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3">
            Detalles
          </h3>
          <p class="text-sm sm:text-base text-gray-600 dark:text-gray-400">
            Visualiza información completa de cada licitación.
          </p>
        </div>

        <!-- Feature 5 -->
        <div
          class="bg-white dark:bg-gray-900 rounded-lg sm:rounded-xl p-6 border border-gray-200 dark:border-gray-800 hover:shadow-lg transition-shadow">
          <div
            class="w-12 h-12 sm:w-14 sm:h-14 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center mb-4 sm:mb-6">
            <UIcon name="i-heroicons-device-phone-mobile"
              class="w-6 h-6 sm:w-7 sm:h-7 text-red-600 dark:text-red-400" />
          </div>
          <h3 class="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3">
            Responsivo
          </h3>
          <p class="text-sm sm:text-base text-gray-600 dark:text-gray-400">
            Funciona perfectamente en móvil, tablet y desktop.
          </p>
        </div>

        <!-- Feature 6 -->
        <div
          class="bg-white dark:bg-gray-900 rounded-lg sm:rounded-xl p-6 border border-gray-200 dark:border-gray-800 hover:shadow-lg transition-shadow">
          <div
            class="w-12 h-12 sm:w-14 sm:h-14 bg-pink-100 dark:bg-pink-900/30 rounded-lg flex items-center justify-center mb-4 sm:mb-6">
            <UIcon name="i-heroicons-accessibility" class="w-6 h-6 sm:w-7 sm:h-7 text-pink-600 dark:text-pink-400" />
          </div>
          <h3 class="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3">
            Accesible
          </h3>
          <p class="text-sm sm:text-base text-gray-600 dark:text-gray-400">
            Cumple WCAG 2.1 AA para todos.
          </p>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section
      class="bg-gradient-to-r from-primary-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 rounded-lg sm:rounded-2xl p-6 sm:p-12 border border-primary-200 dark:border-gray-700">
      <div class="max-w-2xl mx-auto text-center">
        <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
          ¿Listo para comenzar?
        </h2>
        <p class="text-sm sm:text-lg text-gray-600 dark:text-gray-300 mb-6 sm:mb-8">
          Explora miles de licitaciones públicas disponibles en Chile.
        </p>

        <NuxtLink to="/licitaciones"
          class="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors text-sm sm:text-base">
          <UIcon name="i-heroicons-arrow-right" />
          Ir a Licitaciones
        </NuxtLink>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="py-6 sm:py-12">
      <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6 sm:mb-12 text-center">
        Por Qué Elegirnos
      </h2>

      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8">
        <div class="text-center">
          <div class="text-3xl sm:text-4xl font-bold text-primary-600 dark:text-primary-400 mb-1 sm:mb-2">100%</div>
          <p class="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Datos Actualizados</p>
        </div>
        <div class="text-center">
          <div class="text-3xl sm:text-4xl font-bold text-purple-600 dark:text-purple-400 mb-1 sm:mb-2">24/7</div>
          <p class="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Disponible</p>
        </div>
        <div class="text-center">
          <div class="text-3xl sm:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-1 sm:mb-2">Gratis</div>
          <p class="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Acceso Libre</p>
        </div>
        <div class="text-center">
          <div class="text-3xl sm:text-4xl font-bold text-green-600 dark:text-green-400 mb-1 sm:mb-2">Seguro</div>
          <p class="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Verificado</p>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="py-6 sm:py-12">
      <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6 sm:mb-12 text-center">
        Preguntas Frecuentes
      </h2>

      <div class="max-w-2xl mx-auto space-y-2 sm:space-y-4">
        <UAccordion :items="[
          {
            label: '¿Cómo consulto una licitación?',
            content: 'Dirígete a Licitaciones, filtra por estado o fecha, y haz clic en la que necesites para ver detalles completos.'
          },
          {
            label: '¿Puedo validar a un proveedor?',
            content: 'Sí, en Proveedores ingresa el RUT de una empresa para validar su información en ChileCompra.'
          },
          {
            label: '¿Los datos están actualizados?',
            content: 'Sí, se actualizan en tiempo real desde la API oficial de Mercado Público.'
          },
          {
            label: '¿Es accesible?',
            content: 'Sí, cumple estándares WCAG 2.1 AA con navegación por teclado y soporte para lectores de pantalla.'
          }
        ]" />
      </div>
    </section>
  </div>
</template>

<style scoped>
a:focus-visible {
  outline: 2px solid rgb(59, 130, 246);
  outline-offset: 2px;
}
</style>
