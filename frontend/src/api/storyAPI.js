const API_BASE = "https://web-stories-cms-player-mpph.vercel.app/api";

export async function fetchStories(category = null) {
  const url = category
    ? `${API_BASE}/stories?category=${category}`
    : `${API_BASE}/stories`;
  const res = await fetch(url);
  return res.json(); 
}

export async function fetchStory(id) {
  const res = await fetch(`${API_BASE}/stories/${id}`);
  return res.json();
}

export async function createStory(formData) {
  const res = await fetch(`${API_BASE}/stories`, {
    method: "POST",
    body: formData,
  });
  return res.json();
}

export async function updateStory(id, formData) {
  const res = await fetch(`${API_BASE}/stories/${id}`, {
    method: "PUT",
    body: formData,
  });
  return res.json();
}

export async function deleteStory(id) {
  const res = await fetch(`${API_BASE}/stories/${id}`, {
    method: "DELETE",
  });
  return res.json();
}

export async function likeStory(id) {
  const res = await fetch(`${API_BASE}/stories/${id}/like`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
  return res.json();
}

export async function dislikeStory(id) {
  const res = await fetch(`${API_BASE}/stories/${id}/dislike`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
  return res.json();
}

export async function addComment(id, user, text) {
  const res = await fetch(`${API_BASE}/stories/${id}/comment`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user, text }),
  });
  return res.json();
} 

export async function fetchComments(id) {
  const res = await fetch(`${API_BASE}/stories/${id}/comments`);
  return res.json();
}
