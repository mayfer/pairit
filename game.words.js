
window.words_game = function() {
    var letters_div = $('<div>').attr('id', 'letters').appendTo($('#words .wrapper'));
    $('#words').show();

    $('<h3>').attr('id', 'word').appendTo(letters_div);

    function shuffle(o){ //v1.0
        for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
        return o;
    };


    var words = "theme stare labor abate there".split(" ");
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
                    correctAnswer("Correct!", "level05", './02 copy.html'); 
                }
            }, 100);
        }
    });
    
    $('#words h1').addClass('animated bounceInDown ');
}
