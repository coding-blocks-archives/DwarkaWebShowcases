const mongoose = require("mongoose");
const Store = mongoose.model("Store");
const multer = require("multer");
const uuid = require("uuid");
const jimp = require("jimp");
const User = require('../models/User');
const multerOptions = {
  storage: multer.memoryStorage(),
  fileFilter(req, file, next){
    const isPhoto = file.mimetype.startsWith("image/");
    if(isPhoto){
      next(null, true);
    }else{
      next(`This file type is not allowed`, true);
    }
  }
}
exports.getStores = async (req, res) => {
  const stores = await Store.find();
  res.render("Store.pug", {title: 'Stores', stores});
};

exports.addStore = (req, res) => {
  res.render("editStore.pug", { title: `Add Store` });
};

exports.upload = multer(multerOptions).single("photo");

exports.resize = async (req, res, next) => {
  if(!req.file){
    next();
    return;
  }else{
    const extensions = req.file.mimetype.split("/");
    req.body.photo = `${uuid.v4()}.${extensions}`;

    const photo = await jimp.read(req.file.buffer);
    await photo.resize(800, jimp.AUTO);
    await photo.write(`./public/uploads/${req.body.photo}`);
    next();
  }
}

exports.createStore = async(req, res) => {
    console.log(req.body);
    req.body.author= req.user._id;
    const store = await (new Store(req.body)).save();
    req.flash("success", "Weldone created new Store, Congrats");
    res.redirect(`/store/${store.slug}`);  
}

const confirmUser = (store, user) => {
  if(!store.author.equals(user._id)){
    throw Error(`You must own the store`);
  }
}

exports.editStore = async (req, res) => {
  const store = await Store.findOne({_id: req.params.id});
  confirmUser(store, req.user);
  res.render("editStore", {title: `Edit ${store.name}`, store});
}

exports.updateStore = async (req, res) => {
  const store = await Store.findOneAndUpdate({_id: req.params.id}, req.body, {
    new: true,
    runValidators: true
  }).exec()
  req.flash("success", `You have successfully Updated the ${store.name}`);
  res.redirect(`/add/${store._id}`);
}

exports.getStoreBySlug = async (req, res, next) => {
  const store = await Store.findOne({slug: req.params.slug}).populate('author reviews');
  if(!store) return next();
  else{
  res.render('store', {store, title: store.name})
  }
}

exports.getStoreByTag = async(req, res) => {
  const tag = req.params.tag;
  const tagQuery = tag || {$exists: true};
  const tagsPromise = Store.getTagsName();
  const storePromise = Store.find({tags: tagQuery});
  const [tags, stores]= await Promise.all([tagsPromise, storePromise])
  res.render('tag', {tag, title: 'tags', tags, stores});
}

exports.searchStores = async (req, res) => {
  const stores = await Store
  .find({
    $text: {
      $search: req.query.q
    }
  }, {
    score: { $meta: 'textScore' }
  })
  .sort({
    score: { $meta: 'textScore' }
  })
  .limit(5);
  res.json(stores);
};

exports.heartStore = async (req, res) => {
  const hearts = req.user.hearts.map(obj => obj.toString());
  const operator = hearts.includes(req.params.id) ? '$pull' : '$addToSet';
  const user = await User
  .findByIdAndUpdate(req.user._id,
    { [operator]: { hearts: req.params.id } },
    { new: true }
  );
  res.json(user);
};

exports.getHearts = async (req, res) => {
  const stores = await Store.find({
    _id: { $in: req.user.hearts }
  });
  res.render("Store", { title: "Hearted Stores", stores });
};
