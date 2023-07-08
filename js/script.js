function hideAll(){
  for(const section of document.querySelectorAll('section')){
    section.classList.add('hidden');
  }
}

function showSection(id){
  hideAll();
  document.querySelector(`#${id}`).classList.remove('hidden');
}

function init(){
  hideAll();
  showSection('start');
}

init();

document.querySelector('#start button').addEventListener('click', function(){
  alert('start');
});

const start = document.querySelector('#start');
const question = document.querySelector('#question');
const done = document.querySelector('#done');
const highscore = document.querySelector('#highscore');