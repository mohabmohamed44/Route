// First Problem


/* 
var num = window.prompt("Enter a number: ");
console.log(num);
*/ 


// Second Problem


/*

var num = +window.prompt("Enter a number: ");
if(num % 3 === 0 && num % 4 === 0) {
    console.log("Yes");
} else {
    console.log("No");
}
*/



// Third Problem


/*

var num1 = +window.prompt("Enter a 1st number: ");
var num2 = +window.prompt("Enter a 2nd number: ");
var max = num1 > num2 ? num1 : num2; 
console.log(max);

*/ 



// fourth problem 

/*
var number = window.prompt("Enter a number: ");

number = +number // Convert the input to a number

if (number < 0) {
    console.log("negative");
} else if (number > 0) {
    console.log("positive");
} else {
    console.log("zero");
}


*/


// Fifth Problem


/*

var num1 = +window.prompt("Enter 1st number: ");
var num2 = +window.prompt("Enter 2nd number: ");
var num3 = +window.prompt("Enter 3rd number: ");


var max = num1;
if (num2 > max) {
    max = num2;
}
if (num3 > max) {
    max = num3;
}

var min = num1;
if (num2 < min) {
    min = num2;
}
if (num3 < min) {
    min = num3;
}

console.log("max is: ", max);
console.log("min is: ",min);


*/


// 6th Problem (even or odd)

/*
var number = window.prompt("Enter a number: "); // take input from the user
var result = (number % 2 == 0) ? "even" : "odd"; // ternary operator
console.log("The number is" , result);

*/



// 7th Problem (vowels)

/*

var character = window.prompt("Enter a character: "); // take input from the user
// using if condition
if (character == "a" || character == "e" || character == "i" || character == "o" || character == "u" || character == "A" || character == "E" || character == "I" || character == "O" || character == "U") {
    console.log("vowel");
}
else {
    console.log("consonant");
}

*/

/*
// using switch case

var character = window.prompt("Enter a character: "); // take input from the user
switch(character) {
    case "a":
    case "e":
    case "i":
    case "o":
    case "u":
    case "A":
    case "E":
    case "I":
    case "O":
    case "U":
        console.log("Vowel");
        break;
    
    default:
        console.log("consonant");
}

*/


// 9th Problem (print all numbers from 1 to num)

/*

var num = +window.prompt("enter a number: ");

for(var i = 1; i <= num; i++){
    console.log(i);
}

*/




// 10th Problem (print a multiplication table up to 12.)

/*
var num = window.prompt("enter a number: ");
var result = "";
for(var i = 1; i <= 12; i++) {
    result += (num * i) + " ";
}   

console.log(result);

*/


// 11th Problem (print all even numbers from 1 to the number of even numbers)

/* (i am not sure about this solution)
var num = window.prompt("Enter a number:");
num = Number(num); // Convert the string to a number
for (var i = 2; i <= num; i += 2) {
    console.log(i);
}
    
================ another solution ===================

var num = window.prompt("enter a number: ");
for (var i = 1; i <= num; i++){
    if(i % 2 == 0){
        console.log(i);
    }
}

*/


// 12th Problem (base exponentiation)

/*
var base = window.prompt("Enter the base number:");
var exponent = window.prompt("Enter the exponent:");
base = Number(base); 
exponent = Number(exponent); 

var result = 1;

for (var i = 0; i < exponent; i++) {
    result *= base; 
}

console.log(result);
*/


// 13th Problem 


/*

// Prompt the user to enter marks for five subjects
var subject1 = window.prompt("Enter marks for subject 1:");
var subject2 = window.prompt("Enter marks for subject 2:");
var subject3 = window.prompt("Enter marks for subject 3:");
var subject4 = window.prompt("Enter marks for subject 4:");
var subject5 = window.prompt("Enter marks for subject 5:");

// Convert the entered values to numbers
subject1 = Number(subject1);
subject2 = Number(subject2);
subject3 = Number(subject3);
subject4 = Number(subject4);
subject5 = Number(subject5);

// Calculate total marks
var totalMarks = subject1 + subject2 + subject3 + subject4 + subject5;

// Calculate average marks
var averageMarks = totalMarks / 5;

// Calculate percentage (assuming each subject is out of 100)
var percentage = (totalMarks / 500) * 100;

// Output the results
console.log("Total Marks = " + totalMarks);
console.log("Average Marks = " + averageMarks);
console.log("Percentage = " + percentage + "%");

// there is something wrong is the output of the problem in the sheet 

*/


// 14TH Problem 


/*

var monthNumber = window.prompt("Enter the month number (1-12):");


monthNumber = Number(monthNumber);

var daysInMonth;


if (monthNumber === 1 || monthNumber === 3 || monthNumber === 5 || monthNumber === 7 || monthNumber === 8 || monthNumber === 10 || monthNumber === 12) {
    daysInMonth = 31;
} else if (monthNumber === 4 || monthNumber === 6 || monthNumber === 9 || monthNumber === 11) {
    daysInMonth = 30;
} else if (monthNumber === 2) {
    daysInMonth = 28; 
} else {
    console.log("Invalid month number. Please enter a number between 1 and 12.");
}

if (daysInMonth) {
    console.log("Days in Month: " + daysInMonth);
}

*/


// 15th Problem 

/*
var physics = +window.prompt("Enter marks for Physics:");
var chemistry = +window.prompt("Enter marks for Chemistry:");
var biology = +window.prompt("Enter marks for Biology:");
var mathematics = +window.prompt("Enter marks for Mathematics:");
var computer = +window.prompt("Enter marks for Computer:");


var totalMarks = physics + chemistry + biology + mathematics + computer;


var percentage = (totalMarks / 500) * 100;


var grade;
if (percentage >= 90) {
    grade = 'A';
} else if (percentage >= 80) {
    grade = 'B';
} else if (percentage >= 70) {
    grade = 'C';
} else if (percentage >= 60) {
    grade = 'D';
} else if (percentage >= 40) {
    grade = 'E';
} else {
    grade = 'F';
}


var result = "Subject Marks:\n" +
             "Physics: " + physics + "\n" +
             "Chemistry: " + chemistry + "\n" +
             "Biology: " + biology + "\n" +
             "Mathematics: " + mathematics + "\n" +
             "Computer: " + computer + "\n\n" +
             "Total Marks: " + totalMarks + " out of 500\n" +
             "Percentage: " + percentage.toFixed(2) + "%\n" +
             "Grade: " + grade;


alert(result);
console.log(result);

*/


// =================================== switch case problems ===============================================

// 1st problem

/*
var monthNumber = window.prompt("Enter the month number (1-12):");
monthNumber = Number(monthNumber);

var daysInMonth;

switch (monthNumber) {
    case 1:
    case 3:
    case 5:
    case 7:
    case 8:
    case 10:
    case 12:
        daysInMonth = 31;
        break;
    case 4:
    case 6:
    case 9:
    case 11:
        daysInMonth = 30;
        break;
    case 2:
        daysInMonth = 28; // Not considering leap years
        break;
    default:
        console.log("Invalid month number. Please enter a number between 1 and 12.");
        break;
}

if (daysInMonth) {
    console.log("Days in Month: " + daysInMonth);
}

*/



// 2nd Problem (vowels or Consonant)

/*

var alphabet = window.prompt("enter an alphabet: ");

switch(alphabet) {
    case 'a':
    case 'e':
    case 'o':
    case 'i':
    case 'u':
    case 'A':
    case 'E':
    case 'O':
    case 'U':
    case 'I':
        console.log(alphabet + " is a vowel");
        break;
    default:
        console.log(alphabet + " is a consonant");
}

*/


// 3rd Problem which number is greater

/*
var num1 = +window.prompt("enter a number: ");
var num2 = +window.prompt("enter a number: ");

switch(true){
    case num1 > num2:
        console.log(num1 + " is greater");
        break;
    case num1 < num2:
        console.log(num2 + " is greater");
        break;
    default:
        console.log("Equal");
}
*/


// 4th Problem (even or odd)

/*
var number = window.prompt("Enter a number:");
number = Number(number);

switch (number % 2) {
    case 0:
        console.log(number + " is even.");
        break;
    default:
        console.log(number + " is odd.");
}
*/


// 5th Problem (positive or negative or zero)

/*
var number = window.prompt("Enter a number:");
number = Number(number);

switch (true) {
    case (number > 0):
        console.log(number + " is positive.");
        break;
    case (number < 0):
        console.log(number + " is negative.");
        break;
    default:
        console.log(number + " is zero.");
}

*/


// 6th Problem Simple Calculator


/*
var num1 = window.prompt("Enter the first number:");
var num2 = window.prompt("Enter the second number:");
var operator = window.prompt("Enter an operator (+, -, *, /):");

num1 = Number(num1);
num2 = Number(num2);

switch (operator) {
    case '+':
        console.log("Result: " + (num1 + num2));
        break;
    case '-':
        console.log("Result: " + (num1 - num2));
        break;
    case '*':
        console.log("Result: " + (num1 * num2));
        break;
    case '/':
        if (num2 !== 0) {
            console.log("Result: " + (num1 / num2));
        } else {
            console.log("Division by zero is not allowed.");
        }
        break;
    default:
        console.log("Invalid operator.");
}



*/