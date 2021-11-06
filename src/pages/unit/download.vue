<template>
    <div class="alike-container">
        <el-row :gutter="20">
            <el-col :span="24">
                <el-card>
                    <div slot="header">二进制文件流下载</div>
                    <div>
                        <el-button
                            type="primary"
                            @click="
                                download(
                                    'http://source.webyi.top/webyi_app_1636045464406.jpg'
                                )
                            "
                            >下载图片1-哪吒</el-button
                        >
                        <el-button
                            type="primary"
                            @click="
                                download(
                                    'http://source.webyi.top/webyi_app_1636085521644.jpg'
                                )
                            "
                            >下载图片2-敖丙</el-button
                        >
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import mime from "mime";
export default {
    name: "Download",
    methods: {
        download(url) {
            this.$downloadFile({
                url,
            })
                .then((res) => {
                    // 文件地址
                    const fileURL = new URL(url);
                    const fileName = fileURL.pathname.split("/")[1];
                    const mimeExtension = fileURL.pathname.split(".")[1];
                    const mimeType = mime.getType(mimeExtension);

                    // 文件流
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
    },
};
</script>

<style>
</style>