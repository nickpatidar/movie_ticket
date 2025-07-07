import mongoose from 'mongoose';


function connectToDb() {
    mongoose.connect(process.env.DB_CONNECT
    ).then(() => {
        console.log('Connected to MongoDB');
    }).catch(err => console.log(err));
}


export default connectToDb;