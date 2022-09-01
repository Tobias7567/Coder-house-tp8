const server2 = io().connect()
const rendercom = (comentarios) => {

    let ubicacion = document.querySelector('#comentarios')
    let html = comentarios.map(com => {
        return `<li>
        <strong>${com.gmail}</strong>
        <em> ${com.mensaje}</em>
        <em> ${com.hora}</em>
    </li>`

    })
    ubicacion.innerHTML = html.join(' ')
}
const addcomentarios = (evt) => {
    const gmail = document.querySelector('#gmail').value
       let hora = new Date().toLocaleTimeString()
    const mensaje = document.querySelector('#mensaje').value
    const comentario = {gmail, mensaje , hora}
    // console.log(producto)
    console.log(comentario)
    server.emit('comentario-nuevo', comentario )
    
    return false
}
server2.on('mensaje-servidor-com', datos => {
    rendercom(datos.comentarios)
})