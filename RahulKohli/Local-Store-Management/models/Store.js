const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const slug = require("slugs");

const storeSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: "Please Enter the Store name"
  },
  slug: String,
  description: {
    type: String,
    trim: true,
    required: true
  },
  tags: [String],
  created: {
    type: Date,
    default: Date.now()
  },
  address: {
      type: String,
      required: `Please Supply the Address`
  },
  photo: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: 'You must supply a Owner'
  },
},{
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

storeSchema.pre('save', async function(next) {
  if (!this.isModified('name')) {
    next();
    return;
  }
  this.slug = slug(this.name);
  const slugRegEx = new RegExp(`^(${this.slug})((-[0-9]*$)?)$`, 'i');
  const storesWithSlug = await this.constructor.find({ slug: slugRegEx });
  if (storesWithSlug.length) {
    this.slug = `${this.slug}-${storesWithSlug.length + 1}`;
  }
  next();
 
});

storeSchema.index({
  name: 'text',
  description: 'text'
});

storeSchema.statics.getTagsName = function() {
  return this.aggregate([
    { $unwind: '$tags' },
    { $group: { _id: '$tags', count: { $sum: 1 } } },
    { $sort: { count: -1 } }
  ]);
}


storeSchema.virtual('reviews', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'store' 
});


module.exports = mongoose.model("Store", storeSchema);
