export const dataConfig = {
    datasets: [
      {
        fill: true,
        lineTension: 0.2,
        label: "Dataset 1",
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        data: []
      }
    ]
}

export const config = function(callback) {
    return {
        animation: {
            duration: 0                    // general animation time
          },
        hover: {
            animationDuration: 0           // duration of animations when hovering an item
        },
        responsiveAnimationDuration: 0,    // animation duration after a resize
        plugins: {
            streaming: {
                frameRate: 5               // chart is drawn 5 times every second
            }
        },
        scales: {
        xAxes: [
            {
                type: "realtime",
                ticks: {
                    display: false //this will remove only the label
                },
                realtime: {
                    onRefresh: callback,
                    delay: 2000
                }
            }
        ]
        }
    }
}