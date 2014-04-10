
startGame = function(){

    this.current_game = 0;

    this.game_types = [
        window.circles_game,
        window.symbols_game,
        window.vowels_game,
        window.words_game,
        window.draw_game,
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

    return this;
}
