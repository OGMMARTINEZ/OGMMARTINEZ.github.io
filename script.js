document.addEventListener("DOMContentLoaded", function() {
    // Add smooth scrolling to all links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Handle interactions with Jeff
    const sendButton = document.getElementById('send-button');
    const userInput = document.getElementById('user-input');
    const responseContainer = document.getElementById('response-container');

    // Function to get response from OpenAI API
    async function getJeffResponse(message) {
        const apiKey = 'YOUR_API_KEY';  // Replace with your environment variable
        const url = 'https://api.openai.com/v1/chat/completions';  // Correct endpoint for chat-based models

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        };

        const body = JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: "You are a helpful assistant named Jeff." },
                { role: "user", content: message }
            ],
            max_tokens: 150,
            temperature: 0.7
        });

        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: body
        });

        if (response.ok) {
            const data = await response.json();
            return data.choices[0].message.content.trim();
        } else {
            return "Sorry, I am having trouble responding right now.";
        }
    }

    sendButton.addEventListener('click', async () => {
        const userMessage = userInput.value.trim();
        if (userMessage) {
            responseContainer.innerHTML += `<p><strong>You:</strong> ${userMessage}</p>`;
            userInput.value = '';

            // Get response from Jeff
            const jeffResponse = await getJeffResponse(userMessage);
            responseContainer.innerHTML += `<p><strong>Jeff:</strong> ${jeffResponse}</p>`;
        }
    });
});

