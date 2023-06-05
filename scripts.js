let searchButton = document.getElementById("searchButton");

searchButton.addEventListener("click", function() {
  let searchText = document.getElementById("searchLine");
  let searchValue = searchText.value;

  fetch("https://pokeapi.co/api/v2/pokemon/" + searchValue)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Произошла ошибка при получении данных");
      }
    })
    .then(data => {
      let pokemonImg = document.getElementById("pokemonImg");
      pokemonImg.src = data.sprites.other["official-artwork"].front_default; // Изменение src изображения на обычный арт покемона

      let pokemonName = document.getElementById("pokemonName");
      pokemonName.textContent = "ім'я: " + data.name;

      let abilities = data.abilities.map(ability => ability.ability.name);
      let pokemonAbilities = document.getElementById("pokemonAbilities");
      pokemonAbilities.textContent = "Здібності: " + abilities.join(", ");

      let height = data.height / 10; // Конвертация высоты из дециметров в метры
      let weight = data.weight / 10; // Конвертация веса из граммов в килограммы
      let pokemonSize = document.getElementById("pokemonSize");
      pokemonSize.textContent = "Розмір: " + height + "m";

      let pokemonWeight = document.getElementById("pokemonWeight");
      pokemonWeight.textContent = "Висота: " + weight + "kg";

      let emptyMessage = document.getElementById("emptyMessage");
      emptyMessage.style.display = "none"; // Скрыть текстовое сообщение, если есть данные покемона

      console.log(data);
    })
    .catch(error => {
      let emptyMessage = document.getElementById("emptyMessage");
      emptyMessage.style.display = "block"; // Показать текстовое сообщение, если возникла ошибка или покемон не найден
      console.error(error);
    });
});