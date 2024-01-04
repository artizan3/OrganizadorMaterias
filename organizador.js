let cont=1;
const select="seleccionado";
let eselect=null;
function crearDiv(){
  const CajaTxt=document.getElementById("caja")
  var myDiv = document.createElement("div");
  myDiv.id = "Materias" + cont;
  myDiv.className = "Materia";

  // Crear el párrafo dentro del contenedor
  var paragraph = document.createElement("p");
  paragraph.innerHTML = CajaTxt.value;
  CajaTxt.value="";

  var input = document.createElement("div");
  input.id= "input" + cont;
  input.className= "circulo_input"

  var output = document.createElement("div");
  output.id= "output" + cont;
  output.className= "circulo_output"
  
  myDiv.appendChild(output);
  
  myDiv.appendChild(input);

  myDiv.appendChild(paragraph);

  output.addEventListener("click",function(){
    let rect=output.getBoundingClientRect();
    var x = rect.left + rect.width / 2 + window.pageXOffset;
    var y = rect.top + rect.height / 2 + window.pageYOffset;
    console.log(x,y)
  });

  myDiv.addEventListener("click",function(){
    if (eselect==null){
      eselect=document.getElementById(myDiv.id);
    }else{
      eselect.classList.remove(select);
      eselect.style.zIndex="10";
      eselect=document.getElementById(myDiv.id);
    }
    myDiv.style.zIndex="100";
    myDiv.classList.add(select);
  });
  myDiv.addEventListener('dblclick',function(){
    const color=window.getComputedStyle(myDiv).backgroundColor;
    if (color=='rgb(0, 255, 0)')
      myDiv.style.backgroundColor='rgb(255, 100, 0)'
    if (color=='rgb(255, 100, 0)')
      myDiv.style.backgroundColor='rgb(255, 0, 0)'
    if (color=='rgb(255, 0, 0)')
      myDiv.style.backgroundColor='rgb(0, 255, 0)'
  });

  document.body.appendChild(myDiv);

  dragElement(myDiv);
  cont++;

}

function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt.id + "header")) {
       /* if present, the header is where you move the DIV from:*/
      document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    } else {
      /* otherwise, move the DIV from anywhere inside the DIV:*/
      elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

document.addEventListener('keydown',function(){
  if (eselect!=null && event.key=='Delete'){
    eselect.remove();
  }
});