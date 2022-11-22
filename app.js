const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors());

const mysql = require('mysql');
const {
    query
} = require('express');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'hospital_db',
    port: 3306
});

connection.connect(err => {
    if (err) {
        console.log(err);
    } else {
        console.log("Database connected");
    }
})

app.get('/', (req, res) => {
    res.send("Hello world");
});

app.get('/get_all_patients', (req, res) => {
    const query = "SELECT * FROM patient";
    connection.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send({
                success: false,
                msg: 'Server error',
                data: []
            })
        } else {
            res.status(200).send({
                success: true,
                msg: 'Success',
                data: result
            });
        }
    })
})

app.get('/get_all_doctors', (req, res) => {
    const query = "SELECT * FROM doctor";
    connection.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send({
                success: false,
                msg: 'Server error',
                data: []
            })
        } else {
            res.status(200).send({
                success: true,
                msg: 'Success',
                data: result
            });
        }
    })
})

app.get('/get_patient_by_p_id/:p_id', (req, res) => {
    const p_id = req.body.p_id;
    const query = "SELECT * from patient WHERE p_id= ?";
    connection.query(query, [p_id], (err, result) => {
        if(err) {
          res.send(err);
        }
        else{
            res.send(result);
        }
    })
  });
  app.post('/add_patient', (req, res) => {
    const p_name = req.body.p_name;
    const p_id = req.body.p_id;
    const p_age = req.body.p_age;
    const gender = req.body.gender;
const query = "INSERT INTO patient (p_id, p_name, p_age, gender) VALUES ( ?, ?, ?, ?)";
connection.query(query, [p_id, p_name, p_age, gender],(err, result) => {
    if(err) {
        res.send(err);
      }
      else{
          res.send(result);
      }
  })
});

app.put('/update_doctor/:dr_id', (req, res) => {
    const dr_id = req.params.dr_id;
    const dr_name = req.body.dr_name;
    const dr_age = req.body.dr_age;
    const status = req.body.status;
    const query = "UPDATE doctor SET dr_name = ?, dr_age = ?, status = ? WHERE doctor.dr_id = ?";
    connection.query(query, [dr_name, dr_age, status, dr_id], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send({
                success: false,
                msg: 'Server error',
                data: []
            })
        } else {
            res.status(200).send({
                success: true,
                msg: 'Success',
                data: result
            });
        }
    })
  });

  
app.put('/update_patient/:p_id', (req, res) => {
    const p_id = req.params.p_id;
    const p_name = req.body.p_name;
    const p_age = req.body.p_age;
    const gender = req.body.gender;
    const query = "UPDATE patient SET p_name = ?, p_age = ?, gender = ? WHERE patient.p_id = ?";
    connection.query(query, [p_name, p_age, gender, p_id], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send({
                success: false,
                msg: 'Server error',
                data: []
            })
        } else {
            res.status(200).send({
                success: true,
                msg: 'Success',
                data: result
            });
        }
    })
  });
  app.delete('/delete_patient/:p_id', (req, res) => {
    const p_id = req.params.student_id;
    const query = "DELETE FROM patient WHERE patient.patient_id = ?";
    connection.query(query, [p_id], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send({
                success: false,
                msg: 'Server error',
                data: []
            })
        } else {
            res.status(200).send({
                success: true,
                msg: 'Success',
                data: result.affectedRows
            });
        }
    })
});

  
app.listen(3000, err => {
    if (err) {
        console.log(err);
    } else {
        console.log("Server is running on port 3000");
    }
});