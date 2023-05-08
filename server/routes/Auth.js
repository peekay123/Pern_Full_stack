const router = require('express').Router();
const bcrypt = require('bcrypt');
const pool = require('../database/db');
const jwtGenerator = require('../utils/jwtGenerator');
const validInfo = require('../middleware/validInfo');
const authorization = require('../middleware/authorization');

//register
router.post('/register', validInfo, async (req, res) => {
    try{   
        const {name, email, password} = req.body;

        const user = await pool.query('SELECT * FROM admin WHERE user_email = $1', [email]);
        
        //check if user already exists or not
        if(user.rows.length !== 0){
            return res.status(401).send('User Already Exist');
        }

        //password encryption

        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);

        const encryptpassword = await bcrypt.hash(password, salt);

        const new_user = await pool.query(
            'INSERT INTO admin (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *', 
            [name, email, encryptpassword]
        );

        //jwttoken
        const token = jwtGenerator(
            new_user.rows[0].user_id
            );
        res.json({token})
    }catch(error){
        console.log(error.message);
    }
}); 

//login
router.post('/login', validInfo, async(req, res) => {
    try{
        const {email, password} = req.body;

        const user = await pool.query('SELECT * FROM admin WHERE user_email = $1',
        [email]
        );

        if (user.rows.length === 0) {
            return res.status(400).json('Password or Email is incorrect')
        }

        const validPassword = await bcrypt.compare(password, user.rows[0].user_password);

        if(!validPassword){
            return res.status(401).json('Password or Email is incorrect')
        };

        const token = jwtGenerator(user.rows[0].user_id);

        res.json({token})
    }catch(errror) {
        console.log(error.message)
    }
});

router.get('/is-verify', authorization, async(req, res) => {
    try{
        res.json(true);

    }catch(error){
        console.error(error.message)
        res.status(500).send('Server Error')
    }
})


module.exports = router;