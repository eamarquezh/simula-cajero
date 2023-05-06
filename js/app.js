const datos = document.getElementById('datos');
const estatus = document.getElementById('estatus');

const btn1 = document.getElementById('btn1');
const btn2 = document.getElementById('btn2');
const btn3 = document.getElementById('btn3');
const btn4 = document.getElementById('btn4');
const btn5 = document.getElementById('btn5');
const btn6 = document.getElementById('btn6');
const btn7 = document.getElementById('btn7');
const btn8 = document.getElementById('btn8');
const btn9 = document.getElementById('btn9');
const btn0 = document.getElementById('btn0');
const btnp = document.getElementById('btnp');

const btnc = document.getElementById('btnc');
const btnb = document.getElementById('btnb');
const btna = document.getElementById('btna');

const myInput = document.getElementById('myInput');

let estado='inicio';

const body = document.body;


btn1.addEventListener('click', ()=>tecla(btn1));
btn2.addEventListener('click', ()=>tecla(btn2));
btn3.addEventListener('click', ()=>tecla(btn3));
btn4.addEventListener('click', ()=>tecla(btn4));
btn5.addEventListener('click', ()=>tecla(btn5));
btn6.addEventListener('click', ()=>tecla(btn6));
btn7.addEventListener('click', ()=>tecla(btn7));
btn8.addEventListener('click', ()=>tecla(btn8));
btn9.addEventListener('click', ()=>tecla(btn9));
btn0.addEventListener('click', ()=>tecla(btn0));
btnp.addEventListener('click', ()=>tecla(btnp));

btnc.addEventListener('click', cancelar);
btnb.addEventListener('click', borrar);
btna.addEventListener('click', aceptar);

estados();





function llenarPantalla(texto){
    datos.innerHTML = texto
}
function cancelar(){
    myInput.value="";
}
function borrar(){
    valorInicial = myInput.value;
    largo = valorInicial.length;
    myInput.value = valorInicial.substring(0, largo-1);
}
function aceptar(){
    estados();
}
function tecla(b){
    contenido= myInput.value;
    myInput.value= contenido + b.textContent;
}

function muestraToast(mensaje){
    let toast = new bootstrap.Toast(myToast);
    estatus.innerHTML = mensaje;
    toast.show();
    setTimeout(function() {
    toast.hide();
    }, 3000);
}


function estados(){
    let valor = myInput.value;
    myInput.value="";

    if(estado=='inicio'){
        cambiaTexto('inicio')
       if(valor=='1'){
            cambiaTexto('movEfectivo');
            return;
        }else if(valor=='2'){
            cambiaTexto('movTarjeta');
            return;
        }else{
            muestraToast('<p class="animate__animated animate__jello"><i class="bi bi-exclamation-triangle"></i>ERROR: presione solo 1 o 2</p>');
            return;
        }                    
    }

    if(estado=='movEfectivo'){
        cambiaTexto('movEfectivo')
       if(valor=='1'){
            cambiaTexto('payServicio');
            return;
        }else if(valor=='2'){
            cambiaTexto('payTarjeta');
            return;
        }else{
            muestraToast('<p class="animate__animated animate__jello"><i class="bi bi-exclamation-triangle"></i>ERROR: presione solo 1 o 2</p>');
            return;
        }                    
    }

    if(estado=='payServicio'){
        cambiaTexto('payServicio')
       if(valor=='1'){
            cambiaTexto('agua');
            return;
        }else if(valor=='2'){
            cambiaTexto('luz');
            return;
        }else if(valor=='3'){
            cambiaTexto('telefono');
            return;
        }else if(valor=='4'){
            cambiaTexto('otro');
            return;
        }else{
            muestraToast('<p class="animate__animated animate__jello"><i class="bi bi-exclamation-triangle"></i>ERROR: presione solo 1, 2, 3 o 4</p>');
            return;
        }                    
    }

    if(estado=='payTarjeta'){
        cambiaTexto('payTarjeta')                   
    }



    if(estado=='movTarjeta'){
        cambiaTexto('movTarjeta')
       if(valor=='1'){
            cambiaTexto('conSaldo');
            return;
        }else if(valor=='2'){
            cambiaTexto('retEfectivo');
            return;
        }else if(valor=='3'){
            cambiaTexto('payServicioI');
            return;
        }else{
            muestraToast('<p class="animate__animated animate__jello"><i class="bi bi-exclamation-triangle"></i>ERROR: presione solo 1, 2 o 3</p>');
            return;
        }                    
    }




}

function cambiaTexto(st){
switch (st) {
    case 'inicio':
        llenarPantalla(`<h2>¿Qué tipo movimiento desea hacer?</h2><br>
        <p>1) Movimientos en efectivo</p> 
        <p>2) Movimientos con tarjeta</p>`);
      break;
    case 'movEfectivo':
        llenarPantalla(`<h2>Movimientos en efectivo</h2><br>
        <p>1) Pago de servicios</p> 
        <p>2) Pago de tarjetas de crédito</p>`);
      break;
    case 'movTarjeta':
        llenarPantalla(`<h2>Movimientos con tarjeta</h2><br>
        <p>1) Consultar saldo</p> 
        <p>2) Retiro de efectivo</p>
        <p>3) Pago de servicios</p>`);
      break;
    case 'payServicio':
        llenarPantalla(`<h2>Qué servicio desea pagar?</h2><br>
        <p>1) Agua</p> 
        <p>2) Luz</p>
        <p>3) Teléfono</p>
        <p>4) Otro</p>`);
      break;
    default:
        llenarPantalla(`<h2>:(</h2><br>`);
      break;
  }
  estado=st;
  console.log("estado: "+estado);
}
