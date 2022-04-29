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
    } else {
        document.getElementById('stylesheet-file').innerHTML = "<link rel='stylesheet' href='/stylesheets/style-dark.css' />";
    }
}

function setClickHandlerForToggleButton() {
    document.getElementById('toggle-theme').addEventListener('click', () => {
        console.log(document.cookie);
    if (document.cookie == "la") {
        document.getElementById('stylesheet-file').innerHTML = "<link rel='stylesheet' href='/stylesheets/style-dark.css' />";
        document.cookie = "berlin"
    } else {
        document.getElementById('stylesheet-file').innerHTML = "<link rel='stylesheet' href='/stylesheets/style.css' />";
        document.cookie = "la"
        }
    })
}
