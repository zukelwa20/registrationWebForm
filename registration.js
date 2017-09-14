module.exports = function(models) {
    const showForm = function(req, res, next) {
        res.redirect('/')
    }

     function addFun(req, fn) {
  var regNumber = req.body.name;
  // if(regNumber)
       models.registrationNames.findOne({
        name: regNumber

      }, function(err, regResults) {
        //console.log greetedPerson);
        if (err) {
          console.log(err);
        } else if (regResults) {
          console.log(regResults);
          regResults.save(fn);
       } else {
          models.registrationNames.create({
            name: regNumber
          }, fn);
        }
      });
    }

          var allreg = function(req, res) {
        var regNumber = req.body.name;
        console.log(regNumber);
        models.registrationNames.find({}, function(err, results) {
            if (err) {
                console.log(err);
            } else {
                res.render('/reg', {
                    name: results
                })
            }

        });

      }
    return {
        showForm,
        addFun,
        allreg

    };
}






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
