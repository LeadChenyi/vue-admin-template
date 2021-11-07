<template>
    <div class="alike-container">
        <el-row :gutter="20">
            <el-col :span="12">
                <el-card>
                    <div slot="header">单图上传</div>
                    <uploader
                        :file="avatar"
                        @change="changeAvatar"
                        @delete="deleteAvatar"
                    ></uploader>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card>
                    <div slot="header">多图上传</div>
                    <uploaders
                        :files="albums"
                        @change="changeAlbums"
                        @delete="deleteAlbums"
                    ></uploaders>
                </el-card>
            </el-col>
        </el-row>
        <el-row class="mt-20" :gutter="20">
            <el-col :span="12">
                <el-card>
                    <div slot="header">单文件上传 + vue-pdf 插件预览</div>
                    <uploader
                        previewType="pdf"
                        :types="['application/pdf']"
                        :file="pdf"
                        @change="changePDF"
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
            <el-col :span="12">
                <el-card>
                    <div slot="header">多文件上传</div>
                    <uploaders
                        previewType="list"
                        :files="files"
                        @change="changeFiles"
                        @delete="deleteFiles"
                    ></uploaders>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import Uploader from "@/components/uploader.vue";
import Uploaders from "@/components/uploaders.vue";
import VuePdf from "vue-pdf";
export default {
    name: "Upload",
    components: {
        Uploader,
        Uploaders,
        VuePdf,
    },
    data() {
        return {
            avatar: "",
            albums: [],
            pdf: "",
            sourcePdf: null,
            numPages: null,
            files: [],
        };
    },
    methods: {
        changeAvatar({ tempFilePath }) {
            this.avatar = tempFilePath;
        },
        deleteAvatar() {
            this.avatar = "";
        },
        changeAlbums({ tempFilePaths }) {
            this.albums = [...this.albums, ...tempFilePaths];
        },
        deleteAlbums(index) {
            this.albums.splice(index, 1);
        },
        changePDF({ tempFilePath }) {
            this.pdf = tempFilePath;
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
        changeFiles({ files, tempFilePaths }) {
            for (let i = 0; i < files.length; i++) {
                this.files.push({
                    name: files[i].name,
                    url: tempFilePaths[i],
                });
            }
        },
        deleteFiles(index) {
            this.files.splice(index, 1);
        },
    },
};
</script>

<style>
</style>