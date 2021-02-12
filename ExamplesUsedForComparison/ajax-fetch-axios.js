//AJAX with callbacks
const SendHttpRequest = (url, clbFunction) => {
    var xhttp;
    xhttp=new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        clbFunction(this.response);
      }
    };
    xhttp.open("GET", url);
    xhttp.responseType='json'
    xhttp.send();
  }

  clickedListener(req,res){
    this.resultsContainer.addEventListener('click', function(event) {
        if(event.target.classList.contains('gray-button')) {
            var idJob = document.querySelector('.gray-button').value;
            const url = "http://localhost:9000/jobs/" + idJob
            SendHttpRequest(url, (results) => {
                var t = results.map((job) => jobTemplate(job)).join("");
                document.querySelector('.result-container').innerHTML = t
            })   
        }
    });
}

//AJAX with Promises
const SendHttpRequest = (url) => {
  const promise = new Promise((resolve, reject) => {
  var xhttp;
  xhttp=new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      resolve(xhttp.response)
    }
   
  };
  xhttp.onerror = () => {
      reject("Something went wrong!")
  }

  xhttp.open("GET", url);
  xhttp.responseType='json'
  xhttp.send();

  })
  return promise;
};

clickedListener(req,res) {
  this.resultsContainer.addEventListener("click", function (event) {
    if (event.target.classList.contains("gray-button")) {
      var idJob = document.querySelector(".gray-button").value;
      const url = "http://localhost:9000/jobs/" + idJob;
      SendHttpRequest(url)
        .then((results) => {
          return results.map((job) => jobTemplate(job)).join("");
        })
        .then(
          (jobs) =>
            (document.querySelector(".result-container").innerHTML = jobs)
        );
    }
  });
}

//Fetch with Promises

clickedListener () {    
  this.resultsContainer.addEventListener('click', function(event) {
  if(event.target.classList.contains('gray-button')) {
      
      var idJob = document.querySelector('.gray-button').value;
      console.log(idJob)
      fetch("http://localhost:9000/jobs/" + idJob)
      .then( response => response.json())
      .then(( results )=>{
          return results
              .map(job => jobTemplate(job))
              .join('');
      })
      .then(jobs => document.querySelector('.result-container').innerHTML = jobs)
   }
  });
}

//Fetch with Async/Await
clickedListener () {
        
  this.resultsContainer.addEventListener('click', function(event) {
  if(event.target.classList.contains('gray-button')) {
      
      var idJob = document.querySelector('.gray-button').value;
      (async () => {
          const res = await fetch("http://localhost:9000/jobs/" + idJob)
          const results = await res.json();

          const t =  results.map(job => jobTemplate(job)).join('');
          document.querySelector('.result-container').innerHTML = t   
      })();   
   }
  });
}
//Axios with Async/Await
//install axios, add from svn
clickedListener () {
        
  this.resultsContainer.addEventListener('click', function(event) {
  if(event.target.classList.contains('gray-button')) {

      var idJob = document.querySelector('.gray-button').value;
      (async () => {
          const results = await axios.get("http://localhost:9000/jobs/" + idJob)
          const t =  (results.data).map(job => jobTemplate(job)).join('');
          document.querySelector('.result-container').innerHTML = t   
      })();
   }
  });
}

//Axios with Promises
clickedListener () {     
  this.resultsContainer.addEventListener('click', function(event) {
  if(event.target.classList.contains('gray-button')) {
      
      var idJob = document.querySelector('.gray-button').value;
      console.log(idJob)
      axios.get("http://localhost:9000/jobs/" + idJob)
      .then(( results )=>{
          return (results.data)
              .map(job => jobTemplate(job))
              .join('');
      })
      .then(jobs => document.querySelector('.result-container').innerHTML = jobs)
   }
  });
};





