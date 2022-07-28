function formatarData(str) {
  const meses = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ];
  const dias = [
    'Domingo',
    'Segunda',
    'Terça',
    'Quarta',
    'Quinta',
    'Sexta',
    'Sábado',
  ];
  const partes = str.split('/').map(Number);
  const data = new Date(`20${partes[2]}`, partes[1] - 1, partes[0]);
  let diaSemana = dias[data.getDay() % 7];
  const mes = meses[data.getMonth()];

  if (
    diaSemana === 'Segunda' ||
    diaSemana === 'Terça' ||
    diaSemana === 'Quarta' ||
    diaSemana === 'Quinta' ||
    diaSemana === 'Sexta'
  ) {
    diaSemana = `${diaSemana}-Feira`;
  }

  return [`${diaSemana},`, data.getDate(), 'de', `${mes}.`].join(' ');
}

export { formatarData };
