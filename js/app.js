const formularioContactos = document.querySelector('#contacto'),
  listadoContactos = document.querySelector('#listado-contactos tbody');

eventListener();

function eventListener() {

  //cuando el formulario de crear o editar se ejecuta 
  formularioContactos.addEventListener('submit', leerFormulario);

  //listener para eliminar boton
  if (listadoContactos) {
    listadoContactos.addEventListener('click', eliminarContacto);
  }


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
      //leer id
      const idRegistro = document.querySelector('#id').value;
      infoContacto.append('id', idRegistro);
      actualizarRegistro(infoContacto);
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
      const respuesta = JSON.parse(xhr.responseText);


      //insertar un nuevo elemento a la tabla
      const nuevoContacto = document.createElement('TR');
      nuevoContacto.innerHTML = `
      <td>${respuesta.datos.nombre}</td>
      <td>${respuesta.datos.empresa}</td>
      <td>${respuesta.datos.telefono}</td>
      `;

      // crear contenedor de botones
      const contenedorAcciones = document.createElement('TD');
      //crear icono editar
      const iconoEditar = document.createElement('I');
      iconoEditar.classList.add('far', 'fa-edit');
      //crea el enlace para editar
      const btnEditar = document.createElement('A');
      btnEditar.appendChild(iconoEditar);
      btnEditar.href = `editar.php?id=${respuesta.datos.id_insertado}`;
      btnEditar.classList.add('btn', 'btn-editar');

      //agregarlo al padre
      contenedorAcciones.appendChild(btnEditar);

      //crear icono de eliminar
      const iconoEliminar = document.createElement('I');
      iconoEliminar.classList.add('far', 'fa-trash-alt');
      //crear boton eliminar 
      const btnEliminar = document.createElement('BUTTON');
      btnEliminar.appendChild(iconoEliminar);
      btnEliminar.setAttribute('data-id', respuesta.datos.id_insertado);
      btnEliminar.classList.add('btn', 'btn-borrar');
      //agregarlo al padre
      contenedorAcciones.appendChild(btnEliminar);

      //agregarlo al tr
      nuevoContacto.appendChild(contenedorAcciones);

      //agregarlo con los contactos
      listadoContactos.append(nuevoContacto);

      //resetear el form 
      document.querySelector('form').reset();

      //mostrar notificacion
      mostrarNotificacion('Contacto Creado Correctamente', 'correcto');
    }
  }

  //enviar los datos
  xhr.send(datos);

}

function actualizarRegistro(datos) {
  //crear objeto
  const xhr = new XMLHttpRequest();
  //abrir conexion
  xhr.open('POST', 'includes/modelos/modelo-contacto.php', true);
  //leer la respuesta 
  xhr.onload = function() {
    if (this.status === 200) {
      const respuesta = JSON.parse(xhr.responseText);

      if (respuesta.respuesta === 'correcto') {
        //mostrar notificacion
        mostrarNotificacion('Contacto Editado Correctamente', 'correcto');
      } else {
        mostrarNotificacion('Hubo un error...', 'error');
      }
      //despues de 3 segundos redireccionar
      setTimeout(() => {
        window.location.href = 'index.php';
      }, 4000);
    }
  }
  //enviar la peticion
  xhr.send(datos);

}

function eliminarContacto(e) {
  if (e.target.parentElement.classList.contains('btn-borrar')) {
    //tomar el id
    const id = e.target.parentElement.getAttribute('data-id');

    //preguntar al usuario
    const respuesta = confirm('¿Estas seguro(a)?');
    if (respuesta) {
      //llamado ajax
      //crear objeto
      const xhr = new XMLHttpRequest();
      //abrir la conexion
      xhr.open('GET', `includes/modelos/modelo-contacto.php?id=${id}&accion=borrar`, true);
      //leer la respuesta
      xhr.onload = function() {
        if (this.status === 200) {
          const resultado = JSON.parse(xhr.responseText);
          if (resultado.respuesta === 'correcto') {
            //eliminar registro del dom
            e.target.parentElement.parentElement.parentElement.remove();
            //mostrar notificacion
            mostrarNotificacion('Contacto Eliminado', 'correcto');
          } else {
            //mostrar notificacion
            mostrarNotificacion('Hubo un error...', 'error');
          }
        }
      }
      //enviar la peticion
      xhr.send();

    }
  }
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