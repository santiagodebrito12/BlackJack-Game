// 2C = two of Clubs(treboles)2C = two of Clubs(treboles)
// 2D= two of Diamons(diamantes)
// 2H = two of Heart(corazones)
// 2S = two of Spades(espadas)


let deck        = [];
const tipos     = ['C','D','H','S'];
const especiales = ['J','Q','K','A']


let puntosJugador = 0;
let puntosComputadora = 0;
// Referencias html
const btnPedir = document.getElementById('pedirCarta') ;
const divCartasJugador = document.getElementById('jugador-cartas');
const divCartasComputadora = document.getElementById('computadoraCartas');
const puntoHtml = document.querySelectorAll('small');

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
}
crearDeck();
deck = _.shuffle(deck);
console.log(deck);

//esta funcion me permite tomar una carta y resta la carta del maso con POP.
const pedirCarta = () =>{
    // medida de seguridad para cuando el maso se queda sin cartas
    if (deck.length === 0) {
        throw 'no hay cartas en el deck';
    }
    const carta = deck.pop();
    console.log(deck);
    console.log(carta);
    return carta;
}
// //ciclo for para ver que funcion la medida de seguridad para cuando el maso no tiene mas cartas
// for(let i = 0; deck.length<=100; i++){
// pedirCarta();
// }
let PuntosString= 0 ;
let Puntos = parseInt(PuntosString);

const valorCarta = (carta) =>{
      const valor = carta.substring(0,carta.length-1);
      //si el valor no es un numero , se activa el operador ternario 
    //   si el valor es un as vale 11 :(sino) vale 10
    // sino , si el valor es un numero se lo multiplica por 1 y devuelve el numero
      return (isNaN(valor)) ?
      (valor==='A') ? 11 : 10
      : valor*1;
}






//Eventos
btnPedir.addEventListener('click', () => {
     const carta = pedirCarta();
     puntosJugador = puntosJugador + valorCarta(carta);
     
     puntoHtml[0].innerHTML = puntosJugador;
     const imgCarta = document.createElement('img');
      imgCarta.src = `assets/cartas/${carta}.png`;
      imgCarta.classList.add('carta');
     divCartasJugador.append(imgCarta);


     if (puntosJugador>=22) {
         alert("lo siento,perdiste")
         btnPedir.disabled = true;
     } else if(puntosJugador === 21){
         alert('¡GANASTE!');
         btnPedir.disabled = true;
     }
});
// TURNO DE LA COMPUTADORA
const turnoComputadora = (puntosMinimos) => {
    do {
       const carta = pedirCarta();
       puntosComputadora = puntosComputadora + valorCarta(carta);
       
       puntoHtml[1].innerHTML = puntosComputadora;
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartasComputadora.append(imgCarta);
    } while (puntosComputadora<=puntosMinimos){
        
    }
};


// TODO:borrar
turnoComputadora(20);


