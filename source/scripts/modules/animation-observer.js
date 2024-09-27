

function animationObserver () {
  // Находим все элементы с классом 'parent'
  const parentElements = document.querySelectorAll('[data-animation]');

  // Создаем объект Intersection Observer
  const observer = new IntersectionObserver((entries) => {
    // Проходимся по каждому элементу в зоне видимости
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Если элемент в зоне видимости, добавляем класс 'animate'
        entry.target.classList.add('animate');
      } else {
        // Если элемент выходит из зоны видимости, убираем класс (если нужно)
        entry.target.classList.remove('animate');
      }
    });
  }, {
    // Указываем порог срабатывания (0 = начало появления, 1 = полный показ)
    threshold: 0.8 // 10% элемента должно быть видно
  });

  // Начинаем наблюдение за каждым элементом
  parentElements.forEach((parent) => observer.observe(parent));
}

export {animationObserver};
