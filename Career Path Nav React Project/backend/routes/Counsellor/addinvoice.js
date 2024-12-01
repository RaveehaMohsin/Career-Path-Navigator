const express = require('express');
const router = express.Router();
const stripe = require('stripe')('sk_test_51PrEzpFdjrY56P1cqjq3g45v43hCnxBJyfSDhCHVnnenfSol1Jn2vy4SKLzdVMzqOcOZuIDudHy76l22rxsVVDTo004kHibLxh');
const sql = require('mssql');


const checkInvoiceExists = async (sessionId) => {
  try {
    const pool = await sql.connect();
    const result = await pool.request()
      .input('sessionId', sql.VARCHAR(255), sessionId)
      .query('SELECT * FROM Invoice WHERE invoiceId = @sessionId');
    
    return result.recordset.length > 0;  
  } catch (error) {
    console.error('Error checking if invoice exists:', error);
    throw error;
  }
};

// Function to insert a new invoice into the database
const insertInvoice = async (sessionId, amount) => {
  try {
    const pool = await sql.connect();
    
    const query = `
      INSERT INTO Invoice (invoiceId , amount, timeIssues)
      OUTPUT INSERTED.invoiceID, INSERTED.amount, INSERTED.timeIssues
      VALUES (@sessionId , @amount, GETDATE())`;

    const result = await pool.request()
      .input('amount', sql.Decimal(10, 2), amount)
      .input('sessionId', sql.VARCHAR(255), sessionId)
      .query(query);

    console.log("Invoice inserted successfully:", result.recordset[0]);
    
    // Return the inserted data if needed
    return result.recordset[0];

  } catch (error) {
    console.error('Error inserting invoice into database:', error);
    throw error;
  }
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
            invoiceData: sessionId  // You can return additional invoice details if needed
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
