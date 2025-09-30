async function characterSearch() {
  const searchInputRaw = document.getElementById('searchInput').value.trim();
  const resultDiv = document.getElementById('characterResult');

  if (!searchInputRaw) {
    resultDiv.innerHTML = '<p>Por favor, digite um nome ou ID de personagem.</p>';
    return;
  }

  resultDiv.innerHTML = '<p>Carregando...</p>';

  const isId = /^[0-9]+$/.test(searchInputRaw);
  const base = 'https://naruto-br-api.site/characters';
  let url;

  if (isId) {
    url = `${base}/${encodeURIComponent(searchInputRaw)}`;
  } else {
    url = base; 
  }

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Erro ${response.status}: Personagem não encontrado.`);

    const data = await response.json();
    let char;

    if (isId) {
      char = data;
    } else {
      char = data.find(c => c.name.toLowerCase().includes(searchInputRaw.toLowerCase()));
      if (!char) {
        resultDiv.innerHTML = '<p>Personagem não encontrado.</p>';
        return;
      }
    }

let image = char.profile_image;

if (Array.isArray(char.images) && char.images.length > 0) { 
  if (typeof char.images[0] === 'string') {
    image = char.images[0];
  } else if (char.images[0].url) {
    image = char.images[0].url;
  }
}

    const father = char.father?.name || 'Desconhecido';
    const mother = char.mother?.name || 'Desconhecida';
    const village = char.village?.name || '---';
    const rank = char.rank || '---';
    const power = char.power || '---';
    const summary = char.summary || '---';
    

    resultDiv.innerHTML = `
      <h2>${char.name}</h2>
      <img src="${image}" alt="${char.name}" width="200">
      <p><strong>Pai:</strong> ${father}</p>
      <p><strong>Mãe:</strong> ${mother}</p>
      <p><strong>Vila:</strong> ${village}</p>
      <p><strong>Rank:</strong> ${rank}</p>
      <p><strong>Poder:</strong> ${power}</p>
      <p><strong>Resumo:</strong> ${summary}</p>

    `;
  } catch (err) {
    console.error('ERRO BUSCA ->', err);
    resultDiv.innerHTML = `<p>Erro ao buscar personagem: ${err.message}</p>`;
  }
}

document.getElementById('searchButton').addEvent
