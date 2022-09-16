
const PerformanceCalculator=(runs,balls)=>{
      // Write the Logic here
      let p = runs / balls;
      let a = 1.0;
      if(runs > 100 && balls < 50) a = 1.2;
      else if(runs > 50 && balls < 20) a = 1.1;
      else if(runs > 30 && balls < 15) a = 1.01;
      return p*a;
}

module.exports={PerformanceCalculator}
