emailjs.init("p6JwPuL6S3pnbE69a");

document.getElementById("reportForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const errorBox = document.getElementById("error");
  const successModal = document.getElementById("successModal");
  const trackingCodeEl = document.getElementById("trackingCode");

  errorBox.style.display = "none";

  const formData = new FormData(e.target);
  const description = formData.get("description")?.trim();

  if (!description || description.length < 15) {
    errorBox.textContent = "Description must be at least 15 characters.";
    errorBox.style.display = "block";
    return;
  }

  const trackingCode = "WH-" + Math.floor(100000 + Math.random() * 900000);

  const data = {
    organization: formData.get("org") || "Not specified",
    category: formData.get("category"),
    description,
    incident_time: formData.get("incident_time") || "Not specified",
    location: formData.get("location") || "Not specified",
    tracking: trackingCode
  };

  console.log("📤 Sending report:", data);

  emailjs.send("service_5jeunkc", "template_pac862i", data)
    .then((response) => {
      console.log("✅ Email sent!", response.status, response.text);
      trackingCodeEl.textContent = trackingCode;

      if (successModal.showModal) {
        successModal.showModal();
      } else {
        alert("Report submitted! Tracking Code: " + trackingCode);
      }

      e.target.reset();
    })
    .catch((error) => {
      console.error("❌ EmailJS error:", error);
      errorBox.textContent = "Failed to send report. Try again.";
      errorBox.style.display = "block";
    });
});