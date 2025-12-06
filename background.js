// Open YouTube with the selected search string
function searchOnYoutube(data) {
  try {
    const selectedText = data.selectionText;
    if (!selectedText) {
      //console.error("No text selected.");
      return;
    }

    const youtubeSearchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(selectedText)}`;
    chrome.tabs.create({ url: youtubeSearchUrl });
  } catch (error) {
    //console.error("An error occurred while searching on YouTube:", error);
  }
}

// Load the context menu
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "search-youtube",
    title: chrome.i18n.getMessage("contextMenuText"),
    contexts: ["selection"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "search-youtube") {
    searchOnYoutube(info);
  }
});
