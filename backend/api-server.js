// Подключаем библиотеку Express для создания сервера
const express = require('express');

// Подключаем body-parser для обработки данных, отправленных в теле запроса
const bodyParser = require('body-parser');

// Подключаем файловую систему (fs) для чтения и записи файлов
const fs = require('fs');

// Создаем экземпляр приложения Express
const app = express();

// Устанавливаем порт, на котором будет работать сервер
const port = 8080;

 // Получение списка товаров
 app.get()

app.use(bodyParser.json());

let products = JSON.parse(fs.readFileSync('products.json', 'utf8'));

/*
req — это объект запроса, содержащий информацию о запросе, который был отправлен клиентом (например, путь, параметры, тело запроса).
res — это объект ответа, с помощью которого сервер отправляет ответ клиенту (например, данные, ошибки или страницы).
*/

// Получение списка товаров
app.get('/api/products', (req, res) => {
    res.json(products);
});

// Добавление товаров
app.post('/api/products', (req, res) => {
    const newProduct = req.body;
    newProduct.id = products.length + 1;
    products.push(newProduct);
    fs.writeFileSync('products.json', JSON.stringify(products, null, 2));
    res.status(201).json(newProduct);
});

// Редактировать товар по ID
app.put('/api/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    let product = products.find(p => p.id === id);
    if (product){
        Object.assign(product, req.body);
        fs.writeFileSync('products.json', JSON.stringify(products, null, 2));
        res.json(product);
    }
    else{
        res.status(404).send('Продукт не найден');
    }
});

// Удалить товар по ID
app.delete('/api/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = products.findIndex(p => p.id === id);
    if (index != -1){
        products.splice(index, 1);
        fs.writeFileSync('products.json', JSON.stringify(products, null, 2));
        res.status(204).send();
    }
    else{
        res.status(404).send('Продукт не найден');
    }
});

app.listen(port, () => {
    console.log(`API сервер запущен на ${port} порту`)
});