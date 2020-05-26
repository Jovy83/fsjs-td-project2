/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   
// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing


/*** 
   DOM Variables
***/

const pageDiv = document.querySelector(`.page`);
const pageHeaderDiv = document.querySelector(`.page-header`);
const studentListUL = document.getElementById(`student-list`);
const studentItemLIs = document.getElementsByClassName(`student-item`);

/*** 
   Variables
***/

let numberOfResultsPerPage = 10;

/*** 
   showPage handles which students to show, given the page
***/

const showPage = (list, page) => {

   // i.e. for page 1, results should be minIndex 0 and maxIndex 9
   // for page 2, should be minIndex 10 and maxIndex 19
   // so on

   // need to subtract by 1 to follow array-index numbering (which starts at 0)

   // example range: 
   // 0 to 9 | 10 to 19 | etc.

   // 1 * 10 - 1 = 9
   // 2 * 10 - 1 = 19
   const maxIndexOfStudentToBeShown = page * numberOfResultsPerPage - 1;
   
   // 1 * 10 - 10 = 0
   // 2 * 10 - 10 = 10
   const minIndexOfStudentToBeShown = page * numberOfResultsPerPage - numberOfResultsPerPage; 
   
   // loop through the student-item div aka students
   for (let i = 0; i < list.length; i++) {

      const studentLI = list[i];

      // only show the <li> if it is in valid range
      if (i <= maxIndexOfStudentToBeShown && i >= minIndexOfStudentToBeShown) {
         studentLI.style.display = `block`;
      } else {
         studentLI.style.display = `none`;
      }
   }
};



/*** 
   appendPageLinks will generate the clickable elements for pagination and will setup event listeners to said elements
***/

const appendPageLinks = (list) => {
   // figure out how many pages are needed
   // example: 
   // if 45 students, then need 5 pages
   // page 1 = 0 to 9
   // page 2 = 10 to 19
   // page 3 = 20 to 29
   // page 4 = 30 to 39
   // page 5 = 40 to 45 (49max)
   const pagesNeeded = Math.ceil(list.length / numberOfResultsPerPage); // 45 / 10 =  4.5. use ceil to round up to 5

   console.log(`Total # of students: ${list.length}`);
   
   console.log(`Pages needed: ${pagesNeeded}`);
   
   // create pagination div
   const paginationDiv = document.createElement(`div`);
   paginationDiv.className = `pagination`;

   // create the ul
   const ul = document.createElement(`ul`);

   // create li's based on pagesNeeded
   for (let i = 0; i < pagesNeeded; i++) {
      const li = document.createElement(`li`);
      const a = document.createElement(`a`);

      const pageNumber = `${i + 1}`;

      a.text = pageNumber;
      a.href = `#`;

      // add click listener for the <a> 
      a.addEventListener(`click`, (event) => {

         showPage(list, pageNumber);

         // get all <a> with `active` class and remove ALL active classes
         const activeLinks = document.querySelectorAll(`.active`);

         for (let i = 0; i < activeLinks.length; i++) {
            const activeLink = activeLinks[i];
            // remove all active classes
            activeLink.classList.remove(`active`);
         }

         // add the active class to this newly clicked <a>
         event.target.className = `active`;
      });

      li.append(a);
      ul.append(li);
   }

   paginationDiv.append(ul);
   pageDiv.append(paginationDiv);
};

/*** 
   Programmatically click the first anchor
***/
const clickFirstPage = () => {
   const firstPageAnchor = document.querySelector(`ul li a`);
   firstPageAnchor.click();
};

/*** 
   Setup the page
***/

const setupPage = () => {
   appendPageLinks(studentItemLIs);
   clickFirstPage();
};


setupPage();