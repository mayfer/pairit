
startGame = function(){

    this.game_types = [
        window.circles_game,
        window.symbols_game,
        window.vowels_game,
        window.words_game,
    ];

    this.start = function() {
        $('#correct').remove();
        $('.game .wrapper').html('');
        this.game_types[Math.floor(Math.random() * this.game_types.length)]();
    }

    this.next = function(message, levelname) {
        correctAnswer(message, levelname);
        setTimeout(function() {
            $('#correct').remove();
            $('.game .wrapper').html('');
            this.game_types[Math.floor(Math.random() * this.game_types.length)]();
        }, 800);
    };

    return this;
}
