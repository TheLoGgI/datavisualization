

function getRandomColor() {
   return `rgba(${getRandomInt()}, ${getRandomInt()}, ${getRandomInt()}, .6)`
}

function getRandomInt(max = 255) {
    return Math.floor(Math.random() * max + 1)
}


function addDataPoint(chart, label, data) {
    chart.data.labels.push(label)
    console.log(chart.data.datasets);
    chart.data.datasets.forEach((dataset) => {
        dataset.data.push(data);
    });
    chart.update();
}

function removeDataPoint(chart) {
    chart.data.labels.pop();
    chart.data.datasets.forEach((dataset) => {
        dataset.data.shift();
    });
    chart.update();
}


function moveChart(e, chart, pivotPoints) {
    console.log(pivotPoints);
    // Labels can controle how many datapoint can be viewed at once
    if (e.target.textContent === 'Last point') {
        changePivot(chart, pivotPoints, -1)

    } else if(e.target.textContent === 'Next Point') {
        changePivot(chart, pivotPoints, 1)
        
    } else {
        console.error('Nothing to do!');
    }

    chart.update()
}

function changePivot(chart, pivotPoints, change) {
    chart.data.datasets.forEach(element => {
        if (pivotPoints.has(element.label)){
            const dataPivot = pivotPoints.get(element.label)
            dataPivot.setPivot(dataPivot.pivot + change)
            element.data = dataPivot.shortData
        } 

    });
}


function addChart(chart, dataset, max = 6) {
    if (max === 0 || max === false || max === null) {
        chart.data.datasets.push(dataset)
        chart.update()
    } else if (chart.data.datasets.length >= 6) {
        console.warn('Chart limit exceed')
    } else {
        chart.data.datasets.push(dataset)
        chart.update()
    }
}

function deleteChart(chart, datalabel) {
    
    if (datalabel && chart.data.datasets > 1) {
       const index = chart.data.datasets.findIndex(set => {
            if (set.label.toLowerCase() === datalabel.toLowerCase()) {
                return index
            }
        })
        chart.data.datasets.splice(index, 1)
        
    } else {
        chart.data.datasets.splice(chart.data.datasets.length - 1, 1)
    }

    chart.update()
}

// let chartData = [12, 19, 3, 5, 2, 28, 92, 30, 37, 10]

// let chartLabels = [...chartData].map(_ => {
//     return 'Bob'
// })

// let chartsBackgroundColor = getRandomColor()


// function createDataset(chartLength,dataname = "undefined") {
//     let data = []
//     for (let i = 0; i < chartLength; i++) {
//         data[i] = getRandomInt(90)    
//     }

//     return {
//         label: dataname,
//         data,
//         backgroundColor: [...chartData].map(_ => 'none' ),
//         borderColor: [...chartData].map(_ => getRandomColor() ),
//         borderWidth: 3,
//         fill: 'false',
//         pointBackgroundColor: chartsBackgroundColor[0],
//         lineTension: 0,
//     }
// }