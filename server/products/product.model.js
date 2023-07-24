const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({

    // _id: { type: Number, unique:true, required: true},
    productName: { type: String, unique:true, required:true },
    category: { type: String, unique: true, required: true },
    createdDate: { type: Date, default: Date.now },
    freshness: { type: String, unique: true, required: true },
    price: { type: String, unique: true, required: true },
    comment: { type: String, unique: true, required: true },
},{
  collection: 'products'
});

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.hash;
    }
});

module.exports = mongoose.model('Product', schema);
