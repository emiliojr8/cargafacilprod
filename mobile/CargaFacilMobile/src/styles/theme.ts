// src/styles/theme.ts
export const theme = {
    colors: {
      primary: '#4CAF50',       // Verde principal (botões, ações)
      secondary: '#2196F3',     // Azul para links/seleções
      background: '#FFFFFF',    // Cor de fundo
      text: '#333333',          // Texto escuro
      textLight: '#666666',     // Texto secundário
      border: '#DDDDDD',        // Bordas de inputs
      error: '#F44336',         // Vermelho para erros
      warning: '#ffc107',       // Amarelo para avisos  
      success: '#4CAF50',       // Verde para sucesso
      info: '#2196F3',          // Azul para informações
    },
    fonts: {
      regular: 'Roboto-Regular', // Substitua pela fonte do seu app
      bold: 'Roboto-Bold',      // (Expo: use fontes do Google Fonts ou sistema)
    },
    spacing: {
      small: 8,
      medium: 16,
      large: 24,
    },
    borderRadius: {
      small: 4,
      medium: 8,
      large: 12,
    },
  };
  
  // Tipagem para autocompletar no VS Code
  export type ThemeType = typeof theme;