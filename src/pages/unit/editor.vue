<template>
    <div class="alike-container p-20">
        <el-row :gutter="20">
            <el-col :span="24">
                <el-card>
                    <div slot="header">vue-quill-editor</div>
                    <quill-editor
                        class="alike-editor"
                        v-model="quillContent"
                        :options="quillOptions"
                        @blur="blurQuill($event)"
                        @focus="focusQuill($event)"
                        @ready="readyQuill($event)"
                    >
                    </quill-editor>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor, Quill } from "vue-quill-editor";
import { container, ImageExtend, QuillWatch } from "quill-image-extend-module";
Quill.register("modules/ImageExtend", ImageExtend);

export default {
    name: "Editor",
    components: {
        quillEditor,
    },
    data() {
        return {
            quillContent: "",
            quillOptions: {
                modules: {
                    ImageExtend: {
                        loading: true,
                        name: "img",
                        action: "",
                        response: (res) => {
                            console.log("upload image", res);
                            return res.info;
                        },
                    },
                    toolbar: {
                        container: container,
                        handlers: {
                            image: function () {
                                QuillWatch.emit(this.quill.id);
                            },
                        },
                    },
                },
            },
        };
    },
    methods: {
        blurQuill(quill) {
            console.log("blur editor", quill);
        },
        focusQuill(quill) {
            console.log("focus editor", quill);
        },
        readyQuill(quill) {
            console.log("ready editor", quill);
        },
    },
};
</script>

<style>
.quill-editor .ql-editor {
    min-height: 300px;
}
</style>