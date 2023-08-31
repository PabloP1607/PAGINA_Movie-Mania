document.addEventListener('DOMContentLoaded', function() {
    let currentLanguage = 'es'; // Inicialmente, configurado en español
    const apiKey = 'debc0e48ec74ce7590c48f17f7e0cfe6';

    // Función para hacer la solicitud a la API de géneros
    function fetchGenres() {
        const genreSelect = document.getElementById('genreSelect');

        // Guardar el valor seleccionado actualmente antes de borrar las opciones
        const selectedGenre = genreSelect.value;
        
        // Elimina todas las opciones actuales
        genreSelect.innerHTML = '';

        // Agregar una opción para mostrar todas las películas sin filtrar por género
        const allGenresOption = document.createElement('option');
        allGenresOption.value = ''; // Puedes establecer este valor como deseas
        allGenresOption.textContent = 'Todos los géneros';
        genreSelect.appendChild(allGenresOption);

        fetch(`https://api.themoviedb.org/3/genre/movie/list?language=${currentLanguage}&api_key=${apiKey}`)
            .then(response => response.json())
            .then(data => {
                data.genres.forEach(genre => {
                    // Crear opciones para el selector de género
                    const option = document.createElement('option');
                    option.value = genre.id;
                    option.textContent = genre.name;
                    genreSelect.appendChild(option);
                });

                // Restablecer la opción seleccionada previamente
                genreSelect.value = selectedGenre;
            })
            .catch(error => {
                console.error('Error al obtener géneros:', error);
            });
    }

    // Función para hacer la solicitud a la API de películas populares
    function fetchPopularMovies(genreId = '') {
        const moviesContainer = document.getElementById('moviesContainer');
        moviesContainer.innerHTML = ''; // Limpiar el contenido anterior

        // Construir la URL de la API de películas populares con el idioma actual
        const apiUrl = `https://api.themoviedb.org/3/movie/popular?language=${currentLanguage}&api_key=${apiKey}${genreId ? `&with_genres=${genreId}` : ''}`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                data.results.forEach(movie => {
                    // Crear elementos HTML para mostrar cada película
                    const movieDiv = document.createElement('div');
                    movieDiv.classList.add('movie');

                    const posterUrl = `https://image.tmdb.org/t/p/w300${movie.poster_path}`;
                    const movieHTML = `
                        <img src="${posterUrl}" alt="${movie.title}">
                        <h2>${movie.title}</h2>
                        <p>${movie.overview}</p>
                    `;

                    movieDiv.innerHTML = movieHTML;
                    moviesContainer.appendChild(movieDiv);
                });
            })
            .catch(error => {
                console.error('Error al obtener películas populares:', error);
            });
    }

    // Evento para actualizar la lista de películas cuando se cambia el género
    const genreSelect = document.getElementById('genreSelect');
    genreSelect.addEventListener('change', function() {
        const selectedGenreId = genreSelect.value;
        fetchPopularMovies(selectedGenreId);
    });

    // Evento para cambiar el idioma al hacer clic en el botón
    const changeLanguageButton = document.getElementById('changeLanguageButton');
    changeLanguageButton.addEventListener('click', function() {
        currentLanguage = currentLanguage === 'es' ? 'en' : 'es'; // Cambiar entre español e inglés
        fetchGenres(); // Volver a cargar los géneros en el nuevo idioma
        fetchPopularMovies(); // Volver a cargar las películas populares en el nuevo idioma
    });

    // Cargar géneros y películas populares al cargar la página
    fetchGenres();
    fetchPopularMovies();
});
