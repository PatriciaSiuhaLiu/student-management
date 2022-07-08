import express from "express";
import User from "../models/userModel.js";
import Student from "../models/studentModel.js";
import asyncHandler from "express-async-handler";

const router = express.Router();

router.get(
  "/studentsDetails/:userEmail",
  asyncHandler(async (req, res) => {
    //Fetch user details from db based on userEmail
    const userEmail = req.params.userEmail;
    const userByEmail = await User.find({ email: userEmail });

    if (userByEmail && userByEmail[0]) {
      if (userByEmail[0].isAdmin) {
        // If admin get student details from db
        res.json(await Student.find({}));
      } else {
        // If not admin send error - not authorised
        res.status(503).send({ error: "Not authorised" });
      }
    } else {
      // If user not found send error - user not found
      res.status(401).send({ data: "User Not found" });
    }
  })
);

router.post(
  "/studentCreate",
  asyncHandler(async (req, res) => {
    const student = new Student(req.body);
    const createsStudent = await student.save();
    res.status(200).send(createsStudent);
  })
);

export default router;
