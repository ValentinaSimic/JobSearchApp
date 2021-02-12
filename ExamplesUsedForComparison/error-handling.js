//Error handling with Callbacks
(req, res) => {

  const idLocation = req.params.idLocation;

  const firm = new Firm({
    firmName: req.body.firmName,
    firmImage: req.file.path,
  });

  Location.findById(idLocation, (err, location) => {
      if(err){
          res.send("Reason for the error: " + err)
          firm.location = location
          firm.save((err, firm)=> {
              if(err){
                  res.send("Reason for the error: " + err)
              }
              location.firms.push(firm);
              location.save((err) => {
                  if(err){
                      res.send("Reason for the error: " + err)
                  }
                  res.status(201).json(firm)
              })
          })
      }

  })
}
// Error handling with Promise
  (req, res) => {
    const idLocation = req.params.idLocation;

    const firm = new Firm({
      firmName: req.body.firmName,
      firmImage: req.file.path,
    });

    Location.findById(idLocation)
      .then((location) => {
        firm.location = location;
        firm.save()
          .then((firm) => {
            location.firms.push(firm);
            location.save()
              .then(() => res.status(201).json(firm))
              .catch((err) => res.send("Reason for the error: " + err));
          })
          .catch((err) => res.send("Reason for the error: " + err));
      })
      .catch((err) => res.send("Reason for the error: " + err));
  }
//Error handling with Async/Await
async (req, res) => {
  const idLocation = req.params.idLocation;

  const firm = new Firm({
    firmName: req.body.firmName,
    firmImage: req.file.path,
  });
  try {
    const location = await Location.findById(idLocation);
    firm.location = location;

    await firm.save();

    location.firms.push(firm);
    await location.save();

    res.status(201).json(firm);
  } catch (err) {
    res.send("Reason for the error: " + err);
  }
}