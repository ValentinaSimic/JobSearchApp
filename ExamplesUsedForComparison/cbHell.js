//Callbacks Hell
(req, res) => {
    city = req.params.city;

    FieldOfWork.findOne({ fieldName: req.params.field }, (err, field) => {
      if (err) {
        res.send("Reason for the error: " + err);
      }
      var allJobs = [];
      Location.findOne({ city: city }, (err, location) => {
        if (err) {
          res.send("Reason for the error: " + err);
        }
        Firm.find({ location: location._id }, (err, firms) => {
          if (err) {
            res.send("Reason for the error: " + err);
          }
          for (let firm of firms) {
            Job.find({ firm: firm._id }, (err, jobs) => {
              if (err) {
                res.send("Reason for the error: " + err);
              }
              for (j of jobs) {
                if (
                  JSON.stringify(j.fieldOfWork) === JSON.stringify(field._id)
                ) {
                  allJobs.push({
                    job: j,
                    firmName: firm.firmName,
                    firmImage: firm.firmImage,
                    location: location.city,
                  });
                }
              }
              if (firms.indexOf(firm) === firms.length - 1) {
                res.json(allJobs);
              }
            });
          }
        });
      });
    });
  }

//Promise pattern is better then Callbacks
(req, res) => {
  city = req.params.city;
  var allJobs=[];
  var location;
  var field;
  FieldOfWork.findOne({fieldName: req.params.field})
  .then((f) => {
    field=f;
     return Location.findOne({city: city})
  })
  .then((l) => {
    location=l;
      return Firm.find({location: location})
  })
  .then((firms)=>{
      for(let f of firms) {
        Job.find({firm: f._id, fieldOfWork: field})
        .then((jobs)=>{
          Promise.all(
            jobs.map((job) => {
              allJobs.push({job:job, firmName: f.firmName, firmImage: f.firmImage, location: location.city})
            })  
          ).then(()=> {
            if(firms.indexOf(f) === firms.length-1){
              res.send(allJobs)
            }  
          }).catch(err => res.send("Reason for the error: " + err))
        })
      }
  })
}

// The best -> Async/Await
async (req, res) => {
  try {
    const field = await FieldOfWork.findOne({ fieldName: req.params.field });
    const location = await Location.findOne({ city: req.params.city });
    const firms = await Firm.find({ location: location._id });
    var allJobs = [];
    Promise.all(
      firms.map(async (firm) => {
        const jobs = await Job.find({ firm: firm._id, fieldOfWork: field._id });
        for( j of jobs) {
            allJobs.push({job:j, firmName: firm.firmName, firmImage: firm.firmImage, location: location.city})
        }
      })
    ).then(() => res.json(allJobs));
  } catch (err) {
    res.send("Reason for the error: " + err);
  }
};