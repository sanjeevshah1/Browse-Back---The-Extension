chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === 'getHistory') {
        const oneDayAgo = new Date().getTime() - (24 * 60 * 60 * 1000);
        chrome.history.search({ text: '', startTime: oneDayAgo }, (historyItems) => {
            let historyArray = historyItems.map(item => item.url);
            console.log("The history array is ", historyArray);
        
            // Store the history array globally for later use
            let historyData = historyArray;
            if (request.type === 'getHistory') {
                // Directly send the response without using sendResponse as it's handled asynchronously
                sendResponse({ data: historyData });
            }
        });
  
        // Ensure this is asynchronous
        return true;
    }
})

