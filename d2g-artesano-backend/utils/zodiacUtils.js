//Codigo Para obtener el signo zodiacal de una fecha

// Función para obtener el signo zodiacal basado en la fecha de nacimiento
// Esta función toma una fecha de nacimiento en formato (DD/MM/YYYY) o (YYYY-MM-DD) y retorna el signo zodiacal correspondiente.
// La función utiliza el objeto Date de JavaScript para manejar las fechas y determinar el signo zodiacal.
function getZodiacSign(dateOfBirth) {
  const date = new Date(dateOfBirth);
  const month = date.getUTCMonth() + 1; // Meses en JavaScript es 0-11, por lo que sumamos 1    
  // Obtener el día del mes
  const day = date.getUTCDate();

  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) {
    return 'Acuario';
  } else if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) {
    return 'Piscis';
  } else if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) {
    return 'Aries';
  } else if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) {
    return 'Tauro';
  } else if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) {
    return 'Géminis';
  } else if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) {
    return 'Cáncer';
  } else if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) {
    return 'Leo';
  } else if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) {
    return 'Virgo';
  } else if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) {
    return 'Libra';
  } else if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) {
    return 'Escorpio';
  } else if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) {
    return 'Sagitario';
  } else if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) {
    return 'Capricornio';
  }
  
   // Si no coincide con ningún signo, retornar null
   return null;
}

module.exports = getZodiacSignId;
// Función para obtener el ID del signo zodiacal basado en la fecha de nacimiento
// Esta función utiliza la función getZodiacSign para determinar el signo zodiacal y luego retorna su ID correspondiente.
function getZodiacSignId(dateOfBirth) {
  const zodiacSign = getZodiacSign(dateOfBirth);
  
  // Mapeo de signos zodiacales a sus IDs
  const zodiacSignIds = {
    'Acuario': 1,
    'Piscis': 2,
    'Aries': 3,
    'Tauro': 4,
    'Géminis': 5,
    'Cáncer': 6,
    'Leo': 7,
    'Virgo': 8,
    'Libra': 9,
    'Escorpio': 10,
    'Sagitario': 11,
    'Capricornio': 12
  };
  
  return zodiacSignIds[zodiacSign] || null; // Retornar el ID del signo zodiacal o null si no se encuentra
}