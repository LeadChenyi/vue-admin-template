<template>
    <div class="alike-container">
        <el-row :gutter="20">
            <el-col :span="12">
                <el-card>
                    <div slot="header">二进制文件流 + a标签下载</div>
                    <div>
                        <el-button
                            type="primary"
                            @click="
                                aDownload(
                                    'http://source.webyi.top/webyi_app_1636045464406.jpg'
                                )
                            "
                            >下载图片1-哪吒</el-button
                        >
                        <el-button
                            type="primary"
                            @click="
                                aDownload(
                                    'http://source.webyi.top/webyi_app_1636085521644.jpg'
                                )
                            "
                            >下载图片2-敖丙</el-button
                        >
                    </div>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card>
                    <div slot="header">网络资源地址 + file-saver下载</div>
                    <div>
                        <el-button
                            type="primary"
                            @click="
                                fileSave(
                                    'http://source.webyi.top/webyi_app_1636045464406.jpg'
                                )
                            "
                            >下载图片1-哪吒</el-button
                        >
                        <el-button
                            type="primary"
                            @click="
                                fileSave(
                                    'http://source.webyi.top/webyi_app_1636085521644.jpg'
                                )
                            "
                            >下载图片2-敖丙</el-button
                        >
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <el-row>
            <el-card>
                <div slot="header">zip + file-saver下载</div>
                <div>
                    <el-button type="primary" @click="textZipSave"
                        >文本压缩包下载</el-button
                    >
                </div>
            </el-card>
        </el-row>
    </div>
</template>

<script>
import mime from "mime";
import { saveAs } from "file-saver";
import JSZip from "jszip";
export default {
    name: "Download",
    methods: {
        aDownload(file) {
            this.$downloadFile({
                data: {
                    file,
                },
            })
                .then((res) => {
                    // 文件地址
                    const fileURL = new URL(file);
                    const fileName = fileURL.pathname.split("/")[1];
                    const mimeExtension = fileURL.pathname.split(".")[1];
                    const mimeType = mime.getType(mimeExtension);

                    // 文件流 （等价于 {responseType:"blob"}）
                    const bufObj = Buffer.from(res.data, "binary");
                    const blob = new Blob([bufObj], { type: mimeType });
                    const blobURL = URL.createObjectURL(blob);

                    // 下载文件
                    let a = document.createElement("a");
                    a.href = blobURL;
                    a.download = fileName;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        aDownloadTwo(file) {
            // 当响应类型设为blob时返回的数据结构只能有文件流数据，否则整体的数据结构都会被包含在Blob对象中。例：{"code":200,"statusCode":200,"msg":"download:ok","message":"下载成功","data":"\u0000\u0001\u0001..."}
            this.$downloadFile({
                data: {
                    file,
                },
                responseType: "blob",
            })
                .then((res) => {
                    const blobURL = URL.createObjectURL(res);
                    console.log(blobURL);
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        fileSave(url) {
            const fileURL = new URL(url);
            const fileName = fileURL.pathname.split("/")[1];
            saveAs(url, fileName);
        },
        textZipSave() {
            const zip = new JSZip();
            let text = zip.folder("text");
            text.file("Hello.txt", "Hello World\n");
            zip.generateAsync({ type: "blob" }).then(function (content) {
                saveAs(content, "text.zip");
            });
        },
    },
};
</script>

<style>
</style>