<template>
    <div class="alike-uploaders">
        <template v-if="files.length">
            <template v-if="previewType === 'image'">
                <div
                    class="alike-preview-image-item"
                    v-for="(item, index) in files"
                    :key="index"
                >
                    <img
                        class="alike-preview-image-item__image"
                        :src="item.url || item"
                    />
                    <span
                        class="alike-preview-image-item__delete"
                        @click="deleteFiles(item.id || index)"
                        >删除图片</span
                    >
                </div>
            </template>

            <div
                class="alike-preview alike-preview-list"
                v-else-if="previewType === 'list'"
            >
                <div
                    class="alike-preview-list__item"
                    v-for="(item, index) in files"
                    :key="index"
                >
                    <span>{{ item.name }}</span>
                    <span
                        class="alike-preview-list__delete"
                        @click="deleteFiles(item.id || index)"
                        >删除图片</span
                    >
                </div>
            </div>
        </template>

        <div
            class="alike-uploader"
            :class="[
                files.length
                    ? 'alike-uploader--active'
                    : 'alike-uploader--default',
            ]"
            v-if="files.length < count"
            @click="chooseFiles"
            v-drag-upload
        >
            <span>+</span>
            <input
                class="alike-uploader__input"
                ref="uploaderFinder"
                type="file"
                :accept="types.join(',')"
                :multiple="count > 1"
                @change="changeFiles"
            />
        </div>
    </div>
</template>

<script>
/**
 * alive-uploaders
 * @property files {Array} 图片集合
 * @property count {Number} 最大上传数量（默认值：9）
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
    name: "alike-uploaders",
    props: {
        files: {
            type: Array,
            default: () => [],
        },
        count: {
            type: Number,
            default: 9,
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
        chooseFiles() {
            this.$refs.uploaderFinder.click();
        },
        changeFiles(e) {
            let files = e.target.files;
            if (files.length + this.files.length > this.count) {
                this.$emit("fail", { msg: `最大支持上传${this.count}文件` });
                return false;
            }

            let tempFilePaths = [];
            for (let i = 0; i < files.length; i++) {
                let item = window.URL.createObjectURL(files[i]);
                tempFilePaths.push(item);
            }

            this.$emit("change", { files, tempFilePaths });
            if (this.autoVerify) {
                this.verifyFiles({ files, tempFilePaths });
            }
        },
        verifyFiles({ files, tempFilePaths }) {
            const { storeFiles, storeTempFilePaths } = this.filterFiles({
                files,
                tempFilePaths,
            });
            if (storeFiles.length && storeTempFilePaths.length) {
                this.$emit("success", {
                    files: storeFiles,
                    tempFilePaths: storeTempFilePaths,
                });
            }
        },
        filterFiles({ files, tempFilePaths }) {
            let storeFiles = []; // 储存符合标准的文件
            let storeTempFilePaths = []; // 储存符合标准的临时文件
            let storeIndexs = []; // 储存不符合标准的文件下标（用于删除tempFilePaths中对应的临时路径）
            let storeNames = []; // 储存不符合标准的文件名称（用于提示哪些文件不符合标准）

            // 验证图片大小及图片类型
            files.forEach((item, index) => {
                if (item.size < this.size && this.types.includes(item.type)) {
                    storeFiles.push(item);
                } else {
                    storeNames.push(item.name);
                    storeIndexs.push(index);
                }
            });

            // 根据验证结果取出相对应的临时路径
            if (storeIndexs.length) {
                this.$emit("fail", {
                    size: this.size,
                    types: this.types,
                    names: storeNames,
                    msg: "以上资源文件大小或文件类型不符合标准",
                });

                tempFilePaths.forEach((item, index) => {
                    if (!storeIndexs.includes(index)) {
                        storeTempFilePaths.push(item);
                    }
                });
            } else {
                storeTempFilePaths = tempFilePaths;
            }

            return {
                storeFiles,
                storeTempFilePaths,
            };
        },
        deleteFiles(index) {
            this.$emit("delete", index);
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
                vm.verifyFiles(e.dataTransfer.files);
            };
        },
    },
};
</script>

<style lang="scss" scoped>
.alike-uploader {
    position: relative;
    display: inline-block;
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
.alike-uploader:hover {
    border-color: #345fd3;
}
.alike-preview-image-item {
    display: inline-flex;
    position: relative;
    margin-right: 10px;
    width: 178px;
    height: 178px;
    border-radius: 6px;
}
.alike-preview-image-item__image {
    width: 100%;
    height: 100%;
    border-radius: 6px;
}
.alike-preview-image-item__delete {
    position: absolute;
    top: 5px;
    right: 5px;
    cursor: pointer;
}
.alike-preview-list {
    display: inline-block;
    position: relative;
    /* 因为文本会溢出所以必须设置 */
    overflow-x: hidden;
    margin-right: 10px;
    width: 240px;
    min-height: 180px;
}
.alike-preview-list__item {
    display: flex;
}
.alike-preview-list__delete {
    cursor: pointer;
}
.alike-uploader__input {
    display: none;
}
</style>