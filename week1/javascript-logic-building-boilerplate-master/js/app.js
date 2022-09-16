// Please refer below data to provide solution for below requirements

let empDetails = [
    {id:1,name:"Roger",salary:50000,Bonus:1000,appraisal:80},
    {id:2,name:"David",salary:55000,Bonus:1000,appraisal:70},
    {id:3,name:"Alison",salary:65000,Bonus:1000,appraisal:90},
    {id:4,name:"Anthony",salary:70000,Bonus:1000,appraisal:95},
    {id:5,name:"Kristen",salary:80000,Bonus:1000,appraisal:98},
];

//1. Create a function name 'arrangeEmpDetails' to sort the employee details name wise by using
// arrays, functions and anonymous functions

// Correct the function name as per test case requirement
function arrangeEmpDetails(data)
{
  var f;
  switch(typeof empDetails[0][data]) {
    case 'string':
      f = (a, b) => {return a[data].localeCompare(b[data])};
      break;
    case 'number':
      f = (a, b) => {return a[data]-b[data]};
      break;
    default:
      f = (a, b) => {return 0};
      break;
    }
    empDetails.sort(f);
}

// let sortedemp = arrangeEmpDetails(empDetails)
// console.log(sortedemp);


//2. Display all the employee details in single array using array functions and arrow function
//   Refer below mentioned structure
//   ['1 ---- Shyam ---- 50000',
//    '2 ---- Karthik ---- 55000']

const displayEmp = empDetails.map((emp)=>{
    return `${emp.id} ${emp.name} ${emp.salary} ${emp.Bonus} ${emp.appraisal}`;
})

// console.log(displayEmp);

//3. Display the total Income of all the employees whose names starting with 'A'
// by using array functions and modern javascript code

const totalsal = empDetails
.filter(emp => emp.name.startsWith('A'))
.reduce((total,emp)=> (total) + (emp.salary) + (emp.Bonus),0);

// console.log(totalsal);

//4. Find the maximum appraisal rating from the given array by using array functions
//   And then create a function to display the percentage of hike as per below details
//   maxappraisalscore >= 100 :: '20% hike to be given'
//   maxappraisalscore > 90 && maxappraisalscore < 100 ::    resolve('10% hike to be given'
//   maxappraisalscore > 85 && maxappraisalscore <= 90 :: resolve('5% hike to be given');
//   Otherwise :: 'Unfortunately, you are not eligible for a hike'


let maxappraisalscore = empDetails.reduce((max,emp)=> emp.appraisal > max? emp.appraisal:max,0);

// Correct the function name as per test case requirement
function getAppraisalPct(maxappraisalscore)
{
    var r = Promise.resolve('Unfortunately, you are not eligible for a hike');
    if (maxappraisalscore >= 100) r = Promise.resolve('20% hike to be given');
    else if (maxappraisalscore > 90) r = Promise.resolve('10% hike to be given');
    else if (maxappraisalscore > 85) r = Promise.resolve('5% hike to be given');
    return r;
}


module.exports = {
    arrangeEmpDetails,
    getAppraisalPct,
};
