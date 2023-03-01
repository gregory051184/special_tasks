//Здесь выполнено задание 2
//Калькулятор сделал в виде класса
//использовать метод класса dispatcher()
// чтобы поменять операцию, достаточно поменять метод класса на поддерживаемую операцию + - * /

class MegaCalc {
    constructor(max, min, method) {
        this.max = max;
        this.min = min;
        this.method = method;
        this.methods = {
            "+": this.summa,
            "-": this.difference,
            "*": this.multiply,
            "/": this.division
        };
    };

    summa() {
        let max = this.max.split('').reverse();
        let min = this.min.split('').reverse();
        let len = max.length;
        let result = [];
        for (let i = 0, b = 0, c = 0; i < len; i++) {
            b = +max[i] + +(min[i] || 0) + c;
            result[i] = +b > 9 ? (c = 1, +b - 10) : (c = 0, +b)

        }
        return result.reverse().join('').replace(/^0+/, '');
    };

    difference(max = this.max, min = this.min) {
        if (min.length > max.length) {
            console.log('Уменьшаемое должно быть первым аргументом и быть больше вычитаемого.')
        } else {
            max = max.split('').reverse();
            min = min.split('').reverse();
            let len = max.length;
            let result = [];
            for (let i = 0, b = 0, c = 0; i < len; i++) {
                b = max[i] - (min[i] || 0) + c;
                result[i] = b < 0 ? (c = -1, 10 + b) : (c = 0, b)
            }
            return result.reverse().join('').replace(/^0+/, '');
        }
    };

    multiply(max = this.max, min = this.min) {
        let len1 = max.length;
        let len2 = min.length;
        if (len1 === 0 || len2 === 0)
            return "0"
        let result = new Array(len1 + len2).fill(0)
        let i_n1 = 0
        let i_n2 = 0
        for (var i = len1 - 1; i > -1; i--) {
            let carry = 0
            let n1 = (max[i]).charCodeAt(0) - 48
            i_n2 = 0;
            for (let j = len2 - 1; j > -1; j--) {
                let n2 = (min[j]).charCodeAt(0) - 48;
                let summ = n1 * n2 + result[i_n1 + i_n2] + carry;
                carry = Math.floor(summ / 10)
                result[i_n1 + i_n2] = summ % 10;
                i_n2 += 1;
            }
            if (carry > 0)
                result[i_n1 + i_n2] += carry;
            i_n1 += 1
        }
        i = result.length - 1
        while (i >= 0 && result[i] === 0)
            i -= 1
        if (i === -1)
            return "0"
        let s = ""
        while (i >= 0) {
            s += String.fromCharCode(result[i] + 48)
            i -= 1
        }
        return s;
    };

    division() {
        let quotient = "";
        let remains = "";
        let dividendIndex = 0;
        let remainder = "";
        let max = this.max;
        let min = this.min;
        while (max.length > 1 && min[0] === "0") {
            min = min.substring(1);
        }
        while (dividendIndex < max.length) {
            remainder += max[dividendIndex];
            let remainderInt = parseInt(remainder);
            if (remainderInt < parseInt(min)) {
                quotient += "0";
            } else {
                let quotientInt = Math.floor(remainderInt / parseInt(min));
                quotient += quotientInt.toString();
                remainder = (remainderInt % parseInt(min)).toString();
            }

            dividendIndex++;
        }

        if (quotient === "") {
            quotient = "0";
        }
        remains = this.difference(max, this.multiply(quotient.replace(/^0+/, ''), min));
        console.log(`Результат деления = ${quotient.replace(/^0+/, '')}, остаток от деления = ${remains}`);
        return quotient.replace(/^0+/, '');
    }


    dispatcher() {
        if (Object.keys(this.methods).includes(this.method)) {
            return this.methods[this.method].apply(this)
        } else {
            console.log(`В нашем калькуляторе нет метода ${this.method}.
             Поддерживаемые методы: ${Object.keys(this.methods)} `)
        }
    }
}

let result = new MegaCalc('14666666666666666666666666666666666666666333333', '2', "+")

console.log(`Результат вычислений ${result.dispatcher()}`)









