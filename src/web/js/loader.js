export default function createSpinner(parentDIV) {
    const containerInner1 = document.getElementById(parentDIV)

    const spinnerDiv = document.createElement('div')
    spinnerDiv.className = 'spinner'

    for (let i = 0; i < 12; i++) {
        const spinnerBladeDiv = document.createElement('div')
        spinnerBladeDiv.className = 'spinner-blade'
        spinnerDiv.appendChild(spinnerBladeDiv)
    }

    containerInner1.appendChild(spinnerDiv)
}

export function removeSpinner(parentDIV) {
    const containerInner1 = document.getElementById(parentDIV)
    const spinnerDiv = containerInner1.querySelector('.spinner')

    if (spinnerDiv) {
        containerInner1.removeChild(spinnerDiv)
    }
}
