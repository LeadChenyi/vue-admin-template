<template>
    <div class="alike-tag" v-if="tags.length">
        <div class="alike-tag-left">
            <router-link
                tag="div"
                :to="item.path"
                class="alike-tag-button"
                v-for="(item, index) in tags"
                :class="{ active: isActive(item.path) }"
                :key="index"
            >
                <span class="alike-tag-button__text">{{ item.title }}</span>
                <i
                    class="alike-tag-button__icon el-icon-close"
                    @click.stop="closeTag(index)"
                ></i>
            </router-link>
        </div>
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
export default {
    name: "AlikeTag",
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
                if (
                    !this.$route.meta.excludeTag
                ) {
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
}

.alike-tag-button {
    margin-left: 5px;
    border-radius: 4px;
    font-size: 12px;
    color: #666;
    max-width: 80px;
    height: 24px;
    line-height: 24px;
    display: flex;
    align-items: center;
    border: 1px solid #cccccc;
    background-color: #ffffff;
    padding: 0 5px 0 12px;

    -webkit-transition: all 0.3s ease-in;
    -moz-transition: all 0.3s ease-in;
    transition: all 0.3s ease-in;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.alike-tag-button__text {
    flex: 1;
    position: relative;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.alike-tag-button__icon {
    position: relative;
    overflow: hidden;
    margin-left: 5px;
}
.alike-tag-button:not(.active):hover {
    background-color: #f8f8f8;
}

.alike-tag-button.active {
    border: 1px solid $--color-primary;
    background-color: $--color-primary;
    color: #ffffff;
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