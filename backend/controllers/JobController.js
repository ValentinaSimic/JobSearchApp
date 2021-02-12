const Job = require("../models/Job");
const Location = require("../models/Location");
const Firm = require("../models/Firm");
const FieldOfWork = require("../models/FieldOfWork");


module.exports = {
  addLocation: async (req, res) => {
    console.log(req.body);
    const location = new Location({
      city: req.body.city,
      zipCode: req.body.zipCode,
    });

    try {
      const l1 = await location.save();
      res.status(201).json(l1);
    } catch (err) {
      res.send("Reason for the error: " + err);
    }
  },
  addFirm: async (req, res) => {
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
  },
  addFieldOfWork: async (req, res) => {
    const fieldOfWork = new FieldOfWork({
      fieldName: req.body.fieldName,
    });

    try {
      await fieldOfWork.save();
      res.status(201).json(fieldOfWork);
    } catch (err) {
      res.send("Reason for the error: " + err);
    }
  },
  addJob: async (req, res) => {
    const idFirm = req.params.idFirm;
    const idFieldOfWork = req.params.idFieldOfWork;

    const job = new Job({
      title: req.body.title,
      description: req.body.description,
      requirements: req.body.requirements,
      tech: req.body.tech,
      seniority: req.body.seniority,
    });

    try {
      const firm = await Firm.findById(idFirm);
      const fieldOfWork = await FieldOfWork.findById(idFieldOfWork);

      job.firm = firm;
      job.fieldOfWork = fieldOfWork;

      await job.save();
      firm.jobs.push(job);
      fieldOfWork.push(job);

      await job.save();
      await fieldOfWork.save();

      res.status(201).json(job);
    } catch (err) {
      res.send("Reason for the error: " + err);
    }
  },
  getAllFieldsOfWork: async (req, res) => {
    try {
      const fields = await FieldOfWork.find();
      res.json(fields);
    } catch (err) {
      res.send("Reason for the error: " + err);
    }
  },
  getAllJobs: async (req, res) => {
    try {
      const field = await FieldOfWork.findOne({ fieldName: req.params.fieldOfWork });
      const location = await Location.findOne({ city: req.params.location });
      const firms = await Firm.find({ location: location._id });
      var allJobs = [];
      Promise.all(
        firms.map(async (firm) => {
          const jobs = await Job.find({
            firm: firm._id,
            fieldOfWork: field._id,
          });
          for (j of jobs) {
            allJobs.push({
              job: j,
              firmName: firm.firmName,
              firmImage: firm.firmImage,
              location: location.city,
            });
          }
        })
      ).then(() => res.json(allJobs));
    } catch (err) {
      res.send("Reason for the error: " + err);
    }
  },
  getFilter: async (req, res) => {
    try {
      var jobs = await Job.find({ 
        seniority: req.params.seniority,
        fulltime: req.params.worktime,
        createdAt: {
          $gte: new Date(req.params.date).toISOString(),
          $lt: new Date(Date.now()).toISOString(),
        },
      });
      var jobsDTO = [];
      Promise.all(
        jobs.map(async (job) => {
          const firm = await Firm.findById(job.firm);
          const location = await Location.findById(firm.location);
          jobsDTO.push({
            job,
            firmName: firm.firmName,
            irmImage: firm.firmImage,
            location: location.city,
          });
        })
      ).then(() => res.json(jobsDTO));
    } catch (err) {
      res.send("Reason for the error: " + err);
    }
  },
  getJob: async (req, res) => {
    try {
      const job = await Job.findById(req.params.id);
      const firm = await Firm.findById(job.firm);
      const location = await Location.findById(firm.location);
      res.json([
        {
          job,
          firmName: firm.firmName,
          firmImage: firm.firmImage,
          location: location.city,
        },
      ]);
    } catch (err) {
      res.send("Reason for the error: " + err);
    }
  }
 
};

