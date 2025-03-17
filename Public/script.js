function submitForm() {
    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const email = document.getElementById("email").value.trim();
    const address = document.getElementById("address").value.trim();
    const message = document.getElementById("message");

   
    if (!firstName || !lastName || !phone || !email || !address) {
        message.style.color = "red";
        message.textContent = "All fields are required!";
        return;
    }

    if (!/^\d{10}$/.test(phone)) {
        message.style.color = "red";
        message.textContent = "Phone number must be 10 digits!";
        return;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
        message.style.color = "red";
        message.textContent = "Enter a valid email!";
        return;
    }

    
    fetch("http://localhost:5000/add-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, phone, email, address })
    })
    .then(response => response.json())
    .then(data => {
        message.style.color = "green";
        message.textContent = data.message;

      
        document.getElementById("firstName").value = "";
        document.getElementById("lastName").value = "";
        document.getElementById("phone").value = "";
        document.getElementById("email").value = "";
        document.getElementById("address").value = "";
    })
    .catch(error => {
        console.error("Error:", error);
        message.style.color = "red";
        message.textContent = "Something went wrong!";
    });
}
