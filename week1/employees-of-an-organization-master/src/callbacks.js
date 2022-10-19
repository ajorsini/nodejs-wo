
   // Define a getEmployee function that iterates over the employees list and displays it
   // Employees must be displayed after a timeout of 1 second.
   getEmployee = (employees, callback) => {
       setTimeout(() => {
           return callback(undefined, employees.map(e => e.name));
       }, 1000);
   }

   // Define a function that creates a new employee after 2 seconds.
   // and then makes a call to callback function to display the same.
   createEmployee = (employees, employee, callback) => {
       setTimeout(()=>
       {
           employees.push(employee);
           getEmployee(employees, (err, result) => {
             if(err) console.log('Error: ${err}');
             else console.log(result);
           });
           return callback(undefined, employees);
       }, 2000);
   }

   module.exports = {getEmployee, createEmployee}
