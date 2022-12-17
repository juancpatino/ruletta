$(function() {

  var cargaUp = [];
  var newCargaUp =[];
  $input = $('input.search');

  function shuffleArray(inputArray){
    return inputArray.sort(()=> Math.random() - 0.5);
}

    //se crea la lista de elementos o slot
function makeSlots(){
     if(cargaUp.length > 0){
       //inicia en el valor aleatorio previo
    var list = ['<li>'+$input.val()+'</li>'];
    let i = 0;
    newCargaUp = shuffleArray(cargaUp[0]);
    newCargaUp.forEach(element => {
        i++;
        list.push( '<li index='+(i)+'>'+element+'</li>' );
    });
    let num= numeroAleatorio(0,newCargaUp.length);
    list[1] = list[num];
    console.log('index aleatorio',num);
    console.log('lenght list',list.length);
    console.log('lenght newCargaUp',newCargaUp.length);
    newCargaUp[1] = newCargaUp[num-1]
    //dio un giro
    //la entrada se limpia
    $input.val('');
    // se agrega el elemento seleccionado
    $('#slot').html(list.join('')).parent().show().trigger('spin');
    //se hace recursivo el llamado
    //makeSlotList(list);
      
     }else{
      window.alert('Debes primero cargar un archivo, o el archivo debe contener como minimo un participante.. ');
     }   
    
 }

  

    $('#slot').jSlots({
  number: 1,
  spinner : '.jSlots-wrapper',
  spinEvent: 'spin',
  time: 300,
  loops: 1,
  endNum: 2,//finaliza en el segundo elmento del arreglo aleatorio
  onEnd: function(finalElement){
      //set result
      
      $input.val(newCargaUp[1]);
      for(i=0;i<=20;i++){
    confetti({
        particleCount: 100,
        startVelocity: 30,
        spread: 360,
        origin: {
    x: Math.random(),
    // since they fall down, start a bit higher than random
    y: Math.random() - 0.2
        }
      })
      }
      var interval= window.setInterval(confeti, 1000);
      //oculta spiner
      $(this.spinner).hide();
  }
    });

    function confeti(){
  confetti({
      particleCount: 100,
      startVelocity: 30,
      spread: 360,
      origin: {
  x: Math.random(),
  // since they fall down, start a bit higher than random
  y: Math.random() - 0.2
      }
    })
    }

    function numeroAleatorio(min, max) {
  return Math.round(Math.random() * (max - min) + min);
      }

    //elemento aleatorio
    $('#random_location').on('click', makeSlots);

    function parseCSV(text) {
      // Obtenemos las lineas del texto
      let lines = text.replace(/\r/g, '').split('\n');
      return lines.map(line => {
        // Por cada linea obtenemos los valores
        let values = line.split(';');
        return values;
      });
    }
    
    function reverseMatrix(matrix){
      let output = [];
      // Por cada fila
      matrix.forEach((values, row) => {
        // Vemos los valores y su posicion
        values.forEach((value, col) => {
          // Si la posición aún no fue creada
          if (output[col] === undefined) output[col] = [];
          output[col][row] = value;
        });
      });
      return output;
    }
    
    function readFile(evt) {
      let file = evt.target.files[0];
      let reader = new FileReader();
      reader.onload = (e) => {
        // Cuando el archivo se terminó de cargar
        let lines = parseCSV(e.target.result);
        cargaUp = reverseMatrix(lines);
        window.alert('Archivo cargado correctamente. ');
        console.log('salida out:',cargaUp);
      };
      // Leemos el contenido del archivo seleccionado
      reader.readAsBinaryString(file);
    }

    document.getElementById('file').addEventListener('change', readFile, false);

});