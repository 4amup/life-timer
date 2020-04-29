// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.
const fs = require('fs')
const path = require('path')

let start = Date.now()

// 路径设置
const entry_path = path.join(__dirname, 'data/')
const setting_path = "setting.json"

// 拼接路径
let header_path = path.join(entry_path, setting_path)
let items_path = path.join(entry_path, "items/")

// 读取header设置，并转化为可操作的对象
let data_json = fs.readFileSync(header_path, 'utf8')
let data = JSON.parse(data_json)

// 读取items文件名
let items_file_name = fs.readdirSync(items_path)
// 遍历读取items文件内容并放入items数组中
data.items = []
items_file_name.forEach((value, index) => {
    let item_path = path.join(items_path, value)
    let item_json = fs.readFileSync(item_path, 'utf8')
    let item = JSON.parse(item_json)
    data.items[index] = item
})

let result = JSON.stringify(data)
let end = Date.now()
let timer = end - start

document.getElementById('timer').innerText = timer
document.getElementById('count').innerText = data.items.length
document.getElementById('date').innerText = Date()