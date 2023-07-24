const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const Product = db.Product;

module.exports = {
    authenticate,
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

// not used
async function authenticate({ productname, password }) {
    const user = await User.findOne({ productname });
    if (user && bcrypt.compareSync(password, user.hash)) {
        const token = jwt.sign({ sub: user.id }, config.secret, { expiresIn: '7d' });
        return {
            ...user.toJSON(),
            token
        };
    }
}

async function getAll() {
    return await Product.find();
}

async function getById(id) {
    return await Product.findById(id);
}

async function create(productParam) {
    // validate
    if (await Product.findOne({ productname: productParam.productname })) {
        throw 'Productname "' + productParam.productname + '" is already taken';
    }

    const product = new Product(productParam);

    // hash password
    // if (userParam.password) {
    //     user.hash = bcrypt.hashSync(userParam.password, 10);
    // }

    // save user
    await product.save();
}

async function update(id, productParam) {
    const product = await Product.findById(id);

    // validate
    if (!Product) throw 'Product not found';
    if (product.productname !== productParam.productname && await Product.findOne({ productname: productParam.productname })) {
        throw 'Productname "' + productParam.productname + '" is already taken';
    }

    // hash password if it was entered
    // if (productParam.password) {
    //     productParam.hash = bcrypt.hashSync(productParam.password, 10);
    // }

    // copy productParam properties to user
    Object.assign(product, productParam);

    await product.save();
}

async function _delete(id) {
    await Product.findByIdAndRemove(id);
}
