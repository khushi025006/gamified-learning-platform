import { auth, db } from "../firebase";

import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  setDoc,
  arrayUnion,
  arrayRemove,
  getDoc,
  addDoc,
  serverTimestamp
} from "firebase/firestore";


// =====================================================
// SEARCH USERS
// =====================================================

export const searchUsers = async (name) => {

  console.log("Searching:", name);

  const q = query(
    collection(db, "users"),
    where("firstName", "==", name.trim())
  );

  const snapshot = await getDocs(q);

  console.log("Documents Found:", snapshot.size);

  const users = [];

  snapshot.forEach((document) => {

    users.push({
      id: document.id,
      ...document.data()
    });

  });

  return users;
};


// =====================================================
// SEND FRIEND REQUEST
// =====================================================

export const sendFriendRequest = async (receiverId) => {

  const sender = auth.currentUser;

  if (!sender) {
    throw new Error("You must be logged in.");
  }

  if (!receiverId) {
    throw new Error("Receiver ID is missing.");
  }

  if (sender.uid === receiverId) {
    throw new Error("You cannot add yourself.");
  }

  console.log("Sender UID:", sender.uid);
  console.log("Receiver UID:", receiverId);

  const senderRef = doc(
    db,
    "users",
    sender.uid
  );

  const receiverRef = doc(
    db,
    "users",
    receiverId
  );

  const senderSnap = await getDoc(senderRef);

  const receiverSnap = await getDoc(receiverRef);


  // Receiver doesn't exist

  if (!receiverSnap.exists()) {

    throw new Error(
      "Receiver user document does not exist."
    );

  }


  // Create sender document if missing

  if (!senderSnap.exists()) {

    await setDoc(senderRef, {

      uid: sender.uid,

      email: sender.email || "",

      friends: [],

      friendRequests: [],

      sentRequests: []

    });

  }


  // Add receiver to sender's sent requests

  await updateDoc(senderRef, {

    sentRequests: arrayUnion(receiverId)

  });


  // Add sender to receiver's requests

  await updateDoc(receiverRef, {

    friendRequests: arrayUnion(sender.uid)

  });


  console.log("✅ Friend request sent!");

};


// =====================================================
// GET USER
// =====================================================

export const getUser = async (uid) => {

  const snap = await getDoc(
    doc(db, "users", uid)
  );

  if (!snap.exists()) {

    return null;

  }

  return {

    id: snap.id,

    ...snap.data()

  };

};


// =====================================================
// GET MY FRIENDS
// =====================================================

export const getFriends = async () => {

  const currentUser = auth.currentUser;

  if (!currentUser) {

    return [];

  }

  const me = await getUser(
    currentUser.uid
  );

  if (!me || !me.friends) {

    return [];

  }

  const friends = [];

  for (const friendId of me.friends) {

    const friend = await getUser(
      friendId
    );

    if (friend) {

      friends.push(friend);

    }

  }

  return friends;

};


// =====================================================
// GET RECEIVED REQUESTS
// =====================================================

export const getReceivedRequests = async () => {

  const currentUser = auth.currentUser;

  if (!currentUser) {

    return [];

  }

  const me = await getUser(
    currentUser.uid
  );

  if (!me || !me.friendRequests) {

    return [];

  }

  const requests = [];

  for (const senderId of me.friendRequests) {

    const user = await getUser(
      senderId
    );

    if (user) {

      requests.push(user);

    }

  }

  return requests;

};


// =====================================================
// GET SENT REQUESTS
// =====================================================

export const getSentRequests = async () => {

  const currentUser = auth.currentUser;

  if (!currentUser) {

    return [];

  }

  const me = await getUser(
    currentUser.uid
  );

  if (!me || !me.sentRequests) {

    return [];

  }

  const requests = [];

  for (const receiverId of me.sentRequests) {

    const user = await getUser(
      receiverId
    );

    if (user) {

      requests.push(user);

    }

  }

  return requests;

};


// =====================================================
// ACCEPT FRIEND REQUEST
// =====================================================

export const acceptFriendRequest = async (
  senderId
) => {

  const currentUser = auth.currentUser;

  if (!currentUser) {

    throw new Error(
      "You must be logged in."
    );

  }

  const currentUserRef = doc(
    db,
    "users",
    currentUser.uid
  );

  const senderRef = doc(
    db,
    "users",
    senderId
  );


  // Add sender to my friends

  await updateDoc(
    currentUserRef,
    {

      friends: arrayUnion(senderId),

      friendRequests:
        arrayRemove(senderId)

    }
  );


  // Add me to sender's friends

  await updateDoc(
    senderRef,
    {

      friends:
        arrayUnion(currentUser.uid),

      sentRequests:
        arrayRemove(currentUser.uid)

    }
  );

};


// =====================================================
// REJECT FRIEND REQUEST
// =====================================================

export const rejectFriendRequest = async (
  senderId
) => {

  const currentUser = auth.currentUser;

  if (!currentUser) {

    throw new Error(
      "You must be logged in."
    );

  }

  const currentUserRef = doc(
    db,
    "users",
    currentUser.uid
  );

  const senderRef = doc(
    db,
    "users",
    senderId
  );


  await updateDoc(
    currentUserRef,
    {

      friendRequests:
        arrayRemove(senderId)

    }
  );


  await updateDoc(
    senderRef,
    {

      sentRequests:
        arrayRemove(currentUser.uid)

    }
  );

};


// =====================================================
// CANCEL SENT REQUEST
// =====================================================

export const cancelFriendRequest = async (
  receiverId
) => {

  const currentUser = auth.currentUser;

  if (!currentUser) {

    throw new Error(
      "You must be logged in."
    );

  }

  const senderRef = doc(
    db,
    "users",
    currentUser.uid
  );

  const receiverRef = doc(
    db,
    "users",
    receiverId
  );


  await updateDoc(
    senderRef,
    {

      sentRequests:
        arrayRemove(receiverId)

    }
  );


  await updateDoc(
    receiverRef,
    {

      friendRequests:
        arrayRemove(currentUser.uid)

    }
  );

};
// =====================================================
// CREATE GROUP CHALLENGE
// =====================================================

export const createGroupChallenge = async ({
  playerIds,
  subject,
  chapter,
  difficulty
}) => {

  const currentUser = auth.currentUser;

  if (!currentUser) {
    throw new Error("You must be logged in.");
  }

  if (!playerIds || playerIds.length === 0) {
    throw new Error("Select at least one friend.");
  }

  if (!subject) {
    throw new Error("Select a subject.");
  }

  if (!chapter) {
    throw new Error("Select a chapter.");
  }


  // Creator + selected friends

  const players = [
    currentUser.uid,
    ...playerIds
  ];


  // Create challenge document

  const challengeRef = await addDoc(
    collection(db, "challenges"),
    {

      creatorId: currentUser.uid,

      players: players,

      subject: subject,

      chapter: chapter,

      difficulty: difficulty,

      status: "waiting",

      createdAt: serverTimestamp(),

      joinedPlayers: [
        currentUser.uid
      ]

    }
  );


  // Send invitation to selected friends

  for (const friendId of playerIds) {

    const friendRef = doc(
      db,
      "users",
      friendId
    );

    await updateDoc(friendRef, {

      challengeInvites: arrayUnion(
        challengeRef.id
      )

    });

  }


  console.log(
    "✅ Challenge created:",
    challengeRef.id
  );

  return challengeRef.id;

};