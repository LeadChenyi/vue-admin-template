<template>
    <div
        class="alike-uploader"
        :class="[file ? 'alike-uploader--active' : 'alike-uploader--default']"
        @click="chooseFile"
        v-drag-upload
    >
        <template v-if="file">
            <div class="alike-uploader__preview" v-if="previewType === 'image'">
                <img class="alike-uploader__preview-image" :src="file" />
                <div class="alike-uploader__preview-mask">
                    <span
                        class="alike-uploader__preview-icon"
                        @click.stop="deleteFile"
                        >删除图片</span
                    >
                </div>
            </div>
            <div class="alike-uploader__preview" v-else>
                <div>文件已上传</div>
                <div class="alike-uploader__preview-mask">
                    <span
                        class="alike-uploader__preview-icon"
                        @click.stop="deleteFile"
                        >删除文件</span
                    >
                </div>
            </div>
        </template>
        <span v-else>+</span>

        <input
            class="alike-uploader__input"
            ref="uploaderFinder"
            type="file"
            :accept="types.join(',')"
            @change="changeFile"
        />
    </div>
</template>

<script>
/**
 * alive-uploader
 * @property file {String} 图片地址
 * @property enableDrag {Boolean} 是否启用拖动上传文件
 * @property autoVerify {Boolean} 是否开启文件自动验证
 * @property size {Boolean} 支持上传文件的大小
 * @property types {Array} 支持上传文件的格式
 * @event change {Function} 上传图片时触发
 * @event delete {Function} 删除图片时触发
 * @event fail {Function} 验证失败时触发
 * @event success {Function} 验证成功时触发
 */

export default {
    name: "alike-uploader",
    props: {
        file: {
            type: String,
            default: "",
        },
        enableDrag: {
            type: Boolean,
            default: false,
        },
        autoVerify: {
            type: Boolean,
            default: true,
        },
        size: {
            type: Number,
            default: 2097152,
        },
        types: {
            type: Array,
            default: () => [
                "image/png",
                "image/jpg",
                "image/jpeg",
                "image/gif",
            ],
        },
        previewType: {
            type: String,
            default: "image",
        },
    },
    methods: {
        chooseFile() {
            // 是否已经有上传的文件
            if (this.file || this.$refs.uploaderFinder.value) {
                return false;
            }

            this.$refs.uploaderFinder.click();
        },
        changeFile(e) {
            let file = e.target.files[0];
            let tempFilePath = window.URL.createObjectURL(file);

            this.$emit("change", { file, tempFilePath });
            if (this.autoVerify) {
                this.verifyFile({ file, tempFilePath });
            }
        },
        verifyFile({ file, tempFilePath }) {
            if (file.size > this.size) {
                this.$emit("fail", {
                    msg: `图片上传大小不得超过${this.size}字节`,
                });
                return false;
            }

            if (!this.types.includes(file.type)) {
                this.$emit("fail", {
                    msg: `图片类型仅支持${this.types.join(",")}`,
                });
                return false;
            }

            this.$emit("success", { file, tempFilePath });
        },
        deleteFile() {
            // 解决单文件上传模式被删除后无法再次触发上传控件的问题
            if (this.$refs.uploaderFinder.value) {
                this.$refs.uploaderFinder.value = null;
            }

            this.$emit("delete");
        },
    },
    directives: {
        dragUpload(el, binding, vnode) {
            // 获取当前组件上下文对象
            const vm = vnode.context;
            if (!vm.enableDrag) {
                return false;
            }

            // 指定元素监听拖拽事件
            el.ondragenter = function (e) {
                e.preventDefault();
                e.stopPropagation();
            };
            el.ondragover = function (e) {
                e.preventDefault();
                e.stopPropagation();
            };
            el.ondragleave = function (e) {
                e.preventDefault();
                e.stopPropagation();
            };
            el.ondrop = function (e) {
                e.preventDefault();
                e.stopPropagation();
                vm.verifyFile(e.dataTransfer.files[0]);
            };
        },
    },
};
</script>

<style lang="scss" scoped>
.alike-uploader {
    position: relative;
    overflow: hidden;
    width: 178px;
    height: 178px;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    color: #8c939d;
    text-align: center;
    font-size: 28px;
    line-height: 178px;
    cursor: pointer;
}
.alike-uploader--default:hover {
    border-color: #345fd3;
}
.alike-uploader--active {
    cursor: auto;
}
.alike-uploader__preview {
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: 6px;
}
.alike-uploader__preview-image {
    width: 100%;
    height: 100%;
    border-radius: 6px;
}
.alike-uploader__preview-mask {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.7);
    opacity: 0;
    transition: opacity 0.5s ease;
}
.alike-uploader__preview:hover .alike-uploader__preview-mask {
    opacity: 1;
}
.alike-uploader__preview-icon {
    cursor: pointer;
}
.alike-uploader__input {
    display: none;
}
</style>