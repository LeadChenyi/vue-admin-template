<template>
    <div :ref="id" class="echart-view" :style="{width:width,height:height}"></div>
</template>

<script>
/**
 * 示例：https://echarts.apache.org/examples/zh/index.html
 * API：https://echarts.apache.org/zh/api.html#action
 * 配置项：https://echarts.apache.org/zh/option.html
 */
import Echarts from 'echarts'
export default {
    name: 'EchartView',
    props:{
        id:{
            type:String,
            default:"echartFinder"
        },
        width:{
            type:String,
            default:"600px"
        },
        height:{
            type:String,
            default:"300px"
        },
        name:{
            type:String,
            default:""
        },        
        type:{
            type:String,
            default:""
        },
        radius:{
            type:Array,
            default:()=>[]
        },        
        value:{
            type:Array,
            default:()=>[]
        },
        color:{
            type:Array,
            default:()=>[]
        }
    },
    data(){
        return {
            echart:null,
            echartOptions:{
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b}: {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    x: 'left',
                    data:[]
                },
                series: [
                    {
                        name:"饼图",
                        type:"pie",
                        radius: ['50%', '70%'],
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: false,
                                position: 'center'
                            },
                            emphasis: {
                                show: true,
                                textStyle: {
                                    fontSize: '30',
                                    fontWeight: 'bold'
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data:[]
                    }
                ],
                color:[]
            }
        }
    },
    mounted(){
        this.echart = Echarts.init(this.$refs[this.id]);
        this.initData();
    },
    methods:{
        initData(){
            let tempNames = []
            this.value.forEach((item)=>{
                tempNames.push(item.name);
            })

            this.echartOptions.legend.data = tempNames;
            this.echartOptions.series[0].data = this.value;
            
            if(this.name){
                this.echartOptions.series[0].name = this.name;
            }            
            if(this.type){
                this.echartOptions.series[0].type = this.type;
            }
            if(this.radius.length){
                this.echartOptions.series[0].radius = this.radius;
            }            
            if(this.color){
                this.echartOptions.color = this.color;
            }

            this.$nextTick(()=>{
                this.echart.setOption(this.echartOptions);
            })
        },
        update(){
            this.initData();
        }
    }
}
</script>

<style>

</style>