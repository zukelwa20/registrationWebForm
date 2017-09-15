module.exports = function(models) {
    const showForm = function(req, res, next) {
        res.redirect('/')
    }

    function addFun(req, res) {
        var regNumber = req.body.name;
        console.log(regNumber);
        // if(regNumber)
        models.registrationNames.find({},
            function(err, regResults) {
              console.log(regResults);
              res.render("regNum", {name: regResults}),
              models.registrationNames.findOne({name:regNumber}, function(err, results){
                if(err){
                  console.log(err)
                }
                else if(results){
                   results.save("regNumber")
                   }
                   else {
                     models.registrationNames.create({name:regNumber})
                   }
                 });
              })
    }



    return {
        showForm,
        addFun
        // allreg
    };
}


//   var allreg = function(req, res) {
// var regNumber = req.body.name;
// console.log(regNumber);
// models.registrationNames.find({}, function(err, results) {
//     if (err) {
//         console.log(err);
//     } else {
//         res.render('/reg', {
//             name: results
//         })
//     }
//
// });




//     models.registrationNames.create({name: regNumber}, function(err, regResults){
//       if(err){
//         console.log(err)
//       }
//       else if(regResults){
//         regResults.save()
//       }
//     })
// }

// else if(results){
//   res.render('regNum', {name:results})
// }
// else {
//   models.registrationNames.create({name})
// }
// })
// }
