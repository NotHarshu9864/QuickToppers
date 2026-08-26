const PIN="123456";
const $=id=>document.getElementById(id);
let requestCount=128;

function log(text){
  const d=document.createElement("div");
  d.textContent=`${new Date().toLocaleTimeString()}  ${text}`;
  $("logs").prepend(d);
  while($("logs").children.length>8)$("logs").lastChild.remove();
}
function clock(){
  $("clock").textContent=new Date().toLocaleTimeString([], {hour12:false});
}
setInterval(clock,1000); clock();

function authenticate(){
  if($("pin").value!==PIN){
    $("authMsg").textContent="ACCESS DENIED // INVALID PASSCODE";
    $("scanText").textContent="AUTHENTICATION FAILED";
    log("AUTHENTICATION FAILURE");
    return;
  }
  $("authMsg").textContent="";
  $("scanText").textContent="ACCESS GRANTED";
  $("lock").classList.add("hidden");
  $("boot").classList.remove("hidden");
  runBoot();
}
$("unlock").onclick=authenticate;
$("pin").addEventListener("keydown",e=>{if(e.key==="Enter")authenticate()});

function runBoot(){
  const lines=[
    ["AUTHENTICATION","ACCESS GRANTED"],
    ["SESSION","SECURELY ENTERING CORE"],
    ["ENCRYPTION","AES-256 CHANNEL VERIFIED"],
    ["DATABASE","REALTIME LINK ESTABLISHED"],
    ["PROJECTS","3 NODES DETECTED"],
    ["SOCIAL","CONNECTOR STANDBY"],
    ["SYSTEM","COMMAND CENTER READY"]
  ];
  let i=0;
  const interval=setInterval(()=>{
    const [a,b]=lines[i];
    const d=document.createElement("div");
    d.innerHTML=`<b>[${a}]</b> ${b}`;
    $("bootLines").append(d);
    i++;
    const pct=Math.round((i/lines.length)*100);
    $("bootBar").style.width=pct+"%";
    $("bootPercent").textContent=pct+"%";
    $("bootStatus").textContent=i===lines.length?"ACCESS GRANTED":"SECURELY ENTERING";
    if(i===lines.length){
      clearInterval(interval);
      setTimeout(()=>{
        $("boot").classList.add("hidden");
        $("app").classList.remove("hidden");
        log("ACCESS GRANTED // SESSION ESTABLISHED");
        log("SECURELY ENTERING HARSH CORE");
        log("REALTIME MONITORING ENGINE ONLINE");
        log("PROJECT STATUS: ALL SYSTEMS OPERATIONAL");
        log("SOCIAL CONNECTOR: AWAITING OFFICIAL API AUTH");
      },700);
    }
  },350);
}

$("sync").onclick=()=>{
  $("sync").disabled=true;
  log("FORCE SYNC REQUEST INITIALIZED");
  $("lastSync").textContent="syncing...";
  setTimeout(()=>log("FIREBASE REALTIME CHANNEL CHECK: OK"),500);
  setTimeout(()=>log("PROJECT NODES: 3/3 ONLINE"),900);
  setTimeout(()=>log("INSTAGRAM CONNECTOR: AUTH REQUIRED"),1300);
  setTimeout(()=>{
    $("lastSync").textContent="just now";
    $("syncCount").textContent=String(Math.floor(Math.random()*3)+8).padStart(2,"0");
    requestCount+=Math.floor(Math.random()*12)+4;
    $("requests").textContent=requestCount;
    $("sync").disabled=false;
    log("SYNCHRONIZATION COMPLETE");
  },1600);
};
$("clear").onclick=()=>$("logs").innerHTML="";
$("lockBtn").onclick=()=>{
  $("app").classList.add("hidden");
  $("lock").classList.remove("hidden");
  $("pin").value="";
  $("scanText").textContent="SYSTEM LOCKED";
  $("authMsg").textContent="";
};
log("CORE INITIALIZED");
log("WAITING FOR SECURE SESSION");
