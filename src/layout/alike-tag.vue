<template>
    <div class="alike-tag" v-if="tags.length">
        <draggable
            class="alike-tag-left"
            v-model="tags"
            @start="drag = true"
            @end="drag = false"
            animation="500"
            handle=".alike-move"
        >
            <transition-group class="alike-tag-left-group">
                <el-button
                    size="mini"
                    type="primary"
                    :plain="!isActive(item.path)"
                    v-for="(item, index) in tags"
                    :key="item.path"
                    @click="linkRouter(item.path)"
                >
                    <i class="el-icon-rank alike-move"></i>
                    <span>{{ item.title }}</span>
                    <i class="el-icon-close" @click.stop="closeTag(index)"></i>
                </el-button>
            </transition-group>
        </draggable>
        <div class="alike-tag-right">
            <el-dropdown @command="handleTags">
                <el-button size="mini" type="primary">
                    标签选项<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu size="small" slot="dropdown">
                    <el-dropdown-item command="other"
                        >关闭其他</el-dropdown-item
                    >
                    <el-dropdown-item command="all">关闭所有</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
import Draggable from "vuedraggable";
import { MAX_ROUTER } from "@/common/config.js";
export default {
    name: "AlikeTag",
    components: {
        Draggable,
    },
    data() {
        return {
            tags: [],
        };
    },
    created() {
        if (!this.$route.meta.excludeTag) {
            this.setTags(this.$route);
        }
    },
    watch: {
        $route(newValue, oldValue) {
            if (newValue != oldValue) {
                if (!this.$route.meta.excludeTag) {
                    this.setTags(this.$route);
                }
            }
        },
    },
    computed: {
        isActive() {
            // 当前标签页激活
            return (path) => {
                return path === this.$route.fullPath;
            };
        },
    },
    methods: {
        setTags(route) {
            // 当前路由是否存在标签列表中
            const isExist = this.tags.some((item) => {
                return item.path === route.fullPath;
            });
            // 如果不存在，则将当前路由放入标签列表中
            if (!isExist) {
                if (this.tags.length >= MAX_ROUTER) {
                    this.tags.shift();
                }
                this.tags.push({
                    title: route.meta.title,
                    path: route.fullPath,
                    name: route.matched[1].components.default.name,
                });
            }

            // 过滤出路由name做路由缓存使用
            let keepAliveTags = [];
            this.tags.forEach((item) => {
                item && item.name && keepAliveTags.push(item.name);
            });
            this.$store.dispatch("app/setTags", keepAliveTags);
        },
        handleTags(command) {
            command === "other" ? this.closeOtherTag() : this.closeAllTag();
        },
        closeAllTag() {
            // 关闭全部标签
            this.tags = [];
            this.$router.push("/");
        },
        closeOtherTag() {
            // 关闭其他标签
            const curItem = this.tags.filter((item) => {
                return item.path === this.$route.fullPath;
            });
            this.tags = curItem;
        },
        closeTag(index) {
            // 关闭某个标签
            const delItem = this.tags.splice(index, 1)[0];
            const item = this.tags[index]
                ? this.tags[index]
                : this.tags[index - 1];
            if (item) {
                delItem.path === this.$route.fullPath &&
                    this.$router.push(item.path);
            } else {
                // 再次重置到默认页时是不会触发路由跳转及路由守卫的，所以当再次关闭默认标签时页面内的watch是不会被触发的，最后tags也就为空。
                this.$router.push("/");
            }
        },
        linkRouter(path) {
            this.$router.push(path);
        },
    },
};
</script>

<style lang="scss">
.alike-tag {
    position: relative;
    overflow: hidden;
    background-color: #ffffff;
    height: 40px;
    display: flex;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
}

.alike-tag-left {
    display: flex;
    align-items: center;
    flex: 1;
    overflow-x: auto;
    overflow-y: hidden;
    &::-webkit-scrollbar {
        height: 5px;
        transform: height 300ms ease;
    }
    &::-webkit-scrollbar-button {
        display: none;
    }
    &::-webkit-scrollbar-thumb:hover {
        background-color: rgba(50, 50, 50, 0.5);
        border-radius: 5px;
    }
    &::-webkit-scrollbar-track {
        background-color: rgba(200, 200, 200, 0.5);
    }
}
.alike-tag-left-group {
    display: flex;
    margin: 0 20px;
}
.alike-tag-left-group .el-button {
    transition: none;
}
.alike-tag-left-group .el-button .alike-move {
    cursor: move;
}
.alike-tag-right {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 110px;
    background-color: #ffffff;
    box-shadow: -3px 0 15px 3px rgba(0, 0, 0, 0.1);
}
</style>