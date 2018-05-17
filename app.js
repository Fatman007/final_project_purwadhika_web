var mysql = require("mysql");
var express = require('express');
var app = express();
var cors = require('cors')
var session = require('express-session');
app.use(session({secret: 'ssshhhhh'}));
var sess;
app.use(cors())
var date = new Date();

const crypto = require('crypto');
const secret = 'abcdefg';

app.set('view engine', 'ejs');

var bodyParser = require('body-parser')
var url = bodyParser.urlencoded({ extended: false })
app.use(bodyParser.json())

var uniqid = require('uniqid');
const  fileUpload = require('express-fileupload');
app.use(fileUpload())

const path = require('path')
app.use('/images', express.static(`${__dirname}/images`))

var connection = mysql.createConnection
(
    {
        host: "127.0.0.1",
        port: 3307,
        // database: "latihan_1",
        database: "latihan_1_test",
        user: "root",
        password: "usbw",
    }
);

// app.get('/encrypt', function(req, res)
// {
//     const secret = 'abcdefg';
//     const hash = crypto.createHmac('sha256', secret)
//     .update('test')
//     .digest('hex');

//     console.log(hash);

//     res.end();
// })

let enkripsi = (password) => {
    return crypto
        .createHmac('sha256', 'abcdefg')
        .update(password)
        .digest('hex');
}

// //=============================================== USER ============================================================


//// register encrypt

// app.post('/register',url, function(req, res)
// {
//     console.log(req.body);

//     var notif;
    
//     var sql = 'SELECT * FROM userlogin WHERE username = ?';
//     connection.query(sql, [req.body.username], function (err, rows) {

//         if (rows.length > 0)
//         {
//             //res.render(__dirname+'/views/formlogin',{
//                 // notif = 'username sudah terdaftar !'
//             //});
//         }
//         else
//         {
//             const password = crypto.createHmac('sha256', secret)

//             // gausa pake req.body.password soalnya passwordnya uda jadi variabel sm di encrypt

//             .update(req.body.password)
//             .digest('hex');

                // notif = 'username ok'

//             //console.log(password);

//             connection.query("insert into userlogin set ? ",
//             {
//                 username : req.body.username,
//                 password : password
//             });

//             connection.query("insert into userdata set ? ",
//             {
//                 nama : req.body.nama,
//                 email : req.body.email,
//                 phonenumber : req.body.phonenumber,
//                 alamat : req.body.alamat
//             });
//             // res.redirect('/');
//         } res.json(notif);
//     });
// })


// //// login encrypt

// app.post('/login', url, function(req, res)
// {
//     const password = crypto.createHmac('sha256', secret)
//     .update(req.body.password)
//     .digest('hex');

//     var status_login;
//     var user_name;
//     var user_id;
//     var notif_login

//     var sql = 'SELECT * FROM userlogin WHERE username = ? and password = ?';
//     connection.query(sql, [req.body.username, password], function (err, rows) {
//     //if (err) throw err;
//     //console.log(rows[0].userid);

//         if (rows.length > 0)
//         {
            
//             req.session.useriduser = rows[0].id;
//             req.session.usernameuser = rows[0].username;
//             user_name = req.body.username;
//             user_id = rows[0].id;
//             status_login = true;
//             notif_login = '';


//             // itu sess userid sm username di kiri bisa diganti2 klo mau jadi admin ato user
//         }
//         else
//         {
//             // res.render(__dirname+'/views/formlogin', 
//             //{
//             notif_login = 'Username atau Password salah !'
//             req.session.useriduser = null;
//             req.session.usernameuser = null;
//             status_login = false;
//             user_name = null;
//             user_id = null;
//             //});
//         }
//         res.json({status_login, notif_login, user_name, user_id})
//     });
    
//     //res.end();
// })






// register tanpa encrypt

app.post('/register',url, function(req, res)
{
    // console.log(req.body);

    var notif;
    
    var sql = 'SELECT * FROM userlogin WHERE username = ?';
    connection.query(sql, [req.body.username], function (err, rows) {

        if (rows.length > 0)
        {
            //res.render(__dirname+'/views/formlogin',{
                notif = 'username sudah terdaftar !'
            //});
        }
        else
        {
                notif = 'masuk'
            // gausa pake req.body.password soalnya passwordnya uda jadi variabel sm di encrypt

            connection.query("insert into userlogin set ? ",
            {
                username : req.body.username,
                password : req.body.password
            });

            connection.query("insert into userdata set ? ",
            {
                nama : req.body.nama,
                email : req.body.email,
                phonenumber : req.body.phonenumber,
                alamat : req.body.alamat
            });
            
        } res.json(notif);
    });
})


//// login tanpa encrypt

app.post('/login', url, function(req, res)
{
 
    var status_login;
    var user_name;
    var user_id;
    var notif_login

    // var sql = `SELECT * FROM userlogin  ul 
    // join userdata ud 
    // on ul.id = ud.id WHERE ul.username = ? and ul.password = ? and ud.email = ?`
    
    
    // connection.query(sql, [req.body.username, req.body.password, req.body.email], function (err, rows) {
    // //if (err) throw err;
    // //console.log(rows[0].userid);

    var sql = 'SELECT * FROM userlogin WHERE username = ? and password = ?';
    connection.query(sql, [req.body.username, req.body.password], function (err, rows) {
    //if (err) throw err;
    //console.log(rows[0].userid);

        if (rows.length > 0)
        {
            req.session.user_name = req.body.username;
            req.session.user_id = rows[0].id;
            status_login = true;
            user_name = req.body.username;
            user_id = rows[0].id;
            notif_login = '';

            // itu sess userid sm username di kiri bisa diganti2 klo mau jadi admin ato user
        }
        else
        {
            // res.render(__dirname+'/views/formlogin', 
            //{
            notif_login = 'Username atau Password salah !'
            status_login = false;
            user_name = null;
            user_id = null;
            //});
        }
        res.json({status_login, notif_login, user_name, user_id})
    });
    
    //res.end();
})











// // register encrypt

// app.post('/register',url, function(req, res)
// {
//     // console.log(req.body);

//     var notif;
    
//     var sql = 'SELECT * FROM userlogin WHERE username = ?';
//     connection.query(sql, [req.body.username], function (err, rows) {

//         if (rows.length > 0)
//         {
//             //res.render(__dirname+'/views/formlogin',{
//                 notif = 'username sudah terdaftar !'
//             //});
//         }
//         else
//         {
//                 let password = enkripsi(req.body.password);

//                 notif = 'masuk'
//             // gausa pake req.body.password soalnya passwordnya uda jadi variabel sm di encrypt

//             connection.query("insert into userlogin set ? ",
//             {
//                 username : req.body.username,
//                 password : password,
//             });

//             connection.query("insert into userdata set ? ",
//             {
//                 nama : req.body.nama,
//                 email : req.body.email,
//                 phonenumber : req.body.phonenumber,
//                 alamat : req.body.alamat
//             });
            
//         } res.json(notif);
//     });
// })


// //// login encrypt

// app.post('/login', url, function(req, res)
// {
 
//     var status_login;
//     var user_name;
//     var user_id;
//     var notif_login

//     let password = enkripsi(req.body.password);

//     var sql = 'SELECT * FROM userlogin WHERE username = ? and password = ?';
//     connection.query(sql, [req.body.username, {password}], function (err, rows) {
//     //if (err) throw err;
//     console.log(rows);
//     console.log(req.body.username);
//     console.log(password)

//         if (rows.length > 0)
//         {
//             req.session.user_name = req.body.username;
//             req.session.user_id = rows[0].id;
//             status_login = true;
//             user_name = req.body.username;
//             user_id = rows[0].id;
//             notif_login = '';

//             // itu sess userid sm username di kiri bisa diganti2 klo mau jadi admin ato user
//         }
//         else
//         {
//             // res.render(__dirname+'/views/formlogin', 
//             //{
//             notif_login = 'Username atau Password salah !'
//             status_login = false;
//             user_name = null;
//             user_id = null;
//             //});
//         }
//         res.json({status_login, notif_login, user_name, user_id})
//     });
    
//     //res.end();
// })











// app.get('/logout',function(req,res)
// {
//     req.session.destroy(function(err) 
//     {
//         if(err) 
//         {
//             console.log(err);
//         } 
//         else {
//             status_login = false;
//             user_name = null;
//             user_id = null;
//         }
//         res.json({status_login, notif_login, user_id, user_name})
//     });
// });
    
app.get('/seasons', function(req,res){
    
    connection.query("select * from season", function(err,rows,field){
        res.json(rows);
        // console.log(rows);
        });
        
});


app.get('/category/:id', function(req,res){
    
    var sql = 'SELECT * FROM kategori WHERE id_season = ?';
    connection.query(sql, [req.params.id], function (err, rows) {
        res.json(rows);
        // console.log(rows);
        });
        
});

app.get('/categorynnd/:id', function(req,res){
    
    var sql = 'SELECT * FROM kategori WHERE id_season = ?';
    connection.query(sql, [req.params.id], function (err, rows) {
        res.json(rows);
        // console.log(rows);
        });
        
});

app.get('/product/:id', function(req,res){

    var sql = 'SELECT * FROM produk WHERE id_kategori = ?';
    connection.query(sql, [req.params.id], function (err, rows) {
        res.json(rows);
        // console.log(rows);
        });
        
});

app.get('/productsearch/:id', function(req,res){

    connection.query(`SELECT * FROM produk where detail_produk LIKE ?`, '%'+req.params.id+'%', function (err, rows) {
        res.json(rows);
        });
        // console.log(rows);
        
});

app.get('/detail/:id' , function (req,res){
    
    connection.query(`SELECT id, detail_produk, price, deskripsi FROM produk WHERE ?` , { id : req.params.id }, function (err,rows1){

        connection.query('select * from warna where ?', {id_produk : rows1[0].id}, (err, rows2) => {
            // res.json(req.query)
            if (req.query.warnaid === undefined)
                {
                    res.json({rows1,rows2})
                }
                // warnaid atau yang setelah req.query itu diambil dr url, kalo mau ada url awal+/?
            else
                connection.query('select * from size where ?', {id_warna : req.query.warnaid}, (err, rows3) => {
                {
                    res.json({rows1,rows2,rows3}) 
                }              
            })
        })

    })
})


app.get('/cart/:id', function (req,res) {
    if (req.params.id === undefined)
    {
        status_login = false;
        res.json(status_login);
    }
     
    connection.query(`select * from cart where  ? ` , {id_user  : req.params.id},  function (err,rows){

        if (err) throw err;
        res.json(rows)
            console.log(rows)
        })
})

app.post('/cart/:id', url , function (req,res){
    
        var cart_status;
    
        if (req.body.namacart.length <= 0)
        {
            cart_status = "NOT_OK"
            res.json(cart_status);
        }
        else
        {
            connection.query("SELECT id, size, id_warna FROM size where ?",
            {
                id : req.body.id
            },
            function(err,rows1)
            {
                connection.query("SELECT warna_produk, id_produk FROM warna where ?",
                {
                    id : rows1[0].id_warna
                },
                function(err,rows2)
                {
                    connection.query("SELECT detail_produk, price FROM produk where ?",
                    {
                        id : rows2[0].id_produk
                    },
                    function(err,rows3)
                    {
                        connection.query("INSERT into cart set ?",
                        {
                            id_user : req.params.id,
                            id_size : rows1[0].id,
                            product_name : rows3[0].detail_produk,
                            price_cart : rows3[0].price,
                            warna_cart : rows2[0].warna_produk,
                            size : rows1[0].size,
                            qty : req.body.qtybeli
                        })

                        connection.query("INSERT into cart2 set ?",
                        {
                            id_user : req.params.id,
                            id_size : rows1[0].id,
                            product_name : rows3[0].detail_produk,
                            price_cart : rows3[0].price,
                            warna_cart : rows2[0].warna_produk,
                            size : rows1[0].size,
                            qty : req.body.qtybeli
                        })
    
                        cart_status = "OK"
    
                        res.json(cart_status);
                    })
                })
            })
        }
})

app.get('/delete_cart/:id',url,function(req,res){

    var redirect_cart;

    connection.query("delete from cart where ?",
    {
        id: req.params.id
    });

    redirect_cart = "OK";
    res.json(redirect_cart);
});

app.post('/edit_cart/:id',url,function(req,res){

    var redirect_cart;

    connection.query("update cart set ? where ?",
        [
            {
                qty : req.body.qty
            }
        ,
            {
                id : req.body.cartid
            }
        ]);
        redirect_cart = "OK";

        res.json(redirect_cart);
})


app.post("/checkout",url, function(req,res)
{
    var kode_invoice = "INV" + req.body.id_cart + (new Date).getMonth() + (new Date).getHours() + (new Date).getSeconds();

        connection.query("SELECT * FROM cart where ?",
        {
            id_user : req.body.id_cart
        },
        function(err,rows1)
        {
            
            connection.query("INSERT into invoice_data set ?",
            {
                id_user : rows1[0].id_user,
                kode_invoice : kode_invoice,
                total_harga : req.body.grand_total,
                tanggal : new Date,
                nama : req.body.nama_penerima,
                alamat : req.body.alamat_penerima,
                phonenumber : req.body.telp_penerima
            })
            
            rows1.forEach(x => {

                connection.query("INSERT into invoice_detail set ?",
                {
                    kode_invoice : kode_invoice,
                    produk_detail : x.product_name,
                    warna_produk : x.warna_cart,
                    size : x.size,
                    qty : x.qty,
                    price : x.price_cart
                })

                connection.query("SELECT stock from size where ?",
                {
                    id : x.id_size
                },
                function(err,rows4)
                {
                    connection.query("UPDATE size SET ? where ?",
                    [
                        {
                            stock : rows4[0].stock - x.qty
                        },
                        {
                            id : x.id_size
                        }
                    ])
                })

            })    

            connection.query("DELETE FROM cart where ?",
            {
                id_user : req.body.id_cart
            })
        })

        var redirect_invoice = "OK";
        res.json({redirect_invoice,kode_invoice});
})



app.get("/invoice_user/:id", function(req,res)
{
        connection.query("SELECT * FROM invoice_data where ?",
        {
            kode_invoice : req.params.id
        },
        function(err,rows1)
        {
            connection.query("SELECT * FROM invoice_detail where ?",
            {
                kode_invoice : req.params.id
            },
            function(err,rows2)
            {
                if (err) throw err;
                res.json({rows1,rows2});
            })
        })
})


app.get("/invoice_history_user/:id", function(req,res)
{
        connection.query("SELECT kode_invoice, total_harga, tanggal FROM invoice_data where ?",
        {
            id_user : req.params.id
        },
        function(err,rows1)
        {
            res.json(rows1)
        })
})


app.get('/carousel/:id', function(req,res){

    var sql = 'SELECT * FROM gambar_carousel WHERE id_produk = ?';
    connection.query(sql, [req.params.id], function (err, rows) {
        res.json(rows);
        // console.log(rows);
        });
        
});







///////////////ADMIN//////////////////








app.post('/loginadmin', url, function(req, res)
{
 
    var status_login;
    var user_name;
    var user_id;
    var notif_login

    var sql = 'SELECT * FROM adminlogin WHERE username = ? and password = ?';
    connection.query(sql, [req.body.username, req.body.password], function (err, rows) {
    //if (err) throw err;
    //console.log(rows[0].userid);

        if (rows.length > 0)
        {
            req.session.admin_name = req.body.username;
            req.session.admin_id = rows[0].id;
            status_login = true;
            user_name = req.body.username;
            user_id = rows[0].id;
            notif_login = '';

            // itu sess userid sm username di kiri bisa diganti2 klo mau jadi admin ato user
        }
        else
        {
            // res.render(__dirname+'/views/formlogin', 
            //{
            notif_login = 'Username atau Password salah !'
            status_login = false;
            user_name = null;
            user_id = null;
            //});
        }
        res.json({status_login, notif_login, user_name, user_id})
    });
   
})

app.get("/invoice_history_user", function(req,res)
{
        connection.query("SELECT kode_invoice, total_harga, tanggal FROM invoice_data ",

        function(err,rows)
        {
            res.json(rows)
        })
})


app.get('/adminseasons', function(req,res){
    
    connection.query("select * from season", function(err,rows,field){
        res.json(rows);
        // console.log(rows);
        });
        
});

app.post('/admin_season_register', url, function(req, res){
    var sql = `select * from season`;
    connection.query(sql, [req.body.season] ,function(err, rows){

        connection.query(`insert into season set ?`, 
        {
            season : req.body.season
        })

        res.json(rows);
        
    })
})

app.post('/admin_season_edit/:id', url, function(req, res){
    connection.query(`update season set ? where ?`, 
    [{
        season : req.body.season
    },

    {
        id : req.params.id
    }
    ])
        res.json('wow');
})

app.get('/admin_season_delete/:id', function(req, res){
    
    connection.query(`delete from season where ?`, {
        id : req.params.id
    })   
    res.json('wow');
})


//=============== Season - kategori ================//


app.get('/admin_category/:id', function(req,res){

    var sql = 
    `select * from season ts
    join kategori tk
    on ts.id = tk.id_season
    where ts.id = ?;
    `
    connection.query(sql, [req.params.id], function (err, rows) {

        id:req.params.id
        
        res.json(rows);
    })
});

app.post('/admin_category_register/:id', url, function(req, res){
   var sql = `select * from kategori`;
   connection.query(sql, [req.body.kategori_produk, req.body.gambar_kategori] ,function(err, rows){

       connection.query(`insert into kategori set ?`, 
       {
            gambar_kategori : req.body.gambar_kategori,
           kategori_produk : req.body.kategori_produk,
           id_season: req.params.id
       })

       res.json(rows);
       
   })
})


app.post('/admin_category_edit/:id', url, function(req, res){
    connection.query(`update kategori set ? where ?`, 
    [{
        gambar_kategori : req.body.gambar_kategori,
        kategori_produk : req.body.kategori_produk
        
    },

    {
        id : req.params.id
    }
    ])
    res.json('wow');
})

app.get('/admin_category_delete/:id', function(req, res){
    
    connection.query(`delete from kategori where ?`, {
        id : req.params.id
    })   
    res.json('wow');
})


//=============== kategori  -  produk ================//


app.get('/admin_product/:id', function(req,res){

    var sql = 
    `select * from kategori tk
    join produk tp
    on tk.id = tp.id_kategori
    where tk.id = ?;
    `
    connection.query(sql, [req.params.id], function (err, rows) {

        id:req.params.id

        res.json(rows);
    })
});


app.post('/admin_product_register/:id', url, function(req, res){
    var gambar = req.files.gambar;

    var uploadgambar = uniqid() + '.' +req.files.gambar.mimetype.split('/')[1]
   
    var sql = `select * from produk`;
   connection.query(sql, [req.body.detail_produk, req.body.price, req.body.deskripsi, req.files.gambar] ,function(err, rows){

       connection.query(`insert into produk set ?`, 
       {
           id_kategori: req.params.id,
           detail_produk: req.body.detail_produk,
           price: req.body.price,
           deskripsi: req.body.deskripsi,
           gambar: uploadgambar
       })
// klo di post, bagian sebelah kiri harus sama kayak yang di database

       gambar.mv(__dirname + '/images/' + uploadgambar, function(err){

       res.json(rows)
       
        })
    })
})


app.post('/admin_product_edit/:id', url, function(req, res){
    var gambar = req.files.gambar;
    connection.query(`update produk set ? where ?`, 
    [{
        detail_produk: req.body.detail_produk,
        price: req.body.price,
        deskripsi: req.body.deskripsi,
        gambar: uniqid() + req.files.gambar
    },

    {
        id : req.params.id
    }
    ])
        gambar.mv(__dirname + '/images/' + uniqid() + '.' +req.files.gambar.mimetype.split('/')[1], function(err){

            res.json('wow');
})
})

app.get('/admin_product_delete/:id', function(req, res){
    
    connection.query(`delete from produk where ?`, {
        id : req.params.id
    })   
    res.json('wow');
})



//=============== produk - produkdetailwarna ================//


app.get('/admin_product_colour/:id', function(req,res){

    var sql = 
    `select * from produk tp
    left join warna tw
    on tp.id = tw.id_produk
    where tp.id = ? `

    //// pake left join biar yang size sm stock kosong ttp keliatan

    connection.query(sql, [req.params.id], function (err, rows) {

        id:req.params.id

        res.json(rows);
        // kalo di get, bagian yang kiri dicocokin ke yang di file ejs
    })
});

app.post('/admin_product_colour_register/:id', url, function(req, res){
   var sql = `select * from warna`;
   
   connection.query(sql, [req.body.warna_produk] ,function(err, rows){

       connection.query(`insert into warna set ?`, 
       {
           id_produk: req.params.id,
           warna_produk:req.body.warna_produk
       })

       res.json(rows);
       
   })
})

app.post('/admin_product_colour_edit/:id', url, function(req, res){
    connection.query(`update warna set ? where ?`, 
    [{
        warna_produk:req.body.warna_produk
    },

    {
        id : req.params.id
    }
    ])
    res.json('rows');
})

app.get('/admin_product_colour_delete/:id', function(req, res){
    
    connection.query(`delete from warna where ?`, {
        id : req.params.id
    })   
    res.json('rows');
})



//===============  produkdetailwarna  -  stok ================//




app.get('/admin_product_stock/:id', function(req,res){


    var sql = 
    `select * from warna tw
    left join size tsz
    on tw.id = tsz.id_warna
    where tw.id = ?;
    `
    connection.query(sql, [req.params.id], function (err, rows) {
        id:req.params.id

        res.json(rows);
    })
});


app.post('/admin_product_stock_register/:id', url, function(req, res){

    var sql = 'select * from size';
    connection.query(sql, [req.body.size, req.body.stock], function(err,rows) {

    connection.query(`insert into size set ?`, 
    {
        id_warna: req.params.id,
        size: req.body.size,
        stock: req.body.stock,
    })
    res.json(rows);
    })
})


app.post('/admin_product_stock_edit/:id', url, function(req, res){
    connection.query(`update size set ? where ?`, 
    [{
        size: req.body.size,
        stock: req.body.stock,
    },

    {
        id : req.params.id
    }
    ])
    res.json('rows');
})

app.get('/admin_product_stock_delete/:id', function(req, res){
    
    connection.query(`delete from size where ?`, {
        id : req.params.id
    })   
    res.json('rows');
})


app.listen(3001 , console.log('server altif'));
