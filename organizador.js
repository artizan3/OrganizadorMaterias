let contador = 1;

function agregarDiv() {
  // Crear un nuevo div
  const nuevoDiv = document.createElement('div');
  nuevoDiv.className = 'nuevo-div';
  nuevoDiv.textContent = 'Div ' + contador;


  // Agregar el nuevo div al contenedor
  const contenedor = document.getElementById('contenedor');
  contenedor.appendChild(nuevoDiv);

  // Incrementar el contador
  contador++;
}