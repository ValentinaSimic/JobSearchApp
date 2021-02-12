import { JobSearch} from './JobSearch';

const jobSearch = new JobSearch('#search-form', '.result-container','.gray-button','#fields','#filter-form');
jobSearch.configureFromListener();
jobSearch.populateSelection();
jobSearch.filterJobs();
jobSearch.clickedListener();





