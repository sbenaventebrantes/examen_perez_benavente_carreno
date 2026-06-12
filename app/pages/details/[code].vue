<script setup>
import { computed } from 'vue'

const route = useRoute()
const codigoLicitacion = route.params.code
const config = useRuntimeConfig()
const ticket = config.public.apiTicket

// URL con el código dinámico obtenido de los parámetros de la ruta
const urlApi = `https://api.mercadopublico.cl/servicios/v1/publico/licitaciones.json?codigo=${codigoLicitacion}&ticket=${ticket}`

// Utilizamos useFetch (nativo de Nuxt) para SSR y manejo automático de estados (pending, error, data)
const { data, pending, error } = await useFetch(urlApi)

// Extraemos el primer elemento solo si la respuesta es válida y contiene datos
const licitacion = computed(() => {
  if (data.value && data.value.Listado && data.value.Listado.length > 0) {
    return data.value.Listado[0]
  }
  return null
})

// Manejo de campos nulos: Si la API no devuelve un dato, evitamos errores en el HTML
const limpiar = (txt) => (!txt || String(txt).trim() === '' ? 'No especificado' : String(txt).trim())

// Asignación de colores semánticos según el estado de la licitación
const estadoColor = computed(() => {
  if (!licitacion.value) return 'gray'
  const estado = licitacion.value.Estado?.toLowerCase()
  switch (estado) {
    case 'publicada':
    case 'activas':
      return 'green'
    case 'adjudicada':
      return 'blue'
    case 'cerrada':
      return 'gray'
    case 'desierta':
      return 'amber'
    case 'revocada':
      return 'red'
    case 'suspendida':
      return 'orange'
    default:
      return 'gray'
  }
})
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center gap-2">
      <UButton to="/licitaciones" icon="i-heroicons-arrow-left" color="gray" variant="ghost" label="Volver al listado"
        aria-label="Volver a la página anterior de licitaciones" />
    </div>

    <div v-if="pending" class="space-y-4" aria-busy="true" aria-label="Cargando detalles de la licitación">
      <USkeleton class="h-12 w-3/4" />
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-6">
        <USkeleton class="h-64" />
        <USkeleton class="h-64" />
      </div>
    </div>

    <div v-else-if="error" role="alert" aria-live="assertive">
      <UAlert icon="i-heroicons-exclamation-triangle" color="red" title="Error al cargar"
        :description="error.statusCode === 404 || error.statusCode === 400 ? 'El código de licitación ingresado no es válido o no existe.' : 'No se pudo conectar con Mercado Público. Verifique su conexión o intente más tarde.'" />
    </div>

    <div v-else-if="licitacion" class="space-y-6">

      <section
        class="bg-white dark:bg-gray-900 rounded-lg sm:rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 p-4 sm:p-6 lg:p-8"
        role="article" aria-label="Cabecera de la licitación">
        <div class="flex flex-col md:flex-row md:items-start md:justify-between gap-3 sm:gap-6 mb-6">
          <div class="flex-1">
            <h1 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {{ limpiar(licitacion.Nombre) }}
            </h1>
            <div class="flex flex-wrap gap-3">
              <UBadge :color="estadoColor" variant="subtle" class="text-base">
                <span class="sr-only">Estado: </span>
                {{ limpiar(licitacion.Estado) }}
              </UBadge>
              <div
                class="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded text-sm font-mono text-gray-700 dark:text-gray-300">
                Código: {{ limpiar(licitacion.CodigoExterno) }}
              </div>
            </div>
          </div>
        </div>

        <div
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 pb-8 border-b border-gray-200 dark:border-gray-700">
          <div class="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <p class="text-xs text-gray-500 dark:text-gray-400 font-medium mb-1">TIPO DE LICITACIÓN</p>
            <p class="text-lg font-semibold text-gray-900 dark:text-white">{{ limpiar(licitacion.Tipo) }}</p>
          </div>

          <div
            class="p-4 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg">
            <p class="text-xs text-gray-500 dark:text-gray-400 font-medium mb-1">FECHA DE CIERRE</p>
            <p class="text-lg font-semibold text-gray-900 dark:text-white">{{ limpiar(licitacion.FechaCierre) }}</p>
          </div>

          <div class="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
            <p class="text-xs text-gray-500 dark:text-gray-400 font-medium mb-1">PRESUPUESTO ESTIMADO</p>
            <p class="text-lg font-semibold text-gray-900 dark:text-white">
              {{ limpiar(licitacion.MontoEstimado) === 'No especificado' ? 'No disponible' : limpiar(licitacion.MontoEstimado) }}</p>
          </div>
        </div>
      </section>

      <section
        class="bg-white dark:bg-gray-900 rounded-lg sm:rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 p-4 sm:p-6 lg:p-8">
        <h2 class="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <UIcon name="i-heroicons-document-text" class="w-6 h-6 text-primary-500" aria-hidden="true" />
          Descripción
        </h2>
        <div class="prose prose-sm dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed">
          {{ limpiar(licitacion.Descripcion) }}
        </div>
      </section>

      <section v-if="licitacion.Comprador"
        class="bg-white dark:bg-gray-900 rounded-lg sm:rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 p-4 sm:p-6 lg:p-8">
        <h2 class="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <UIcon name="i-heroicons-building-office" class="w-6 h-6 text-purple-500" aria-hidden="true" />
          Organismo Comprador
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-6">
          <div class="border-l-4 border-purple-500 pl-4">
            <p class="text-sm text-gray-500 dark:text-gray-400 font-medium mb-1">NOMBRE</p>
            <p class="text-lg font-semibold text-gray-900 dark:text-white">{{
              limpiar(licitacion.Comprador.NombreOrganismo) }}</p>
          </div>

          <div class="border-l-4 border-blue-500 pl-4">
            <p class="text-sm text-gray-500 dark:text-gray-400 font-medium mb-1">RUT UNIDAD</p>
            <p class="text-lg font-semibold text-gray-900 dark:text-white">{{ limpiar(licitacion.Comprador.RutUnidad) }}
            </p>
          </div>

          <div class="border-l-4 border-green-500 pl-4">
            <p class="text-sm text-gray-500 dark:text-gray-400 font-medium mb-1">REGIÓN</p>
            <p class="text-lg font-semibold text-gray-900 dark:text-white">{{ limpiar(licitacion.Comprador.RegionUnidad)
              }}</p>
          </div>

          <div class="border-l-4 border-orange-500 pl-4">
            <p class="text-sm text-gray-500 dark:text-gray-400 font-medium mb-1">CONTACTO</p>
            <p class="text-lg font-semibold text-gray-900 dark:text-white">{{
              limpiar(licitacion.Comprador.ContactoUnidad) }}</p>
          </div>
        </div>
      </section>

      <section
        class="bg-white dark:bg-gray-900 rounded-lg sm:rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 p-4 sm:p-6 lg:p-8">
        <h2 class="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <UIcon name="i-heroicons-cog-6-tooth" class="w-6 h-6 text-amber-500" aria-hidden="true" />
          Información Técnica
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-6">
          <div class="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <p class="text-xs text-gray-500 dark:text-gray-400 font-medium mb-2">ID LICITACIÓN</p>
            <p class="font-mono text-sm text-gray-900 dark:text-white break-all">{{ limpiar(licitacion.CodigoExterno) }}
            </p>
          </div>

          <div class="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <p class="text-xs text-gray-500 dark:text-gray-400 font-medium mb-2">ESTADO ACTUAL</p>
            <UBadge :color="estadoColor" variant="subtle">{{ limpiar(licitacion.Estado) }}</UBadge>
          </div>
        </div>
      </section>

      <section class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6"
        role="complementary" aria-label="Información importante y enlaces externos">
        <div class="flex gap-4">
          <UIcon name="i-heroicons-information-circle"
            class="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
          <div>
            <h3 class="font-semibold text-blue-900 dark:text-blue-100 mb-2">¿Necesitas más información?</h3>
            <p class="text-sm text-blue-800 dark:text-blue-200">
              Visita Mercado Público para obtener detalles completos, bases de licitación y descargar documentos
              adjuntos.
            </p>
            <UButton :to="`https://www.mercadopublico.cl/Home/BusquedaLicitacion?codigo=${codigoLicitacion}`"
              target="_blank" icon="i-heroicons-arrow-top-right-on-square" label="Ir a Mercado Público" variant="ghost"
              color="blue" class="mt-3"
              aria-label="Abrir detalles de esta licitación en la web oficial de Mercado Público (abre en nueva pestaña)" />
          </div>
        </div>
      </section>
    </div>

    <div v-else
      class="text-center py-16 bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800"
      role="status" aria-live="polite">
      <UIcon name="i-heroicons-magnifying-glass" class="w-16 h-16 mx-auto text-gray-400 mb-4" aria-hidden="true" />
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">Licitación no encontrada</h2>
      <p class="text-gray-600 dark:text-gray-400 mb-6">
        El código ingresado no existe o fue retirado de la plataforma.
      </p>
      <UButton to="/licitaciones" icon="i-heroicons-arrow-left" label="Volver al listado"
        aria-label="Volver a la página principal de búsqueda de licitaciones" />
    </div>
  </div>
</template>

<style scoped>
/* Asegurando foco visible para navegación por teclado */
button:focus-visible,
a:focus-visible {
  outline: 2px solid rgb(59, 130, 246);
  outline-offset: 2px;
}
</style>