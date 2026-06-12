export const useRutValidator = () => {
  /**
   * Limpia el RUT removiendo puntos y guiones
   */
  const limpiarRut = (rut) => {
    return rut.replace(/[.-]/g, '').toUpperCase()
  }

  /**
   * Calcula el dígito verificador de un RUT
   */
  const calcularDigitoVerificador = (rut) => {
    const rutLimpio = limpiarRut(rut)
    const rutSinDigito = rutLimpio.slice(0, -1) 
    
    let suma = 0
    let multiplicador = 2

    for (let i = rutSinDigito.length - 1; i >= 0; i--) {
      suma += parseInt(rutSinDigito[i]) * multiplicador
      multiplicador++
      if (multiplicador > 7) {
        multiplicador = 2
      }
    }

    const digito = 11 - (suma % 11)
    
    if (digito === 11) return '0'
    if (digito === 10) return 'K'
    return digito.toString()
  }

  /**
   * Valida que el formato del RUT sea correcto
   */
  const validarFormato = (rut) => {
    const rutLimpio = limpiarRut(rut)
    const patron = /^\d{7,8}[0-9K]$/
    return patron.test(rutLimpio)
  }

  /**
   * Valida el dígito verificador
   */
  const validarDigitoVerificador = (rut) => {
    const rutLimpio = limpiarRut(rut)
    if (!validarFormato(rutLimpio)) return false
    
    const digitoIngresado = rutLimpio.slice(-1)
    const digitoCalculado = calcularDigitoVerificador(rutLimpio)
  
    return digitoIngresado === digitoCalculado
  }

  /**
   * Formatea el RUT al formato XX.XXX.XXX-K
   */
  const formatearRut = (rut) => {
    const rutLimpio = limpiarRut(rut)
    
    if (rutLimpio.length < 2) return rutLimpio
    
    // Separamos los dígitos del verificador
    const rutSinVerificador = rutLimpio.slice(0, -1)
    const verificador = rutLimpio.slice(-1)
    
    // Formateamos con puntos cada 3 dígitos de derecha a izquierda
    let formateado = ''
    for (let i = 0; i < rutSinVerificador.length; i++) {
      if (i > 0 && (rutSinVerificador.length - i) % 3 === 0) {
        formateado += '.'
      }
      formateado += rutSinVerificador[i]
    }
    
    return `${formateado}-${verificador}`
  }

  /**
   * Valida completamente el RUT
   */
  const validarRut = (rut) => {
    if (!rut || rut.trim() === '') {
      return { valido: false, error: 'El RUT es requerido' }
    }

    const rutLimpio = limpiarRut(rut)

    if (!validarFormato(rutLimpio)) {
      return { 
        valido: false, 
        error: 'Formato inválido. Usa el formato: XX.XXX.XXX-X o XXXXXXXX-X' 
      }
    }

    if (!validarDigitoVerificador(rutLimpio)) {
      return { 
        valido: false, 
        error: 'El dígito verificador es incorrecto' 
      }
    }

    return { valido: true }
  }

  return {
    limpiarRut,
    calcularDigitoVerificador,
    validarFormato,
    validarDigitoVerificador,
    formatearRut,
    validarRut
  }
}