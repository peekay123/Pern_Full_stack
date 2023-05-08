const router = require('express').Router();
const pool = require('../database/db');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './images');
      }, // Uploads folder
    filename: (req, file, cb) => {
        cb(null, `image-${file.originalname}`); // Use original name for the uploaded file
    }
});

const imgfilter = (req, file,callback) => {
    if(file.mimetype.startsWith('image')) {
      callback(null, true)
  }else{
    callback(null, Error('only image is allowed'))
  }};


  const upload = multer({ 
    storage: storage,
  fileFilter: imgfilter
   });

//Get all data
router.get('/',  async (req, res) => {
    try{
        const data = await pool.query('SELECT * FROM data')
        res.json({
            data : {
                pets: data.rows,
            }
        })
    } catch(error ) {
        console.error(error)

    }
});
//Get individual data
router.get('/:id', async (req, res) => {
    const {id} = req.params;
    try{
        const data = await pool.query("SELECT * FROM data WHERE id = $1", [id]);
        res.json(
            {
                data : {
                    pet: data.rows[0],
                }
            })
    } catch(err){
        console.error(err)
    }
});

//Create Data
router.post('/', upload.single('image'), async (req, res) => {
    const { filename } = req.file;
    const{category, breed, age, vaccinated, location, status, price, name, number} = req.body;
    try{
        const data = await pool.query("INSERT INTO data(category, image, breed, age, vaccinated, location, status, price, name, number) VALUES ($1, $2, $3, $4, $5 ,$6, $7, $8, $9, $10)", [category, filename,  breed, age, vaccinated, location, status, price, name, number ]);
        res.json({
            data : {
                pet: data.rows[0],
            }
        })
    } catch(err){
        console.error(err)
    }
});

//update Data
router.put('/:id', upload.single('image'), async (req, res) => {
    const {id} = req.params;
    const { filename } = req.file;
    const{category, breed, age, vaccinated, location, status, price, name, number} = req.body;
    try{
        const data = await pool.query("UPDATE data SET category = $1, image= $2, breed = $3, age = $4, vaccinated = $5, location = $6, status = $7, price = $8, name = $9, number = $10 where id = $11", [category, filename, breed, age, vaccinated, location, status, price, name, number, id ]);
        res.json({
            data : {
                pet: data.rows[0],
            }
        })
    } catch(err){
        console.error(err)
    }
});

//Delete Data
router.delete('/:id', async(req, res) => {
    try {
        const data = await pool.query("DELETE FROM data WHERE id = $1", [req.params.id]);
        res.json({
            data : {
                pet: data.rows[0],
            }
        })
    }catch(err){
        console.error(err)
    }
});


module.exports = router;