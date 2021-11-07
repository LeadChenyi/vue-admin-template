<template>
    <div class="alive-container">
        <el-row :gutter="20">
            <el-col :span="12">
                <el-card>
                    <div slot="header">canvas render</div>
                    <canvas ref="canvasFinder"></canvas>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card>
                    <div slot="header">url image render</div>
                    <img :src="image" />
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import QRCode from "qrcode";
export default {
    name: "QRCode",
    data() {
        return {
            image: "",
        };
    },
    mounted() {
        this.sendCanvasRender();
        this.sendURLRender();
    },
    methods: {
        sendCanvasRender() {
            let options = {
                margin: 3,
                width: 200,
            };
            QRCode.toCanvas(
                this.$refs.canvasFinder,
                "http://www.webyi.top",
                options,
                function (err) {
                    if (err) throw err;
                }
            );
        },
        sendURLRender() {
            let options = {
                errorCorrectionLevel: "H",
                type: "image/jpeg",
                quality: 0.3,
                margin: 3,
                width: 200,
                color: {
                    dark: "#010599FF",
                    light: "#FFBF60FF",
                },
            };
            QRCode.toDataURL("http://www.webyi.top", options, (err, url) => {
                if (err) throw err;
                this.image = url;
            });
        },
    },
};
</script>

<style>
</style>