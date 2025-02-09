// add classes for mobile navigation toggling
var CSbody = document.querySelector('body');
const CSnavbarMenu = document.querySelector('#cs-navigation');
const CShamburgerMenu = document.querySelector('#cs-navigation .cs-toggle');

CShamburgerMenu.addEventListener('click', function () {
	CShamburgerMenu.classList.toggle('cs-active');
	CSnavbarMenu.classList.toggle('cs-active');
	CSbody.classList.toggle('cs-open');
	// run the function to check the aria-expanded value
	ariaExpanded();
});

// checks the value of aria expanded on the cs-ul and changes it accordingly whether it is expanded or not
function ariaExpanded() {
	const csUL = document.querySelector('#cs-expanded');
	const csExpanded = csUL.getAttribute('aria-expanded');

	if (csExpanded === 'false') {
		csUL.setAttribute('aria-expanded', 'true');
	} else {
		csUL.setAttribute('aria-expanded', 'false');
	}
}

// mobile nav toggle code
const dropDowns = Array.from(document.querySelectorAll('#cs-navigation .cs-dropdown'));
for (const item of dropDowns) {
	const onClick = () => {
		item.classList.toggle('cs-active');
	};
	item.addEventListener('click', onClick);
}

function calculateAffordability() {
    // Get values from inputs
    const income = parseFloat(document.getElementById("income").value) || 0;
    const debts = parseFloat(document.getElementById("debts").value) || 0;
    const downPayment = parseFloat(document.getElementById("down-payment").value) || 0;
    const loanTerm = (parseInt(document.getElementById("loan-term").value) || 0) * 12;
    const interestRate = (parseFloat(document.getElementById("interest-rate").value) || 0) / 100 / 12;
    const propertyTaxRate = (parseFloat(document.getElementById("property-tax").value) || 0) / 100;
    const insurance = (parseFloat(document.getElementById("insurance").value) || 0) / 12;
    const hoaFee = parseFloat(document.getElementById("hoa-fee-input").value) || 0;


    // Check for invalid or zero values
    if (income <= 0 || loanTerm <= 0 || interestRate <= 0) {
        alert("Please provide valid input values for Income, Loan Term, and Interest Rate.");
        return;
    }

    // 28/36 Rule
    const maxMonthlyPayment = (income / 12) * 0.28;
    const monthlyDebtAllowance = (income / 12) * 0.36 - debts;
    const affordableMonthlyPayment = Math.min(maxMonthlyPayment, monthlyDebtAllowance);

    if (affordableMonthlyPayment <= 0) {
        alert("Your monthly affordability is too low based on the inputs.");
        return;
    }

    // Mortgage Calculation
    const monthlyPrincipalAndInterest = affordableMonthlyPayment - insurance - (downPayment * propertyTaxRate) / 12;
    const loanAmount = 
        (monthlyPrincipalAndInterest > 0 && interestRate > 0) 
        ? monthlyPrincipalAndInterest / (interestRate * Math.pow(1 + interestRate, loanTerm) / (Math.pow(1 + interestRate, loanTerm) - 1))
        : 0;
    const maxHomePrice = loanAmount + downPayment;
    const propertyTax = (maxHomePrice * propertyTaxRate) / 12;
    const monthlyExpenses = monthlyPrincipalAndInterest + propertyTax + insurance + hoaFee
	const estClosingCostTop = maxHomePrice * 0.05
	const estClosingCostBottom = maxHomePrice * 0.02

    // Update results
    document.getElementById("max-home-price").textContent = `$${maxHomePrice.toFixed(0)}`;
    document.getElementById("monthly-payment").textContent = `$${monthlyPrincipalAndInterest.toFixed(0)}`;
    document.getElementById("property-taxes").textContent = `$${propertyTax.toFixed(0)}`;
    document.getElementById("homeowners-insurance").textContent = `$${insurance.toFixed(0)}`;
    document.getElementById("hoa-fee").textContent = `$${hoaFee.toFixed(0)}`;
    document.getElementById("total").textContent = `$${monthlyExpenses.toFixed(0)}`;
	document.getElementById("top-closing-cost").textContent = `- $${estClosingCostTop.toFixed(0)}`;
	document.getElementById("bottom-closing-cost").textContent = `$${estClosingCostBottom.toFixed(0)} `;


}
