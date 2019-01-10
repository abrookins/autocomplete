class Autocomplete {
  constructor({
    searchFn,
    shouldAutoSelect = false,
    setValue = () => { },
    setAttribute = () => { },
    setInputAttribute = () => { },
    setSelectionRange = () => { },
    onUpdateResults = () => { },
    onSubmit = () => { }
  } = {}) {
    this.searchFn = searchFn
    this.shouldAutoSelect = shouldAutoSelect
    this.setValue = setValue
    this.setAttribute = setAttribute
    this.setInputAttribute = setInputAttribute
    this.setSelectionRange = setSelectionRange
    this.onUpdateResults = onUpdateResults
    this.onSubmit = onSubmit

    this.value = ''
    this.results = []
    this.selectedIndex = -1
  }

  handleInput = event => {
    const { value } = event.target
    this.updateResults(value)
    this.value = value
  }

  handleKeydown = event => {
    const { key } = event
    let selectedResult = this.results[this.selectedIndex]

    switch (key) {
      case 'ArrowUp':
      case 'ArrowDown':
        // Get new selected index and keep within bounds
        const resultsCount = this.results.length
        const selectedIndex = key === 'ArrowUp' ? this.selectedIndex - 1 : this.selectedIndex + 1
        this.selectedIndex = ((selectedIndex % resultsCount) + resultsCount) % resultsCount

        // Update results and aria attributes
        this.onUpdateResults(this.results, this.selectedIndex)
        selectedResult = this.results[this.selectedIndex]
        if (selectedResult) {
          this.setInputAttribute('aria-activedescendant', `autocomplete-result-${this.selectedIndex}`)
        } else {
          this.setInputAttribute('aria-activedescendant', '')
        }
        break

      case 'Tab':
        this.selectResult()
        break

      case 'Enter':
        this.selectResult()
        this.onSubmit(selectedResult)
        break

      case 'Escape':
        this.hideResults()
        this.setValue('')
        break

      default:
        return
    }
  }

  handleResultClick = event => {
    const { target } = event
    if (target && target.nodeName === 'LI') {
      this.selectedIndex = [...target.parentElement.children].indexOf(target)
      this.selectResult()
    }
  }

  selectResult = () => {
    const selectedResult = this.results[this.selectedIndex]
    if (selectedResult) {
      this.setValue(selectedResult)
      this.hideResults()
    }
  }

  updateResults = value => {
    this.results = this.searchFn(value)

    if (this.results.length === 0) {
      this.hideResults()
      return
    }

    if (this.shouldAutoSelect) {
      this.selectedIndex = 0
      this.setInputAttribute(
        'aria-activedescendant',
        `autocomplete-result-${this.selectedIndex}`
      )
    }

    this.onUpdateResults(this.results, this.selectedIndex)
    this.setAttribute('aria-expanded', true)
  }

  hideResults = () => {
    this.selectedIndex = -1
    this.results = []
    this.setAttribute('aria-expanded', false)
    this.setInputAttribute('aria-activedescendant', '')
    this.onUpdateResults(this.results, this.selectedIndex)
  }
}

export default Autocomplete