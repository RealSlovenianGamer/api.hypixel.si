let circularProgress = document.querySelector(".circular-progress"),
progressValue = document.querySelector(".progress-value");

fetch('http://localhost:8080/guild/slo')
.then(response => response.json())
.then(data => {
    //progressEndValue = Math.floor(100 / data.guild.members.length);
    progressEndValue = Math.floor(100 / data.guild.members.length * 100);
    var allmembers = data.guild.members.length;
    let progressStartValue = 0,    
    speed = 20;
    let progress = setInterval(() => {
    progressStartValue++;
    progressValue.textContent = `${allmembers}`
    circularProgress.style.background = `conic-gradient(#7d2ae8 ${progressStartValue * 3.6}deg, #ededed 0deg)`

    if(progressStartValue == progressEndValue){
        clearInterval(progress);
    }    
    }, speed);
})
