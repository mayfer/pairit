
window.words_game = function() {
    $('<div>').addClass('separator').appendTo('#words .wrapper');
    $('<div>').attr('id', 'ordered-letters').appendTo('#words .wrapper');
    $('<div>').attr('id', 'unordered-letters').appendTo('#words .wrapper');

    $('#words').show();

    var words = ['horse', 'laugh', 'magic', 'sound', 'radio', 'shark'];
    var word = words[Math.floor(Math.random() * words.length)];

    var num_circles = 5;
    var letters = word.split('');

    function shuffle(array) {
        var currentIndex = array.length
            , temporaryValue
            , randomIndex
            ;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }


    for(var i = 0; i < letters.length; i++) {

        var letter_container = $('<div>').addClass('letter-container');
        var letter = $('<div>')
            .addClass('letter').addClass('dashed')
            .addClass('letter-'+letters[i])
            .html(letters[i])
            .data('letter', letters[i])
            .appendTo(letter_container);

        $('#ordered-letters').append(letter_container);


    }

    while(letters.join('') == word) {
        letters = shuffle(letters);
    }

    for(var i = 0; i < letters.length; i++) {
        var size = letters[i];
        var circle_container = $('<div>').addClass('letter-container');
        var circle = $('<div>')
            .addClass('letter')
            .addClass('letter-'+letters[i])
            .data('letter', letters[i])
            .html(letters[i])
            .appendTo(circle_container);

        $('#unordered-letters').append(circle_container);
    }

    $('#unordered-letters .letter').draggable({
        revert : function(event, ui) {
            $(this).data("uiDraggable").originalPosition = {
                top : 0,
                left : 0
            };
            return !event;
        }
    });

    $('#ordered-letters .letter').each(function() {
        var delay = 150;
        $(this).droppable({
            drop: function( event, ui ) {
                $( this )
                    .addClass("dropped");
                var drop_p = $(this).offset();
                var drag_p = ui.draggable.offset();
                var left_end = drop_p.left - drag_p.left + 1;
                var top_end = drop_p.top - drag_p.top + 1;
                ui.draggable.animate({
                    top: '+=' + top_end,
                    left: '+=' + left_end
                }, delay);

                if($('.letter.dropped').length == $('#unordered-letters .letter').length) {
                    setTimeout(function() {
                        window.games.next("stupendous!", "words");
                    }, delay);
                }
            },
            accept: '.letter-'+$(this).data('letter'),
        });
    });



    $('#words h1').addClass('animated bounceInDown ');





}

