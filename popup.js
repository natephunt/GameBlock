document.addEventListener('DOMContentLoaded', function() {
  const myButton = document.getElementById('myButton');
  myButton.addEventListener('click', function() {
    // Replace with your actual API key and function call
    const apiKey = 'AIzaSyAbmwzVvnL1eBuuphxwIgImz-xCcSFldHs'; 
    const prompt = 'write a story about cs capstone class';
    //sendHttpRequestToGemini(prompt, apiKey);
  });
});

// this is just for testing
async function sendHttpRequestToGemini(prompt, apiKey) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    const requestBody = {
    contents: [
        {
        parts: [
            {
            text: prompt,
            },
        ],
        },
    ],
    };

    try {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data.candidates[0].content.parts[0].text);
    return data.candidates[0].content.parts[0].text;
    } catch (error) {
    console.error('Error sending HTTP request to Gemini:', error);
    // Handle error in your UI
    }
}
