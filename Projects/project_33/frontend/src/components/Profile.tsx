import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FollowUnfollowList from './FollowUnfollowList'; // Import the FollowUnfollowList component

const Profile: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newBio, setNewBio] = useState('');
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [coverPhoto, setCoverPhoto] = useState<File | null>(null);

  // Fetch user data from API or localStorage
  useEffect(() => {
    const fetchUser = async () => {
      const localUser = localStorage.getItem('userProfile');
      if (localUser) {
        const parsedUser = JSON.parse(localUser);
        setUser(parsedUser);
        setNewBio(parsedUser.bio); // Set the bio for editing
      } else {
        try {
          const response = await axios.get('/api/auth/me');
          const fetchedUser = response.data?.user;
          if (fetchedUser) {
            setUser(fetchedUser);
            setNewBio(fetchedUser.bio); // Set the bio for editing
            // Save to localStorage
            localStorage.setItem('userProfile', JSON.stringify(fetchedUser));
          } else {
            console.error('User data is invalid or incomplete');
          }
        } catch (error) {
          console.error('Error fetching user:', error);
        }
      }
    };
    fetchUser();
  }, []);

  // Handle bio change
  const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewBio(e.target.value);
  };

  // Handle profile picture change
  const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfilePicture(e.target.files[0]);
    }
  };

  // Handle cover photo change
  const handleCoverPhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCoverPhoto(e.target.files[0]);
    }
  };

  // Save profile updates (e.g., bio, profile picture, and cover photo)
  const handleSaveProfile = async () => {
    const formData = new FormData();
    formData.append('bio', newBio);

    if (profilePicture) {
      formData.append('profilePicture', profilePicture);
    }

    if (coverPhoto) {
      formData.append('coverPhoto', coverPhoto);
    }

    try {
      await axios.put('/api/auth/user/profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Update user state with new data
      const updatedUser = { ...user, bio: newBio };
      if (profilePicture) {
        updatedUser.profilePicture = URL.createObjectURL(profilePicture);
      }
      if (coverPhoto) {
        updatedUser.coverPhoto = URL.createObjectURL(coverPhoto);
      }
      setUser(updatedUser);
      setIsEditing(false);

      // Save updated user to localStorage
      localStorage.setItem('userProfile', JSON.stringify(updatedUser));
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  if (!user) {
    return <div>Loading...</div>; // Display a loading message if user is not yet fetched
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <img
          src={user?.coverPhoto || '/default-cover.jpg'} // Fallback for missing cover photo
          alt="Cover"
          className="w-full h-32 object-cover mb-4 rounded"
        />
        <img
          src={user?.profilePicture || '/default-profile.jpg'} // Fallback for missing profile picture
          alt="Profile"
          className="w-20 h-20 rounded-full mx-auto -mt-10 border-4 border-white"
        />
        <h2 className="text-2xl font-bold mb-6">{user?.username || 'No Username'}</h2>
        <p>{user?.email || 'No Email'}</p>
        <div className="mt-4">
          <h3 className="font-semibold">Bio</h3>
          {isEditing ? (
            <textarea
              value={newBio}
              onChange={handleBioChange}
              className="p-2 border rounded w-full"
            />
          ) : (
            <p>{user?.bio || 'No bio available.'}</p> // Fallback for missing bio
          )}
        </div>
        {isEditing && (
          <>
            <div className="mt-4">
              <label className="block font-semibold">Change Profile Picture</label>
              <input type="file" accept="image/*" onChange={handleProfilePictureChange} />
            </div>
            <div className="mt-4">
              <label className="block font-semibold">Change Cover Photo</label>
              <input type="file" accept="image/*" onChange={handleCoverPhotoChange} />
            </div>
          </>
        )}
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="mt-4 bg-blue-500 text-white p-2 rounded w-full"
        >
          {isEditing ? 'Cancel' : 'Edit Profile'}
        </button>
        {isEditing && (
          <button
            onClick={handleSaveProfile}
            className="mt-2 bg-green-500 text-white p-2 rounded w-full"
          >
            Save
          </button>
        )}
      </div>
      <FollowUnfollowList />
    </div>
  );
};

export default Profile;
