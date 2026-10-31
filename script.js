/* =========================================================
   ConsentCare — interações do site
   Cada bloco abaixo cuida de uma parte da página.
   ========================================================= */
(function () {
  'use strict';

  /* ---------- Menu do celular ---------- */
  var header = document.querySelector('.site-header');
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('menu-principal');

  function setMenu(open) {
    nav.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.querySelector('use').setAttribute('href', open ? '#i-x' : '#i-menu');
    toggle.querySelector('.visually-hidden').textContent = open ? 'Fechar menu' : 'Abrir menu';
  }

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      setMenu(!nav.classList.contains('is-open'));
    });
    // Fecha o menu ao clicar em um link
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) setMenu(false);
    });
    // Fecha com a tecla Esc
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        setMenu(false);
        toggle.focus();
      }
    });
  }

  // Sombra no cabeçalho depois de rolar a página
  function onScroll() {
    header.classList.toggle('is-scrolled', window.scrollY > 8);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Animação da linha do tempo ao rolar ---------- */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    reveals.forEach(function (el, i) {
      el.style.transitionDelay = (i * 0.12) + 's';
      observer.observe(el);
    });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---------- Abas "Para quem" (funcionam com mouse e teclado) ---------- */
  var tabs = Array.prototype.slice.call(document.querySelectorAll('[role="tab"]'));

  function selectTab(tab, giveFocus) {
    tabs.forEach(function (t) {
      var selected = t === tab;
      t.setAttribute('aria-selected', String(selected));
      t.tabIndex = selected ? 0 : -1;
      document.getElementById(t.getAttribute('aria-controls')).hidden = !selected;
    });
    if (giveFocus) tab.focus();
  }

  tabs.forEach(function (tab, i) {
    tab.addEventListener('click', function () { selectTab(tab, false); });
    tab.addEventListener('keydown', function (e) {
      var next = null;
      if (e.key === 'ArrowRight') next = tabs[(i + 1) % tabs.length];
      if (e.key === 'ArrowLeft') next = tabs[(i - 1 + tabs.length) % tabs.length];
      if (e.key === 'Home') next = tabs[0];
      if (e.key === 'End') next = tabs[tabs.length - 1];
      if (next) {
        e.preventDefault();
        selectTab(next, true);
      }
    });
  });

  /* ---------- Botão "Copiar" do bloco de código ---------- */
  document.querySelectorAll('.copy-btn').forEach(function (btn) {
    var label = btn.querySelector('span');
    btn.addEventListener('click', function () {
      var text = document.getElementById(btn.dataset.copyTarget).innerText;
      copyText(text).then(function () {
        label.textContent = 'Copiado!';
      }, function () {
        label.textContent = 'Não foi possível copiar';
      }).then(function () {
        setTimeout(function () { label.textContent = 'Copiar'; }, 2000);
      });
    });
  });

  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
    }
    // Alternativa para navegadores antigos ou arquivo aberto direto do computador
    return new Promise(function (resolve, reject) {
      var area = document.createElement('textarea');
      area.value = text;
      area.setAttribute('readonly', '');
      area.style.position = 'fixed';
      area.style.opacity = '0';
      document.body.appendChild(area);
      area.select();
      var ok = false;
      try { ok = document.execCommand('copy'); } catch (err) { ok = false; }
      document.body.removeChild(area);
      if (ok) { resolve(); } else { reject(); }
    });
  }

  /* ---------- Calculadora de economia ---------- */
  var FOLHAS_POR_CAIXA = 1200;
  var FOLHAS_POR_ARVORE = 8000;

  var numero = new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 0 });
  var decimal = new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 1 });
  var moeda = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });

  var campos = {
    termos: document.getElementById('c-termos'),
    paginas: document.getElementById('c-paginas'),
    custoPagina: document.getElementById('c-custo-pagina'),
    minutos: document.getElementById('c-minutos'),
    hora: document.getElementById('c-hora')
  };

  function valor(input) {
    // Aceita vírgula como separador decimal (ex.: 0,25)
    var n = parseFloat(String(input.value).replace(',', '.'));
    var invalido = isNaN(n) || n < 0;
    input.setAttribute('aria-invalid', String(invalido && input.value !== ''));
    return invalido ? 0 : n;
  }

  function escrever(id, texto) {
    var el = document.getElementById(id);
    if (el) el.textContent = texto;
  }

  function calcular() {
    var termosAno = valor(campos.termos) * 12;
    var folhas = termosAno * valor(campos.paginas);
    var custoImpressao = folhas * valor(campos.custoPagina);
    var horas = termosAno * valor(campos.minutos) / 60;
    var custoHoras = horas * valor(campos.hora);
    var caixas = folhas / FOLHAS_POR_CAIXA;
    var arvores = folhas / FOLHAS_POR_ARVORE;

    escrever('r-folhas', numero.format(folhas));
    escrever('r-impressao', moeda.format(custoImpressao));
    escrever('r-horas', numero.format(horas) + ' h');
    escrever('r-custo-horas', moeda.format(custoHoras));
    escrever('r-caixas', decimal.format(caixas));
    escrever('r-arvores', decimal.format(arvores));
    escrever('r-total', moeda.format(custoImpressao + custoHoras));

    // A faixa de sustentabilidade usa os mesmos números
    escrever('eco-folhas', numero.format(folhas));
    escrever('eco-caixas', decimal.format(caixas));
  }

  Object.keys(campos).forEach(function (k) {
    if (campos[k]) campos[k].addEventListener('input', calcular);
  });
  if (campos.termos) calcular();

  /* ---------- Formulário de contato (Formspree) ---------- */
  var form = document.getElementById('contact-form');
  var status = document.getElementById('form-status');

  function mostrarStatus(texto, tipo) {
    status.textContent = texto;
    status.className = 'form-status' + (tipo ? ' is-' + tipo : '');
  }

  function validar() {
    var primeiroErro = null;
    form.querySelectorAll('[required]').forEach(function (campo) {
      var ok = campo.type === 'checkbox' ? campo.checked : campo.checkValidity() && campo.value.trim() !== '';
      if (campo.type === 'checkbox') {
        campo.closest('.consent-check').classList.toggle('is-invalid', !ok);
      }
      campo.setAttribute('aria-invalid', String(!ok));
      if (!ok && !primeiroErro) primeiroErro = campo;
    });
    return primeiroErro;
  }

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var erro = validar();
      if (erro) {
        var msg = erro.type === 'checkbox'
          ? 'Para enviar, marque a caixa de consentimento.'
          : erro.type === 'email' && erro.value.trim() !== ''
            ? 'Confira o e-mail digitado.'
            : 'Preencha os campos obrigatórios marcados com *.';
        mostrarStatus(msg, 'error');
        erro.focus();
        return;
      }

      if (form.action.indexOf('SEU_ID_FORMSPREE') !== -1) {
        mostrarStatus('O formulário ainda não está configurado. Falta colocar o endereço do Formspree.', 'error');
        return;
      }

      var botao = form.querySelector('button[type="submit"]');
      botao.disabled = true;
      botao.textContent = 'Enviando…';
      mostrarStatus('', '');

      fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      }).then(function (resp) {
        if (!resp.ok) throw new Error('falha');
        form.reset();
        form.querySelectorAll('[aria-invalid]').forEach(function (c) { c.removeAttribute('aria-invalid'); });
        mostrarStatus('Mensagem enviada. Obrigado! Vamos responder em breve.', 'success');
      }).catch(function () {
        mostrarStatus('Não foi possível enviar agora. Verifique sua conexão e tente de novo.', 'error');
      }).then(function () {
        botao.disabled = false;
        botao.textContent = 'Enviar';
      });
    });

    // Remove o aviso de erro assim que a pessoa corrige o campo
    form.addEventListener('input', function (e) {
      if (e.target.getAttribute('aria-invalid') === 'true') {
        var ok = e.target.type === 'checkbox' ? e.target.checked : e.target.checkValidity();
        if (ok) {
          e.target.setAttribute('aria-invalid', 'false');
          var box = e.target.closest('.consent-check');
          if (box) box.classList.remove('is-invalid');
        }
      }
    });
  }
})();
