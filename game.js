
startGame = function(){

    this.current_game = 0;

    this.flipped = false;

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

            window.js_bridge.send("flip");
        }, 800);
    };

    $(document).keydown(function( event ) {
        if ( event.which == 88 ) {
            window.games.next('Correct!', $('.game:visible').attr('id'));
        }
    });

    return this;
}


function connectWebViewJavascriptBridge(callback) {
    if (window.WebViewJavascriptBridge) {
        callback(WebViewJavascriptBridge)
    } else {
        document.addEventListener('WebViewJavascriptBridgeReady', function() {
            callback(WebViewJavascriptBridge)
        }, false)
    }
}

connectWebViewJavascriptBridge(function(bridge) {
    window.js_bridge = bridge;

    /* Init your app here */

    bridge.init(function(message, responseCallback) {
        alert('Received message: ' + message)   
        if (responseCallback) {
            responseCallback("Right back atcha (js)")
        }
    })
    bridge.send('Hello from the javascript')
    bridge.send('Please respond to this', function responseCallback(responseData) {
        console.log("Javascript got its response", responseData)
    })
})
