import { useState, useEffect } from "react";
import { Search, ExternalLink, History, X } from "lucide-react";
import history from "./history";
import Loading from "./Components/Loading";
import { desiredHTML } from "./types";
import { fetchWebsite, getHTMLContent } from "./utils";

const App = () => {
  const [historyArray, setHistoryArray] = useState<string[]>([]);
  const [scrapeArray, setScrapeArray] = useState<desiredHTML[]>([]);
  const [searchText, setSearchText] = useState('');
  const [foundPages, setFoundPages] = useState<string[]>([]);
  const [showHistory, setShowHistory] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [isSearching, setIsSearching] = useState<boolean>(false);

  const search = (event: React.FormEvent) => {
    event.preventDefault();
    if (!searchText.trim()) return;
    
    setIsSearching(true);
    setLoading(true);
    if(foundPages.length > 0) {
      setFoundPages([]);
    }
    
    const matchingPages: string[] = [];
    scrapeArray.forEach((data, index) => {
      const textContent = data.textContent.toLowerCase();
      const headings = data.headings.map((heading) => heading.toLowerCase());
      if (textContent.includes(searchText.toLowerCase()) || headings.includes(searchText.toLowerCase())) {
        matchingPages.push(historyArray[index]);
      }
    });
    
    setFoundPages(matchingPages);
    setLoading(false);
  };

  useEffect(() => {
    setHistoryArray([])
    if (chrome.runtime) {
      chrome.runtime.sendMessage({ type: 'getHistory' }, (response) => {
        if (response && response.data) {
          setHistoryArray((prev)=> [...prev, ...response.data]);
        }
      });
    } else {
      setHistoryArray(history);
    }
  }, []);

  // useEffect(() => {
  //   // Clear history when opening the extension and set a loading state
  //   setLoading(true);
    
  //   if (chrome.runtime) {
  //     // Send a message to the background script to get the latest history
  //     chrome.runtime.sendMessage({ type: 'getHistory' }, (response) => {
  //       if (response && response.data) {
  //         setHistoryArray(response.data);  // Set the latest history from the background
  //       }
  //       setLoading(false);  // Stop loading once the history is fetched
  //     });
  //   } else {
  //     // Fallback in case there's no Chrome runtime
  //     setHistoryArray(history);
  //     setLoading(false);
  //   }
  // }, []);  // This useEffect only runs once when the component is mounted (when the extension is opened)
  

  useEffect(() => {
    if (historyArray.length > 0) {
      fetchAndScrape();
    }
  }, [historyArray]);

  const fetchAndScrape = async () => {
    const fetchedHTML = await Promise.all(
      historyArray.map(async (website) => await fetchWebsite(website))
    );
    const scrapedData = fetchedHTML.map((htmlContent) =>
      getHTMLContent(htmlContent)
    );
    setScrapeArray(scrapedData);
  };

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSearchText(event.target.value);
  };

  const clearSearch = () => {
    setSearchText('');
    setIsSearching(false);
    setFoundPages([]);
  };

  return (
    <div className="min-h-[500px] w-[350px] bg-gradient-to-br from-purple-700 via-purple-800 to-purple-900 p-3">
      <div className="h-full bg-white/10 rounded-xl shadow-lg backdrop-blur-sm overflow-hidden transition-all duration-300">
        <header className="p-4 border-b border-white/10">
          <h1 className="text-center text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200 mb-2 hover:scale-105 transition-transform">
            Browse Back
          </h1>
          <h2 className="text-center text-purple-200 text-sm opacity-80 hover:opacity-100 transition-opacity">
            A smarter way to browse back through your history
          </h2>
        </header>

        <main className="p-4 overflow-y-auto h-[calc(100%-128px)]">
          <form className="mb-4 relative" onSubmit={search}>
            <div className="relative group">
              <textarea
                className="w-full p-4 rounded-lg bg-white/5 text-white placeholder-purple-200/70
                         outline-none resize-none border border-white/20 focus:border-white/40 
                         transition-all duration-300 shadow-lg text-base h-24 focus:h-32"
                value={searchText}
                onChange={handleChange}
                placeholder="Search your browsing history..."
              />
              {searchText && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="absolute top-3 right-12 p-1.5 rounded-lg hover:bg-white/10 
                           transition-colors group"
                >
                  <X className="text-purple-200 w-4 h-4 group-hover:rotate-90 transition-transform" />
                </button>
              )}
              <button 
                type="submit"
                disabled={!searchText.trim()}
                className="absolute top-3 right-3 p-1.5 rounded-lg bg-purple-500 hover:bg-purple-400 
                         transition-all duration-300 shadow-lg group disabled:opacity-50 
                         disabled:hover:bg-purple-500"
              >
                <Search className="text-white w-4 h-4 group-hover:scale-110 transition-transform" />
              </button>
            </div>
          </form>

          <div className={`transition-all duration-500 ${isSearching ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="bg-white/5 rounded-lg p-4 shadow-xl">
              <h3 className="text-white text-sm flex items-center gap-2 mb-3">
                <Search className="w-4 h-4" />
                Search Results
              </h3>
              
              {loading ? (
                <div className="flex justify-center py-4">
                  <Loading />
                </div>
              ) : (
                <div className="space-y-2">
                  {foundPages.length === 0 ? (
                    <div className="text-purple-200 text-center py-4 text-sm">No matching pages found</div>
                  ) : (
                    foundPages.map((item, index) => (
                      <div 
                        key={index}
                        className="bg-white/5 rounded-lg p-2 hover:bg-white/10 transition-colors duration-300"
                      >
                        <a 
                          href={item} 
                          className="text-purple-200 hover:text-white flex items-center gap-2 group break-all text-sm"
                          target="_blank" 
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="w-3 h-3 flex-shrink-0 group-hover:scale-110 transition-transform" />
                          {item}
                        </a>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="mt-4">
            <button
              onClick={() => {
                setShowHistory(!showHistory)
              }
              }
              className="w-full px-3 py-2 bg-white/5 text-purple-200 rounded-lg hover:bg-white/10 
                       transition-all duration-300 flex items-center justify-center gap-2 group text-sm"
            >
              <History className={`w-4 h-4 transition-transform duration-300 ${showHistory ? 'rotate-180' : ''}`} />
              {showHistory ? "Hide History" : "Show History"}
            </button>
            
            <div className={`transition-all duration-500 ease-in-out ${showHistory ? 'max-h-[300px] opacity-100 overflow-y-scroll' : 'max-h-0 opacity-0 overflow-hidden'}`}>
              <div className="pt-3 space-y-2">
                {historyArray.length === 0 ? (
                  <div className="text-purple-200 text-center py-4 text-sm">No history available</div>
                ) : (
                  historyArray.map((item, index) => (
                    <div 
                      key={index}
                      className="bg-white/5 rounded-lg p-2 hover:bg-white/10 transition-colors duration-300"
                    >
                      <a 
                        href={item} 
                        className="text-purple-200 hover:text-white flex items-center gap-2 group break-all text-sm"
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="w-3 h-3 flex-shrink-0 group-hover:scale-110 transition-transform" />
                        {item}
                      </a>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </main>

        <footer className="p-3 border-t border-white/10">
          <p className="text-center text-purple-200/70 text-xs hover:text-purple-200 transition-colors">
            Copyright © {new Date().getFullYear()} Browse Back
          </p>
        </footer>
      </div>
    </div>
  );
};

export default App;