// ==========================================
// 1. CONTROLADOR DE INSTALACIÓN Y OFFLINE (PWA)
// ==========================================
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then(registro => console.log('Service Worker operativo en ámbito:', registro.scope))
      .catch(error => console.error('Fallo en el registro del Service Worker:', error));
  });
}

// ==========================================
// 2. LÓGICA MATEMÁTICA DEL COTIZADOR
// ==========================================
function procesarCotizacion() {
  const superficie = parseFloat(document.getElementById('superficie').value);
  const tipoTarea = document.getElementById('tipoTarea').value;
  const resultBox = document.getElementById('resultBox');
  const resultValue = document.getElementById('resultValue');

  // Validación inicial de datos
  if (isNaN(superficie) || superficie <= 0) {
    alert("Por favor, ingrese un valor de superficie válido y mayor a cero.");
    return;
  }

  let totalHonorarios = 0;

  // Lógica matemática borrador (La cambiaremos con tus respuestas)
  if (tipoTarea === 'mensura') {
    totalHonorarios = 60000 + (superficie * 150);
  } else if (tipoTarea === 'ph') {
    totalHonorarios = 90000 + (superficie * 220);
  } else if (tipoTarea === 'verificacion') {
    totalHonorarios = 45000 + (superficie * 90);
  }

  // Formateador de moneda de curso legal (Pesos Argentinos)
  const formatoMoneda = new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 2
  }).format(totalHonorarios);

  // Mostrar el cuadro de resultados de forma atractiva con animación visual suave
  resultValue.innerText = formatoMoneda;
  resultBox.style.display = 'block';
}
