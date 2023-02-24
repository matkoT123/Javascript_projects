//================GRAF 1==================//
//load xml file
let getXMLFile = function (path, callback) {
  let request = new XMLHttpRequest();
  request.open("GET", path);
  request.setRequestHeader("Content-Type", "text/xml");
  request.onreadystatechange = function () {
    if (request.readyState === 4 && request.status === 200) {
      //ColumnarGraph
      //define all arrays corresponding to individual marks
      var years = getArrays(this, "rok");
      var a = getArrays(this, "A");
      var b = getArrays(this, "B")
      var c = getArrays(this, "C");
      var d = getArrays(this, "D");
      var e = getArrays(this, "E");
      var fx = getArrays(this, "FX");
      var fn = getArrays(this, "FN");

      printColumnarGraph(years, a, b, c, d, e, fx, fn);

      //PieGraph
      //define all arrays corresponding to individual year
      var zs2016_2017 = [];
      var zs2017_2018 = [];
      var zs2018_2019 = [];
      var zs2019_2020 = [];
      var zs2020_2021 = [];
      var zs2021_2022 = [];

      var all = [zs2016_2017, zs2017_2018, zs2018_2019, zs2019_2020, zs2020_2021, zs2021_2022];

      for (var i = 0; i < 6; i++) {
        all[i].push(a[i]);
        all[i].push(b[i]);
        all[i].push(c[i]);
        all[i].push(d[i]);
        all[i].push(e[i]);
        all[i].push(fx[i]);
        all[i].push(fn[i]);
      }

      printPieGraphs(all);
        
      printGraph(all);

      window.onresize = function responsiveColumnarGraph() {
        printColumnarGraph(years, a, b, c, d, e, fx, fn);
        printPieGraphs(all);
        printGraph(all);
      }

      callback(request.responseXML);
    }
  };
  request.send();
};

getXMLFile("z03.xml", function (xml) { });

//extract data from xml to arrays
function getArrays(xml, tag) {
  var x, i, xmlDoc, txt;
  xmlDoc = xml.responseXML;
  txt = [];
  x = xmlDoc.getElementsByTagName(tag);
  for (i = 0; i < x.length; i++) {
    txt.push(x[i].childNodes[0].nodeValue);
  }
  //console.log(txt);
  txt.reverse();
  return txt;
}

function printColumnarGraph(years, a, b, c, d, e, fx, fn) {
  //columnar graph
  var trace1 = {
    x: years,
    y: a,
    name: 'A',
    type: 'bar',
    text: 'A',
    orientation: 'v'
  };

  var trace2 = {
    x: years,
    y: b,
    name: 'B',
    type: 'bar',
    text: 'B',
    orientation: 'v'
  };

  var trace3 = {
    x: years,
    y: c,
    name: 'C',
    type: 'bar',
    text: 'C'
  };

  var trace4 = {
    x: years,
    y: d,
    name: 'D',
    type: 'bar',
    text: 'D',
    orientation: 'v'
  };
  var trace5 = {
    x: years,
    y: e,
    name: 'E',
    type: 'bar',
    text: 'E',
    orientation: 'v'
  };

  var trace6 = {
    x: years,
    y: fx,
    name: 'FX',
    type: 'bar',
    text: 'FX',
    orientation: 'v'
  };

  var trace7 = {
    x: years,
    y: fn,
    name: 'FN',
    type: 'bar',
    text: 'FN',
    orientation: 'v'
  };

  var data = [trace1, trace2, trace3, trace4, trace5, trace6, trace7];

  var layout = { 
    title: 'Hodnotenie študentov',
    barmode: 'group',
    xaxis: {
      title: {
        text: 'rok',
        font: {
          size: 18,
          color: '#7f7f7f'
        }
      }
    },
    yaxis: {
      title: {
        text: 'počet študentov',
        font: {
          size: 18,
          color: '#7f7f7f'
        }
      }
    }
  };

  var config = { responsive: true }

  if(window.innerWidth < 1050) {
    data[0].x = a;
    data[0].y = years;
    data[1].x = b;
    data[1].y = years;
    data[2].x = c;
    data[2].y = years;
    data[3].x = d;
    data[3].y = years;
    data[4].x = e;
    data[4].y = years;
    data[5].x = fx;
    data[5].y = years;
    data[6].x = fn;
    data[6].y = years;

    data[0].orientation = 'h';
    data[1].orientation = 'h';
    data[2].orientation = 'h';
    data[3].orientation = 'h';
    data[4].orientation = 'h';
    data[5].orientation = 'h';
    data[6].orientation = 'h';

    layout.xaxis.title.text = 'počet študentov';
    layout.xaxis.title.font.size = 13;
    layout.yaxis.title.text = 'rok';
    layout.yaxis.title.font.size = 13;
  }
  Plotly.newPlot('myDiv', data, layout, config);
}

//--------------------------===============-----------------------------
//ZS 2016/2017

function printPieGraphs(all) {
  var data = [{
    values: all[0],
    labels: ['A', 'B', 'C', 'D', 'E', 'FX', 'FN'],
    textinfo: "label+percent",
    domain: {column: 0, row: 0},
    name: 'ZS 2016/2017',
    hoverinfo: 'label+name',
    type: 'pie'
  },
  
  {
    values: all[1],
    labels: ['A', 'B', 'C', 'D', 'E', 'FX', 'FN'],
    textinfo: "label+percent",
    domain: {column: 1, row: 0},
    name: 'ZS 2017/2018s',
    hoverinfo: 'labelt+name',
    type: 'pie',
  },

  {
    values: all[2],
    labels: ['A', 'B', 'C', 'D', 'E', 'FX', 'FN'],
    textinfo: "label+percent",
    domain: {column: 2, row: 0},
    name: 'ZS 20118/2019',
    hoverinfo: 'label+name',
    
    type: 'pie',
  },

  {
    values: all[3],
    labels: ['A', 'B', 'C', 'D', 'E', 'FX', 'FN'],
    textinfo: "label+percent",
    domain: {column: 0, row: 1},
    name: 'ZS 20119/2020',
    hoverinfo: 'label+name',
    type: 'pie',
  },

  {
    values: all[4],
    labels: ['A', 'B', 'C', 'D', 'E', 'FX', 'FN'],
    textinfo: "label+percent",
    domain: {column: 1, row: 1},
    name: 'ZS 2020/2021',
    hoverinfo: 'label+name',
    type: 'pie',
  },

  {
    type: 'pie',
    values: all[5],
    labels: ['A', 'B', 'C', 'D', 'E', 'FX', 'FN'],
    textinfo: "label+percent",
    domain: {column: 2, row: 1},
    name: 'ZS 2021/2022',
    hoverinfo: 'label+name',
  },
];
var layout = {

  height: 750,
width: 1000,
  grid: {rows: 2, columns: 3, pattern: 'independent'},
  showlegend: false,
};

  if(window.innerWidth < 1050) {
    data[0].domain.column = 0;
    data[0].domain.row = 0;
    data[1].domain.column = 0;
    data[1].domain.row = 1;
    data[2].domain.column = 0;
    data[2].domain.row = 2;
    data[3].domain.column = 0;
    data[3].domain.row = 3;
    data[4].domain.column = 0;
    data[4].domain.row = 4;
    data[5].domain.column = 0;
    data[5].domain.row = 5;

    layout.grid.columns = 1;
    layout.grid.rows = 6;
    layout.height = 1900;
    layout.legend = false;
  } 
  
  Plotly.newPlot('myDiv2', data, layout);  

};
//print free Graph
function printGraph(all) {

  var count = findNumberofStudents(all);

  var trace1 = {
    x: [2016,2017, 2018, 2019, 2020, 2021],
    y: count,
    type: 'scatter'
  };
  
  var data = [trace1];

  var layout = {
    title: 'Počet študentov v jednotlivých rokoch',
    barmode: "group",
    xaxis: {
      title: {
        text: 'rok',
        font: {
          size: 18,
          color: '#7f7f7f'
        }
      }
    },
    yaxis: {
      title: {
        text: 'počet študentov',
        font: {
          size: 18,
          color: '#7f7f7f'
        }
      }
    }
  };

  var config = { responsive: true };

  if(window.innerWidth < 1050) {
    layout.xaxis.title.font.size = 13;
    layout.yaxis.title.font.size = 13;
  }
  
  Plotly.newPlot('myDiv3', data, layout, config);
}

function findNumberofStudents(all) {
  var countOfStudents = [];
  var a=0;
  for(var i = 0; i < (all.length); i++) {
    for(var j = 0; j < (all[0].length); j++) {
      a+= parseInt(all[i][j]);
    }
    countOfStudents.push(a);
    a=0;
  }
  return countOfStudents;
}