<template>
    <div class="alike-container">
        <el-row :gutter="20">
            <el-col :span="24">
                <el-card>
                    <div slot="header">mavon-editor</div>
                    <mavon-editor
                        v-model="content"
                        @change="changeMavon"
                        @save="saveMavon"
                    ></mavon-editor>
                </el-card>
            </el-col>
        </el-row>
        <el-row class="mt-20" :gutter="20">
            <el-col :span="24">
                <el-card>
                    <div slot="header">vue-markdown preview</div>
                    <div class="markdown-body">
                        <vue-markdown
                            :source="content"
                            v-highlight
                        ></vue-markdown>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
// 示例：cnblogs.com/wjw1014/p/11778159.html
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
import VueMarkdown from "vue-markdown";
import "github-markdown-css";
import "highlight.js/styles/github.css";
import hljs from "highlight.js";
export default {
    name: "Markdown",
    components: {
        mavonEditor,
        VueMarkdown,
    },
    directives: {
        highlight: {
            bind(el) {
                const blocks = el.querySelectorAll("pre code");
                blocks.forEach((item) => {
                    hljs.highlightBlock(item);
                });
            },
        },
    },
    data() {
        return {
            content: "",
        };
    },
    methods: {
        changeMavon(context) {
            console.log("changeMavon：", context);
        },
        saveMavon(context) {
            console.log("saveMavon：", context);
        },
    },
};
</script>

<style>
</style>