console.log("Main JS loaded ✅");

document.getElementById("lead-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const full_name = document.getElementById("full_name").value;
  const email = document.getElementById("email").value;
  const primary_goal = document.getElementById("primary_goal").value;

  const res = await fetch("/leads", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ full_name, email, primary_goal })
  });

  const data = await res.json();

  document.querySelector(".form__feedback").textContent =
    data.message || "Submitted";
});
