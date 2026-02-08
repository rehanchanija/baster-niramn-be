const mongoose = require('mongoose');

async function checkUsers() {
  try {
    await mongoose.connect('mongodb+srv://buildswithrehan:buildswithrehan@cluster0.cs9klt9.mongodb.net/baster');
    console.log('Connected to MongoDB');
    
    // Define a simple schema to fetch users
    const UserSchema = new mongoose.Schema({}, { strict: false, collection: 'users' });
    
    const User = mongoose.model('User', UserSchema);
    
    const users = await User.find({});
    console.log('Total users found:', users.length);
    users.forEach(u => {
      console.log('User JSON:', JSON.stringify(u, null, 2));
    });
    
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

checkUsers();
