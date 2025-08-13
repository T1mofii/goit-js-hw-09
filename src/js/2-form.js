let formData = {
  email: "",
  message: ""
};

const STORAGE_KEY = "feedback-form-state";
const form = document.querySelector(".feedback-form");

const savedData = localStorage.getItem(STORAGE_KEY);
if (savedData) {
  try {
    formData = JSON.parse(savedData);
    form.elements.email.value = formData.email || "";
    form.elements.message.value = formData.message || "";
  } catch (e) {
    console.error("Помилка при парсингу збережених даних:", e);
  }
}

form.addEventListener("input", (event) => {
  if (event.target.name in formData) {
    formData[event.target.name] = event.target.value.trim();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  }
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!formData.email || !formData.message) {
    alert("Fill please all fields");
    return;
  }

  console.log("Відправлені дані:", formData);

  localStorage.removeItem(STORAGE_KEY);
  formData = { email: "", message: "" };
  form.reset();
});
