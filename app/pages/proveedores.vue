<script setup>
import { ref, computed } from 'vue'

const config = useRuntimeConfig()
const ticket = config.public.apiTicket

const rutInput = ref('')
const { validarRut, formatearRut } = useRutValidator()

// Estados del formulario
const validacionRut = ref(null)
const submitted = ref(false)
const loading = ref(false)
const proveedorEncontrado = ref(null)
const apiError = ref(null)

// Formatear el input
const formatearInputRut = (event) => {
  const input = event.target
  const rut = input.value

  if (submitted.value) {
    submitted.value = false
    proveedorEncontrado.value = null
    apiError.value = null
  }

  if (rut) {
    const rutLimpio = rut.replace(/[.-]/g, '').toUpperCase()

    if (rutLimpio.length >= 7) {
      const formateado = formatearRut(rutLimpio)
      input.value = formateado
      rutInput.value = formateado
    }
  } else {
    rutInput.value = ''
  }
}

// Validar RUT al perder el foco
const validarRutEnTiempoReal = () => {
  if (rutInput.value) {
    validacionRut.value = validarRut(rutInput.value)
  }
}


const enviarFormulario = async () => {
  submitted.value = true
  apiError.value = null
  proveedorEncontrado.value = null

  validacionRut.value = validarRut(rutInput.value)
  if (!validacionRut.value.valido) {
    return
  }

  loading.value = true

  try {
    const url = `https://api.mercadopublico.cl/servicios/v1/Publico/Empresas/BuscarProveedor?rutempresaproveedor=${rutInput.value}&ticket=${ticket}`

    const response = await $fetch(url)

    if (response && response.listaEmpresas && response.listaEmpresas.length > 0) {
      const empresa = response.listaEmpresas[0]

      proveedorEncontrado.value = {
        rut: rutInput.value,
        nombre: empresa.NombreEmpresa || 'Razón social no informada',
        codigo: empresa.CodigoEmpresa || '--'
      }
    } else {
      proveedorEncontrado.value = null;
    }

  } catch (error) {

    if (error.data && (error.data.Codigo === 10200 || error.data.Mensaje?.includes('No hay resultados'))) {

      proveedorEncontrado.value = null
      apiError.value = null
    } else {
      console.error("Error al consumir la API:", error);
      apiError.value = "No se pudo conectar con Mercado Público. Verifique su conexión o intente más tarde."
    }
  } finally {
    loading.value = false
  }
}

const limpiarFormulario = () => {
  rutInput.value = ''
  validacionRut.value = null
  submitted.value = false
  proveedorEncontrado.value = null
  apiError.value = null
}

const tieneError = computed(() => {
  return submitted.value && validacionRut.value && !validacionRut.value.valido
})

const tieneExito = computed(() => {
  return submitted.value && validacionRut.value && validacionRut.value.valido && !loading.value
})
</script>

<template>
  <div class="space-y-6">
    <section
      class="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-gray-900 dark:to-gray-800 rounded-xl p-8 border border-purple-200 dark:border-gray-700">
      <div class="max-w-3xl">
        <h1 class="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-3">
          Búsqueda de Proveedores
        </h1>
        <p class="text-gray-700 dark:text-gray-300 text-lg">
          Consulta la información de proveedores registrados en Mercado Público utilizando su RUT.
        </p>
      </div>
    </section>

    <section class="bg-white dark:bg-gray-900 rounded-lg shadow-md border border-gray-200 dark:border-gray-800 p-8"
      role="region" aria-label="Formulario de búsqueda de proveedores">

      <form @submit.prevent="enviarFormulario" class="max-w-2xl mx-auto space-y-4 sm:space-y-6">

        <div>
          <label for="input-rut" class="block text-sm font-semibold text-gray-900 dark:text-white mb-3">
            RUT del Proveedor
            <span class="text-red-500 ml-1" aria-hidden="true">*</span>
            <span class="sr-only">campo requerido</span>
          </label>

          <div class="relative">
            <UInput id="input-rut" v-model="rutInput" type="text" placeholder="Ej: 12.345.678-5"
              @input="formatearInputRut" @blur="validarRutEnTiempoReal" icon="i-heroicons-identification"
              :color="tieneError ? 'red' : tieneExito ? 'green' : 'gray'" :trailing="true" maxlength="12"
              aria-label="Ingresa el RUT del proveedor" aria-describedby="error-rut-message" class="w-full text-lg" />

            <div v-if="submitted" class="absolute right-12 top-1/2 transform -translate-y-1/2" aria-hidden="true">
              <UIcon v-if="tieneExito" name="i-heroicons-check-circle" class="w-6 h-6 text-green-500" />
              <UIcon v-else-if="tieneError" name="i-heroicons-x-circle" class="w-6 h-6 text-red-500" />
            </div>
          </div>

          <div v-if="tieneError" id="error-rut-message"
            class="mt-2 flex items-center gap-2 text-red-600 dark:text-red-400" aria-live="assertive">
            <UIcon name="i-heroicons-exclamation-circle" class="w-4 h-4 flex-shrink-0" aria-hidden="true" />
            <p class="text-sm">RUT inválido. Por favor revise el formato ingresado.</p>
          </div>

        </div>

        <div class="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 w-full">
          <UButton type="submit" color="primary" size="lg" icon="i-heroicons-magnifying-glass" label="Buscar Proveedor"
            :loading="loading" :disabled="!rutInput || loading" class="flex-1"
            aria-label="Buscar información del proveedor" />

          <UButton type="button" @click="limpiarFormulario" color="gray" variant="soft" size="lg"
            icon="i-heroicons-arrow-path" label="Limpiar" aria-label="Limpiar el formulario de búsqueda"
            class="sm:flex-none w-full sm:w-auto" />
        </div>
      </form>
    </section>

    <div v-if="apiError" role="alert" aria-live="assertive">
      <UAlert icon="i-heroicons-exclamation-triangle" color="red" variant="soft" title="Error de conexión"
        :description="apiError" class="mb-6" />
    </div>

    <div v-if="proveedorEncontrado"
      class="bg-white dark:bg-gray-900 rounded-lg shadow-md border border-gray-200 dark:border-gray-800 p-8"
      role="region" aria-label="Información del proveedor encontrado">

      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h2 class="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
          <UIcon name="i-heroicons-check-circle" class="w-7 h-7 text-green-500 flex-shrink-0" aria-hidden="true" />
          {{ proveedorEncontrado.nombre }}
        </h2>
        <UBadge color="green" variant="subtle" size="lg">Habilitado</UBadge>
      </div>

      <div
        class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 bg-gray-50 dark:bg-gray-800/50 p-6 rounded-lg border border-gray-100 dark:border-gray-800">
        <div class="space-y-1">
          <p class="text-sm font-medium text-gray-500 dark:text-gray-400">RUT Empresa</p>
          <p class="text-lg font-semibold text-gray-900 dark:text-white">{{ proveedorEncontrado.rut }}</p>
        </div>

        <div class="space-y-1">
          <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Código de Proveedor (Mercado Público)</p>
          <p class="text-lg font-semibold text-primary-600 dark:text-primary-400">#{{ proveedorEncontrado.codigo }}</p>
        </div>
      </div>
    </div>

    <div v-if="!loading && submitted && validacionRut?.valido && !proveedorEncontrado && !apiError"
      class="text-center py-12 bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800"
      role="status" aria-live="polite">
      <UIcon name="i-heroicons-inbox" class="w-16 h-16 mx-auto text-gray-400 mb-4" aria-hidden="true" />
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Proveedor no encontrado</h3>
      <p class="text-gray-600 dark:text-gray-400 font-medium">No se encontraron registros para el RUT {{ rutInput }} en
        Mercado Público.</p>
    </div>
  </div>
</template>

<style scoped>
input:focus-visible,
button:focus-visible {
  outline: 2px solid rgb(59, 130, 246);
  outline-offset: 2px;
}
</style>