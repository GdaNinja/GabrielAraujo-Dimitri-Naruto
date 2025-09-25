
async function characterSearch() {
    const input = document.getElementById('searchInput').value;
    const resultDiv = document.getElementById('characterResult');
    await fetch(`https://naruto-br-api.site/characters`)
  .then(response => response.json())
  .then(data => {
    console.log(data);

    if(data.name === undefined) {
    resultDiv.innerHTML = `<p>Personagem não encontrado.<p>`;
  } else {
    resultDiv.innerHTML = `
      <h2>${data.name}</h2>
      <img src="${data.profile_image}" alt="${data.name}" />
      <p><strong>Pai:</strong> ${data.father}</p>
      <p><strong>Mãe:</strong> ${data.mother}</p>
      <p><strong>Vila:</strong> ${data.village}</p>
      <p><strong>Rank:</strong> ${data.rank}</p>
      <p><strong>Descrição:</strong> ${data.description}</p>
    `;
  }
}
  );
}