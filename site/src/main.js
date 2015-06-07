function loadFiles(files) {
    
    var callbacks = [];
    var fileDone = [];
    var started = false;
    for(var i = 0; i<files.length; i++) { fileDone.push(false); }
    
    function loadFile(file, index) {
        var head = document.getElementsByTagName("head")[0];
        var script = document.createElement("script");
        
        script.type = "text/javascript";
        script.src = file;
        
        var callback = function() {
            fileDone[index] = true;
            checkForAllDone();
        }
        
        script.onreadystatechange = callback;
        script.onload = callback;
        
        head.appendChild(script);
    }
    
    function checkForAllDone() {
        if(fileDone.every(function(t) { return t; })) {
            callbacks.forEach(function(call) {
                setTimeout(call, 0);
            })
        }
    }
    
    function startLoading() {
        if(started) return;
        started = true;
        for (var i = 0; i < files.length; i++) {
            loadFile(files[i], i);
        } 
    }
    
    return {
        then: function(f) {
            if(fileDone.every(function(t) { return t; })){
                setTimeout(f, 0);
            } else {
                callbacks.push(f);
                startLoading();
            }
            return this;
        }
    }
}


var reqFiles = [
    "src/game.js",
    "src/sprites.js"
];
function main() {
    loadFiles(reqFiles).then(function() {
        startGame(); 
    });
}

window.onload = main;