const express = require("express");
const app = express();
const connection = require("./connection.js");

app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index", { title: "My TV shows" });
});

app.get('/admin/add', (req, res) => {
    res.render("addtv");
});

app.get("/select", (req, res) => {
    let readsql = `SELECT * FROM my_shows;`;
    connection.query(readsql, (err, rows) => {
        if (err) throw err;
        res.render('shows', { title: 'List of shows', rowdata: rows });
    });
});

app.get("/row", (req, res) => {
    const showid = req.query.tvid;
    const readsql = `SELECT * FROM my_shows WHERE id = ? `;
    connection.query(readsql, [showid], (err, rows) => {
        if (err) throw err;
        const showData = {
            showname: rows[0]['showname'],
            imgp: rows[0]['imgpath'],
            descript: rows[0]['descript']
        };
        res.render("series", { show: showData });
    });
});



app.post('/admin/add', (req, res) => {
    const title = req.body.showField;
    const imgp = req.body.imgField;
    const descr = req.body.desField;

    const createsql = `INSERT INTO my_shows (showname, imgpath, descript) 
                       VALUES( ? , ? , ?);`;

    connection.query(createsql, [title, imgp, descr], (err, rows) => {
        if (err) {
            console.error(err);
            res.send(`Error adding show: ${err.message}`);
        } else {
            res.send(`You have successfully added: ${title}`);
        }
    });
});





app.listen(process.env.PORT || 3000, () => {
    console.log("Server is running at port 3000");
});
