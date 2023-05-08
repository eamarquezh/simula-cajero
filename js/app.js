//codigo en https://github.com/eamarquezh/simula-cajero
let clientes = [
    {nombre:"Eric",tarjeta:"1234",nip:"0011",monto:"1000"},
    {nombre:"Herme",tarjeta:"2345",nip:"1122",monto:"1000"},
    {nombre:"Uriel",tarjeta:"3456",nip:"2233",monto:"1000"},

  ]


let audio = new Audio('media/audio/atm-button.mp3');
let notify = new Audio('media/audio/notification.mp3');

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

const btns = document.getElementById('btns');
const btnn = document.getElementById('btnn');

const myInput = document.getElementById('myInput');

let estado='inicio';
let servicio="-";
let monto="-";

let usuario='';
let tarjeta="";
let saldo="-";
let nip="";
let retiro="";
let pagaste="";

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

btns.addEventListener('click', ()=>tecla(btns));
btnn.addEventListener('click', ()=>tecla(btnn));


btnc.addEventListener('click', cancelar);
btnb.addEventListener('click', borrar);
btna.addEventListener('click', aceptar);

estados();





function llenarPantalla(texto){
    datos.innerHTML = texto
}
function cancelar(){
    myInput.value="";
    estado='preFinal';
    estados();
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
    audio.play();
}

function busUsuario(myCard){
    let val="noo";
    clientes.forEach(element => {
        if(element.tarjeta==myCard){
            usuario = element.nombre;
            nip = element.nip;
            saldo = element.monto;
            val = element.nombre;
        }
    });
    return val;
  }




function muestraToast(mensaje){
    notify.play();
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
        cambiaTexto('inicio');
       if(valor=='1'){
            cambiaTexto('movEfectivo');
            return;
        }else if(valor=='2'){
            cambiaTexto('movTarjeta');
            return;
        }else{
            muestraToast('<p class="animate__animated animate__jello"><i class="bi bi-exclamation-triangle"></i>Por favor presione solo 1 o 2</p>');
            return;
        }                    
    }

    if(estado=='movEfectivo'){
        cambiaTexto('movEfectivo');
       if(valor=='1'){
            cambiaTexto('payServicio');
            return;
        }else if(valor=='2'){
            cambiaTexto('allTarjeta');
            return;
        }else{
            muestraToast('<p class="animate__animated animate__jello"><i class="bi bi-exclamation-triangle"></i>Por favor presione solo 1 o 2</p>');
            return;
        }                    
    }

    if(estado=='payServicio'){
        cambiaTexto('payServicio');
       if(valor=='1'){
            servicio="Agua";
            cambiaTexto('allServicio');
            return;
        }else if(valor=='2'){
            servicio="Luz";
            cambiaTexto('allServicio');
            return;
        }else if(valor=='3'){
            servicio="Telefono";
            cambiaTexto('allServicio');
            return;
        }else if(valor=='4'){
            servicio="Otro";
            cambiaTexto('allServicio');
            return;
        }else{
            muestraToast('<p class="animate__animated animate__jello"><i class="bi bi-exclamation-triangle"></i>Por favor presione solo 1, 2, 3 o 4</p>');
            return;
        }                    
    }

    if(estado=='allServicio'){
        cambiaTexto('allServicio');
        if(/^\d+$/.test(valor)){
            cambiaTexto('allServicioM');
            return;
        }else{
            muestraToast('<p class="animate__animated animate__jello"><i class="bi bi-exclamation-triangle"></i>Por favor presione un valor numerico</p>');
            return;
        }
    }

    if(estado=='allServicioM'){
        cambiaTexto('allServicioM');
        if(/^\d+$/.test(valor)){
            monto=valor;
            cambiaTexto('elComprobante');
            muestraToast('<p class="animate__animated animate__fadeInUpBig"><i class="bi bi-cash-coin"></i>pagando</p>');
            return;
        }else{
            muestraToast('<p class="animate__animated animate__jello"><i class="bi bi-exclamation-triangle"></i>Por favor presione un valor numerico</p>');
            return;
        }
    }

    if(estado=='elComprobante'){
        cambiaTexto('elComprobante');
        if(valor==='Sí'){
            cambiaTexto('elRecibo');
            muestraToast('<p class="animate__animated animate__fadeInRightBig"><i class="bi bi-printer"></i>Imprimiendo comprobante</p>');
            setTimeout(function() {
                cambiaTexto('preFinal');
                }, 5000);
            return;
        }else if(valor=='No'){
            cambiaTexto('preFinal');
            return;
        }else{
            muestraToast('<p class="animate__animated animate__jello"><i class="bi bi-exclamation-triangle"></i>Por favor presione Sí o No</p>');
            return;
        }
    }


    if(estado=='preFinal'){
        cambiaTexto('preFinal');
        if(valor=='Sí'){
            cambiaTexto('inicio');
            return;
        }else if(valor=='No'){
            muestraToast('<p class="animate__animated animate__fadeInRightBig"><i class="bi bi-emoji-laughing-fill"></i>Hasta pronto</p>');
            setTimeout(function() {
                cambiaTexto('inicio');
                }, 1000);
            return;
        }else{
            muestraToast('<p class="animate__animated animate__jello"><i class="bi bi-exclamation-triangle"></i>Por favor presione Sí o No</p>');
            return;
        }
    }



    if(estado=='allTarjeta'){
        cambiaTexto('allTarjeta');
        if(/^\d+$/.test(valor)){
            cambiaTexto('allTarjetaM');
            servicio=valor;
            return;
        }else{
            muestraToast('<p class="animate__animated animate__jello"><i class="bi bi-exclamation-triangle"></i>Por favor presione un valor numerico</p>');
            return;
        }
    }

    if(estado=='allTarjetaM'){
        cambiaTexto('allTarjetaM');
        if(/^\d+$/.test(valor)){
            monto=valor;
            cambiaTexto('elComprobante');
            muestraToast('<p class="animate__animated animate__fadeInUpBig"><i class="bi bi-cash-coin"></i>pagando</p>');
            return;
        }else{
            muestraToast('<p class="animate__animated animate__jello"><i class="bi bi-exclamation-triangle"></i>Por favor presione un valor numerico</p>');
            return;
        }
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
            cambiaTexto('conSaldoI');
            return;
        }else{
            muestraToast('<p class="animate__animated animate__jello"><i class="bi bi-exclamation-triangle"></i>Por favor presione solo 1, 2 o 3</p>');
            return;
        }                    
    }

    if(estado=='conSaldo'){
        cambiaTexto('conSaldo');
        if(/^\d+$/.test(valor)){
            if(busUsuario(valor)=="noo"){
                muestraToast('<p class="animate__animated animate__jello"><i class="bi bi-exclamation-triangle"></i>no existe su tarjeta</p>');    
                return;
            }else{
                cambiaTexto('conSaldoN');
                myInput.type='password';
                tarjeta=valor;
                usuario=busUsuario(valor);
                return;
            }  
        }else{
            muestraToast('<p class="animate__animated animate__jello"><i class="bi bi-exclamation-triangle"></i>Por favor presione un valor numerico</p>');
            return;
        }                   
    }

    if(estado=='conSaldoN'){
        if(nip==valor){
            cambiaTexto('mueSaldo');
            return;
        }else{
            muestraToast('<p class="animate__animated animate__jello"><i class="bi bi-exclamation-triangle"></i>NIP no valido</p>');
            return;
        }                   
    }

    if(estado=='mueSaldo'){
        if(valor==='Sí'){
            cambiaTexto('elReciboSaldo');
            muestraToast('<p class="animate__animated animate__fadeInRightBig"><i class="bi bi-printer"></i>Imprimiendo comprobante</p>');
            setTimeout(function() {
                cambiaTexto('preFinal');
                }, 5000);
            return;
        }else if(valor=='No'){
            cambiaTexto('preFinal');
            return;
        }else{
            muestraToast('<p class="animate__animated animate__jello"><i class="bi bi-exclamation-triangle"></i>Por favor presione Sí o No</p>');
            return;
        }                   
    }

    if(estado=='retEfectivo'){
        cambiaTexto('retEfectivo');
        if(/^\d+$/.test(valor)){
            if(busUsuario(valor)=="noo"){
                muestraToast('<p class="animate__animated animate__jello"><i class="bi bi-exclamation-triangle"></i>no existe su tarjeta</p>');    
                return;
            }else{
                cambiaTexto('conSaldoN2');
                myInput.type='password';
                tarjeta=valor;
                usuario=busUsuario(valor);
                return;
            }  
        }else{
            muestraToast('<p class="animate__animated animate__jello"><i class="bi bi-exclamation-triangle"></i>Por favor presione un valor numerico</p>');
            return;
        }                   
    }

    if(estado=='conSaldoN2'){
        if(nip==valor){
            cambiaTexto('mueSaldo2');
            return;
        }else{
            muestraToast('<p class="animate__animated animate__jello"><i class="bi bi-exclamation-triangle"></i>NIP no valido</p>');
            return;
        }                   
    }

    if(estado=='mueSaldo2'){
        if(/^\d+$/.test(valor)){
            if((saldo-valor)<=0){
                muestraToast('<p class="animate__animated animate__jello"><i class="bi bi-exclamation-triangle"></i>Saldo insuficiente</p>');    
                return;
            }else{
                saldo=saldo-valor;
                retiro=valor;
                muestraToast('<p class="animate__animated animate__fadeInUpBig"><i class="bi bi-cash-coin"></i>Retirando dinero</p>');
                cambiaTexto('mueSaldo3');
                return;
            }  
        }else{
            muestraToast('<p class="animate__animated animate__jello"><i class="bi bi-exclamation-triangle"></i>Por favor presione un valor numerico</p>');
            return;
        }                    
    }

    if(estado=='mueSaldo3'){
        if(valor==='Sí'){
            cambiaTexto('elReciboSaldo2');
            muestraToast('<p class="animate__animated animate__fadeInRightBig"><i class="bi bi-printer"></i>Imprimiendo comprobante</p>');
            setTimeout(function() {
                cambiaTexto('preFinal');
                }, 5000);
            return;
        }else if(valor=='No'){
            cambiaTexto('preFinal');
            return;
        }else{
            muestraToast('<p class="animate__animated animate__jello"><i class="bi bi-exclamation-triangle"></i>Por favor presione Sí o No</p>');
            return;
        }                   
    }

    if(estado=='elReciboSaldo2'){
        if(valor==='Sí'){
            cambiaTexto('elReciboSaldo');
            muestraToast('<p class="animate__animated animate__fadeInRightBig"><i class="bi bi-printer"></i>Imprimiendo comprobante</p>');
            setTimeout(function() {
                cambiaTexto('preFinal');
                }, 5000);
            return;
        }else if(valor=='No'){
            cambiaTexto('preFinal');
            return;
        }else{
            muestraToast('<p class="animate__animated animate__jello"><i class="bi bi-exclamation-triangle"></i>Por favor presione Sí o No</p>');
            return;
        }                   
    }


    if(estado=='conSaldoI'){
        cambiaTexto('conSaldoI');
        if(/^\d+$/.test(valor)){
            if(busUsuario(valor)=="noo"){
                muestraToast('<p class="animate__animated animate__jello"><i class="bi bi-exclamation-triangle"></i>no existe su tarjeta</p>');    
                return;
            }else{
                cambiaTexto('conSaldoNI');
                myInput.type='password';
                tarjeta=valor;
                usuario=busUsuario(valor);
                return;
            }  
        }else{
            muestraToast('<p class="animate__animated animate__jello"><i class="bi bi-exclamation-triangle"></i>Por favor presione un valor numerico</p>');
            return;
        }                   
    }

    if(estado=='conSaldoNI'){
        if(nip==valor){
            cambiaTexto('mueSaldoI');
            return;
        }else{
            muestraToast('<p class="animate__animated animate__jello"><i class="bi bi-exclamation-triangle"></i>NIP no valido</p>');
            return;
        }                   
    }

    if(estado=='mueSaldoI'){
        if(valor=='1'){
            servicio="Agua";
            cambiaTexto('allServicioI');
            return;
        }else if(valor=='2'){
            servicio="Luz";
            cambiaTexto('allServicioI');
            return;
        }else if(valor=='3'){
            servicio="Telefono";
            cambiaTexto('allServicioI');
            return;
        }else if(valor=='4'){
            servicio="Otro";
            cambiaTexto('allServicioI');
            return;
        }else{
            muestraToast('<p class="animate__animated animate__jello"><i class="bi bi-exclamation-triangle"></i>Por favor presione solo 1, 2, 3 o 4</p>');
            return;
        }                              
    }

    if(estado=='allServicioI'){
        cambiaTexto('allServicio');
        if(/^\d+$/.test(valor)){
            cambiaTexto('allServicioMI');
            return;
        }else{
            muestraToast('<p class="animate__animated animate__jello"><i class="bi bi-exclamation-triangle"></i>Por favor presione un valor numerico</p>');
            return;
        }
    }

    if(estado=='allServicioMI'){
        cambiaTexto('allServicioMI');
        if(/^\d+$/.test(valor)){
            if((saldo-valor)<=0){
                muestraToast('<p class="animate__animated animate__jello"><i class="bi bi-exclamation-triangle"></i>Saldo insuficiente</p>');    
                return;
            }else{
                monto=valor;
                saldo=saldo-monto;
                pagaste=monto;
                cambiaTexto('elComprobanteI');
                muestraToast('<p class="animate__animated animate__fadeInUpBig"><i class="bi bi-cash-coin"></i>pagando</p>');
                return;
                return;
            } 
        }else{
            muestraToast('<p class="animate__animated animate__jello"><i class="bi bi-exclamation-triangle"></i>Por favor presione un valor numerico</p>');
            return;
        }
    }

    if(estado=='elComprobanteI'){
        if(valor==='Sí'){
            cambiaTexto('elReciboSaldoI');
            muestraToast('<p class="animate__animated animate__fadeInRightBig"><i class="bi bi-printer"></i>Imprimiendo comprobante</p>');
            setTimeout(function() {
                cambiaTexto('preFinal');
                }, 5000);
            return;
        }else if(valor=='No'){
            cambiaTexto('preFinal');
            return;
        }else{
            muestraToast('<p class="animate__animated animate__jello"><i class="bi bi-exclamation-triangle"></i>Por favor presione Sí o No</p>');
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
    case 'allServicio':
        llenarPantalla(`<h2 class='text-center'>Ingrese el número de convenio:</h2><br>`);
      break;
    case 'allServicioM':
        llenarPantalla(`<h2 class='text-center'>Ingrese el monto:</h2><br>`);
      break;
    case 'allTarjeta':
        llenarPantalla(`<h2 class='text-center'>Ingrese el número de tarjeta:</h2><br>`);
      break;
    case 'allTarjetaM':
        llenarPantalla(`<h2 class='text-center'>Ingrese el monto:</h2><br>`);
      break;
    case 'elComprobante':
        llenarPantalla(`<h2>¿Desea imprimir su comprobante?</h2><br>
        <p>Sí</p> 
        <p>No</p>`);
      break;
    case 'elRecibo':
        llenarPantalla(`<h2>Usted ha pagado</h2><br>
        <p>Servicio pagado:${servicio}</p> 
        <p>por el monto: ${monto}</p>`);
      break;
    case 'elReciboSaldo':
        llenarPantalla(`<h2>A continuacion su saldo :</h2><br>
        <p>No. tarjeta:${tarjeta}</p> 
        <p>por el monto: ${saldo}</p>`);
      break;
    case 'elReciboSaldo2':
        llenarPantalla(`<h2>A continuacion su saldo :</h2><br>
        <p>No. tarjeta:${tarjeta}</p>
        <p>Saldo actual:${saldo}</p>
        <p>retiro: ${retiro}</p>`);
      break;
    case 'preFinal':
        llenarPantalla(`<h2>¿Desea realizar alguna otra operación?</h2><br>
        <p>Sí</p> 
        <p>No</p>`);
      break;
    case 'conSaldo':
        llenarPantalla(`<h2 class='text-center'>Ingrese su tarjeta:</h2><br>`);
      break;
    case 'conSaldoN':
        llenarPantalla(`<h2 class='text-center'>Hola ${usuario}</h2> <h3 class='text-center'>ingrese su NIP:</h3><br>`);
      break;
    case 'mueSaldo':
        llenarPantalla(`<h2 class='text-center'>Su saldo es de: ${saldo}</h2><br>
        <p>¿Desea imprimir comprobante?</p>
        <p>Sí</p> 
        <p>No</p>`);
      break;
    case 'retEfectivo':
        llenarPantalla(`<h2 class='text-center'>Ingrese su tarjeta:</h2><br>`);
      break;
    case 'conSaldoN2':
        llenarPantalla(`<h2 class='text-center'>Hola ${usuario}</h2> <h3 class='text-center'>ingrese su NIP:</h3><br>`);
      break;
    case 'mueSaldo2':
        llenarPantalla(`<h2 class='text-center'>Su saldo es de: ${saldo}</h2><br>
        <p>Ingrese el monto a retirar</p>`);
      break;
    case 'mueSaldo3':
        llenarPantalla(`<h2 class='text-center'>Su saldo despues de retirar es: ${saldo}</h2><br>
        <p>¿Desea imprimir comprobante?</p>
        <p>Sí</p> 
        <p>No</p>`);
      break;
      case 'conSaldoI':
        llenarPantalla(`<h2 class='text-center'>Ingrese su tarjeta:</h2><br>`);
      break;
    case 'conSaldoNI':
        llenarPantalla(`<h2 class='text-center'>Hola ${usuario}</h2> <h3 class='text-center'>ingrese su NIP:</h3><br>`);
      break;
    case 'mueSaldoI':
        llenarPantalla(`<h2 class='text-center'>Su saldo es de: ${saldo}</h2><br>
        <p>Qué servicio desea pagar?</p>
        <p>1) Agua</p> 
        <p>2) Luz</p>
        <p>3) Teléfono</p>
        <p>4) Otro</p>`);
      break;
    case 'allServicioI':
        llenarPantalla(`<h2 class='text-center'>Ingrese el número de convenio:</h2><br>`);
      break;
    case 'allServicioMI':
        llenarPantalla(`<h2 class='text-center'>Ingrese el monto:</h2><br>`);
      break;
    case 'elComprobanteI':
        llenarPantalla(`<h2 class='text-center'>Su saldo es de: ${saldo}</h2>
        <p>No. tarjeta:${tarjeta}</p>
        <p>Saldo actual:${saldo}</p>
        <p>Pago: ${pagaste}</p>
        <p>Servicio: ${servicio}</p>
        <p>¿Desea imprimir su comprobante?</p>
        <p>Sí</p> 
        <p>No</p>`);
      break;
    case 'elReciboSaldoI':
        llenarPantalla(`<h2>Informacion del movimiento :</h2><br>
        <p>No. tarjeta:${tarjeta}</p>
        <p>Saldo actual:${saldo}</p>
        <p>Pago: ${pagaste}</p>
        <p>Servicio: ${servicio}</p>`);
      break;
    default:
        llenarPantalla(`<h2>No hay pantallas para esta funcionalidad</h2><br>`);
      break;
  }
  estado=st;
  myInput.type='text';
  console.log("estado: "+estado);
}
