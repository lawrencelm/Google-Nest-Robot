    
    //initializing backend for Larry Bot's memory
    Parse.initialize(memoryID, memoryKey);
    
    var howImFeeling = 0;
    var bodyStress = 5;

    function emotions(text) {//, userQuery) {

      var param = {
        apikey: alchemy,//required
        text: encodeURIComponent(text), //req
        outputMode: 'json', //optional
      }

      var sentimentURL = "http://access.alchemyapi.com/calls/text/TextGetTextSentiment" +
                          "?apikey=" + param.apikey + "&text=" + param.text + "&outputMode=" + param.outputMode; 

      console.log(sentimentURL);

      var request = new XMLHttpRequest();

      request.addEventListener('load', function(event){
      //if(this.status !== STATUS_OK) {
        //allback(this.responseText);
      //} else {
        var entry = JSON.parse(this.responseText);
        console.log(entry);
        console.log(entry.docSentiment);
        console.log(entry.docSentiment.score);
        howImFeeling = parseFloat(entry.docSentiment.score);

        expressEmotions();
        playSongCube();
        //callback(null, entry);
      //}
      });

      request.open('GET', sentimentURL, true);
      request.send();
      console.log(request.status);
      console.log(request.statusText);
      console.log(request.responseText);

    /*  var piece = Parse.Object.extend("MemoryPiece"); //piece of memory
      var piece = new MemoryPiece();
      piece.save({response: text, userQuery: ""}).then(function(object) { //how to I also save the user query???
        console.log("yay! it worked");
      });*/
    }

    function expressEmotions() {
      if(howImFeeling < 0) {
        //4, 3, 2, 1, 0
        //-0.2, -0.4, -0.6, -0.8, -1
        if(howImFeeling > -0.2) {
          bodyStress = 4;
        } else if(howImFeeling > -0.4) {
          bodyStress = 3;
        } else if(howImFeeling > -0.6) {
          bodyStress = 2;
        } else if(howImFeeling > -0.8) {
          bodyStress = 1;
        } else {
          bodyStress = 0;
        }
      }
      if(howImFeeling > 0) {
        //6, 7, 8, 9, 10
        //0.2, 0.4, 0.6, 0.8, 1
        if(howImFeeling < 0.2) {
          bodyStress = 6;
        } else if(howImFeeling < 0.4) {
          bodyStress = 7;
        } else if(howImFeeling < 0.6) {
          bodyStress = 8;
        } else if(howImFeeling < 0.8) {
          bodyStress = 9;
        } else {
          bodyStress = 10;
        }
      }
      if(howImFeeling == 0) {
        //neutral
        bodyStress = 5;
      }
      console.log("computed stress = " + bodyStress);
      changeBody();
    }

    function playSongCube() {
      var audioName = "dying.wav";
      if(howImFeeling < 0) {
        //4, 3, 2, 1, 0
        //-0.2, -0.4, -0.6, -0.8, -1
        if(howImFeeling > -0.2) {
          audioName = "med_blink.wav";
        } else if(howImFeeling > -0.5) {
          audioName = "small_blink.wav";
        } else {
          audioName = "dying.wav";
        }
      }
      if(howImFeeling > 0) {
        //6, 7, 8, 9, 10
        //0.2, 0.4, 0.6, 0.8, 1
        if(howImFeeling < 0.3) {
          audioName = "large_blink.wav";
        } else {
          audioName = "happy.wav";
        }
      }
      if(howImFeeling == 0) {
        //neutral
        bodyStress = "med_blink.wav";
      }

      var audio = new Audio(audioName);
      audio.volume = 1.0;
      console.log(audioName);
      audio.play();
    }

    function resetBody() {
      console.log("resetting body");
      howImFeeling = 0;
      bodyStress = 5;
      changeBody();
    }

    function reload_js(src) {
        $('script[src="' + src + '"]').remove();
        $('<script>').attr('src', src).appendTo('body');
    }

    function changeBody() { //reloads the body's javascript file and removes previous one
        reload_js(bodyLocation); //From larrycustom.js, which is local
    }
