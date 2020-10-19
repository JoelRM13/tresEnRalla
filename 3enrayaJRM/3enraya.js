
let array = [];
crearArray();

function comprovar(nom){
    var pieza = document.getElementById(nom);
    if (pieza.textContent == "O" || pieza.textContent == "X"){
        alert('Ya hay una pieza en esta posicion');
    } else {
        document.getElementById(nom).innerHTML = 'O';
        ponerPieza(pieza);
        if(elegirOpcion() == false){
            if (array[4] == ""){
                document.getElementById(4).innerHTML = 'X';
                array[4] = 'X';
            } else {
                let elegido = randomSinRepetir();
                document.getElementById(elegido).innerHTML = 'X';
                array[elegido] = 'X';
            }
        }
    }
}
function crearArray(){
    for (let i = 0; i <= 8; i++){
        array.push('');
    }    
}
function ponerPieza(pieza){
    array[pieza.id] = 'O';
}
function elegirOpcion(){
    let ok = false;
    
    let h= comprovarHoritzontal("O");            
    let d = comprovarDiagonal("O");
    let v = comprovarVertical("O");
    let h1= comprovarHoritzontal("X");            
    let d1 = comprovarDiagonal("X");
    let v1 = comprovarVertical("X");

    if(h1 != undefined){
        document.getElementById(h1).innerHTML = 'X';
        array[h1] = 'X';
        ok = true;
    } 
    else if(v1 != undefined){
        document.getElementById(v1).innerHTML = 'X';
        array[v1] = 'X';
        ok = true;
    }
    else if(d1 != undefined){
        document.getElementById(d1).innerHTML = 'X';
        array[d1] = 'X';
        ok = true;
    }
    else if(h != undefined){
        document.getElementById(h).innerHTML = 'X';
        array[h] = 'X';
        ok = true;
    } 
    else if(v != undefined){
        document.getElementById(v).innerHTML = 'X';
        array[v] = 'X';
        ok = true;
    }
    else if(d != undefined){
        document.getElementById(d).innerHTML = 'X';
        array[d] = 'X';
        ok = true;
    }
    return ok;
}
function comprovarHoritzontal(vinagre){
    let perill;
    for(let i = 0; i <= 6; i = i + 3){
        if (array[i] == vinagre && array[i+1] == vinagre && array[i+2] == ''){
            perill= i+2;
        }
        else if (array[i] == '' && array[i+1] == vinagre && array[i+2] == vinagre){
            perill = i;
        }
        else if (array[i] == vinagre && array[i+1] == '' && array[i+2] == vinagre){
            perill = i+1;
        }
        else if (array[i] == vinagre && array[i+1] == vinagre && array[i+2] == vinagre && vinagre == 'O'){
            alert("Has guanyat!!")
            break;
        }
        else if (array[i] == vinagre && array[i+1] == vinagre && array[i+2] == vinagre && vinagre == 'X'){
            alert("Has perdut!!")
            break;
        }
    }
    return perill;
}

function comprovarVertical(vinagre){
    let perill;
    for(let i = 0; i <= 3; i++){
        if (array[i] == vinagre && array[i+3] == vinagre && array[i+6] == ''){
            perill= i+6;
        }
        else if (array[i] == '' && array[i+3] == vinagre && array[i+6] == vinagre){
            perill = i;
        }
        else if (array[i] == vinagre && array[i+3] == '' && array[i+6] == vinagre){
            perill = i+3;
        }
        else if (array[i] == vinagre && array[i+3] == vinagre && array[i+6] == vinagre && vinagre == 'O'){
            alert("Has guanyat!!")
            break;
        }
        else if (array[i] == vinagre && array[i+3] == vinagre && array[i+6] == vinagre && vinagre == 'X'){
            alert("Has perdut!!")
            break;
        }
    }
    return perill;
}

function comprovarDiagonal(vinagre){
    let perill;
    for(let i = 2; i <= 4; i = i + 2){
        if (array[4-i] == vinagre && array[4] == vinagre && array[4+i] == ''){
            perill= 4+i;
        }
        else if (array[4-i] == '' && array[4] == vinagre && array[4+i] == vinagre){
            perill = 4-i;
        }
        else if (array[4-i] == vinagre && array[4] == '' && array[4+i] == vinagre){
            perill = 4;
        }
        else if (array[4-i] == vinagre && array[4] == vinagre && array[4+i] == vinagre && vinagre == 'O'){
            alert("Has guanyat!!")
            break;
        }
        else if (array[4-i] == vinagre && array[4] == vinagre && array[4+i] == vinagre && vinagre == 'X'){
            alert("Has perdut!!")
            break;
        }
    }
    return perill;
}

function randomSinRepetir(){
    let numrand = Math.floor(Math.random() * 9);
            if (array[numrand] != ''){
                return randomSinRepetir();
            }
            else{
                return numrand;
            }
} 