
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
