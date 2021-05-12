import { useState } from 'react';
import { PayRequest, PayResponse } from '../../proto/payment_pb';
import { PaymentServiceClient, Status } from '../../proto/payment_pb_service';
import './styles.css';

interface Response {
  paymentID: string;
  status: string;
  dateTime: string;
}

const Home = () => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [response, setResponse] = useState<Response[]>([]);

  const validateInputs = () => {
    if (!description.match(/[a-zA-Z]/) && amount === '') {
      alert('Please, enter with a description and amount value');
      return false;
    }

    if (!description.match(/[a-zA-Z]/)) {
      alert('Description input must not be empty');
      return false;
    }

    if (description.length < 3) {
      alert('Desciption must have at least 3 letters');
    }

    if (amount === '') {
      alert('Amount input must not be empty');
      return false;
    }

    return true;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setResponse([]);

    if (!validateInputs()) return;

    const client = new PaymentServiceClient('http://payment.grpcweb.local');
    const req = new PayRequest();
    req.setDescription(description);
    req.setAmount(parseInt(amount));

    const stream = client.pay(req);
    stream.on('status', (status: Status) => {
      console.log('PaymentService.pay.status', status);
    });

    stream.on('data', (message: PayResponse) => {
      const res: Response = {
        paymentID: message.getPayid(),
        status: message.getStatus(),
        dateTime: message.getDatetime(),
      };

      console.log('PaymentService.pay.data', message);
      console.log('PayID', res.paymentID);
      console.log('Status', res.status);
      console.log('DateTime', res.dateTime);

      setResponse((oldResponse) => [...oldResponse, res]);
    });

    stream.on('end', () => {
      console.log('PaymentService.pay.end');
    });
  };

  return (
    <div className="container">
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

      {!!response.length && (
        <table>
          <thead>
            <tr>
              <th>PaymentID</th>
              <th>Status</th>
              <th>Date/Time</th>
            </tr>
          </thead>
          <tbody>
            {response.map((res, index) => (
              <tr key={index}>
                <td>{res.paymentID}</td>
                <td>{res.status}</td>
                <td>{res.dateTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Home;
