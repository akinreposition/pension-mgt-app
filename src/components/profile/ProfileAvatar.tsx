import React, { useState, JSX } from "react";
import { useDispatch } from "react-redux";
import { updateProfile } from "../../redux/profileSlice";

interface ProfileAvatarProps {
  avatar: string | null;
}

const DefaultAvatar = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
    <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
  </svg>
);

const ProfileAvatar: React.FC<ProfileAvatarProps> = ({ avatar }) => {
  const dispatch = useDispatch();
  const [preview, setPreview] = useState<string | JSX.Element>(avatar || <DefaultAvatar />);

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
        {typeof preview === 'string' ? (
          <img
            src={preview}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border"
          />
        ) : (
          <div className="w-24 h-24 rounded-full border flex items-center justify-center">
            {preview}
          </div>
        )}
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