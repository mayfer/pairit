
function correctAnswer(message, nextUrl) {

    var correct = $('<div>')
        .attr('id', 'correct')
        .appendTo('body');

    var correct_inner = $('<div>')
        .addClass('inner')
        .html(message)
        .appendTo(correct);

    setTimeout(function(){
        window.location = nextUrl;
    }, 800);

}
