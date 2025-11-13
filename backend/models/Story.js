const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  user: { type: String, required: true },   // store user/admin name or "Anonymous"
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const SlideSchema = new mongoose.Schema({
  type: { type: String, enum: ['image', 'video'], required: true },
  url: { type: String, required: true },
  public_id: { type: String }, // Cloudinary public id (used to delete)
  animation: { type: String, default: null },
  duration: { type: Number, default: 5000 } // ms for images; ignored for video
}, { _id: false });

const StorySchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, index: true, default: 'General' },
  slides: [SlideSchema],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },

  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
},
  { timestamps: true }
);

module.exports = mongoose.model('Story', StorySchema);
