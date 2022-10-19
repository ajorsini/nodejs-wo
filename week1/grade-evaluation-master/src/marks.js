// Define a function to calculate the total marks and return a promise
const calculateTotalMarks = (math, english, science, social, language) => {
    return new Promise((resolve, reject) => {
        let s = math + english + science + social + language;
        if(isNaN(s)) {
            return reject('Null values for marks');
        } else {
            return resolve({ 's': s, 'n': 5 });
        }

    });
}
// Define a function to calculate average marks and return a promise
const calculateAverageMarks = (totalMarks) => {
    return new Promise((resolve, reject) => {
        return resolve(totalMarks.s / totalMarks.n);
    });
}
// Define a function to calculate grade and return a promise
const calculateGrade = (averageMarks)=>{
    return new Promise((resolve,reject)=>{
        let g = 'F';
        if(averageMarks > 90) g = 'A+';
        else if(averageMarks > 80) g = 'A';
        else if(averageMarks > 70) g = 'B';
        else if(averageMarks > 60) g = 'C';
        else if(averageMarks > 50) g = 'E';
        return resolve(g);
    })
}

module.exports = {
    calculateAverageMarks, calculateGrade, calculateTotalMarks
}
