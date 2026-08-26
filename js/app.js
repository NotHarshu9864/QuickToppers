const PIN = "123456"; // prototype only — replace with real auth
const lock = document.getElementById("lock");
const app = document.getElementById("app");
const pin = document.getElementById("pin");
const msg = document.getElementById("authMsg");
const logs = document.getElementById("logs");

function authenticate(){
  if(pin.value === PIN){
    lock.classList.add("hidden");
    app.classList.remove("hidden");
    addLog("SECURE SESSION ESTABLISHED");
    addLog("AUTHENTICATION SUCCESSFUL");
  }else{
    msg.textContent="ACCESS DENIED";
    addLog("AUTHENTICATION FAILURE");
  }
}
document.getElementById("unlock").onclick=authenticate;
pin.addEventListener("keydown",e=>{if(e.key==="Enter")authenticate()});

function addLog(text){
  const d=document.createElement("div");
  d.textContent=`${new Date().toLocaleTimeString()} ${text}`;
  logs.prepend(d);
  while(logs.children.length>7) logs.lastChild.remove();
}
function updateTime(){
  document.getElementById("time").textContent=new Date().toLocaleTimeString();
}
document.getElementById("sync").onclick=()=>{
  addLog("SYNC REQUEST SENT");
  setTimeout(()=>addLog("LOCAL PROJECT STATUS REFRESHED"),500);
  setTimeout(()=>addLog("SOCIAL DATA CONNECTOR: WAITING FOR API"),1000);
};
setInterval(updateTime,1000);
updateTime();
addLog("CORE INITIALIZED");
addLog("WAITING FOR AUTHENTICATION");
