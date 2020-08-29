
let deck =_.shuffle(['plus','plus','plus','plus','plus','star','star','star','star','star','waves', 'waves','waves','waves','waves','square','square','square','square','sqare','circle','circle','circle','circle','circle']);
var count =0;
var countGuess=0;
var showFront = false;
let answer;
var SpeechRecognition = webkitSpeechRecognition;
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent
var grammar = '#JSGF V1.0; grammar cards; public <cards> = star | plus | waves | circle | square;'
var recognition = new SpeechRecognition();
var speechRecognitionList = new SpeechGrammarList();
speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;
recognition.continuous = false;
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

//start the game
function start(){
    var speech = new SpeechSynthesisUtterance('I am going to test you for extra sensory power. The other side of this card is a circle, plus, waves, square, or star. Clear your mind. When you are ready, say the name out loud.');
    window.speechSynthesis.speak(speech);

    $('.start-messege').hide();//hide the messeage to start the game
    setTimeout(voice,20000);
    
}
function voice(){
    recognition.start();
}
recognition.onresult = function(event) {
    answer=event.results[0][0].transcript;
    toggle(answer);
};
recognition.onspeechend= function(){
    recognition.stop();
    
}

function nextCall(){
    var speech = new SpeechSynthesisUtterance('What about this one?');
    window.speechSynthesis.speak(speech);
    setTimeout(voice, 2000);
}

//toggle the cards
function toggle(guess){
    
    showFront = !showFront;
    if(_.size(deck) != 0){
        //if the guess
        if(showFront){
           
            let card = deck.pop();
            count++;
            if(answer == card){
                countGuess++;
                $('#count-play').text(count);
            }
        
            $('#count-play').text(count);
            $('.card-back' ).hide();
            $('.'+ card).show();
            setTimeout(toggle, 2000);
        
        }
        else{
            $('.card-front').hide();
            $('.card-back').show();
            setTimeout(nextCall,1000);

        }
    
    }
    else{
        $('.card-front').hide();
        $('.card-back').show();
        
        if(count == 25){
            if(countGuess >= 11){
                $('.modal-title').text('You are ESP is' + countGuess +'. You are great Guessing');
                $('#Mymodal').modal();
                // count=0;
                // countGuess=0;
                // $('#count-play').text(count);
            }
            else{
                $('.modal-title').text('Sorry you guees was ' + countGuess +'. You need to practice more!!');
                $('#Mymodal').modal();
            }
    
        }
    }
    
    //move to the next card
    //
   

}

