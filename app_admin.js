var mysql = require("mysql");
var express = require('express');
var app = express();

var session = require('express-session');
app.use(session({secret: 'ssshhhhh'}));
var sess;

var date = new Date();

const crypto = require('crypto');
const secret = 'abcdefg';

app.set('view engine', 'ejs');

var bodyParser = require('body-parser')
var url = bodyParser.urlencoded({ extended: false })

var uniqid = require('uniqid');
const  fileUpload = require('express-fileupload');
app.use(fileUpload())

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
const path = require('path')
app.use('/images', express.static(`${__dirname}/images`))


app.get('/encrypt', function(req, res)
{
    const secret = 'abcdefg';
    const hash = crypto.createHmac('sha256', secret)
    .update('test')
    .digest('hex');

    console.log(hash);

    res.end();
})

// // ====================================        ADMIN         ===================================================

app.get('/admin', function(req, res)
{
    res.redirect('/admin/admin');
})

app.get('/admin/*', (req, res, next) => {
    if (req.session.usernameadmin || req.url === '/admin/admin' || req.url === '/admin/loginadmin' || req.url==='/admin/registeradmin' || req.url==='/admin/adminmauregister' || req.url === '/admin/adminregister') next();
    else res.redirect('/admin/admin')
   })
   
   
//destroy session
app.get('/admin/logoutadmin', function (req,res) { 
req.session.destroy(err => err ? console.log(err) : res.redirect('/admin'))
})

app.get('/admin/admin', function(req, res)
{
    res.render(__dirname+'/views/adminlogin',
    {
        notifadmin:''
    });
})



// app.post('/admin/loginadmin', url, function(req, res)
// {
//     const password = crypto.createHmac('sha256', secret)
//     .update(req.body.password)
//     .digest('hex');

//     var sql = 'SELECT * FROM adminlogin WHERE username = ? and password = ?';
//     connection.query(sql, [req.body.username, password], function (err, rows) {

//         if (rows.length > 0)
//         {
//             sess=req.session;
//             sess.idadmin = rows[0].id;
//             sess.usernameadmin = rows[0].username;

//             // itu sess userid sm username di kiri bisa diganti2 klo mau jadi admin ato user

//             res.redirect('/admin/adminhome');
//         }
//         else
//         {
//             res.render(__dirname+'/views/adminlogin', 
//             {
//                 notifadmin:'Username atau Password salah !'
//             });
//         }
//     });
    
//     //res.end();
// })



app.post('/admin/loginadmin', url, function(req, res)
{

    var sql = 'SELECT * FROM adminlogin WHERE username = ? and password = ?';
    connection.query(sql, [req.body.username, req.body.password], function (err, rows) {

        if (rows.length > 0)
        {
            sess=req.session;
            sess.idadmin = rows[0].id;
            sess.usernameadmin = rows[0].username;

            // itu sess userid sm username di kiri bisa diganti2 klo mau jadi admin ato user

            res.redirect('/admin/adminhome');
        }
        else
        {
            res.render(__dirname+'/views/adminlogin', 
            {
                notifadmin:'Username atau Password salah !'
            });
        }
    });
    
    //res.end();
})


app.get('/admin/logoutadmin',function(req,res)
{
    req.session.destroy(function(err) 
    {
        if(err) 
        {
            console.log(err);
        } 
        else {
            res.redirect('/admin');
        }
    });
});



// // =======================================================================================home sm season


app.get('/admin/adminhome', function(req, res){
    connection.query("select * from season ",function(err, season){
        res.render(__dirname+'/views/adminhome', {season : season})
    })
})

app.get('/admin/admin_season_register', function(req, res){
    
     res.render(__dirname+'/views/admin_season_register')   

})

app.post('/admin/admin_season_register', url, function(req, res){
    var sql = `select * from season`;
    connection.query(sql, [req.body.season] ,function(err, rows){

        connection.query(`insert into season set ?`, 
        {
            season : req.body.season
        })

        res.redirect('/admin/adminhome')
        
    })
})

app.get('/admin/admin_season_edit/:id', function(req, res){
    
    res.render(__dirname+'/views/admin_season_edit', {
        id : req.params.id
    })   
})

app.post('/admin/admin_season_edit/:id', url, function(req, res){
    connection.query(`update season set ? where ?`, 
    [{
        season : req.body.season
    },

    {
        id : req.params.id
    }
    ])
        res.redirect('/admin/adminhome')
})

app.get('/admin/admin_season_delete/:id', function(req, res){
    
    connection.query(`delete from season where ?`, {
        id : req.params.id
    })   
    res.redirect('/admin/adminhome')
})

//=============== Season - kategori ================//

var tempIDprosk = ''

app.get('/admin/admin_category/:id', function(req,res){

    tempIDprosk = req.params.id;
// temp idpro itu buat supaya bisa balik seabis klik
    var sql = 
    `select * from season ts
    join kategori tk
    on ts.id = tk.id_season
    where ts.id = ?;
    `
    connection.query(sql, [req.params.id], function (err, rows) {
        id:req.params.id

        res.render(__dirname+'/views/admin_category', {
            kategori_produk : rows,
            id : req.params.id,
            balik :tempIDprosk
        })
    })
});

app.get('/admin/admin_category_register/:id', function(req, res){
    
    res.render(__dirname+'/views/admin_category_register', {
        id: req.params.id,
        balik :tempIDprosk
    })   
})

app.post('/admin/admin_category_register/:id', url, function(req, res){
   var sql = `select * from kategori`;
   connection.query(sql, [req.body.kategori_produk] ,function(err, rows){

       connection.query(`insert into kategori set ?`, 
       {
           kategori_produk : req.body.kategori_produk,
           id_season: req.params.id
       })

       res.redirect(`/admin/admin_category/${tempIDprosk}`)
       
   })
})

app.get('/admin/admin_category_edit/:id', function(req, res){
    
    res.render(__dirname+'/views/admin_category_edit', {
        id : req.params.id,
        balik :tempIDprosk
    })   
})

app.post('/admin/admin_category_edit/:id', url, function(req, res){
    connection.query(`update kategori set ? where ?`, 
    [{
        kategori_produk : req.body.kategori_produk
    },

    {
        id : req.params.id
    }
    ])
        res.redirect(`/admin/admin_category/${tempIDprosk}`)
})

app.get('/admin/admin_category_delete/:id', function(req, res){
    
    connection.query(`delete from kategori where ?`, {
        id : req.params.id
    })   
    res.redirect(`/admin/admin_category/${tempIDprosk}`)
})


//=============== kategori  -  produk ================//

var tempIDprokp = ''

app.get('/admin/admin_product/:id', function(req,res){

    tempIDprokp = req.params.id;

    var sql = 
    `select * from kategori tk
    join produk tp
    on tk.id = tp.id_kategori
    where tk.id = ?;
    `
    connection.query(sql, [req.params.id], function (err, rows) {

        id:req.params.id

        res.render(__dirname+'/views/admin_product', {
            detail_produk : rows,
            id : req.params.id,
            balik :tempIDprokp
        })
    })
});

app.get('/admin/admin_product_register/:id', function(req, res){
    
    res.render(__dirname+'/views/admin_product_register', {
        id: req.params.id,
        balik : tempIDprokp
    })   
})

app.post('/admin/admin_product_register/:id', url, function(req, res){
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

       res.redirect(`/admin/admin_product/${tempIDprokp}`)
       
        })
    })
})

app.get('/admin/admin_product_edit/:id', function(req, res){
    
    res.render(__dirname+'/views/admin_product_edit', {
        id : req.params.id,
        balik : tempIDprokp
    })   
})

app.post('/admin/admin_product_edit/:id', url, function(req, res){
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

        res.redirect(`/admin/admin_product/${tempIDprokp}`)
})
})

app.get('/admin/admin_product_delete/:id', function(req, res){
    
    connection.query(`delete from produk where ?`, {
        id : req.params.id
    })   
    res.redirect(`/admin/admin_product/${tempIDprokp}`)
})



//=============== produk - produkdetailwarna ================//

var tempIDpropw = ''

app.get('/admin/admin_product_detail/:id', function(req,res){

    tempIDpropw = req.params.id;

    // var sql = 
    // `select detail_produk, warna_produk, size, stock from produk tp
    // join warna tw
    // on tp.id = tw.id_produk
    // join size tsz
    // on tw.id = tsz.id_warna
    // where tp.id = ? `

    var sql = 
    `select * from produk tp
    left join warna tw
    on tp.id = tw.id_produk
    where tp.id = ? `

    //// pake left join biar yang size sm stock kosong ttp keliatan

    connection.query(sql, [req.params.id], function (err, rows) {

        id:req.params.id

        res.render(__dirname+'/views/admin_product_detail', {
            detail_produk_warna : rows,
            id : req.params.id,
            balik : tempIDpropw
        })
        // kalo di get, bagian yang kiri dicocokin ke yang di file ejs
    })
});

//// admin register colour===================

app.get('/admin/admin_product_colour/:id', function(req, res){
    
    res.render(__dirname+'/views/admin_product_colour', {
        id: req.params.id,
        balik : tempIDpropw
    })   
})

app.post('/admin/admin_product_colour/:id', url, function(req, res){
   var sql = `select * from warna`;
   
   connection.query(sql, [req.body.warna_produk] ,function(err, rows){

       connection.query(`insert into warna set ?`, 
       {
           id_produk: req.params.id,
           warna_produk:req.body.warna_produk
       })

       res.redirect(`/admin/admin_product_detail/${tempIDpropw}`)
       
   })
})

app.get('/admin/admin_product_colour_edit/:id', function(req, res){
    
    res.render(__dirname+'/views/admin_product_colour_edit', {
        id : req.params.id,
        balik : tempIDpropw
    })   
})

app.post('/admin/admin_product_colour_edit/:id', url, function(req, res){
    connection.query(`update warna set ? where ?`, 
    [{
        warna_produk:req.body.warna_produk
    },

    {
        id : req.params.id
    }
    ])
        res.redirect(`/admin/admin_product_detail/${tempIDpropw}`)
})

app.get('/admin/admin_product_colour_delete/:id', function(req, res){
    
    connection.query(`delete from warna where ?`, {
        id : req.params.id
    })   
    res.redirect(`/admin/admin_product_detail/${tempIDpropw}`)
})


//===============  produkdetailwarna  -  stok ================//

var tempIDprows = ''

app.get('/admin/admin_product_stock/:id', function(req,res){

    tempIDprows = req.params.id;

    var sql = 
    `select * from warna tw
    left join size tsz
    on tw.id = tsz.id_warna
    where tw.id = ?;
    `
    connection.query(sql, [req.params.id], function (err, rows) {

        res.render(__dirname+'/views/admin_product_stock', {
            sizeku : rows,
            id : req.params.id,
            balik : tempIDprows
        })
    })
});


app.get('/admin/admin_product_stock_add/:id', function(req, res){
    
    res.render(__dirname+'/views/admin_product_stock_add', {
        id : req.params.id,
        balik : tempIDprows
    })   
})

app.post('/admin/admin_product_stock_add/:id', url, function(req, res){

    var sql = 'select * from size';
    connection.query(sql, [req.body.size, req.body.stock], function(err,rows) {

    connection.query(`insert into size set ?`, 
    {
        id_warna: req.params.id,
        size: req.body.size,
        stock: req.body.stock,
    })
        res.redirect(`/admin/admin_product_stock/${tempIDprows}`)
    })
})


// admin edit stock

app.get('/admin/admin_product_stock_edit/:id', function(req, res){
    
    res.render(__dirname+'/views/admin_product_stock_edit', {
        id : req.params.id,
        balik : tempIDprows
    })   
})

app.post('/admin/admin_product_stock_edit/:id', url, function(req, res){
    connection.query(`update size set ? where ?`, 
    [{
        size: req.body.size,
        stock: req.body.stock,
    },

    {
        id : req.params.id
    }
    ])
        res.redirect(`/admin/admin_product_stock/${tempIDprows}`)
})

app.get('/admin/admin_product_stock_delete/:id', function(req, res){
    
    connection.query(`delete from size where ?`, {
        id : req.params.id
    })   
    res.redirect(`/admin/admin_product_stock/${tempIDprows}`)
})


// //=============================================== USER ============================================================




app.get('/', function(req, res)
{
    sess=req.session;

    if (sess.usernameuser != null)
    {
        var welcome = 'welcome, ';
    }
    else
    {
        var welcome = '';
    }

    res.render(__dirname+'/views/home', 
    {
        username:sess.usernameuser,
        welcome:welcome,
        iduser : req.session.useriduser
        
    });
});

app.post('/register', url, function(req, res)
{
    //console.log(req.body);
    
    var sql = 'SELECT * FROM userlogin WHERE username = ?';
    connection.query(sql, [req.body.username], function (err, rows) {

        if (rows.length > 0)
        {
            res.render(__dirname+'/views/formlogin', 
            {
                notif:'username sudah terdaftar !'
            });
        }
        else
        {
            const password = crypto.createHmac('sha256', secret)

            // gausa pake req.body.password soalnya passwordnya uda jadi variabel sm di encrypt

            .update(req.body.password)
            .digest('hex');

            //console.log(password);

            connection.query("insert into userlogin set ? ",
            {
                username : req.body.username,
                password : password
            });

            connection.query("insert into userdata set ? ",
            {
                nama : req.body.nama,
                email : req.body.email,
                phonenumber : req.body.phonenumber,
                alamat : req.body.alamat
            });

            res.redirect('/');
        }
    });
})

app.get('/formregis', function(req, res)
{
    res.render(__dirname+'/views/userregis');
})

app.get('/formlogin', function(req, res)
{
    res.render(__dirname+'/views/formlogin', 
    {
        notif:''
    });
})

app.post('/login', url, function(req, res)
{
    const password = crypto.createHmac('sha256', secret)
    .update(req.body.password)
    .digest('hex');

    var sql = 'SELECT * FROM userlogin WHERE username = ? and password = ?';
    connection.query(sql, [req.body.username, password], function (err, rows) {
    //if (err) throw err;
    //console.log(rows[0].userid);

        if (rows.length > 0)
        {
            
            req.session.useriduser = rows[0].id;
            req.session.usernameuser = rows[0].username;

            // itu sess userid sm username di kiri bisa diganti2 klo mau jadi admin ato user

            res.redirect('/');
        }
        else
        {
            res.render(__dirname+'/views/formlogin', 
            {
                notif:'Username atau Password salah !'
            });
        }
    });
    
    //res.end();
})

app.get('/logout',function(req,res)
{
    req.session.destroy(function(err) 
    {
        if(err) 
        {
            console.log(err);
        } 
        else {
            res.redirect('/');
        }
    });
});
    
app.get('/seasons',function(req,res){
    sess = req.session;
    connection.query("select * from season", function(err,rows,field){
        if(err) throw err;
        res.render(__dirname+'/views/seasons', {
            data: rows,
            username : sess.usernameuser ,
            welcome: 'welcome ',
            iduser : req.session.useriduser
        });
        
        });      
});


app.get('/category/:id_season',function(req,res){
    sess = req.session;
    var sql = 'SELECT * FROM kategori WHERE id_season = ?';
    connection.query(sql, [req.params.id_season], function (err, rows) {
        if(err) throw err;
        res.render(__dirname+'/views/category', {
            data: rows,
            username : sess.usernameuser ,
            welcome: 'welcome ',
            iduser : req.session.useriduser
        });
        
    })
    
});

app.get('/product/:id_kategori',function(req,res){
    sess = req.session;
    var sql = 'SELECT * FROM produk WHERE id_kategori = ?';
    connection.query(sql, [req.params.id_kategori], function (err, rows) {
        if(err) throw err;
        res.render(__dirname+'/views/product', {
            data: rows,
            username : sess.usernameuser,
            welcome: 'welcome ',
            iduser : req.session.useriduser
        });
    });
});


// app.get('/p/:id' , url, function (req,res){
//     sess = req.session
//     connection.query(`SELECT p.id as produkid, detail_produk, price, deskripsi,warna_produk,size,stock FROM produk as p 
//     left join warna as w  on p.id = w.id_produk 
//     join size as sz on w.id = sz.id_warna 
//     WHERE p.id = ?` , [req.params.id] , function (err,rows){
//         if(err) throw err;
//         res.render(__dirname+'/views/product_detail' , {details:rows, username : sess.usernameuser,welcome: 'welcome '})
//     }) 
// })


app.get('/detail/:id' , url, function (req,res){
    sess = req.session
    connection.query(`SELECT p.id, detail_produk, price, deskripsi,warna_produk,size,stock FROM produk as p 
    left join warna as w  on p.id = w.id_produk 
    left join size as sz on w.id = sz.id_warna 
    WHERE p.id = ?` , [req.params.id] , function (err,rows6){

        connection.query('select * from warna where id_produk = ?', [req.params.id], (err, val2) => {
            // res.json(req.query)
            if (req.query.warnaid === undefined)
                res.render(__dirname+'/views/product_detail2',{detailproduk: rows6, warna: val2, username : sess.usernameuser,welcome: 'welcome ',
                iduser : req.session.useriduser})
            else
                connection.query('select * from size where id_warna = ?', [req.query.warnaid], (err, val3) => {
                res.render(__dirname+'/views/product_detail2',{detailproduk: rows6, warna: val2, size: val3 , username : sess.usernameuser,welcome: 'welcome ',
                iduser : req.session.useriduser})                    
                })
        })

    })
})

// app.get('/cart', function (req,res) {
//     if (req.session.usernameuser != null)
//     {
     
//     connection.query(`select nama,detail_produk,size,warna_produk,stock,qty,price,alamat,phonenumber, (price * qty) as total_harga from produk pr 
//     JOIN warna pw ON pr.id = pw.id_produk 
//     join size ps ON pw.id = ps.id_warna 
//     join cart cr ON ps.id = cr.id_size  
//     join userdata us ON us.id = cr.id_user `, function (err,rows){

//         connection.query(`select qty,price,sum(price*qty) as grandtotal from produk pr 
//         JOIN warna pw ON pr.id = pw.id_produk 
//         join size ps ON pw.id = ps.id_warna 
//         join cart cr ON ps.id = cr.id_size  
//         join userdata us ON us.id = cr.id_user`, function(err,val1){

//         res.render(__dirname+'/views/cart' , {keranjang : rows , hasil : val1 , username : req.session.usernameuser,welcome: 'welcome '})
//             console.log(rows)
//         })
//     })
//     }
//     else
//     {
//         res.redirect('/formlogin')
//     }
// })

app.get('/cart', function (req,res) {
    if (req.session.usernameuser != null)
    {
     
    connection.query(`
    select cr.id, cr.id_user,detail_produk,size,warna_produk,stock,qty,price, (price*qty) as total_harga from produk pr 
    join warna pw ON pr.id = pw.id_produk
    join size ps on pw.id = ps.id_warna
    join cart cr on ps.id = cr.id_size
    join userlogin us on us.id = cr.id_user where  ? ` , {id_user  : req.session.useriduser},  function (err,rows){

        res.render(__dirname+'/views/cart' , {keranjang : rows , username : req.session.usernameuser, id_user : req.session.useriduser , welcome: 'welcome ',
        iduser : req.session.useriduser})
            console.log(rows)
        })
    }

    else
    {
        res.redirect('/formlogin')
    }
})
app.post('/cart', url , function (req,res){
    connection.query('insert into cart set ?', {
        id_user : req.session.useriduser,
        id_size : req.body.idproduk,
        price_cart : req.body.harga,
        qty : req.body.jumlahbeli,
    })
    res.redirect('/cart')
})

app.get('/carthapus/:id',function(req,res){

    connection.query('delete from cart where ?', {

        id : req.params.id
        
        })
        
        res.redirect('/cart') 
           
});

app.post('/editcart/:id',url,function(req,res){

    connection.query('update cart set ? where ?', 
    [
        {
        qty : req.body.kuantitas
        },
        {
        id : req.params.id
        }
    ])
        
        res.redirect('/cart') 
           
});


app.post('/tambahinvoice' , url , function(req,res){

    const kode_invoice = "INV"+ req.session.useriduser + (new Date).getMonth() + (new Date).getHours() + (new Date).getSeconds();

    connection.query(`select cr.id,nama,id_size,detail_produk,size,warna_produk,stock,qty,price,alamat,phonenumber, (price * qty) as total_harga  from produk pr 
    JOIN warna pw ON pr.id = pw.id_produk 
    join size ps ON pw.id = ps.id_warna 
    join cart cr ON ps.id = cr.id_size  
    join userdata us ON us.id = cr.id_user`, function(err,cartval){

        console.log(cartval);

        connection.query('insert into invoice_data set ? ' , {
            id_user : req.session.useriduser,
            kode_invoice : kode_invoice,
            total_harga : req.body.grandtotal,
            nama : req.body.namapenerima,
            alamat : req.body.alamatpenerima,
            phonenumber : req.body.nomorhp,
            tanggal : new Date
            })

        cartval.forEach(x => {
                connection.query('insert into invoice_detail set ? ' , {
                    kode_invoice : kode_invoice,
                    produk_detail : x.detail_produk,
                    price : x.price,
                    warna_produk : x.warna_produk,
                    size : x.size,
                    qty : x.qty
                })

            connection.query('select stock from size where ? ' ,
             {
                 id : x.id_size
             },
             function (err,detailinv) 
             {
            console.log(detailinv)
                 
                connection.query('update size set ? where ? ' , 
            [
                {
                    stock : detailinv[0].stock - x.qty
                },
                {
                    id : x.id_size
                }    
            ])

            })    

        });
            connection.query('delete from cart where ? ',
            {
                id_user : req.session.useriduser
            })

        })
    res.redirect('/invoicedetail/'+ kode_invoice)
})

app.get('/invoicedetail/:id' , function(req,res){
    connection.query(' select * from invoice_data where ? ' ,
    {
        kode_invoice : req.params.id
    },
    function(err,row1)
    {
        connection.query('select * from invoice_detail where ?',
        {
            kode_invoice : req.params.id
        },
        function(err,row2)
        {
            res.render(__dirname+'/views/invoicedetail', {data1 : row1 , data2 : row2 , username : req.session.usernameuser,welcome: 'welcome ',
            iduser : req.session.useriduser})
            console.log(row2)
            console.log(row1)
        })
    
    })
})

app.get('/historyinvoice/:id', function (req, res) {
    connection.query('select * from invoice_data where id_user = ?', [req.params.id], function(err,val4) {
        res.render(__dirname+'/views/history_user', {historiinvoice : val4 , username : req.session.usernameuser,welcome: 'welcome ',
        iduser : req.session.useriduser})
    }
)
})

app.get('/historyinvoice', function (req, res) {
    connection.query('select * from invoice_data', function(err,val4) {
        res.render(__dirname+'/views/history_user', {historiinvoice : val4 , username : req.session.usernameuser,welcome: 'welcome ',
        iduser : req.session.useriduser})
    }
)
})

app.listen(3002 , console.log('server altif 3002'));
