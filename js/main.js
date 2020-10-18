let ctx = document.getElementById('myChart').getContext('2d');

// Button clicks 

document.getElementById('delete').addEventListener('click', e => {
    // console.log(myChart.data.datasets[0]);
    removeDataPoint(myChart)
})

let datasetLength = null
let chartDatasets = new Map()







document.getElementById('removeChart').addEventListener('click', e => {
    deleteChart(myChart)
})

let myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [],
        datasets: []
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                }
            }]
        }
    }
});

for (const element of document.querySelectorAll('.move')) {
    element.addEventListener('click', function(e) {
        moveChart(e, myChart, chartDatasets)
    })
}


// ec_count	- This is a head-count of all salary and wage earners for the February reference month. Due to rounding individual figures my not always sum to the stated total(s).
// geo_count -	A separate operating unit engaged in New Zealand in one, or predominately one, kind of economic activity from a single physical location or base. Due to rounding individual figures my not always sum to the stated total(s).
// anzsic06 - Total Industry

(async function() {
    const saleryPerArea = await new GetData().fetching('./json/salaryofFebruary.json')
    // Data source: https://www.stats.govt.nz/large-datasets/csv-files-for-download/
    const sortedSalery = saleryPerArea.sorting('Area')


    // Insert Data
    if (sortedSalery) {
        // console.log(saleryData);
        for (let i = 0; i < 10; i++) {
            const element = sortedSalery.next().value

            chartDatasets.set(element[0], new DataPivot(element[0], element[1].ec_count))

            const dataColor = getRandomColor()
            addChart(myChart, {
                label: element[0],
                data: element[1].ec_count,
                backgroundColor: dataColor,
                borderColor: dataColor,
                borderWidth: 5,
                fill: 'false',
                pointBackgroundColor: dataColor,
                lineTension: 0,
            }, false)
            // console.log(element);
            myChart.data.labels.push(element[1].anzsic06)
        }


        document.getElementById('addChart').addEventListener('click', e => {
            const element = sortedSalery.next().value
            const dataColor = getRandomColor()
            console.log(element);
            addChart(myChart, {
                label: element[0],
                data: element[1].ec_count,
                backgroundColor: dataColor,
                borderColor: dataColor,
                borderWidth: 5,
                fill: 'false',
                pointBackgroundColor: dataColor,
                lineTension: 0,
            }, false)
        })

    }

    
})()
