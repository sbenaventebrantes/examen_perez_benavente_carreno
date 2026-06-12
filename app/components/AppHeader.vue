<template>
  <header
    class="bg-gradient-to-r from-primary-600 to-primary-800 dark:from-primary-900 dark:to-primary-950 shadow-lg border-b border-primary-700">
    <UContainer class="py-3 sm:py-4 lg:py-6">
      <div class="flex justify-between items-center mb-2 sm:mb-4">
        <NuxtLink to="/" class="flex items-center gap-2 sm:gap-3 hover:opacity-80 transition-opacity"
          aria-label="Ir al inicio de LicitaSeguro">
          <div
            class="w-8 h-8 sm:w-10 sm:h-10 bg-white dark:bg-gray-800 rounded-lg flex items-center justify-center shadow-md flex-shrink-0">
            <UIcon name="i-heroicons-document-text" class="w-5 h-5 sm:w-6 sm:h-6 text-primary-600 dark:text-primary-400" />
          </div>
          <div class="hidden sm:block">
            <h1 class="text-xl sm:text-2xl font-bold text-white">LicitaSeguro</h1>
            <p class="text-xs text-primary-100">Portal de Licitaciones</p>
          </div>
          <div class="sm:hidden">
            <h1 class="text-lg font-bold text-white">LicitaSeguro</h1>
          </div>
        </NuxtLink>
        <UColorModeButton class="bg-white dark:text-primary-400" />
      </div>

      <nav class="flex flex-wrap gap-1 sm:gap-2 lg:gap-4" role="navigation" aria-label="Navegación principal">
        <NuxtLink to="/"
          class="px-2 sm:px-4 py-1.5 sm:py-2 rounded text-white hover:bg-primary-500 transition-colors text-xs sm:text-sm font-medium"
          active-class="bg-primary-500" aria-label="Ir al inicio">
          <UIcon name="i-heroicons-home" class="w-3.5 h-3.5 sm:w-4 sm:h-4 inline mr-1 sm:mr-2" />
          <span class="hidden sm:inline">Inicio</span>
          <span class="sm:hidden">Inicio</span>
        </NuxtLink>

        <NuxtLink to="/licitaciones"
          class="px-2 sm:px-4 py-1.5 sm:py-2 rounded text-white hover:bg-primary-500 transition-colors text-xs sm:text-sm font-medium"
          active-class="bg-primary-500" aria-label="Ir al listado de licitaciones">
          <UIcon name="i-heroicons-document" class="w-3.5 h-3.5 sm:w-4 sm:h-4 inline mr-1 sm:mr-2" />
          <span>Licitaciones</span>
        </NuxtLink>

        <NuxtLink to="/proveedores"
          class="px-2 sm:px-4 py-1.5 sm:py-2 rounded text-white hover:bg-primary-500 transition-colors text-xs sm:text-sm font-medium"
          active-class="bg-primary-500" aria-label="Ir al buscador de proveedores">
          <UIcon name="i-heroicons-building-office-2" class="w-3.5 h-3.5 sm:w-4 sm:h-4 inline mr-1 sm:mr-2" />
          <span class="hidden md:inline">Proveedores</span>
          <span class="md:hidden">Prov.</span>
        </NuxtLink>
      </nav>
    </UContainer>
  </header>
</template>

<script setup>
</script>

<style scoped>
a:focus-visible {
  outline: 2px solid white;
  outline-offset: 2px;
}
</style>