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
        download(file) {
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
        downloadTwo(file) {
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
    },
};
</script>

<style>
</style>