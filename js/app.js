const noResults = $('h2');
const studentNames = document.querySelectorAll('h3');
const studentEmail = document.querySelectorAll('.email');
const $allStudents = $('.student-list').children();
let currentStudentList = [];
let returnedStudents = [];
let studentsPerPage = 5;
let searchReturnedStudents = [];
let currentPage = 0;
($('.page').prepend('<div class="student-search-filter">  <label class="filter-title" for="title">Results per page:</label>' +
  '<select id="filter" name="filter">' +
  ' <option value="10">10</option>' +
  ' <option value="20">20</option>' +
  ' <option value="50">50</option>;' +
  '  </select> ' +
'</div>'));
($('.student-list')).hide();
($('.page-header').append(`<div class="student-search"><input type="search" placeholder="Search for students..."><button class="search-button">Search</button></div>`));

/* The heart of this program is a for loop, which picks what students to show from a collection of all students,
based on the current page index. (page 1 = 0, page 2 = 1 etc)
  It starts at the current page * the number of students to show,
 and ends at that number plus the number of students to show.
  Using this formula allows the loop to work on any page, and can extend into changing the amount of students to show.
  For instance if the page number is 1 and it should display 10 students, it will start at 0 and loop until 10 (showing 0 to 9).
  likewise if we want 20 students and the page is 2 it will loop from 20 (page index 1 * 20 = 20) and loop until 40 (20 + 20)
  */

// Grab the clicked 'a' tag index to determine where to start the loop in the $allStudents array,
// and pass it to the showPageStudents function
  $('.pagination').on('click', 'a', function(){
     currentPage = $(this).parents("li").index();
       let startLoop = currentPage * studentsPerPage;
    showPageStudents( startLoop, currentStudentList );
  });

// index determines where to start the for loop
function showPageStudents(index, studentsArray){
  $('.generated-list').children().remove();
    //additional code to practice changing amount to show.
    studentsPerPage = (parseInt($('#filter').val()));
      returnedStudents = [];

      currentStudentList = studentsArray;
    //Loops through the given range, and saves in array
      for(  let i = index; i < index + studentsPerPage; i++){
          returnedStudents.push(studentsArray[i])
        }
          //Display the students in the new array
          $('.generated-list').append($(returnedStudents));
          //Generate 'buttons' ('a' tags)
          buttonController(currentStudentList);
    }
//Adds 'buttons' based on array size divided by number of students to show
function buttonController(allStudents){
  let colorLinks;
    $('.pagination').children().remove();
      for (let j = 0; j < allStudents.length / studentsPerPage ; j ++ ){
        ($('.pagination').append(`<li><a> ${(j + 1)} </a></li>`));
          // Finds the current page number element
          if (j == currentPage)
            {
              colorLinks = $('.pagination').children().children()[j]
            };
            //Colours the element
           $(colorLinks).addClass('active')
         }
  }

// //Search by clicking (rendundant with typing function but meets project guidelines)
 $('.search-button').on('click',  function(){
   search();
 });
// Search by typing
$('.student-search').on('keyup', function(event){
  search();
        });

//Search functionality for exceeds expectations grade
let search =  function(){
  //Clear page
$('.generated-list').children().remove();
$('.pagination').children().remove();
    //Reference to the input field
    let search = ($('.student-search input').val().toUpperCase());
    searchReturnedStudents = [];
    //Each keystroke looks inside the $allStudents array name and email fields for a matching string, saves matches
    //in searchReturnedStudents and finally displays the results using the ShowPageStudents function
      for (let i = 0; i < $allStudents.length; i ++) {
          if (studentNames[i].innerText.toUpperCase().indexOf(search) > -1 || studentEmail[i].innerText.toUpperCase().indexOf(search) > -1 ){
              searchReturnedStudents.push($allStudents[i]);
              showPageStudents( 0, searchReturnedStudents );
            }
          }
    // If there are no matches, display that information
          if (!searchReturnedStudents.length){
            $(noResults).text('no matching records');
            $(noResults).css('color','firebrick');
          }else{
            $(noResults).text('students');
            $(noResults).css('color','black');
          }
        };

        //--------Start the program--------
        showPageStudents(currentPage, $allStudents);
        //--------Start the program--------
