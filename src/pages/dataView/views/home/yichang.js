const yichang = {
  credits: {
    enabled: false, // 禁用版权信息
  },
  chart: {
    showAxes: true,
    borderColor: '#fff',
    plotBorderColor: '#fff',
    backgroundColor: null,
    type: 'column',
  },
  title: {
    text: '',
    style: {
      color: '#fff',
    },
  },
  legend: {
    align: 'right',
    verticalAlign: 'top',
    borderColor: '#fff',
    y: 0,
    itemStyle: {
      color: '#fff',
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
    gridLineColor: 'red',
    categories: ['0301', '0302', '0304', '0305', '0306', '0307', '0308', '0309', '0310', '0311', '0312'],
    crosshair: true,
  },
  yAxis: {
    gridLineColor: '#eee',
    gridLineDashStyle: 'longdash',
    splitLine: {
      show: true,
    },
    min: 0,
    labels: {
      style: {
        color: '#fff',
      },
    },
    title: {
      text: '数量 (人)',
      style: {
        color: '#fff',
      },
    },
  },
  tooltip: {
    // head + 每个 point + footer 拼接成完整的 table
    headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
    pointFormat:
      '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
      '<td style="padding:0"><b>{point.y:.1f} 人</b></td></tr>',
    footerFormat: '</table>',
    shared: true,
    useHTML: true,
  },
  plotOptions: {
    column: {
      dataLabels: {
        enabled: true,
        color: '#fff',
      },
      borderWidth: 2,
    },
  },
  series: [
    {
      name: '学生',
      color: 'rgb(0, 186, 255)',
      data: [49, 271, 206, 129, 244, 176, 135, 148, 216, 194, 305],
    },
    {
      name: '教职工',
      color: '#fff',
      data: [83, 178, 98, 193, 106, 184, 105, 104, 191, 183, 106],
    },
  ],
}

export default yichang
