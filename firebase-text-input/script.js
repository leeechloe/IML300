// Your web app's Firebase configuration
//const firebaseConfig = {
//  apiKey: "AIzaSyAFajdu_Y13KgwcZA3LPJmj2j_nw7SoB0s",
//  authDomain: "collective-input.firebaseapp.com",
//  projectId: "collective-input",
//  storageBucket: "collective-input.appspot.com",
//  messagingSenderId: "338519851864",
//  appId: "1:338519851864:web:5fb3b64d1cad63b20b1b2d",
//  measurementId: "G-G0J7EQCZPC"
//};

 const firebaseConfig = {
  apiKey: "AIzaSyDUlZybnaoLh4jjIKN-cGG7y1QRGKs1Onw",
  authDomain: "iml300-firebase-demo-24901.firebaseapp.com",
  projectId: "iml300-firebase-demo-24901",
  storageBucket: "iml300-firebase-demo-24901.firebasestorage.app",
  messagingSenderId: "118840852627",
  appId: "1:118840852627:web:bc7fac75040955f2f1cd66",
  measurementId: "G-WRMVPBTJCD"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.database();
let dbRef = db.ref("text");


 dbRef.push(data);

let chatContainer = document.getElementById("chat-container");
let entry = document.getElementById("text-input-entry");
let share = document.getElementById("text-input-submit");

dbRef.on("child_added", gotText);

function gotText(data) {
  let id = data.key;
  let value = data.val();
  console.log(value);
  chatContainer.innerHTML =
    "<div class='response'>" + value + "</div>" + chatContainer.innerHTML;
}

//click button will run this function
const textInputSubmit = document.getElementById("text-input-submit");
textInputSubmit.addEventListener("click", submitText);

let textContainerElement = document.getElementById("text-input-entry");

function submitText() {
  let textToSubmit = textContainerElement.value; //gets text value from textbox
  let newKey = dbRef.push().key; //ask firebase to give you a new key / 'name'
  let updates = {}; //send firebase list of values
  updates[newKey] = textToSubmit;
  dbRef.update(updates);
}

function submitlock() {
  entry.remove();
  share.value = "Thanks for telling me.";
  share.disabled = true;
  share.style.width = "70%";
}
// ── Sparkle animation ──────────────────────────────────────────────────────
(function () {
  const canvas = document.getElementById("sparkle-canvas");
  const ctx = canvas.getContext("2d");
 
  const COLORS = [
    [255, 230, 160],
    [255, 200, 210],
    [230, 170, 255],
    [255, 255, 220],
    [255, 180, 130],
    [255, 255, 255],
  ];
 
  let W, H;
 
  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  window.addEventListener("resize", resize);
  resize();
 
  function rand(a, b) { return Math.random() * (b - a) + a; }
 
  function makeSpark() {
    return {
      x: rand(0, W),
      y: rand(0, H),
      size: rand(1.5, 4),
      col: COLORS[Math.floor(Math.random() * COLORS.length)],
      life: Math.floor(rand(0, 200)),
      lifespan: rand(140, 260),
      vx: rand(-0.08, 0.08),
      vy: rand(-0.15, -0.03),
      phase: rand(0, Math.PI * 2),
      tSpeed: rand(0.04, 0.09),
      isStar: Math.random() < 0.45,
    };
  }
 
  const sparks = Array.from({ length: 100 }, makeSpark);
 
  function drawStar(x, y, r, alpha, col) {
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.fillStyle = `rgba(${col[0]},${col[1]},${col[2]},1)`;
    ctx.shadowColor = `rgba(${col[0]},${col[1]},${col[2]},0.9)`;
    ctx.shadowBlur = r * 5;
    ctx.translate(x, y);
    ctx.beginPath();
    for (let i = 0; i < 8; i++) {
      const a = (i * Math.PI) / 4;
      const rr = i % 2 === 0 ? r : r * 0.28;
      i === 0
        ? ctx.moveTo(Math.cos(a) * rr, Math.sin(a) * rr)
        : ctx.lineTo(Math.cos(a) * rr, Math.sin(a) * rr);
    }
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }
 
  function drawDot(x, y, r, alpha, col) {
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.fillStyle = `rgba(${col[0]},${col[1]},${col[2]},1)`;
    ctx.shadowColor = `rgba(${col[0]},${col[1]},${col[2]},0.85)`;
    ctx.shadowBlur = r * 5;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
 
  function loop() {
    ctx.clearRect(0, 0, W, H);
    for (const s of sparks) {
      s.life++;
      s.x += s.vx;
      s.y += s.vy;
      s.phase += s.tSpeed;
 
      const t = s.life / s.lifespan;
      let env;
      if (t < 0.2)      env = t / 0.2;
      else if (t > 0.7) env = (1 - t) / 0.3;
      else              env = 1;
 
      // pow(sin,2) creates sharp bright pulses — much more visible than plain sin
      const twinkle = 0.4 + 0.6 * Math.pow(Math.sin(s.phase), 2);
      const alpha = Math.max(0, Math.min(1, env * twinkle * 0.92));
 
      if (s.life >= s.lifespan) {
        Object.assign(s, makeSpark());
        s.life = 0;
      } else {
        s.isStar
          ? drawStar(s.x, s.y, s.size, alpha, s.col)
          : drawDot(s.x, s.y, s.size, alpha, s.col);
      }
    }
    requestAnimationFrame(loop);
  }
  loop();
})();
 