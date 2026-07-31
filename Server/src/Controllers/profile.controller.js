import ProfileModel from "../Models/Profile.model.js";
import  {uploadFile, deleteFile } from "../utils/imagekit.js";

const saveProfile = async (req, res) => {

  console.log(req.body);
  

  const { bio, username } = req.body;

  const links = req.body.links ? JSON.parse(req.body.links) : [];

  const appearance = req.body.appearance ? JSON.parse(req.body.appearance) : {theme: "minimal"};

  if (bio && bio.length > 160) {
    return res.status(400).json({
      success: false,
      message: "Bio Summary cannot exceed more than 160 characters",
    });
  }

  if (links && Array.isArray(links)) {
    const invalidLink = links.some(
      (link) => !link.title?.trim() || !link.url?.trim(),
    );
    if (invalidLink) {
      return res.status(400).json({
        success: false,
        message:
          "All active web link items must contain a title and valid destination URL",
      });
    }
  }

  try {
    const userId = req.user._id;

    const profileFields = {
        userId,
        bio: bio || '',
        links: links || [],
        appearance
    }

    if (username) {
      profileFields.username = username.toLowerCase().trim().replace(/\s+/g, "");
    }

    const removeImg = req.body.removeImage === "true";
    const existingProfile = await ProfileModel.findOne({userId});

    if(removeImg){

      if(existingProfile?.profileImage?.fileId) {
        await deleteFile(existingProfile.profileImage.fileId)
      }

      profileFields.profileImage = {
        url: "",
        fileId: ""
      };
    }

    if(req.file){

      // Delete Previous Image
      if(existingProfile?.profileImage?.fileId){
        await deleteFile(existingProfile.profileImage.fileId)
      }

      // upload new image
      const result = await uploadFile(req.file.buffer.toString("base64"), userId);

      profileFields.profileImage = {
        url: result.url,
        fileId: result.fileId,
      };

      // const result = await uploadFile(req.file.buffer.toString("base64"), userId);
      // profileFields.profileImage = result.url;
    }

    const profile = await ProfileModel.findOneAndUpdate(
      { userId: userId },
        profileFields ,
      {
        new: true,
        upsert: true,
        runValidators: true,
      },
    );
    

    

    return res.status(200).json({
      success: true,
      message: "Workspace changes pushed successfully",
      profile,
    });
  } catch (error) {
    console.error("Profile save error: ", error.message);

    if (error.code === 11000) {
      return res
        .status(400)
        .json({
          message: "This handle username is already taken by another creator",
        });
    }

    return res.status(500).json({ message: "Internal server error" });
  }
};


const getProfileByUsername = async (req , res) => {

    try {

        const profile = await ProfileModel.findOne({
            username: req.params.username.toLowerCase().trim(),
        })

        if(!profile){
            return res.status(404).json({
                success: false,
                message: "Profile link handle not found on LynkUp"
            })
        }
        

        return res.status(200).json({
            success: true,
            message: "Profile fetched successfully",
            profile
        })
    } catch (error) {
        console.error("Public layout fetch error: ", error);
        
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


const getUserProfileData = async (req , res) => {

    try {

        const profile = await ProfileModel.findOne({userId: req.user._id});
        
        return res.status(200).json({
            success: true,
            message: "Profile fetched successfully",
            profile
        })
        
    } catch (error) {
        console.log("Error fetching user Profile: ", error);
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export {
    saveProfile,
    getProfileByUsername,
    getUserProfileData
};