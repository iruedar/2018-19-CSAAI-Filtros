function main() {
  console.log("En main()....")

  //-- Acceso al objeto con la imagen
  var img = document.getElementById('imagesrc')

  //-- Acceso al objeto con el canvas
  var canvas = document.getElementById('display');

  //-- Acceso al deslizador
  des_rojo = document.getElementById('deslizador_rojo')
  des_verde = document.getElementById('deslizador_verde')
  des_azul = document.getElementById('deslizador_azul')

  //-- Valor del deslizador
  range_rojo = document.getElementById('rojo')
  range_verde = document.getElementById('verde')
  range_azul = document.getElementById('azul')

  //-- Boton de GRISES
  grises = document.getElementById('grises');

  //-- Se establece como tamaño del canvas el mismo
  //-- que el de la imagen original
  canvas.width = img.width;
  canvas.height = img.height;

  //-- Obtener el contexto del canvas para
  //-- trabajar con el
  var ctx = canvas.getContext("2d");

  //-- Situar la imagen original en el canvas
  //-- No se han hecho manipulaciones todavia
  ctx.drawImage(img, 0,0);

  //-- Funcion de retrollamada del deslizador rojo
  des_rojo.oninput = () => {
    //-- Mostrar el nuevo valor del deslizador
    range_rojo.innerHTML = des_rojo.value

    //-- Situar la imagen original en el canvas
    //-- No se han hecho manipulaciones todavia
    ctx.drawImage(img, 0,0);

    //-- Obtener la imagen del canvas en pixeles
    var imgData_rojo = ctx.getImageData(0, 0, canvas.width, canvas.height);

    //-- Obtener el array con todos los píxeles
    var data = imgData_rojo.data

    //-- Obtener el umbral de rojo del desliador
    umbral_rojo = des_rojo.value

    //-- Filtrar la imagen según el nuevo umbral
    for (var i = 0; i < data.length; i+=4) {
      if (data[i] > umbral_rojo)
        data[i] = umbral_rojo;
    }

    //-- Poner la imagen modificada en el canvas
    ctx.putImageData(imgData_rojo, 0, 0);
  }

  //-- Funcion de retrollamada del deslizador verde
  des_verde.oninput = () => {
    //-- Mostrar el nuevo valor del deslizador
    range_verde.innerHTML = des_verde.value

    //-- Situar la imagen original en el canvas
    //-- No se han hecho manipulaciones todavia
    ctx.drawImage(img, 0,0);

    //-- Obtener la imagen del canvas en pixeles
    var imgData_verde = ctx.getImageData(0, 0, canvas.width, canvas.height);

    //-- Obtener el array con todos los píxeles
    var data = imgData_verde.data

    //-- Obtener el umbral de rojo del desliador
    umbral_verde = des_verde.value

    //-- Filtrar la imagen según el nuevo umbral
    for (var i = 0; i < data.length; i+=4) {
      if (data[i + 1] > umbral_verde)
        data[i + 1] = umbral_verde;
    }

    //-- Poner la imagen modificada en el canvas
    ctx.putImageData(imgData_verde, 0, 0);
  }

  //-- Funcion de retrollamada del deslizador azul
  des_azul.oninput = () => {
    //-- Mostrar el nuevo valor del deslizador
    range_azul.innerHTML = des_azul.value

    //-- Situar la imagen original en el canvas
    //-- No se han hecho manipulaciones todavia
    ctx.drawImage(img, 0,0);

    //-- Obtener la imagen del canvas en pixeles
    var imgData_azul = ctx.getImageData(0, 0, canvas.width, canvas.height);

    //-- Obtener el array con todos los píxeles
    var data = imgData_azul.data

    //-- Obtener el umbral de rojo del desliador
    umbral_azul = des_azul.value

    //-- Filtrar la imagen según el nuevo umbral
    for (var i = 0; i < data.length; i+=4) {
      if (data[i + 2] > umbral_azul)
        data[i + 2] = umbral_azul;
    }

    //-- Poner la imagen modificada en el canvas
    ctx.putImageData(imgData_azul, 0, 0);
  }

//-- Funcion de retrollamada de escala de grises
  grises.onclick=()=>{
        var imgDataGris = ctx.getImageData(0, 0, canvas.width, canvas.height);
        //-- Obtener el array con todos los píxeles
        var data = imgDataGris.data;
        //-- Filtrar la imagen según el nuevo umbral
        for (var i = 0; i < data.length; i+=4) {
          var r = data[i];
          var g = data[i+1];
          var b = data[i+2];
          var v = 0.2126*r + 0.7152*g + 0.0722*b;
          data[i] = data[i+1] = data[i+2] = v
          }
    ctx.putImageData(imgDataGris, 0, 0);
    }

}
