let countOfroundEasy = 0;
let canGoNext = true;
let mistakesEasy = 0;

function goBack(){
  countOfroundEasy = 0;
  canGoNext = true;
  mistakesEasy = 0;
    document.getElementById("modalGame").style.visibility = "hidden";
    document.getElementById("modalDifficulty").style.visibility = "hidden";
    document.getElementById("modalRules").style.visibility = "hidden";
    document.getElementById("modalAuthors").style.visibility = "hidden";
    document.getElementById("menu").style.visibility = "visible";
}

function openModalDifficulty(){
    countOfroundEasy = 0;
    document.getElementById("modalDifficulty").style.visibility = "visible";
    document.getElementById("menu").style.visibility = "hidden";
}

function openModalRules(){
    document.getElementById("modalRules").style.visibility = "visible";
    document.getElementById("menu").style.visibility = "hidden";
}

function openModalAuthors(){
    document.getElementById("modalAuthors").style.visibility = "visible";
    document.getElementById("menu").style.visibility = "hidden";
}



let flagTaken = [];


  function startGameEasy(){
    if(canGoNext) {
    document.getElementById("modalDifficulty").style.visibility = "hidden";

    if(countOfroundEasy < 5) {
      document.getElementById("modalGame").innerHTML = `
    <div class="content">
    
    <h4 id="question"></h4>
    
    <section class="nameOfStatesContainer">
      <div id="argentinaDrop" class="nameOfStates" data-draggable-id="argentina">
        <span id="span"></span>
      </div>
    </section>
    
    <section class="flag-container" id="flagContainer">
      <img draggable="true" class="flags" src="" id="" alt="">
      <img draggable="true" class="flags" src="" id="" alt="">
      <img draggable="true" class="flags" src="" id="" alt="">
    </section>

    <section id="scoreContainter" class="scoreContainterClass">
      <div id="scoreBox" class="scoreBoxClass">
        mistakes  : <span id="score" class="scoreClass">0</span>
      </div>
    </section>
    <section id="controlButtons" class="controlButtons">
        <div class="row">
            <div class="buttonDiv">
                <button class="button-35" type="button" onclick="goBack()">Go Back</button>
            </div>
            <div class="buttonDiv">
                <button class="button-35" type="button" onclick="startGameEasy()">Next</button>
            </div>
        </div>
    </section>
  </div>
    `;

    gameLogic('easy');
    document.getElementById("modalGame").style.visibility = "visible";
    } else {
      document.getElementById("modalGame").innerHTML = `
    <div class="content">
    
    <h4 id="wholeMistakes"></h4>

    <section id="controlButtons" class="controlButtons">
        <div class="row">
            <div class="buttonDiv">
                <button class="button-35" type="button" onclick="goBack()">Menu</button>
            </div>
            <div class="buttonDiv"> 
                <button class="button-35" type="button" onclick="startGameEasy()">One more</button>
            </div>
        </div>
    </section>
    
    
  </div>
    `;
    document.getElementById("wholeMistakes").innerHTML = "Mistakes in this game: " + mistakesEasy;
    countOfroundEasy = 0;
    mistakesEasy = 0;
    }

  }

}

let mistakesHard = 0;

function startGameHard(){
  if(canGoNext) {
    document.getElementById("modalDifficulty").style.visibility = "hidden";

    if (countOfroundEasy < 5) {
      document.getElementById("modalGame").innerHTML = `
  <div class="content">
  
  <h4 id="question"></h4>
  
  <section class="nameOfStatesContainer">
    <div id="argentinaDrop" class="nameOfStates" data-draggable-id="argentina">
      <span id="span"></span>
    </div>
  </section>
  
  <section class="flag-container" id="flagContainer">
    <img draggable="true" class="flags" src="" id="" alt="">
    <img draggable="true" class="flags" src="" id="" alt="">
    <img draggable="true" class="flags" src="" id="" alt="">
  </section>

  <section id="scoreContainter" class="scoreContainterClass">
    <div id="scoreBox" class="scoreBoxClass">
      mistakes: <span id="score" class="scoreClass">0</span>
    </div>
  </section>
  <section id="controlButtons" class="controlButtons">
      <div class="row">
          <div class="buttonDiv">
              <button class="button-35" type="button" onclick="goBack()">Go Back</button>
          </div>
          <div class="buttonDiv">
              <button class="button-35" type="button" onclick="startGameHard()">Next</button>
          </div>
      </div>
  </section>
</div>
  `;
      gameLogic('hard');
      document.getElementById("modalGame").style.visibility = "visible";
    } else {
      document.getElementById("modalGame").innerHTML = `
    <div class="content">
    
    <h4 id="wholeMistakes"></h4>

    <section id="controlButtons" class="controlButtons">
        <div class="row">
            <div class="buttonDiv">
                <button class="button-35" type="button" onclick="goBack()">Menu</button>
            </div>
            <div class="buttonDiv"> 
                <button class="button-35" type="button" onclick="startGameHard()">One more</button>
            </div>
        </div>
    </section>
    
    
  </div>
    `;
      document.getElementById("wholeMistakes").innerHTML = "Mistakes in this game: " + mistakesEasy;
      countOfroundEasy = 0;
      mistakesEasy = 0;
    }
  }
  
}

function gameLogic(difficulty) {
  canGoNext = false;
  let images = document.querySelectorAll(".flags");
  let dropFlagTo = document.getElementById("argentinaDrop");
  let nameOfState = document.getElementById("span");
  let mistakesEasySpan = document.getElementById("score");
  let dragItem = null;
  let idOfFlag = null;
  let isInDropArea = false;
  let arrayGenerate = [];
  let arrayImages = [];

  mistakesEasySpan.innerHTML = mistakesEasy;
  
  fetch('data.json').then(response => {
    return response.json();
  }).then(data => {

    if(difficulty === "easy") {
      document.getElementById("question").innerHTML = data.questionFlags;
  
    for (var k of images) {
      a = Math.floor((Math.random() * data.flags.length));
      
      if (!arrayGenerate.includes(a)) {
        arrayGenerate.push(a);
      } else {
        a = Math.floor((Math.random() * data.flags.length));
        if (arrayGenerate.includes(a)) {
          a = Math.floor((Math.random() * data.flags.length));
          arrayGenerate.push(a);
        } else {
          arrayGenerate.push(a);
        }
      }
      k.setAttribute("alt", data.flags[a].title);
      k.setAttribute("src", data.flags[a].path);
      k.setAttribute("id", data.flags[a].id);
  
      arrayImages.push(k);
      flagTaken.push(k);

    }
    }

    if(difficulty === "hard") {
      document.getElementById("question").innerHTML = data.questionShapes;
  
    for (var k of images) {
      a = Math.floor((Math.random() * data.flags.length));
      
      if (!arrayGenerate.includes(a)) {
        arrayGenerate.push(a);
      } else {
        a = Math.floor((Math.random() * data.flags.length));
        if (arrayGenerate.includes(a)) {
          a = Math.floor((Math.random() * data.flags.length));
          arrayGenerate.push(a);
        } else {
          arrayGenerate.push(a);
        }
      }
      k.setAttribute("alt", data.shapes[a].title);
      k.setAttribute("src", data.shapes[a].path);
      k.setAttribute("id", data.shapes[a].id);
  
      arrayImages.push(k);
      flagTaken.push(k);

    }
    }

  let generateIndex = Math.floor((Math.random() * 3));
  dropFlagTo.setAttribute("data-draggable-id", arrayImages[generateIndex].id);
  nameOfState.innerHTML = arrayImages[generateIndex].alt;
  
  //Touch
  for (var j of images) {
    j.addEventListener("touchmove", onTouchMove);
    j.addEventListener("touchend", onTouchEnd);
  
    function onTouchMove(e) {
      e.preventDefault();
      j = this;
      j.style.opacity = 1;
      let touchLocation = e.targetTouches[0];
      j.style.position = "absolute";
      leftPos = j.style.left;
      topPos = j.style.top;
      j.style.left = (touchLocation.pageX - (j.width / 2)) + 'px';
      j.style.top = (touchLocation.pageY - (j.height / 2)) + 'px';
      idOfFlag = this.id;
  
      let dropFlagToPosition = dropFlagTo.getBoundingClientRect();
  
      isInDropArea = (
        (touchLocation.pageX) > dropFlagToPosition.left &&
        (touchLocation.pageX) < (dropFlagToPosition.left + j.width) &&
        (touchLocation.pageY) > dropFlagToPosition.top &&
        (touchLocation.pageY) < (dropFlagToPosition.top + j.height)
      );
  
      if (isInDropArea) {
        dropFlagTo.style.border = "5px dashed black";
  
      } else if (!isInDropArea) {
        dropFlagTo.style.border = "3px dashed #111";
      }
  
    }
  
    function onTouchEnd(e) {
      e.preventDefault;
      if (dropFlagTo.getAttribute("data-draggable-id") === idOfFlag) {
        if (isInDropArea) {
          dropFlagTo.style.border = "3px solid #111";
          dropFlagTo.append(j);
          nameOfState.style.display = "none";
          countOfroundEasy++;
          canGoNext = true;
        }
      } else {
        j.style.opacity = 0.8;
        mistakesEasy += 1;
        mistakesEasySpan.innerHTML = mistakesEasy;
        dropFlagTo.style.border = "3px dashed #111";
        j.style.left = leftPos;
        j.style.top = topPos;
      }
      j.style.position = "unset";
      idOfFlag = null;
      isInDropArea = false;
    }
  }
  
  //Mouse
  for (var i of images) {
  
    i.addEventListener("dragstart", dragStart);
    i.addEventListener("dragend", dragEnd);
  
    function dragStart() {
      dragItem = this;
      setTimeout(() => this.style.display = "none", 0);
      idOfFlag = this.id;
    }
  
    function dragEnd() {
      setTimeout(() => this.style.display = "block", 0);
      dragItem = null;
      idOfFlag = null;
    }
  }
  
  dropFlagTo.addEventListener('dragover', dragOver);
  dropFlagTo.addEventListener('dragenter', dragEnter);
  dropFlagTo.addEventListener('dragleave', dragLeave);
  dropFlagTo.addEventListener('drop', Drop);
  
  function Drop() {
    this.style.border = "3px dashed #111";
    if (this.getAttribute("data-draggable-id") === idOfFlag) {
      this.style.border = "3px solid #111";
      countOfroundEasy++;
      canGoNext = true;
      this.append(dragItem);
      dragItem.style.opacity = 1;
      nameOfState.style.display = "none";
    } else {
      mistakesEasy += 1;
      mistakesEasySpan.innerHTML = mistakesEasy;
    }
  }
  
  function dragOver(e) {
    e.preventDefault();
    this.style.border = "5px dashed black";
  }
  
  function dragEnter(e) {
    e.preventDefault();
    this.style.border = "3px dashed #111";
  }
  
  function dragLeave() {
    this.style.border = "3px dashed #111";
  }
  
  })

}
