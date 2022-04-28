// toggleTheme();
document.cookie = "la";

document.getElementById('toggle-theme').addEventListener('click', (e) => {
    console.log(document.cookie == "berlin")
    if (document.cookie == "la") {
        document.cookie = "berlin"
    } else {
        document.cookie = "la"
    }
    e.stopPropagation;
    
})

// function toggleTheme() {
//     let toggle = document.cookie;

//     if (toggle)) {


//         document.getElementById('stylesheet-file').innerHTML = "<link rel='stylesheet' href='/stylesheets/style-dark.css' />";
//         toggleCounter = 1;
//     } else {
//         document.getElementById('stylesheet-file').innerHTML = "<link rel='stylesheet' href='/stylesheets/style.css' />";
//         toggleCounter = 0;
//     }
// }
