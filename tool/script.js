
var tixpire = document.getElementById("tixpire");
var head = document.getElementsByTagName('HEAD')[0];  
var link = document.createElement('link'); 
link.rel = 'stylesheet';  
      
link.type = 'text/css'; 
      
link.href = 'style.css';  

head.appendChild(link); 


window.onload = function test() {
	tixpire.classList.add("tixpire_button")
	tixpire.innerHTML = "<button aria-label='Go Now, Pay Later, Tixpire'><div><span>Go Now, Pay Later</span><em></em></div></button>"
	let urlVal = tixpire.attributes.url.value;
	console.log(urlVal);
	tixpire.onclick = () => { console.log("Win!"); window.location.href = urlVal; }
	tixpire.attributes.removeNamedItem("url");
	console.log("loaded");
}
/*
<div class="tixpire_button">
      <button aria-label="Go Now, Pay Later, Tixpire">
         <div><span>Go Now, Pay Later</span><em></em></div>
      </button>
   </div>
*/