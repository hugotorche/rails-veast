import { Controller } from '@hotwired/stimulus';
import Typed from 'typed.js';

export default class extends Controller {
  connect() {
    this.initTyped();
  }

  initTyped() {
    new Typed('.typed', {
      strings: [
        "<br/>" +
        "' skills: data science, finance, information systems<br/> ^100" +
        "' education: copenhagenbs, kedgebs, yale, openclassroom<br/> ^100" +
        "' references: ibm, chanel, acom audit, chimitec<br/> ^100" +
        "' languages: french, english, spanish, portuguese <br/>" +
        "' software: microsoft package, sap, jupyter, sublime text, postgres <br/>" +
        "' hobbies: tennis, mountains, running, juggling, reading<br/> ^300" +
        "' status: academic exchange abroad<br/> ^100"
      ],
      showCursor: true,
      cursorChar: '_',
      autoInsertCss: true,
      typeSpeed: 30, // Adjusted type speed
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
}
