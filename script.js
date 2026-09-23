document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Progress bar ---------- */
  const progressBar = document.getElementById('progress-bar');
  function updateProgress() {
    const h = document.documentElement;
    const scrolled = h.scrollTop;
    const max = h.scrollHeight - h.clientHeight;
    progressBar.style.width = (max > 0 ? (scrolled / max) * 100 : 0) + '%';
  }
  document.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();

  /* ---------- Active nav link ---------- */
  const navLinks = document.querySelectorAll('.site-nav a');
  const sections = [...navLinks].map(a => document.querySelector(a.getAttribute('href')));
  function updateActiveNav() {
    let current = sections[0];
    for (const sec of sections) {
      if (sec && sec.getBoundingClientRect().top - 120 <= 0) current = sec;
    }
    navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + current.id));
  }
  document.addEventListener('scroll', updateActiveNav, { passive: true });
  updateActiveNav();

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => io.observe(el));

  /* ---------- Accordion ---------- */
  document.querySelectorAll('.acc-item').forEach(item => {
    const trigger = item.querySelector('.acc-trigger');
    const panel = item.querySelector('.acc-panel');
    trigger.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      // close others for a cleaner reveal
      document.querySelectorAll('.acc-item.open').forEach(other => {
        if (other !== item) {
          other.classList.remove('open');
          other.querySelector('.acc-trigger').setAttribute('aria-expanded', 'false');
          other.querySelector('.acc-panel').style.maxHeight = null;
        }
      });
      if (isOpen) {
        item.classList.remove('open');
        trigger.setAttribute('aria-expanded', 'false');
        panel.style.maxHeight = null;
      } else {
        item.classList.add('open');
        trigger.setAttribute('aria-expanded', 'true');
        panel.style.maxHeight = panel.scrollHeight + 'px';
      }
    });
  });

  /* ---------- Quiz ---------- */
  const quizData = [
    {
      q: '¿Qué hace el protagonista cada noche, según el cuento?',
      options: ['Sale a caminar por el barrio', 'Sale en su carro y atropella a alguien al azar', 'Visita a su amante', 'Trabaja hasta tarde en la oficina'],
      correct: 1
    },
    {
      q: '¿Quién es Ángela?',
      options: ['La esposa del protagonista', 'Su hija', 'Una actriz que lo aborda en la calle y se convierte en su segunda víctima', 'Una compañera de trabajo'],
      correct: 2
    },
    {
      q: '¿En qué persona narrativa está contado el cuento?',
      options: ['Tercera persona omnisciente', 'Segunda persona', 'Primera persona, el propio asesino', 'Narrador testigo'],
      correct: 2
    },
    {
      q: '¿Por qué fue censurado el libro "Feliz Año Nuevo" en 1976?',
      options: ['Por su violencia explícita, durante la dictadura militar brasileña', 'Por hablar mal del fútbol', 'Por ser un plagio', 'Nunca fue censurado'],
      correct: 0
    },
    {
      q: '¿Qué frase repite el narrador al final de cada crimen?',
      options: ['"Nunca más volveré a hacerlo"', '"Mañana voy a tener un día terrible en la oficina"', '"Necesito ayuda"', '"Fue un accidente"'],
      correct: 1
    }
  ];

  let quizIndex = 0;
  let quizScore = 0;
  let answered = false;

  const quizQuestionEl = document.getElementById('quiz-question');
  const quizOptionsEl = document.getElementById('quiz-options');
  const quizFeedbackEl = document.getElementById('quiz-feedback');
  const quizScoreEl = document.getElementById('quiz-score');
  const quizTotalEl = document.getElementById('quiz-total');
  const quizNextBtn = document.getElementById('quiz-next');
  const quizDotsEl = document.getElementById('quiz-dots');

  quizTotalEl.textContent = quizData.length;
  quizData.forEach(() => {
    const dot = document.createElement('span');
    quizDotsEl.appendChild(dot);
  });

  function renderQuiz() {
    answered = false;
    quizNextBtn.disabled = true;
    quizFeedbackEl.textContent = '';
    const item = quizData[quizIndex];
    quizQuestionEl.textContent = `${quizIndex + 1}. ${item.q}`;
    quizOptionsEl.innerHTML = '';
    item.options.forEach((opt, i) => {
      const btn = document.createElement('button');
      btn.textContent = opt;
      btn.addEventListener('click', () => handleAnswer(i, btn));
      quizOptionsEl.appendChild(btn);
    });
    quizNextBtn.textContent = quizIndex === quizData.length - 1 ? 'Ver resultado final →' : 'Siguiente →';
  }

  function handleAnswer(i, btn) {
    if (answered) return;
    answered = true;
    const item = quizData[quizIndex];
    const buttons = [...quizOptionsEl.children];
    buttons.forEach(b => b.disabled = true);

    if (i === item.correct) {
      btn.classList.add('correct');
      quizFeedbackEl.textContent = '✅ ¡Correcto!';
      quizFeedbackEl.style.color = 'var(--teal)';
      quizScore++;
      quizScoreEl.textContent = quizScore;
    } else {
      btn.classList.add('incorrect');
      buttons[item.correct].classList.add('correct');
      quizFeedbackEl.textContent = '❌ No era esa — la respuesta correcta está marcada en verde.';
      quizFeedbackEl.style.color = 'var(--pink)';
    }
    quizDotsEl.children[quizIndex].classList.add('done');
    quizNextBtn.disabled = false;
  }

  quizNextBtn.addEventListener('click', () => {
    if (quizIndex < quizData.length - 1) {
      quizIndex++;
      renderQuiz();
    } else {
      quizQuestionEl.textContent = `🎉 ¡Terminaste! Puntaje final: ${quizScore}/${quizData.length}`;
      quizOptionsEl.innerHTML = '';
      quizFeedbackEl.textContent = quizScore === quizData.length
        ? '¡Leíste el cuento con lupa de detective!'
        : 'Buen intento — vuelve a leer el cuento con calma y repite el quiz.';
      quizFeedbackEl.style.color = 'var(--violet)';
      quizNextBtn.disabled = true;
    }
  });

  renderQuiz();

  /* ---------- Live poll ---------- */
  document.querySelectorAll('.poll-options').forEach(pollEl => {
    const buttons = [...pollEl.querySelectorAll('.poll-btn')];
    const counts = {};
    buttons.forEach(b => counts[b.dataset.option] = 0);
    let voted = false;

    function render() {
      const total = Object.values(counts).reduce((a, b) => a + b, 0);
      buttons.forEach(b => {
        const c = counts[b.dataset.option];
        const pct = total > 0 ? Math.round((c / total) * 100) : 0;
        b.querySelector('.fill').style.width = pct + '%';
        b.querySelector('.pct').textContent = pct + '%';
      });
    }

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        if (voted) return;
        voted = true;
        counts[btn.dataset.option]++;
        render();
      });
    });

    render();
  });

});
