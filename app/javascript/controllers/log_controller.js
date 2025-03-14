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
      typeSpeed: 50,
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
  
    let offsetX, offsetY;
  
    handle.addEventListener('mousedown', startDrag);
    document.addEventListener('mouseup', stopDrag);
  
    function startDrag(e) {
      e.preventDefault();
      offsetX = e.clientX - terminal.offsetLeft;
      offsetY = e.clientY - terminal.offsetTop;
      document.addEventListener('mousemove', drag);
    }
  
    function drag(e) {
      e.preventDefault();
      const x = e.clientX - offsetX;
      const y = e.clientY - offsetY;
  
      // Prevent moving outside the viewport
      const maxX = window.innerWidth - terminal.offsetWidth;
      const maxY = window.innerHeight - terminal.offsetHeight;
      const minX = 0;
      const minY = 0;
  
      const newX = Math.min(Math.max(x, minX), maxX);
      const newY = Math.min(Math.max(y, minY), maxY);
  
      terminal.style.left = `${newX}px`;
      terminal.style.top = `${newY}px`;
    }
  
    function stopDrag() {
      document.removeEventListener('mousemove', drag);
    }
  }
}
