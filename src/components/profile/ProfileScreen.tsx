import React from "react";
import { useSelector } from "react-redux";
import ProfileAvatar from "./ProfileAvatar";
import useProfileForm from "../../hooks/useProfileForm"; // Update path based on your project
import { RootState } from "../../redux/store"; // Update path based on your project

const ProfileScreen: React.FC = () => {
  const profile = useSelector((state: RootState) => state.profile);

  const { formData, handleChange, handleAvatarChange, handleSubmit } = useProfileForm({
    firstName: profile.firstName,
    lastName: profile.lastName,
    email: profile.email,
    password: profile.password,
    dateOfBirth: profile.dateOfBirth,
    phoneNumber: profile.phoneNumber,
    avatar: profile.avatar ? new File([profile.avatar], "avatar.jpg") : null,
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold text-center mb-4">Profile</h2>
        <ProfileAvatar avatar={profile.avatar} />
        <form onSubmit={handleSubmit}>
          <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
          <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
          <input type="password" name="password" value={formData.password} onChange={handleChange} />
          <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} />
          <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
          <input type="file" name="avatar" onChange={handleAvatarChange} />
          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  );
};

export default ProfileScreen;
