/* A ordem deste array é a ordem de leitura. Os nomes são relativos a imagens/paginas/. */
const bookContent = {
  pages: [
    '001.jpg', '002.jpg',
    '003.jpg', '004.jpg', '005.jpg', '006.jpg', '007.jpg', '008.jpg',
    '009.jpg', '010.jpg', '011.jpg', '012.jpg', '013.jpg', '014.jpg',
    '015.jpg', '016.jpg', '017.jpg', '018.jpg', '019.jpg', '020.jpg',
    '021.jpg', '022.jpg', '023.jpg', '024.jpg', '025.jpg', '026.jpg',
    '027.jpg', '028.jpg', '029.jpg', '030.jpg', '031.jpg', '032.jpg',
    '033.jpg', '034.jpg', '035.jpg', '036.jpg', '037.jpg', '038.jpg',
    '039.jpg', '040.jpg', '041.jpg', '042.jpg', '043.jpg', '044.jpg',
    '045.jpg', '046.jpg', '047.jpg', '048.jpg',
  ],
  // Campos opcionais por arquivo: label, description, title e paragraphs.
  details: {
    '001.jpg': {
      label: 'Capa',
      title: 'Outras formas de ver',
      description: 'Mosaico com janelas, paisagens, livros, um cão sobre um sofá e uma estrada arborizada.',
      paragraphs: [
        'Diana Domingues Araujo',
        'Projeto contemplado pela Política Nacional Aldir Blanc de Fomento à Cultura (PNAB)',
        'Arroio Grande · 2026',
      ],
    },
    '002.jpg': {
      label: 'Apresentação',
      title: 'Outras formas de ver',
      description: 'Fotografia vertical com árvores, uma construção branca e dois cães deitados na grama.',
      paragraphs: [
        'Reunindo fotografias feitas em diferentes momentos e lugares de Arroio Grande, este projeto apresenta um conjunto de imagens que nasce do olhar cotidiano, sem roteiro definido, guiado apenas pela atenção ao que se encontra pelo caminho.',
        'Mais do que registrar lugares, o livro convida a perceber detalhes, formas, cores e situações que, no ritmo comum do dia a dia, muitas vezes passam despercebidos.',
      ],
    },
  },
  information: [
    { title: 'Sobre o olhar', text: 'Mais do que registrar lugares, o livro convida a perceber detalhes, formas, cores e situações que, no ritmo comum do dia a dia, muitas vezes passam despercebidos.' },
    { title: 'Sobre o projeto', text: 'Reunindo fotografias feitas em diferentes momentos e lugares de Arroio Grande, este projeto apresenta um conjunto de imagens que nasce do olhar cotidiano, sem roteiro definido, guiado apenas pela atenção ao que se encontra pelo caminho.' },
    { title: 'Créditos', text: 'Autoria: Diana Domingues Araujo.\n\nProjeto contemplado pela Política Nacional Aldir Blanc de Fomento à Cultura (PNAB).\n\nArroio Grande · 2026.' },
  ],
};
