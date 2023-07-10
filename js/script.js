init();

function init(){
  // Hide all sections
  hideAll();
  showSection('start');
}

function hideAll(){
  for(const section of document.querySelectorAll('section')){
    section.classList.add('hidden');
  }
}

function showSection(id){
  hideAll();
  document.querySelector(`#${id}`).classList.remove('hidden');
}

function endQuiz(){
  showSection('done');
}

function startTimer(){
  let timeLeft = 75;

  const intervalId = setInterval(() => {
    timeLeft--;
    document.querySelector('#timer').textContent = timeLeft;
    if(timeLeft <= 0){
      clearInterval(intervalId);
      endQuiz();
    }
  }, 1000);

  // Return some functions that we can use to interact with the timer
  return {
    stopTimer: () => {
      clearInterval(intervalId);
    },
    subtractTime: (seconds) => {
      timeLeft -= seconds;
      // Catch if time runs out
      if(timeLeft <= 0){
        clearInterval(intervalId);
        endQuiz();
      }
    }
  }
}

function startQuiz(){
  showSection('question');
  const timer = startTimer();
  nextQuestion();
}

function* questionGenerator(){
  for(const question of questions){
    yield question;
  }
}

const question = questionGenerator();

function nextQuestion(){
  const {value: currentQuestion, done} = question.next(); // Error happens here
  if(!done){
    // Set the question text
    document.querySelector('#question h1').textContent = currentQuestion.question;
    // Go through each button and update it's text and data attribute
    const buttons = document.querySelectorAll('#question button');
    for (let i = 0; i < currentQuestion.answers.length; i++) {
      buttons[i].textContent = currentQuestion.answers[i];
      buttons[i].dataset.correct = i === currentQuestion.correct;
    }
  }else{
    endQuiz();
  }
}

document.querySelector('#start button').addEventListener('click', function(){
  startQuiz();
});

const questions = [
  {
    'question': 'What is JavaScript primarily used for in web development?',
    'answers': ['Designing the webpage', 'Creating interactive webpages', 'Hosting web applications', 'Structuring the webpage'],
    'correct': 1
  },
  {
    'question': 'Which of the following is the correct syntax to print `Hello World` in JavaScript?',
    'answers': ["echo('Hello World');", 'System.out.print("Hello World");', "print('Hello World');", "console.log('Hello World');"],
    'correct': 3
  },
  {
    'question': 'How do you declare a variable in JavaScript?',
    'answers': ['var x;', 'int x;', 'float x;', 'def x;'],
    'correct': 0
  },
  {
    'question': 'Which of the following is a valid way to define an array in JavaScript?',
    'answers': ['var arr = array();', 'var arr = [];', 'var arr = {};', 'var arr = Array;'],
    'correct': 1
  },
  {
    'question': 'How do you write a JavaScript function named `myFunction`?',
    'answers': ['function = myFunction() {}', 'function myFunction() {}', 'function:myFunction() {}', 'function - myFunction() {}'],
    'correct': 1
  },
  {
    'question': 'How can you add a comment in JavaScript?',
    'answers': ['<!-- This is a comment -->', '# This is a comment', '/* This is a comment */', '// This is a comment'],
    'correct': 3
  },
  {
    'question': 'How can you read a property of an object in JavaScript?',
    'answers': ['object->property;', 'object:property;', 'object[property];', 'object.property;'],
    'correct': 3
  },
  {
    'question': 'What does `NaN` stand for in JavaScript?',
    'answers': ['Non-Applicable Number', 'Non-Available Number', 'Not a Number', 'New-array Number'],
    'correct': 2
  },
  {
    'question': 'Which operator is used for string concatenation in JavaScript?',
    'answers': ['.', '+', '&', '*'],
    'correct': 1
  },
  {
    'question': 'What keyword is used to declare constants in JavaScript?',
    'answers': ['static', 'final', 'const', 'constant'],
    'correct': 2
  },
  {
    'question': 'What is the output of `console.log(2+"2")` in JavaScript?',
    'answers': ['4', "'22'", 'Error', "'4'"],
    'correct': 1
  },
  {
    'question': 'Which method removes the last element from an array and returns that element?',
    'answers': ['shift()', 'unshift()', 'pop()', 'push()'],
    'correct': 2
  },
  {
    'question': 'Which of the following is not a JavaScript data type?',
    'answers': ['Number', 'String', 'Float', 'Boolean'],
    'correct': 2
  },
  {
    'question': 'How do you call a function named `myFunction` in JavaScript?',
    'answers': ['call function myFunction();', 'call myFunction();', 'myFunction();', 'function myFunction();'],
    'correct': 2
  },
  {
    'question': 'What will `console.log(10 == "10")` return in JavaScript?',
    'answers': ['false', 'true', '0', 'Error'],
    'correct': 1
  },
  {
    'question': 'What is the default behavior of the `==` operator in JavaScript?',
    'answers': ['Strict equality (no type coercion)', 'Loose equality (with type coercion)', 'Checks only data types', 'Checks if both values are null or undefined'],
    'correct': 1
  },
  {
    'question': 'What is a closure in JavaScript?',
    'answers': ['A syntax error', 'A function having access to the parent scope, even after the parent function has closed', 'A function within a function', 'A function that returns another function'],
    'correct': 1
  },
  {
    'question': 'How do you add an element at the beginning of an array?',
    'answers': ["arr.shift('newElement');", "arr.unshift('newElement');", "arr.push('newElement');", "arr.pop('newElement');"],
    'correct': 1
  },
  {
    'question': 'What will `console.log(typeof null)` return in JavaScript?',
    'answers': ["'null'", "'NaN'", "'undefined'", "'object'"],
    'correct': 3
  },
  {
    'question': 'Which is the correct way to declare a JavaScript object?',
    'answers': ['var obj = {};', 'var obj = [];', 'var obj = new object;', 'var obj = object;'],
    'correct': 0
  }
];