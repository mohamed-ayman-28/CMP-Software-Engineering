let employee = [
  { id: '1', name: 'Mohamed Sayed' },
];

exports.getEmployees = async (req, res, next) => {
  try{
    res.status(200).json({ data: employee });
    console.log(employee);
  }catch(e){
    res.status(500).json({message : "internal server error"});
  }
};

// TODO
exports.deleteEmployee = async (req, res, next) => {
  try{
    const arr = req.url.split('/');
    const id = arr[arr.length - 1];
    const prevLength = employee.length;
    employee = employee.filter(item => item.id !== id);    
    if(prevLength === employee.length){
      res.status(400).json({message : "invalid id"});
    }else{
      res.status(200).json({message : "deleted successfully"});
    }
  }catch(e){
    res.status(500).json({message : "internal server error"});
  }
};

// TODO
exports.createEmployee = async (req, res, next) => {
  try{
    if((req.body === null) || (req.body === undefined)){
      res.status(400).json({message : "request body missing"});
    }else{
      if((req.body.id === null) || (req.body.id == undefined) || (req.body.name == undefined) || (req.body.name == undefined)){
        res.status(400).json({message : "id or name missing"});
      }else{
        const newEmployee = {id : req.body.id, name : req.body.name};
        employee.push(newEmployee);
        res.status(200).json({message : "employee added successfully"});
      }
    }
  }catch(e){
    res.status(500).json({message : "internal server error"});
  }
};
