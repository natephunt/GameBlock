  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete') {
    console.log("we doing it");
    chrome.scripting.executeScript({
        target: { tabId: tabId },
        function: sendHttpRequestToGemini,
        args: ["please answer exactly yes or no for this question: Based on the following html document, would you say that it is for a gaming website?     ", "AIzaSyAbmwzVvnL1eBuuphxwIgImz-xCcSFldHs"]
    });  }
    console.log("gogo");
  });
  
async function sendHttpRequestToGemini(prompt, apiKey) {
    var documentString = document.documentElement.outerHTML;
    //console.log("documentString: ", documentString);

    prompt = prompt + documentString;
    //console.log("prompt: ", prompt);

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

    const answer = data.candidates[0].content.parts[0].text.trimEnd();

    if (answer == "yes" || answer == "Yes"){
        console.log("it said yes");

        // remove the current document and replace it with the new HTML
        document.documentElement.remove();
        const newHtmlElement = document.createElement('html');
        newHtmlElement.innerHTML = "ur not allowed to access this page!!!";
        document.appendChild(newHtmlElement);
    }
    else if (answer == "no" || answer == "No"){
        console.log("it said no");
    }
    else{
        console.error('Unexpected response from Gemini:', data.candidates[0].content.parts[0].text);
    }

    console.log("start" + data.candidates[0].content.parts[0].text.trimEnd() + "end" + answer + "superend");
    return data.candidates[0].content.parts[0].text;
    } catch (error) {
    console.error('Error sending HTTP request to Gemini:', error);
    // Handle error in your UI
    }
}

  function runMyFunction() {
    console.log("loaded");
    document.head.remove();
  }
  