// src/hooks/useProfileForm.ts
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateProfile } from '../redux/profileSlice';

interface ProfileFormState {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  dateOfBirth: string;
  avatar: File | null;
}

const useProfileForm = (initialState: ProfileFormState) => {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, avatar: e.target.files![0] }));
    }
  };

  const handleSubmit = () => {
    const formDataToSubmit = {
      ...formData,
      avatar: formData.avatar ? URL.createObjectURL(formData.avatar) : null,
    };
    dispatch(updateProfile(formDataToSubmit));
  };

  return { formData, handleChange, handleAvatarChange, handleSubmit };
};

export default useProfileForm;

// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { updateProfile } from "../redux/profileSlice";
// import { RootState } from "../redux/store";

// const ProfileForm: React.FC = () => {
//   const dispatch = useDispatch();
//   const profile = useSelector((state: RootState) => state.profile);

//   const [form, setForm] = useState(profile);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     dispatch(updateProfile(form));
//     alert("Profile updated successfully!");
//   };

//   return (
//     <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
//       <input
//         type="text"
//         name="firstName"
//         value={form.firstName}
//         onChange={handleChange}
//         placeholder="First Name"
//         className="border px-3 py-2 rounded"
//         required
//       />
//       <input
//         type="text"
//         name="lastName"
//         value={form.lastName}
//         onChange={handleChange}
//         placeholder="Last Name"
//         className="border px-3 py-2 rounded"
//         required
//       />
//       <input
//         type="email"
//         name="email"
//         value={form.email}
//         onChange={handleChange}
//         placeholder="Email"
//         className="border px-3 py-2 rounded"
//         required
//         disabled
//       />
//       <input
//         type="tel"
//         name="phoneNumber"
//         value={form.phoneNumber}
//         onChange={handleChange}
//         placeholder="Phone Number"
//         className="border px-3 py-2 rounded"
//       />
//       <input
//         type="date"
//         name="dateOfBirth"
//         value={form.dateOfBirth}
//         onChange={handleChange}
//         className="border px-3 py-2 rounded"
//       />
//       <input
//         type="password"
//         name="password"
//         value={form.password}
//         onChange={handleChange}
//         placeholder="New Password"
//         className="border px-3 py-2 rounded"
//       />
//       <button type="submit" className="bg-blue-500 text-white py-2 rounded">
//         Save Changes
//       </button>
//     </form>
//   );
// };

// export default ProfileForm;

