# Browse Back

**Browse Back** is a versatile project that functions as both a React application and a Chrome web extension. Its primary purpose is to allow users to search through their browsing history more efficiently, with advanced features like content scraping for deeper insights.

---

## Features

- Works both as a standalone React app and a Chrome extension.
- Searches browsing history based on user-provided keywords.
- Scrapes website content for a more detailed search experience.
- Simple and intuitive user interface with a modern design.
- Displays search results and browsing history in a user-friendly format.

---

## Using as a Chrome Extension

### Prerequisites:
1. **Google Chrome browser** installed on your system.
2. **Developer mode** enabled in Chrome.

### Steps to Set Up:
1. Clone this repository:
   ```bash
   git clone https://github.com/your-username/browse-back.git
   cd browse-back
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Build the extension:
   ```bash
   npm run build
   ```

4. Open Chrome and go to `chrome://extensions/`.
5. Enable **Developer mode** in the top-right corner.
6. Click on **Load unpacked** and select the `build` folder from the project directory.
7. The extension is now ready to use!

### How to Use:
1. Click on the **Browse Back** extension icon in your Chrome toolbar.
2. Enter the keywords in the search bar to find matching pages from your browsing history.
3. View the results and click on any link to navigate to that page.

---

## Using as a React Application

### Prerequisites:
1. **Node.js** and **npm** installed on your system.
2. Replace the dynamic history fetching logic with hard-coded values in `history.ts`.

### Steps to Set Up:
1. Clone this repository:
   ```bash
   git clone https://github.com/your-username/browse-back.git
   cd browse-back
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Add your browsing history manually to the `history.ts` file:
   ```typescript
   const history = [
     "https://example.com",
     "https://another-site.com",
     // Add more URLs here
   ];

   export default history;
   ```

4. Start the development server:
   ```bash
   npm start
   ```

5. Open your browser and navigate to `http://localhost:3000`.

### How to Use:
1. Type a keyword in the search bar to find matching entries from the hard-coded history.
2. View the results and click on any link to navigate to that page.

---

## Key Files

- **`App.tsx`**: Main component that handles the user interface and search logic.
- **`history.ts`**: Contains browsing history for the React application.
- **`background.js`**: Handles history fetching logic for the Chrome extension.
- **`utils.ts`**: Contains utility functions for web scraping and content parsing.

---

## Troubleshooting

- **Extension not loading history:** Ensure permissions for browsing history are enabled in the `manifest.json` file.
- **React app not working properly:** Ensure the `history.ts` file is updated with valid URLs and restart the development server.
- **429 Error (Too Many Requests):** Be mindful of rate limits when fetching and scraping data from websites.

---

## License

This project is open-source and available under the MIT License.

---

## Contributing

Contributions are welcome! If you'd like to improve this project, please:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-name`).
3. Commit your changes (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-name`).
5. Open a pull request.

---

Enjoy browsing smarter with **Browse Back**!

