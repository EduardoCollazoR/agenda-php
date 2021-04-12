const formularioContactos = document.querySelector('#contacto');

eventListener();

function eventListener() {

  //cuando el formulario de crear o editar se ejecuta 
  formularioContactos.addEventListener('submit', leerFormulario);

}

function leerFormulario(e) {
  e.preventDefault();

  //leer datos de inputs
  const nombre = document.querySelector('#nombre').value,
    empresa = document.querySelector('#empresa').value,
    telefono = document.querySelector('#telefono').value,
    accion = document.querySelector('#accion').value;
  if (nombre === "" || empresa === "" || telefono === "") {
    //2 parametros textos y clase
    mostrarNotificacion('Todos los campos son obligatorios', 'error');
  } else {
    //pasa la validacion, crear llamado ajax
    const infoContacto = new FormData();
    infoContacto.append('nombre', nombre);
    infoContacto.append('empresa', empresa);
    infoContacto.append('telefono', telefono);
    infoContacto.append('accion', accion);

    if (accion === 'crear') {
      //crear contacto
      insertarBD(infoContacto);

    } else {
      //editar contacto
    }

  }


}
//insertar en la base de datos via ajax
function insertarBD(datos) {
  //llamado ajax

  //crear objeto
  const xhr = new XMLHttpRequest();

  //abrir la conexion
  xhr.open('POST', 'includes/modelos/modelo-contacto.php', true);

  //pasar los datos
  xhr.onload = function() {
    if (this.status === 200) {
      //leemos la respuesta de php
      const respuesa = JSON.parse(xhr.responseText);
    }
  }

  //enviar los datos
  xhr.send(datos);

}

//notificacion el pantalla
function mostrarNotificacion(mensaje, clase) {
  const notificacion = document.createElement('DIV');
  notificacion.classList.add(clase, 'notificacion');
  notificacion.textContent = mensaje;
  // formulario
  formularioContactos.insertBefore(notificacion, document.querySelector('form legend'));
  //ocultar y mostrar la notificacion
  setTimeout(() => {
    notificacion.classList.add('visible');
    setTimeout(() => {
      notificacion.classList.remove('visible');
      setTimeout(() => {
        notificacion.remove();
      }, 500);
    }, 2000);
  }, 100);
}