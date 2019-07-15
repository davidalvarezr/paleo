
cocktail_incr = 0
points = getCookie("points") == "" ? 0 : parseInt(getCookie("points"))

function init() {
    setPoints(points)
}

function generateQRCODE( id_cocktail, price ) {
    
    if (price <= points) {
        cocktail_incr++;
        $("#qrcode").empty()
        new QRCode(document.getElementById("qrcode"), id_cocktail + "," + cocktail_incr)
        $('#modal1').openModal()
        points -= price
        setPoints(points)
        refreshAvailability()
    }
}

function validateCode() {
    code = $('#code').val()
    $.getJSON('http://localhost:3000/code/validate/' + code, function(res){
        _points = parseInt(res.points)
        points += _points
        setPoints(points)
        refreshAvailability()
    })
}

function refreshAvailability() {
    cards = $('.gallery').find('.cocktail-card')
    for (var i = 0; i < cards.length; i++) {
        price = $(cards[i]).attr("price")
        if (price<=points) {
            $(cards[i]).removeClass("locked")
        } else {
            $(cards[i]).addClass("locked")
        }
    }
}


function setPoints( pts ) {
    setCookie("points", pts, 7)
    $("#pts").text(pts + " pts")
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}