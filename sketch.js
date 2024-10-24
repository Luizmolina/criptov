let input, encryptedInput, encryptButton, decryptButton, encryptedP, decryptedP, keyP, passwordInput, showKeyButton;
let secretKey = [];
let password = "Bakunin1UNIPA@";  // Senha definida

function setup() {
  noCanvas();
  
  // Caixa de entrada para a palavra
  createP("Insira a palavra para criptografar:");
  input = createInput();
  
  // Botão para criptografar
  encryptButton = createButton('Criptografar');
  encryptButton.mousePressed(() => {
    generateSecretKey();  // Gera a chave secreta antes de criptografar
    encrypt();
  });
  
  // Parágrafo para exibir o texto criptografado
  createP("Texto criptografado:");
  encryptedP = createP('');
  
  // Botão para solicitar a exibição da chave secreta
  createP("Insira a senha para ver a chave secreta:");
  passwordInput = createInput('', 'password');  // Campo para senha (escondido)
  
  // Botão para verificar a senha e exibir a chave secreta
  showKeyButton = createButton('Mostrar chave secreta');
  showKeyButton.mousePressed(() => {
    checkPassword();  // Verifica a senha antes de exibir a chave
  });
  
  // Parágrafo para exibir a chave secreta (apenas se a senha estiver correta)
  keyP = createP('');
  
  // Caixa de entrada para inserir o código criptografado
  createP("Insira o código criptografado para descriptografar:");
  encryptedInput = createInput();
  
  // Caixa de entrada para inserir a chave secreta ao descriptografar
  createP("Insira a chave secreta para descriptografar:");
  keyInput = createInput();  // Para inserir a chave secreta
  
  // Botão para descriptografar
  decryptButton = createButton('Descriptografar');
  decryptButton.mousePressed(() => {
    secretKey = keyInput.value().split(',').map(Number);  // Recupera a chave secreta
    decrypt();
  });
  
  // Parágrafo para exibir o texto descriptografado
  createP("Texto descriptografado:");
  decryptedP = createP('');
}

// Função para verificar a senha e exibir a chave secreta
function checkPassword() {
  if (passwordInput.value() === password) {
    keyP.html("Chave secreta: " + secretKey.join(','));  // Exibe a chave se a senha estiver correta
  } else {
    keyP.html("Senha incorreta!");  // Mensagem de erro se a senha estiver errada
  }
}

// Função para gerar uma chave secreta de números aleatórios
function generateSecretKey() {
  secretKey = [];
  let length = Math.floor(Math.random() * 10) + 5;  // Tamanho da chave entre 5 e 15
  for (let i = 0; i < length; i++) {
    secretKey.push(Math.floor(Math.random() * 20) + 1);  // Números entre 1 e 20
  }
  console.log("Chave secreta gerada:", secretKey);
}

// Função de criptografia
function encrypt() {
  let word = input.value();
  let encryptedText = '';
  
  for (let i = 0; i < word.length; i++) {
    let char = word[i].toLowerCase();
    if (char === ' ') {
      encryptedText += '0 ';  // Espaço representado por '0'
    } else {
      let encryptedChar = encryptCharacter(char);  // Aplica a criptografia ao caractere
      encryptedText += (encryptedChar + secretKey[i % secretKey.length]) + ' '; // Aplica a chave secreta
    }
  }
  
  encryptedP.html(encryptedText.trim());  // Exibe o texto criptografado
}

// Função de descriptografia
function decrypt() {
  let codes = encryptedInput.value().split(' ');
  let decryptedText = '';
  
  for (let i = 0; i < codes.length; i++) {
    let code = codes[i];
    if (code === '0') {
      decryptedText += ' ';  // '0' volta a ser espaço
    } else {
      decryptedText += decryptCharacter(parseInt(code) - secretKey[i % secretKey.length]);  // Remove o valor da chave secreta
    }
  }
  
  decryptedP.html(decryptedText);  // Exibe o texto descriptografado
}

// Criptografia para vogais
function encryptVowel(vowel) {
  let code;
  switch(vowel) {
    case 'a': code = ((1 + 3) * 8) - 6; break;  // A = 1
    case 'e': code = ((2 + 3) * 8) - 6; break;  // E = 2
    case 'i': code = ((3 + 3) * 8) - 6; break;  // I = 3
    case 'o': code = ((4 + 3) * 8) - 6; break;  // O = 4
    case 'u': code = ((5 + 3) * 8) - 6; break;  // U = 5
    default: code = 0; break; // Para segurança, retorno 0 se não for vogal
  }
  return code;
}

// Criptografia para consoantes
function encryptConsonant(consonant) {
  let alphabet = 'bcdfghjklmnpqrstvwxyz';
  let index = alphabet.indexOf(consonant) + 1;  // Índice começa em 1
  let code = ((index + 6) * 9) - 3;
  return code;
}

// Função para criptografar uma letra (vogal ou consoante)
function encryptCharacter(char) {
  if ('aeiou'.includes(char)) {
    return encryptVowel(char);
  } else if ('bcdfghjklmnpqrstvwxyz'.includes(char)) {
    return encryptConsonant(char);
  }
  return 0;  // Retorna 0 para caracteres não válidos
}

// Função de descriptografia para vogais
function decryptVowel(code) {
  switch(code) {
    case 26: return 'a';
    case 34: return 'e';
    case 42: return 'i';
    case 50: return 'o';
    case 58: return 'u';
    default: return '';
  }
}

// Função de descriptografia para consoantes
function decryptConsonant(code) {
  let alphabet = 'bcdfghjklmnpqrstvwxyz';
  
  for (let i = 0; i < alphabet.length; i++) {
    let testCode = ((i + 1 + 6) * 9) - 3;
    if (testCode === code) {
      return alphabet[i];
    }
  }
  return '';  // Retorna string vazia se não encontrar
}

// Função para descriptografar um número
function decryptCharacter(code) {
  if (decryptVowel(code) !== '') {
    return decryptVowel(code);
  } else if (decryptConsonant(code) !== '') {
    return decryptConsonant(code);
  }
  return '';  // Retorna string vazia se não for uma letra válida
}
