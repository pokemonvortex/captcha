let captcha, time, input;
let correct = 0;
let score = 0;

document.addEventListener("mouseup", start)

function start() {
    generate();
    addTimerEvents();
    document.removeEventListener("mouseup", start)
}

function hashCode(string) {
    let hash = 0,
      i, chr;
    if (string.length === 0) return hash;
    for (i = 0; i < string.length; i++) {
      chr = string.charCodeAt(i);
      hash = ((hash << 5) - hash) + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
}

function generate() {
    input = document.getElementById("submit");
    // Clear old input
    input.value = "";
    // Set event listener for enter key
    if (input.getAttribute('listener') !== 'true') {
        input.addEventListener("keyup", ({key}) => {
            if (key === "Enter") {
                printmsg();
            }
        })
        input.setAttribute('listener', 'true');
    }

    // Access the element to store
    // the generated captcha
    captcha = document.getElementById("image");
    const ctx = captcha.getContext("2d");
    
    // Clear and set font
    ctx.clearRect(0, 0, captcha.width, captcha.height);
    ctx.font = "bold 48px serif";
    
    let uniquechar = "";

    const randomchar =
"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    // Generate captcha for length of
    // 5 with random character
    for (let i = 1; i < 7; i++) {
        uniquechar += randomchar.charAt(
            Math.random() * randomchar.length)
    }

    // Some measurements
    let metrics = ctx.measureText(uniquechar);
    let fontHeight = metrics.fontBoundingBoxAscent + metrics.fontBoundingBoxDescent;
    // let actualHeight = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;

    // Store generated input
    ctx.fillText(uniquechar, captcha.width/2-metrics.width/2, captcha.height/2+fontHeight/2-10);
    correct = hashCode(uniquechar)
}

function printmsg() {
    const usr_input = document
        .getElementById("submit").value.trim();

        console.log(usr_input);

    // Check whether the input is equal
    // to generated captcha or not
    if (hashCode(usr_input) === correct) {
        document.getElementById("key").innerHTML = "Score: "+ (++score);
        generate();
    }
    else {
        document.getElementById("key").innerHTML = "Wrong";
        generate();
    }
}

function addTimerEvents() {
    resetTimer();
    // DOM Events
    const events = ['keydown', 'keyup'];
    events.forEach(function(name) {
        document.addEventListener(name, resetTimer, true);
    });
}

function logout() {
    alert("You have timed out. Your final score is "+score+".")
    score = 0;
    document.getElementById("key").innerHTML = "Score: "+ score;
    generate();
    resetTimer();
}

function resetTimer() {
    clearTimeout(time);
    time = setTimeout(logout, 3000)
    // 1000 milliseconds = 1 second
}