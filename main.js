async function characterSearch() {
  const termo = document.getElementById('searchInput').value.trim().toLowerCase();
  const resultDiv = document.getElementById('characterResult');
  if (!termo) return resultDiv.innerHTML = '<p>Por favor, digite um sobrenome, nome ou ID de personagem.</p>';
  resultDiv.innerHTML = '<p>Carregando...</p>';

  try {
    let chars = [];
    if (/^[0-9]+$/.test(termo)) {
      const res = await fetch(`https://naruto-br-api.site/characters/${termo}`);
      if (!res.ok) throw new Error('Personagem não encontrado.');
      chars = [await res.json()];
    } else {
      const res = await fetch('https://naruto-br-api.site/characters');
      if (!res.ok) throw new Error('Personagem não encontrado.');
      const data = await res.json();
      chars = data.filter(c => c.name.toLowerCase().includes(termo));
    }
    if (!chars.length) return resultDiv.innerHTML = '<p>Nenhum personagem encontrado.</p>';

    resultDiv.innerHTML = chars.map(char => `
      <div style="margin-bottom:32px;padding-bottom:16px;border-bottom:1px solid #eee;">
        <h2>${char.name}</h2>
        <img src="${char.profile_image || (char.images?.[0]?.url || char.images?.[0] || '')}" alt="${char.name}" width="340" style="max-width:98%;border-radius:16px;box-shadow:0 4px 18px rgba(252,74,26,0.13);margin-bottom:14px;">
        <p><strong>Pai:</strong> ${char.father?.name || 'Desconhecido'}</p>
        <p><strong>Mãe:</strong> ${char.mother?.name || 'Desconhecida'}</p>
        <p><strong>Vila:</strong> ${char.village?.name || '---'}</p>
        <p><strong>Rank:</strong> ${char.rank || '---'}</p>
        <p><strong>Poder:</strong> ${char.power || '---'}</p>
        <p><strong>Resumo:</strong> ${char.summary || '---'}</p>
      </div>
    `).join('');
  } catch (err) {
    resultDiv.innerHTML = `<p>Erro ao buscar personagem: ${err.message}</p>`;
  }
}
