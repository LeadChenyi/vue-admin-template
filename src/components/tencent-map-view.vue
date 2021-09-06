<template>
    <div :ref="id" class="tencent-map-view" :style="{width:width,height:height}"></div>
</template>

<script>
/**
 * 腾讯地图示例：https://lbs.qq.com/webApi/javascriptV2/jsDemo
 */
export default {
    name:"tencentMapView",
    props:{
        id:{
            type:String,
            default:"tencentMapFinder"
        },
        width:{
            type:String,
            default:"600px"
        },
        height:{
            type:String,
            default:"300px"
        },
        lat:{// 纬度
            type:Number,
            default:39.916527
        },        
        lng:{// 经度
            type:Number,
            default:116.397128
        },        
        zoom:{// 地图缩放级别
            type:Number,
            default:13
        }
    },
    data(){
        return {
            tencentMap:null
        }
    },
    created(){
        this.asyncLoadMap();
    },
    methods:{
        asyncLoadMap(){
            // 首次访问地图等待脚本执行callback后调用，之后访问即可直接调用，通过获取脚本所绑定id值作为条件判断，如果存在则证明脚本已经运行中。
            window.initQQMap = ()=>{
                this.tencentMap = new window.qq.maps.Map(this.$refs[this.id],{
                    center: new window.qq.maps.LatLng(this.lat,this.lng),
                    zoom: this.zoom
                });
                // 地图实例化完成时触发
                this.$emit('ready',this.tencentMap);

                // 鼠标点击时触发
                window.qq.maps.event.addListener(this.tencentMap,'click',(event)=>{
                    this.$emit('click',event);
                });

                // 鼠标移动时触发
                window.qq.maps.event.addListener(this.tencentMap,'mousemove',(event)=>{
                    this.$emit('mousemove',event);
                });

                // 地图缩放时触发
                window.qq.maps.event.addListener(this.tencentMap,'zoom_changed',()=>{
                    this.$emit('changezoom',{zoom:this.tencentMap.getZoom()});
                });
            }

            let uniqueId = document.getElementById("tencentMapId");
            if(!uniqueId){
                let script = document.createElement("script");
                script.type = "text/javascript";
                script.src = "https://map.qq.com/api/js?v=2.exp&key=QKNBZ-WJM6U-CY7VI-4MP3W-DZWSE-TLFHD&callback=initQQMap";
                script.id = "tencentMapId";
                document.head.appendChild(script);
            }else{
                window.initQQMap();
            }
        }
    }
}
</script>

<style>

</style>