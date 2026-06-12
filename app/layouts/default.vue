<template>
  <div class="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950">
    <!-- Header Principal -->
    <AppHeader />

    <!-- Contenido Principal -->
    <main class="flex-1 py-6 lg:py-8">
      <UContainer>
        <slot />
      </UContainer>
    </main>

    <!-- Footer -->
    <footer class="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-8 px-4 lg:px-0 mt-auto">
      <UContainer>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
          <div>
            <h4 class="font-semibold text-gray-900 dark:text-white mb-3">LicitaSeguro</h4>
            <p class="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              Plataforma de información transparente sobre licitaciones públicas en Chile.
            </p>
          </div>
          <div>
            <h4 class="font-semibold text-gray-900 dark:text-white mb-3">Información</h4>
            <ul class="space-y-2 text-gray-600 dark:text-gray-400">
              <li><NuxtLink to="/" class="hover:text-primary-600 transition-colors">Home</NuxtLink></li>
              <li><NuxtLink to="/licitaciones" class="hover:text-primary-600 transition-colors">Licitaciones</NuxtLink></li>
              <li><NuxtLink to="/proveedores" class="hover:text-primary-600 transition-colors">Proveedores</NuxtLink></li>
            </ul>
          </div>
          <div>
            <h4 class="font-semibold text-gray-900 dark:text-white mb-3">Legal</h4>
            <p class="text-gray-600 dark:text-gray-400 text-xs">
              © 2026 LicitaSeguro. Todos los derechos reservados. Datos oficiales de Mercado Público.
            </p>
          </div>
        </div>
      </UContainer>
    </footer>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'default'
})
</script>

