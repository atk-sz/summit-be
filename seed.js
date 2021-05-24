const User = require('./models/user')
const Type = require('./models/type')

const cities = ['Mumbai', 'Bengaluru', 'Kolkata', 'Chennai', 'Hyderabad', 'jaipur', 'Pune']

const seed = async () => {
    const newTypes = await Type.find()
    // console.log(newTypes)
    // const newUsers = await User.findOne({email:'dpac9525@gmail.com'})
    // console.log(newUsers)
    // newUsers.map(each=>{
    //     console.log(each.type)
    // })
    // const fUser = await User.find({city:'Bangalore' });
    // console.log(fUser)
    // console.log(fUser.length)
    // const fUser = await User.findOneAndUpdate({ email: `dpac9525@gmail.com` },{role:'admin'},{new:true} );
    // console.log("fUser")
    // console.log(fUser)

    // console.log(newUsers.length)
    // const deletedUsers = await User.deleteMany({ response: true })
    // console.log("deletedUsers")
    // console.log(deletedUsers)
    // const newUser = await new User({ name: `Zaid`, email: `syed.zaid525@gmail.com`, emailVerified: true, response: true, request: true, city: 'Bangalore', role: 'admin', type: newTypes[0]._id }).save();
    // for (let i = 10; i < 14; i++) {
    //      const newTypes = await new Type({name:`type${i}`}).save()
    //   console.log(newTypes)
    //     const city = Math.floor(Math.random() * 7)
    //     const newUser = await new User({ name: `z${i}`, email: `z${i}@gmail.com`, emailVerified: true, response: true, request: false, city: cities[city], type: newTypes[city]._id }).save();
    //     console.log(`newUser${[i + 1]}`)
    //     console.log(newUser)
    // }
}

module.exports = seed;