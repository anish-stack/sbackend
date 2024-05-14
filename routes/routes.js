const express = require('express')
const { createProducts, getAllProducts, deleteProductById, getProductByName, updateProduct } = require('../controllers/ProductController')
const routes = express.Router()
const multer = require('multer')
const { register, LoginUser, Logout, getAllUsers, getTokenFromCookies } = require('../controllers/Usercontrollers')
const { isAuthenticatedUser } = require('../middlewares/auth')
const { CreateOrder, checkStatus, GetMyOrders, getAllOrder, getSingleOrder } = require('../controllers/OrderController')
const { createBanner, createCategory, makeTag, getAllBanners, deleteBanner, getAllCategories, updateCategory, deleteCategory, getAllTags, updateTag, deleteTag, getOnlyMainCategory, getTitleByMainCategory } = require('../controllers/webpage')
const { ShipRocketLogin, MakeOrderReadyToShip } = require('../controllers/Shiprocket')

const storage = multer.memoryStorage()
const multerUploads = multer({ storage }).array('images')
const SingleUpload = multer({ storage }).single('image')


//====================USER ROUTES=========================//
routes.post('/register', register)
routes.post('/login', LoginUser)
routes.get('/Logout', isAuthenticatedUser, Logout)
routes.get('/All-users', getAllUsers)
routes.get('/Token', isAuthenticatedUser, getTokenFromCookies)

//====================PRODUCT ROUTES=========================//
routes.post('/create-products', multerUploads, createProducts)
routes.get('/get-products', getAllProducts)
routes.delete('/delete-products/:id', deleteProductById)
routes.get('/get-products-name/:name/:id', getProductByName)
routes.patch('/update-products/:id', updateProduct)
//====================WEBPAGE CONTROLLERS  ROUTES=========================//
routes.post('/create-banners', multerUploads, createBanner)
routes.get('/get-Banners', getAllBanners)
routes.delete('/delete-Banners/:id', deleteBanner)
routes.post('/create-category', multerUploads, createCategory)
routes.get('/get-category', getAllCategories)
routes.post('/update-category/:id', updateCategory)
routes.delete('/delete-category/:id', deleteCategory)
routes.post('/Make-tags', makeTag)
routes.get('/get-tags', getAllTags)
routes.post('/update-tags/:id', updateTag)
routes.delete('/delete-tags/:id', deleteTag)
routes.get('/get-all-main-category', getOnlyMainCategory)
routes.get('/get-title/:MainCategory', getTitleByMainCategory)

//====================ORDERS ROUTES=========================//
routes.post('/Make-Orders', isAuthenticatedUser, CreateOrder)
routes.post('/status/:txnId', checkStatus)
routes.get('/get-My-Orders', isAuthenticatedUser, GetMyOrders)
routes.get('/admin-orders', getAllOrder)
routes.get('/single-orders/:id', getSingleOrder)
//====================SHIP-ROCKET  ROUTES=========================//
routes.post('/Ship-Rocket-login',ShipRocketLogin)
routes.get('/Order-Ship/:id',MakeOrderReadyToShip)


module.exports = routes