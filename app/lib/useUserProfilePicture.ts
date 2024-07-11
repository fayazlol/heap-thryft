import { useEffect, useState } from 'react';

export const useUserProfilePicture = () => {
  const [profilePicture, setProfilePicture] = useState<string>('/default-profile.png');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProfilePicture = async () => {
      try {
        const response = await fetch('/api/userProfilePicture');
        const data = await response.json();
        setProfilePicture(data.profilePicture);
      } catch (error) {
        console.error('Error fetching profile picture:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfilePicture();
  }, []);

  return { profilePicture, loading };
};
