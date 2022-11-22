const express = require ('express');
const app = express();
var bodyParser = require ('body-Parser');
const { json } = require ('body-Parser');
app.use(bodyParser. json());
const mysql = require ('mysql');
const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'mytodo'
});
connection.connect((err) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log("connected to DB");
    }
})
app.get('/', (req, res) => {
    res.send('Hello');
});
app.get('/get_all', (req, res) => {
    const query = "SELECT * FROM task";
    connection.query(query, (err, result) => {
        if(err){
            res.send(err);
        }
        else {
            res.send(result);

        }
    })
});
app.post('/add_todo', (req, res) => {
    const task =req.body.task;
const query = "INSERT INTO tasks (task) VALUES (?)";
connection.query(query, [task], (err, result) => {
});
});




app.put('/done_todo/:id', (req, res) => {
    const id = req.params.id;
    const status = req.body.status;
    const query = "UPDATE tasks SET  done = ? WHERE id = ?";
connection.query(query, [status, id]), (err, result) => {
    if (err) {
        res.status(500).send({
            success:false,
            msg:"Server error",
            data:[]

        });
    }
    else {
        res.status(201).send({
            success:true,
            msg: "success",
            data: result.affectedRows
        
        })
    }
}
})

app.put('/update_todo/:id', (req, res) => {
    const id = req.params.id;
    const status = req.body.status;
    const query = "UPDATE tasks SET  done = ? WHERE id = ?";
connection.query(query, [status, id]), (err, result) => {
    if (err) {
        res.status(500).send({
            success:false,
            msg:"Server error",
            data:[]

        });
    }
    else {
        res.status(201).send({
            success:true,
            msg: "success",
            data: result.affectedRows
        
        })
    }
}
});

app.delete('/delete_todo/:id', (req, res) => {
    const id = req.params.id;
    const status = req.body.status;
    const query = "DELETE FROM tasks WHERE id = ?";
connection.query(query, [status, id]), (err, result) => {
    if (err) {
        res.status(500).send({
            success:false,
            msg:"Server error",
            data:[]

        });
    }
    else {
        res.status(201).send({
            success:true,
            msg: "success",
            data: result.affectedRows
        
        })
    }
}
});



const port = 9000;
app.listen(port);



