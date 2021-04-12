const app = getApp();
var rate = 0;
var doubleLineCanvasWidth = 0;
var doubleLineCanvasHeight = 0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    doubleLineCanvasData: {
      canvasId: 'doubleLine',
    },
    doubleLineTitle: "近五次答题情况",
    doubleLineUnit: [
      { color: "#13CE66", title: "分数" },
      { color: "#FFA848", title: "用时" }
    ],
  },


  onLoad: function (options) {
    // console.log(app.systemInfo);
    var systemInfo = app.systemInfo;
    rate = systemInfo.screenWidth / 750;
    var updateData = {};
    //双折线图配置参数
    doubleLineCanvasWidth = systemInfo.screenWidth - rate * 64;
    doubleLineCanvasHeight = rate * 600 + rate * 20 + rate * 32 + rate * 24; //轴高+内外边距+字体大小
    var doubleLineYMax = 0;
    var doubleLineYMin = 0;
    var doubleLineXMax = 0;
    var doubleLineXMin = 0;
    updateData['doubleLineCanvasData.canvasWidth'] = doubleLineCanvasWidth;
    updateData['doubleLineCanvasData.axisPadd'] = { left: rate * 10, top: rate * 20, right: rate * 10 };
    updateData['doubleLineCanvasData.axisMargin'] = { bottom: rate * 32, left: rate * 20, right: rate * 20 };
    updateData['doubleLineCanvasData.yAxis.fontSize'] = rate * 22;
    updateData['doubleLineCanvasData.yAxis.fontColor'] = '#637280';
    updateData['doubleLineCanvasData.yAxis.lineColor'] = '#DCE0E6';
    updateData['doubleLineCanvasData.yAxis.lineWidth'] = rate * 2;
    updateData['doubleLineCanvasData.yAxis.dataWidth'] = rate * 68;
    updateData['doubleLineCanvasData.yAxis.isShow'] = true;
    updateData['doubleLineCanvasData.yAxis.isDash'] =false;
    updateData['doubleLineCanvasData.yAxis.minData'] = doubleLineYMin;
    updateData['doubleLineCanvasData.yAxis.maxData'] = doubleLineYMax;
    updateData['doubleLineCanvasData.yAxis.padd'] = rate * 600 / (doubleLineYMax - doubleLineYMin);

    updateData['doubleLineCanvasData.xAxis.dataHeight'] = rate * 26;
    updateData['doubleLineCanvasData.xAxis.fontSize'] = rate * 24;
    updateData['doubleLineCanvasData.xAxis.fontColor'] = '#637280';
    updateData['doubleLineCanvasData.xAxis.lineColor'] = '#DCE0E6';
    updateData['doubleLineCanvasData.xAxis.lineWidth'] = rate * 2;
    updateData['doubleLineCanvasData.xAxis.minData'] = doubleLineXMin;
    updateData['doubleLineCanvasData.xAxis.maxData'] = doubleLineXMax;
    updateData['doubleLineCanvasData.xAxis.padd'] = (doubleLineCanvasWidth - rate * (10 + 10 + 20 + 20 + 68 + 68)) / (doubleLineXMax - doubleLineXMin); //画布宽度减去内外边距

    updateData['doubleLineCanvasData.canvasHeight'] = doubleLineCanvasHeight;
    updateData['doubleLineCanvasData.touchDetail.width'] = rate * 144;
    updateData['doubleLineCanvasData.touchDetail.height'] = rate * 149;
    updateData['doubleLineCanvasData.touchDetail.fontSize'] = rate * 20;
    updateData['doubleLineCanvasData.touchDetail.fontColor'] = '#ffffff';
    updateData['doubleLineCanvasData.touchDetail.padd'] = rate * 12;
    updateData['doubleLineCanvasData.touchDetail.bgColor'] = "#637280";
    updateData['doubleLineCanvasData.touchDetail.lineSpacingExtra'] = rate * 12;


    let doubleLineRightYAxisData = [];
    let doubleLineRightYMax = 0;
    let doubleLineRightYMin = 0;
    let lineDoubleRatio = 1;

    let doubleLineSeries = {
      data: [{
        data: [
          { x: 0, y: 60, title: "最近5次|分数：60|用时:220s" },
          { x: 1, y: 70, title: "最近4次|分数：70|用时:230s"  },
          { x: 2, y: 85, title: "最近3次|分数：85|用时:400s"   },
          { x: 3, y: 85, title: "最近2次|分数：85|用时:180s"  },
          { x: 4, y: 100, title: "最近1次|分数：100|用时:170s" },
       
        ],

        lineColor: "#13CE66",
        point: {
          size: rate * 10,
          bColor: '#13CE66',
          sClor: '#fff111',
          isShow: true
        }
      }, {
        data: [
          { x: 0, y: 220 / 6, title: "" },
          { x: 1, y: 230 / 6, title: "" },
          { x: 2, y: 400 / 6, title: "" },
          { x: 3, y: 180 /6, title: "" },
          { x: 4, y: 170/ 6, title: "" },
        
        ],
        lineColor: "#FFA848",
        point: {
          size: rate * 10,
          bColor: '#FFA848',
          sClor: '#ffffff',
          isShow: true
        }
      }]
    };
    let doubleLineXAxisData = [
      { x: 0, y: 0, title: "1" },
      { x: 1, y: 0, title: "2" },
      { x: 2, y: 0, title: "3" },
      { x: 3, y: 0, title: "4" },
      { x: 4, y: 0, title: "5" },
     
    ];
    let doubleLineYAxisData = [];
    doubleLineYMax = 100;
    doubleLineXMax = 4;
    doubleLineYMax = 100;
    doubleLineYAxisData = this.getYAxiss(doubleLineYMax);
  

    doubleLineRightYMax = this.getYMax(6.0 * 100);
    lineDoubleRatio = doubleLineYMax / doubleLineRightYMax;
    doubleLineRightYAxisData = this.getRightYAxiss(doubleLineRightYMax, lineDoubleRatio);

    updateData['doubleLineCanvasData.xAxis.minData'] = doubleLineXMin;
    updateData['doubleLineCanvasData.xAxis.maxData'] = doubleLineXMax;
    updateData['doubleLineCanvasData.xAxis.padd'] = (doubleLineCanvasWidth - rate * (10 + 10 + 20 + 20 + 68 + 68)) / (doubleLineXMax - doubleLineXMin); //画布宽度减去内外边距
    updateData['doubleLineCanvasData.yAxis.minData'] = doubleLineYMin;
    updateData['doubleLineCanvasData.yAxis.maxData'] = doubleLineYMax;
    updateData['doubleLineCanvasData.yAxis.padd'] = rate * 600 / (doubleLineYMax - doubleLineYMin);
    updateData['doubleLineCanvasData.series'] = doubleLineSeries;
    updateData['doubleLineCanvasData.xAxis.data'] = doubleLineXAxisData;
    updateData['doubleLineCanvasData.yAxis.data'] = doubleLineYAxisData;
    updateData['doubleLineCanvasData.yAxis.rightData'] = doubleLineRightYAxisData;

    this.setData(updateData);
  },




  getYMax: function (yMax) {
    return 600
    console.log(yMax);
    let maxInt = Math.floor(yMax);
    let maxLength = maxInt.toString().length;
    let interval = 0;
    if (maxInt == 0) {
      interval = 5 * Math.pow(10, 1);
    } else {
      if (maxLength > 3) {
        interval = 5 * Math.pow(10, maxLength - 2);
      } else {
        interval = yMax / 5;
      }
    }

    let remainder = maxInt % interval;
    let conversionMax = ((maxInt - remainder) / interval + 1) * interval;
  console.log(conversionMax);
    return conversionMax;
  },

  /**
   * 获得y轴数组
   * @param  {[type]} yMax y轴最大值
   * @return {[type]}      [description]
   */
  getYAxiss: function (yMax) {
    let yAxisData = [];

    let avg = yMax / 5;

    let point = {};
    point.x = 0;
    point.y = 0;
    point.title = '0'
    yAxisData.push(point);

    let point1 = {};
    point1.x = 0;
    point1.y = Math.floor(avg);
    point1.title = Math.floor(avg);
    yAxisData.push(point1);

    let point2 = {};
    point2.x = 0;
    point2.y = Math.floor(avg) * 2;;
    point2.title = Math.floor(avg) * 2;
    yAxisData.push(point2);

    let point3 = {};
    point3.x = 0;
    point3.y = Math.floor(avg) * 3;
    point3.title = Math.floor(avg) * 3;
    yAxisData.push(point3);


    let point4 = {};
    point4.x = 0;
    point4.y = Math.floor(avg) * 4;
    point4.title = Math.floor(avg) * 4;
    yAxisData.push(point4);
    let point5 = {};
    point5.x = 0;
    point5.y = Math.floor(avg) * 5;
    point5.title = Math.floor(avg) * 5;
    yAxisData.push(point5);
    return yAxisData;
  },

  /**
   * 获得y轴数组
   * @param  {[type]} yMax y轴最大值
   * @return {[type]}      [description]
   */
  getRightYAxiss: function (yMax, ratio) {
    let yAxisData = [];

    let avg = yMax / 5;

    let point = {};
    point.x = 0;
    point.y = 0 * ratio;
    point.title = '0'
    yAxisData.push(point);

    let point1 = {};
    point1.x = 0;
    point1.y = Math.floor(avg) * ratio;
    point1.title = Math.floor(avg);
    yAxisData.push(point1);

    let point2 = {};
    point2.x = 0;
    point2.y = Math.floor(avg) * 2 * ratio;;
    point2.title = Math.floor(avg) * 2 ;
    yAxisData.push(point2);

    let point3 = {};
    point3.x = 0;
    point3.y = Math.floor(avg) * 3 * ratio;
    point3.title = Math.floor(avg) * 3 ;
    yAxisData.push(point3);

    let point4 = {};
    point4.x = 0;
    point4.y = Math.floor(avg) *4 * ratio;
    point4.title = Math.floor(avg) * 4 ;
    yAxisData.push(point4);

    let point5 = {};
    point5.x = 0;
    point5.y = Math.floor(avg) * 5 * ratio;
    point5.title = Math.floor(avg) * 5  ;
    yAxisData.push(point5);
    return yAxisData;
  }
})