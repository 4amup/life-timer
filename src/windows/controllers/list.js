const { remote } = require('electron')
const mainProcess = remote.require('main')

// user-comand区域事件监听
let userComand = document.getElementById('user-command')
userComand.addEventListener("click", (event) => {
    let button = event.target
    console.log(button.id)
    // 将主窗口控制指令传输到mainProcess
    switch (button.id) {
        case "exit":
            remote.getCurrentWindow().close()
            break;
        case "add":
            mainProcess.createItemWindow()
            break;
        default:
            break;
    }

})

// 页面加载的三个阶段：1.list列表动态图转圈；2.node.js读取文件后转化为对象；3.渲染list，插入HTML文件中
const list_element = document.getElementById('list')
list_element.innerText = `加载中...`

// 导入数据
let start = Date.now()
// let data = remote.require('./loadfile.js')
// remote.getGlobal('data').data = data //update 主进程data全局变量
let data = remote.getGlobal('data').data
let end = Date.now()
let timer = end - start

// // 加载完毕，向主进程发送消息
// ipcRenderer.send('load-data', data.items)

// 加载完毕，清掉之前的等待状态，切换为根据结果构建的list列表
list_element.innerText = null
data.items.forEach((item, index) => {
    let div = document.createElement("div")
    div.id = item.id
    div.className = "item"
    div.innerText = item.content
    list_element.appendChild(div)
})

// 追加载入时间信息
const message = document.createElement("span")
message.id = "message"
message.innerText = "载入文件耗时：" + timer + "ms"
list_element.appendChild(message)

// 加载完毕后为每个item绑定事件监听器：双击显示
list_element.addEventListener("dblclick", (event) => {
    let item = event.target
    if (item.className == "item") {
        mainProcess.createItemWindow(item.id)
    }
})