const swapDigits = (number)=>{
    let swappedNumber = 0
    //write logic here
    if(number < 0) return swappedNumber;
    let si = number.toString();
    let n = si.length;
    let so = "";
    if(n%2 == 1) {
      so = si.substr(0, 1);
      for(let i=1; i<n; i+=2)
        so += si.substr(i+1, 1) + si.substr(i, 1);
    } else {
      for(let i=0; i<n; i+=2)
        so += si.substr(i+1, 1) + si.substr(i, 1);
    }
    swappedNumber = parseInt(so);
    return swappedNumber;
}

module.exports = swapDigits
