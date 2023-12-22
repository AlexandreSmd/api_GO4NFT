const db = require('../middleware/connectDB');

/**
 * @api {post} /rights/Create Create Right
 * @apiName CreateRight
 * @apiGroup Right
 *
 * @apiHeader {String} x-keypub Public key of the actor.
 * @apiHeader {String} x-keyprv Private key of the actor.
 * 
 * @apiParam {String} Right_Name Name of the right.
 *
 * @apiSuccess {String} message Success message.
 * @apiSuccess {Number} id ID of the created right.
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 201 OK
 *     {
 *       "message": "Right successfully added",
 *       "id": 1
 *     }
 *
 * @apiError (500 Internal Server Error) {String} error Server Error when creating the right.
 */

// Méthode POST pour créer un RIGHT
const createRight = async (req, res) => {
  const {Right_Name} = req.body; // Les données sont extraites du corps de la requête

  try {
    const result = await db.promise().query(
      'INSERT INTO rights (Right_Name) VALUES (?)',
      [Right_Name]
    );

    res.status(201).json({ message: 'Right successfully added', id: result.insertId });
  } catch (error) {
    console.error('Error when creating the right :', error);
    res.status(500).json({ error: 'Server Error when creating the right' });
  }
};


/**
 * @api {get} /rights/GetAllRights Get All Rights
 * @apiName GetAllRights
 * @apiGroup Right
 *
 * @apiHeader {String} x-keypub Public key of the actor.
 * @apiHeader {String} x-keyprv Private key of the actor.
 * 
 * @apiSuccess {Object[]} rights List of rights.
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *       {
 *         "Right_ID": 1,
 *         "Right_Name": "Example Right 1"
 *       },
 *       {
 *         "Right_ID": 2,
 *         "Right_Name": "Example Right 2"
 *       }
 *     ]
 *
 * @apiError (500 Internal Server Error) {String} error Server Error.
 */

// Méthode GET pour obtenir tous les rights qui existe
const getAllRights = async (req, res) => {
  try {
    const rights = await db.promise().query('SELECT * FROM rights');
    res.json(rights);
  } catch (error) {
    console.error('Error while retrieving rights :', error);
    res.status(500).json({ error: 'Server Error' });
  }
};

module.exports = {
  createRight,
  getAllRights
};