<template>
    <div :class="classPrefix">
        <div ref = 'myEchart' :class="classPrefix+'_chart'"></div>
    </div>
</template>
 
<script type="text/babel">
import echarts from 'echarts'
export default {
    data() {
        return {
            classPrefix: "qst-tecs-src-teacher-dean-areaChart_",
        }
    },
    props: {
        // 横坐标的天数
        xNumber: {
            type: [Number,Array],
            default:[],
        },
        // 纵坐标提交次数
        yNumber: {
            type: [Number,Array],
            default:[],
        },
        //  阴影部分的颜色
        bgColor: {
            type: String,
            default: '',
        },
        // 图表类型
        Type: {
            type: String,
            default: '',
        }
    },
    methods: {
        // 图表初始化数据
        initChart(){
            let myChart = echarts.init(this.$refs.myEchart);
            let yNumber = this.yNumber;
            myChart.setOption({
                tooltip: {
                    trigger: 'axis',
                    formatter: "{b} </br> 次数：{c}次",
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: this.xNumber,
                    name: '日期',
                    show: false
                },
                yAxis: {
                    type: 'value',
                    splitLine: {
                        show: false
                    },
                    show: false
                },
                series: [{
                    type: this.Type,
                    data: yNumber,
                    smooth: true,
                    // 线的颜色
                    lineStyle: {
                        normal: {
                            color: this.bgColor,
                        }
                    },
                    // 线上圆圈的颜色
                    itemStyle: {
                        normal: {
                            color: this.bgColor,
                        }
                    },
                    // 阴影面积的颜色
                    areaStyle: {
                        normal: {
                            color: this.bgColor,
                        }
                    },
                }],
                //边距
                grid: {
                    left: '0%',
                    right: '6%',
                    bottom: '0%',
                    top: '0%',
                    containLabel: true
                },
            });
            //图表自适应
            window.addEventListener('resize', function () {
                myChart.resize()
            });
        },
    },
    mounted () {
        let obj = this.$refs.myEchart;
        if(obj){
            this.initChart();
        }
    }
}
</script>
 
<style lang="scss" type="text/scss" rel="stylesheet/scss" scoped>
.qst-tecs-src-teacher-dean-areaChart_ {
    &_chart{
        height:100px;
        width:100%;
        margin: 0 auto;
        padding-top: 0px;
        box-sizing: border-box;
    }
    .qst-tecs-src-teacher-dean-areaChart__chart {
        height: 100px;
        padding-top: 0px;
    }
}
</style>