// api/mappers/transactionMapper.js
/**
 * Map transaction types enum to readable text
 */
const getTransactionTypeText = (type) => {
  switch (type) {
    case 1: return 'Commission Earned'
    case 2: return 'Wallet Top-Up'
    case 3: return 'Commission Transfer'
    case 4: return 'Shopping'
    case 5: return 'Other'
    default: return 'Unknown'
  }
}

/**
 * Get transaction type acronym
 */
const getTransactionTypeAcronym = (type) => {
  switch (type) {
    case 1: return 'CE'  // Commission Earned
    case 2: return 'WT'  // Wallet Top-Up
    case 3: return 'CT'  // Commission Transfer
    case 4: return 'SP'  // Shopping
    case 5: return 'OT'  // Other
    default: return '??'
  }
}

/**
 * Get transaction type color
 */
const getTransactionTypeColor = (type) => {
  switch (type) {
    case 1: return 'bg-purple-100 text-purple-700 border-purple-200' // Commission Earned
    case 2: return 'bg-blue-100 text-blue-700 border-blue-200'       // Wallet Top-Up
    case 3: return 'bg-indigo-100 text-indigo-700 border-indigo-200' // Commission Transfer
    case 4: return 'bg-[#8E44AD]/10 text-[#8E44AD] border-[#8E44AD]/20' // Shopping
    case 5: return 'bg-gray-100 text-gray-700 border-gray-200'       // Other
    default: return 'bg-gray-100 text-gray-700 border-gray-200'
  }
}

/**
 * Get transaction status text
 */
const getTransactionStatusText = (status) => {
  switch (status) {
    case 1: return 'Pending'
    case 3: return 'Completed'
    case 4: return 'Failed'
    case 5: return 'Cancelled'
    case 2: return 'Processing'
    default: return 'Unknown'
  }
}

/**
 * Get transaction status color
 */
const getTransactionStatusColor = (status) => {
  switch (status) {
    case 1: return 'bg-yellow-100 text-yellow-800'
    case 3: return 'bg-green-100 text-green-800'
    case 4: return 'bg-red-100 text-red-800'
    case 5: return 'bg-gray-100 text-gray-800'
    case 2: return 'bg-blue-100 text-blue-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

/**
 * Determine transaction direction (credit/debit)
 */
const getTransactionDirection = (transaction, currentUserId) => {
  // Commission Earned and Wallet Top-Up are credits
  if (transaction.transactionTypes === 1 || transaction.transactionTypes === 2 || transaction.transactionTypes === 3) {
    return 'credit'
  }
  
  // Shopping is always debit
  if (transaction.transactionTypes === 4) {
    return 'debit'
  }
  
  // Commission Transfer - check if user is source or destination
  if (transaction.transactionTypes === 3) {
    if (transaction.destinationUserId === currentUserId) {
      return 'credit'
    }
    return 'debit'
  }
  
  // Default to debit for Other
  return 'debit'
}

/**
 * Map transaction API response
 */
export const mapTransaction = (transaction, currentUserId = null) => {
  const direction = getTransactionDirection(transaction, currentUserId)
  
  return {
    ...transaction,
    id: transaction.transactionId,
    type: direction,
    typeText: getTransactionTypeText(transaction.transactionTypes),
    typeAcronym: getTransactionTypeAcronym(transaction.transactionTypes),
    typeColor: getTransactionTypeColor(transaction.transactionTypes),
    statusText: getTransactionStatusText(transaction.transactionStatus),
    statusColor: getTransactionStatusColor(transaction.transactionStatus),
    amount: transaction.amount,
    description: transaction.description || getTransactionTypeText(transaction.transactionTypes)
  }
}

export const mapTransactions = (transactions, currentUserId = null) => {
  if (!Array.isArray(transactions)) {
    return []
  }
  return transactions.map(t => mapTransaction(t, currentUserId))
}