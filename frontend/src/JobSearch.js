import  "babel-polyfill";
import {
  jobsTemplate,
  jobTemplate,
  fieldOfWorkTemplate,
  filtersTemplate,
} from "./templates";

// const SendHttpRequest = (url) => {
//   return fetch(url).then( response => {
//     if (response.status >= 400) {
//       return response.json().then(errResData => {
//         const err = new Error('Something went wrong!');
//         err.data = errResData;
//         throw err;
//       });
//     }
//     return response.json()
//   })
// }

export class JobSearch {
  constructor(
    searchFormSelector,
    resultsContainerSelector,
    grayButtonSelector,
    fieldsSelector,
    filterFormSelector,
    linkSlector
  ) {
    this.searchForm = document.querySelector(searchFormSelector);
    this.resultsContainer = document.querySelector(resultsContainerSelector);
    this.grayButton = document.querySelector(grayButtonSelector);
    this.fiedls = document.querySelector(fieldsSelector);
    this.filterForm = document.querySelector(filterFormSelector);
    this.link = document.querySelector(linkSlector);
  }

  configureFromListener() {
    this.searchForm.addEventListener("submit", (event) => {
      event.preventDefault();
      this.resultsContainer.innerHTML = "";
      var location = this.searchForm.querySelector("#location").value;
      var fieldOfWork = this.searchForm.querySelector("#select").value;

      fetch("http://localhost:9000/getJobs/" + location + "/" + fieldOfWork)
        .then((response) => response.json())
        .then((results) => {
          localStorage.setItem("users", JSON.stringify(results));
          return results.map((job) => jobsTemplate(job)).join("");
        })
        .then((jobs) => {
          this.resultsContainer.innerHTML = jobs;
          this.filterForm.innerHTML = filtersTemplate();
        }).catch((err) => console.log(err))
    });
  }

  clickedListener () {    
    this.resultsContainer.addEventListener('click', function(event) {
    if(event.target.classList.contains('gray-button')) {
        var idJob = document.querySelector('.gray-button').value;
        // console.log(idJob)
        // const url = "http://localhost:9000/getJob/" + idJob
        // SendHttpRequest(url)
        fetch("http://localhost:9000/getJob/" + idJob)
        .then((response) => response.json())
        .then(( results )=>{
            return results
                .map(job => jobTemplate(job))
                .join('');
        })
        .then(jobs => document.querySelector('.result-container').innerHTML = jobs)
        .catch(err => console.log(err))
     }
    });
  }
  populateSelection() {
    document.addEventListener("DOMContentLoaded", () => {
      fetch("http://localhost:9000/getFieldsOfWork")
        .then((response) => response.json())
        .then((results) => {
          return fieldOfWorkTemplate(results);
        })
        .then(
          fields => document.querySelector("#fields").innerHTML = fields
        ).catch( err => console.log(err))
    });
  }
  filterJobs() {
    this.filterForm.addEventListener("submit", (event) => {
      event.preventDefault();
      var seniority = document.querySelector("#seniority").value;
      var worktime = document.querySelector("#worktime").value;
      var date = document.querySelector("#date").value;
      var jobs = JSON.parse(localStorage.getItem("users") || "[]");

      var filterJobs = [];
      for (let j of jobs) {
        if (j.job.seniority === seniority) {
          if (JSON.stringify(j.job.fulltime) === worktime) {
            if (j.job.createdAt >= date) {
              filterJobs.push(j);
            }
          }
        }
      }
      var t = filterJobs.map((job) => jobsTemplate(job)).join("");
      this.resultsContainer.innerHTML = t;
    });
  } 
}