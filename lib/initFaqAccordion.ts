/** FAQ accordion behavior from legacy main.js / feature HTML pages */
export function initFaqAccordion(root: ParentNode): () => void {
  const cleanups: Array<() => void> = [];

  root.querySelectorAll<HTMLButtonElement>(".faq-toggle-btn").forEach((btn) => {
    const handler = () => {
      const content = btn.nextElementSibling as HTMLElement | null;
      const icon = btn.querySelector<HTMLElement>(".faq-icon");
      const isOpen = Boolean(content?.style.maxHeight && content.style.maxHeight !== "0px");

      const parent = btn.closest(".space-y-4") ?? btn.closest(".grid") ?? root;
      parent.querySelectorAll<HTMLElement>(".faq-content").forEach((item) => {
        item.style.maxHeight = "0px";
        const otherBtn = item.previousElementSibling;
        const otherIcon = otherBtn?.querySelector<HTMLElement>(".faq-icon");
        if (otherIcon) {
          otherIcon.style.transform = "rotate(0deg)";
          otherIcon.classList.remove("text-blue-600");
          otherIcon.classList.add("text-slate-400");
        }
        otherBtn?.classList.remove("text-blue-600");
      });

      if (!isOpen && content) {
        content.style.maxHeight = `${content.scrollHeight}px`;
        if (icon) {
          icon.style.transform = "rotate(180deg)";
          icon.classList.remove("text-slate-400");
          icon.classList.add("text-blue-600");
        }
        btn.classList.add("text-blue-600");
      } else if (content) {
        content.style.maxHeight = "0px";
        if (icon) {
          icon.style.transform = "rotate(0deg)";
          icon.classList.remove("text-blue-600");
          icon.classList.add("text-slate-400");
        }
        btn.classList.remove("text-blue-600");
      }
    };

    btn.addEventListener("click", handler);
    cleanups.push(() => btn.removeEventListener("click", handler));
  });

  return () => cleanups.forEach((cleanup) => cleanup());
}
