<template>
    <div class="alike-container">
        <el-row class="mt-20" :gutter="20">
            <el-col :span="24">
                <el-card>
                    <div slot="header">vue-awesome-swiper + swiper.animate</div>
                    <swiper :options="swiperOption1" ref="querySwiper1">
                        <swiper-slide
                            v-for="(item, index) in swiper1"
                            :key="index"
                        >
                            <p
                                class="ani"
                                swiper-animate-effect="fadeInUp"
                                swiper-animate-duration="0.5s"
                                swiper-animate-delay="0.3s"
                            >
                                {{ item }}
                            </p>
                        </swiper-slide>

                        <div
                            class="swiper-button-next"
                            slot="button-next"
                        ></div>
                        <div
                            class="swiper-button-prev"
                            slot="button-prev"
                        ></div>
                        <div class="swiper-pagination" slot="pagination"></div>
                        <div class="swiper-scrollbar" slot="scrollbar"></div>
                    </swiper>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import "swiper/dist/css/swiper.css";
import "@/common/lib/swiper/swiper.animate.min.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import * as swiperAni from "@/common/lib/swiper/swiper.animate.js";
export default {
    name: "Swiper",
    components: {
        swiper,
        swiperSlide,
    },
    data() {
        return {
            swiper1: [
                "I'm Slide 1",
                "I'm Slide 2",
                "I'm Slide 3",
                "I'm Slide 4",
                "I'm Slide 5",
            ],
            swiperOption1: {
                autoplay: true,
                pagination: {
                    el: ".swiper-pagination",
                    type: "bullets",
                    clickable: true,
                },
                scrollbar: {
                    el: ".swiper-scrollbar",
                },
                navigation: {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                },
                on: {
                    init() {
                        swiperAni.swiperAnimateCache(this); //隐藏动画元素
                        this.emit("slideChangeTransitionEnd"); //在初始化时触发一次slideChangeTransitionEnd事件
                    },
                    slideChangeTransitionEnd() {
                        swiperAni.swiperAnimate(this); //每个slide切换结束时也运行当前slide动画
                    },
                },
            },
        };
    },
    mounted() {
        console.log(this.$refs.querySwiper1.swiper);
    },
};
</script>

<style>
.swiper-container {
    width: 100%;
    height: 300px;
}
.swiper-slide {
    text-align: center;
    font-size: 18px;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>