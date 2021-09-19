import Variables from "@/assets/style/variables.scss";
const version = require("element-ui/package.json").version; // 锁定版本
const ORIGINAL_THEME = "#409EFF"; // 注意：这里的值是饿了么UI库的主色，而不是你自定义后的主题颜色，所以只能是 "#409EFF"，否则替换无法生效。
export default {
    data() {
        return {
            chalk: "",
            themeColor: Variables.colorPrimary,
            disabledTheme: false // 是否禁止主题更换（仅作为同步视图控件）
        };
    },
    methods: {
        changeColor(val) {
            this.$cookie.set("elemet_theme_color", val);
        },
        syncThemeColor(lock = false) {
            if (this.$cookie.get("elemet_theme_color")) {
                this.disabledTheme = lock;
                this.themeColor = this.$cookie.get("elemet_theme_color");
            }
        },
        updateStyle(style, oldCluster, newCluster) {
            let newStyle = style;
            oldCluster.forEach((color, index) => {
                newStyle = newStyle.replace(
                    new RegExp(color, "ig"),
                    newCluster[index]
                );
            });
            return newStyle;
        },
        getCSSString(url, variable) {
            return new Promise((resolve) => {
                const xhr = new XMLHttpRequest();
                xhr.onreadystatechange = () => {
                    if (xhr.readyState === 4 && xhr.status === 200) {
                        this[variable] = xhr.responseText.replace(
                            /@font-face{[^}]+}/,
                            ""
                        );
                        resolve();
                    }
                };
                xhr.open("GET", url);
                xhr.send();
            });
        },
        getThemeCluster(theme) {
            const tintColor = (color, tint) => {
                let red = parseInt(color.slice(0, 2), 16);
                let green = parseInt(color.slice(2, 4), 16);
                let blue = parseInt(color.slice(4, 6), 16);

                if (tint === 0) {
                    return [red, green, blue].join(",");
                } else {
                    red += Math.round(tint * (255 - red));
                    green += Math.round(tint * (255 - green));
                    blue += Math.round(tint * (255 - blue));

                    red = red.toString(16);
                    green = green.toString(16);
                    blue = blue.toString(16);

                    return `#${red}${green}${blue}`;
                }
            };

            const shadeColor = (color, shade) => {
                let red = parseInt(color.slice(0, 2), 16);
                let green = parseInt(color.slice(2, 4), 16);
                let blue = parseInt(color.slice(4, 6), 16);

                red = Math.round((1 - shade) * red);
                green = Math.round((1 - shade) * green);
                blue = Math.round((1 - shade) * blue);

                red = red.toString(16);
                green = green.toString(16);
                blue = blue.toString(16);

                return `#${red}${green}${blue}`;
            };

            const clusters = [theme];
            for (let i = 0; i <= 9; i++) {
                clusters.push(tintColor(theme, Number((i / 10).toFixed(2))));
            }
            clusters.push(shadeColor(theme, 0.1));
            return clusters;
        },
    },
    watch: {
        async themeColor(newVal, oldVal) {
            if (newVal == oldVal || this.disabledTheme) {
                this.disabledTheme = false;
                return this.disabledTheme;
            }

            const colorVal = this.chalk ? this.themeColor : ORIGINAL_THEME;
            if (typeof newVal !== "string") return;
            const themeCluster = this.getThemeCluster(newVal.replace("#", ""));
            const originalCluster = this.getThemeCluster(
                colorVal.replace("#", "")
            );

            const getHandler = (variable, id) => {
                return () => {
                    const originalCluster = this.getThemeCluster(
                        ORIGINAL_THEME.replace("#", "")
                    );
                    const newStyle = this.updateStyle(
                        this[variable],
                        originalCluster,
                        themeCluster
                    );
                    let styleTag = document.getElementById(id);
                    if (!styleTag) {
                        styleTag = document.createElement("style");
                        styleTag.setAttribute("id", id);
                        styleTag.setAttribute("type", "text/css");
                        document.body.appendChild(styleTag);
                    }
                    styleTag.innerText = newStyle;


                };
            };

            if (!this.chalk) {
                const url = `https://unpkg.com/element-ui@${version}/lib/theme-chalk/index.css`;
                await this.getCSSString(url, "chalk");
            }

            const chalkHandler = getHandler("chalk", "chalk-style");
            chalkHandler();

            const styles = [].slice
                .call(document.querySelectorAll("style"))
                .filter((style) => {
                    const text = style.innerText;
                    return (
                        new RegExp(colorVal, "i").test(text) &&
                        !/Chalk Variables/.test(text)
                    );
                });

            styles.forEach((style) => {
                const { innerText } = style;
                if (typeof innerText !== "string") return;
                style.innerText = this.updateStyle(
                    innerText,
                    originalCluster,
                    themeCluster
                );
            });

            // 本地缓存同步初始化不进行弹窗提示
            if (this.$el.id !== 'app') {
                this.$message({
                    type: "success",
                    message: "主题更换成功"
                })
            }
        },
    },
}