
window.draw_game = function() {

    $('#draw').show();
    $('<div>').attr('id', 'drawcanvas').appendTo($('#draw .wrapper'));
    $('#draw h1').addClass('animated bounceInDown');

    var draw = new drawingCanvas($('#drawcanvas'));

    var linewidth = 30;
    draw.init('#ffffff', linewidth);

    var letters = "a e i o u A E I O U b c d f g h j k l m n p r s t v x z B C D F G H J K L M N P R S T V X Z".split(" ");
    var letter = letters[Math.floor(Math.random() * letters.length)];

    draw.drawLetter(letter, "rgba(120,120,120,1)", "Helvetica", 200);
}

