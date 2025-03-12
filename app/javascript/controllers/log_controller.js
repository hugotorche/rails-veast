import { Controller } from '@hotwired/stimulus';
import Typed from "typed.js";

export default class extends Controller {
  connect() {
    this.initTyped();
  }

  initTyped() {
    new Typed('.typed', {
      strings: [
        "2025-03-12<br/>" +
        "><span class='caret'>$</span> job: Friendly Neighborhood Spider-Man<br/>" +
        "><span class='caret'>$</span> skills: combat spider, villain slayer<br/>" +
        "><span class='caret'>$</span> hobbies: star-gazer, universe whisperer, mountain-biker<br/>" +
        "><span class='caret'>$</span> alias: spiderman<br/>" +
        "><span class='caret'>$</span> universe: found traces in every universe<br/>" +
        "<form>><span class='caret'>$</span><input type='text' name='response'/></form>"
      ],
      showCursor: false,
      cursorChar: '_',
      autoInsertCss: true,
      typeSpeed: 0.1,
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
