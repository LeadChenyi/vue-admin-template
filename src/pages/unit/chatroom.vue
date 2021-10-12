<template>
    <div class="alike-container">
        <el-input v-model="message"></el-input>
        <el-button type="primary" size="mini" @click="sendMessage"
            >发送消息</el-button
        >
    </div>
</template>

<script>
// https://socket.io/docs/v4/client-initialization
import { io } from "socket.io-client";
export default {
    name: "Chatroom",
    data() {
        return {
            roomId: 1,
            socket: null,
            message: "",
        };
    },
    created() {
        /**
         * 指定连接WebSocket命名空间及房间号
         * ws://localhost:3001 等价于 http://localhost:3001
         * wss://localhost:3001 等价于 https://localhost:3001
         */
        this.socket = io(`ws://localhost:3001/chatroom?room_id=${this.roomId}`);

        // 监听服务器事件消息
        this.socket.on("serverBroadcast", function (data) {
            console.log("服务器广播的消息：", data);
        });

        // 进入房间（创建用户信息）
        // socket.on("connect", () => {
        //     console.log(socket.connected); // true
        // });

        // 离开房间（移除用户信息）
        // socket.on("disconnect", () => {
        //     console.log(socket.connected); // false
        // });
    },
    methods: {
        sendMessage() {
            // 派遣事件消息发送给服务器
            this.socket.emit("clientDispatch", this.message);
        },
    },
};
</script>

<style>
</style>