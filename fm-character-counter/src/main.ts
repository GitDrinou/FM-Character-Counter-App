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
`

//setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
