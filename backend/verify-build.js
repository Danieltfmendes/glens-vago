// Script de verificação para garantir que o build foi executado
const fs = require('fs');
const path = require('path');

const distPath = path.join(__dirname, 'dist', 'index.js');

if (!fs.existsSync(distPath)) {
  console.error('❌ ERRO: dist/index.js não encontrado!');
  console.error('Execute: npm run build');
  process.exit(1);
}

console.log('✅ Build verificado: dist/index.js existe');
process.exit(0);

