/* eslint-disable no-undef */
const { validationResult } = require('express-validator');

const Contacts = require('../model/model');

exports.tampilData = async (req, res) => {
    const contacts = await Contacts.find();
    res.render('contact', { contacts, msg: req.flash('msg') });
};

exports.tampilDetailData = async (req, res) => {
    const contact = await Contacts.findOne({ nama: req.params.nama });
    res.render('details', { contact });
};

exports.saveData = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.render('add-contact', { errors: errors.array() });
    } else {
        // eslint-disable-next-line no-unused-vars
        Contacts.insertMany(req.body, (error, result) => {
            req.flash('msg', 'Data contact berhasil ditambahkan!');
            res.redirect('/contact');
        });
    }
};

exports.deleteData = (req, res) => {
    // eslint-disable-next-line no-unused-vars
    Contacts.deleteOne({ nama: req.body.nama }).then((result) => {
        req.flash('msg', 'Data contact berhasil dihapus!');
        res.redirect('/contact');
    });
};

exports.formTambah = async (req, res) => {
    res.render('add-contact');
};

exports.formEdit = async (req, res) => {
    const contact = await Contacts.findOne({ nama: req.params.nama });
    res.render('edit-contact', { contact });
};

exports.updateData = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.render('edit-contact', { errors: errors.array(), contact: req.body });
    } else {
        Contacts.updateOne({ _id: req.body._id }, {
            $set: {
                nama: req.body.nama,
                nohp: req.body.nohp,
                email: req.body.email
            }
        // eslint-disable-next-line no-unused-vars
        }).then((result) => {
            req.flash('msg', 'Data contact berhasil diubah!');
            res.redirect('/contact');
        });
    }
};

