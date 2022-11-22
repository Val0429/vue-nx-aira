export default {
    backgroundColor: "transparent",
    title: {
        text: 'Attributes',
        left: 'center',
        top: 20,
        textStyle: {
        color: '#ccc'
        }
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top: 'center',
      left: '20%',
      orient: 'vertical'
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['50%', '70%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '40',
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: 1048, name: 'Red' },
          { value: 735, name: 'Yellow' },
          { value: 580, name: 'White' },
          { value: 484, name: 'Green' },
          { value: 300, name: 'Black' }
        ]
      }
    ]
}