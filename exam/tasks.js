// ! Har bir masalaga 10 daqiqadan vaqt sarflang oshib ketmasin...

// Masala - 1

// Arraydagi eng katta sonni topish kerak for loop bilan

// const numbers = [23, 45, 67, 89, 34, 56, 33, 151, 78, 20];
// let result = 0
// for (let i = 0; i < numbers.length; i++) {
//     const element = numbers[i];
//     if (element>result) {
//         result=element
//     }
// }
// console.log(result)



// Masala - 2

// Arraydagi eng uzun so'zni topib uning oxirgisidan bitta oldingi harfini topish

// const fruites = ["Olma", "Nok", "Anor", "Chegara"];
// let value="";
// for (let i = 0; i < fruites.length; i++) {
//     const element = fruites[i];
//     if (element.length>value.length) {
//         value=element
//     }
// }
// let result = value.slice(-2,-1)
// console.log(result);





// Masala - 3

// Arraydagi barcha stringning lengthini topish

// const fruites = ["Olma", "anor", "Nok"];
// let result =[]
// fruites.map(function (fruit) {
//     result.push(fruit.length)
// })


// Masala - 4

// Arrayda kamida 6 ta toq va juft son bor, va shundan juft sonlarning yarmini ya'ni 18 juft soni bo'lsa uning yarmi 9 sonini bir arrayga solib qaytarib bersin ya'ni hamma juftlarning yarmini bitta arrayga joylash kerak

// const numbers = [23, 58, 96, 31, 74, 44, 152, 531, 26];
// let result = []
// for (const element of numbers) {
//     if(element%2==0){
//         result.push(element/2)
//     }
// }
// console.log(result)



// Masala - 5

// Arraydagi katta harf bilan boshlangan so'zlarning birinchi harfini kichik qolgan harfini katta qilib, kichik harf bilan boshlanganlarini birinchi harfini katta qolganlarini kichkina qib bersin

// const fruites = ["olma", "o'rik", "Nok", "avacado"];
// let result= []
// for (const Item of fruites) {
//     let letter= Item.charAt(0)
//     if(Item.charAt(0)==letter.toLowerCase()){
//         result.push(`${letter.toUpperCase()}${Item.slice(1).toLowerCase()}`)
//     }else if(Item.charAt(0)==letter.toUpperCase()){
//         result.push(`${letter.toLowerCase()}${Item.slice(1).toUpperCase()}`)
//     }
// }
// console.log(result);



// Masala - 6

// Promptdan bir so'z kiritish kerak va shu so'zni 3 marta space bilan chiqarib berish kerak for loop da

// example: olma => olma olma olma

// let client_value =prompt("biron narssa yozing","olma")
// let res =[]
// for (let i = 0; i < 3; i++) {
//     res.push(client_value)
    
// }
// let result= res.join(" ")
// console.log(result);


// Masala - 7
// Ichma ich array bor va shu arrayning juft arraylarning birinchi elementining birinchi harflarini birlashtirib qaytarib bersin

// example: const fruitesArray = [["Olma"],["Bexi"],["Anor"],["Xurmo"],["GIlos"],["Kiwi"],["Banan"],];  => BXK
// let fruitesArray = [["Olma"],["Bexi"],["Anor"],["Xurmo"],["GIlos"],["Kiwi"],["Banan"],]; 

// let result = [];

// for (let i = 1; i < fruitesArray.length; i +=2) {  
//     const element = fruitesArray[i][0];  
//     result.push(element[0]);  
// }

// console.log(result.join(''));
