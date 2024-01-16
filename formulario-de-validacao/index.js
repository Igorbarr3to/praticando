//seção de elementos
const form = document.getElementById('form'),
  passwordInput = document.getElementById('password'),
  passToggleBtn = document.getElementById('pass-toggle-btn'),
  tksMessage = document.getElementById('tksMessage');

//função para tratamento de erros
 const showError = (field, errorText) => {
  field.classList.add("error");
  const errorElement = document.createElement('small');
  errorElement.classList.add("error-text");
  errorElement.innerText = errorText;
  field.closest('.form-group').appendChild(errorElement);
};

//verificação de força da senha
const checkPasswordStrength = (password) => {
  return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/.test(password);
};

const validatePassword = (password) => {
  if(password === ""){
    showError(passwordInput, "Insira sua senha.");
  }
  else if (!checkPasswordStrength(password)){
    showError(
      passwordInput,
      "Por favor, insira pelo menos 8 caracteres com um número, símbolo, letra minúscula e maiúscula."
    );
  }
};

//tratamento de dados do formulário
const handleFormData = (e) => {
  e.preventDefault();
  const [fullnameInput, emailInput, dateInput, genderInput] = [
    "fullname",
    "email",
    "date",
    "gender"
  ].map((id) => document.getElementById(id));

  const [fullname, email, password, date, gender] = [
    fullnameInput,
    emailInput,
    passwordInput,
    dateInput,
    genderInput
  ].map((input) => input.value.trim());

  const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

  document.querySelectorAll('.form-group .error').forEach((field) => field.classList.remove('error'));
  document.querySelectorAll('.error-text').forEach((errorText) => errorText.remove());

  if(fullname === "" ) showError(fullnameInput, "Insira seu nome completo.");
  if(!emailPattern.test(email)) 
    showError(emailInput, "Insira um endereço de e-mail válido.")
  validatePassword(password);
  if(date === "") showError(dateInput, "Selecione sua data de nascimento.");
  if(gender === "") showError(genderInput, "Seleciona seu gênero.");

  if(!document.querySelectorAll('.form-group .error').length){
    form.style.display = "none";
    tksMessage.style.display = "block";
  }
};

//alterna a visibilidade da senha
passToggleBtn.addEventListener('click', ()=>{
  passToggleBtn.className = passwordInput.type === "password" ? "fa-solid fa-eye-slash" : "fa-solid fa-eye";
  passwordInput.type = passwordInput.type === "password" ? "text" : "password";
});

//tratamento do evento de envio de formulário
form.addEventListener("submit", handleFormData);
