document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('searchInput');
  const searchButton = document.getElementById('searchButton');
  const resultsContainer = document.getElementById('results');
  const bookDetailsContainer = document.getElementById('bookDetails');
  const loadingIndicator = document.getElementById('loading');

  const API_URL = 'https://www.googleapis.com/books/v1/volumes';

  initTheme();

  // Установка начального значения и первая загрузка
  searchInput.value = 'javascript';
  
  // Обработчики событий
  searchButton.addEventListener('click', handleSearch);
  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSearch();
  });

  // Первоначальный поиск
  handleSearch();

  async function handleSearch() {
    const searchQuery = searchInput.value.trim();
    if (!searchQuery) {
      showNoResults('Введите запрос для поиска');
      return;
    }

    showLoading();
    clearResults();
    hideBookDetails();

    try {
      const books = await fetchBooks(searchQuery);
      if (books.length > 0) {
        displayBooks(books);
      } else {
        showNoResults('Книги не найдены. Попробуйте другой запрос.');
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
      throw new Error('Ошибка сети');
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
    const title = info.title || 'Без названия';
    const authors = info.authors ? info.authors.join(', ') : 'Автор неизвестен';
    const coverUrl = info.imageLinks?.thumbnail || 'https://via.placeholder.com/150x200?text=Обложка+отсутствует';
    
    bookCard.innerHTML = `
      <img src="${coverUrl}" alt="${title}" onerror="this.src='https://via.placeholder.com/150x200?text=Обложка+отсутствует'">
      <h3>${title}</h3>
      <p>${authors}</p>
    `;
    
    bookCard.addEventListener('click', () => showBookDetails(book));
    return bookCard;
  }

  function showBookDetails(book) {
    const info = book.volumeInfo;
    const title = info.title || 'Без названия';
    const authors = info.authors ? info.authors.join(', ') : 'Автор неизвестен';
    const coverUrl = info.imageLinks?.thumbnail || 'https://via.placeholder.com/300x400?text=Обложка+отсутствует';
    const description = info.description ? `${info.description.slice(0, 200)}...` : 'Описание отсутствует';
    
    bookDetailsContainer.innerHTML = `
      <div class="book-detail-content">
        <div class="book-cover">
          <img src="${coverUrl}" alt="${title}" onerror="this.src='https://via.placeholder.com/300x400?text=Обложка+отсутствует'">
        </div>
        <div class="book-info">
          <h2>${title}</h2>
          <p><strong>Авторы:</strong> ${authors}</p>
          ${info.publishedDate ? `<p><strong>Опубликовано:</strong> ${info.publishedDate}</p>` : ''}
          <p><strong>Описание:</strong> ${description}</p>
          <a href="${info.infoLink}" target="_blank" rel="noopener">Ссылка на Google Books</a>
        </div>
      </div>
      <button class="back-button">Обратно к результатам</button>
    `;
    
    bookDetailsContainer.classList.remove('hidden');
    resultsContainer.classList.add('hidden');
    
    document.querySelector('.back-button').addEventListener('click', () => {
      bookDetailsContainer.classList.add('hidden');
      resultsContainer.classList.remove('hidden');
    });
  }

  function showLoading() {
    loadingIndicator.classList.remove('hidden');
    loadingIndicator.textContent = 'Поиск книг...';
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

  function showNoResults(message = 'Книги не найдены') {
    resultsContainer.innerHTML = `<p class="no-results">${message}</p>`;
  }

  function showError(error) {
    console.error('Ошибка:', error);
    resultsContainer.innerHTML = `
      <p class="error-message">
        Ошибка при загрузке данных. Пожалуйста, попробуйте позже.
        <button class="retry-button">Повторить</button>
      </p>
    `;
    document.querySelector('.retry-button').addEventListener('click', handleSearch);
  }

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