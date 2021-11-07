<template>
    <div class="alike-container">
        <el-row :gutter="20">
            <el-col :span="24">
                <el-card>
                    <div slot="header">picture cropper</div>
                    <vue-cropper
                        style="height: 500px"
                        ref="cropperFinder"
                        :img="cropperOptions.img"
                        :outputSize="cropperOptions.outputSize"
                        :outputType="cropperOptions.outputType"
                        :autoCrop="true"
                        @realTime="inputCropper"
                    ></vue-cropper>
                </el-card>
            </el-col>
            <el-col :span="24" v-if="preview">
                <el-card>
                    <p>裁剪预览：常规比例</p>
                    <div :style="previewStyle1">
                        <div :style="preview.div">
                            <img :src="preview.url" :style="preview.img" />
                        </div>
                    </div>
                    <p>裁剪预览：缩小两倍</p>
                    <div :style="previewStyle2">
                        <div :style="preview.div">
                            <img :src="preview.url" :style="preview.img" />
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { VueCropper } from "vue-cropper";

export default {
    name: "Cropper",
    components: {
        VueCropper,
    },
    data() {
        return {
            cropperOptions: {
                img: "http://source.webyi.top/webyi_app_1636045464406.jpg",
                outputSize: 1,
                outputType: "jpeg",
            },
            preview: null,
            previewStyle1: null,
            previewStyle2: null,
        };
    },
    methods: {
        inputCropper(data) {
            console.log("cropper realTime", data);
            this.preview = data;

            this.previewStyle1 = {
                width: this.preview.w + "px",
                height: this.preview.h + "px",
                overflow: "hidden",
                margin: "0",
            };

            this.previewStyle2 = {
                width: this.preview.w + "px",
                height: this.preview.h + "px",
                overflow: "hidden",
                margin: "0",
                zoom: 0.5,
            };
        },
        getCropper() {
            this.$refs.cropperFinder.getCropBlob((data) => {
                // do something
                console.log(data);
            });
        },
    },
};
</script>

<style>
</style>