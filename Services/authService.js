const jwt = require("jsonwebtoken");
const { User } = require("../models/User");


const signupUser = async (req, res) => {
    try {
      const { username, email, password, role, image } = req.body;
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ error: 'Your email is already in use' });
      }
  
      const hashedPassword = await bcrypt.hash(motdepasse, 10);
      const newUser = await User.create({ 
        username,
        email,
        password: hashedPassword,
        Date: Date.now(),
        role,
        image
      });
  
      const token = jwt.sign({ user_id: newUser.user_id }, 'your_secret_key', { expiresIn: '200h' });
  
      res.json({ token });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erreur serveur' });
    }
  };


const login = async (req,res)=> {
    try{
        const { username, password } = req.body;
        const user = User.findOne({where: { username }});

        if (!user) {
            throw new Error("No username found");
        }
    
        const isMatch = await bcrypt.compare(password, user.password);
    
        if (!isMatch) {
            return res.status(400).json({ error: 'Wrong password' });
        }

        const token = jwt.sign(
            { username: user.username, role: user.role },
            process.env.TOKEN_SECRET,
            { expiresIn: '1h' }
        );
    
        return token;
    }
    catch(err){
        res.status(500).json({ error: err });
    }
    
};

module.exports = { login };
