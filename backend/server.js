import app from './index.js';

const port = process.env.PORT || 5001;
app.listen(port, () => console.log(`LogicLab API listening at http://localhost:${port}`));
