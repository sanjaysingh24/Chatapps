import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    sender:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content:{
        type: String,
        required: true
    },
    fileName:{
        type: String

    },
    fileUrl:{
        type:String
    },
    filetype:{
        type:String
    },
    status: {
        type: String,
        enum: ['sent', 'delivered', 'read'],
        default: 'sent'
      },

},
{timestamps: true});
export const Message = mongoose.model('Message', messageSchema);