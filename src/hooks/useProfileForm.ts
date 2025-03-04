import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateProfile } from '../redux/profileSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

interface ProfileFormState {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  dateOfBirth: string;
  avatar: File | null;
  nextOfKinName: string;
  nextOfKinPhone: string;
  employerName: string;
  employerAddress: string;
}

const useProfileForm = (initialState: ProfileFormState) => {
  const navigate = useNavigate();
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formDataToSubmit = {
      ...formData,
      avatar: formData.avatar ? URL.createObjectURL(formData.avatar) : null,
    };
    dispatch(updateProfile(formDataToSubmit));
    toast.success('Profile updated successfully');
    navigate("/dashboard/member");
  };

  return { formData, handleChange, handleAvatarChange, handleSubmit };
};

export default useProfileForm;