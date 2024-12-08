const express = require('express');
const router = express.Router();
const stripe = require('stripe')('sk_test_51PrEzpFdjrY56P1cqjq3g45v43hCnxBJyfSDhCHVnnenfSol1Jn2vy4SKLzdVMzqOcOZuIDudHy76l22rxsVVDTo004kHibLxh');
const mysql = require('mysql');
const connection = require('../../database/mysql');

// Function to check if the invoice exists
const checkInvoiceExists = (sessionId) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM Invoice WHERE invoiceId = ?';
    connection.query(query, [sessionId], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results.length > 0); // Return true if record exists
      }
    });
  });
};

// Function to insert a new invoice
const insertInvoice = (sessionId, amount) => {
  return new Promise((resolve, reject) => {
    const query = `
      INSERT INTO Invoice (invoiceId, amount, timeIssues)
      VALUES (?, ?, NOW())
    `;
    connection.query(query, [sessionId, amount], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve({
          invoiceId: sessionId, // Set invoiceId as sessionId
          amount: amount, 
          timeIssues: new Date() // Current timestamp
        });
      }
    });
  });
};


// Route to verify payment and handle invoice creation
router.get('/verify-payment/:sessionId', async (req, res) => {
  const { sessionId } = req.params;

  try {
    // Retrieve the session from Stripe to verify payment
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    // Check if the payment is successful
    if (session.payment_status === 'paid') {
      try {
        // Check if the invoice already exists for this session
        const invoiceExists = await checkInvoiceExists(sessionId);

        if (invoiceExists) {
          // If invoice exists, return existing invoice data
          return res.json({
            success: true,
            message: 'Invoice already processed',
            invoiceData: sessionId  // Return sessionId as invoice data
          });
        }

        // If invoice does not exist, proceed to insert it
        const meetingDetails = session.metadata;
        const invoiceData = await insertInvoice(sessionId, session.amount_total / 100);

        res.json({ 
          success: true, 
          meetingDetails, 
          invoiceData
        });
        
      } catch (error) {
        console.error('Error handling payment:', error);
        res.status(500).json({ success: false, message: 'Error processing payment' });
      }
    } else {
      res.status(400).json({ success: false, error: 'Payment was not successful.' });
    }
  } catch (error) {
    console.error('Error verifying payment:', error);
    res.status(500).json({ success: false, error: 'Error verifying payment.' });
  }
});

module.exports = router;
