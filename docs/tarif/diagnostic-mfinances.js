(() => {
  'use strict';

  const root = document.querySelector('[data-mfinances-diagnostic]');
  if (!root) return;

  const questions = [...root.querySelectorAll('[data-question]')];
  const resultPanel = root.querySelector('[data-result]');
  const progressText = root.querySelector('[data-progress-text]');
  const progressBar = root.querySelector('[data-progress-bar]');
  const backButton = root.querySelector('[data-back]');
  const restartButton = root.querySelector('[data-restart]');

  const plans = {
    1: {
      key: 'basic',
      name: 'Basic',
      promise: 'Être en règle',
      price: '275 €',
      explanation: 'Votre besoin porte principalement sur la conformité comptable et fiscale. Les prestations de conseil complémentaires restent disponibles à la demande, au tarif horaire.',
      reasons: [
        'Un suivi annuel correspond à votre rythme de décision actuel.',
        'Votre priorité est de respecter vos obligations comptables et fiscales.'
      ],
      cta: 'Découvrir le forfait Basic',
      href: '#basic',
      upgrade: 'Vous souhaitez ne plus découvrir vos résultats trop tard ? Découvrez le forfait Essentiel.',
      upgradeHref: '#essentiel'
    },
    2: {
      key: 'essentiel',
      name: 'Essentiel',
      promise: 'Anticiper',
      price: '350 €',
      explanation: 'Vous ne cherchez pas uniquement à respecter vos obligations. Vous souhaitez voir venir vos échéances et disposer de premiers outils d’anticipation inclus dans votre forfait.',
      reasons: [
        'Vous souhaitez connaître vos résultats avant la clôture annuelle.',
        'Vous recherchez davantage de visibilité sur les échéances et les risques.'
      ],
      cta: 'Découvrir le forfait Essentiel',
      href: '#essentiel',
      upgrade: 'Vous souhaitez aussi comprendre les écarts et améliorer votre rentabilité ? Découvrez le forfait Premium.',
      upgradeHref: '#premium'
    },
    3: {
      key: 'premium',
      name: 'Premium',
      promise: 'Piloter',
      price: '450 €',
      explanation: 'Vous souhaitez anticiper vos résultats, comprendre les écarts et améliorer régulièrement les performances de votre entreprise. Le contrôle de gestion est intégré à votre accompagnement.',
      reasons: [
        'Vous voulez comprendre pourquoi vos résultats évoluent.',
        'Vous souhaitez agir régulièrement sur les écarts et la rentabilité.'
      ],
      cta: 'Découvrir le forfait Premium',
      href: '#premium',
      upgrade: 'Vous souhaitez également anticiper et optimiser votre trésorerie ? Découvrez le forfait Excellence.',
      upgradeHref: '#excellence'
    },
    4: {
      key: 'excellence',
      name: 'Excellence',
      promise: 'Optimiser',
      price: '650 €',
      explanation: 'Votre besoin porte sur un pilotage financier proactif : performances, décisions et trésorerie sont suivies avec un temps d’avance afin de réduire les imprévus.',
      reasons: [
        'Vous souhaitez intégrer la trésorerie à vos décisions.',
        'Vous voulez anticiper les besoins de cash avant qu’ils ne deviennent urgents.'
      ],
      cta: 'Découvrir le forfait Excellence',
      href: '#excellence',
      upgrade: 'Ce niveau est adapté lorsque la trésorerie devient un véritable outil de décision.',
      upgradeHref: '#excellence'
    }
  };

  let currentIndex = 0;
  let answers = [];

  function updateProgress() {
    const number = Math.min(currentIndex + 1, questions.length);
    progressText.textContent = `Question ${number} sur ${questions.length}`;
    progressBar.style.width = `${(number / questions.length) * 100}%`;
    backButton.hidden = currentIndex === 0;
  }

  function showQuestion(index) {
    resultPanel.hidden = true;
    questions.forEach((question, i) => {
      question.hidden = i !== index;
    });
    currentIndex = index;
    updateProgress();
    questions[index].querySelector('button')?.focus({ preventScroll: true });
  }

  function calculateRecommendation() {
    // Règle : le besoin le plus avancé exprimé détermine la recommandation.
    // Chaque réponse porte un niveau de 1 à 4. Le maximum est retenu.
    return Math.max(1, ...answers.map(answer => Number(answer.level || 1)));
  }

  function renderResult() {
    questions.forEach(question => { question.hidden = true; });
    const level = calculateRecommendation();
    const plan = plans[level];

    resultPanel.querySelector('[data-result-name]').textContent = plan.name;
    resultPanel.querySelector('[data-result-promise]').textContent = plan.promise;
    resultPanel.querySelector('[data-result-price]').textContent = plan.price;
    resultPanel.querySelector('[data-result-explanation]').textContent = plan.explanation;

    const reasons = resultPanel.querySelector('[data-result-reasons]');
    reasons.innerHTML = plan.reasons.map(reason => `<li>${reason}</li>`).join('');

    const cta = resultPanel.querySelector('[data-result-cta]');
    cta.textContent = plan.cta;
    cta.href = plan.href;

    const upgrade = resultPanel.querySelector('[data-result-upgrade]');
    upgrade.textContent = plan.upgrade;
    upgrade.href = plan.upgradeHref;

    resultPanel.hidden = false;
    progressText.textContent = 'Votre recommandation';
    progressBar.style.width = '100%';
    backButton.hidden = false;

    root.dispatchEvent(new CustomEvent('mfinances:diagnostic-complete', {
      bubbles: true,
      detail: { level, plan: plan.key, answers }
    }));
  }

  root.addEventListener('click', event => {
    const answerButton = event.target.closest('[data-answer]');
    if (answerButton) {
      answers[currentIndex] = {
        question: currentIndex + 1,
        value: answerButton.dataset.value,
        level: Number(answerButton.dataset.level)
      };

      if (currentIndex < questions.length - 1) {
        showQuestion(currentIndex + 1);
      } else {
        renderResult();
      }
      return;
    }

    if (event.target.closest('[data-back]')) {
      if (!resultPanel.hidden) {
        showQuestion(questions.length - 1);
      } else if (currentIndex > 0) {
        showQuestion(currentIndex - 1);
      }
      return;
    }

    if (event.target.closest('[data-restart]')) {
      answers = [];
      showQuestion(0);
    }
  });

  showQuestion(0);
})();
