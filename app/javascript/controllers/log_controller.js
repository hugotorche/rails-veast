import { Controller } from '@hotwired/stimulus';
import Typed from "typed.js";
import Sortable from "sortablejs"; 

export default class extends Controller {
  static targets = ["terminal"];

  connect() {
    this.InitTyped();
    this.LogTyped();
    this.makeTerminalDraggable();
    this.makeTerminalsSortable();
  }

  InitTyped() {
    new Typed('.typed', {
      strings: [
        "Enchanté!<br/>" +
        "><span class='caret'>$</span> Lately I grew an interest in Ruby on Rails and Geographical objects<br/>" +
        "><span class='caret'>$</span> If I was a hiring manager I would ask for a map instead of a resume<br/>" +
        "><span class='caret'>$</span> Mine is in Imap section but where is yours?<br/>" +
        "><span class='caret'>$</span> First you have to log in into the app with a username and a password<br/>" +
        "><span class='caret'>$</span> Then you can add points to draw your map and showcase your pathway<br/>" +
        "><span class='caret'>$</span> If I could only keep one thing about life I think it would be travel<br/>" +
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

  LogTyped() {
    const userElement = document.getElementById('current-user');
    const userEmail = userElement.dataset.userEmail;
    new Typed('.logtyped', {
      strings: [
        "2025-03-24<br/>" +
        "><span class='caret'>$</span> " + userEmail + " It was hard to find a username but I thing Hubato fits<br/>" +
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
    const terminalContainer = this.terminalTarget; // Use terminalContainer instead
    const handle = terminalContainer.querySelector(".draggable-handle");
  
    if (!handle) {
      console.error("Draggable handle not found!"); // Debugging log
      return;
    }
  
    let offsetX, offsetY;
  
    handle.addEventListener('mousedown', startDrag);
    document.addEventListener('mouseup', stopDrag);
  
    function startDrag(e) {
      e.preventDefault();
      offsetX = e.clientX - terminalContainer.offsetLeft;
      offsetY = e.clientY - terminalContainer.offsetTop;
      document.addEventListener('mousemove', drag);
    }
  
    function drag(e) {
      e.preventDefault();
      const x = e.clientX - offsetX;
      const y = e.clientY - offsetY;
  
      // Prevent moving outside the viewport
      const maxX = window.innerWidth - terminalContainer.offsetWidth;
      const maxY = window.innerHeight - terminalContainer.offsetHeight;
      const minX = 0;
      const minY = 0;
  
      const newX = Math.min(Math.max(x, minX), maxX);
      const newY = Math.min(Math.max(y, minY), maxY);
  
      terminalContainer.style.left = `${newX}px`;
      terminalContainer.style.top = `${newY}px`;
      terminalContainer.style.position = 'absolute'; // Ensure absolute positioning
    }
  
    function stopDrag() {
      document.removeEventListener('mousemove', drag);
    }
  }

  makeTerminalsSortable() {
    const terminalsContainer = document.getElementById('terminal');
    Sortable.create(terminalsContainer, {
      handle: '.draggable-handle',
      animation: 150,
    });
  }
}
