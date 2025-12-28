require('dotenv').config();
 const app=require('./src/app');
const connectDb=require('./src/config/db');

connectDb();

 const PORT=process.env.PORT||1000;
 app.listen(PORT,()=>{
  console.log(`Server is running on port ${PORT}`);
 })