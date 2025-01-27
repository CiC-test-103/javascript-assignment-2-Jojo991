// 🏦 Bank and Account System 
// Bank Class: Manages multiple accounts
class Bank {
    constructor() {
        this.accounts = []; // Stores all accounts in the bank
    }

    // Method to create a new account
    createAccount(name, initialDeposit) {
        const newAccount = new Account(name, initialDeposit);
        this.accounts.push(newAccount);
        return newAccount;
    }

}

// Account Class: Represents a single user's account
class Account {
    constructor(name, balance = 0) {
        this.name = name; // Account holder's name
        this.balance = balance; // Initial balance (default is 0)
        this.transactionHistory = []; // Keeps a record of all transactions
    }

    // Method to deposit money
    deposit(amount) {
        if (amount > 0) {
            this.balance += amount;
            this.transactionHistory.push({ transactionType: 'Deposit', amount });
        } else {
            console.log('Deposit amount must be positive');
        }
    }

    // Method to withdraw money
    withdraw(amount) {
        if (amount > 0 && amount <= this.balance) {
            this.balance -= amount;
            this.transactionHistory.push({ transactionType: 'Withdrawal', amount });
        } else {
            console.log('Invalid withdrawal amount');
        }
    }

    // Method to transfer money to another account
    transfer(amount, recipientAccount) {
        if (amount > 0 && amount <= this.balance) {
            this.withdraw(amount); // Withdraw from sender's account
            recipientAccount.deposit(amount); // Deposit to recipient's account
            this.transactionHistory.push({ transactionType: 'Transfer', amount, to: recipientAccount.name });
            recipientAccount.transactionHistory.push({ transactionType: 'Received', amount, from: this.name });
        } else {
            console.log('Invalid transfer amount');
        }
    }

    // Method to check the account balance
    checkBalance() {
        return this.balance;
    }
}

//<-------------------------------DO NOT WRITE BELOW THIS LINE------------------------------>

// Function to test bank operations
function testBankOperations() {
    const bank = new Bank();

    // Create new accounts
    const johnAccount = bank.createAccount('John Doe', 1000);
    const janeAccount = bank.createAccount('Jane Doe', 500);
    console.log('Accounts created:', johnAccount, janeAccount);

    // Perform some operations on John's account
    johnAccount.deposit(500);
    johnAccount.withdraw(200);

    // Perform a transfer from John to Jane
    johnAccount.transfer(300, janeAccount);

    // Check balances
    const johnFinalBalance = johnAccount.checkBalance();
    const janeFinalBalance = janeAccount.checkBalance();
    console.log('John\'s balance:', johnFinalBalance);
    console.log('Jane\'s balance:', janeFinalBalance);

    // Return balances for testing
    return { 
        johnFinalBalance, 
        janeFinalBalance, 
        johnTransactionHistory: johnAccount.transactionHistory, 
        janeTransactionHistory: janeAccount.transactionHistory 
    };
}

module.exports = testBankOperations;

//<-------------------------------DO NOT WRITE ABOVE THIS LINE------------------------------>


console.log(testBankOperations());
