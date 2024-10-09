//Task 1
/* Створити функцію, яка при створенні приймає об'єкт, наприклад: {access-token: 'qwerty'} 
і додає його до кожної структури даних, що буде передана в результатуючу функцію. 
Також до об'єкта буде додано поле count. При кожному виклику воно має збільшуватися на 1. */

console.log("\nTask 1\n");
function addParamsToRequest(params) {
    let count = 0;
    return function sendData(data) {
        count++;
        return {...params, data: data, count : count};
    }

}

const sendData = addParamsToRequest({'access-token': 'qwerty'} );
const result1 = sendData({name : 'Victoria', age: 23});
console.log(result1);
const result2 = sendData({name : 'Artem', age: 20});
console.log(result2);




//Task 2
//Викличте його так, щоб ім'я та вік були вказані (значення неважливі). Потім створіть функцію, яка буде це робити постійно при її виклику.

console.log("\nTask 2\n");

const obj = {
    getData: function () {
        console.log(`Person name is: ${this.name} and age ${this.age}`) 
    }
}

obj.getData.call({name: 'Victoria', age: 23});

function newPerson(name, age) {
    return obj.getData.bind({name, age}); 
}

const person = newPerson("Artem", 20);
person();




//Task 3
//Задача — пройтися по об'єкту рекурсивно, знайти всі файли та повернути їхні імена у вигляді масиву.

console.log("\nTask 3\n");
const root = {
    name: 'name',
    type: 'folder',
    children: [
        {
            name: 'folder 1',
            type: 'folder',
            children: [
                {
                    name: 'folder 2',
                    type: 'folder',
                    children: [
                        {
                        name: 'file 3',
                        type: 'file',
                        size: 30
                        }
                    ]
                }
            ]
        },

        {
            name: 'file 1',
            type: 'file',
            size: 10
        },

        {
            name: 'file 2',
            type: 'file',
            size: 20
        }

    ]

};



function findFilesRecursively(obj) {
    let arr = [];
    if (obj.type === 'file') {
       arr.push(obj.name);
    } else {
            obj.children.forEach(child => { 
            arr = arr.concat(findFilesRecursively(child));
            return arr;
        });
    }
    return arr;
}
const arrayOfFiles = findFilesRecursively(root);
console.log("Array of file names = ", arrayOfFiles);



//Task 4

console.log("\nTask 4\n");
console.log("ES6\n");
class Person {
    constructor(name, phone) {
        this.name = name;
        this.phone = phone;
    }

    introduce() {
        console.log(`Привіт, мене звати ${this.name}, мій номер ${this.phone}`);
    }
}

class Student extends Person {

    constructor(name, phone, course) {
        super(name, phone);
        this.course = course;
    }

    study() {
        console.log(`Я навчаюся на ${this.course} курсі`);
    }

    
}

class Teacher extends Person {
    constructor(name, phone, subject) {
        super(name, phone);
        this.subject = subject;
    }

    teach() {
        console.log(`Я викладаю ${this.subject}`);
    }

}

const student = new Student('Victoria', '0957653487', 4);
student.introduce();
student.study();

const teacher = new Teacher('Artem', '0957831987', 'Philosophy');
teacher.introduce();
teacher.teach();

console.log("\nES5\n");

function PersonOldStyle(name, phone) {
    this.name = name;
    this.phone = phone;
}

PersonOldStyle.prototype.introduce = function() {
    console.log(`Привіт, мене звати ${this.name}, мій номер ${this.phone}`);
};


function StudentOldStyle(name, phone, course) {
    PersonOldStyle.call(this, name, phone);
    this.course = course;
}

StudentOldStyle.prototype = Object.create(PersonOldStyle.prototype);
StudentOldStyle.prototype.constructor = StudentOldStyle;
StudentOldStyle.prototype.study = function() {
    console.log(`Я навчаюся на ${this.course} курсі`); 
}

const studentOldStyle = new StudentOldStyle('Anna', '0956900911', 2);
studentOldStyle.introduce();
studentOldStyle.study();


function TeacherOldStyle(name, phone, subject) {
    PersonOldStyle.call(this, name, phone);
    this.subject = subject;
}

TeacherOldStyle.prototype = Object.create(PersonOldStyle.prototype);
TeacherOldStyle.prototype.constructor = TeacherOldStyle;
TeacherOldStyle.prototype.teach = function() {
    console.log(`Я викладаю ${this.subject}`);
}

const teacherOldStyle = new TeacherOldStyle('Maria', '0934569876', 'Biology');
teacherOldStyle.introduce();
teacherOldStyle.teach();

