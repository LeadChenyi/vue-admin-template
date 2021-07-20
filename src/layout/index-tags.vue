<template>
    <div class="index-tags" v-if="tags.length">
        <ul>
            <li
                class="tags-li"
                v-for="(item, index) in tags"
                :class="{ active: isActive(item.path) }"
                :key="index"
            >
                <router-link :to="item.path" class="tags-li-title">
                    {{ item.title }}
                </router-link>
                <span class="tags-li-icon" @click="closeTag(index)"
                    ><i class="el-icon-close"></i
                ></span>
            </li>
        </ul>
        <div class="tags-close-box">
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
import { defaultWihteList } from "@/common/config.js";
export default {
    name: "IndexTags",
    data() {
        return {
            tags: [],
        };
    },
    created() {
        if (!defaultWihteList.includes(this.$route.path)) {
            this.setTags(this.$route);
        }
    },
    watch: {
        $route(newValue, oldValue) {
            if (newValue != oldValue) {
                if (!defaultWihteList.includes(this.$route.path)) {
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
                if (this.tags.length >= 8) {
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
    },
};
</script>

<style lang="scss">
.index-tags {
    position: relative;
    height: 30px;
    overflow: hidden;
    background: #fff;
    padding-right: 120px;
    box-shadow: 0 5px 10px #ddd;
}

.index-tags ul {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
}

.tags-li {
    float: left;
    margin: 3px 5px 2px 3px;
    border-radius: 3px;
    font-size: 12px;
    overflow: hidden;
    cursor: pointer;
    height: 23px;
    line-height: 23px;
    border: 1px solid #e9eaec;
    background: #fff;
    padding: 0 5px 0 12px;
    vertical-align: middle;
    color: #666;
    -webkit-transition: all 0.3s ease-in;
    -moz-transition: all 0.3s ease-in;
    transition: all 0.3s ease-in;
}

.tags-li-title {
    float: left;
    max-width: 80px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-right: 5px;
    color: #666;
}

.tags-li:not(.active):hover {
    background: #f8f8f8;
}

.tags-li.active {
    border: 1px solid $--color-primary;
    background-color: $--color-primary;
}
.tags-li.active .tags-li-title {
    color: #fff;
}

.tags-close-box {
    position: absolute;
    right: 0;
    top: 0;
    box-sizing: border-box;
    padding-top: 1px;
    text-align: center;
    width: 110px;
    height: 30px;
    background: #fff;
    box-shadow: -3px 0 15px 3px rgba(0, 0, 0, 0.1);
    z-index: 10;
}
</style>