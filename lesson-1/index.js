//Написати програму, яка виводить числа від 1 до 10, використовуючи цикли for та while.
console.log("Task 1\n\nUsing 'for'");
for(let i = 1; i <= 10; i++) {
    console.log(i);
}

console.log("\nUsing 'while'");
let i = 1;
while(i <= 10) {
    console.log(i);
    i++;
}


//Створити масив, що складається з елементів різних типів (примітивів) (число, рядок, булева змінна) довжиною 10 елементів. 
console.log("\nTask 2");
let arr = [23, 'course', -56, true, 151, "FullStack developer", false, '23', 1, "CHI IT Academy"];

//Вивести їх тип за допомогою typeof у консоль. Виведення здійсніть за допомогою перебору масиву різними способами: методом forEach, циклами for, while і do while.

console.log("\nUsing 'forEach'\n");
arr.forEach(el => console.log(typeof el));

console.log("\nUsing 'for'\n");
for(let i = 0; i < arr.length; i++) {
    console.log(typeof arr[i]);
}

console.log("\nUsing 'while'\n");
let j = 0;
while(j < arr.length) {
    console.log(typeof arr[j]);
    j++;
}

console.log("\nUsing 'do while'\n");
let index = 0;
do {
    console.log(typeof arr[index]);
    index++;
}while(index < arr.length)


//Створити масив об'єктів (приклад об'єкта: {name: '', age: xx, pets: [cat, dog]}) і за допомогою методу filter вивести всіх, хто старший за 20 років.
console.log("\nTask 3\n");
let arrObj = [
    {
        name : 'Victoria',
        age : 23,
        pets : ['cat', 'dog'],
    },
    {
        name : 'Anna',
        age : 22,
        pets : ['cat', 'parrot'],
    },
    {
        name : 'Martha',
        age : 18,
        pets : ['parrot', 'fish' ],
    },
    {
        name : 'Artem',
        age : 37,
        pets : ['dog', 'parrot', 'horse'],
    },
    {
        name : 'Alina',
        age : 15,
        pets : ['rabbit', 'horse'],
    },
]

let res = arrObj.filter(el => el.age > 20);
console.log("People age > 20: \n");
res.forEach(el => console.log(el.name));


//За допомогою методу map пройтися по масиву з попереднього завдання і кожному додати по домашній тварині. Результат вивести у консоль.
console.log("\nTask 4\n");
arrObj.map(el => el.pets.push('hamster'));
console.log(arrObj);


//Створіть масив з 10 елементів і заповніть його числом 42 за допомогою відповідного методу (завдання — знайти його в документації, посилання є в описі до лекції). 
//За допомогою splice вставити на 5-ту позицію слово "answer". За допомогою find знайти це слово і вивести його в консоль.
console.log("\nTask 5\n");
let newArr = new Array(10);
newArr.fill(42).splice(4, 1, 'answer');
let res1 = newArr.find(el => el === 'answer');
console.log(res1);


//Створіть об'єкт з кількома ключами на ваш розсуд. Наведіть приклади використання keys, hasOwn, values.
console.log("\nTask 6\n");
let myObj = {
    name: "Victoria",
    age: 23, 
    isStudent: false,
    address : {
        city: "Lviv",
        street: "Sykhiv",
    },
}

console.log("\nUsing 'keys'");
let resKeys = Object.keys(myObj);
console.log(resKeys);
console.log(Object.keys(myObj.address));
for (let key of Object.keys(myObj)) {
    console.log(key); 
}


console.log("\nUsing 'values'");
let resValues = Object.values(myObj);
console.log(resValues);
console.log(Object.values(myObj.address));
for (let value of Object.values(myObj)) {
    console.log(value); 
}

console.log("\nUsing 'hasOwn'");
console.log(Object.hasOwn(myObj, 'isStudent'));
console.log(Object.hasOwn(myObj, 'city'));
console.log(Object.hasOwn(myObj.address, 'city'));
