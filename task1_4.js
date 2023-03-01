//Здесь выполнены задания с 1.1 по 1.4

class StringTest {
    constructor(some_str) {
        this.some_str = some_str.toString();
        this.listOfSimbols = [',', '.', '-', ':', ';', '?', '!', '...'];
        this.regWord = /[A-Za-zА-Яа-я]/g;
    };

    listOfWords() {
        let new_list = this.some_str.split(" ").filter(str => (str && str !== " "));
        return new_list.filter(word => word.match(this.regWord) !== null).map(word => word.match(this.regWord).join(''))
    };

    // Преобразование строки к нижнему регистру, но первая буква большая.
    filteredSomeStr_task1_1() {
        const low_str = this.some_str.toLowerCase();
        const first_letter_cap = low_str[0].toUpperCase();
        console.log(first_letter_cap + low_str.slice(1));
        return first_letter_cap + low_str.slice(1);
    };

    // Преобразование строки с целью правильно расстановки пробелов.
    normalizedSomeStr_task1_2() {
        const str_list = this.some_str.split(" ");
        let list = [];
        for (let i = 0; i < str_list.length; i++) {
            let str = str_list[i];
            if (this.listOfSimbols.includes(str[0]) && str.length > 1) {
                list.push(str[0]);
                list.push(str.replace(str[0], ''));
            } else {
                list.push(str);
            }
        }
        const new_list = list.filter(str => (str && str !== " "))
        for (let elem in new_list) {
            let element = new_list[elem];
            if (this.listOfSimbols.includes(element)) {
                new_list.splice(elem - 1, 1, new_list[elem - 1] + element);
                new_list.splice(elem, 1);
            }
        }
        const new_str = new_list.join(' ');
        console.log(new_str);
        return new_str;
    };

    // Подсчитывает кол-во слов в строке.
    wordsCounter_task1_3() {
        let list = this.listOfWords();
        let last_digit = list.length % 10;
        if (last_digit === 1) {
            const words_count = `Текст содержит ${list.length} слово`;
            console.log(words_count);
            return words_count;
        } else if (last_digit >= 2 && last_digit <= 4) {
            const words_count = `Текст содержит ${list.length} слова`;
            console.log(words_count);
            return words_count;
        } else if (last_digit >= 5 || last_digit === 0) {
            const words_count = `Текст содержит ${list.length} слов`;
            console.log(words_count);
            return words_count;
        }

    };

    // Подсчитывающий, уникальные слова.
    countEachWord_task1_4() {
        let list = this.listOfWords()
        let obj = new Set();
        for (let word in list) {
            let counter = 0;
            for (let i in list) {
                if (list[word] === list[i]) {
                    counter++;
                }
            }
            obj.add(`${list[word]} - ${counter} раза`);
        }
        console.log(obj);
    };
}


let r = new StringTest("Иван   , скушал   много еды, но Иван остался голодным .");
r.filteredSomeStr_task1_1(); // Преобразование строки к нижнему регистру, но первая буква большая.
r.normalizedSomeStr_task1_2(); // Преобразование строки с целью правильно расстановки пробелов.
r.wordsCounter_task1_3(); // Подсчитывает кол-во слов в строке.
r.countEachWord_task1_4() // Подсчитывающий, уникальные слова.









