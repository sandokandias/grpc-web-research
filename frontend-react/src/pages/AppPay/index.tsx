import { useState } from 'react';
import { PayRequest, PayResponse } from '../../proto/payment_pb';
import { PaymentServiceClient, Status } from '../../proto/payment_pb_service';
import './styles.css';

const Home = () => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const client = new PaymentServiceClient('http://payment.grpcweb.local');
    const req = new PayRequest();
    req.setDescription(description);
    req.setAmount(parseInt(amount));

    const stream = client.pay(req);
    stream.on('status', (status: Status) => {
      console.log('PaymentService.pay.status', status);
    });

    stream.on('data', (message: PayResponse) => {
      console.log('PaymentService.pay.data', message);
      console.log('PayID', message.getPayid());
      console.log('Status', message.getStatus());
      console.log('DateTime', message.getDatetime());
    });

    stream.on('end', () => {
      console.log('PaymentService.pay.end');
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Streaming Example - Payment</h2>
      <div>
        <label htmlFor="description">Description</label>
        <input
          type="text"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="amount">Amount</label>
        <input type="number" id="amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
      </div>
      <button type="submit">Pay</button>
    </form>
  );
};

export default Home;
