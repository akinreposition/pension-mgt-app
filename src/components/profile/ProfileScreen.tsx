import React from "react";
import { useSelector } from "react-redux";
import ProfileAvatar from "./ProfileAvatar";
import useProfileForm from "../../hooks/useProfileForm"; // Update path based on your project
import { RootState } from "../../redux/store"; // Update path based on your project

const ProfileScreen: React.FC = () => {
  const profile = useSelector((state: RootState) => state.profile);
  const contributions = useSelector((state: RootState) => state.contributions);

  const { formData, handleChange, handleAvatarChange, handleSubmit } = useProfileForm({
    firstName: profile.firstName,
    lastName: profile.lastName,
    email: profile.email,
    password: profile.password,
    dateOfBirth: profile.dateOfBirth,
    phoneNumber: profile.phoneNumber,
    avatar: profile.avatar ? new File([new Blob([profile.avatar])], "avatar.jpg") : null,
    nextOfKinName: profile.nextOfKinName,
    nextOfKinPhone: profile.nextOfKinPhone,
    employerName: profile.employerName,
    employerAddress: profile.employerAddress,
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold text-center mb-4">Profile</h2>
        <ProfileAvatar avatar={profile.avatar} />
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="First Name"
          />
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Last Name"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Email"
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Password"
          />
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Phone Number"
          />
          <input
            type="file"
            name="avatar"
            onChange={handleAvatarChange}
            className="w-full p-2 border border-gray-300 rounded"
          />

          {/* Next of Kin Information */}
          <h3 className="text-lg font-semibold mt-4">Next of Kin Information</h3>
          <input
            type="text"
            name="nextOfKinName"
            value={formData.nextOfKinName}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Next of Kin Name"
          />
          <input
            type="tel"
            name="nextOfKinPhone"
            value={formData.nextOfKinPhone}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Next of Kin Phone"
          />

          {/* Employer Information */}
          <h3 className="text-lg font-semibold mt-4">Employer Information</h3>
          <input
            type="text"
            name="employerName"
            value={formData.employerName}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Employer Name"
          />
          <input
            type="text"
            name="employerAddress"
            value={formData.employerAddress}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Employer Address"
          />

          <button
            type="submit"
            className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Save
          </button>
        </form>

        {/* Last 5 Contribution Transactions */}
        <h3 className="text-lg font-semibold mt-4">Last 5 Contributions</h3>
        <ul className="list-disc list-inside">
          {Array.isArray(contributions) && contributions.slice(0, 5).map((contribution, index) => (
            <li key={index} className="text-sm text-gray-700">
              {contribution.date}: ${contribution.amount}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProfileScreen;