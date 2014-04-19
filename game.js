
startGame = function(){

    this.current_game = 0;

    this.game_types = [
        window.draw_game,
        window.circles_game,
        window.symbols_game,
        window.vowels_game,
        window.words_game,
        window.creatures_game,
    ];

    this.start = function() {
        $('#correct').remove();
        $('.game').hide();
        $('.game .wrapper').html('');
        this.game_types[this.current_game]();
    }

    this.next = function(message, levelname) {
        correctAnswer(message, levelname);

        this.current_game += 1;

        setTimeout(function() {
            $('#correct').remove();
            $('.game').hide();
            $('.game .wrapper').html('');
            this.game_types[this.current_game % this.game_types.length]();
        }, 800);
    };

    $(document).keydown(function( event ) {
        if ( event.which == 88 ) {
            window.games.next('Correct!', $('.game:visible').attr('id'));
        }
    });

    return this;
}
