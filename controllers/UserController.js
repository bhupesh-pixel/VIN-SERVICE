const mongoService = require('../services/mongoService');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserController = {
  register: async (req, res) => {
    try {
      const { username, password, accessProfile } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await mongoService.addUser({ username, password: hashedPassword, accessProfile });
      res.status(201).json(newUser);
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ error: error.message });
    }
  },

  login: async (req, res) => {
    try{
      const { username, password } = req.body;
      const user = await mongoService.getUserByUsername(username);
      if (!user) {
        return res.status(400).json({ message: 'User not found' });
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({ message: 'Invalid password' });
      }else{
        const data = {};
      data['check'] = true;
      data['token']=  jwt.sign({ userId: user._id, accessProfile: user.accessProfile }, 'anjalisahu', { expiresIn: '1h' });
      data['userInfo'] = {
        id: user._id,
        username: user.username,
        accessProfile:user.accessProfile
      }
      res.status(200).json(data);
      }
      
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = UserController;
