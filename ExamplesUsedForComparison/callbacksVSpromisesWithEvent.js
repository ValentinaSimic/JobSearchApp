//the state of object is unchanged, works well only on the first event  
getFilter() {
  console.log(this.filterForm)
   var p1 = new Promise( function(resolve, reject) {
     
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
         if (t != "undefined") {
           resolve(t);
         } else {
           reject("Nije pronadjen ni jedan posao");
         } 
       });
   }.bind(this))
   p1.then((t)=>this.resultsContainer.innerHTML = t)
 }

//a new Promise object is created every time, unnecessary
getFilter () {
  this.filterForm.addEventListener("submit", (event) => {
    event.preventDefault();
    var p1 = new Promise(function(resolve, reject){
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
        if(t !== 'undefined'){
          resolve(t)
        } else {
          reject("Nije pronadjen ni jedan posao")
        }
    })
    p1.then((t) => this.resultsContainer.innerHTML = t)
  })
}