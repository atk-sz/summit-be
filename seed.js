const User = require('./models/user')
const Type = require('./models/type')

const cities = ['Mumbai', 'Bengaluru', 'Kolkata', 'Chennai', 'Hyderabad', 'jaipur', 'Pune']

const seed = async () => {
    // const newTypes = await Type.find()
    // // console.log(newTypes[2]._id)
    // const newUsers = await User.find()
    // newUsers.map(each=>{
    //     console.log(each.type)
    // })
    // const fUser = await User.findOneAndDelete({ email: `syed.zaid98@gmail.com` });
    // const fUser = await User.findOneAndUpdate({ email: `syed.zaid98@gmail.com` },{role:'agent', response:true},{new:true} );
    // console.log("fUser")
    // console.log(fUser)

    // console.log(newUsers.length)
    // const deletedUsers = await User.deleteMany({ response: true })
    // console.log("deletedUsers")
    // console.log(deletedUsers)
    // const newUser = await new User({ name: `Zaid`, email: `syed.zaid525@gmail.com`, emailVerified: true, response: true, request: true, city: 'Bangalore', role: 'admin', type: newTypes[0]._id }).save();
    // for (let i = 0; i < 10; i++) {
    //     const city = Math.floor(Math.random() * 7)
    //     const newUser = await new User({ name: `z${i}`, email: `z${i}@gmail.com`, emailVerified: true, response: true, request: true, city: cities[city], type: newTypes[city]._id }).save();
    //     console.log(`newUser${[i + 1]}`)
    //     console.log(newUser)
    // }
}

module.exports = seed;