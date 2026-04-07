// Данные об аниме
const animeData = [
    {
        id: 1,
        title: "Атака Титанов",
        originalTitle: "Shingeki no Kyojin",
        description: "Человечество живёт в городах, окружённых огромными стенами, защищающими людей от гигантских существ — титанов. Эрен Йегер клянётся уничтожить всех титанов после того, как они разрушают его родной город и убивают его мать.",
        year: 2013,
        episodes: 25,
        rating: 9.0,
        genres: ["Экшен", "Драма", "Фэнтези"],
        poster: "https://statichdrezka.ac/i/2022/1/22/wfb7a806a2a64sn24d15g.png",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        featured: true
    },
    {
        id: 2,
        title: "Наруто",
        originalTitle: "Naruto",
        description: "История о юном ниндзя Наруто Узумаки, который мечтает стать Хокаге — лидером своей деревни и самым сильным ниндзя.",
        year: 2002,
        episodes: 220,
        rating: 8.3,
        genres: ["Экшен", "Приключения", "Комедия"],
        poster: "https://statichdrezka.ac/i/2023/8/25/l0c6ad2133621eg91p39r.png",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
    },
    {
        id: 3,
        title: "Твоё имя",
        originalTitle: "Kimi no Na wa",
        description: "Старшеклассники Мицуха и Таки обнаруживают, что между ними существует странная и необъяснимая связь.",
        year: 2016,
        episodes: 1,
        rating: 8.9,
        genres: ["Драма", "Романтика", "Фэнтези"],
        poster: "https://statichdrezka.ac/i/2021/3/17/u0fe3d64812c0pn36e31n.jpeg",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
    },
    {
        id: 4,
        title: "Стальной алхимик",
        originalTitle: "Fullmetal Alchemist: Brotherhood",
        description: "Братья Эдвард и Альфонс Элрики пытаются вернуть свои тела после неудачной попытки воскресить мать с помощью алхимии.",
        year: 2009,
        episodes: 64,
        rating: 9.1,
        genres: ["Экшен", "Приключения", "Драма"],
        poster: "https://statichdrezka.ac/i/2016/10/15/u2b413ef276caxe45q55h.jpg",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"
    },
    {
        id: 5,
        title: "Ковбой Бибоп",
        originalTitle: "Cowboy Bebop",
        description: "История команды охотников за головами, путешествующих на космическом корабле «Бибоп» в поисках преступников.",
        year: 1998,
        episodes: 26,
        rating: 8.9,
        genres: ["Экшен", "Приключения", "Детектив"],
        poster: "https://statichdrezka.ac/i/2014/11/14/acc0a7b89cd4euc34u95h.jpg",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4"
    },
    {
        id: 6,
        title: "Судьба/Ночь схватки",
        originalTitle: "Fate/stay night",
        description: "Широ Эмия случайно становится Мастером в Священной войне за Святой Грааль, где семь магов сражаются за исполнение любого желания.",
        year: 2006,
        episodes: 24,
        rating: 7.5,
        genres: ["Экшен", "Фэнтези", "Драма"],
        poster: "https://statichdrezka.ac/i/2016/11/20/z22ce2511f2deej69d34i.jpg",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4"
    },
    {
        id: 7,
        title: "Ходячий замок",
        originalTitle: "Howl's Moving Castle",
        description: "Молодая шляпница Софи превращается в старуху злой ведьмой. Её единственная надежда — волшебник Хаул и его ходячий замок.",
        year: 2004,
        episodes: 1,
        rating: 8.2,
        genres: ["Приключения", "Фэнтези", "Романтика"],
        poster: "https://statichdrezka.ac/i/2013/12/6/jf77d254dc1e2vx22h46s.jpg",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4"
    },
    {
        id: 8,
        title: "Ванпанчмен",
        originalTitle: "One Punch Man",
        description: "Сайтама — супергерой, который может победить любого противника одним ударом, но из-за этого он потерял интерес к битвам.",
        year: 2015,
        episodes: 12,
        rating: 8.7,
        genres: ["Экшен", "Комедия", "Пародия"],
        poster: "https://statichdrezka.ac/i/2021/11/14/y419ad80e030ecg21k18l.png",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4"
    },
    {
        id: 9,
        title: "Призрак в доспехах",
        originalTitle: "Ghost in the Shell",
        description: "В будущем,где киборги и люди сосуществуют, майор Мотоко Кусанаги расследует киберпреступления.",
        year: 1995,
        episodes: 1,
        rating: 8.0,
        genres: ["Киберпанк", "Детектив", "Драма"],
        poster: "https://statichdrezka.ac/i/2025/6/20/m29c4ae5c15dagv59x26h.jpg",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4"
    },
    {
        id: 10,
        title: "Моя геройская академия",
        originalTitle: "Boku no Hero Academia",
        description: "В мире, где у большинства людей есть сверхспособности, мальчик без способностей мечтает стать величайшим героем.",
        year: 2016,
        episodes: 113,
        rating: 8.4,
        genres: ["Экшен", "Комедия", "Школа"],
        poster: "https://statichdrezka.ac/i/2020/10/15/d81ba19141b80bq92w78d.png",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4"
    },
    {
        id: 11,
        title: "Истребитель демонов",
        originalTitle: "Kimetsu no Yaiba",
        description: "Тандзиро Камадо становится истребителем демонов после того, как его семья была убита, а сестра превращена в демона.",
        year: 2019,
        episodes: 26,
        rating: 8.7,
        genres: ["Экшен", "Фэнтези", "Драма"],
        poster: "https://statichdrezka.ac/i/2021/12/6/ced46ccc33be1uu78y78z.png",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4"
    },
    {
        id: 12,
        title: "Семь смертных грехов",
        originalTitle: "Nanatsu no Taizai",
        description: "Принцесса Элизабет ищет рыцарей «Семь смертных грехов», чтобы спасти королевство от тирании Святых Рыцарей.",
        year: 2014,
        episodes: 24,
        rating: 7.9,
        genres: ["Экшен", "Приключения", "Фэнтези"],
        poster: "https://statichdrezka.ac/i/2020/11/17/ua1905e2be597lw94u63v.png",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4"
    }
    ];

// Новые релизы (последние 6)
const newReleases = animeData.slice(-6);

// Популярное (первые 6)
const popularAnime = animeData.slice(0, 6);

// Функция для получения аниме по ID
function getAnimeById(id) {
    return animeData.find(anime => anime.id === id);
}

// Функция для поиска аниме
function searchAnime(query) {
    const lowerQuery = query.toLowerCase();
    return animeData.filter(anime =>
        anime.title.toLowerCase().includes(lowerQuery) ||
        anime.originalTitle.toLowerCase().includes(lowerQuery) ||
        anime.genres.some(genre => genre.toLowerCase().includes(lowerQuery))
    );
}

// Функция для фильтрации по жанру
function filterByGenre(genre) {
    if (genre === 'Все') return animeData;
    return animeData.filter(anime => anime.genres.includes(genre));
}

// Экспорт функций и данных (если используется модульная система)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        animeData,
        newReleases,
        popularAnime,
        getAnimeById,
        searchAnime,
        filterByGenre
    };
}

