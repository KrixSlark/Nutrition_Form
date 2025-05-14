
    document.addEventListener('DOMContentLoaded', () => {
        const stars = document.querySelectorAll('.star');

        // Load saved state from localStorage
        stars.forEach(star => {
            const id = star.getAttribute('data-id');
            if (localStorage.getItem(`favorite-${id}`) === 'true') {
                star.style.color = 'rgb(255, 183, 0)';
            }

            // Add click event listener
            star.addEventListener('click', () => {
                const isFavorited = localStorage.getItem(`favorite-${id}`) === 'true';
                if (isFavorited) {
                    star.style.color = 'white';
                    localStorage.setItem(`favorite-${id}`, 'false');
                } else {
                    star.style.color = 'rgb(255, 183, 0)';
                    localStorage.setItem(`favorite-${id}`, 'true');
                }
            });
        });
    });
