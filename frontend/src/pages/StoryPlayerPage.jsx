import React, { useEffect, useState, useRef } from "react";
import { fetchStory } from "../api/storyAPI";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../components/storyPlayer.css";

export default function StoryPlayer() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [story, setStory] = useState(null);
  const [index, setIndex] = useState(0);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const progressRef = useRef(null);

  // ✅ Fetch story + comments
  useEffect(() => {
    async function loadStory() {
      const data = await fetchStory(id);
      setStory(data);

      const res = await axios.get(`/api/stories/${id}/comments`);
      setComments(res.data);
    }
    loadStory();
  }, [id]);

  // ✅ Auto-play logic
  useEffect(() => {
    if (!story) return;

    const slide = story.slides[index];
    if (!slide) return;

    progressRef.current?.classList.remove("animate");
    void progressRef.current?.offsetWidth; // force reflow
    progressRef.current?.classList.add("animate");

    const timer = setTimeout(() => {
      nextSlide();
    }, slide.duration || 3000);

    return () => clearTimeout(timer);
  }, [story, index]);

  const nextSlide = () => {
    if (index < story.slides.length - 1) setIndex(index + 1);
    else navigate(-1);
  };

  const prevSlide = () => {
    if (index > 0) setIndex(index - 1);
  };

  const handleTap = (e) => {
    const x = e.clientX;
    const width = window.innerWidth;

    if (x < width * 0.33) prevSlide();
    else nextSlide();
  };

  // ✅ Like, Dislike, Comment Handlers
  const handleLike = async () => {
    const res = await axios.post(`/api/stories/${id}/like`);
    setStory((prev) => ({ ...prev, likes: res.data.likes }));
  };

  const handleDislike = async () => {
    const res = await axios.post(`/api/stories/${id}/dislike`);
    setStory((prev) => ({ ...prev, dislikes: res.data.dislikes }));
  };

  const handleComment = async () => {
    if (!comment.trim()) return;
    const res = await axios.post(`/api/stories/${id}/comment`, {
      user: "Guest",
      text: comment,
    });
    setComments(res.data.comments);
    setComment("");
  };

  if (!story) return <div>Loading...</div>;

  return (
    <div className="story-container" onClick={handleTap}>
      {/* PROGRESS BARS */}
      <div className="story-progress">
        {story.slides.map((_, i) => (
          <div key={i} className="bar">
            <div
              ref={i === index ? progressRef : null}
              className={`inner ${i < index ? "completed" : ""}`}
            ></div>
          </div>
        ))}
      </div>

      {/* CONTENT */}
      <div className="story-content">
        {story.slides[index].type === "video" ? (
          <video
            src={story.slides[index].url}
            autoPlay
            muted
            playsInline
            className="story-media"
          />
        ) : (
          <img
            src={story.slides[index].url}
            alt=""
            className={`story-media ${story.slides[index].animation}`}
          />
        )}
      </div>

      {/* TOP TITLE */}
      <div className="story-title">
        <h3>{story.title}</h3>
        <span className="close-btn" onClick={() => navigate(-1)}>
          ✕
        </span>
      </div>

      {/* ✅ REACTIONS SECTION */}
      <div className="absolute bottom-24 w-full flex justify-center gap-6 text-white">
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleLike();
          }}
          className="px-4 py-2 bg-green-600 rounded-lg hover:bg-green-700 transition"
        >
          ❤️ {story.likes || 0}
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            handleDislike();
          }}
          className="px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700 transition"
        >
          👎 {story.dislikes || 0}
        </button>
      </div>

      {/* ✅ COMMENTS SECTION */}
      <div className="absolute bottom-4 left-0 right-0 bg-black/50 text-white p-3 rounded-t-lg">
        <h4 className="font-semibold mb-2">Comments</h4>

        <div className="max-h-24 overflow-y-auto text-sm mb-2">
          {comments.length === 0 ? (
            <p className="text-gray-300">No comments yet.</p>
          ) : (
            comments.map((c, i) => (
              <p key={i}>
                <b>{c.user}</b>: {c.text}
              </p>
            ))
          )}
        </div>

        <div className="flex gap-2">
          <input
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="flex-1 p-2 text-black rounded"
            placeholder="Add a comment..."
            onClick={(e) => e.stopPropagation()}
          />
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleComment();
            }}
            className="bg-blue-600 px-3 py-2 rounded hover:bg-blue-700"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
