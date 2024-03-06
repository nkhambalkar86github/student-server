import  express from "express";
import mongoose from "mongoose";
import { Student } from "./StudentModel.js";
import cors from "cors";
import { DELETE_SUCCESS, ERROR_MESSAGE, INSERT_SUCCESS, UPDATE_SUCCESS } from "./constants.js";

const app = express();
app.use(express.json());
app.use(cors());

const connectDB= async ()=>{

    try {
       await mongoose.connect('mongodb://127.0.0.1:27017/schooldb');
       console.log('database connection is createded');
    } catch (error) {
        console.log(error);
    }
}

app.post("/std",async(request,response)=>{

    try {
        const reqData = request.body;
        const student=new Student(reqData);
        await student.save();
        response.send({message:INSERT_SUCCESS});
    } catch (error) {
        console.log({message:ERROR_MESSAGE});
    }
}) 


app.get("/getData",async(request,response)=>{
    try {
        const students = await Student.find();
        response.send({students:students});
    } catch (error) {
        response.send({message:ERROR_MESSAGE});
    }
})

app.get("/get/:roll",async(request,response)=>{

    try {
       const student= await Student.findOne({roll:request.params.roll});
       response.send({student:student});
    } catch (error) {
        
        response.send({message:ERROR_MESSAGE});
    }
})

app.delete("/del/:roll",async(request,response)=>{
  try {
    await Student.deleteOne({roll:request.params.roll});
    response.send({message:DELETE_SUCCESS});
  } catch (error) {
    response.send({message:ERROR_MESSAGE});

  }
})

app.put("/update/:roll",async(request,response)=>{
 try {
    await Student.updateOne({roll:request.params.roll},request.body);
    response.send({message:UPDATE_SUCCESS});
 } catch (error) {
    response.send({message:ERROR_MESSAGE});
 }
})

app.listen(6780,()=>{
    console.log("server started...6780");
    connectDB();

})