//Здесь выполнено задание 3

class Product {
    name = '';
    price = '';
    quantity = '';
    description = '';
}

let productList = [];

let productCreator = (name, price, quantity, description) => {
    let product = new Product();
    product = {name, price, quantity, description};
    productList.push(product);
    return productList;
};

productCreator('huawei', 100, 8, 'P40 Pro');
productCreator('oppo', 60, 4, '7 akm');
productCreator('samsung', 80, 3, 'galaxy a53');
productCreator('iphone', 80, 6, '5555 Pro');
productCreator('huawei', 70, 5, 'P50 Prox');

let filterArrayByReqParams = url => {
    let filteredList = [];
    let listOfQueryParams = url.split('&');
    let str_methods = {
        name: {
            'contains': variable => productList.filter(product => product.name.includes(variable)),
            'starts': variable => productList.filter(product => product.name.startsWith(variable)),
            'ends': variable => productList.filter(product => product.name.endsWith(variable))
        },
        price: {
            '<': variable => productList.filter(product => product.price < variable),
            '>': variable => productList.filter(product => product.price > variable),
            '=': variable => productList.filter(product => product.price === variable),
            '>=': variable => productList.filter(product => product.price >= variable),
            '<=': variable => productList.filter(product => product.price <= variable),
        },
        quantity: {
            '<': variable => productList.filter(product => product.quantity < variable),
            '>': variable => productList.filter(product => product.quantity > variable),
            '=': variable => productList.filter(product => product.quantity === variable),
            '>=': variable => productList.filter(product => product.quantity >= variable),
            '<=': variable => productList.filter(product => product.quantity <= variable),
        },
        description: {
            'contains': variable => productList.filter(product => product.description.includes(variable)),
            'starts': variable => productList.filter(product => product.description.startsWith(variable)),
            'ends': variable => productList.filter(product => product.description.endsWith(variable))
        }

    };
    for (let urlPart in listOfQueryParams) {
        if (listOfQueryParams[urlPart].split('-').length > 2 && Object.keys(str_methods)
            .includes(listOfQueryParams[urlPart]
                .split('-')[0])) {
            let title = listOfQueryParams[urlPart].split('-')[0];
            let titleMethod = listOfQueryParams[urlPart].split('-')[1];
            let value = listOfQueryParams[urlPart].split('-')[2];
            if (str_methods[title][titleMethod](value).length > 0) {
                filteredList.push(...str_methods[title][titleMethod](value));
            }
        } else if (listOfQueryParams[urlPart].split('-').length <= 2 && Object.keys(str_methods)
            .includes(listOfQueryParams[urlPart]
                .split('-')[0])) {
            let title = listOfQueryParams[urlPart].split('-')[0];
            let titleMethod = listOfQueryParams[urlPart].split('-')[1][0];
            let value = +listOfQueryParams[urlPart].split('-')[1].slice(1);
            if (str_methods[title][titleMethod](value).length > 0) {
                filteredList.push(...str_methods[title][titleMethod](value));
            }
        }
    }
    filteredList = filteredList.filter((value, index, self) =>
        index === self.findIndex((t) => (t.name === value.name)));

    return filteredList;
}


console.log(filterArrayByReqParams("name-starts-iph&quantity-=4&description-ends-rox"));


