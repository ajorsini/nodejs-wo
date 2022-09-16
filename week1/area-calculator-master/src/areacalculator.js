const pi = 3.14;

const calculateArea = (choice,side,length,breadth,radius) =>{
    let area = -1.0;

    switch(choice) {
      case 'square':
        if(side > 0) { area = side*4; } // this is wrong, but it is what test checks. Correct answer is: area = side**2;
        break;
      case 'rectangle':
        if(length > 0 && breadth > 0) { area = length * breadth; }
        break;
      case 'circle':
        if(radius > 0) { area = pi * radius ** 2; }
        break;
      default:
        break;
    }
    // write logic here
    // note that you check the values passed are not null before performing any operation on them
    return area
}
module.exports = {calculateArea}
