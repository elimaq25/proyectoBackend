const express = require('express');
const app = express();
const { engine } = require('express-handlebars');
const PORT = 8080;

const server = app.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});

server.on('error', (error) => console.log(`Error en servidor ${error}`));
app.use('/public', express.static(__dirname + '/public'));

app.set('view engine', 'hbs');
app.set('views', './views');
app.engine(
  'hbs',
  engine({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials',
  })
);

let productsHC = [
  { id: 1, title: 'Cristal', price: 350, thumbnail: 'http://localhost:8080/public/1.jpg' },
  { id: 2, title: 'Flor', price: 550, thumbnail: 'http://localhost:8080/public/2.jpg' },
  { id: 3, title: 'Corazón', price: 450, thumbnail: 'http://localhost:8080/public/3.jpg' },
  { id: 4, title: 'Aros', price: 700, thumbnail: 'http://localhost:8080/public/4.jpg' },
  { id: 5, title: 'Copo', price: 350, thumbnail: 'http://localhost:8080/public/5.jpg' },
  { id: 6, title: 'Diamante', price: 550, thumbnail: 'http://localhost:8080/public/6.jpg' },
  { id: 7, title: 'Corazón con libelula', price: 350, thumbnail: 'http://localhost:8080/public/7.jpg' },
  { id: 8, title: 'Hacha', price: 400, thumbnail: 'http://localhost:8080/public/8.jpg' },
  { id: 9, title: 'Night', price: 450, thumbnail: 'http://localhost:8080/public/9.jpg' },
  { id: 10, title: 'Perla', price: 650, thumbnail: 'http://localhost:8080/public/10.jpg' },
];

app.get('/products', (req, res) => {
  //sirve productslist.hbs en index.hbs (index.hbs es la plantilla por defecto donde arranca todo)
  res.render('productslist', { products: productsHC, productsExist: true });
});

app.get('/products/:id', (req, res) => {
  const { id } = req.params;
  try {
    let found = productsHC.find( e => e.id == id);
    if (found) {
    res.render('oneProduct', {product: found, title: 'Detalle de producto'} ) 
  } else {
    res.render('errorPlantilla', { errorMessage: 'Producto no encontrado'})
  }
  } catch (error) {
      console.log(error)
  }
});

app.get('/form', (req, res) => {
  res.render('agregarProducto', { admin: true });
});

app.post('/products', (req, res) => {
  const { body } = req;
  productsHC.push(body);
  res.redirect(301, '/products');
});

app.put('/products/:id', (req, res) => {
  const { id } = re.params;
  const { body } = req; 
  const productToChange = productsHC.find((item) => item.id == id); 
  productToChange.price = body.price; 
  res.render({ new: productToChange });
});

app.delete('/products/:id', (req, res) => {
  const { id } = req.params;
  const productsFilteredById = productsHC.filter((item) => item.id != id); 
  console.log(productsFilteredById);
})


