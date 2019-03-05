const router = require('express').Router();
const db = require('../config/db');


router.get('/',(req,res)=>{
    db.findList((docs)=>{
        // console.log('docs '+docs[0]);
        res.render('index',{
            pagetitle: 'TODO-APP',
            todo: docs
        });
    })
});

//post route to store a task in database
router.post('/addTask',(req,res)=>{
    let work = req.body.todo.work;
    let doneval = req.body.todo.done;
    db.addTask(work,doneval,()=>{
        console.log('Task added - server'); 
        res.send('ok');
    });
});

//delete route to delete a task from database
router.delete('/deleteTask/:item',(req,res)=>{
    // console.log('params '+req.params.item);
    db.removeTask(req.params.item,()=>{
        console.log('item removed - server');
        res.send('ok');
    })
});

//edit route to edit a task 
router.post('/updateTask/:item',(req,res)=>{
    // console.log(req.body.doneval);
    db.updateTask(req.params.item,req.body.doneval,()=>{
        console.log('item updated -server');
        res.send('ok');
    });
});

module.exports = router;