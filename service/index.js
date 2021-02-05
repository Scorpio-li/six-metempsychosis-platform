const express = require("express");
const crypto = require("crypto");
const bodyParser = require("body-parser");
const app = express();
const connection = require("./databases/index.js");
const random = require('string-random')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", (req, res) => {
    // 得到get请求的参数 使用query
    console.log(req.query);
    res.send("hello world dfasd");
});
app.get("/data", (req, res) => {
    // res.writeHead("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Origin", "*");
    let data = {
        message: "hello",
        status: 200,
        data: {
            name: "lck",
            age: 34,
            sex: 0
        }
    }
    res.send(JSON.stringify(data));
});

// 登录
app.post("/api/login", async(req, res, next) => {
    console.log("req is ", req.body);
    let username = req.body.username;
    let password = req.body.password;
    let self = this;
    let realPassword = password;
    // let realPassword = Util.md5(Util.md5(password).substr(10, 20) + Util.md5(password));
    console.log("realPassword is ", password);
    try {
        const insertRes = await new Promise((resolve, reject) => {
            let addUser = "select * from users where username = ?";
            let queryParams = [username];
            connection.query(addUser, queryParams, (err, result) => {
                try {
                    console.log("result is ", result);
                    resolve(result);
                } catch (e) {
                    console.log("e is ", e);
                    reject();
                }
            })
        });
        if (insertRes.length > 0) {
            console.log("insertRes is ", insertRes[0]);
            console.log("insertRes is ", insertRes[0].password === realPassword);
            // if (insertRes[0].password === realPassword) {
            //     res.send({ message: "ok", status: 200 });
            // } else {
            //     res.send({ message: "密码错误", status: 200 });
            // }
            res.send({ message: "ok", status: 200, result: { token: random(16) } });
        } else {
            res.send({ message: "用户名不存在", status: 400 });
        }
    } catch (e) {
        console.log("e is ", e);
        res.send({ message: "no", status: 400 });
    }
});

// 退出
app.post("/api/logout", async(req, res, next) => {
    // let hashes = crypto.getHashes();
    // let keyhash = crypto.createHmac('md5', req.body.password)
    //     .update('I love cupcakes')
    //     .digest('hex');
    // console.log("hashes is ", keyhash);
    // let username = req.body.username;
    // let password = req.body.password;
    // try {
    //     const insertRes = await new Promise((resolve, reject) => {
    //         let addUser = `insert into user(id,username,password,gender) values(null,?,?,?)`;
    //         let addParams = [username, keyhash, 1];
    //         connection.query(addUser, addParams, (err, result) => {
    //             console.log("result is ", result);
    //             resolve(result);
    //         })
    //     });
    //     res.send({ message: "ok", status: 200 });
    // } catch (e) {
    //     res.send({ message: "no", status: 400 });
    // }
    res.send({ message: "ok", status: 200 });
})

// 获取用户列表
app.get("/api/user/list", async(req, res, next) => {
    res.send({ message: "no", status: 400 });
})

app.post("/register", async(req, res, next) => {
    let hashes = crypto.getHashes();
    let keyhash = crypto.createHmac('md5', req.body.password)
        .update('I love cupcakes')
        .digest('hex');
    console.log("hashes is ", keyhash);
    let username = req.body.username;
    let password = req.body.password;
    try {
        const insertRes = await new Promise((resolve, reject) => {
            let addUser = `insert into user(id,username,password,gender) values(null,?,?,?)`;
            let addParams = [username, keyhash, 1];
            connection.query(addUser, addParams, (err, result) => {
                console.log("result is ", result);
                resolve(result);
            })
        });
        res.send({ message: "ok", status: 200 });
    } catch (e) {
        res.send({ message: "no", status: 400 });
    }
})

let server = app.listen(3000, () => {
    let host = server.address().address;
    let port = server.address().port;
    console.info("host is ", host, " port is ", port);
})