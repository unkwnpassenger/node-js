var a = function() {
    console.log('AAA');
}

function slowFunc(callback) {
    callback(); // AAA
}

slowFunc(a);