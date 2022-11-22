export default {
    backgroundColor: "transparent",
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    legend: {},
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: [
    {
        type: 'category',
        data: ['08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21','22']
    }
    ],
    yAxis: [
    {
        type: 'value'
    }
    ],
    series: [
    {
        name: 'Identify',
        type: 'bar',
        stack: 'Ad',
        emphasis: {
            focus: 'series'
        },
        data: [120, 132, 10, 13, 190, 230, 21, 43, 20, 80, 170, 250, 133, 21, 10]
    },
    {
        name: 'Unknown',
        type: 'bar',
        stack: 'Ad',
        emphasis: {
            focus: 'series'
        },
        data: [220, 182, 59, 23, 129, 130, 31, 14, 12, 180, 70, 50, 133, 21, 10]
    }
    ]
}