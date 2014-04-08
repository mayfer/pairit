window.symbols_game = function() {
    $('<div>').attr('id', 'letters').appendTo('#symbols .wrapper');

    $('.game').hide();
    $('#symbols').show();

    function shuffle(o){ //v1.0
        for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
        return o;
    };


    var vowels_str = "&"
    var vowels = vowels_str.split(" ");

    var consonants_str = "% ? @"
    var consonants = consonants_str.split(" ");
    var all_letters = vowels.concat(consonants);

    var num_letters = 4;
    var letters = [];

    for(var i = 0; i < num_letters; i++) {
        var letter_group;
        if(i < -4) {
            letter_group = vowels;
        } else {
            letter_group = all_letters;
        }

        var letter = letter_group[Math.floor(Math.random() * letter_group.length)];

        letters.push(letter);
        // remove the letter from original arrays to prevent duplicates
        var index = all_letters.indexOf(letter); all_letters.splice(index, 1);
        var index = vowels.indexOf(letter); vowels.splice(index, 1);
    }

    shuffle(letters);

    for(var i = 0; i < letters.length; i++) {
        var letter_elem = $('<div>')
            .addClass('letter')
            .html(letters[i])
            .appendTo($('#letters'));

        if(vowels_str.indexOf(letters[i]) != -1) {
            letter_elem.addClass('vowel');
        }

    }

    $('#letters .letter').one('click touchend', function(e) {
        e.preventDefault();
        console.log(vowels_str.indexOf($(this).html()))
        if($(this).hasClass('vowel')) {
            $(this).html("✓").addClass('correct');
        } else {
            $(this).html("&times;").addClass('wrong');
        }
        if($('.vowel.correct').length == $('.vowel').length) {
            setTimeout(function() {
                window.games.next("Correct!", "symbols");
            }, 150);
        }
    });
    
    
    
    $('#symbols h1').addClass('animated bounceInDown ');

}
