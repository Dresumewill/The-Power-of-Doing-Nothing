console.log("Main JS loaded ✅");

const form = document.getElementById("lead-form");
const feedback = document.querySelector(".form__feedback");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  feedback.textContent = "Submitting…";

  const payload = {
    full_name: document.getElementById("full_name").value.trim(),
    email: document.getElementById("email").value.trim(),
    primary_goal: document.getElementById("primary_goal").value.trim()
  };

  try {
    const res = await fetch("/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Request failed");
    }

    feedback.textContent = "✅ Success! Check your email.";
    form.reset();

  } catch (err) {
    console.error("FETCH ERROR:", err);
    feedback.textContent = "Network error. Please try again.";
  }
});
