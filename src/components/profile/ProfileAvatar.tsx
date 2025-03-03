import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateProfile } from "../../redux/profileSlice";

interface ProfileAvatarProps {
  avatar: string | null;
}

const ProfileAvatar: React.FC<ProfileAvatarProps> = ({ avatar }) => {
  const dispatch = useDispatch();
  const [preview, setPreview] = useState<string | null>(avatar);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);
      dispatch(updateProfile({ avatar: imageUrl }));
    }
  };

  return (
    <div className="flex flex-col items-center mb-4">
      <label className="cursor-pointer">
        <img
          src={preview || "https://www.pexels.com/photo/grayscale-photography-of-man-wearing-coat-25733/"}
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover border"
        />
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageUpload}
        />
      </label>
      <p className="text-xs text-gray-500 mt-2">Click to upload image</p>
    </div>
  );
};

export default ProfileAvatar;
