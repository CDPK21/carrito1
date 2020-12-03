
// Aquí estamos llamando a las etiquetas de los nombres dentro de las comillas dobles"
const productos = document.getElementById("muestra-productos");
const contenedor = document.getElementById("muestra-carrito");
const decisiones = document.getElementById("eventos-carrito");

console.log(contenedor.childElementCount)

// Con la función addEventListener("click", ) vamos a escuchar cualquier click que se ejecute dentro de la etiqueta
productos.addEventListener('click', (e) => { comprarProducto(e) });
contenedor.addEventListener('click', (e) => {eliminar_producto(e)});
decisiones.addEventListener('click', (e) => { decision_carrito(e) });



function comprarProducto(e) {
    e.preventDefault();
    // Lista = [1,2,3]
    // Lista[0]  devuelve 1
    // evento = e
    // e.target  Estamos identificando que botón está siendo presionado
    // e.target.classList Estamos creando una lista de las palabras del nombre de nuestra clase
    
    if (e.target.classList.contains('btn')) {
        const producto = e.target.parentElement.parentElement;
        //Enviamos el producto seleccionado para tomar sus datos
        obtener_datos(producto);
        actualizar_precio();

    }
}


function obtener_datos(producto) {
    // Sencillamente estamos guardando la ruta, nombre, precio y el id del celular
    const ruta_img = producto.querySelector('img').src;
    const nombre = producto.querySelector('.producto h4').textContent
    const precio = Number(producto.querySelector('span').textContent)
    const id = producto.querySelector('button').getAttribute("id");
    

    agregar_a_contenedor(nombre, precio, ruta_img, id);


}

function agregar_a_contenedor(name, price, image, id) {
    const id_cantidad = id + "-cantidad"; 
    const cantidad = 1;

    const nombres_celulares = contenedor.getElementsByClassName("producto nombre celular");
    //console.log(nombres_celulares);

    
    for(let i = 0; i < nombres_celulares.length; i++){
        if(nombres_celulares[i].textContent === name){
            var new_etiqueta = document.getElementById(id_cantidad);
            new_etiqueta.innerHTML = Number(new_etiqueta.textContent) + 1;
            return
        }
    }

    const etiqueta = document.createElement('a');
    etiqueta.classList = "dropdown-item"
    etiqueta.innerHTML = `
    <a>
        <table id="lista-carrito" class="table">
            <tr>
              <td style="vertical-align: middle;"><img src=${image} width="60" height="100"></td>
              <td style="vertical-align: middle;"><div class="producto nombre celular">${name}</div></td>
              <td style="vertical-align: middle;"><h4 class="precionuevoproducto hprecio" id="${id}">${price}</h4></td>
              <td style="vertical-align: middle;"><h5 class="cantidad productocarrito">x <span class="mostrar cantidad" id=${id_cantidad}>${cantidad}</span></h5></td>
              <td style="vertical-align: middle;"><button class="btn btn-danger">X</button></td>
            </tr>
      </table>
    </a>
    `;

    contenedor.prepend(etiqueta);

    


}




function decision_carrito(e) {
    e.preventDefault();
    if (e.target.id === "btn-comprar") {
        alert("Procedimiento de pago.")

    } else if (e.target.id === "btn-limpiar") {
        vaciar_carrito();
        actualizar_precio();
    } else {
        console.log("Algo paso mal");
    }

}


function vaciar_carrito(){
    while(contenedor.childElementCount > 2){
        contenedor.removeChild(contenedor.firstChild);
    }
}


function eliminar_producto(e){
    if(e.target.classList.contains('btn-danger')){
        e.target.parentElement.parentElement.parentElement.parentElement.parentElement.remove();
        actualizar_precio();
    }

}


function actualizar_precio(){
    var total = 0;


    const objeto_carro = document.getElementsByClassName("precionuevoproducto hprecio");
    const objeto_carro_cantidad = document.getElementsByClassName("mostrar cantidad")
    
    for(var i = 0; i < objeto_carro.length; i++){
        const temporal = Number(objeto_carro[i].textContent)
        const cant_tmp = Number(objeto_carro_cantidad[i].textContent)

        total = total + temporal*cant_tmp;
    }
    escribir_precio(total);
    
}


function escribir_precio(precio){
    document.getElementById("idprecio-total").innerHTML = precio;
}

















