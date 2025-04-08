document.addEventListener('DOMContentLoaded', () => {
  // Элементы интерфейса
  const searchInput = document.getElementById('searchInput');
  const searchButton = document.getElementById('searchButton');
  const resultsContainer = document.getElementById('results');
  const bookDetailsContainer = document.getElementById('bookDetails');
  const loadingIndicator = document.getElementById('loading');

  // API URL
  const API_URL = 'https://www.googleapis.com/books/v1/volumes';

  // Инициализация темы
  initTheme();

  // Обработчики событий
  searchButton.addEventListener('click', handleSearch);
  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSearch();
  });

  // Первоначальная загрузка
  handleSearch('javascript');

  async function handleSearch(query) {
    const searchQuery = query || searchInput.value.trim();
    if (!searchQuery) return;

    showLoading();
    clearResults();
    hideBookDetails();

    try {
      const books = await fetchBooks(searchQuery);
      if (books.length > 0) {
        displayBooks(books);
      } else {
        showNoResults();
      }
    } catch (error) {
      showError(error);
    } finally {
      hideLoading();
    }
  }

  async function fetchBooks(query) {
    const response = await fetch(`${API_URL}?q=${encodeURIComponent(query)}&maxResults=12`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data.items || [];
  }

  function displayBooks(books) {
    books.forEach(book => {
      const bookCard = createBookCard(book);
      resultsContainer.appendChild(bookCard);
    });
  }

  function createBookCard(book) {
    const bookCard = document.createElement('div');
    bookCard.className = 'book-card';
    
    const info = book.volumeInfo;
    const title = info.title || 'Untitled';
    const authors = info.authors ? info.authors.join(', ') : 'Unknown author';
    const coverUrl = info.imageLinks?.thumbnail || 'https://via.placeholder.com/150x200?text=No+Cover';
    
    bookCard.innerHTML = `
      <img src="${coverUrl}" alt="${title}" onerror="this.src='https://via.placeholder.com/150x200?text=No+Cover'">
      <h3>${title}</h3>
      <p>${authors}</p>
    `;
    
    bookCard.addEventListener('click', () => showBookDetails(book));
    return bookCard;
  }

  function showBookDetails(book) {
    const info = book.volumeInfo;
    const title = info.title || 'Untitled';
    const authors = info.authors ? info.authors.join(', ') : 'Unknown author';
    const coverUrl = info.imageLinks?.thumbnail || 'https://via.placeholder.com/300x400?text=No+Cover';
    const description = info.description ? `${info.description.slice(0, 200)}...` : 'No description available';
    
    bookDetailsContainer.innerHTML = `
      <div class="book-detail-content">
        <div class="book-cover">
          <img src="${coverUrl}" alt="${title}" onerror="this.src='https://via.placeholder.com/300x400?text=No+Cover'">
        </div>
        <div class="book-info">
          <h2>${title}</h2>
          <p><strong>Author:</strong> ${authors}</p>
          ${info.publishedDate ? `<p><strong>Published:</strong> ${info.publishedDate}</p>` : ''}
          <p><strong>Description:</strong> ${description}</p>
          <a href="${info.infoLink}" target="_blank" rel="noopener">View on Google Books</a>
        </div>
      </div>
      <button class="back-button">Back to results</button>
    `;
    
    bookDetailsContainer.classList.remove('hidden');
    resultsContainer.classList.add('hidden');
    
    document.querySelector('.back-button').addEventListener('click', () => {
      bookDetailsContainer.classList.add('hidden');
      resultsContainer.classList.remove('hidden');
    });
  }

  // Вспомогательные функции
  function showLoading() {
    loadingIndicator.classList.remove('hidden');
  }

  function hideLoading() {
    loadingIndicator.classList.add('hidden');
  }

  function clearResults() {
    resultsContainer.innerHTML = '';
  }

  function hideBookDetails() {
    bookDetailsContainer.classList.add('hidden');
  }

  function showNoResults() {
    resultsContainer.innerHTML = '<p class="no-results">No books found. Try a different search.</p>';
  }

  function showError(error) {
    console.error('Error:', error);
    resultsContainer.innerHTML = `
      <p class="error-message">
        Error loading books. Please try again later.
        <button class="retry-button">Retry</button>
      </p>
    `;
    document.querySelector('.retry-button').addEventListener('click', handleSearch);
  }

  // Тема
  function initTheme() {
    const themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle';
    themeToggle.textContent = '🌓';
    themeToggle.addEventListener('click', toggleTheme);
    document.querySelector('.header').appendChild(themeToggle);

    if (localStorage.getItem('darkMode') === 'true') {
      document.body.classList.add('dark-mode');
    }
  }

  function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
  }
});