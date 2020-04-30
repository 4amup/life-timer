// 加载node原生模块
const fs = require('fs')
const path = require('path')

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
console.log(result)


// 导出变量，CommonJS规范
module.export = { data };