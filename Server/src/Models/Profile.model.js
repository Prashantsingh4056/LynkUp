import mongoose from "mongoose"


const LinkItemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Link title is required'],
    trim: true,
  },
  url: {
    type: String,
    required: [true, 'Destination URL target is required'],
    trim: true,
  }
}, { 
  // Automatically creates 'createdAt' and 'updatedAt' timestamps for individual links
  timestamps: true 
});


const ProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Ties directly to your existing authentication User collection
    required: true,
    unique: true // Guarantees a user can only create exactly one page
  },
  profileImage: {
    url: {
      type: String,
      default: "",
    },
    fileId: {
      type: String,
      default: "",
    }
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    index: true, // Keeps query lookups lightning-fast for public links (e.g., /u/prashant)
    default: "userhandle"
  },
  fullname: {
    type: String,
    required: true,
    trim: true,
  },
  bio: {
    type: String,
    maxLength: [160, 'Bio length cannot exceed 160 characters'],
    default: ""
  },
  // Subdocument collection mapping directly to your frontend dashboard array state
  links: [LinkItemSchema],
  appearance: {
    theme: {
      type: String,
      default: "minimal",
      enum: [
      "minimal",
      "ocean",
      "midnight",
      "forest",
      "lavender",
      "sunset",
      "rose",
      "amber",
      "graphite",
      "lynkup",
      "neo-lime"
    ],
    }
  }
}, {
  // Automatically tracks when the profile page itself was created or modified
  timestamps: true 
});

const ProfileModel = mongoose.model("profile", ProfileSchema);

export default ProfileModel;
