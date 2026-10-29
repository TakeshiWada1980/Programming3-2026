(() => {
  "use strict";

  function setupNavigation() {
    const openButton = document.querySelector(".openbtn");
    const navPanel = document.getElementById("g-nav");
    if (!openButton || !navPanel) return;

    function setOpen(isOpen) {
      openButton.classList.toggle("active", isOpen);
      navPanel.classList.toggle("panelactive", isOpen);
      openButton.setAttribute("aria-expanded", String(isOpen));
      openButton.setAttribute("aria-label", isOpen ? "目次を閉じる" : "目次を開く");
      navPanel.setAttribute("aria-hidden", String(!isOpen));
      document.body.classList.toggle("nav-open", isOpen);
    }

    openButton.addEventListener("click", () => {
      setOpen(openButton.getAttribute("aria-expanded") !== "true");
    });

    navPanel.querySelectorAll("a").forEach((item) => {
      item.addEventListener("click", () => setOpen(false));
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && openButton.getAttribute("aria-expanded") === "true") {
        setOpen(false);
        openButton.focus();
      }
    });
  }

  function setupMasks() {
    document.querySelectorAll("span.masked").forEach((span) => {
      span.setAttribute("role", "button");
      span.setAttribute("tabindex", "0");
      span.setAttribute("aria-pressed", String(span.classList.contains("open")));
      span.setAttribute("title", "クリックまたはEnterキーで表示を切り替えます");

      const toggle = () => {
        const isOpen = span.classList.toggle("open");
        span.setAttribute("aria-pressed", String(isOpen));
      };

      span.addEventListener("click", toggle);
      span.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          toggle();
        }
      });
    });
  }

  function updateBalloonFrame(body) {
    const svg = body.querySelector(":scope > .balloon-frame");
    const path = body.querySelector(":scope > .balloon-frame .balloon-frame-shape");
    if (!svg || !path) return;

    const rect = body.getBoundingClientRect();
    const style = getComputedStyle(body);
    const width = Math.max(1, Math.ceil(rect.width));
    const height = Math.max(1, Math.ceil(rect.height));

    const stroke = parseFloat(style.getPropertyValue("--balloon-stroke-width")) || 2;
    const radius = parseFloat(style.getPropertyValue("--balloon-radius")) || 18;
    const tailWidth = parseFloat(style.getPropertyValue("--balloon-tail-width")) || 26;
    const tailTop = parseFloat(style.getPropertyValue("--balloon-tail-top")) || 18;
    const tailBase = parseFloat(style.getPropertyValue("--balloon-tail-base")) || 20;
    const tailTipInset =
      parseFloat(style.getPropertyValue("--balloon-tail-tip-inset")) || 3;
    const halfStroke = stroke * 0.5;
    const left = tailWidth + halfStroke;
    const top = halfStroke;
    const right = width - halfStroke;
    const bottom = height - halfStroke;
    const safeRadius = Math.min(radius, (right - left) * 0.5, (bottom - top) * 0.5);
    const baseTop = Math.max(
      top + safeRadius + 4,
      Math.min(bottom - safeRadius - tailBase - 4, tailTop),
    );
    const baseBottom = Math.min(bottom - safeRadius - 4, baseTop + tailBase);
    const tipX = Math.max(halfStroke, tailTipInset);
    const tipY = (baseTop + baseBottom) * 0.5;
    const pathData = [
      "M",
      left + safeRadius,
      top,
      "H",
      right - safeRadius,
      "A",
      safeRadius,
      safeRadius,
      0,
      0,
      1,
      right,
      top + safeRadius,
      "V",
      bottom - safeRadius,
      "A",
      safeRadius,
      safeRadius,
      0,
      0,
      1,
      right - safeRadius,
      bottom,
      "H",
      left + safeRadius,
      "A",
      safeRadius,
      safeRadius,
      0,
      0,
      1,
      left,
      bottom - safeRadius,
      "V",
      baseBottom,
      "L",
      tipX,
      tipY,
      "L",
      left,
      baseTop,
      "V",
      top + safeRadius,
      "A",
      safeRadius,
      safeRadius,
      0,
      0,
      1,
      left + safeRadius,
      top,
      "Z",
    ].join(" ");

    svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
    path.setAttribute("d", pathData);
  }

  function setupBalloons() {
    document.querySelectorAll("div.balloon").forEach((div) => {
      if (div.querySelector(":scope > .balloon-body")) return;

      const hasContent = Array.from(div.childNodes).some(
        (node) => node.nodeType !== Node.TEXT_NODE || node.textContent.trim() !== "",
      );
      if (!hasContent) return;

      const classNames = Array.from(div.classList);
      const charClass = classNames.find((name) => /^char-\d\d$/.test(name));
      const faceClass = classNames.find((name) => /^face-\d\d$/.test(name));
      const contentNodes = Array.from(div.childNodes);

      const body = document.createElement("div");
      body.className = "balloon-body";

      const frame = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      frame.setAttribute("aria-hidden", "true");
      frame.classList.add("balloon-frame");

      const framePath = document.createElementNS("http://www.w3.org/2000/svg", "path");
      framePath.classList.add("balloon-frame-shape");
      frame.appendChild(framePath);

      const bubble = document.createElement("div");
      bubble.className = "balloon-bubble";

      const content = document.createElement("div");
      content.className = "balloon-content";
      contentNodes.forEach((node) => content.appendChild(node));

      bubble.appendChild(content);
      body.appendChild(frame);
      body.appendChild(bubble);

      if (charClass && faceClass) {
        const figure = document.createElement("div");
        figure.className = "balloon-figure";

        const avatar = document.createElement("div");
        avatar.className = "balloon-avatar";

        const image = document.createElement("img");
        const avatarBasePath = `figs/balloon/${charClass}/${faceClass}`;
        let triedGifAvatar = false;
        image.src = `${avatarBasePath}.png`;
        image.alt = "";
        image.loading = "lazy";
        image.decoding = "async";
        image.addEventListener("error", () => {
          if (!triedGifAvatar) {
            triedGifAvatar = true;
            image.src = `${avatarBasePath}.gif`;
            return;
          }

          div.classList.add("balloon-no-avatar");
          figure.remove();
        });

        avatar.appendChild(image);
        figure.appendChild(avatar);
        div.appendChild(figure);
      } else {
        div.classList.add("balloon-no-avatar");
      }

      div.appendChild(body);
      updateBalloonFrame(body);

      if (window.ResizeObserver) {
        const observer = new ResizeObserver(() => updateBalloonFrame(body));
        observer.observe(body);
      }
    });
  }

  function setupPrompts() {
    const services = [
      {
        name: "ChatGPT",
        url: "https://chatgpt.com/",
        icon: '<i class="fa-brands fa-openai" aria-hidden="true"></i>',
      },
      {
        name: "Claude",
        url: "https://claude.ai/",
        icon: '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M12 2v20M2 12h20M5 5l14 14M5 19L19 5M8 3l8 18M3 8l18 8M3 16l18-8M8 21l8-18"/></svg>',
      },
      {
        name: "Gemini",
        url: "https://gemini.google.com/",
        icon: '<svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="M12 1C11 8 8 11 1 12c7 1 10 4 11 11 1-7 4-10 11-11C16 11 13 8 12 1Z"/></svg>',
      },
    ];

    document.querySelectorAll("div.prompts").forEach((group) => {
      if (group.querySelector(":scope > .prompt-heading")) return;
      const items = group.querySelectorAll(":scope > ul > li");
      if (!items.length) return;

      const heading = document.createElement("div");
      heading.className = "prompt-heading";
      const title = document.createElement("strong");
      title.className = "prompt-title";
      title.innerHTML = '<i class="fa-solid fa-comment-dots fa-flip-horizontal" aria-hidden="true"></i>プロンプト例';
      const status = document.createElement("span");
      status.className = "prompt-status";
      status.setAttribute("role", "status");
      status.setAttribute("aria-atomic", "true");
      const links = document.createElement("div");
      links.className = "prompt-links";
      services.forEach((service) => {
        const link = document.createElement("a");
        link.className = `prompt-ai-link prompt-ai-${service.name.toLowerCase()}`;
        link.href = service.url;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.title = `新しいタブで ${service.name} を開く`;
        link.setAttribute("aria-label", link.title);
        link.innerHTML = service.icon;
        links.appendChild(link);
      });
      heading.append(title, links, status);
      group.prepend(heading);
      let statusTimer;

      items.forEach((item) => {
        item.classList.add("prompt-item");
        const copy = document.createElement("div");
        copy.className = "prompt-copy";
        copy.setAttribute("role", "button");
        copy.tabIndex = 0;
        copy.title = "このプロンプトをコピー";
        const text = document.createElement("div");
        text.className = "prompt-text";
        text.append(...Array.from(item.childNodes));
        const indicator = document.createElement("span");
        indicator.className = "prompt-copy-icon";
        indicator.setAttribute("aria-hidden", "true");
        indicator.innerHTML = '<i class="fa-regular fa-copy" aria-hidden="true"></i>';
        copy.append(text, indicator);

        let indicatorTimer;
        const copyPrompt = async () => {
          const value = text.innerText.replace(/\r\n/g, "\n").trim();
          window.clearTimeout(statusTimer);
          window.clearTimeout(indicatorTimer);
          try {
            await navigator.clipboard.writeText(value);
            indicator.innerHTML = '<i class="fa-solid fa-check" aria-hidden="true"></i>';
            status.textContent = "コピーしました";
          } catch (error) {
            indicator.innerHTML = '<i class="fa-solid fa-exclamation" aria-hidden="true"></i>';
            status.textContent = "コピーできませんでした。本文を選択してコピーしてください。";
            console.error("プロンプトをコピーできませんでした。", error);
          }
          indicatorTimer = window.setTimeout(() => {
            indicator.innerHTML = '<i class="fa-regular fa-copy" aria-hidden="true"></i>';
          }, 2000);
          statusTimer = window.setTimeout(() => { status.textContent = ""; }, 6000);
        };

        copy.addEventListener("click", (event) => {
          // 本文中のリンクやコードのコピーボタン、文字の選択操作は妨げない。
          // 子のボタンがアイコンを差し替えても、元のイベント経路で判定する。
          if (event.composedPath().some((node) =>
            node instanceof Element && node.matches("a, button, input, textarea, select"),
          )) return;
          if (!window.getSelection().isCollapsed) return;
          copyPrompt();
        });
        copy.addEventListener("keydown", (event) => {
          if (event.target !== copy || (event.key !== "Enter" && event.key !== " ")) return;
          event.preventDefault();
          copyPrompt();
        });

        item.append(copy);
      });
    });
  }

  function setupCodeBlocks() {
    document.querySelectorAll("div.sourceCode").forEach((div) => {
      if (div.hasAttribute("data-caption") && !div.querySelector(":scope > .code-caption")) {
        const caption = document.createElement("div");
        caption.className = "code-caption";
        caption.textContent = div.getAttribute("data-caption");
        div.prepend(caption);
      }

      const startFrom = Number.parseInt(div.getAttribute("data-startfrom"), 10);
      if (Number.isFinite(startFrom)) {
        div.style.counterReset = `pg-line ${startFrom - 1}`;
      }

      if (div.querySelector(":scope > .copy-btn")) return;

      const button = document.createElement("button");
      button.type = "button";
      button.className = "copy-btn";
      button.title = "コードをコピー";
      button.setAttribute("aria-label", "コードをコピー");
      button.innerHTML = '<i class="fa-regular fa-copy" aria-hidden="true"></i>';

      button.addEventListener("click", async () => {
        const codeElement = div.querySelector("code");
        if (!codeElement) return;

        try {
          await navigator.clipboard.writeText(codeElement.innerText);
          button.innerHTML = '<i class="fa-solid fa-check" aria-hidden="true"></i>';
          button.setAttribute("aria-label", "コピーしました");
          window.setTimeout(() => {
            button.innerHTML = '<i class="fa-regular fa-copy" aria-hidden="true"></i>';
            button.setAttribute("aria-label", "コードをコピー");
          }, 1500);
        } catch (error) {
          console.error("コードをコピーできませんでした。", error);
          button.setAttribute("aria-label", "コピーできませんでした");
        }
      });

      div.appendChild(button);
    });
  }

  setupNavigation();
  setupMasks();
  setupBalloons();
  setupPrompts();
  setupCodeBlocks();
})();
