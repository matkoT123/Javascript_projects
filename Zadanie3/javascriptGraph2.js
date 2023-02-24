//print graph
var trace1 = {
    x: [],
    y: [],
    type: 'scatter'
};

var trace2 = {
    x: [],
    y: [],
    type: 'scatter'
};

var layout = {
  barmode: "group",
  xaxis: {
    title: {
      text: 'x',
      font: {
        size: 18,
        color: '#7f7f7f'
      }
    }
  },
  yaxis: {
    title: {
      text: 'y',
      font: {
        size: 18,
        color: '#7f7f7f'
      }
    }
  }
};
var data = [trace1, trace2];
var config = { responsive: true};
Plotly.newPlot('graph', data,layout,config);

var constant = 1;

//read data from webpage
if (typeof (EventSource) !== "undefined") {
    var source = new EventSource("https://old.iolab.sk/evaluation/sse/sse.php");
    source.onmessage = function (event) {

        let a = JSON.parse(event.data);
        //extend graph
        Plotly.extendTraces('graph', { x: [[a.x], [a.x]], y: [[constant*a.y1], [constant*a.y2]] }, [0, 1]);
    }
};

//end button
const end = document.getElementById("button");

end.onclick = function end() {
    source.close();
};

//show/hide sin
const sin = document.getElementById("sin");

sin.onclick = function showSin() {
  if (sin.checked == false){
    Plotly.restyle("graph", {opacity: 0}, [0]);
  } else {
    Plotly.restyle("graph", {opacity: 1}, [0]);
  }
};

//show/hide cos
const cos = document.getElementById("cos");

cos.onclick = function showCos() {
  if (cos.checked == false){
    Plotly.restyle("graph", {opacity: 0}, [1]);
  } else {
    Plotly.restyle("graph", {opacity: 1}, [1]);
  }
};

//SHOW/HIDE INPUT Number
const showInput = document.getElementById('showInput');
const customInput = document.getElementById('customInput');

showInput.onclick = function showInputFunction() {
  if(showInput.checked) {
    customInput.style.visibility = 'visible';
  }
  else customInput.style.visibility = 'hidden';
}

//SHOW/HIDE Slider
const showSlider = document.getElementById('showSlider');
const customSlider = document.getElementById('customSlider');

showSlider.onclick = function showSliderFunction() {
  if(showSlider.checked) customSlider.style.visibility = 'visible';
  else customSlider.style.visibility = 'hidden';
}

//Update graph cross input range(slider) element
function updateSliderIndex(index) {
  constant = index;
  customInput.shadowRoot.firstChild.value = index;
}

//Update graph cross input number element
function updateInputIndex(index) {
  constant = index;
  customSlider.shadowRoot.firstChild.value = index;
  customInput.shadowRoot.firstChild.value = index;
}

