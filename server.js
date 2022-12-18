//新建服务器
// const WebSocket = require('ws')
// const wss = new WebSocket.Server({ port:3000 }) //指明使用的端口
// // 用connection指明状态
// wss.on('connection', ws => {
//     console.log('connection登入')

//     ws.on('message', data =>{
//         ws.send(data + '单一连接,处理一下返回客户端,重启一下服务器')
//     })

//     ws.on('close', () =>{
//         console.log('登出')
//     })
// })


//基于http模块生成服务器事例,express写法
const app = require('express')()
const server = require('http').createServer(app)
const { Server } = require('socket.io')
const io = new Server(server)

app.get('/', (req,res) => {
    //处理html文件
    res.sendFile(__dirname + '/index.html')
})

io.on('connection' , socket => {
    console.log('有新连接进入聊天室')
    socket.on('chat message', msg => {
        io.emit('chat message', msg)
        console.log(msg)
    })
    socket.on('disconnect', () => {
        console.log('离开聊天室')
    })
})

server.listen('3000', () => '服务器开启')