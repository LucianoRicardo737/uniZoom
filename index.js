const imagen = document.getElementById('selectImg')

function createElementAndSyle(tag, name){
    
}



function imageZoom(imageElementId, outputID) {

    // get input and output by id
    let image = document.getElementById(imageElementId);
    let result = document.getElementById(outputID);

    // create lens element
    let lens = document.createElement("DIV");
    // add class
    lens.setAttribute("class", "img-zoom-lens");

    // insert lens
    image.parentElement.insertBefore(lens, image);

    // take total width and height 
    let cx = result.offsetWidth / lens.offsetWidth;
    let cy = result.offsetHeight / lens.offsetHeight;

    /*Configura propiedades del background para el div resultante:*/
    result.style.backgroundImage = "url('" + image.src + "')";
    result.style.backgroundSize = (image.width * cx) + "px " + (image.height * cy) + "px";
    result.style.display='none'
  
    // execute function to move mouse over image
    lens.addEventListener("mousemove", moveLens);
    image.addEventListener("mousemove", moveLens);
    // for mobile
    lens.addEventListener("touchmove", moveLens);
    image.addEventListener("touchmove", moveLens);


    function mouseIn(){
      result.style.display=''
    }
    function mouseOut(){
      result.style.display='none'
    }

    lens.addEventListener('mouseenter', mouseIn)
    
    lens.addEventListener('mouseleave',mouseOut)
     
    // image.addEventListener('mouseleave', ()=>{
    //     console.log('over')
    //     result.style.display='none'
    // })
    function moveLens(e) {
      e.preventDefault();
      
      // take mouse position  
      let pos = getCursorPos(e);
      // take lens position
      let x = pos.x - (lens.offsetWidth / 2);
      let y = pos.y - (lens.offsetHeight / 2);
      // Prevents lens from being positioned out of image 
      if (x > image.width - lens.offsetWidth) {x = image.width - lens.offsetWidth;}
      if (x < 0) {x = 0;}
      if (y > image.height - lens.offsetHeight) {y = image.height - lens.offsetHeight;}
      if (y < 0) {y = 0;}
      /*configura la posición del lente:*/
      lens.style.left = x + "px";
      lens.style.top = y + "px";
      /*muestra lo que el lente "ve":*/
      result.style.backgroundPosition = "-" + (x * cx) + "px -" + (y * cy) + "px";
    }

    function getCursorPos(e) {
      e = e || window.event;
      /*consigue posiciones 'x' e 'y' de la imagen:*/
      let a = image.getBoundingClientRect();
      /*Calcula las coordenadas 'x' e 'y' del cursor relativo a la imagen:*/
      let x = e.pageX - a.left;
      let y = e.pageY - a.top;
      /*considera cualquier 'scroll' sobre la página:*/
      x = x - window.pageXOffset;
      y = y - window.pageYOffset;
      return {x, y};
    }
  }
  