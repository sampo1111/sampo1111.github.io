(() => {
  const REF_PATTERN = /\(([A-Za-z]?\d+(?:\.\d+)*)\)/g;
  const TAG_PATTERN = /^\(?([A-Za-z]?\d+(?:\.\d+)*)\)?$/;
  const SKIP_SELECTOR = [
    'a',
    'code',
    'kbd',
    'mjx-container',
    'pre',
    'samp',
    'script',
    'style',
    '.eq-ref',
    '.eq-preview-popover'
  ].join(',');

  let activeRef = null;
  let popover = null;

  const cleanText = (text) => text.replace(/\s+/g, '');

  const getEquationTag = (container) => {
    const textNodes = container.querySelectorAll('mjx-mtext, mtext');

    for (const node of textNodes) {
      const match = cleanText(node.textContent).match(TAG_PATTERN);

      if (match) {
        return match[1];
      }
    }

    const fullText = cleanText(container.textContent);
    const match = fullText.match(/\(([A-Za-z]?\d+(?:\.\d+)*)\)$/);

    return match ? match[1] : null;
  };

  const removeIds = (element) => {
    element.removeAttribute('id');
    element.querySelectorAll('[id]').forEach((node) => node.removeAttribute('id'));
  };

  const getPopover = () => {
    if (popover) {
      return popover;
    }

    popover = document.createElement('div');
    popover.className = 'eq-preview-popover';
    popover.setAttribute('role', 'tooltip');
    popover.hidden = true;
    document.body.appendChild(popover);

    return popover;
  };

  const positionPopover = () => {
    if (!activeRef || !popover || popover.hidden) {
      return;
    }

    const margin = 12;
    const gap = 10;
    const refRect = activeRef.getBoundingClientRect();
    const popoverRect = popover.getBoundingClientRect();

    let top = refRect.top - popoverRect.height - gap;

    if (top < margin) {
      top = refRect.bottom + gap;
    }

    let left = refRect.left + refRect.width / 2 - popoverRect.width / 2;
    left = Math.max(margin, Math.min(left, window.innerWidth - popoverRect.width - margin));

    popover.style.top = `${top}px`;
    popover.style.left = `${left}px`;
  };

  const showPopover = (ref, equations) => {
    const equation = equations.get(ref.dataset.eqTag);

    if (!equation) {
      return;
    }

    const preview = getPopover();
    const clone = equation.cloneNode(true);

    removeIds(clone);
    preview.replaceChildren(clone);
    preview.hidden = false;
    activeRef = ref;

    requestAnimationFrame(positionPopover);
  };

  const hidePopover = () => {
    if (!popover) {
      return;
    }

    popover.hidden = true;
    popover.replaceChildren();
    activeRef = null;
  };

  const wrapReferences = (content, equations) => {
    const walker = document.createTreeWalker(content, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        const parent = node.parentElement;

        if (!parent || parent.closest(SKIP_SELECTOR)) {
          return NodeFilter.FILTER_REJECT;
        }

        REF_PATTERN.lastIndex = 0;
        return REF_PATTERN.test(node.textContent) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      }
    });

    const textNodes = [];
    let node = walker.nextNode();

    while (node) {
      textNodes.push(node);
      node = walker.nextNode();
    }

    textNodes.forEach((textNode) => {
      const text = textNode.textContent;
      const fragment = document.createDocumentFragment();
      let lastIndex = 0;
      let hasReplacement = false;
      let match;

      REF_PATTERN.lastIndex = 0;

      while ((match = REF_PATTERN.exec(text)) !== null) {
        const [label, tag] = match;

        if (!equations.has(tag)) {
          continue;
        }

        fragment.append(document.createTextNode(text.slice(lastIndex, match.index)));

        const ref = document.createElement('span');
        ref.className = 'eq-ref';
        ref.dataset.eqTag = tag;
        ref.tabIndex = 0;
        ref.setAttribute('role', 'button');
        ref.setAttribute('aria-label', `${tag} equation preview`);
        ref.textContent = label;

        fragment.append(ref);
        lastIndex = match.index + label.length;
        hasReplacement = true;
      }

      if (!hasReplacement) {
        return;
      }

      fragment.append(document.createTextNode(text.slice(lastIndex)));
      textNode.replaceWith(fragment);
    });
  };

  const initEquationTooltips = () => {
    const content = document.querySelector('article .content');

    if (!content || content.dataset.eqTooltipsReady === 'true') {
      return;
    }

    const equations = new Map();

    content.querySelectorAll('mjx-container[display="true"]').forEach((container) => {
      const tag = getEquationTag(container);

      if (tag && !equations.has(tag)) {
        equations.set(tag, container);
      }
    });

    if (equations.size === 0) {
      return;
    }

    wrapReferences(content, equations);

    content.addEventListener('mouseenter', (event) => {
      const ref = event.target.closest('.eq-ref');

      if (ref) {
        showPopover(ref, equations);
      }
    }, true);

    content.addEventListener('mouseleave', (event) => {
      if (event.target.closest('.eq-ref')) {
        hidePopover();
      }
    }, true);

    content.addEventListener('focusin', (event) => {
      const ref = event.target.closest('.eq-ref');

      if (ref) {
        showPopover(ref, equations);
      }
    });

    content.addEventListener('focusout', (event) => {
      if (event.target.closest('.eq-ref')) {
        hidePopover();
      }
    });

    window.addEventListener('scroll', positionPopover, { passive: true });
    window.addEventListener('resize', positionPopover);

    content.dataset.eqTooltipsReady = 'true';
  };

  const waitForMathJax = (attempt = 0) => {
    if (window.MathJax?.startup?.promise) {
      window.MathJax.startup.promise.then(initEquationTooltips);
      return;
    }

    if (attempt < 80) {
      window.setTimeout(() => waitForMathJax(attempt + 1), 100);
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => waitForMathJax());
  } else {
    waitForMathJax();
  }
})();
