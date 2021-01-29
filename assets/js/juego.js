// 2C = two of Clubs(treboles)2C = two of Clubs(treboles)
// 2D= two of Diamons(diamantes)
// 2H = two of Heart(corazones)
// 2S = two of Spades(espadas)


let deck         = [];
const tipos      = ['C','D','H','S'];
const especiales = ['J','Q','K','A']


let puntosJugador     = 0;
let puntosComputadora = 0;


// Referencias html
const btnPedir = document.getElementById('pedirCarta') ;
const btnDetener = document.getElementById('detener');
const btnNuevoJuego = document.getElementById('nuevoJuego');


const divCartasJugador = document.getElementById('jugador-cartas');
const divCartasComputadora = document.getElementById('computadoraCartas');

const puntoHtml = document.querySelectorAll('small');


// Esta funcion crea un nuevo deck
const crearDeck = () =>{
        
    for (let i = 2; i<=10 ; i++) {
            for(let tipo of tipos){
                deck.push(i + tipo);
            }
    }
            for(let tipo of tipos){
            for(let esp of especiales){
            deck.push(esp + tipo);
        }
    }
        
           deck = _.shuffle(deck);
           console.log(deck);
           return deck;
}

crearDeck();


//esta funcion me permite tomar una carta y resta la carta del maso con POP.
const pedirCarta = () =>{
    // medida de seguridad para cuando el maso se queda sin cartas
    if (deck.length === 0) {
        throw 'no hay cartas en el deck';
    }
    const carta = deck.pop();
    return carta;
}


const valorCarta = (carta) =>{
      const valor = carta.substring(0,carta.length-1);
      //si el valor no es un numero , se activa el operador ternario 
    //   si el valor es un as vale 11 :(sino) vale 10
    // sino , si el valor es un numero se lo multiplica por 1 y devuelve el numero
      return (isNaN(valor)) ?
      (valor === 'A') ? 11 : 10
      : valor*1;
}

//Eventos
btnPedir.addEventListener('click', () => {
     const carta = pedirCarta();
     puntosJugador = puntosJugador + valorCarta(carta);
     
     puntoHtml[0].innerText = puntosJugador;
     const imgCarta = document.createElement('img');
      imgCarta.src = `assets/cartas/${carta}.png`;
      imgCarta.classList.add('carta');
     divCartasJugador.append(imgCarta);


     if (puntosJugador>=22) {
        //  alert("lo siento,perdiste")
         btnPedir.disabled = true;
         btnDetener.disabled=true;
         turnoComputadora(puntosJugador);
     } else if(puntosJugador === 21){
        //  alert('¡GANASTE!');
         btnPedir.disabled = true;
         btnDetener.disabled=true;
         turnoComputadora(puntosJugador);
     }
});
// TURNO DE LA COMPUTADORA
const turnoComputadora = (puntosMinimos) => {
    do {
       const carta = pedirCarta();
       puntosComputadora = puntosComputadora + valorCarta(carta);
        puntoHtml[1].innerText = puntosComputadora;
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartasComputadora.append(imgCarta);
        if(puntosMinimos>21){
            break;
        }
    } while ((puntosComputadora <= puntosMinimos) && (puntosMinimos<=21)){
       

      setTimeout(()=>{
      if(puntosComputadora===puntosMinimos){
          alert('Empataste!');
      }
      else if(puntosMinimos>21){
          alert('LO SIENTO, LA COMPUTADORA GANA!');  
      }else if(puntosComputadora>21 ){
          alert('JUGADOR GANA!');
      }else if(puntosComputadora>puntosMinimos){
      alert('LO SIENTO, LA COMPUTADORA GANA!');  
      } else if(puntosComputadora<puntosJugador){
          alert('FELICITACIONES,GANASTE!');
      };
    },100)
};
};

// funcion para darle funcionalidad al boton detener
function Detener() {
    btnPedir.disabled=true;
    btnDetener.disabled=true;
    turnoComputadora(puntosJugador);
};


// funcion btn NUEVO JUEGO
function nuevoJuego() {
  console.clear();
  deck = crearDeck();
  puntosJugador                    =0;
  puntosComputadora                =0;
  puntoHtml[0].innerHTML           =0;
  puntoHtml[1].innerHTML           =0; 
  divCartasJugador.innerHTML       =" ";
  divCartasComputadora.innerHTML   =" ";  
  btnPedir.disabled=false;
  btnDetener.disabled=false; 
};

btnDetener.addEventListener('click',Detener);
btnNuevoJuego.addEventListener('click',nuevoJuego);


