# Getting Started With My POS Project

For this project i assume you have `Node.js` and `Git` already installed on your PC.

### 1. Clone this repository on your computer using terminal in your desired folder
        
`git clone https://github.com/Rokkit-exe/POS.git`
        
### 2. Install dependencies (navigate to the directory you just cloned)

`npm install`

### 3. Start frontend server

`npm start`

If no internet page opened by it self, you can open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### 4. start backend server (navigate to the backend directory in a new terminal windows)

`npx json-server --watch db.json --port 8000`

**Note: You can change the port number in the file `DATABASE_URL.env`.**

**Note: You might have to install `json-server` since it is not included in `package.json`.**

in the main directory, run: `npm i json-server`
