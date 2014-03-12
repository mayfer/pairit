
function correctAnswer(message, cssclass, nextUrl) {

    var correct = $('<div>')
        .attr('id', 'correct')
        .addClass(cssclass)
        .appendTo('body');

    var correct_inner = $('<div>')
        .addClass('inner')
        .html(message)
        .appendTo(correct);

    if(nextUrl !== undefined) {
        setTimeout(function(){
            window.location = nextUrl;
        }, 800);
    }

}
