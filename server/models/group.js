import mongoose from "mongoose";

const memberSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  role: {
    type: String,
    enum: ['admin', 'member'],
    default: 'member'
  }
});

const groupSchema = new mongoose.Schema({
  groupname: {
    type: String,
    required: true
  },
  groupimage: {
    type: String
  },
  members: [memberSchema],    // ✅ Array of members with roles
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { timestamps: true });

export const Group = mongoose.model('Group', groupSchema);
