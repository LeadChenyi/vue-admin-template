<template>
    <div class="alike-container">
        <el-col :span="24">
            <el-card>
                <div slot="header">Tencent Map</div>
                <tencent-map-view
                    :zoom="zoom"
                    @ready="readyMap"
                    @click="clickMap"
                    @mousemove="mousemoveMap"
                ></tencent-map-view>
                <div class="mt-20">
                    <el-button @click="plusZoom">放大地图</el-button>
                    <el-button @click="reduceZoom">缩小地图</el-button>
                </div>
            </el-card>
        </el-col>
    </div>
</template>

<script>
import TencentMapView from "@/components/tencent-map-view";
export default {
    name: "Map",
    components: {
        TencentMapView,
    },
    data() {
        return {
            map: null,
            zoom: 9,
        };
    },
    methods: {
        readyMap(tencentMap) {
            console.log("ready map", tencentMap);
            this.map = tencentMap;
            console.log("地图中心坐标", this.map.getCenter());
        },
        clickMap(e) {
            console.log("click map", e);
            console.log("纬度：", e.latLng.getLat());
            console.log("经度：", e.latLng.getLng());
        },
        mousemoveMap(e) {
            console.log("mousemove map", e);
            console.log("纬度：", e.latLng.getLat());
            console.log("经度：", e.latLng.getLng());
        },
        plusZoom() {
            // 最大17
            this.map.zoomTo(this.map.getZoom() + 1);
        },
        reduceZoom() {
            this.map.zoomTo(this.map.getZoom() - 1);
        },
    },
};
</script>

<style>
</style>