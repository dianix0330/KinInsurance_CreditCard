# Pay with Credit Card
## Requirements
Below are the requirements Product has given us (no need to proceed in order):

1. Values the user enters into the fields should appear on the credit card image.
2. Entered data should be validated using the following schema:
i. all fields required
ii. card number must be 15-16 numbers
iii. card number must be a valid credit card number (we're going to fake this, see below)
iv. expiration date must be in the format MM/YY
v. CVV must be 3-4 numbers
vi. billing zip should be 5 or 9 numbers
3. The form should post its payload to https://jsonplaceholder.typicode.com/posts (this is a mock API
endpoint, documentation here); then, it should show the user a success or failure message,
including the ID from the endpoint response.
4. The Product team wants this to POP! You know the drill: add a focus/hover effect, an animation, or
something of your choice to polish up the form.
5. Note: Credit card numbers are traditionally validated using the Luhn_algorithm. It's an interesting
read; feel free to implement it if you feel compelled. For a speedier validation, assume valid credit
card numbers have matching first and last digits.
Again, don't feel required to finish all the requirements (we don't want days of your life). Use these
requirements to guide you and be prepared to discuss and extend when we meet for our technical
interview.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

