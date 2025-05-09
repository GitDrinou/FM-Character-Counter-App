import './style.css'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `

  <section>
    <form>
        <textarea placeholder="Start typing her... (or paste your text)" id="bloc-text"></textarea>
        <div id="bloc-settings">
            <fieldset>
                 <div>
                     <input type="checkbox" id="exclude-spaces" name="exclude-spaces">
                     <label for="exclude-spaces">Exclude Spaces</label>
                 </div>
                 <div>
                     <input type="checkbox" id="set-character-limit" name="set-character-limit">
                     <label for="set-character-limit">Set Character Limit</label>
                 </div>
             </fieldset>
             <p>Approx. reading time: 0 minute</p>
        </div>
    </form>
  </section>
  <section>
    <div id="counters">
        <p id="counter-character">
           <span>00</span>
            <span>Total Characters</span>
        </p>
        <p id="counter-word">
            <span>00</span>
            <span>Word Count</span>
        </p>
        <p id="counter-sentence">
            <span>00</span>
            <span>Sentence Count</span>
        </p>
    </div>
  </section>
  <section id="letter-density">
    <h2>Letter Density</h2>
    <p>No characters found. Start typing to see letter density.</p>
  </section>
`
