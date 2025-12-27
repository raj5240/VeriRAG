async function askQuestion() {
    const questionInput = document.getElementById("question");
    const responseBox = document.getElementById("response");
    const loading = document.getElementById("loading");

    const question = questionInput.value.trim();

    if (!question) {
        responseBox.innerText = "❗ Please enter a question.";
        return;
    }

    // Reset UI
    responseBox.innerText = "";
    loading.classList.remove("hidden");

    try {
        const res = await fetch("http://127.0.0.1:8000/query", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            // IMPORTANT: Send JSON object, not raw string
            body: JSON.stringify({
                question: question
            })
        });

        if (!res.ok) {
            throw new Error(`Server error: ${res.status}`);
        }

        const data = await res.json();

        // Pretty-print response
        responseBox.innerText = JSON.stringify(data, null, 2);
    } catch (error) {
        console.error(error);
        responseBox.innerText = "❌ Error connecting to backend.";
    } finally {
        loading.classList.add("hidden");
    }
}
