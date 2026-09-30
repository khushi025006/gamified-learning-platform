import "./Friends.css";
import { useEffect, useState } from "react";

import { auth } from "../firebase";

import {
  searchUsers,
  sendFriendRequest,
  getFriends,
  getReceivedRequests,
  getSentRequests,
  acceptFriendRequest,
  rejectFriendRequest,
  cancelFriendRequest
} from "../services/friendsService";

function Friends() {

  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);

  const [friends, setFriends] = useState([]);
  const [receivedRequests, setReceivedRequests] = useState([]);
  const [sentRequests, setSentRequests] = useState([]);

  const [activeTab, setActiveTab] = useState("search");

  const [loading, setLoading] = useState(false);
  const [showChallenge, setShowChallenge] = useState(false);

const [selectedPlayers, setSelectedPlayers] = useState([]);

const [challengeSubject, setChallengeSubject] =
  useState("");

const [challengeChapter, setChallengeChapter] =
  useState("");

const [challengeDifficulty, setChallengeDifficulty] =
  useState("Medium");

  // ================= LOAD DATA =================

  const loadData = async () => {

    if (!auth.currentUser) return;

    try {

      const [
        friendsList,
        receivedList,
        sentList
      ] = await Promise.all([
        getFriends(),
        getReceivedRequests(),
        getSentRequests()
      ]);

      setFriends(friendsList);
      setReceivedRequests(receivedList);
      setSentRequests(sentList);

    } catch (error) {

      console.error("Error loading friend data:", error);

    }

  };
const togglePlayer = (friendId) => {

  setSelectedPlayers((previous) => {

    if (previous.includes(friendId)) {

      return previous.filter(
        (id) => id !== friendId
      );

    }

    if (previous.length >= 4) {

      alert(
        "⚠️ You can select maximum 4 friends."
      );

      return previous;

    }

    return [
      ...previous,
      friendId
    ];

  });

};
  // ================= INITIAL LOAD =================

  useEffect(() => {

    loadData();

  }, []);

  // ================= SEARCH =================

  const handleSearch = async () => {

    if (search.trim() === "") {

      alert("🔍 Enter a name to search");

      return;

    }

    try {

      setLoading(true);

      const users = await searchUsers(search.trim());

      // Don't show current user
      const filteredUsers = users.filter(
        user => user.id !== auth.currentUser?.uid
      );

      setResults(filteredUsers);

      setActiveTab("search");

      if (filteredUsers.length === 0) {

        alert("😕 No student found");

      }

    } catch (error) {

      console.error("Search error:", error);

      alert("❌ Something went wrong while searching");

    } finally {

      setLoading(false);

    }

  };

  // ================= SEND REQUEST =================

  const handleSendRequest = async (userId) => {

    try {

      await sendFriendRequest(userId);

      alert("📨 Friend request sent!");

      // Remove user from search results
      setResults(
        results.filter(user => user.id !== userId)
      );

      await loadData();

    } catch (error) {

      console.error("Send request error:", error);

      alert("❌ " + error.message);

    }

  };

  // ================= ACCEPT =================

  const handleAccept = async (userId) => {

    try {

      await acceptFriendRequest(userId);

      alert("🎉 Friend request accepted!");

      await loadData();

    } catch (error) {

      console.error("Accept error:", error);

      alert("❌ Could not accept request");

    }

  };

  // ================= REJECT =================

  const handleReject = async (userId) => {

    try {

      await rejectFriendRequest(userId);

      alert("❌ Friend request rejected");

      await loadData();

    } catch (error) {

      console.error("Reject error:", error);

      alert("❌ Could not reject request");

    }

  };

  // ================= CANCEL =================

  const handleCancel = async (userId) => {

    try {

      await cancelFriendRequest(userId);

      alert("↩️ Friend request cancelled");

      await loadData();

    } catch (error) {

      console.error("Cancel error:", error);

      alert("❌ Could not cancel request");

    }

  };

  // ================= AVATAR =================

  const getAvatar = (heroClass) => {

    if (heroClass === "Warrior") return "⚔️";

    if (heroClass === "Mage") return "🧙";

    if (heroClass === "Ranger") return "🏹";

    return "🛡️";

  };

  return (

    <div className="friends-page">

      {/* ================= HERO ================= */}

      <div className="hero-card">

        <div>

          <h1>👥 SOCIAL HUB</h1>

          <p>
            Connect • Challenge • Learn Together
          </p>

        </div>

        <div className="hero-stats">

          <div className="mini-stat">

            <span>👥</span>

            <h3>{friends.length}</h3>

            <p>Friends</p>

          </div>

          <div className="mini-stat">

            <span>📨</span>

            <h3>{receivedRequests.length}</h3>

            <p>Received</p>

          </div>

          <div className="mini-stat">

            <span>📤</span>

            <h3>{sentRequests.length}</h3>

            <p>Sent</p>

          </div>

        </div>

      </div>


      {/* ================= NAVIGATION ================= */}

      <div className="glass-card">

        <div className="social-tabs">

          <button
            className={
              activeTab === "search"
                ? "social-tab active"
                : "social-tab"
            }
            onClick={() => setActiveTab("search")}
          >
            🔍 Find Friends
          </button>

          <button
            className={
              activeTab === "received"
                ? "social-tab active"
                : "social-tab"
            }
            onClick={() => setActiveTab("received")}
          >
            📨 Received

            {receivedRequests.length > 0 && (
              <span className="notification-count">
                {receivedRequests.length}
              </span>
            )}

          </button>

          <button
            className={
              activeTab === "sent"
                ? "social-tab active"
                : "social-tab"
            }
            onClick={() => setActiveTab("sent")}
          >
            📤 Sent

            {sentRequests.length > 0 && (
              <span className="notification-count">
                {sentRequests.length}
              </span>
            )}

          </button>
          
          <button
            className={
              activeTab === "friends"
                ? "social-tab active"
                : "social-tab"
            }
            onClick={() => setActiveTab("friends")}
          >
            ❤️ My Friends

            {friends.length > 0 && (
              <span className="notification-count">
                {friends.length}
              </span>
            )}

          </button>

        </div>

      </div>


      {/* ================= SEARCH ================= */}

      {activeTab === "search" && (

        <section className="glass-card">

          <div className="section-title">

            <h2>🔍 Find Learning Partner</h2>

            <p>
              Search students by first name
            </p>

          </div>

          <div className="search-row">

            <input
              type="text"
              placeholder="Enter first name..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              onKeyDown={(e) => {

                if (e.key === "Enter") {
                  handleSearch();
                }

              }}
            />

            <button onClick={handleSearch}>

              {loading ? "SEARCHING..." : "SEARCH"}

            </button>

          </div>

        </section>

      )}


      {/* ================= SEARCH RESULTS ================= */}

      {activeTab === "search" && results.length > 0 && (

        <section className="glass-card">

          <h2>🎯 Search Results</h2>

          <div className="results-grid">

            {results.map((user) => (

              <div
                className="friend-card"
                key={user.id}
              >

                <div className="friend-avatar">

                  {getAvatar(user.heroClass)}

                </div>

                <h3>

                  {user.firstName}{" "}
                  {user.lastName}

                </h3>

                <p>
                  🎓 Grade {user.grade}
                </p>

                <p>
                  ⚡ XP {user.xp || 0}
                </p>

                <p>
                  🔥 {user.streak || 0} Day Streak
                </p>

                <button
                  className="add-btn"
                  onClick={() =>
                    handleSendRequest(user.id)
                  }
                >

                  ➕ Add Friend

                </button>

              </div>

            ))}

          </div>

        </section>

      )}


      {/* ================= RECEIVED REQUESTS ================= */}

      {activeTab === "received" && (

        <section className="glass-card">

          <h2>📨 Received Friend Requests</h2>

          <p className="section-description">

            Students who want to join your squad.

          </p>

          {receivedRequests.length === 0 ? (

            <div className="empty-box">

              📨 No Pending Requests

            </div>

          ) : (

            <div className="request-list">

              {receivedRequests.map((friend) => (

                <div
                  className="friend-request-card"
                  key={friend.id}
                >

                  <div className="request-user">

                    <div className="friend-avatar small">

                      {getAvatar(friend.heroClass)}

                    </div>

                    <div>

                      <h3>

                        {friend.firstName}{" "}
                        {friend.lastName}

                      </h3>

                      <p>

                        ⚔️ {friend.heroClass}
                        {" • "}
                        🎓 Grade {friend.grade}

                      </p>

                      <p>

                        ⚡ {friend.xp || 0} XP

                      </p>

                    </div>

                  </div>

                  <div className="request-buttons">

                    <button
                      className="accept-btn"
                      onClick={() =>
                        handleAccept(friend.id)
                      }
                    >

                      ✅ Accept

                    </button>

                    <button
                      className="reject-btn"
                      onClick={() =>
                        handleReject(friend.id)
                      }
                    >

                      ❌ Reject

                    </button>

                  </div>

                </div>

              ))}

            </div>

          )}

        </section>

      )}


      {/* ================= SENT REQUESTS ================= */}

      {activeTab === "sent" && (

        <section className="glass-card">

          <h2>📤 Sent Friend Requests</h2>

          <p className="section-description">

            Requests you have sent to other students.

          </p>

          {sentRequests.length === 0 ? (

            <div className="empty-box">

              📤 No Sent Requests

            </div>

          ) : (

            <div className="request-list">

              {sentRequests.map((friend) => (

                <div
                  className="friend-request-card"
                  key={friend.id}
                >

                  <div className="request-user">

                    <div className="friend-avatar small">

                      {getAvatar(friend.heroClass)}

                    </div>

                    <div>

                      <h3>

                        {friend.firstName}{" "}
                        {friend.lastName}

                      </h3>

                      <p>

                        ⚔️ {friend.heroClass}

                      </p>

                      <p>

                        ⏳ Request Pending

                      </p>

                    </div>

                  </div>

                  <button
                    className="reject-btn"
                    onClick={() =>
                      handleCancel(friend.id)
                    }
                  >

                    ↩️ Cancel Request

                  </button>

                </div>

              ))}

            </div>

          )}

        </section>

      )}


      {/* ================= MY FRIENDS ================= */}

      {activeTab === "friends" && (

        <section className="glass-card">

          <h2>❤️ My Squad</h2>

          <p className="section-description">

            Your accepted learning partners.

          </p>

          {friends.length === 0 ? (

            <div className="empty-box">

              ❤️ You don't have any friends yet.

            </div>

          ) : (

            <div className="results-grid">

              {friends.map((friend) => (

                <div
                  className="friend-card"
                  key={friend.id}
                >

                  <div className="friend-avatar">

                    {getAvatar(friend.heroClass)}

                  </div>

                  <h3>

                    {friend.firstName}{" "}
                    {friend.lastName}

                  </h3>

                  <p>

                    ⚔️ {friend.heroClass}

                  </p>

                  <p>

                    ⚡ XP {friend.xp || 0}

                  </p>

                  <p>

                    🔥 {friend.streak || 0} Day Streak

                  </p>

                  <button
                   className="challenge-btn"
                    onClick={() => setShowChallenge(true)}
                >
                    ⚔️ Start Group Challenge
                    </button>
                </div>

              ))}

              
              

            </div>

          )}

        </section>

      )}
      {/* CHALLENGE */}

<section className="glass-card challenge-card">

  <h2>
    ⚔️ Challenge Arena
  </h2>

  <p>
    Challenge your friends in Quiz Battles.
    Earn XP, Gems and Badges.
  </p>

  <button
    className="challenge-btn"
    onClick={() => setShowChallenge(true)}
  >
    ⚔️ Start Group Challenge
  </button>

</section>


{/* =====================================
    GROUP CHALLENGE MODAL
===================================== */}

{showChallenge && (

  <div className="challenge-overlay">

    <div className="challenge-modal">

      <button
        className="challenge-close"
        onClick={() => setShowChallenge(false)}
      >
        ✕
      </button>

      <h2>
        ⚔️ Create Group Challenge
      </h2>

      <p className="challenge-subtitle">
        Challenge your learning squad!
      </p>


      {/* SELECT FRIENDS */}

      <div className="challenge-section">

        <h3>
          👥 Select Players
        </h3>

        <p>
          Choose up to 4 friends
        </p>

        {friends.length === 0 ? (

          <div className="challenge-empty">

            You don't have any friends yet.

            <br />

            Add friends first to start
            a group challenge.

          </div>

        ) : (

          <div className="challenge-friends">

            {friends.map((friend) => (

              <div
                key={friend.id}
                className={`challenge-player ${
                  selectedPlayers.includes(friend.id)
                    ? "selected"
                    : ""
                }`}
                onClick={() =>
                  togglePlayer(friend.id)
                }
              >

                <div className="challenge-player-avatar">

                  {friend.heroClass === "Warrior"
                    ? "⚔️"
                    : friend.heroClass === "Mage"
                    ? "🧙"
                    : friend.heroClass === "Ranger"
                    ? "🏹"
                    : "🛡️"
                  }

                </div>

                <div>

                  <h4>
                    {friend.firstName}{" "}
                    {friend.lastName}
                  </h4>

                  <p>
                    ⭐ Level {friend.level || 1}
                  </p>

                </div>

                <div className="player-check">

                  {selectedPlayers.includes(friend.id)
                    ? "✓"
                    : "+"
                  }

                </div>

              </div>

            ))}

          </div>

        )}

      </div>


      {/* SUBJECT */}

      <div className="challenge-section">

        <h3>
          📚 Select Subject
        </h3>

        <select
          value={challengeSubject}
          onChange={(e) =>
            setChallengeSubject(e.target.value)
          }
          className="challenge-select"
        >

          <option value="">
            Choose Subject
          </option>

          <option value="Mathematics">
            Mathematics
          </option>

          <option value="Science">
            Science
          </option>

          <option value="English">
            English
          </option>

          <option value="Social Science">
            Social Science
          </option>

        </select>

      </div>


      {/* CHAPTER */}

      <div className="challenge-section">

        <h3>
          📖 Select Chapter
        </h3>

        <select
          value={challengeChapter}
          onChange={(e) =>
            setChallengeChapter(e.target.value)
          }
          className="challenge-select"
        >

          <option value="">
            Choose Chapter
          </option>

          <option value="Chapter 1">
            Chapter 1
          </option>

          <option value="Chapter 2">
            Chapter 2
          </option>

          <option value="Chapter 3">
            Chapter 3
          </option>

        </select>

      </div>


      {/* DIFFICULTY */}

      <div className="challenge-section">

        <h3>
          🎯 Difficulty
        </h3>

        <div className="difficulty-buttons">

          {["Easy", "Medium", "Hard"].map(
            (level) => (

              <button
                key={level}
                className={
                  challengeDifficulty === level
                    ? "difficulty active"
                    : "difficulty"
                }
                onClick={() =>
                  setChallengeDifficulty(level)
                }
              >
                {level}
              </button>

            )
          )}

        </div>

      </div>


      {/* CREATE CHALLENGE */}

      <button
        className="create-challenge-btn"
        onClick={() => {

          if (selectedPlayers.length === 0) {

            alert(
              "⚠️ Select at least one friend."
            );

            return;

          }

          if (!challengeSubject) {

            alert(
              "⚠️ Select a subject."
            );

            return;

          }

          if (!challengeChapter) {

            alert(
              "⚠️ Select a chapter."
            );

            return;

          }

          alert(
            "🚀 Challenge setup complete!"
          );

        }}
      >

        🚀 Create Challenge

      </button>

    </div>

  </div>

)}


</div>
);
      

   
}

export default Friends;