// Основные переменные для управления состоянием
let currentAnime = null;      // Текущее выбранное аниме
let isPlaying = false;        // Статус воспроизведения видео
let currentSpeed = 1;         // Текущая скорость воспроизведения
let currentVolume = 1;        // Текущая громкость
let isFullscreen = false;     // Статус полноэкранного режима

// Получаем DOM элементы
const videoPlayer = document.getElementById('video-player');
const playPauseBtn = document.getElementById('play-pause');
const progressBar = document.getElementById('progress-bar');
const progressSlider = document.getElementById('progress-slider');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const volumeBtn = document.getElementById('volume-btn');
const volumeSlider = document.getElementById('volume-slider');
const speedBtn = document.getElementById('speed-btn');
const speedOptions = document.getElementById('speed-options');
const fullscreenBtn = document.getElementById('fullscreen-btn');
const nextEpisodeBtn = document.getElementById('next-episode');
const closePlayerBtn = document.getElementById('close-player');
const playerSection = document.getElementById('player-section');
const animeGrid = document.getElementById('anime-grid');
const newAnimeGrid = document.getElementById('new-anime-grid');
const watchFeaturedBtn = document.getElementById('watch-featured');
const searchInput = document.querySelector('.search-input');
const searchBtn = document.querySelector('.search-btn');
const filterButtons = document.querySelectorAll('.filter-btn');

// Элементы информации об аниме в плеере
const playerAnimeTitle = document.getElementById('player-anime-title');
const playerGenres = document.getElementById('player-genres');
const playerYear = document.getElementById('player-year');
const playerEpisodes = document.getElementById('player-episodes');
const playerSynopsis = document.getElementById('player-synopsis');

// Элементы герой-секции
const featuredTitle = document.getElementById('featured-title');
const featuredDescription = document.getElementById('featured-description');
const featuredPoster = document.getElementById('featured-poster');

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    console.log('Страница загружена, инициализация...');

    // Установка фичеред аниме (главное аниме недели)
    const featuredAnime = animeData.find(anime => anime.featured);
    if (featuredAnime) {
        setFeaturedAnime(featuredAnime);
        currentAnime = featuredAnime;
        console.log('Фичеред аниме установлено:', featuredAnime.title);
    }

    // Загрузка сетки аниме
    loadAnimeGrid();
    loadNewReleases();

    // Инициализация видеоплеера
    initVideoPlayer();

    // Настройка обработчиков событий
    setupEventListeners();

    // Настройка навигации
    setupNavigation();

    // Настройка поиска
    setupSearch();

    // Настройка фильтров
    setupFilters();

    console.log('Инициализация завершена успешно!');
});

// Установка фичеред аниме в герой-секции
function setFeaturedAnime(anime) {
    featuredTitle.textContent = anime.title;
    featuredDescription.textContent = anime.description;
    featuredPoster.src = anime.poster;
    featuredPoster.alt = anime.title;
}

// Загрузка сетки популярных аниме
function loadAnimeGrid() {
    animeGrid.innerHTML = '';
    console.log('Загрузка популярных аниме...');

    popularAnime.forEach(anime => {
        const animeCard = createAnimeCard(anime);
        animeGrid.appendChild(animeCard);
    });

    console.log('Популярные аниме загружены:', popularAnime.length, 'шт.');
}

// Загрузка новых релизов
function loadNewReleases() {
    newAnimeGrid.innerHTML = '';
    console.log('Загрузка новых релизов...');

    newReleases.forEach(anime => {
        const animeCard = createAnimeCard(anime);
        newAnimeGrid.appendChild(animeCard);
    });

    console.log('Новые релизы загружены:', newReleases.length, 'шт.');
}

// Создание карточки аниме
function createAnimeCard(anime) {
    const card = document.createElement('div');
    card.className = 'anime-card';
    card.dataset.id = anime.id;

    // Создаем HTML структуру карточки
    card.innerHTML = `
        <div class="anime-poster">
            <img src="${anime.poster}" alt="${anime.title}" loading="lazy">
            <div class="anime-overlay">
                <div class="play-overlay">
                    <i class="fas fa-play"></i>
                </div>
            </div>
        </div>
        <div class="anime-info">
            <h3 class="anime-title">${anime.title}</h3>
            <div class="anime-meta">
                <span class="anime-genre">${anime.genres[0]}</span>
                <span class="anime-rating">
                    <i class="fas fa-star"></i> ${anime.rating}
                </span>
            </div>
            <p class="anime-description">${anime.description.substring(0, 100)}...</p>
            <div class="anime-actions">
                <button class="action-btn watch-btn" data-id="${anime.id}">
                    <i class="fas fa-play"></i> Смотреть
                </button>
                <button class="action-btn favorite-btn" data-id="${anime.id}">
                    <i class="far fa-heart"></i>
                </button>
            </div>
        </div>
    `;

    // Обработчик клика на всю карточку
    card.addEventListener('click', function(e) {
        // Не срабатывает при клике на кнопки действий
        if (!e.target.closest('.action-btn')) {
            console.log('Клик по карточке аниме:', anime.title);
            openAnimePlayer(anime.id);
        }
    });

    // Обработчик кнопки "Смотреть"
    const watchBtn = card.querySelector('.watch-btn');
    watchBtn.addEventListener('click', function(e) {
        e.stopPropagation(); // Останавливаем всплытие события
        console.log('Нажата кнопка "Смотреть" для:', anime.title);
        openAnimePlayer(anime.id);
    });

    // Обработчик кнопки "В избранное"
    const favoriteBtn = card.querySelector('.favorite-btn');
    favoriteBtn.addEventListener('click', function(e) {
        e.stopPropagation(); // Останавливаем всплытие события
        console.log('Нажата кнопка "В избранное" для:', anime.title);
        toggleFavorite(anime.id, this);
    });

    return card;
}

// Открытие плеера с выбранным аниме
function openAnimePlayer(animeId) {
    console.log('Открытие плеера для аниме ID:', animeId);

    const anime = getAnimeById(animeId);
    if (!anime) {
        console.error('Аниме не найдено с ID:', animeId);
        return;
    }

    currentAnime = anime;

    // Обновление информации об аниме в плеере
    playerAnimeTitle.textContent = anime.title;
    playerGenres.textContent = anime.genres.join(', ');
    playerYear.textContent = anime.year;
    playerEpisodes.textContent = anime.episodes;
    playerSynopsis.textContent = anime.description;

    // Обновление видео
    videoPlayer.src = anime.videoUrl;
    videoPlayer.poster = anime.poster;

    // Показываем секцию плеера
    playerSection.classList.add('active');
    document.body.style.overflow = 'hidden'; // Отключаем скролл страницы

    // Воспроизводим видео с небольшой задержкой
    setTimeout(() => {
        videoPlayer.play().then(() => {
            console.log('Видео начало воспроизводиться');
            updatePlayPauseButton(true);
            isPlaying = true;
        }).catch(error => {
            console.error('Ошибка воспроизведения видео:', error);
        });
    }, 300);

    // Прокручиваем страницу к плееру
    playerSection.scrollIntoView({ behavior: 'smooth' });

    console.log('Плеер открыт для:', anime.title);
}

// Закрытие плеера
function closeAnimePlayer() {
    console.log('Закрытие плеера');

    playerSection.classList.remove('active');
    document.body.style.overflow = 'auto'; // Включаем скролл страницы

    // Останавливаем видео
    videoPlayer.pause();
    updatePlayPauseButton(false);
    isPlaying = false;

    console.log('Плеер закрыт');
}

// Инициализация видеоплеера
function initVideoPlayer() {
    console.log('Инициализация видеоплеера...');

    // Обновление прогресса воспроизведения
    videoPlayer.addEventListener('timeupdate', updateProgress);

    // Обновление длительности видео при загрузке
    videoPlayer.addEventListener('loadedmetadata', function() {
        console.log('Метаданные видео загружены, длительность:', videoPlayer.duration, 'сек.');
        durationEl.textContent = formatTime(videoPlayer.duration);
    });

    // Обработчик окончания видео
    videoPlayer.addEventListener('ended', function() {
        console.log('Видео закончилось');
        updatePlayPauseButton(false);
        isPlaying = false;
        showNotification('Видео завершено');
    });

    // Обработчик ошибок видео
    videoPlayer.addEventListener('error', function(e) {
        console.error('Ошибка видео:', e);
        showNotification('Ошибка загрузки видео');
    });

    // Обработчик изменения громкости
    volumeSlider.addEventListener('input', function() {
        const volume = this.value / 100;
        videoPlayer.volume = volume;
        currentVolume = volume;
        updateVolumeButton(volume);
        console.log('Громкость изменена на:', volume);
    });

    // Инициализация громкости
    videoPlayer.volume = currentVolume;
    volumeSlider.value = currentVolume * 100;

    console.log('Видеоплеер инициализирован');
}

// Обновление прогресса видео
function updateProgress() {
    const currentTime = videoPlayer.currentTime;
    const duration = videoPlayer.duration;

    if (duration) {
        const progressPercent = (currentTime / duration) * 100;

        progressBar.style.width = `${progressPercent}%`;
        progressSlider.value = progressPercent;
        currentTimeEl.textContent = formatTime(currentTime);
    }
}

// Форматирование времени (секунды в MM:SS)
function formatTime(seconds) {
    if (isNaN(seconds)) return '0:00';

    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

// Обновление кнопки воспроизведения/паузы
function updatePlayPauseButton(playing) {
    const icon = playPauseBtn.querySelector('i');
    if (playing) {
        icon.className = 'fas fa-pause';
        playPauseBtn.setAttribute('title', 'Пауза');
        playPauseBtn.setAttribute('aria-label', 'Пауза');
    } else {
        icon.className = 'fas fa-play';
        playPauseBtn.setAttribute('title', 'Воспроизвести');
        playPauseBtn.setAttribute('aria-label', 'Воспроизвести');
    }
}

// Обновление кнопки громкости
function updateVolumeButton(volume) {
    const icon = volumeBtn.querySelector('i');
    if (volume === 0) {
        icon.className = 'fas fa-volume-mute';
        volumeBtn.setAttribute('title', 'Включить звук');
    } else if (volume < 0.5) {
        icon.className = 'fas fa-volume-down';
        volumeBtn.setAttribute('title', 'Громкость: низкая');
    } else {
        icon.className = 'fas fa-volume-up';
        volumeBtn.setAttribute('title', 'Громкость: высокая');
    }
}

// Переключение скорости воспроизведения
function changePlaybackSpeed(speed) {
    console.log('Изменение скорости воспроизведения на:', speed + 'x');

    videoPlayer.playbackRate = speed;
    currentSpeed = speed;
    speedBtn.querySelector('span').textContent = `${speed}x`;

    // Обновление активной опции в выпадающем меню
    speedOptions.querySelectorAll('button').forEach(btn => {
        btn.classList.remove('active');
        if (parseFloat(btn.dataset.speed) === speed) {
            btn.classList.add('active');
        }
    });

    showNotification(`Скорость воспроизведения: ${speed}x`);
}

// Переключение полноэкранного режима
function toggleFullscreen() {
    const videoWrapper = document.querySelector('.video-wrapper');

    if (!isFullscreen) {
        console.log('Включение полноэкранного режима');

        if (videoWrapper.requestFullscreen) {
            videoWrapper.requestFullscreen();
        } else if (videoWrapper.webkitRequestFullscreen) {
            videoWrapper.webkitRequestFullscreen();
        } else if (videoWrapper.msRequestFullscreen) {
            videoWrapper.msRequestFullscreen();
        }

        isFullscreen = true;
        fullscreenBtn.innerHTML = '<i class="fas fa-compress"></i>';
        fullscreenBtn.setAttribute('title', 'Выйти из полноэкранного режима');
    } else {
        console.log('Выключение полноэкранного режима');

        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }

        isFullscreen = false;
        fullscreenBtn.innerHTML = '<i class="fas fa-expand"></i>';
        fullscreenBtn.setAttribute('title', 'Полноэкранный режим');
    }
}

// Переключение избранного
function toggleFavorite(animeId, button) {
    const icon = button.querySelector('i');
    const anime = getAnimeById(animeId);

    if (icon.classList.contains('far')) {
        // Добавляем в избранное
        icon.className = 'fas fa-heart';
        button.style.color = '#ff4757';
        console.log('Добавлено в избранное:', anime.title);
        showNotification(`"${anime.title}" добавлено в избранное`);
    } else {
        // Удаляем из избранного
        icon.className = 'far fa-heart';
        button.style.color = '';
        console.log('Удалено из избранного:', anime.title);
        showNotification(`"${anime.title}" удалено из избранного`);
    }
}

// Показать уведомление
function showNotification(message) {
    console.log('Показ уведомления:', message);

    // Создаем элемент уведомления
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${message}</span>
    `;

    // Добавляем на страницу
    document.body.appendChild(notification);

    // Автоматическое удаление через 3 секунды
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';

        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 3000);
}

// Настройка обработчиков событий для элементов управления
function setupEventListeners() {
    console.log('Настройка обработчиков событий...');

    // Кнопка воспроизведения/паузы
    playPauseBtn.addEventListener('click', function() {
        console.log('Кнопка воспроизведения/паузы нажата');

        if (videoPlayer.paused) {
            videoPlayer.play().then(() => {
                updatePlayPauseButton(true);
                isPlaying = true;
                console.log('Видео воспроизводится');
            }).catch(error => {
                console.error('Ошибка воспроизведения:', error);
            });
        } else {
            videoPlayer.pause();
            updatePlayPauseButton(false);
            isPlaying = false;
            console.log('Видео на паузе');
        }
    });

    // Прогресс-бар (ползунок)
    progressSlider.addEventListener('input', function() {
        const percent = this.value;
        const duration = videoPlayer.duration;

        if (duration) {
            videoPlayer.currentTime = (percent / 100) * duration;
            console.log('Перемотка видео на:', percent + '%');
        }
    });

    // Клик по прогресс-бару для перемотки
    document.querySelector('.progress-container').addEventListener('click', function(e) {
        const rect = this.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        const duration = videoPlayer.duration;

        if (duration) {
            videoPlayer.currentTime = percent * duration;
            console.log('Перемотка по клику на:', Math.round(percent * 100) + '%');
        }
    });

    // Кнопка громкости
    volumeBtn.addEventListener('click', function() {
        console.log('Кнопка громкости нажата');

        if (videoPlayer.volume > 0) {
            // Выключаем звук
            videoPlayer.volume = 0;
            volumeSlider.value = 0;
            updateVolumeButton(0);
            console.log('Звук выключен');
        } else {
            // Включаем звук на предыдущий уровень
            videoPlayer.volume = currentVolume;
            volumeSlider.value = currentVolume * 100;
            updateVolumeButton(currentVolume);
            console.log('Звук включен на уровень:', currentVolume);
        }
    });
    // Скорость воспроизведения - обработчик клика на кнопку
        speedBtn.addEventListener('click', function(e) {
            e.stopPropagation(); // Предотвращаем всплытие
            console.log('Кнопка скорости нажата');
        });

        // Опции скорости в выпадающем меню
        speedOptions.querySelectorAll('button').forEach(btn => {
            btn.addEventListener('click', function() {
                const speed = parseFloat(this.dataset.speed);
                changePlaybackSpeed(speed);
            });
        });

        // Полноэкранный режим
        fullscreenBtn.addEventListener('click', function() {
            console.log('Кнопка полноэкранного режима нажата');
            toggleFullscreen();
        });

        // Следующий эпизод
        nextEpisodeBtn.addEventListener('click', function() {
            console.log('Кнопка "Следующий эпизод" нажата');
            showNotification('Следующий эпизод скоро будет доступен');

            // В реальном приложении здесь была бы логика загрузки следующего эпизода
            // Например: loadNextEpisode(currentAnime.id);
        });

        // Закрытие плеера
        closePlayerBtn.addEventListener('click', function() {
            console.log('Кнопка закрытия плеера нажата');
            closeAnimePlayer();
        });

        // Кнопка "Смотреть сейчас" в герой-секции
        watchFeaturedBtn.addEventListener('click', function() {
            console.log('Кнопка "Смотреть сейчас" в герой-секции нажата');
            if (currentAnime) {
                openAnimePlayer(currentAnime.id);
            } else {
                console.error('Текущее аниме не установлено');
                showNotification('Ошибка: аниме не выбрано');
            }
        });

        // Клик по эпизодам в сайдбаре
        document.querySelectorAll('.episode-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                // Убираем активный класс у всех кнопок эпизодов
                document.querySelectorAll('.episode-btn').forEach(b => b.classList.remove('active'));

                // Добавляем активный класс текущей кнопке
                this.classList.add('active');

                const episodeNumber = this.textContent;
                console.log('Выбран эпизод:', episodeNumber);
                showNotification(`Загружается ${episodeNumber}`);

                // В реальном приложении здесь была бы загрузка выбранного эпизода
                // Например: loadEpisode(currentAnime.id, episodeNumber);
            });
        });

        // Обработка выхода из полноэкранного режима
        document.addEventListener('fullscreenchange', function() {
            if (!document.fullscreenElement) {
                isFullscreen = false;
                fullscreenBtn.innerHTML = '<i class="fas fa-expand"></i>';
                fullscreenBtn.setAttribute('title', 'Полноэкранный режим');
                console.log('Выход из полноэкранного режима');
            }
        });

        // Обработка изменения размера окна
        window.addEventListener('resize', function() {
            console.log('Размер окна изменен:', window.innerWidth, 'x', window.innerHeight);
        });

        console.log('Обработчики событий настроены');
    }

    // Настройка навигации по сайту
    function setupNavigation() {
        console.log('Настройка навигации...');

        const navItems = document.querySelectorAll('.nav-item');

        navItems.forEach(item => {
            item.addEventListener('click', function(e) {
                e.preventDefault();

                const link = this.querySelector('a');
                const targetId = link.getAttribute('href').substring(1);

                console.log('Нажата навигационная кнопка:', link.textContent.trim());

                // Удаляем активный класс у всех элементов навигации
                navItems.forEach(i => i.classList.remove('active'));

                // Добавляем активный класс текущему элементу
                this.classList.add('active');

                // Прокрутка к соответствующему разделу
                if (targetId === 'home') {
                    // Прокрутка к началу страницы
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    console.log('Прокрутка к началу страницы');
                } else {
                    const targetSection = document.getElementById(targetId);
                    if (targetSection) {
                        targetSection.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                        console.log('Прокрутка к разделу:', targetId);
                    } else {
                        console.warn('Раздел не найден:', targetId);
                    }
                }
            });
        });

        // Плавная прокрутка для всех внутренних ссылок
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');

                if (href !== '#') {
                    e.preventDefault();
                    const targetId = href.substring(1);
                    const targetElement = document.getElementById(targetId);

                    if (targetElement) {
                        targetElement.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                        console.log('Плавная прокрутка к элементу:', targetId);
                    }
                }
            });
        });

        console.log('Навигация настроена');
    }

    // Настройка поиска аниме
    function setupSearch() {
        console.log('Настройка поиска...');

        // Поиск по клику на кнопку
        searchBtn.addEventListener('click', performSearch);

        // Поиск по нажатию Enter
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });

        // Очистка результатов при очистке поля поиска
        searchInput.addEventListener('input', function() {
            if (this.value.trim() === '') {
                // Восстанавливаем оригинальную сетку
                loadAnimeGrid();
                console.log('Поле поиска очищено, восстановлена оригинальная сетка');
            }
        });

        function performSearch() {
            const query = searchInput.value.trim();

            if (query) {
                console.log('Выполнение поиска по запросу:', query);
                const results = searchAnime(query);
                displaySearchResults(results);
            } else {
                showNotification('Введите поисковый запрос');
                console.log('Пустой поисковый запрос');
            }
        }

        console.log('Поиск настроен');
    }

    // Отображение результатов поиска
    function displaySearchResults(results) {
        console.log('Отображение результатов поиска. Найдено:', results.length, 'результатов');

        if (results.length === 0) {
            // Показываем сообщение "Ничего не найдено"
            animeGrid.innerHTML = `
                <div class="no-results" style="grid-column: 1 / -1; text-align: center; padding: 60px;">
                    <i class="fas fa-search" style="font-size: 3rem; color: var(--text-muted); margin-bottom: 20px;"></i>
                    <h3 style="color: var(--text-primary); margin-bottom: 10px;">Ничего не найдено</h3>
                    <p style="color: var(--text-secondary);">Попробуйте изменить запрос или использовать другие ключевые слова</p>
                    <button class="btn btn-primary" style="margin-top: 20px;" id="clear-search">
                        <i class="fas fa-times"></i> Очистить поиск
                    </button>
                </div>
            `;

            // Добавляем обработчик для кнопки очистки поиска
            document.getElementById('clear-search').addEventListener('click', function() {
                searchInput.value = '';
                loadAnimeGrid();
                console.log('Поиск очищен');
            });

            showNotification('По вашему запросу ничего не найдено');
        } else {
            // Очищаем текущую сетку
            animeGrid.innerHTML = '';

            // Добавляем заголовок с количеством результатов
            const resultsHeader = document.createElement('div');
            resultsHeader.className = 'search-results-header';
            resultsHeader.style.gridColumn = '1 / -1';
            resultsHeader.style.marginBottom = '20px';
            resultsHeader.innerHTML = `
                <h3 style="color: var(--text-primary); margin-bottom: 10px;">
                    Найдено ${results.length} аниме
                </h3>
                <button class="btn btn-secondary" id="back-to-popular">
                    <i class="fas fa-arrow-left"></i> Вернуться к популярным
                </button>
            `;
            animeGrid.appendChild(resultsHeader);

            // Добавляем карточки найденных аниме
            results.forEach(anime => {
                const animeCard = createAnimeCard(anime);
                animeGrid.appendChild(animeCard);
            });

            // Добавляем обработчик для кнопки "Вернуться к популярным"
            document.getElementById('back-to-popular').addEventListener('click', function() {
                searchInput.value = '';
                loadAnimeGrid();
                console.log('Возврат к популярным аниме');
            });

            showNotification(`Найдено ${results.length} аниме по вашему запросу`);
        }

        // Прокрутка к результатам поиска
        animeGrid.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }

    // Настройка фильтров по жанрам
    function setupFilters() {
        console.log('Настройка фильтров...');

        filterButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                const genre = this.textContent;
                console.log('Выбран фильтр:', genre);

                // Удаляем активный класс у всех кнопок фильтров
                filterButtons.forEach(b => b.classList.remove('active'));

                // Добавляем активный класс текущей кнопке
                this.classList.add('active');

                // Фильтрация аниме по выбранному жанру
                const filteredAnime = filterByGenre(genre);

                // Отображение отфильтрованных результатов
                displayFilteredResults(filteredAnime, genre);
            });
        });

        console.log('Фильтры настроены');
    }

    // Отображение отфильтрованных результатов
    function displayFilteredResults(filteredAnime, genre) {
        console.log('Отображение отфильтрованных результатов. Жанр:', genre, 'Найдено:', filteredAnime.length);

        if (filteredAnime.length === 0) {
            animeGrid.innerHTML = `
                <div class="no-results" style="grid-column: 1 / -1; text-align: center; padding: 60px;">
                    <i class="fas fa-film" style="font-size: 3rem; color: var(--text-muted); margin-bottom: 20px;"></i>
                    <h3 style="color: var(--text-primary); margin-bottom: 10px;">В жанре "${genre}" пока нет аниме</h3>
                    <p style="color: var(--text-secondary);">Попробуйте выбрать другой жанр</p>
                    <button class="btn btn-primary" style="margin-top: 20px;" id="show-all-anime">
                        <i class="fas fa-list"></i> Показать все аниме
                    </button>
                </div>
            `;

            // Добавляем обработчик для кнопки "Показать все аниме"
            document.getElementById('show-all-anime').addEventListener('click', function() {
                // Активируем кнопку "Все"
                filterButtons.forEach(b => {
                    if (b.textContent === 'Все') {
                        b.classList.add('active');
                    } else {
                        b.classList.remove('active');
                    }
                });

                loadAnimeGrid();
                console.log('Показаны все аниме');
            });

            showNotification(`В жанре "${genre}" пока нет аниме`);
        } else {
            // Очищаем текущую сетку
            animeGrid.innerHTML = '';

            // Добавляем заголовок с информацией о фильтре
            const filterHeader = document.createElement('div');
            filterHeader.className = 'filter-results-header';
            filterHeader.style.gridColumn = '1 / -1';
            filterHeader.style.marginBottom = '20px';
            filterHeader.innerHTML = `
                <h3 style="color: var(--text-primary); margin-bottom: 10px;">
                    Аниме в жанре "${genre}" (${filteredAnime.length})
                </h3>
                <button class="btn btn-secondary" id="clear-filter">
                    <i class="fas fa-times"></i> Сбросить фильтр
                </button>
            `;
            animeGrid.appendChild(filterHeader);

            // Добавляем карточки отфильтрованных аниме
            filteredAnime.forEach(anime => {
                const animeCard = createAnimeCard(anime);
                animeGrid.appendChild(animeCard);
            });

            // Добавляем обработчик для кнопки "Сбросить фильтр"
            document.getElementById('clear-filter').addEventListener('click', function() {
                // Активируем кнопку "Все"
                filterButtons.forEach(b => {
                    if (b.textContent === 'Все') {
                        b.classList.add('active');
                    } else {
                        b.classList.remove('active');
                    }
                });

                loadAnimeGrid();
                console.log('Фильтр сброшен');
            });

            showNotification(`Найдено ${filteredAnime.length} аниме в жанре "${genre}"`);
        }

        // Прокрутка к результатам фильтрации
        animeGrid.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }

    // Дополнительные функции для улучшения пользовательского опыта

    // Автоматическое скрытие контролов видео при бездействии
    let controlsTimeout;
    const customPlayer = document.querySelector('.custom-player');

    videoPlayer.addEventListener('mousemove', function() {
        customPlayer.style.opacity = '1';
        clearTimeout(controlsTimeout);

        controlsTimeout = setTimeout(() => {
            if (isPlaying && !videoPlayer.paused) {
                customPlayer.style.opacity = '0';
                console.log('Контролы видео скрыты');
            }
        }, 3000);
    });

    // Показываем контролы при наведении на видео
    videoPlayer.addEventListener('mouseenter', function() {
        customPlayer.style.opacity = '1';
        clearTimeout(controlsTimeout);
    });

    // Скрываем контролы при уходе мыши с видео (если не в полноэкранном режиме)
    videoPlayer.addEventListener('mouseleave', function() {
        if (isPlaying && !isFullscreen) {
            controlsTimeout = setTimeout(() => {
                customPlayer.style.opacity = '0';
                console.log('Контролы видео скрыты (мышь ушла)');
            }, 1000);
        }
    });

    // Обработка управления с клавиатуры
    document.addEventListener('keydown', function(e) {
        // Управление работает только когда плеер открыт
        if (!playerSection.classList.contains('active')) return;

        console.log('Нажата клавиша:', e.key);

        switch(e.key) {
            case ' ':
            case 'k':
                e.preventDefault();
                if (videoPlayer.paused) {
                    videoPlayer.play().then(() => {
                        updatePlayPauseButton(true);
                        isPlaying = true;
                        console.log('Видео воспроизводится (клавиша Space/K)');
                    });
                } else {
                    videoPlayer.pause();
                    updatePlayPauseButton(false);
                    isPlaying = false;
                    console.log('Видео на паузе (клавиша Space/K)');
                }
                break;

            case 'f':
                e.preventDefault();
                toggleFullscreen();
                break;

            case 'm':
                e.preventDefault();
                if (videoPlayer.volume > 0) {
                    videoPlayer.volume = 0;
                    volumeSlider.value = 0;
                    updateVolumeButton(0);
                    console.log('Звук выключен (клавиша M)');
                } else {
                    videoPlayer.volume = currentVolume;
                    volumeSlider.value = currentVolume * 100;
                    updateVolumeButton(currentVolume);
                    console.log('Звук включен (клавиша M)');
                }
                break;

            case 'ArrowRight':
                e.preventDefault();
                videoPlayer.currentTime += 10;
                console.log('Перемотка вперед на 10 секунд');
                break;

            case 'ArrowLeft':
                e.preventDefault();
                videoPlayer.currentTime -= 10;
                console.log('Перемотка назад на 10 секунд');
                break;

            case 'ArrowUp':
                e.preventDefault();
                let newVolume = Math.min(videoPlayer.volume + 0.1, 1);
                videoPlayer.volume = newVolume;
                volumeSlider.value = newVolume * 100;
                updateVolumeButton(newVolume);
                console.log('Громкость увеличена до:', newVolume);
                break;

            case 'ArrowDown':
                e.preventDefault();
                newVolume = Math.max(videoPlayer.volume - 0.1, 0);
                videoPlayer.volume = newVolume;
                volumeSlider.value = newVolume * 100;
                updateVolumeButton(newVolume);
                console.log('Громкость уменьшена до:', newVolume);
                break;

            case 'Escape':
                if (isFullscreen) {
                    toggleFullscreen();
                    console.log('Выход из полноэкранного режима (клавиша Escape)');
                }
                break;

            case '0':
            case 'Home':
                e.preventDefault();
                videoPlayer.currentTime = 0;
                console.log('Перемотка в начало (клавиша 0/Home)');
                break;

            case 'End':
                 e.preventDefault();
                 videoPlayer.currentTime = videoPlayer.duration;
                 console.log('Перемотка в конец (клавиша End)');
                 break;

            case '>':
            case '.':
                 e.preventDefault();
                 if (videoPlayer.playbackRate < 2) {
                    const newSpeed = Math.min(videoPlayer.playbackRate + 0.25, 2);
                    changePlaybackSpeed(newSpeed);
                    console.log('Скорость увеличена до:', newSpeed + 'x');
                 }
                 break;

            case '<':
            case ',':
                  e.preventDefault();
                  if (videoPlayer.playbackRate > 0.25) {
                     const newSpeed = Math.max(videoPlayer.playbackRate - 0.25, 0.25);
                     changePlaybackSpeed(newSpeed);
                     console.log('Скорость уменьшена до:', newSpeed + 'x');
                  }
                  break;
            case 'c':
                        e.preventDefault();
                        // Переключение субтитров (заглушка)
                        showNotification('Субтитры: функция в разработке');
                        console.log('Переключение субтитров (клавиша C)');
                        break;
                }
    });
    // Предзагрузка изображений для лучшей производительности
    function preloadImages() {
        console.log('Начата предзагрузка изображений...');

        let loadedCount = 0;
        const totalImages = animeData.length;

        animeData.forEach(anime => {
            const img = new Image();
            img.src = anime.poster;

            img.onload = function() {
                loadedCount++;
                console.log(`Изображение загружено: ${anime.title} (${loadedCount}/${totalImages})`);

                if (loadedCount === totalImages) {
                    console.log('Все изображения успешно предзагружены');
                }
            };

            img.onerror = function() {
                loadedCount++;
                console.warn(`Ошибка загрузки изображения: ${anime.title}`);
            };
        });
    }

    // Запуск предзагрузки через 1 секунду после загрузки страницы
    setTimeout(preloadImages, 1000);

    // Анимация появления элементов при скролле
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target); // Прекращаем наблюдение после появления
            }
        });
    }, observerOptions);

    // Наблюдение за карточками аниме при их добавлении
    function observeAnimeCards() {
        document.querySelectorAll('.anime-card').forEach(card => {
            observer.observe(card);
        });
    }

    // Вызываем наблюдение после загрузки карточек
    setTimeout(observeAnimeCards, 500);

    // Функция для создания модального окна
    function createModal(title, content) {
        console.log('Создание модального окна:', title);

        // Создаем оверлей
        const modalOverlay = document.createElement('div');
        modalOverlay.className = 'modal-overlay';

        // Создаем само модальное окно
        const modal = document.createElement('div');
        modal.className = 'modal';

        modal.innerHTML = `
            <div class="modal-header">
                <h3 class="modal-title">${title}</h3>
                <button class="modal-close">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-content">
                ${content}
            </div>
        `;

        modalOverlay.appendChild(modal);
        document.body.appendChild(modalOverlay);

        // Показываем модальное окно с анимацией
        setTimeout(() => {
            modalOverlay.classList.add('active');
            console.log('Модальное окно показано');
        }, 10);

        // Обработчик закрытия по кнопке
        const closeBtn = modal.querySelector('.modal-close');
        closeBtn.addEventListener('click', () => {
            closeModal(modalOverlay);
        });

        // Закрытие по клику на оверлей
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                closeModal(modalOverlay);
            }
        });

        // Закрытие по клавише Escape
        const escapeHandler = (e) => {
            if (e.key === 'Escape') {
                closeModal(modalOverlay);
                document.removeEventListener('keydown', escapeHandler);
            }
        };

        document.addEventListener('keydown', escapeHandler);

        return modalOverlay;
    }

    // Функция закрытия модального окна
    function closeModal(modalOverlay) {
        console.log('Закрытие модального окна');

        modalOverlay.classList.remove('active');

        setTimeout(() => {
            if (modalOverlay.parentNode) {
                modalOverlay.remove();
                console.log('Модальное окно удалено');
            }
        }, 300);
    }

    // Пример использования модального окна для информации об аккаунте
    document.querySelector('.user-btn').addEventListener('click', () => {
        console.log('Кнопка пользователя нажата');

        createModal('Мой аккаунт', `
            <div style="text-align: center; padding: 20px 0;">
                <div style="width: 80px; height: 80px; background: var(--primary-color); border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center;">
                    <i class="fas fa-user" style="font-size: 2rem; color: white;"></i>
                </div>
                <h4 style="margin-bottom: 10px; color: var(--text-primary);">Гость</h4>
                <p style="color: var(--text-secondary); margin-bottom: 20px;">Войдите для доступа ко всем функциям</p>

                <div style="display: flex; flex-direction: column; gap: 10px;">
                    <button class="btn btn-primary" style="width: 100%;" id="login-btn">
                        <i class="fas fa-sign-in-alt"></i> Войти
                    </button>
                    <button class="btn btn-secondary" style="width: 100%;" id="register-btn">
                        <i class="fas fa-user-plus"></i> Зарегистрироваться
                    </button>
                </div>

                <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid var(--border-color);">
                    <p style="color: var(--text-muted); font-size: 0.9rem;">
                        <i class="fas fa-info-circle"></i> Регистрация откроет доступ к избранному, истории просмотров и персонализированным рекомендациям
                    </p>
                </div>
            </div>
        `);

        // Добавляем обработчики для кнопок в модальном окне
        setTimeout(() => {
            const loginBtn = document.getElementById('login-btn');
            const registerBtn = document.getElementById('register-btn');

            if (loginBtn) {
                loginBtn.addEventListener('click', () => {
                    showNotification('Форма входа скоро будет доступна');
                    console.log('Нажата кнопка входа');
                });
            }

            if (registerBtn) {
                registerBtn.addEventListener('click', () => {
                    showNotification('Форма регистрации скоро будет доступна');
                    console.log('Нажата кнопка регистрации');
                });
            }
        }, 100);
    });

    // Функция для сохранения состояния в localStorage
    function saveToLocalStorage(key, data) {
        try {
            localStorage.setItem(key, JSON.stringify(data));
            console.log('Данные сохранены в localStorage:', key);
            return true;
        } catch (error) {
            console.error('Ошибка сохранения в localStorage:', error);
            return false;
        }
    }

    // Функция для загрузки состояния из localStorage
    function loadFromLocalStorage(key) {
        try {
            const data = localStorage.getItem(key);
            if (data) {
                console.log('Данные загружены из localStorage:', key);
                return JSON.parse(data);
            }
        } catch (error) {
            console.error('Ошибка загрузки из localStorage:', error);
        }
        return null;
    }

    // Сохранение избранных аниме
    function saveFavorites() {
        const favorites = [];
        document.querySelectorAll('.favorite-btn .fas.fa-heart').forEach(btn => {
            const animeId = parseInt(btn.closest('.favorite-btn').dataset.id);
            favorites.push(animeId);
        });

        saveToLocalStorage('anime_favorites', favorites);
        console.log('Избранное сохранено:', favorites);
    }

    // Загрузка избранных аниме
    function loadFavorites() {
        const favorites = loadFromLocalStorage('anime_favorites') || [];
        console.log('Избранное загружено:', favorites);

        favorites.forEach(animeId => {
            const favoriteBtn = document.querySelector(`.favorite-btn[data-id="${animeId}"]`);
            if (favoriteBtn) {
                const icon = favoriteBtn.querySelector('i');
                icon.className = 'fas fa-heart';
                favoriteBtn.style.color = '#ff4757';
            }
        });

        return favorites;
    }

    // Сохранение истории просмотров
    function saveWatchHistory(animeId, episode, timestamp) {
        const history = loadFromLocalStorage('anime_watch_history') || [];

        // Удаляем старую запись для этого аниме, если есть
        const filteredHistory = history.filter(item => item.animeId !== animeId);

        // Добавляем новую запись
        filteredHistory.unshift({
            animeId,
            episode,
            timestamp,
            date: new Date().toISOString()
        });

        // Сохраняем только последние 50 записей
        const limitedHistory = filteredHistory.slice(0, 50);

        saveToLocalStorage('anime_watch_history', limitedHistory);
        console.log('История просмотров сохранена для аниме ID:', animeId);
    }

    // Загрузка истории просмотров
    function loadWatchHistory() {
        const history = loadFromLocalStorage('anime_watch_history') || [];
        console.log('История просмотров загружена:', history.length, 'записей');
        return history;
    }

    // Инициализация сохранения состояния
    function initStateSaving() {
        console.log('Инициализация сохранения состояния...');

        // Загружаем избранное
        loadFavorites();

        // Загружаем историю просмотров
        const watchHistory = loadWatchHistory();

        // Если есть история, можно показать последнее просмотренное
        if (watchHistory.length > 0) {
            const lastWatched = watchHistory[0];
            console.log('Последнее просмотренное аниме ID:', lastWatched.animeId);
        }

        // Сохраняем избранное при изменении
        document.addEventListener('click', function(e) {
            if (e.target.closest('.favorite-btn')) {
                setTimeout(saveFavorites, 100);
            }
        });

        // Сохраняем прогресс просмотра видео
        videoPlayer.addEventListener('timeupdate', function() {
            if (currentAnime && videoPlayer.currentTime > 10) {
                // Сохраняем каждые 30 секунд
                if (Math.floor(videoPlayer.currentTime) % 30 === 0) {
                    saveWatchHistory(
                        currentAnime.id,
                        1, // Номер эпизода (в демо всегда 1)
                        videoPlayer.currentTime
                    );
                }
            }
        });

        console.log('Сохранение состояния инициализировано');
    }

    // Запускаем сохранение состояния через 2 секунды после загрузки
    setTimeout(initStateSaving, 2000);

    // Функция для проверки онлайн-статуса
    function checkOnlineStatus() {
        if (!navigator.onLine) {
            showNotification('Вы находитесь в оффлайн-режиме. Некоторые функции могут быть недоступны.');
            console.warn('Пользователь в оффлайн-режиме');
        }
    }

    // Проверяем онлайн-статус при загрузке
    window.addEventListener('load', checkOnlineStatus);

    // Слушаем изменения онлайн-статуса
    window.addEventListener('online', () => {
        showNotification('Соединение восстановлено');
        console.log('Пользователь онлайн');
    });

    window.addEventListener('offline', () => {
        showNotification('Потеряно соединение с интернетом');
        console.warn('Пользователь оффлайн');
    });

    // Функция для измерения производительности
    function measurePerformance() {
        if ('performance' in window) {
            const perfData = window.performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log(`Время загрузки страницы: ${pageLoadTime}ms`);

            if (pageLoadTime > 3000) {
                console.warn('Время загрузки страницы превышает 3 секунды');
            }
        }
    }

    // Измеряем производительность после полной загрузки
    window.addEventListener('load', () => {
        setTimeout(measurePerformance, 0);
    });

    // Инициализация завершена
    console.log('=== AniStream полностью инициализирован ===');
    console.log('Доступные функции:');
    console.log('- Просмотр аниме с кастомным плеером');
    console.log('- Поиск и фильтрация аниме');
    console.log('- Добавление в избранное');
    console.log('- Управление с клавиатуры');
    console.log('- Адаптивный дизайн');
    console.log('- Сохранение состояния в localStorage');
    console.log('===========================================');