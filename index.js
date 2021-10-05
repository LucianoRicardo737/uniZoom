const imagen = document.getElementById('selectImg')


function imageZoom(inputImageId, outputContentElementId) {


    let conteiner = document.getElementById(outputContentElementId);
    conteiner.style.position = "relative";
    conteiner.style.display = "flex";

    let image = document.getElementById(inputImageId);
    let a = image.getBoundingClientRect();


    let lens = document.createElement("DIV");
    lens.style.position = "absolute";
    lens.style.height = `${a.height/2}px`;
    lens.style.width = `${a.width/2}px`;
    lens.style.zIndex = "1";

    image.parentElement.insertBefore(lens, image);

    let cx = conteiner.offsetWidth / lens.offsetWidth;
    let cy = conteiner.offsetHeight / lens.offsetHeight;

    let result = document.createElement("DIV");
    result.id = 'myresult'

    result.style.height = `${a.height}px`;
    result.style.width = `${a.width}px`;
    result.style.position = "absolute";
    result.style.background = "white";
    result.style.backgroundRepeat = "no-repeat";
    result.style.backgroundImage = `url(${image.src})`;
    result.style.backgroundSize = `${image.width * cx}px ${image.height * cy}px`;
    result.style.display='none'

    conteiner.insertAdjacentElement('beforeend', result);

    lens.addEventListener("mousemove", moveLens);
    image.addEventListener("mousemove", moveLens);

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
     

    function moveLens(e) {
      e.preventDefault();
      
      // Take mouse position  
      let pos = getCursorPos(e);
      // Take lens position
      let x = pos.x - (lens.offsetWidth / 2);
      let y = pos.y - (lens.offsetHeight / 2);
      // Prevents lens from being positioned out of image 
      if (x > image.width - lens.offsetWidth) {
        x = image.width - lens.offsetWidth;
      }
      if (x < 0) {
        x = 0;
      }
      if (y > image.height - lens.offsetHeight) {
        y = image.height - lens.offsetHeight;
      }
      if (y < 0) {
        y = 0;
      }
      // Set lens position
      lens.style.left = `${x}px`;
      lens.style.top =`${y}px`;
      // Set lens view
      result.style.backgroundPosition = `-${(x * cx)}px -${(y * cy)}px`;

    }

    function getCursorPos(e) {
      e = e || window.event;
      let a = image.getBoundingClientRect();
      let x = e.pageX - a.left;
      let y = e.pageY - a.top;
      x = x - window.pageXOffset;
      y = y - window.pageYOffset;
      return {x, y};
    }
  }
  