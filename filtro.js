function main() {

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

  //-- Funcion de retrollamada de escala de grises
  grises.onclick=()=>{
        ctx.drawImage(img, 0,0);
        var imgDataGris = ctx.getImageData(0, 0, canvas.width, canvas.height);
        //-- Obtener el array con todos los píxeles
        var data = imgDataGris.data;
        //-- Filtrar la imagen según el nuevo umbral
        for (var i = 0; i < data.length; i+=4) {
          var r = data[i];
          var g = data[i+1];
          var b = data[i+2];
          var v = (3*r + 4*g + 1*b)/8;
          data[i] = data[i+1] = data[i+2] = v
          }
    ctx.putImageData(imgDataGris, 0, 0);
  }

  function filtro(){
      range_rojo.innerHTML = des_rojo.value;
      range_verde.innerHTML = des_verde.value;
      range_azul.innerHTML = des_azul.value;
      ctx.drawImage(img, 0,0);

      //-- Obtener la imagen del canvas en pixeles
      var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

      //-- Obtener el array con todos los píxeles
      var data = imgData.data

      //-- Obtener los umbrales
      var umbral_rojo = des_rojo.value
      var umbral_verde = des_verde.value
      var umbral_azul = des_azul.value

      //-- Filtrar la imagen según los nuevos umbrales
      for (var i = 0; i < data.length; i+=4) {
          if (data[i] > umbral_rojo)
              data[i] = umbral_rojo;
          if (data[i+1] > umbral_verde)
              data[i+1] = umbral_verde;
          if (data[i+2] > umbral_azul)
              data[i+2] = umbral_azul;
      }

      //-- Poner la imagen modificada en el canvas
      ctx.putImageData(imgData, 0, 0);
  }
  //-- Funcion de retrollamada de los deslizadores
  des_rojo.oninput = () => {
      filtro()
  }
  des_verde.oninput = () => {
      filtro()
  }
  des_azul.oninput = () => {
      filtro()
  }

}
