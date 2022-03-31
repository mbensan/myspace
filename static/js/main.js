
const mensajes_input = $('#mensajes')

const socket = io('http://localhost:3000')

function escribir (e) {
  
  // 1. Primero obtenemos el mensaje desde el input
  const mensaje = mensajes_input.val()

  if (mensaje == '') { return }

  // 2. Agregamos el mensaje al chat
  $('#chat').append(`
    <div class="w-message w-message-out">
      <div class="w-message-text">
        <p>${mensaje}</p>
        <div class="time">14:27</div>
      </div>
    </div>
  `)

  // 3. Reseteamos el input
  mensajes_input.val('')

  // 4. Mandamos el mensaje
  socket.emit('mensajes', {mensaje, usuario})
}

$('.icon-mic').on('click', escribir)

mensajes_input.on('keyup', function (ev) {
  if (ev.keyCode == '13') {
    escribir()
  }
})

socket.on('nuevo_mensaje', function (datos) {
  $('#chat').append(`
    <div class="w-message w-message-in">
      <div class="w-message-text">
        <h5 class="blue-1">${datos.usuario}</h5>
        <p>${datos.mensaje}</p>
        <div class="time">11:30</div>
      </div>
    </div>
  `)
  console.log(datos);
})