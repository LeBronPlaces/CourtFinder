setInitialDocumentCookie();
setInitialStylesheet();
setClickHandlerForToggleButton();

function setInitialDocumentCookie() {
    if (! (document.cookie == "la" || document.cookie == "berlin")) {
        document.cookie = "la";
    }
}

function setInitialStylesheet() {
    if (document.cookie == "la") {
        document.getElementById('stylesheet-file').innerHTML = "<link rel='stylesheet' href='/stylesheets/style.css' />";
        document.getElementById('toggle-theme').innerText = 'LA';
    } else {
        document.getElementById('stylesheet-file').innerHTML = "<link rel='stylesheet' href='/stylesheets/style-dark.css' />";
        document.getElementById('toggle-theme').innerText = 'B';
    }
}

function setClickHandlerForToggleButton() {
    document.getElementById('toggle-theme').addEventListener('click', () => {
    if (document.cookie == "la") {
        document.getElementById('stylesheet-file').innerHTML = "<link rel='stylesheet' href='/stylesheets/style-dark.css' />";
        document.cookie = "berlin"
        toggleButtonText();
    } else {
        document.getElementById('stylesheet-file').innerHTML = "<link rel='stylesheet' href='/stylesheets/style.css' />";
        document.cookie = "la"
        toggleButtonText();
        }
    })
}

function toggleButtonText() {
    let toggleButtonText = document.getElementById('toggle-theme').innerText;

    if (toggleButtonText == 'B') {
        document.getElementById('toggle-theme').innerText = 'LA';
        console.log('LA');
    } else {
        document.getElementById('toggle-theme').innerText = 'B';
        console.log('B')
    }
}