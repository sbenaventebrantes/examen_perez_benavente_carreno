<script setup>
import { ref, computed, watch } from 'vue'

// 1. Configuración inicial y variables de estado
const config = useRuntimeConfig()
const ticket = config.public.apiTicket

// Calculamos la fecha de hoy usando la hora local para bloquear días futuros en el calendario
const hoy = new Date()
const year = hoy.getFullYear()
const month = String(hoy.getMonth() + 1).padStart(2, '0')
const day = String(hoy.getDate()).padStart(2, '0')
const maxDate = `${year}-${month}-${day}`

// Variables reactivas para los filtros y la paginación
const fechaInput = ref('')
const estadoSeleccionado = ref({ label: 'Activas', value: 'activas' })
const searchQuery = ref('')
const paginaActual = ref(1)
const itemsPorPagina = 10

// Opciones disponibles para el select de estados
const opcionesEstados = [
  { label: 'Activas', value: 'activas' },
  { label: 'Publicada', value: 'publicada' },
  { label: 'Cerrada', value: 'cerrada' },
  { label: 'Desierta', value: 'desierta' },
  { label: 'Adjudicada', value: 'adjudicada' },
  { label: 'Revocada', value: 'revocada' },
  { label: 'Suspendida', value: 'suspendida' },
  { label: 'Todas', value: '' }
]

// Diccionario para mapear los códigos que devuelve la API a texto legible
const estadoMap = {
  '5': 'Publicada',
  '6': 'Cerrada',
  '7': 'Desierta',
  '8': 'Adjudicada',
  '18': 'Revocada',
  '19': 'Suspendida'
}

// Transformamos la fecha del input (YYYY-MM-DD) al formato que exige la API (DDMMAAAA)
const fechaFormateada = computed(() => {
  if (!fechaInput.value) return ''
  const [year, month, day] = fechaInput.value.split('-')
  return `${day}${month}${year}`
})

// 2. Lógica de Experiencia de Usuario (UX) en los filtros
// Si el usuario elige una fecha estando en "Activas", lo pasamos a "Publicada" 
// automáticamente para evitar errores con la API.
watch(fechaInput, (nuevaFecha) => {
  if (nuevaFecha && estadoSeleccionado.value.value === 'activas') {
    const opcionPublicada = opcionesEstados.find(opcion => opcion.value === 'publicada')
    if (opcionPublicada) {
      estadoSeleccionado.value = opcionPublicada
    }
  }
})

// Si el usuario se arrepiente y vuelve a elegir "Activas", limpiamos la fecha.
watch(estadoSeleccionado, (nuevoEstado) => {
  if (nuevoEstado.value === 'activas' && fechaInput.value !== '') {
    fechaInput.value = ''
  }
})

// Si el usuario usa cualquier filtro, lo devolvemos a la página 1 para que no se pierda.
watch([searchQuery, estadoSeleccionado, fechaInput], () => {
  paginaActual.value = 1
})

// Scroll suave hacia arriba cada vez que se cambia de página.
watch(paginaActual, () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
})

// 3. Consumo de la API de Mercado Público
const { data, pending, error, refresh } = useAsyncData(
  'licitaciones',
  () => {
    let url = `https://api.mercadopublico.cl/servicios/v1/publico/licitaciones.json?ticket=${ticket}`
    const estado = estadoSeleccionado.value?.value

    // Manejo específico según las reglas de la API: 
    // 'activas' no soporta búsqueda por fecha, los demás estados sí.
    if (estado === 'activas') {
      url += `&estado=activas`
    } else {
      if (estado) url += `&estado=${estado}`
      if (fechaFormateada.value) url += `&fecha=${fechaFormateada.value}`
    }

    return $fetch(url)
  },
  {
    lazy: true, // No bloqueamos el renderizado inicial de la interfaz
    default: () => ({ Listado: [] }), // Prevenimos errores si la carga inicial es nula
    watch: [estadoSeleccionado, fechaFormateada] // Reactividad: re-ejecuta la llamada si cambian
  }
)

// Función auxiliar para manejar datos nulos o vacíos desde la API
const limpiarTexto = (texto) => {
  if (!texto || String(texto).trim() === '') return '--'
  return String(texto).trim()
}

// 4. Procesamiento y filtrado local de los datos
const licitacionesProcesadas = computed(() => {
  // Validación de seguridad por si la respuesta de la API viene mal formada
  if (!data.value || !data.value.Listado || data.value.Listado.length === 0) return []

  // Filtramos la lista por el input de texto y mapeamos los estados
  return data.value.Listado.filter(licitacion => {
    const nombre = limpiarTexto(licitacion.Nombre).toLowerCase()
    const codigo = limpiarTexto(licitacion.CodigoExterno).toLowerCase()
    const busqueda = searchQuery.value.toLowerCase().trim()

    return nombre.includes(busqueda) || codigo.includes(busqueda)
  }).map(licitacion => ({
    ...licitacion,
    Estado: estadoMap[String(licitacion.CodigoEstado)] || 'Sin estado'
  }))
})

// Lógica para cortar el array de resultados según la página en la que estemos
const licitacionesPaginadas = computed(() => {
  const inicio = (paginaActual.value - 1) * itemsPorPagina
  const fin = inicio + itemsPorPagina
  return licitacionesProcesadas.value.slice(inicio, fin)
})

const totalPaginas = computed(() => {
  return Math.ceil(licitacionesProcesadas.value.length / itemsPorPagina)
})

const mostrarResultados = computed(() => {
  return licitacionesProcesadas.value.length > 0
})

// Reset de todos los filtros a su estado por defecto
const limpiarFiltros = () => {
  fechaInput.value = ''
  estadoSeleccionado.value = opcionesEstados[0]
  searchQuery.value = ''
  paginaActual.value = 1
}
</script>

<template>
  <div class="space-y-4 sm:space-y-6">
    <section
      class="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-gray-900 dark:to-gray-800 rounded-lg sm:rounded-xl p-4 sm:p-6 lg:p-8 border border-primary-200 dark:border-gray-700">
      <div class="max-w-3xl">
        <h1 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3">
          Consulta de Licitaciones
        </h1>
        <p class="text-sm sm:text-base lg:text-lg text-gray-700 dark:text-gray-300">
          Información en tiempo real desde Mercado Público. Filtra y busca licitaciones disponibles.
        </p>
      </div>
    </section>

    <section
      class="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 p-4 sm:p-6"
      role="region" aria-label="Panel de filtros de búsqueda">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 mb-4 sm:mb-6">
        <h2 class="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
          <UIcon name="i-heroicons-funnel" class="w-4 h-4 sm:w-5 sm:h-5" />
          Filtros
        </h2>
        <UButton v-if="searchQuery || fechaInput || estadoSeleccionado.value" @click="limpiarFiltros" color="gray"
          variant="ghost" size="sm" icon="i-heroicons-x-mark" label="Limpiar"
          aria-label="Borrar todos los filtros aplicados" />
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div>
          <label for="buscador-texto"
            class="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 sm:mb-2">
            Búsqueda
          </label>
          <UInput id="buscador-texto" v-model="searchQuery" icon="i-heroicons-magnifying-glass-20-solid"
            placeholder="Nombre, código..." aria-label="Buscar licitaciones" class="w-full text-sm" size="sm" />
        </div>

        <div>
          <label for="filtro-estado"
            class="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 sm:mb-2">
            Estado
          </label>
          <USelectMenu id="filtro-estado" v-model="estadoSeleccionado" :items="opcionesEstados" option-attribute="label"
            class="w-full text-sm" size="sm" aria-label="Seleccionar estado" />
        </div>

        <div>
          <label for="filtro-fecha"
            class="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 sm:mb-2">
            Fecha publicación
          </label>
          <UInput id="filtro-fecha" v-model="fechaInput" type="date" aria-label="Seleccionar fecha"
            class="w-full text-sm" size="sm" :max="maxDate" />
        </div>

        <div class="flex items-end">
          <UButton @click="refresh" color="primary" icon="i-heroicons-arrow-path" label="Actualizar" block size="sm"
            aria-label="Actualizar listado" :loading="pending" />
        </div>
      </div>

      <div v-if="mostrarResultados"
        class="mt-3 sm:mt-4 p-2.5 sm:p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded text-xs sm:text-sm text-blue-700 dark:text-blue-300 flex items-center gap-2">
        <UIcon name="i-heroicons-information-circle" class="w-4 h-4 flex-shrink-0" />
        <span><strong>{{ licitacionesProcesadas.length }}</strong> resultado(s)</span>
      </div>
    </section>

    <div v-if="pending"
      class="fixed inset-0 bg-gray-950/30 dark:bg-gray-950/60 backdrop-blur-sm z-50 flex items-center justify-center"
      role="alert" aria-busy="true" aria-label="Cargando...">
      <UCard class="w-56 sm:w-64 text-center py-6 sm:py-8 shadow-2xl">
        <UIcon name="i-heroicons-arrow-path"
          class="w-8 h-8 sm:w-10 sm:h-10 animate-spin text-primary-500 mx-auto mb-2 sm:mb-3" />
        <p class="text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300">Cargando...</p>
      </UCard>
    </div>

    <div v-if="error" role="alert" aria-live="assertive">
      <UAlert icon="i-heroicons-exclamation-triangle" color="red" variant="soft" title="Error de conexión"
        :description="error?.statusCode === 404 ? 'No se encontró el recurso solicitado.' : 'No se pudo conectar con Mercado Público. Intente más tarde.'"
        class="mb-6" />
    </div>

    <div v-else-if="!mostrarResultados"
      class="text-center py-12 sm:py-16 bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800"
      role="status" aria-live="polite">
      <UIcon name="i-heroicons-inbox" class="w-12 h-12 sm:w-16 sm:h-16 mx-auto text-gray-400 mb-3 sm:mb-4" />
      <h3 class="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-1 sm:mb-2">Sin resultados</h3>
      <p class="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
        No se encontraron licitaciones con los filtros aplicados.
      </p>
    </div>

    <div v-else class="space-y-4 sm:space-y-6">

      <div v-if="pending" class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
        <div v-for="i in itemsPorPagina" :key="i" class="h-40 bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse" />
      </div>

      <div v-else class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
        <ItemCard v-for="item in licitacionesPaginadas" :key="item.CodigoExterno" :title="limpiarTexto(item.Nombre)"
          :fecha-cierre="limpiarTexto(item.FechaCierre || '')" :codigo="item.CodigoExterno" :status="item.Estado" />
      </div>

      <div v-if="totalPaginas > 1" role="navigation" aria-label="Paginación de resultados"
        class="flex flex-col gap-3 p-3 sm:p-4 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 shadow-sm">
        <div class="text-xs sm:text-sm text-gray-600 dark:text-gray-400 text-center">
          {{ (paginaActual - 1) * itemsPorPagina + 1 }}-{{ Math.min(paginaActual * itemsPorPagina,
            licitacionesProcesadas.length) }} de {{ licitacionesProcesadas.length }}
        </div>
        <div class="flex justify-center overflow-x-auto pb-1">
          <div class="flex justify-center items-center gap-2">
            <UButton icon="i-heroicons-chevron-double-left" variant="ghost" size="sm" :disabled="paginaActual === 1"
              @click="paginaActual = 1" aria-label="Ir a la primera página" />
            <UButton icon="i-heroicons-chevron-left" variant="ghost" size="sm" :disabled="paginaActual === 1"
              @click="paginaActual--" aria-label="Página anterior" />

            <span class="text-sm px-3" aria-live="polite">Página {{ paginaActual }} de {{ totalPaginas }}</span>

            <UButton icon="i-heroicons-chevron-right" variant="ghost" size="sm"
              :disabled="paginaActual === totalPaginas" @click="paginaActual++" aria-label="Página siguiente" />
            <UButton icon="i-heroicons-chevron-double-right" variant="ghost" size="sm"
              :disabled="paginaActual === totalPaginas" @click="paginaActual = totalPaginas"
              aria-label="Ir a la última página" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Mejora de accesibilidad para navegación por teclado (focus) */
input:focus-visible,
select:focus-visible,
button:focus-visible,
a:focus-visible {
  outline: 2px solid rgb(59, 130, 246);
  outline-offset: 2px;
}
</style>