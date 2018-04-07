import React from 'react';

let Users = 
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
             ]
        }, 

        {
            "first" : "Michael", "last" : "Phelps",  
            "type": "Trainer", "age": "30", "ht" : "5'8",
            "wt": "145", "num": "2", "id": "trainer2",
            "img": "../../images/swim.jpg",
            "notes":
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


 export default Users;