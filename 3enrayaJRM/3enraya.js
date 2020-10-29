let array = [];
crearArray();

function enviarDades() {
    var article_id = 1;

    var article = {
        'title': 'Conectar Firebase',
    }

    firebase.database().ref('articles/' + article_id).set(article);
}

function comprovar(nom) {
    var pieza = document.getElementById(nom);
    if (pieza.textContent == "O" || pieza.textContent == "X") {
        alert('Ya hay una pieza en esta posicion');
    } else {
        document.getElementById(nom).innerHTML = 'O';
        ponerPieza(pieza);
        if (elegirOpcion() == false) {
            if (array[4] == "") {
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

function crearArray() {
    for (let i = 0; i <= 8; i++) {
        array.push('');
    }
}

function ponerPieza(pieza) {
    array[pieza.id] = 'O';
}

function elegirOpcion() {
    let ok = false;

    let h = comprovarHoritzontal("O");
    let d = comprovarDiagonal("O");
    let v = comprovarVertical("O");
    let h1 = comprovarHoritzontal("X");
    let d1 = comprovarDiagonal("X");
    let v1 = comprovarVertical("X");

    if (h1 != undefined) {
        document.getElementById(h1).innerHTML = 'X';
        array[h1] = 'X';
        ok = true;
    } else if (v1 != undefined) {
        document.getElementById(v1).innerHTML = 'X';
        array[v1] = 'X';
        ok = true;
    } else if (d1 != undefined) {
        document.getElementById(d1).innerHTML = 'X';
        array[d1] = 'X';
        ok = true;
    } else if (h != undefined) {
        document.getElementById(h).innerHTML = 'X';
        array[h] = 'X';
        ok = true;
    } else if (v != undefined) {
        document.getElementById(v).innerHTML = 'X';
        array[v] = 'X';
        ok = true;
    } else if (d != undefined) {
        document.getElementById(d).innerHTML = 'X';
        array[d] = 'X';
        ok = true;
    }
    return ok;
}

function comprovarHoritzontal(vinagre) {
    let perill;
    for (let i = 0; i <= 6; i = i + 3) {
        if (array[i] == vinagre && array[i + 1] == vinagre && array[i + 2] == '') {
            perill = i + 2;
        } else if (array[i] == '' && array[i + 1] == vinagre && array[i + 2] == vinagre) {
            perill = i;
        } else if (array[i] == vinagre && array[i + 1] == '' && array[i + 2] == vinagre) {
            perill = i + 1;
        } else if (array[i] == vinagre && array[i + 1] == vinagre && array[i + 2] == vinagre) {
            alert("Has guanyat!!")
        }
    }
    return perill;
}

function comprovarVertical(vinagre) {
    let perill;
    for (let i = 0; i <= 3; i++) {
        if (array[i] == vinagre && array[i + 3] == vinagre && array[i + 6] == '') {
            perill = i + 6;
        } else if (array[i] == '' && array[i + 3] == vinagre && array[i + 6] == vinagre) {
            perill = i;
        } else if (array[i] == vinagre && array[i + 3] == '' && array[i + 6] == vinagre) {
            perill = i + 3;
        } else if (array[i] == vinagre && array[i + 3] == vinagre && array[i + 6] == vinagre) {
            alert("Has guanyat!!")
        }
    }
    return perill;
}

function comprovarDiagonal(vinagre) {
    let perill;
    for (let i = 2; i <= 4; i = i + 2) {
        if (array[4 - i] == vinagre && array[4] == vinagre && array[4 + i] == '') {
            perill = 4 + i;
        } else if (array[4 - i] == '' && array[4] == vinagre && array[4 + i] == vinagre) {
            perill = 4 - i;
        } else if (array[4 - i] == vinagre && array[4] == '' && array[4 + i] == vinagre) {
            perill = 4;
        } else if (array[4 - i] == vinagre && array[4] == vinagre && array[4 + i] == vinagre) {
            alert("Has guanyat!!")
        }
    }
    return perill;
}

function randomSinRepetir() {
    let numrand = Math.floor(Math.random() * 9);
    if (array[numrand] != '') {
        return randomSinRepetir();
    } else {
        return numrand;
    }
}


/*funcio registre usuaris */

function registrar() {
    //capturamos los que nos ingresa el user 
    var usuari = document.getElementById('usuari').value;
    var correo = document.getElementById('correo').value;
    var contrasena = document.getElementById('contrasena').value;
    console.log(usuari);
    //le pasamos el correo y el password
    firebase.auth().createUserWithEmailAndPassword(correo, contrasena)
        .then(function() {

            verificar();


        }).catch(function(error) {
            // si no crea el usuario entra por error
            var errorCode = error.code;
            var errorMessage = error.message;
            //pruebas
            console.log(errorCode);
            console.log(errorMessage);
        });
}
//funcio login usuari
function login() {
    //capturamos los que nos ingresa el user 
    var correo2 = document.getElementById('correo2').value;
    var contrasena2 = document.getElementById('contrasena2').value;

    firebase.auth().signInWithEmailAndPassword(correo2, contrasena2).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        //pruebas
        console.log(errorCode);
        console.log(errorMessage);
    });
}


var msg = document.getElementById('msgInicio');
//controla el estat del usuari 
function observador() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            console.log(' hay alguien')
                //pasamos la variable usuario al  mensaje para saver si el usuario a verificado el correo 
            msgInicioExitoso(user);

            // User is signed in.
            var displayName = user.displayName;
            var email = user.email;
            var emailVerified = user.emailVerified;
            var photoURL = user.photoURL;
            var isAnonymous = user.isAnonymous;
            var uid = user.uid;
            var providerData = user.providerData;
            // ...
        } else {
            // User is signed out.

            msg.innerHTML = `
             `;
            console.log('no hay nadie')
        }
    });
}
observador();


//codi que surt,  si s'ha iniciat correctament 
function msgInicioExitoso(user) {
    var user = user;
    //si el usuario esta verificado muestra el contenido 
    if (user.emailVerified) {
        msg.innerHTML = `
    <button class="btn btn-danger mt-2 ml-2 btn-sm" onclick="cerrar()">sortir</button>
    `;
    }
}
//funcio per tencar sessió
function cerrar() {
    firebase.auth().signOut().then(function() {
        console.log("saliendo...");
    }).catch(function(error) {
        console.log(error);
    });
}

//funcio que enviara un email de verificacio a un usuari nou 

function verificar() {
    var user = firebase.auth().currentUser;

    user.sendEmailVerification().then(function() {
        // misatge enviat
    }).catch(function(error) {
        // algo a pachao .
    });
}


/*fi funcions de registre y login   */

/*firestore  */

var db = firebase.firestore();



function agregarUsuario(usuari) {
    //user es el nom de la  "taula"
    //.add afegira un id unic a cada usuari 
    db.collection("users").add({
            first: usuari,
            puntuacio: 0
        })
        .then(function(docRef) {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });
}

/*fin firestore  */