
function correctAnswer(message, cssclass) {

    var correct = $('<div>')
        .attr('id', 'correct')
        .addClass(cssclass)
        .appendTo('body');

    var correct_inner = $('<div>')
        .addClass('inner')
        .html(message)
        .appendTo(correct);

}


$(document).ready(function(){
    $('a').on('touchend', function(e){
        window.location = $(this).attr('href');
        $('#main').css('opacity', '0.5');
    });
});
