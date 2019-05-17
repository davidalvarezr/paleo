
cocktail_incr = 0
points = 0

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
    $("#pts").text(pts + " pts")
}