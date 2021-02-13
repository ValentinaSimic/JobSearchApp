# JobSearch App 
> App implemented for needs of the master's thesis, for the purpose of comparing the three most known asynchronous patterns in JavaScript: Callbacks, Promises and Async/Await.

## Table of contents
* [General info](#general-info)
* [Demo](#demo)
* [Technologies](#technologies)
* [Functionality](#functionality)
* [Status](#status)


## General info
The motivation for implementing such an application lies in the desire for a deep understanding of asynchronous programming in JS, 
as one of the most challenging areas. The basic idea was to demonstrate the acquired knowledge on a real example,
where we can clearly compare each of the asynchronous patterns on real example. Actually to see in which situation we need to use which pattern and 
to get the best of it, and perhaps to see in which situation isn't possible to use certain pattern.
All app is implemented using JS, for back-end as well as for front-end side.
Examples used for comparison are storred in ExampleUsedForComaprison folder.

## Demo
![jobSearch gif](./demo/jobSearch.gif) 


## Technologies
* Vanilla JS
* HTML5, SCSS
* Parcel, for web packing.
* NodeJS, Express framework-it was used to implement business logic.
* MongodDB- Database is located locally on the computer, NoSql Booster was used for the work.


## Functionality
First, the user selects the location and field of job in which he wants to search.
Clicking the button will display the results that satisfy the search, as well as a menu for filtering the displayed jobs.
The user can filter the displayed jobs by seniority, work-time or date. Each job advertisment can be viewed at in more detail.

There is no user interface for admin side, 
but admin methods, such as adding data, are used by the Postman.

## Status
Project is: _possibility to upgrade_


## Contact
Created by [@ValentinaSimic](https://github.com/ValentinaSimic) - feel free to contact me!




