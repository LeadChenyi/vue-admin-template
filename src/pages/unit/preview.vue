<template>
    <div class="alike-container">
        <el-row :gutter="20">
            <el-col :span="24">
                <el-card>
                    <div slot="header">vue-pfd</div>
                    <uploader
                        :autoVerify="false"
                        :types="['appliction/pdf']"
                        :file="filePath"
                        @success="successPDF"
                    ></uploader>
                    <div v-if="numPages">
                        <vue-pdf
                            :src="file"
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
            file: null,
            numPages: null,
            filePath: "",
        };
    },
    methods: {
        successPDF({ filePath }) {
            this.filePath = filePath;
            this.file = VuePdf.createLoadingTask(filePath);
            this.file.promise.then((pdf) => {
                this.numPages = pdf.numPages;
            });
        },
    },
};
</script>

<style>
</style>