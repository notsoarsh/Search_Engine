document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("search-input");
    const searchBtn = document.getElementById("search-button"); // Changed 'search-btn' to 'search-button'
    const searchHistoryList = document.getElementById("history-list"); // Changed 'search-history' to 'history-list'
    const clearBtn = document.getElementById("clear-history-button"); // Changed 'clear-btn' to 'clear-history-button'
    
    // Initialize search history from localStorage or set to empty array
    let searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];

    // Function to render search history
    const renderHistory = () => {
        searchHistoryList.innerHTML = ''; 
        searchHistory.forEach((search) => {
            const li = document.createElement('li');
            li.textContent = search;
            searchHistoryList.appendChild(li);
        });
    };

    // Fetch initial search history from localStorage or JSON file if empty
    if (searchHistory.length === 0) {
        fetch('search_history.json')
            .then(response => response.json())
            .then(data => {
                searchHistory = data.searches || [];
                localStorage.setItem("searchHistory", JSON.stringify(searchHistory)); 
                renderHistory(); 
            })
            .catch(error => console.error('Error fetching search history:', error));
    } else {
        renderHistory();
    }

    // Add event listener for search button
    searchBtn.addEventListener("click", function () {
        const searchTerm = searchInput.value.trim();
        if (searchTerm !== "") {
            searchHistory.push(searchTerm);
            localStorage.setItem("searchHistory", JSON.stringify(searchHistory)); 
            renderHistory();
            searchInput.value = ''; // Clear the input after search
        }
    });

    // Add event listener for clearing the search history
    clearBtn.addEventListener("click", function () {
        searchHistory = [];
        localStorage.removeItem("searchHistory");
        renderHistory();
    });
});
