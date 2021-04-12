<?php include 'includes/layout/header.php' ?>

<div class="contenedor-barra">
    <h1>Agenda de Contactos</h1>
</div>

<div class="bg-primario contenedor sombra">
    <form id="contacto" action="#">
        <legend>Añada un contacto <span>Todos los campos son obligatorios</span></legend>
        <?php include 'includes/layout/formulario.php' ?>
    </form>
</div>

<div class="bg-blanco contenedor sombra contacto">
    <div class="contenedor-contactos">
        <h2>Contactos</h2>
        <input type="text" id="buscar" class="buscador sombra" placeholder="Buscar Contactos...">

        <p class="total-contactos"><span>2</span> Contactos</p>
        <div class="contenedor-tabla">
            <table id="listado-contactos" class="listado-contactos">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Empresa</th>
                        <th>Telefono</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Juan</td>
                        <td>Udemy</td>
                        <td>23242123213</td>
                        <td>
                            <a href="editar.php" class="btn-editar btn">
                                <i class=" far fa-edit"></i>
                            </a>
                            <button data-id="1" type="button" class="btn-borrar btn">
                                <i class="far fa-trash-alt"></i>
                            </button>

                        </td>
                    </tr>
                    <tr>
                        <td>Juan</td>
                        <td>Udemy</td>
                        <td>23242123213</td>
                        <td>
                            <a href="#" class="btn-editar btn">
                                <i class=" far fa-edit"></i>
                            </a>
                            <button data-id="1" type="button" class="btn-borrar btn">
                                <i class="far fa-trash-alt"></i>
                            </button>

                        </td>
                    </tr>
                    <tr>
                        <td>Juan</td>
                        <td>Udemy</td>
                        <td>23242123213</td>
                        <td>
                            <a href="#" class="btn-editar btn">
                                <i class=" far fa-edit"></i>
                            </a>
                            <button data-id="1" type="button" class="btn-borrar btn">
                                <i class="far fa-trash-alt"></i>
                            </button>

                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

</div>

<?php include 'includes/layout/footer.php' ?>