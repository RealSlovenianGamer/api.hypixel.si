

async function getData(){
  //Dobi podatke od guilda
  const response = await fetch('http://localhost:8080/guild/slo')
  const data = await response.json();
  data.guild.members.forEach(getDate())
  drawChart(getDate());
};

let date = [];
let gExp = [];

function getDate(member){
  //Določevanje današnjega datuma
  //dan
  const d = new Date();
  let dan = d.getDate();
  //mesec
  const m = new Date();
  let mesec = + m.getMonth() + 1;
  if (mesec < 10){mesec = '0' + mesec}
  //leto
  const l = new Date();
  let leto = l.getFullYear()
  //združi z pomišljaji
  for (i=0;i<7;i++){
    date[i] = leto+'-'+mesec+'-'+dan
    dan -= 1;

  }
  return date;
}

function getExp(member){
  member.map((item) => {return item.expHistory['2022-08-18'];});
  
console.log(member);
}
getData();

google.charts.load('current', {'packages':['corechart']});
//google.charts.setOnLoadCallback(drawChart);

function drawChart(date) {
  var data = google.visualization.arrayToDataTable([
    ['Dan', 'Guild EXP'],
    [date[0],  100],
    [date[1],  200],
    [date[2],  300],
    [date[3],  600],
    [date[4],  299],
    [date[5],  1000],
    [date[6],  69]
  ]);

  var options = {
    title: 'Hypixel Slovenija guild',
    legend: { position: 'bottom' }
  };

  var chart = new google.visualization.LineChart(document.getElementById('line_chart'));

  chart.draw(data, options);
}
