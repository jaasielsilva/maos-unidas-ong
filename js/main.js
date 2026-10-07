// Menu responsivo, dropdown e máscaras de input (CPF, telefone, CEP)
const toggle = document.querySelector('.menu-toggle');
const nav = document.getElementById('menu');

const closeDropdowns = (exception = null) => {
  document.querySelectorAll('.nav-dropdown').forEach(item => {
    if (item !== exception) {
      item.classList.remove('is-open');
      const button = item.querySelector('.dropdown-toggle');
      if (button) button.setAttribute('aria-expanded', 'false');
    }
  });
};

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const aberto = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(aberto));
    if (!aberto) closeDropdowns();
  });
}

const dropdownButtons = document.querySelectorAll('.dropdown-toggle');
dropdownButtons.forEach(button => {
  button.addEventListener('click', event => {
    event.stopPropagation();
    const item = button.closest('.nav-dropdown');
    if (!item) return;
    const aberto = item.classList.contains('is-open');
    closeDropdowns(aberto ? null : item);
    item.classList.toggle('is-open', !aberto);
    button.setAttribute('aria-expanded', String(!aberto));
  });
});

document.addEventListener('click', event => {
  if (!event.target.closest('.nav-dropdown')) closeDropdowns();
});

window.addEventListener('resize', () => {
  if (window.innerWidth >= 640) {
    closeDropdowns();
    if (nav) nav.classList.remove('is-open');
    if (toggle) toggle.setAttribute('aria-expanded', 'false');
  }
});

const mascaras = {
  cpf: v => v.replace(/\D/g, '').slice(0, 11)
    .replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d{1,2})$/, '$1-$2'),
  telefone: v => v.replace(/\D/g, '').slice(0, 11)
    .replace(/^(\d{2})(\d)/, '($1) $2').replace(/(\d{4,5})(\d{4})$/, '$1-$2'),
  cep: v => v.replace(/\D/g, '').slice(0, 8).replace(/(\d{5})(\d)/, '$1-$2')
};

document.querySelectorAll('[data-mask]').forEach(campo => {
  campo.addEventListener('input', () => {
    campo.value = mascaras[campo.dataset.mask](campo.value);
  });
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

const showToast = (message, type = 'success') => {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast--${type}`;
  toast.textContent = message;
  container.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3200);
};

const modal = document.getElementById('impacto-modal');
if (modal) {
  const openModal = () => {
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
  };

  const closeModal = () => {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
  };

  document.querySelectorAll('[data-modal-target]').forEach(button => {
    button.addEventListener('click', () => openModal());
  });

  document.querySelectorAll('[data-close-modal]').forEach(button => {
    button.addEventListener('click', () => closeModal());
  });

  modal.addEventListener('click', event => {
    if (event.target === modal) closeModal();
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
  });
}

document.querySelectorAll('[data-toast]').forEach(button => {
  button.addEventListener('click', event => {
    const message = button.dataset.toast || 'Ação concluída com sucesso!';
    const type = button.dataset.toastType || 'success';
    event.preventDefault();
    showToast(message, type);
  });
});

const form = document.getElementById('form-cadastro');
if (form) {
  const cpf = form.elements.cpf;
  cpf.addEventListener('input', () => {
    cpf.setCustomValidity(cpf.value.length === 14 && !cpfValido(cpf.value) ? 'CPF inválido.' : '');
  });

  const enviar = form.querySelector('[type="submit"]');
  const atualizarEnvio = () => { enviar.disabled = !form.checkValidity(); };
  form.addEventListener('input', atualizarEnvio);
  form.addEventListener('change', atualizarEnvio);
  form.addEventListener('reset', () => setTimeout(atualizarEnvio));
  atualizarEnvio();

  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const msg = document.getElementById('mensagem-sucesso');
    msg.hidden = false;
    msg.focus();
    showToast('Cadastro enviado com sucesso! Em breve entraremos em contato.', 'success');
    form.reset();
  });
}

