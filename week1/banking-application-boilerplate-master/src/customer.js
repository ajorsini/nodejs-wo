var customerList=[];

const addCustomer=(CustomerId, CustomerName, CustomerAge, CustomerAddress, CustomerContactNumber, Category)=>{
      // Write the Logic here
      let i = customerList.find(c => c[0] === CustomerId);
      if(!i)
        customerList.push([CustomerId, CustomerName, CustomerAge, CustomerAddress, CustomerContactNumber, Category])
}

const updateCustomer=(CustomerId, CustomerName, CustomerAge, CustomerAddress, CustomerContactNumber, Category)=>{
      // Write the Logic here
      let i = customerList.find(c => c[0] === CustomerId);
      if(i) {
        i[1] = CustomerName;
        i[2] = CustomerAge;
        i[3] = CustomerAddress;
        i[4] = CustomerContactNumber;
        i[5] = Category;
      }
}

const getAllCustomers=()=>{
  // Write the Logic here
  return customerList;
}

module.exports={addCustomer,updateCustomer,getAllCustomers}
