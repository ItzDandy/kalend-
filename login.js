function login() {
    const users = [
        "daniel.frasko@sezman.cz.heslo123",
        "patockamartin@seznam.cz.heslo132",
        "dandycz@seznam.cz.Heslo321",
    ]

    let userEmail = document.getElementById("emailIn").value;
    let userPassword = document.getElementById("passwordIn").value;
    let userLogin = userEmail + "." + userPassword;

    let isLoggedIn = false;

    for (let i = 0; i < users.length; i++) {
        if (userLogin === users[i]) {
            alert("Úspěšně přihlášen!");
            isLoggedIn = true;
            break;
        }
    }

    if (isLoggedIn) { 
        window.location.href = "kalendar.html";
    } else {
        alert("Špatně zadané heslo nebo email!");
    }
}
