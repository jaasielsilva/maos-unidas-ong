// Menu responsivo e máscaras de input (CPF, telefone, CEP)
const toggle = document.querySelector('.menu-toggle');
const nav = document.getElementById('menu');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const aberto = nav.classList.toggle('aberto');
    toggle.setAttribute('aria-expanded', String(aberto));
  });
}

const mascaras = {
  cpf: v => v.replace(/\D/g, '').slice(0, 11)
    .replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d{1,2})$/, '$1-$2'),
  telefone: v => v.replace(/\D/g, '').slice(0, 11)
    .replace(/^(\d{2})(\d)/, '($1) $2').replace(/(\d{4,5})(\d{4})$/, '$1-$2'),
  cep: v => v.replace(/\D/g, '').slice(0, 8).replace(/(\d{5})(\d)/, '$1-$2')
};
document.querySelectorAll('[data-mask]').forEach(campo => {
  campo.addEventListener('input', () => { campo.value = mascaras[campo.dataset.mask](campo.value); });
});

function cpfValido(cpf) {
  const n = cpf.replace(/\D/g, '');
  if (n.length !== 11 || /^(\d)\1+$/.test(n)) return false;
  for (const t of [9, 10]) {
    let soma = 0;
    for (let i = 0; i < t; i++) soma += Number(n[i]) * (t + 1 - i);
    if ((soma * 10 % 11) % 10 !== Number(n[t])) return false;
  }
  return true;
}

const form = document.getElementById('form-cadastro');
if (form) {
  const cpf = form.elements.cpf;
  cpf.addEventListener('input', () => {
    cpf.setCustomValidity(cpf.value.length === 14 && !cpfValido(cpf.value) ? 'CPF inválido.' : '');
  });
  form.addEventListener('submit', e => {
    e.preventDefault();
    if (!form.checkValidity()) { form.reportValidity(); return; }
    const msg = document.getElementById('mensagem-sucesso');
    msg.hidden = false;
    msg.focus();
    form.reset();
  });
}
