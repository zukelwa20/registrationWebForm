module.exports = function(models) {
    const showForm = function(req, res, next) {
        res.redirect('/')
    }

    // takes in a name, goes to database and looks for the name,
    // if not found create it than return it, if found just return it
    function takesName(name, fn) {

        models.greetedNames.findOne({
            name: name

        }, function(err, greetedPerson) {
            //console.log greetedPerson);
            if (err) {
                return next(err)
            } else if (greetedPerson) {
                greetedPerson.counter += 1;
                greetedPerson.save(fn);


            } else {
                models.greetedNames.create({
                    name: name,
                    counter: 1
                }, fn);
            }
        });
    }

    //this function goes to the data base and find the greeted name value and the counter
    //To show how many times the person has been greeted
    var greetedTimes = function(req, res) {
        var name = req.params.name;
        models.greetedNames.findOne({name:name}, function(err, results) {
            if (err) {
                throw (err)
            } else if (results) {
              console.log(results);
                  res.render('timesGreeted', {
                    name: results
                })
            }
        })
    }

// counts all names that has been greeted and render the msg and the laterstcounter
    var counting = function(msg, res) {
        models.greetedNames.count({}, function(err, latestCounter) {
            if (err) {
            console.log(err);
            } else {
                res.render('greeting', {
                    languageGreet: msg,
                    counter: latestCounter
                })
            }
        })

    };
    //  using "allGreeted" on different route to show all the names
    var allGreeted = function(name, res) {
        models.greetedNames.find({}, function(err, greets) {
            if (err) {
                console.log(err);
            } else if (greets) {
                res.render('greeted', {
                    greets
                })
            } else {
                console.log(result);
                return result
            }
        })
    };


    // takes in a name and a Language and compiles a greeting
    function compileGreeting(name, lang) {
        //fn(null, {
        return lang + name
        //});
    }

    // console.log(allGreeted());
    const greetNames = function(req, res, next) {
        var Language = req.body.Language;
        var name = req.body.name;
        var arr = [];
        takesName(name, function(err, result) {
            if (err) {
                return next(err)
            } else {
                // calling the compiler function, it renders the view
                var msg = compileGreeting(name, Language);
                counting(msg, res);
            }
        });
    };
    //resets the names entered to greeted rout
    var resetFun = function(req, res) {
        models.greetedNames.remove({}, function(err, result) {
            if (err) {
          // throw (err)
            } else {
                return result
            }
        })
    }

    return {
        showForm,
        greetNames,
        allGreeted,
        greetedTimes,
        resetFun


    };
}
