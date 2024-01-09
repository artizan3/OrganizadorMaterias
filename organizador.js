
let cont=1;
const select="seleccionado";
const ops="select_op";
const ins="select_in";
let eselect=null;
let op_select=null;
let in_select=null;

function crearDiv(){
  const CajaTxt=document.getElementById("caja")
  var myDiv = document.createElement("div");
  myDiv.id = "Materias" + cont;
  myDiv.className = "Materia";
  myDiv.style.zIndex=10;
  myDiv.inLines=[];
  myDiv.outLines=[];

  // Crear el párrafo dentro del contenedor
  var paragraph = document.createElement("p");
  paragraph.innerHTML = CajaTxt.value;
  CajaTxt.value="";

  var input = document.createElement("div");
  input.id= "input" + cont;
  input.className= "circulo_input"
  input.padre=myDiv;

  var output = document.createElement("div");
  output.id= "output" + cont;
  output.className= "circulo_output"
  output.padre=myDiv;

  myDiv.getOutput=output;
  myDiv.getInput=input;
  
  myDiv.appendChild(output);
  
  myDiv.appendChild(input);

  myDiv.appendChild(paragraph);
  
  input.addEventListener('click',function(){
    if (in_select!=null)
    in_select.classList.remove(ins);
    in_select=document.getElementById(input.id);
    in_select.classList.add(ins);
    event.stopPropagation();
    if (op_select!=null)
      crearLinea();
  });
  output.addEventListener('click',function(){
    if (op_select!=null)
      op_select.classList.remove(ops);
    op_select=document.getElementById(output.id);
    output.classList.add(ops);
    event.stopPropagation();
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
    event.stopPropagation();
  });
  myDiv.addEventListener("mousedown",function(){
    if (eselect==null){
      eselect=document.getElementById(myDiv.id);
    }else{
      eselect.classList.remove(select);
      eselect.style.zIndex="10";
      eselect=document.getElementById(myDiv.id);
    }
    myDiv.style.zIndex="100";
    myDiv.classList.add(select);
    event.stopPropagation();
  });
  myDiv.addEventListener('dblclick',function(){
    const color=window.getComputedStyle(myDiv).backgroundColor;
    if (color=='rgb(0, 255, 0)')
      myDiv.style.backgroundColor='rgb(255, 100, 0)'
    if (color=='rgb(255, 100, 0)')
      myDiv.style.backgroundColor='rgb(255, 0, 0)'
    if (color=='rgb(255, 0, 0)')
      myDiv.style.backgroundColor='rgb(0, 255, 0)'
      event.stopPropagation();
  });
  document.body.appendChild(myDiv);
  dragElement(myDiv);
  cont++;

}

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  elmnt.onmousedown = dragMouseDown;
  
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
    // setea la posicion nueva, siempre y cuando este dentro de los limites
    if (pos3>220){
      elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
      elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }else{
      elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
      elmnt.style.left = 205 + "px";
    }
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

// para des-seleccionar la pieza
document.addEventListener('click',function(){
  if (eselect!=null){
    eselect.classList.remove(select);
    eselect.style.zIndex="10";
    eselect=null;
  }
  if (op_select!=null){
    op_select.classList.remove(ops);
    op_select=null;
  }
  if (in_select!=null){
    in_select.classList.remove(ins);
    in_select=null;
  }

});
// para eliminar la pieza seleccionada
document.addEventListener('keydown',function(){
  if (eselect!=null && event.key=='Delete'){
    eselect.remove();
  }
});
function crearLinea(){
  let dx=deltaXcalc();
  let dy=deltaYcalc();
  let longitud=Math.sqrt(dx**2+dy**2);
  let angulo=(Math.atan(dx/dy)*180)/Math.PI;
  console.log(dx,dy,longitud,angulo)
  var line = document.createElement("div");
  line.style.width = longitud + "px";//longitud
  line.style.height = 5 + "px";//ancho
  line.style.backgroundColor = "blue";//color
  line.style.transformOrigin = "0% 50%";//default
  line.style.transform = "rotate(" + angulo + "deg)";//inclinacion
  line.style.top=op_select.padre.style.top;
  line.style.left=op_select.padre.style.left;
  line.style.zIndex="10"
  line.style.position="relative";
  document.body.appendChild(line);
}
function deltaXcalc(){
  let val1=parseInt(op_select.padre.style.left,10);
  let val2=op_select.padre.offsetWidth/2;
  let x0=val1+val2;
  let val3=parseInt(in_select.padre.style.left,10);
  let val4=in_select.padre.offsetWidth/2;
  let x1=val3+val4;
  return Math.abs(x0-x1);
}
function deltaYcalc(){
  let val1=parseInt(op_select.padre.style.top,10);
  let val2=op_select.padre.offsetHeight;
  let y0=val1+val2
  let y1=parseInt(in_select.padre.style.top,10);
  return Math.abs(y0-y1);
}