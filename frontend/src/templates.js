export const jobsTemplate = (jobDTO) => {
  var job = jobDTO.job;
  var date = new Date(job.createdAt).toDateString();
  var t = "#" + job.tech[0];
  for (let i = 1; i < job.tech.length; i++) {
    t += " \xa0\xa0\xa0\xa0 #" + job.tech[i];
  }

  return `
  <div class="card">
      <div class="card-body">
          <h4 class="card-title title-style">${job.title}</h4>
          <p class="firmName"><b> ${jobDTO.firmName}</b></p>
          <i class='fas fa-map-marker-alt' style='color:#e65c00'></i> ${jobDTO.location} <br>
          <p class='far fa-clock' style='color:#595959'> <b>${date}<b></p><br>
          <p style='color:#404040'>${t} &nbsp <span style="background-color:#e65c00; color:white;">${job.seniority}</span></p>
          <img src="http://localhost:9000/${jobDTO.firmImage}" class="firmImage"/>
          <button class="gray-button" value="${job._id}">View more</button>
      </div>
  </div>

  `;
};

export const jobTemplate = (jobDTO) => {
  var job = jobDTO.job;
  var date = new Date(job.createdAt).toDateString();
  var requirements = job.requirements.split(".");

  var requirementsTemplate = " ";
  for (let r of requirements) {
    requirementsTemplate += "<li>" + r + "</li>";
  }

  var techTemplate = "#" + job.tech[0];
  for (let i = 1; i < job.tech.length; i++) {
    techTemplate += " \xa0\xa0\xa0\xa0 #" + job.tech[i];
  }

  return `
  <div class="card">
      <div class="card-body">
          <h4 class="card-title title-style">${job.title}</h4>
          <p class="firmName"><b> ${jobDTO.firmName}</b></p>
          <i class='fas fa-map-marker-alt' style='color:#e65c00'></i> ${jobDTO.location} <br>
          <p class='far fa-clock' style='color:#595959'> <b>${date}<b></p><br><br>
          <p class="description">${job.description}</p>
          <p  class="details">Job Description, Requirements: <br> <span >${requirementsTemplate}</span></p>
          <p style='color:#404040'>${techTemplate} &nbsp <span style="background-color:#e65c00; color:white;">${job.seniority}</span></p>
          <img src="http://localhost:9000/${jobDTO.firmImage}" class="firmImageJob"/>
      </div>
  </div>

  `;
};

export const fieldOfWorkTemplate = (fields) => {
  var options = "";
  for (let field of fields) {
    options += `<option>` + field.fieldName + `</option>`;
  }

  return `<select class="form-control" id="select"> ${options} </select>`;
};

export const filtersTemplate = () => {
  var threeDays = new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString();
  var sevenDays = new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString();
  var twoWeeks = new Date(Date.now() - 1000 * 60 * 60 * 24 * 14).toISOString();

    return `
    <table id="filters">
      <tr>
        <th colspan="4">Filter jobs</th>
      </tr>
      <tr>
        <td>
          <select class="form-control" id="seniority">
            <option value="" disabled selected hidden>Seniority</option>
            <option value="junior">Junior</option>
            <option value="senior">Senior</option>
            <option value="medior">Medior</option>
          </select>
        </td>
        <td>
          <select class="form-control" id="worktime">
            <option value="" disabled selected hidden>Time work</option>
            <option value="true">Full time</option>
            <option value="false">Part time</option>
          </select>
        </td>
        <td>
          <select class="form-control" id="date">
            <option value="" disabled selected hidden>Date</option>
            <option value=${threeDays}>posted at last 3 days</option>
            <option value=${sevenDays}>posted at last 7 days</option>
            <option value=${twoWeeks}>posted at last two weeks</option>
          </select>
        </td>
        <td>
          <button class="btn btn-block btn-primary" style="background-color:black;">Filter</button>
        </td>
      </tr>
    </table>
  `;
};
