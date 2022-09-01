const server = io().connect();

const render = (productos) => {
  let listado = document.querySelector("#listado");
  let html = productos.map((prod) => {
    return `<tbody> 
                    <tr>
                         <th scope="row">${prod.id} </th>
                         <td>${prod.name}</td>
                         <td>${prod.price}</td>
                         <td>${prod.description}</td>
        </tr>
    </tbody>`;
  });
  listado.innerHTML = html.join(" ");
};

const addProduct = (evt) => {
  const nombre = document.querySelector("#nombre").value;
  const precio = document.querySelector("#precio").value;
  const descripcion = document.querySelector("#descripcion").value;

  const producto = { nombre, precio, descripcion };
  // console.log(producto)
  server.emit("producto-nuevo", producto, (id) => {
    console.log(id);
  });
  return false;
};

/* Listening for a message from the server. */
server.on("mensaje-servidor", (mensaje) => {
  render(mensaje.productos);
});
