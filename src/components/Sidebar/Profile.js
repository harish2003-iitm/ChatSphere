import React, { useState, useCallback } from "react";
import { useStateValue } from "../../StateProvider";
import firebase from "firebase/compat/app";
import 'firebase/compat/storage';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import "./Profile.css";

function Profile() {
  const [{ user }, dispatch] = useStateValue();
  const [email, setEmail] = useState(user.email); // Assuming the email is part of the user object
  const [phoneNumber, setPhoneNumber] = useState(''); // Initialize with empty string or user's phone number if available

  const changeProfilePhoto = useCallback((e) => {
    const file = e.target.files[0];
    if (!file) return;

    const storageRef = firebase.storage().ref();
    const userProfileRef = storageRef.child(`profile_pictures/${user.uid}.jpg`);

    userProfileRef.put(file).then(async () => {
      try {
        const photoURL = await userProfileRef.getDownloadURL();
        await user.updateProfile({ photoURL });
        dispatch({
          type: 'SET_USER',
          user: { ...user, photoURL },
        });

        const userDocRef = firebase.firestore().collection('users').doc(user.uid);
        userDocRef.update({ photoURL });
      } catch (error) {
        console.error("Error updating profile picture: ", error);
      }
    });
  }, [user, dispatch]);

  // Function to update user profile
  const updateProfile = () => {
    // Here you can implement the logic to update the user's email and phone number
    // This is a placeholder function, you'll need to use Firebase Auth and Firestore as needed
  };

  return (
    <div className="profile">
      <h1>My Profile</h1>
      <img src={user.photoURL} alt="Profile" className="profile-pic" />
      <h3>{user.displayName}</h3>
      <input
        type="file"
        accept="image/*"
        onChange={changeProfilePhoto}
      />
      <input
        type="text"
        placeholder="Enter your name"
        value={user.displayName}
        onChange={(e) => user.updateProfile({ displayName: e.target.value })}
      />
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="tel"
        placeholder="Enter your phone number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <button onClick={updateProfile}>Update Profile</button>
    </div>
  );
}

export default Profile;
