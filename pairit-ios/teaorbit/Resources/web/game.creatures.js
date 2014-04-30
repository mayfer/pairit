
window.creatures_game = function() {
    var letters_div = $('<div>').attr('id', 'letters').appendTo($('#creatures .wrapper'));
    $('#creatures').show();

    $('<h3>').attr('id', 'word').prependTo($('#creatures .wrapper'));

    function shuffle(o){ //v1.0
        for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
        return o;
    };


    var words = "{0}`~ __@#_ ojOj0 {0}`~ __@#_ ojOj0 {0}`~ __@#_ ojOj0 	".split(" ");
    var word = words[Math.round(Math.random() * (words.length-1))];

    window.original_word = word;
    $('#word').html(word);

    window.original_word = word;
    word = shuffle(word.split('')).join('');

    for(var i = 0; i < word.length; i++) {
        var letter_elem = $('<div>')
            .addClass('letter')
            .html(word[i])
            .appendTo($('#letters'));
    }

    $('#letters').sortable({
    });
    $('#letters').droppable({
        drop: function(ev, ui){
            setTimeout(function() {
                var letters = $('#letters .letter').text();
                if(letters == window.original_word) {
                    window.games.next("Correct!", "creatures");
                }
            }, 100);
        }
    });
    
    $('#creatures h1').addClass('animated bounceInDown ');
}

