const express = require('express');
const Company = require('../model/Company');

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Company:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *           description: company name
 *         address:
 *           type: string
 *           description: company description
 *       example:
 *         name: Test company name
 *         address: Test company address
 *
 */

/**
 * @swagger
 *  tags:
 *    name: Company
 *    description: Company object
 */


/** 
 * @swagger 
 * /api/company: 
 *   post: 
 *     summary: Add new company
 *     description: Create a new Company 
 *     tags: [Company]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Company'
 *     responses:  
 *       200: 
 *         description: Created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Company'  
 *   
 */ 
router.post('/company', async (req, res) => {
    const data = new Company({
        name: req.body.name,
        address: req.body.address
    })

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

/** 
 * @swagger 
 * /api/companies: 
 *   get:
 *     summary: Get all companies
 *     description: Get the companies list 
 *     tags: [Company]
 *     responses:  
 *       200: 
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Company' 
 *   
 */ 
router.get('/companies', async (req, res) => {
    try {
        const data = await Company.find();
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})


/** 
 * @swagger 
 * /api/companies/{id}: 
 *   get:
 *     summary: Get company by ID
 *     description: Get the company detail
 *     tags: [Company]
 *     parameters: 
 *     - name: id 
 *       description: Company ID
 *       in: path 
 *       required: true 
 *       type: String
 *     responses:  
 *       200: 
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Company'  
 *       404: 
 *         description: Company not found.
 *   
 */ 
router.get('/companies/:id', async (req, res) => {
    try {
        const data = await Company.findById(req.params.id);
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

/** 
 * @swagger 
 * /api/companies/{id}: 
 *   put: 
 *     summary: Update Company
 *     description: Update Company
 *     tags: [Company]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Company ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Company'
 *     responses:  
 *       200: 
 *         description: Company updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Company' 
 *       404: 
 *         description: Company not found
 *       500:
 *         description: Internal server error happened
 *   
 */ 
router.put('/companies/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await Company.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

 /** 
 * @swagger 
 * /api/companies/{id}: 
 *   delete: 
 *     summary: Delete Company
 *     description: Delete Company
 *     tags: [Company]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Company ID
 *     responses:  
 *       200: 
 *         description: Company deletion was successful
 *       404: 
 *         description: Company not found
 *   
 */  
router.delete('/companies/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Company.findByIdAndDelete(id)
        res.send(`Document with name ${data.name} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

module.exports = router;