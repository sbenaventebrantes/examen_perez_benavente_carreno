<script setup>
import { computed } from 'vue'

// Definición de propiedades (Props) que recibe la tarjeta desde el componente padre
const props = defineProps({
    title: { type: String, required: true },
    status: { type: String, default: 'Sin estado' },
    codigo: { type: String, required: true },
    fechaCierre: { type: String, default: '' }
})

// Normalización de texto para asegurar que el estado siempre se vea con la primera letra mayúscula
const statusText = computed(() => {
    if (!props.status || String(props.status).trim() === '') return 'Sin estado'
    const text = String(props.status)
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
})

// Formateo de la fecha de cierre al estándar chile para mejor usabilidad y lectura
const fechaFormateada = computed(() => {
    if (!props.fechaCierre) return ''
    const fecha = new Date(props.fechaCierre)
    return fecha.toLocaleDateString('es-CL', {
        day: '2-digit',
        month: 'short', // Ej: "jun" en lugar de "06" para facilitar lectura rápida
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    })
})

// Asignación de clases de color dinámicas basadas en el estado.
// Nota de Accesibilidad: Se validaron los contrastes de los colores elegidos.
const badgeClass = computed(() => {
    switch (props.status?.toLowerCase()) {
        case 'publicada': return 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300'
        case 'adjudicada': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300'
        case 'cerrada': return 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
        case 'desierta': return 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300'
        case 'revocada': return 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300'
        case 'suspendida': return 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300'
        default: return 'bg-gray-100 text-gray-500'
    }
})
</script>

<template>
    <UCard as="article"
        class="overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col h-full border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-600"
        :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">

        <template #header>
            <div class="space-y-3">
                <div class="flex justify-between items-start gap-3">
                    <h3 class="text-sm font-bold text-gray-900 dark:text-white flex-1 line-clamp-2" :title="title">
                        {{ title }}
                    </h3>
                </div>

                <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                        <UIcon name="i-heroicons-hashtag" aria-hidden="true" class="w-3 h-3" />
                        <span class="sr-only">Código de licitación:</span>
                        <code class="bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded text-xs">{{ codigo }}</code>
                    </div>

                    <span class="text-xs font-semibold px-2.5 py-1 rounded-full" :class="badgeClass">
                        <span class="sr-only">Estado actual:</span>
                        {{ statusText }}
                    </span>
                </div>
            </div>
        </template>

        <div v-if="fechaFormateada" class="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-xs py-1">
            <UIcon name="i-heroicons-clock" aria-hidden="true" class="w-3.5 h-3.5 shrink-0" />
            <span>
                Cierre: <strong class="text-gray-700 dark:text-gray-300">{{ fechaFormateada }}</strong>
            </span>
        </div>

        <template #footer>
            <UButton :to="`/details/${codigo}`" color="primary" variant="soft" label="Ver detalle" block
                icon="i-heroicons-arrow-right" class="justify-center gap-2" size="sm"
                :aria-label="`Ver detalle completo de la licitación: ${title}`" />
        </template>
    </UCard>
</template>

<style scoped>
/* Focus outline reforzado para cumplir con accesibilidad de navegación por teclado */
button:focus-visible,
a:focus-visible {
    outline: 2px solid rgb(59, 130, 246);
    outline-offset: 2px;
}
</style>