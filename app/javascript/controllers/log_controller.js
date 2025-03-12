import { Controller } from '@hotwired/stimulus';
import Typed from "typed.js";

export default class extends Controller {
  static targets = ["terminal"];

  connect() {
    this.initTyped();
    this.makeTerminalDraggable();
  }

  initTyped() {
    new Typed('.typed', {
      strings: [
        "2025-03-12<br/>" +
        "><span class='caret'>$</span> It was hard to find a username but I thing Hubato fits<br/>" +
        "><span class='caret'>$</span> I recently grew an interest in mapping objects<br/>" +
        "><span class='caret'>$</span> I also had a backlog project to discover ruby and rails applications<br/>" +
        "><span class='caret'>$</span> It is a great occasion for a fresh review of my portfolio<br/>" +
        "><span class='caret'>$</span> This time I won't plan a 3rd version but if I do I will log<br/>" +
        "<form>><span class='caret'>$</span><input type='text' name='response'/></form>"
      ],
      showCursor: false,
      cursorChar: '_',
      autoInsertCss: true,
      typeSpeed: 10,
      startDelay: 50,
      loop: false,
      onStart: () => $('.message form').hide(),
      onStop: () => $('.message form').show(),
      onTypingResumed: () => $('.message form').hide(),
      onTypingPaused: () => $('.message form').show(),
      onComplete: () => $('.message form').show(),
      onStringTyped: (pos, self) => {$('.message form').show();}
    });
    $('.message form').hide();
  };

  makeTerminalDraggable() {
    const terminal = this.terminalTarget;
    const handle = terminal.querySelector(".draggable-handle");

    if (!handle) {
      console.error("Draggable handle not found!"); // Debugging log
      return;
    }

    let offsetX = 0, offsetY = 0, isDragging = false;

    handle.addEventListener("mousedown", (e) => {
      console.log("Drag started"); // Debugging log
      isDragging = true;
      offsetX = e.clientX - terminal.offsetLeft;
      offsetY = e.clientY - terminal.offsetTop;
      handle.classList.add("dragging");
    });

    document.addEventListener("mousemove", (e) => {
      if (isDragging) {
        const x = e.clientX - offsetX;
        const y = e.clientY - offsetY;

        terminal.style.left = `${x}px`;
        terminal.style.top = `${y}px`;
      }
    });

    document.addEventListener("mouseup", () => {
      if (isDragging) {
        console.log("Drag stopped"); // Debugging log
      }
      isDragging = false;
      handle.classList.remove("dragging");
    });
  }
}
