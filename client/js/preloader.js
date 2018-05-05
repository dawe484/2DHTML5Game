'use strict';

// let myVar;

window.addEventListener('load', myFunction);

function myFunction() {
  // let myVar = 
  setTimeout(showPage(), 3000);
}

function showPage() {
  document.getElementById('loader').style.display = 'none';
  document.getElementById('myDiv').style.display = 'block';
}