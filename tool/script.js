
var head = document.getElementsByTagName('HEAD')[0];  
var link = document.createElement('link'); 
link.rel = 'stylesheet';  
      
link.type = 'text/css'; 
      
link.href = 'https://cdn.jsdelivr.net/gh/codymurphyjones/tixspire-admin-panel@master/tool/style.css';  

head.appendChild(link); 


function RunTixpire() {
	var tixpire = document.getElementById("tixpire");
	tixpire.classList.add("tixpire_button")
	tixpire.innerHTML = "<button aria-label='Go Now, Pay Later, Tixpire'><div><span>Go Now, Pay Later</span><em></em></div></button>"
	let urlVal = tixpire.attributes.url.value;
	console.log(urlVal);
	tixpire.onclick = () => { console.log("Win!"); window.location.href = urlVal; }
	tixpire.attributes.removeNamedItem("url");
	tixpire.attributes.removeNamedItem("id");
	console.log("loaded");
}


window.onload = RunTixpire;
/*
<div class="tixpire_button">
      <button aria-label="Go Now, Pay Later, Tixpire">
         <div><span>Go Now, Pay Later</span><em></em></div>
      </button>
   </div>
*/