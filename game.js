
startGame = function(num_players){

    this.current_game = 0;
    var game = this;

    this.num_players = num_players;

    this.game_types = [
        window.numbers_game,
        window.words_game,
        window.circles_game,
        window.symbols_game,
        window.draw_game,
        window.vowels_game,
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

            if(game.num_players == 2) {
                window.js_bridge.send("flip");
            }
        }, 800);
    };

    $(document).keydown(function( event ) {
        if ( event.which == 88 ) {
            window.games.next('Correct!', $('.game:visible').attr('id'));
        }
    });

    return this;
}

