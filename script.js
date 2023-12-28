document.addEventListener("DOMContentLoaded", function() {

 


    // Словарь для хранения информации о продуктах в корзине
    var cartProducts = {};

    // Находим все кнопки "Добавить в корзину"
    var addToCartButtons = document.querySelectorAll('.product button');

    // Добавляем обработчик события для каждой кнопки
    addToCartButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            // Получаем информацию о продукте из родительского элемента
            var product = button.closest('.product');
            var productName = product.querySelector('h3').textContent;
            var productPrice = parseFloat(product.querySelector('.price').textContent.replace('₸', ''));

            // Проверяем, есть ли уже такой продукт в корзине
            if (cartProducts[productName]) {
                // Если да, увеличиваем количество
                cartProducts[productName].quantity++;
            } else {
                // Иначе, создаем новую запись в корзине
                cartProducts[productName] = {
                    price: productPrice,
                    quantity: 1
                };
            }

            // Обновляем или добавляем строку в таблице корзины
            updateCartTable();
        });
    });

    function updateCartTable() {
        var cartTableBody = document.querySelector('#cart tbody');
        // Очищаем таблицу перед обновлением
        cartTableBody.innerHTML = '';

        // Проходимся по каждому продукту в корзине и добавляем в таблицу
        for (var productName in cartProducts) {
            var product = cartProducts[productName];
            var newRow = cartTableBody.insertRow();
            var cell1 = newRow.insertCell(0);
            var cell2 = newRow.insertCell(1);
            var cell3 = newRow.insertCell(2);
            var cell4 = newRow.insertCell(3);
            var cell5 = newRow.insertCell(4);

            cell1.textContent = productName;
            cell2.textContent = '₸' + product.price.toFixed(2);

            // Добавим поле для ввода количества
            var quantityInput = document.createElement('input');
            quantityInput.type = 'number';
            quantityInput.value = product.quantity;
            quantityInput.min = '1';
            quantityInput.addEventListener('input', function() {
                updateRowTotal(newRow);
            });
            cell3.appendChild(quantityInput);

            cell4.textContent = '₸' + (product.price * product.quantity).toFixed(2);

            // Добавим кнопку для удаления строки
            var deleteButton = document.createElement('button');
            deleteButton.textContent = 'Удалить';
            deleteButton.addEventListener('click', function() {
                // Удаляем продукт из корзины и обновляем таблицу
                delete cartProducts[productName];
                updateCartTable();
            });
            cell5.appendChild(deleteButton);
        }

        // Обновляем общую сумму в футере корзины
        updateTotal();
    }

    function updateRowTotal(row) {
        // Обновляем итоговую стоимость строки в зависимости от количества
        var productName = row.cells[0].textContent;
        var product = cartProducts[productName];
        var quantityInput = row.cells[2].querySelector('input');
        product.quantity = parseInt(quantityInput.value, 10);
        row.cells[3].textContent = '₸' + (product.price * product.quantity).toFixed(2);

        // Обновляем общую сумму в футере корзины
        updateTotal();
    }

    function updateTotal() {
        var cartTable = document.querySelector('#cart');
        var totalCell = cartTable.querySelector('tfoot td:last-child');

        // Подсчитываем общую сумму
        var total = 0;
        for (var productName in cartProducts) {
            var product = cartProducts[productName];
            total += product.price * product.quantity;
        }

        // Обновляем общую сумму
        totalCell.textContent = '₸' + total.toFixed(2);
    }


   var tabs = document.querySelectorAll('nav a');

    tabs.forEach(function(tab) {
        tab.addEventListener('click', function() {
            var targetId = tab.getAttribute('href').substring(1);
            var targetElement = document.getElementById(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });


    
    });
});