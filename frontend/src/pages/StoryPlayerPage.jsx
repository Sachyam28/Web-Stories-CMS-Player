import React, { useEffect, useState, useRef } from "react";
import { fetchStory } from "../api/storyAPI";
import { useParams, useNavigate } from "react-router-dom";
import "../components/storyPlayer.css";
import { likeStory, dislikeStory, addComment } from "../api/storyAPI";

export default function StoryPlayer() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [story, setStory] = useState(null);
  const [index, setIndex] = useState(0);
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const progressRef = useRef(null);

  // ✅ Fetch story data
  useEffect(() => {
    fetchStory(id).then((data) => {
      if (!data) return;

      data.comments = Array.isArray(data.comments) ? data.comments : [];
      setStory(data);
      setLikes(data.likes || 0);
      setDislikes(data.dislikes || 0);
      setComments(data.comments);
    });
  }, [id]);

  // ✅ Auto-play logic
  useEffect(() => {
    if (!story || isTyping) return;

    const slide = story.slides[index];
    if (!slide) return;

    progressRef.current?.classList.remove("animate");
    void progressRef.current?.offsetWidth; // force reflow
    progressRef.current?.classList.add("animate");

    const timer = setTimeout(() => {
      nextSlide();
    }, slide.duration || 7000);

    return () => clearTimeout(timer);
  }, [story, index, isTyping]);

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


  const handleLike = async () => {
    try {
      const res = await likeStory(id);
      setLikes(res.likes);
    } catch (err) {
      console.error("Failed to like:", err);
    }
  };

  const handleDislike = async () => {
    try {
      const res = await dislikeStory(id);
      setDislikes(res.dislikes);
    } catch (err) {
      console.error("Failed to dislike:", err);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const res = await addComment(id, "Sachyam", newComment);
      setComments(res.comments);
      setNewComment("");
    } catch (err) {
      console.error("Failed to add comment:", err);
    }
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


      <div className="story-title">
        <h3>{story.title}</h3>
        <span className="close-btn" onClick={() => navigate(-1)}>✕</span>
      </div>

      <div className="story-actions" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleLike();
          }}
        >
          👍 {likes}
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            handleDislike();
          }}
        >
          👎 {dislikes}
        </button>
      </div>


      <div className="comments-section" onClick={(e) => e.stopPropagation()}>
        <h4>Comments</h4>
        {comments.length > 0 ? (
          comments.map((c, i) => (
            <div key={i} className="comment">
              <p>{c.text}</p>
              <span>{c.date}</span>
            </div>
          ))
        ) : (
          <p>No comments yet</p>
        )}

        <form onSubmit={handleCommentSubmit} className="comment-form">
          <input
            type="text"
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onFocus={() => setIsTyping(true)}
            onBlur={() => setIsTyping(false)}
          />
          <button type="submit">Post</button>
        </form>
      </div>


    </div>
  );
}
