
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


$(document).ready(function(){
    $('a').on('touchend', function(e){
        window.location = $(this).attr('href');
        $('#main').css('opacity', '0.5');
    });
});

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
        console.log('Received message: ' + message)
        if (responseCallback) {
            //responseCallback("Right back atcha (js)")
        }
    })
    //bridge.send('Hello from the javascript')
    /*
     bridge.send('Please respond to this', function responseCallback(responseData) {
        console.log("esponse", responseData)
    })
     */
})
