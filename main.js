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

// function getImgValiCode () {
//     let showNum = [];
//     let captcha.width = 150;
//     let captcha.height = 30;
//     let canvas = document.getElementById('valicode');
//     let ctx = canvas.getctx('2d');
//     canvas.width = captcha.width;
//     canvas.height = captcha.height;
//     let sCode = 'A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,0,1,2,3,4,5,6,7,8,9,!,@,#,$,%,^,&,*,(,)';
//     let saCode = sCode.split(',');
//     let saCodeLen = saCode.length;
//     for (let i = 0; i <= 3; i++) {
//       let sIndex = Math.floor(Math.random()*saCodeLen);
//       let sDeg = (Math.random()*30*Math.PI) / 180;
//       let cTxt = saCode[sIndex];
//       showNum[i] = cTxt.toLowerCase();
//       let x = 10 + i*20;
//       let y = 20 + Math.random()*8;
//       ctx.font = 'bold 23px 微软雅黑';
//       ctx.translate(x, y);
//       ctx.rotate(sDeg);
  
//       ctx.fillStyle = randomColor();
//       ctx.fillText(cTxt, 0, 0);
  
//       ctx.rotate(-sDeg);
//       ctx.translate(-x, -y);
//     }
//     for (let i = 0; i <= 5; i++) {
//       ctx.strokeStyle = randomColor();
//       ctx.beginPath();
//       ctx.moveTo(
//         Math.random() * captcha.width,
//         Math.random() * captcha.height
//       );
//       ctx.lineTo(
//         Math.random() * captcha.width,
//         Math.random() * captcha.height
//       );
//       ctx.stroke();
//     }
//     for (let i = 0; i < 30; i++) {
//       ctx.strokeStyle = randomColor();
//       ctx.beginPath();
//       let x = Math.random() * captcha.width;
//       let y = Math.random() * captcha.height;
//       ctx.moveTo(x,y);
//       ctx.lineTo(x+1, y+1);
//       ctx.stroke();
//     }
//     rightCode = showNum.join('');
//   }
  
//   function randomColor () {
//     let r = Math.floor(Math.random()*256);
//     let g = Math.floor(Math.random()*256);
//     let b = Math.floor(Math.random()*256);
//     return 'rgb(' + r + ',' + g + ',' + b + ')';
//   }

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
    // ctx.font = "bold 48px serif";
    
    let uniquechar = "";

    const randomchar =
"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    // Some measurements
    let metrics = ctx.measureText(uniquechar);
    let fontHeight = metrics.fontBoundingBoxAscent + metrics.fontBoundingBoxDescent;
    // let actualHeight = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;

    // Generate captcha for length of
    // 5 with random character
    for (let i = 1; i < 7; i++) {
        uniquechar += randomchar.charAt(
            Math.random() * randomchar.length)
    }

    for (let i = 0; i <= 6; i++) {
        let sIndex = Math.floor(Math.random()*randomchar.length);
        let sDeg = (Math.random()*30*Math.PI) / 180;
        let cTxt = randomchar[sIndex];
        uniquechar += randomchar.charAt(
            Math.random() * randomchar.length);
        let x = 10 + i*40;
        let y = captcha.height/2+fontHeight/2 - 10 + (Math.random() - 0.5) * 20;
        ctx.font = 'bold 48px 微软雅黑';
        ctx.translate(x, y);
        ctx.rotate(sDeg);
    
        ctx.fillStyle = randomColor();
        ctx.fillText(cTxt, 0, 0);
    
        ctx.rotate(-sDeg);
        ctx.translate(-x, -y);
      }
    for (let i = 0; i <= 5; i++) {
        ctx.strokeStyle = randomColor();
        ctx.beginPath();
        ctx.moveTo(
          Math.random() * captcha.width,
          Math.random() * captcha.height
        );
        ctx.lineTo(
          Math.random() * captcha.width,
          Math.random() * captcha.height
        );
        ctx.stroke();
      }
    for (let i = 0; i < 30; i++) {
        ctx.strokeStyle = randomColor();
        ctx.beginPath();
        let x = Math.random() * captcha.width;
        let y = Math.random() * captcha.height;
        ctx.moveTo(x,y);
        ctx.lineTo(x+1, y+1);
        ctx.stroke();
    }

    // // Store generated input
    // ctx.fillText(uniquechar, captcha.width/2-metrics.width/2, captcha.height/2+fontHeight/2-10);
    correct = hashCode(uniquechar);
}

function randomColor () {
    let r = Math.floor(Math.random()*256);
    let g = Math.floor(Math.random()*256);
    let b = Math.floor(Math.random()*256);
    return 'rgb(' + r + ',' + g + ',' + b + ')';
}

function printmsg() {
    const usr_input = document
        .getElementById("submit").value.trim();

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