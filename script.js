var income_value;
var expense_value;

var ExpensesClass = function(description, value)
{
    this.description = description;
    this.value = value;
}

var IncomeClass = function (description, value)
{
    this.description = description;
    this.value = value;
}

function loadFunction()
{
    income_value = 0;
    expense_value = 0;

    let budget_value_tag = document.querySelector('#budget_value');
    let income_value_tag = document.querySelector('#income_value');
    let expense_value_tag = document.querySelector('#expense_value');
    let expense_percentage_tag = document.querySelector('#expense_percentage');

    [budget_value_tag, income_value_tag, expense_value_tag, expense_percentage_tag].forEach(element => element.innerHTML= 0);

    var form = document.querySelector('#budget-form');
    form.addEventListener('submit', formSubmitted);
}

function formSubmitted(event)
{
    event.preventDefault();
    var form = document.querySelector('#budget-form');
    const formData = new FormData(form);
    const description = formData.get('description').trim();
    var value = formData.get('value');
    value = parseFloat(value);
    const selection = formData.get('selectionAS');
    clearInputFields();
    if(selection == "inc")
    {
        calculateIncome(value);
        showIncome(description, value);
        updateIncome();
        updateBudget();
        updateExpensePercentage();
        updateExpenseElements();
    }
    else if(selection == "exp")
    {
        calculateExpenses(value);
        showExpenses(description, value);
        updateExpenses();
        updateExpensePercentage();
        updateBudget();
    }
}

function clearInputFields()
{
    document.querySelector('#description').value = "";
    document.querySelector('#number').value = "";
}

function calculateIncome(value)
{
    income_value += value;
}

function updateIncome()
{
    document.querySelector('#income_value').innerHTML = '+' + income_value;
}

function updateBudget()
{
    let budget_value = income_value - expense_value;
    let sign = '';
    if (budget_value >= 0)
    {
        sign = '+';
    }
    document.querySelector('#budget_value').innerHTML = sign + budget_value;
}

function getIncomeInstance(description, value)
{
    const incomeInstance = new IncomeClass(description, value);
    return incomeInstance;
}

function deleteIncomeClicked()
{
    const outer_div = this.parentNode;
    const income_element = outer_div.parentNode;
    const value = income_element.object.value;

    income_element.remove();
    income_value -= value;
    updateIncome();
    updateBudget();
    updateExpensePercentage();
    updateExpenseElements();
}

function showIncome(description, value)
{
    const incomeInstance = getIncomeInstance(description, value);

    const income_section = document.querySelector('.income-section');

    const income_element_tag = document.createElement('div');
    income_element_tag.classList.add('income-element');
    income_element_tag.object = incomeInstance;

    const income_element_name_tag = document.createElement('div');
    income_element_name_tag.classList.add('income-element-name');
    income_element_name_tag.innerHTML = description;

    const outer_div_tag = document.createElement('div');
    outer_div_tag.classList.add('outer-div');
    const income_element_money_tag = document.createElement('div');
    income_element_money_tag.classList.add('income-element-money');
    income_element_money_tag.innerHTML = '+' + value;

    const i_tag = document.createElement('i');
    i_tag.classList.add('far');
    i_tag.classList.add('fa-trash-alt');
    i_tag.addEventListener('click', deleteIncomeClicked);

    outer_div_tag.appendChild(income_element_money_tag);
    outer_div_tag.appendChild(i_tag);

    const hr_tag = document.createElement('hr');

    income_element_tag.appendChild(income_element_name_tag);
    income_element_tag.appendChild(outer_div_tag);
    income_element_tag.appendChild(hr_tag);

    income_section.appendChild(income_element_tag);
}


function calculateExpenses(value)
{
    expense_value += value;
}

function updateExpenses()
{
    document.querySelector('#expense_value').innerHTML = '-' + expense_value;
}

function updateExpensePercentage()
{
    let percentage = (expense_value / income_value) * 100;
    if (percentage == Infinity)
    {
        percentage = '..';
    }
    else
    {
        percentage = Math.floor(percentage) + "%";
    }
    document.querySelector('#expense_percentage').innerHTML = percentage;
}

function generateExpenseItemPercentage(value)
{
    let percentage = (value / income_value) * 100;
    if (percentage == Infinity)
    {
        percentage = "..";
    }
    else 
    {
        percentage = Math.floor(percentage) + "%";
    }
    return percentage;
}

function getExpensesInstance(description, value)
{
    const expensesInstances= new IncomeClass(description, value);
    return expensesInstances;
}

function updateExpenseElements()
{
    const expenses_elements = document.querySelectorAll('.expenses-element');
    expenses_elements.forEach((expenses_element) => {
        const money_expense_percentage = expenses_element.querySelector('.money-expense-percentage');
        const value = expenses_element.object.value;
        money_expense_percentage.innerHTML = generateExpenseItemPercentage(value);
    });
}

function expenseDeleteClicked(event)
{
    const expenses_element_money = this.parentNode;
    const outer_div = expenses_element_money.parentNode;
    const expenses_element = outer_div.parentNode;
    const value = expenses_element.object.value;

    expense_value -= value;
    expenses_element.remove();
    updateBudget();
    updateExpenses();
    updateExpensePercentage();
}

function showExpenses(description, value)
{
    const expensesInstances = getExpensesInstance(description, value);

    const expenses_section_tag = document.querySelector('.expenses-section');
    
    const expenses_element_tag = document.createElement('div');
    expenses_element_tag.classList.add('expenses-element');
    expenses_element_tag.object = expensesInstances;

    const expenses_element_name_tag = document.createElement('div');
    expenses_element_name_tag.classList.add('expenses-element-name');
    expenses_element_name_tag.innerHTML= description;

    const outer_div_tag = document.createElement('div');
    outer_div_tag.classList.add('outer-div');

    const expenses_element_money_tag = document.createElement('div');
    expenses_element_money_tag.classList.add('expenses-element-money');

    const expenses_percentage_tag = document.createElement('div');
    expenses_percentage_tag.classList.add('expenses-percentage');

    const money_expense_tag = document.createElement('div');
    money_expense_tag.classList.add('money-expense');
    money_expense_tag.classList.add('mr-4');
    money_expense_tag.innerHTML= '-' + value;

    const money_expense_percentage_tag = document.createElement('div');
    money_expense_percentage_tag.classList.add('money-expense-percentage');
    money_expense_percentage_tag.innerHTML = generateExpenseItemPercentage(value);

    expenses_percentage_tag.appendChild(money_expense_tag);
    expenses_percentage_tag.appendChild(money_expense_percentage_tag);

    const i_tag = document.createElement('i');
    i_tag.classList.add('far');
    i_tag.classList.add('fa-trash-alt');
    i_tag.addEventListener('click', expenseDeleteClicked);

    expenses_element_money_tag.appendChild(expenses_percentage_tag);
    expenses_element_money_tag.appendChild(i_tag);

    outer_div_tag.appendChild(expenses_element_money_tag);
    const hr_tag = document.createElement('hr');

    expenses_element_tag.appendChild(expenses_element_name_tag);
    expenses_element_tag.appendChild(outer_div_tag);
    expenses_element_tag.appendChild(hr_tag);

    expenses_section_tag.appendChild(expenses_element_tag);
}

window.onload = loadFunction;