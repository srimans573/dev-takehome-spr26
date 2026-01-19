const mongoose = require("mongoose");
//disable typescript eslint since this file is in js

//got to make sure we only send valid data to db
const validSchema = new mongoose.Schema({
  //ID
  ID: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
  },
  //RequestorName
  requestorName: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 30,
  },
  //itemRequested
  itemRequested: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 100,
  },
  //createdDate
  createdDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  //last edited date
  lastEditedDate: {
    type: Date,
  },
  //status
  status: {
    type: String,
    required: true,
    enum: ["pending", "completed", "approved", "rejected"],
  },
});

module.exports = { validSchema };
