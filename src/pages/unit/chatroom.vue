<template>
    <div class="alike-container">
        <div class="chat-view">
            <div class="chat-view-h">
                <div class="chat-header-left">
                    <img
                        class="chat-header-left__image"
                        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                    />
                </div>
                <div class="chat-header-right">
                    <div class="chat-header-right__name">聊天室</div>
                    <div class="chat-header-right__info">
                        日期：{{ $dayjs().format("YYYY/MM/DD") }} 在线：**人
                    </div>
                </div>
            </div>
            <div class="chat-view-b">
                <div
                    class="chat-item"
                    v-for="(item, index) in chats"
                    :key="`${item.uuid}__${index}`"
                    :class="{ 'chat-item__self': uuid == item.uuid }"
                >
                    <div class="chat-info">
                        <span class="chat-time">{{
                            $dayjs(item.datetime).format("MM-DD HH:mm:ss")
                        }}</span>
                        <span class="chat-name"
                            >&#12288;{{ uuid == item.uuid ? "贵宾" : "游客"
                            }}{{ item.uuid }}</span
                        >
                    </div>
                    <div class="chat-message">
                        {{ item.content }}
                    </div>
                </div>
            </div>
            <div class="chat-view-f">
                <el-input
                    class="mb-10"
                    type="textarea"
                    :rows="3"
                    v-model="message"
                    placeholder="请输入..."
                    @keyup.enter.native="sendMessage"
                ></el-input>
                <el-button
                    type="primary"
                    :disabled="!message.length"
                    @click="sendMessage"
                    >发送消息</el-button
                >
            </div>
        </div>
    </div>
</template>

<script>
// https://socket.io/docs/v4/client-initialization
import { io } from "socket.io-client";
export default {
    name: "Chatroom",
    data() {
        return {
            uuid: null, // 临时用户
            roomId: 1,
            socket: null,
            chats: [],
            people: [],
            message: "",
        };
    },
    created() {
        this.uuid = this.$utils.captcha(8);
        /**
         * 指定连接WebSocket命名空间及房间号
         * ws://localhost 等价于 http://localhost
         * wss://localhost 等价于 https://localhost
         */
        const ws =
            process.env.NODE_ENV === "development"
                ? "ws://localhost:3000"
                : "ws://api.webyi.top";
        this.socket = io(`${ws}/chatroom?room_id=${this.roomId}`);

        // 进入房间（针对当前用户）
        // socket.on("connect", () => {
        //     console.log(socket.connected); // true
        // });
        // 离开房间（针对当前用户）
        // socket.on("disconnect", () => {
        //     console.log(socket.connected); // false
        // });

        // 监听服务器事件消息
        this.socket.on("serverBroadcast", (data) => {
            console.log("服务器广播的消息：", data);
            this.chats.push(data);
        });
    },
    methods: {
        sendMessage() {
            const temp = this.$utils.toForbidPrivacy(this.message);
            // 派遣事件消息发送给服务器
            const data = {
                datetime: new Date().getTime(),
                uuid: this.uuid,
                content: temp,
            };
            // this.chats.push(data);   // 广播给所有人
            this.socket.emit("clientDispatch", data);
            this.message = "";
        },
    },
};
</script>

<style lang="scss" scoped>
.chat-view {
    background: #ffffff;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    color: #434651;
}
.chat-view-h {
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    clear: both;
    overflow: hidden;

    .chat-header-left {
        position: relative;
        overflow: hidden;
        width: 60px;
        height: 60px;
        border: solid 2px #86bb71;
        border-radius: 50%;
    }
    .chat-header-left__image {
        width: 100%;
        height: 100%;
        vertical-align: bottom;
    }
    .chat-header-right {
        position: relative;
        overflow: hidden;
        padding-left: 15px;
        -webkit-box-flex: 1;
        -webkit-flex: 1;
        flex: 1;
    }
    .chat-header-right__name {
        margin-bottom: 10px;
        font-size: 16px;
        font-weight: 600;
    }
    .chat-header-right__info {
        color: #999;
    }
}

.chat-view-b {
    padding: 20px;
    height: calc(50vh);
    border-top: 1px solid #f4f4f4;
    border-bottom: 1px solid #f4f4f4;
    overflow-x: hidden;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;

    .chat-item {
        clear: both;
        overflow: hidden;
    }

    .chat-info {
        text-align: left;
    }
    .chat-time {
        color: #a8aab1;
    }

    .chat-name {
        color: #333333;
    }

    .chat-message {
        position: relative;
        float: left;
        margin: 15px 0 30px;
        padding: 10px 15px;
        max-width: 80%;
        border-radius: 7px;
        background-color: #86bb71;
        color: #fff;
        font-size: 16px;
        line-height: 26px;

        &:after {
            position: absolute;
            bottom: 100%;
            left: 10px;
            width: 0;
            height: 0;
            border: solid transparent;
            border-width: 10px;
            content: " ";
            pointer-events: none;
            border-bottom-color: #86bb71;
        }
    }

    // 自定义滚动条样式
    &::-webkit-scrollbar {
        width: 10px;
    }
    &::-webkit-scrollbar-button {
        display: none;
    }
    &::-webkit-scrollbar-thumb {
        background-color: rgba(50, 50, 50, 0.5);
        border-radius: 5px;
    }
    &::-webkit-scrollbar-thumb:hover {
        cursor: pointer; // 无效（滚动条选择器中有部分属性是无效的）
        background-color: rgba(255, 50, 50, 0.5);
    }
    &::-webkit-scrollbar-track {
        background-color: rgba(200, 200, 200, 0.5);
    }
}
.chat-view-b {
    .chat-item__self {
        .chat-info {
            text-align: right;
        }
        .chat-message {
            background-color: #94c2ed;
            float: right;
        }
        .chat-message:after {
            border-bottom-color: #94c2ed;
            left: initial;
            right: 10px;
        }
    }
}

.chat-view-f {
    position: relative;
    overflow: hidden;
    padding: 20px;
}
</style>