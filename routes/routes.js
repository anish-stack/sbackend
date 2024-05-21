const express = require('express')
const { createProducts, getAllProducts, deleteProductById, getProductByName, updateProduct, getProductByCategoreies } = require('../controllers/ProductController')
const routes = express.Router()
const multer = require('multer')
const { register, LoginUser, Logout, getAllUsers, getTokenFromCookies } = require('../controllers/Usercontrollers')
const { isAuthenticatedUser } = require('../middlewares/auth')
const { CreateOrder, checkStatus, GetMyOrders, getAllOrder, getSingleOrder, newPayment } = require('../controllers/OrderController')
const { createBanner, createCategory, makeTag, getAllBanners, deleteBanner, getAllCategories, updateCategory, deleteCategory, getAllTags, updateTag, deleteTag, getOnlyMainCategory, getTitleByMainCategory } = require('../controllers/webpage')
const { ShipRocketLogin, MakeOrderReadyToShip } = require('../controllers/Shiprocket')
const { RedirectCategoryMake, GetAllRedirectCat, DeleteRedirectCategory } = require('../controllers/Redirect')
const { createVoucher, getAllVouchers, activateVoucher, deactivateVoucher, deleteVoucher, applyVoucher } = require('../controllers/Voucher')
const { createSalesBanner, getAllSalesBanners, deleteSalesBanner } = require('../controllers/SalesBannerController')
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
routes.get('/getProductByCategoreies/:Category', getProductByCategoreies)
routes.post('/create-redirect', SingleUpload, RedirectCategoryMake)
routes.get('/all-redirect', GetAllRedirectCat)
routes.delete('/delete-redirect/:id', DeleteRedirectCategory)
//====================ORDERS ROUTES=========================//
routes.post('/Make-Orders', isAuthenticatedUser, CreateOrder)
routes.post('/status/:txnId', checkStatus)
routes.get('/get-My-Orders', isAuthenticatedUser, GetMyOrders)
routes.get('/admin-orders', getAllOrder)
routes.get('/single-orders/:id', getSingleOrder)
// routes.post('/create-payment',newPayment)
//====================SHIP-ROCKET  ROUTES=========================//
routes.post('/Ship-Rocket-login', ShipRocketLogin)
routes.post('/Order-Ship/:id', MakeOrderReadyToShip)
// ====================VOUCHERS====================================//
routes.get('/vouchers', getAllVouchers)
routes.post('/apply-vouchers', applyVoucher)

routes.post('/vouchers/create-vouchers', createVoucher)
routes.put('/vouchers/activateVoucher/:id', activateVoucher)
routes.put('/vouchers/deactivateVoucher/:id', deactivateVoucher)
routes.delete('/vouchers/deleteVoucher/:id', deleteVoucher)

// ======================Sales-Banner=======================//
routes.post('/create-sales-banners', multerUploads, createSalesBanner)
routes.get('/get-sales-Banners', getAllSalesBanners)
routes.delete('/delete-sales-Banners/:id', deleteSalesBanner)

module.exports = routes