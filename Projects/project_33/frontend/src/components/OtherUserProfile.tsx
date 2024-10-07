import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

interface UserProfile {
  _id: string;
  username: string;
  profilePicture: string;
  bio: string;
  followers: string[];
  following: string[];
}

const OtherUserProfile: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingFollow, setLoadingFollow] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`/api/auth/user/${userId}`);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  const handleFollow = async (userId: string) => {
    setLoadingFollow(true);
    try {
      setUser((prev) =>
        prev && {
          ...prev,
          following: [...prev.following, userId],
        }
      );
      await axios.post(`/api/auth/follow/${userId}`);
    } catch (error) {
      console.error('Error following user:', error);
    } finally {
      setLoadingFollow(false);
    }
  };

  const handleUnfollow = async (userId: string) => {
    setLoadingFollow(true);
    try {
      setUser((prev) =>
        prev && {
          ...prev,
          following: prev.following.filter((id) => id !== userId),
        }
      );
      await axios.post(`/api/auth/unfollow/${userId}`);
    } catch (error) {
      console.error('Error unfollowing user:', error);
    } finally {
      setLoadingFollow(false);
    }
  };

  if (loading) return <p>Loading user profile...</p>;

  if (!user) return <p>User not found</p>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <img
          src={user?.profilePicture || '/default-profile.jpg'}
          alt="Profile"
          className="w-20 h-20 rounded-full mx-auto -mt-10 border-4 border-white"
        />
        <h2 className="text-2xl font-bold mb-6">{user.username}</h2>
        <div className="mt-4">
          <h3 className="font-semibold">Bio</h3>
          <p>{user.bio || 'No bio available.'}</p>
        </div>
        <div className="mt-4">
          <p>
            <strong>Followers:</strong> {user.followers.length}
          </p>
          <p>
            <strong>Following:</strong> {user.following.length}
          </p>
          {user?.following.includes(user._id) ? (
            <button
              onClick={() => handleUnfollow(user._id)}
              disabled={loadingFollow}
              className={`bg-red-500 text-white px-4 py-2 rounded ${
                loadingFollow ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-600 transition'
              }`}
            >
              {loadingFollow ? 'Unfollowing...' : 'Unfollow'}
            </button>
          ) : (
            <button
              onClick={() => handleFollow(user._id)}
              disabled={loadingFollow}
              className={`bg-blue-500 text-white px-4 py-2 rounded ${
                loadingFollow ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600 transition'
              }`}
            >
              {loadingFollow ? 'Following...' : 'Follow'}
            </button>
          )}
        </div>

        <div className="mt-6">
          <Link
            to="/profile"
            className="text-gray-500 hover:text-gray-700 transition font-semibold inline-flex items-center"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              ></path>
            </svg>
            Back
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OtherUserProfile;
