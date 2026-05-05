function validateForm() {
    const name = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const tos = document.getElementById("tos").checked;

    if (name.length < 3) {
      alert("Name must be at least 3 characters");
      return false;
    }

    if (!email.includes("@")) {
      alert("Enter a valid email");
      return false;
    }

    if (password.length < 8) {
      alert("Password must be at least 8 characters");
      return false;
    }

    if (!tos) {
      alert("You must accept Terms & Conditions");
      return false;
    }

    return true;
  }