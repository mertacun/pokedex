document.addEventListener("DOMContentLoaded", function () {
  const uniqueTypes = getUniqueTypes();
  createNavBar(uniqueTypes);
  createPokedex(uniqueTypes);
});

function getUniqueTypes() {
  const types = [];

  pokedex.forEach((pokemon) => {
    pokemon.type.forEach((type) => {
      if (!types.includes(type)) {
        types.push(type);
      }
    });
  });

  return types.sort();
}

function createNavBar(types) {
  const navBar = document.getElementById("pokeTypes");

  types.forEach((type) => {
    const link = document.createElement("a");
    link.href = `#${type}`;
    link.textContent = type;
    navBar.appendChild(link);
  });
}

function createPokedex(types) {
  const pokedexContainer = document.getElementById("pokedex");

  types.forEach((type) => {
    const typeSection = document.createElement("section");
    typeSection.id = type;

    const typePokemons = pokedex.filter((pokemon) =>
      pokemon.type.includes(type)
    );

    const totalPokemon = typePokemons.length;
    const totalHP = typePokemons.reduce((sum, pokemon) => sum + pokemon.base.HP, 0);
    const totalAttack = typePokemons.reduce((sum, pokemon) => sum + pokemon.base.Attack, 0);

    const heading = document.createElement("h2");
    heading.innerHTML = `Type: ${type} (${totalPokemon})`;
    typeSection.appendChild(heading);

    const typeInfo = document.createElement("p");
    typeInfo.innerHTML = `<strong> Total HP: ${totalHP} | Total Attack: ${totalAttack} </strong>`;
    typeSection.appendChild(typeInfo);

    const backToTop = createBackToTop();
    typeSection.appendChild(backToTop);

    typePokemons.sort((a, b) => (a.name > b.name ? 1 : -1))
      .forEach((pokemon) => {
        const pokemonCardLink = document.createElement("a");
        pokemonCardLink.href = pokemon.url;
        pokemonCardLink.target = "_blank";

        const pokemonCard = document.createElement("div");
        pokemonCard.classList.add("pokemon-card");

        const name = document.createElement("h3");
        name.textContent = pokemon.name;
        pokemonCard.appendChild(name);

        const spriteContainer = document.createElement("div");
        spriteContainer.classList.add("sprite-container");
        const sprite = document.createElement("img");
        sprite.src = pokemon.sprite;
        sprite.alt = `${pokemon.name} sprite`;
        spriteContainer.appendChild(sprite);
        pokemonCard.appendChild(spriteContainer);

        const baseStats = document.createElement("p");
        baseStats.classList.add("pokemon-stats");

        const statsLines = [
          ['HP', 'Attack'],
          ['Defense', 'Sp. Attack'],
          ['Sp. Defense', 'Speed']
        ];

        statsLines.forEach(statsLine => {
          const lineContainer = document.createElement("span");

          statsLine.forEach(stat => {
            const statElement = document.createElement("span");
            statElement.innerHTML = `<strong>${stat}:</strong> ${pokemon.base[stat]} `;
            lineContainer.appendChild(statElement);
          });

          baseStats.appendChild(lineContainer);
          baseStats.appendChild(document.createElement("br"));
        });

        pokemonCard.appendChild(baseStats);

        spriteContainer.style.backgroundColor = '#ececec';

        pokemonCardLink.appendChild(pokemonCard);
        typeSection.appendChild(pokemonCardLink);
      });

    const brElement = document.createElement("br");
    typeSection.appendChild(brElement);

    pokedexContainer.appendChild(typeSection);
  });
}

function createBackToTop() {
  const backToTop = document.createElement("p");
  backToTop.innerHTML = '<a href="#">Back to Top</a>';
  return backToTop;
}