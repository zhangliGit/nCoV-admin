const unReport = {
  credits: {
    enabled: false, // 禁用版权信息
  },
  title: {
    text: '',
    style: {
      color: '#fff',
    },
  },
  yAxis: {
    gridLineColor: '#999',
    gridLineDashStyle: 'longdash',
    splitLine: {
      show: true,
    },
    labels: {
      style: {
        color: '#fff',
      },
    },
    title: {
      text: '人数',
      style: {
        color: '#fff',
      },
    },
  },
  chart: {
    backgroundColor: null,
    type: 'areaspline',
  },
  plotOptions: {
    areaspline: {
      dataLabels: {
        enabled: true,
        color: '#fff',
      },
    },
  },
  xAxis: {
    labels: {
      style: {
        color: '#fff',
      },
    },
    splitLine: {
      show: true,
    },
    categories: ['0305', '0306', '0307', '0308', '0309', '0310', '0311', '0312'],
    crosshair: true,
  },
  series: [
    {
      name: '已上报',
      color: 'rgb(0, 186, 255)',
      data: [1000, 1400, 1500, 1800, 1200, 1000, 900, 1200],
    },
    {
      name: '未上报',
      color: '#fff',
      data: [1000, 600, 300, 200, 800, 100, 1100, 800],
    },
  ],
  legend: {
    align: 'right',
    verticalAlign: 'top',
    borderColor: '#fff',
    y: 0,
    itemStyle: {
      color: '#fff',
    },
  },
  responsive: {
    rules: [
      {
        condition: {
          maxWidth: 500,
        },
        chartOptions: {
          legend: {
            layout: 'horizontal',
            align: 'center',
            verticalAlign: 'bottom',
          },
        },
      },
    ],
  },
}

export default unReport
