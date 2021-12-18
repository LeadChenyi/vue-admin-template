class Message {
    constructor(type, title, content) {
        this.type = type;
        this.title = title;
        this.content = content;
    }
}

// 构造函数数组对象
const msgs = [];
msgs.push(
    new Message('info', '消息', '今天天气真不错'),
    new Message('warn', '警告', '你还有重要的事情没完成'),
    new Message('log', '日志', '一切安好')
);
console.log(msgs);

// json数组对象
const tips = [
    {
        type: 'info',
        title: '消息',
        content: '今天天气真不错',
    },
    {
        type: 'warn',
        title: '警告',
        content: '你还有重要的事情没完成',
    },
    {
        type: 'log',
        title: '日志',
        content: '一切安好',
    },
];

console.log(msgs[0].content == tips[0].content);
