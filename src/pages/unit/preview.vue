<template>
    <div class="alike-container">
        <el-row class="mt-20" :gutter="20">
            <el-col :span="12">
                <el-card>
                    <div slot="header">单文件上传</div>
                    <uploader
                        :file="avatar"
                        @success="successAvatar"
                        @delete="deleteAvatar"
                    ></uploader>
                </el-card>
            </el-col>
        </el-row>
        <el-row class="mt-20" :gutter="20">
            <el-col :span="24">
                <el-card>
                    <div slot="header">单文件上传 + vue-pdf 插件预览</div>
                    <uploader
                        previewType="pdf"
                        :types="['appliction/pdf']"
                        :file="pdf"
                        @success="successPDF"
                        @delete="deletePDF"
                    ></uploader>
                    <div v-if="numPages">
                        <vue-pdf
                            :src="sourcePdf"
                            v-for="item in numPages"
                            :key="item"
                            :page="item"
                        ></vue-pdf>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import Uploader from "@/components/uploader.vue";
import VuePdf from "vue-pdf";
export default {
    name: "Preview",
    components: {
        Uploader,
        VuePdf,
    },
    data() {
        return {
            avatar: "",
            pdf: "",
            sourcePdf: null,
            numPages: null,
        };
    },
    methods: {
        successAvatar({ filePath }) {
            this.avatar = filePath;
        },
        deleteAvatar() {
            this.avatar = "";
        },
        successPDF({ filePath }) {
            this.pdf = filePath;
            this.sourcePdf = VuePdf.createLoadingTask(this.pdf);
            this.sourcePdf.promise.then((pdf) => {
                this.numPages = pdf.numPages;
            });
        },
        deletePDF() {
            this.pdf = "";
            this.sourcePdf = null;
            this.numPages = null;
        },
    },
};
</script>

<style>
</style>