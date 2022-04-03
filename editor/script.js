const fileNames = ["AutoOpMode.java","TeleOpMode.java"];
let editor;
let sessions = [];
let currentFile = 0;

function selectFile(id) {
  if ( id == currentFile ) return;
  currentFile = id;
  document.getElementById(`file-link-${id}`).classList.add("active");
  document.getElementById(`file-link-${(id + 1) % 2}`).classList.remove("active");
  editor.setSession(sessions[id]);
}

function build() {
  saveWithoutBuild(_ => {
    let req = new XMLHttpRequest();
    req.onload = function() {
      console.log(this.responseText);
    }
    req.open("GET",`/build?fname=${fileNames[currentFile].slice(0,-5)}`);
    req.send();
  });
}

function saveWithoutBuild(callback) {
  let req = new XMLHttpRequest();
  req.onload = function() {
    console.log(this.responseText);
    if ( callback ) callback();
  }
  req.open("PUT",`/java/${fileNames[currentFile]}`);
  req.setRequestHeader("Content-Type","application/json;charset=UTF-8");
  req.send(JSON.stringify({"data": editor.getValue()}));
}

window.onload = _ => {
  editor = ace.edit("editor");
  editor.setTheme("ace/theme/monokai");

  let req = new XMLHttpRequest();
  req.onload = function() {
    let session = ace.createEditSession(this.responseText);
    session.setMode("ace/mode/java");
    sessions.push(session);
    let req = new XMLHttpRequest();
    req.onload = function() {
      let session = ace.createEditSession(this.responseText);
      session.setMode("ace/mode/java");
      sessions.push(session);
      editor.setSession(sessions[0]);
    }
    req.open("GET",`/java/${fileNames[1]}`);
    req.send();
  }
  req.open("GET",`/java/${fileNames[0]}`);
  req.send();

  setInterval(_ => {
    let req = new XMLHttpRequest();
    req.onload = function() {
      document.getElementById("log").innerHTML = this.responseText;
    }
    req.open("GET",`/log.log`);
    req.send();
  },100);
}
