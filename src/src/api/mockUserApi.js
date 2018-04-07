import delay from './delay'; //imports a default delay value of 0

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises. (lecture 4b)
const users = 
    [
        {   
            first : "Justin", last : "Timberlake",  
            type: "Patient", age: "37",
            ht : "6'1", wt: "168", 
            num: "0", id: "patient1",
            img: "../../images/jt4.jpg", 
            notes: 
            [
                {
                   date: "02/14/18", 
                   comment: "This guy needs a blood transfusion due to a vampire attack. "
                },
                {      
                   date: "02/20/18", 
                   comment: "His 20/20 album is the best"
                }
            ]

        }, 
        {
            first : "Jackie", last : "Chan",  
            type: "Trainer", age: "55", ht : "5'5",
            wt: "150", num: "1", id: "trainer1", 
            img: "../../images/jackie-chan.jpg", 
            notes: 
            [
                {
                    date: "02/25/18", 
                    comment: "The greatest actor of all time"
                 },
                 {
                    date: "02/04/18", 
                    comment: "Smile"
                 }
             ],
             calender: 
             [
               {
                sun: 
                [
                  {0: "Checkup for J.T"},
                  {1: "Restock the medication"},
                  {2: "Finish PA5"}

                ],    
                mon: 
                [
                  {0: "Checkup for J.T"},
                  {1: "Restock the medication"},
                  {2: "Finish PA5"}

                ], 
                 wed: 
                [
                  {0: "Checkup for J.T"},
                  {1: "Restock the medication"},
                  {2: "Finish PA5"}      
               ]

              }]
        }, 

        {
            first : "Michael", "last" : "Phelps",  
            type: "Trainer", age: "30", ht : "5'8",
            wt: "145", "num": "2", id: "trainer2",
            img: "../../images/swim.jpg",
            notes:
            [
                 {   
                    "date": "02/14/18", 
                    "comment": "Olympic Gold medalist"
                 },
                 {
                    "date": "02/14/18", 
                    "comment": "A great swimmer"
                 }
            ]
        }
    ];


function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}

//This would be performed on the server in a real app. Just stubbing in.
const generateId = (user) => {
  return replaceAll(user.id, ' ', '-');
};

class UserApi {
  
  static getAllUsers() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(Object.assign([], users));
      }, delay);
    });
  }

  static saveUser(user) {
    user = Object.assign({}, user); // to avoid manipulating object passed in.
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate server-side validation
        const minUserTitleLength = 1;
        if (user.id.length < minUserTitleLength) {
          reject(`Title must be at least ${minUserTitleLength} characters.`);
        }

        if (user.id) {
          const existingUserIndex = users.findIndex(a => a.id == user.id);
          users.splice(existinguserIndex, 1, user);
        } else {
          //Just simulating creation here.
          //The server would generate ids and watchHref's for new users in a real app.
          //Cloning so copy returned is passed by value rather than by reference.
          user.id = generateId(user);
          users.push(user);
        }

        resolve(user);
      }, delay);
    });
  }

  static addComment(user, comment) {
    //store userNotes as new array of objects
    let newUsers = Object.assign([], users); 
    let newUser = Object.assign({}, user);
    //add the comment 
    return new Promise((resolve, reject) => {
      setTimeout(() => {       
        let userNotes = newUser.notes; 
        //prepend the new comment 
        let newNotes = [comment, ...userNotes];
        
        newUser.notes = newNotes;  //update users notes
        //set the new notes in the JSON file
        //users[newUser.num].notes = newNotes; DOESNOT WORKK
       
        const existingUserIndex = users.findIndex(a => a.num == newUser.num);
        users.splice(existingUserIndex, 1, newUser);

        resolve(newUser);
      }, delay);
    });
  }

  static deleteUser(userId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const indexOfUserToDelete = users.findIndex(user => {
          return user.userId == userId;
        });
        users.splice(indexOfUserToDelete, 1);
        resolve();
      }, delay);
    });
  }
}


export default UserApi;
