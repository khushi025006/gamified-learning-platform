import "./profile.css";
import { useEffect, useState } from "react";
import { subjectsByClass } from "../data/subjects";
import { badges } from "../data/badges";

import { auth, db } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

function Profile() {

  const [student, setStudent] = useState(null);
  const [studentClass, setStudentClass] = useState("");
  const [loading, setLoading] = useState(true);

  // ==========================================
  // LOAD USER FROM FIRESTORE
  // ==========================================

 useEffect(() => {

  const unsubscribe = onAuthStateChanged(
    auth,
    async (user) => {

      if (!user) {

        setStudent(null);
        setLoading(false);
        return;

      }

      try {

        console.log("Logged in UID:", user.uid);

        const userRef = doc(
          db,
          "users",
          user.uid
        );

        const snapshot = await getDoc(userRef);

        console.log(
          "Firestore user exists:",
          snapshot.exists()
        );

        if (snapshot.exists()) {

          const data = snapshot.data();

          console.log(
            "Firestore user data:",
            data
          );

          setStudent({
            uid: user.uid,
            ...data
          });

          setStudentClass(
            data.grade || "1"
          );

        } else {

          console.error(
            "No Firestore document found for UID:",
            user.uid
          );

          setStudent(null);

        }

      } catch (error) {

        console.error(
          "Error loading profile:",
          error
        );

        setStudent(null);

      } finally {

        setLoading(false);

      }

    }
  );

  return () => unsubscribe();

}, []);


  // ==========================================
  // SAVE CLASS TO FIRESTORE
  // ==========================================

  const saveClass = async () => {

    try {

      const user = auth.currentUser;

      if (!user) {

        alert(
          "Please login first."
        );

        return;

      }

      const userRef = doc(
        db,
        "users",
        user.uid
      );

      await updateDoc(
        userRef,
        {
          grade: studentClass
        }
      );

      // Update local React state
      setStudent((previous) => ({
        ...previous,
        grade: studentClass
      }));

      alert(
        "✅ Class updated successfully!"
      );

    } catch (error) {

      console.error(
        "Error updating class:",
        error
      );

      alert(
        "❌ Failed to update class."
      );

    }

  };


  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {

    return (
      <div className="profile-page">

        <div className="profile-card">

          <h2>
            ⏳ Loading Profile...
          </h2>

        </div>

      </div>
    );

  }


  // ==========================================
  // NO USER
  // ==========================================

  if (!student) {

    return (
      <div className="profile-page">

        <div className="profile-card">

          <h2>
            ⚠️ User profile not found
          </h2>

          <p>
            Please login again.
          </p>

        </div>

      </div>
    );

  }


  // ==========================================
  // FIRESTORE DATA
  // ==========================================

  const progress =
    student.progress || [];

  const completedChapters =
    progress.length;

  const xp =
    student.xp || 0;

  const gems =
    student.gems || 0;

  const level =
    student.level ||
    Math.floor(xp / 200) + 1;


  // ==========================================
  // BADGES
  // ==========================================

  const earnedBadges =
    badges.filter(
      (badge) =>
        completedChapters >= badge.chapters
    );


  // ==========================================
  // RENDER
  // ==========================================

  return (

    <div className="profile-page">

      {/* ================= PROFILE CARD ================= */}

      <div className="profile-card">

        <div className="avatar">

          {student.avatar ||
            student.heroClass ||
            "👦"}

        </div>

        <h1>

          {student.firstName || "Student"}

          {" "}

          {student.lastName || ""}

        </h1>

        <p>
          Class {studentClass} Student
        </p>

        <div className="level">

          ⭐ Level {level} Explorer

        </div>

        <br />

        {/* CLASS */}

        <select
          value={studentClass}
          onChange={(e) =>
            setStudentClass(
              e.target.value
            )
          }
        >

          {[1,2,3,4,5,6,7,8,9,10].map(
            (cls) => (

              <option
                key={cls}
                value={cls}
              >

                Class {cls}

              </option>

            )
          )}

        </select>


        <button
          onClick={saveClass}
        >

          Save Class

        </button>

      </div>


      {/* ================= SUBJECTS ================= */}

      <div className="achievement-card">

        <h2>

          📚 Subjects For Class{" "}

          {studentClass}

        </h2>

        <div className="badges">

          {(subjectsByClass[
            studentClass
          ] || []).map(
            (subject, index) => (

              <div
                className="badge"
                key={index}
              >

                {subject}

              </div>

            )
          )}

        </div>

      </div>


      {/* ================= BADGES ================= */}

      <div className="achievement-card">

        <h2>

          🏆 Earned Badges

        </h2>

        <div className="badges">

          {earnedBadges.length === 0 ? (

            <div className="badge">

              Complete chapters to
              unlock badges

            </div>

          ) : (

            earnedBadges.map(
              (badge, index) => (

                <div
                  key={index}
                  className="badge"
                >

                  {badge.name}

                </div>

              )
            )

          )}

        </div>

      </div>


      {/* ================= STATS ================= */}

      <div className="stats-grid">

        <div className="stat-box">

          <h2>
            {xp}
          </h2>

          <p>
            XP Points
          </p>

        </div>


        <div className="stat-box">

          <h2>
            {level}
          </h2>

          <p>
            Level
          </p>

        </div>


        <div className="stat-box">

          <h2>
            💎 {gems}
          </h2>

          <p>
            Total Gems
          </p>

        </div>


        <div className="stat-box">

          <h2>
            {completedChapters}
          </h2>

          <p>
            Chapters Completed
          </p>

        </div>


        <div className="stat-box">

          <h2>
            {earnedBadges.length}
          </h2>

          <p>
            Badges Earned
          </p>

        </div>

      </div>

    </div>

  );

}

export default Profile;